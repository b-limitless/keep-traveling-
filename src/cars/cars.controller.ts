import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { Body } from '@nestjs/common';
import { AdminGuard } from '../guard/admin.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CarService } from './cars.service';
import { Serialize } from 'src/users/interceptors/serialize.interceptors';
import { CarDto } from './dto/car.dto';
import { SearchCarDto } from './dto/search-car.dto';
import { FilterCarDto } from './dto/filter-car.dto';
import { UserDto } from 'src/users/dto/user.dto';
import {CarAvailabilityParamDto } from './dto/car-availability-param.dto';
import { CarAvailabilityQueryDto } from './dto/car-availability-query.dto';
@Controller('cars')
export class CarsController {
    constructor(private carService:CarService) {};
    @Post('/')
    @UseGuards(AdminGuard)
    @Serialize(CarDto)
    async createCar(@CurrentUser() currentUser:User, @Body() car: CreateCarDto) {
        return await this.carService.create(car, currentUser);
    }

    @Get('/')
    @Serialize(CarDto)
    async listCars() {
        return await this.carService.find()
    }

    @Get('/search')
    async searchCars(@Query() query: SearchCarDto) {
        const {make, model} = query;
        return this.carService.search({make, model});
    }

    @Get('/filter') 
    @Serialize(CarDto)
    async filterCars(@Query() query: FilterCarDto) {
        return this.carService.filter(query)
    }

    @Get('/availability/:carId')
    async checkCarAvailability(
            @Param() param: CarAvailabilityParamDto, 
            @Query() query: CarAvailabilityQueryDto
            ) {
        return this.carService.checkAvailability(param, query);
    }
}
