import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Car } from '../cars/car.entity';
import { minimumReservationCancellationHours } from 'src/config/reservation';
import { limitRecord } from '../config/app';


export class ReservationService {
  constructor(
    @InjectRepository(Reservation) private repo: Repository<Reservation>,
  ) {}

  async create(reservationDto: CreateReservationDto, user: User, car: Car) {
    const reserve = this.repo.create(reservationDto);

    reserve.user = user;
    reserve.car = car;

    return this.repo.save(reserve);
  }

  async isReservationIsOverLapping(reservationDto: CreateReservationDto) {
    const { carId, start, end } = reservationDto;

    const overlappingReservation = await this.repo.createQueryBuilder()
      .where('reservation.carId = :carId', { carId })
      .andWhere('(reservation.start < :end AND reservation.end > :start)', { start, end })
      .getOne();

    console.log('overlappingReservation', overlappingReservation)

    return !!overlappingReservation;
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  async cacnelReservation(id: number) {
    const currentDate = new Date();

    currentDate.setHours(
      currentDate.getHours() - minimumReservationCancellationHours,
    );

    const deleteReservation = await this.repo
      .createQueryBuilder()
      .delete()
      .where('createdAt < :currentDate', { currentDate })
      .andWhere('id= :id', { id })
      .execute();
    return deleteReservation.affected;
  }

  async findAll() {
    return this.repo.find({take: limitRecord});
  }

  // For testing only
  async deleteAll() {
    return this.repo.delete({});
  }
}
