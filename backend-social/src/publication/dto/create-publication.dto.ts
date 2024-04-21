import { IsString, IsNotEmpty, IsBase64 } from 'class-validator';

export class CreatePublicationDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsBase64()
    photoBase64: string;
}
