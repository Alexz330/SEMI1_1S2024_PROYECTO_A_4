import { IsString, IsNotEmpty, MinLength, IsEmail, IsBase64 } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly lastname: string;

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly password: string;

    @IsNotEmpty()
    @IsEmail() // Validar que sea un email válido
    readonly email: string;

    @IsNotEmpty()
    @IsBase64()
    photoBase64: string;
}
