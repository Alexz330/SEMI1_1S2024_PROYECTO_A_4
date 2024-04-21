import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { AwsService } from 'src/aws/aws.service';
@Module({
  controllers: [PublicationController],
  providers: [PublicationService, AwsService],
  imports:[
    UserModule,
    TypeOrmModule.forFeature([Publication]),
  ],

  
})
export class PublicationModule {}
