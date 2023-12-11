import { User } from 'src/users/user.entity';
import {
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn, 
    Column
} from 'typeorm';
import { Car } from '../cars/car.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'datetime'})
  start: Date

  @Column({type: 'datetime'})
  end: Date

  @ManyToOne(() => Car, (car) => car.reservations)
  car: Car;

  @ManyToOne(() => User, (user) => user.reservations, {eager: true})
  user: User;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
