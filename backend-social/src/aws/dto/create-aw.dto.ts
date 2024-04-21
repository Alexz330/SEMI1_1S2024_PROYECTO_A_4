import { IsBase64, IsNotEmpty, IsUUID } from "class-validator";

export class CreateAwDto {}

export class CreateImageDto{
    @IsNotEmpty()
    @IsBase64()
    photoBase64: string;

    @IsUUID()
    uuid:string
}