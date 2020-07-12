import { Injectable } from '@nestjs/common';

export interface IUser {
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: IUser[];

    constructor() {
        this.users = [
            {
                username: process.env.APP_USERNAME || 'admin',
                password: process.env.APP_PASSWORD || 'password',
            }
        ]
    }

    findOne = (username: string): IUser => this.users.find(user => user.username === username);
}
