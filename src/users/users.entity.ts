import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from './users.types';
import { BaseEntity, Unique } from 'typeorm/index';

@Entity()
@Unique(['username'])
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  streamKey: string;

  @Column({ default: false })
  isBroadcastOnline: boolean;
}
