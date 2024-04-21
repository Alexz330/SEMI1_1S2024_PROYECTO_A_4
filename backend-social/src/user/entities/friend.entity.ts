import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Friends {

    @PrimaryGeneratedColumn('uuid')
    id: string;
}