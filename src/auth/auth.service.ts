import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    validateUser = (username, password): { username: string } =>  {
        const user = this.usersService.findOne(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
