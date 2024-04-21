import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PublicationModule } from './publication/publication.module';
import { AwsModule } from './aws/aws.module';
import { CommentModule } from './comment/comment.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:"mysql",
      host: process.env.DB_HOST,
      port:+process.env.DB_PORT,
      database:process.env.DB_SCHEMA,
      username:process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      autoLoadEntities:true,
      synchronize:true,
    }),
    UserModule,
    PublicationModule,
    AwsModule,
    CommentModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
