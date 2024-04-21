import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { ProfilePhoto } from './entities/profilePhoto.entity';
import { v4 as uuidv4 } from 'uuid';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ProfilePhoto)
    private readonly profilePhotoRepository: Repository<ProfilePhoto>,
    private readonly jwtService: JwtService,
    private readonly awsService: AwsService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      const uuid = uuidv4();
      const perfilPhoto = this.profilePhotoRepository.create({
        id: uuid,
        user: user,
      });

      Promise.all([
        await this.profilePhotoRepository.save(perfilPhoto),
        await this.awsService.uploadImage({
          uuid,
          photoBase64: createUserDto.photoBase64,
        }),
      ]);
      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async addFriend(
    userId: string,
    friendId: string,
  ): Promise<{ message?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['friends'],
      });

      const friend = await this.userRepository.findOne({
        where: { id: friendId },
      });

      if (!user || !friend) {
        throw new NotFoundException('User or friend not found');
      }

      // Verificar si ya son amigos desde el punto de vista del primer usuario
      const alreadyFriendsFromUserPerspective = user.friends.some(
        (f) => f.id === friend.id,
      );
      if (alreadyFriendsFromUserPerspective) {
        throw new ConflictException('The user has already added this friend');
      }

      // Verificar si ya son amigos desde el punto de vista del segundo usuario
      const friendUser = await this.userRepository.findOne({
        where: { id: friendId },
        relations: ['friends'],
      });
      const alreadyFriendsFromFriendPerspective = friendUser.friends.some(
        (f) => f.id === userId,
      );
      if (alreadyFriendsFromFriendPerspective) {
        throw new ConflictException('This friend has already added the user');
      }

      user.friends.push(friend);
      // friend.friends.push(user)
      await this.userRepository.save(user);
  
      
      friendUser.friends.push(user);
      await this.userRepository.save(friendUser);
      // await this.userRepository.save(friend)
      return { message: 'Friend added successfully.' };
    } catch (error) {
      throw error;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async getPhotoProfile(user: User): Promise<ProfilePhoto> {
    try {
      const photoProfile = await this.profilePhotoRepository.findOne({
        select: ['id'],
        where: { userId: user.id },
      });

      if (!photoProfile) {
        throw new NotFoundException('La foto de perfil no fue encontrada.');
      }

      return photoProfile;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.photos', 'photo') // Join con la tabla de fotos de perfil
      .where('user.name LIKE :query', { query: `%${query}%` })
      .orWhere('user.lastname LIKE :query', { query: `%${query}%` })
      .orWhere('user.username LIKE :query', { query: `%${query}%` })
      .getMany();
  }
  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['photos'], // Agrega aquí la relación para cargar las fotos
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  // Buscar al usuario y al amigo en la base de datos
  async areFriends(userId: string, friendId: string): Promise<boolean> {
    // Buscar al usuario y al amigo en la base de datos
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });

    const friend = await this.userRepository.findOne({
      where: { id: friendId },
    });

    // Si no se encuentra al usuario o al amigo, lanzar una excepción
    if (!user || !friend) {
      throw new NotFoundException('User or friend not found');
    }

    // Verificar si el amigo está en la lista de amigos del usuario
    const isFriend = user.friends.some((f) => f.id === friend.id);

    return isFriend;
  }

  async getFriends(user: User) {
    // Buscar al usuario con sus relaciones de amigos y fotos
    const userWithRelations = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['friends', 'friends.photos'], // Esto asume que tienes relaciones 'friends' y 'photos' en tu entidad User
    });

    // Si no se encuentra al usuario, lanzar una excepción
    if (!userWithRelations) {
      throw new NotFoundException('User not found');
    }

    // Devolver el usuario con sus amigos y fotos
    return userWithRelations.friends;
  }
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error): never {
    if (error.code === '23505') throw new BadRequestException(error.details);

    console.log(error);
    throw new InternalServerErrorException(error.message);
  }
}
