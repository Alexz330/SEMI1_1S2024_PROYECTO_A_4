import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDtp: LoginUserDto) {
    return this.userService.login(loginUserDtp);
  }

  @Get('getMe')
  @UseGuards( AuthGuard() )
  getMe(
    // @Req() request:Express.Request
    @GetUser() user:User
  ){
    
    return{
      user
    }
  }
  
  @Get('get_photo_profile')
  @UseGuards(AuthGuard())
  async getPhotoProfile(@GetUser() user: User) {
    // Obtener la foto de perfil del usuario
    const photoProfile = await this.userService.getPhotoProfile(user);
    return photoProfile;
  }


  @Post('friends/:friendId')
  @UseGuards(AuthGuard())
  async addFriend(@GetUser() user: User, @Param('friendId') friendId: string){
    const userId = user.id
    return await this.userService.addFriend(userId, friendId);
  }

  @Get('search')
  async searchUsers(@Query('query') query: string) {
    return this.userService.searchUsers(query);
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    try {
      const user = await this.userService.getUserById(userId);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Lanza cualquier otro error que no sea NotFoundException
    }
  }

  @Get('validated-friend/:friendId')
  @UseGuards(AuthGuard())
  async areFriends(
    @GetUser() user: User,
    @Param('friendId') friendId: string,
    
  ): Promise<{ areFriends: boolean }> {
    try {
      const userId = user.id;
      const areFriends = await this.userService.areFriends(userId, friendId);
      return { areFriends };
    } catch (error) {
      // Manejar errores si es necesario
      throw error;
    }
  }

  @Get('friends/get_friends_user')
  @UseGuards(AuthGuard())
  async getFriends(
    @GetUser() user: User,
  ){

    try {
      console.log(user)
      const friends = await this.userService.getFriends(user);
      return friends;
    } catch (error) {
      // Manejar errores si es necesario
      throw error;
    }
  }
}
