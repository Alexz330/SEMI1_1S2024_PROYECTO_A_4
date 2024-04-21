import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { User } from "src/user/entities/user.entity"; 
import { Comment } from "src/comment/entities/comment.entity";

@Entity()
export class Publication {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string;

    @Column({ nullable: true })
    photoUrl: string; // URL de la foto

    @Column()
    authorId:string;

    @ManyToOne(() => User)
    @JoinColumn({name:'authorId'})
    author: User;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: Date;

    @OneToMany(() => Comment, comment => comment.publication)
    comments: Comment[];

}
