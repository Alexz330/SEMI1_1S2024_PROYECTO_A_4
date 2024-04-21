import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Module({
  controllers: [CommentController],
  providers:[CommentService],
  imports:[
    UserModule,
    TypeOrmModule.forFeature([Comment]),
  ]
})
export class CommentModule {}
