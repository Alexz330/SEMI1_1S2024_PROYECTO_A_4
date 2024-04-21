import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';

import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Publication } from './entities/publication.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsService } from 'src/aws/aws.service';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    private readonly awsService: AwsService,
    private readonly userService:UserService
  ) {}

  async create(createPublicationDto: CreatePublicationDto, user: User) {
    const { content, photoBase64 } = createPublicationDto;
    const uuid = uuidv4();
    const newPublication = this.publicationRepository.create({
      content,
      photoUrl: uuid,
      author: user,
    });
    await this.awsService.uploadImage({
      uuid,
      photoBase64,
    });
    await this.publicationRepository.save(newPublication);

    return newPublication;
  }

  async getPublicationByUser(user: User) {
    try {
      const publications = this.publicationRepository.findBy({
        authorId: user.id,
      });
      return publications;
    } catch (error) {
      throw error;
    }
  }


  async getPublicationsByFriends(user: User): Promise<Publication[]> {
    // Obtener la lista de amigos del usuario
    const userWithFriends = await this.userService.getFriends(user);
  
    // Si el usuario no tiene amigos, retornar un array vacío
    if (!userWithFriends || userWithFriends.length === 0) {
      return [];
    }
  
    // Obtener los IDs de los amigos
    const friendIds = userWithFriends.map(friend => friend.id);
  
    // Buscar las publicaciones de los amigos con sus autores
    const publications = await this.publicationRepository
      .createQueryBuilder('publication')
      .innerJoinAndSelect('publication.author', 'author')
      .leftJoinAndSelect('author.photos', 'photo')
      .where('publication.authorId IN (:...friendIds)', { friendIds })
      .getMany();
  
    return publications;
  }
}
