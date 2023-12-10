import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async signup(email: string, password){
        // See if eamil is in use
        const users = await this.userService.find(email);
        
        if(users.length) {
            throw new BadRequestException('Email already registered');
        }
        // hash the users password
        // Generate a salt
        const salt = randomBytes(8).toString('hex');
        // hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        // join the hashed result and the salt together 
        const reuslt = salt + '.' + hash.toString('hex');
        // create a new user and save it
        // return the user
        const user = await this.userService.create(email, reuslt);

        return user;

    }

    async signin(email:string, password:string){
        const [user] = await this.userService.find(email);
        if(!user) {
            throw new NotFoundException('user not found');
        } 

        const [salt, storedHash] = user.password.split('.');

        // Hash the password provided by user
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if(storedHash !== hash.toString('hex')) {
            throw new BadRequestException('invalid username and password');
        }

        return user;

    }
}