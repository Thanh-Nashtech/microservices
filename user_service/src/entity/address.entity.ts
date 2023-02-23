import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  line1: string;

  @Column({ nullable: true })
  line2: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ name: 'userId' })
  userId: number;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'userId' })
  user: User;
}
