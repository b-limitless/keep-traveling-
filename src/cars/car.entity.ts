import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { User } from '../users/user.entity';
import { Reservation } from 'src/reservations/reservation.entity';
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

  @Column({type: 'datetime', nullable: true})
  availableFrom: Date

  @Column({type: 'datetime', nullable: true})
  availableTo: Date

  @ManyToOne(() => User, (user) => user.cars)
  user: User;

  @OneToMany(() => Reservation, (reservation) => reservation.car, {cascade: true})
  reservations: Reservation[]

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
