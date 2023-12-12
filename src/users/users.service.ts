import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { limitRecord } from '../config/app';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {
        this.repo = repo;
    }

    create(email:string, password: string, admin:boolean) {
        const user = this.repo.create({email, password, admin})

        return this.repo.save(user);
    }

    findOne(id:number) {
        if(!id) {
            return null;
        }
        return this.repo.findOneBy({id});
    }

    find(email:string) {
        return this.repo.find({where: {email}});
    }

   async findAll() {
        return await this.repo.find({take: limitRecord});
    }
}
