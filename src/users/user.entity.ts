import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from './types';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  streamKey: string;
}