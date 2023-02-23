import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  categoryId: number;

  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;
}