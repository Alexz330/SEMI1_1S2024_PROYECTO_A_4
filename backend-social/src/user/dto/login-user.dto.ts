import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto{
    @IsString()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly password: string;

}