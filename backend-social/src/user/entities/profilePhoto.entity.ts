import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class ProfilePhoto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId!:string

    @ManyToOne(() => User, user => user.photos)
    @JoinColumn({name:'userId'})
    user: User;
}