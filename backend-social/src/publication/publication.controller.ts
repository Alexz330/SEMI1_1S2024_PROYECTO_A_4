import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post('create')
  @UseGuards( AuthGuard() )
  async create(@Body() createPublicationDto: CreatePublicationDto, @GetUser()user:User) {
    return await this.publicationService.create(createPublicationDto, user);
  }

  @Get('get-publications-by-user')
  @UseGuards( AuthGuard() )

  async getPublicationByUser(
    @GetUser() user:User
  ){
    return await this.publicationService.getPublicationByUser(user);
  }

  @Get('get-publications-by-friends')
  @UseGuards( AuthGuard() )
  async getPublicationsByFriends(
    @GetUser() user:User
  ){
    return await this.publicationService.getPublicationsByFriends(user);
  }

}
