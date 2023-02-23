import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @Column({default: ''})
  password: string;

  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;
}