import {
    Column,
    Entity,
    PrimaryGeneratedColumn, 
    OneToMany
} from 'typeorm';

import { Car } from 'src/cars/car.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Car, (car) => car.user)
  cars: Car[]
}

