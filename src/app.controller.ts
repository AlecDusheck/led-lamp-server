import {Controller, Get, Post, Request, Res, Render, UseGuards, UseFilters} from '@nestjs/common';
import { Response } from 'express';
import {LoginGuard} from "./guards/login.guard";
import {AuthenticatedGuard} from "./guards/authenticated.guard";
import { AuthExceptionFilter } from './filters/auth-exceptions.filter';


@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  @Get('/')
  @Render('login')
  index(@Request() req): { message: string } {
    return { message: req.flash('loginError') };
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
    return { user: req.user };
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
