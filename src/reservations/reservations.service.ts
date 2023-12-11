import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import {Repository} from 'typeorm';
import { User } from '../users/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

export class ReservationService {
    constructor(@InjectRepository(Reservation) private repo: Repository<Reservation>) {}

    async create(reservationDto: CreateReservationDto, user: User) {
        const reserve =  this.repo.create(reservationDto);

        reserve.user = user; 

        return this.repo.save(reserve);

    }

    delete(reservationId: number) {

    }
}