import { Injectable, NestMiddleware } from "@nestjs/common";
import { UsersService } from "../users.service";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private userService: UsersService) {}
    async use(req: Request, res:Response, next: NextFunction) {

    }
}