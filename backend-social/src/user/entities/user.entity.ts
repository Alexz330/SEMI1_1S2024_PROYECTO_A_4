import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Comment } from "src/comment/entities/comment.entity"; 
import { ProfilePhoto } from "./profilePhoto.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({
        unique:true
    })
    username: string;

    @Column({
        unique:false
    })
    password: string;

    @Column()
    email: string;

    @Column({ default: false }) 
    isActive: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @OneToMany(() => Comment, comment => comment.author)
    comments: Comment[];

    @OneToMany(() => ProfilePhoto, photo => photo.user)
    photos: ProfilePhoto[];

    @ManyToMany(() => User, user => user.friends)
    @JoinTable()
    friends: User[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
