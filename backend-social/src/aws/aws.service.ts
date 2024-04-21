import { Injectable } from '@nestjs/common';
import { CreateAwDto, CreateImageDto } from './dto/create-aw.dto';
import { UpdateAwDto } from './dto/update-aw.dto';
import fetch from 'node-fetch'; // Importa fetch para hacer solicitudes HTTP

import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {

  async uploadImage(createImageDto: CreateImageDto) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
    const { photoBase64, uuid } = createImageDto
    const imageData = Buffer.from(photoBase64, 'base64');
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_ALBUMS,
      Key: `Publicaciones/${uuid}.jpg`, // Nombre de archivo en S3
      Body: imageData,
      ContentType: 'image/jpeg', // Tipo de contenido de la imagen
    };

    const uploadResult = await s3.upload(uploadParams).promise();
    // Aquí podrías devolver información sobre el resultado de la carga si es necesario
  }

  async translateText(text: string): Promise<any> {
    try {
      const response = await fetch('https://kdnn2yjzci.execute-api.us-east-1.amazonaws.com/Deploy/translate_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text
        })
      });

      if (!response.ok) {
        throw new Error('Failed to translate text');
      }

      const data = await response.json();
      return data.translations; // Devuelve las traducciones
    } catch (error) {
      // Maneja errores aquí
      console.error('Error translating text:', error);
      throw error;
    }
  }

  async convertTextToAudio(text: string): Promise<string> {
    try {
      const response = await fetch('https://kdnn2yjzci.execute-api.us-east-1.amazonaws.com/Deploy/get_audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text
        })
      });

      if (!response.ok) {
        throw new Error('Failed to convert text to audio');
      }

      const data = await response.json();
      return data.audioBase64; // Devuelve el audio en formato base64
    } catch (error) {
      // Maneja errores aquí
      console.error('Error converting text to audio:', error);
      throw error;
    }
  }
  async getLabelsFromImage(imageBytes: string): Promise<string[]> {
    try {
      const response = await fetch('https://kdnn2yjzci.execute-api.us-east-1.amazonaws.com/Deploy/get_labels_from_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_bytes: imageBytes
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get labels from image');
      }

      const data = await response.json();
      return data.labels; // Devuelve las etiquetas de la imagen
    } catch (error) {
      // Maneja errores aquí
      console.error('Error getting labels from image:', error);
      throw error;
    }
  }


  
}
