import { IsLatitude, IsLongitude } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @ManyToOne(() => User, (user) => user.cars)
  user: User

  @Column({ default: false })
  approved: boolean;
}
