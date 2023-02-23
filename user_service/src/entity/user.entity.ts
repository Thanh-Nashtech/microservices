import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Address } from './address.entity';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';

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

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

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