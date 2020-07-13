import {Body, Controller, Get, Post, Render, Request, Res, UseFilters, UseGuards} from '@nestjs/common';
import {Response} from 'express';
import {LoginGuard} from "./guards/login.guard";
import {AuthenticatedGuard} from "./guards/authenticated.guard";
import {AuthExceptionFilter} from './filters/auth-exceptions.filter';
import {LedStatusService} from "./led-status/led-status.service";

export interface ChangeAnimationDto {
    animation: string,
}

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
    constructor(
        private readonly ledStatusService: LedStatusService,
    ) {
    }

    @Get('/')
    @Render('login')
    index(@Request() req): { message: string } {
        return {message: req.flash('loginError')};
    }

    @UseGuards(LoginGuard)
    @Post('/login')
    login(@Res() res: Response) {
        res.redirect('/home');
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/home')
    @Render('home')
    getHome(@Request() req) {
        return {
            user: req.user,
            status: this.ledStatusService.ledStatus.toString(),
        };
    }

    @UseGuards(AuthenticatedGuard)
    @Post('/home')
    @Render('home')
    changeAnimation(@Request() req, @Res() res: Response, @Body() body: ChangeAnimationDto) {

        if (!body.animation || body.animation == '') {
            return {message: 'Invalid Animation'};
        }

        this.ledStatusService.setLedStatusByString(body.animation);

        return {
            message: 'Changed Animation!',
            status: this.ledStatusService.ledStatus.toString(),
        };
    }

    @Get('/logout')
    logout(@Request() req, @Res() res: Response) {
        req.logout();
        res.redirect('/');
    }
}
