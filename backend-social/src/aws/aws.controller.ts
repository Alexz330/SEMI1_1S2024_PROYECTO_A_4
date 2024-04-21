import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AwsService } from './aws.service';
import { CreateAwDto } from './dto/create-aw.dto';
import { UpdateAwDto } from './dto/update-aw.dto';
import * as fs from 'fs';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}
  @Post('text-translate')
  async translateText(@Body('text') text: string) {
    try {
      const translations = await this.awsService.translateText(text);
      return { success: true, translations };
    } catch (error) {
      return { success: false, error: 'Failed to translate text' };
    }
  }

  @Post('contevert-text-audio')
  async convertTextToAudio(@Body('text') text: string) {
    try {
      const audioBase64 = await this.awsService.convertTextToAudio(text);
      return { success: true, audioBase64 };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Post('labels')
  async getLabelsFromImageUrl(@Body('image_url') imageUrl: string) {
    try {


      const imageBase64 = await this.getImageBase64FromUrl(imageUrl);
      
      const labels = await this.awsService.getLabelsFromImage(imageBase64);
      return { success: true, labels };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }


  async getImageBase64FromUrl(imageUrl) {
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.arrayBuffer();
      const buffer = Buffer.from(blob);
      const base64String = buffer.toString('base64');
      return base64String
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  }
  
}
