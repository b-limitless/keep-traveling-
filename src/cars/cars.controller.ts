import { Controller, Post, UseGuards } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { Body } from '@nestjs/common';
import { AdminGuard } from '../guard/admin.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CarService } from './cars.service';
@Controller('cars')
export class CarsController {
    constructor(private carService:CarService) {};
    @Post('/')
    @UseGuards(AdminGuard)
    async createCar(@CurrentUser() currentUser:User, @Body() car: CreateCarDto) {
        return await this.carService.create(car, currentUser);
    }
}
