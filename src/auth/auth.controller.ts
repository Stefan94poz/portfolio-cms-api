import { Body, Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() loginUserDto: LoginUserDto, @Request() req, @Res() res: Response) {
    // Has to be type from Express Response
    return this.authService.login({ ...loginUserDto, id: req.user.id, name: req.user.name }, res);
  }

  @Post('/logout')
  logout(@Res() res: Response) {
    // Has to be type from Express Response
    return this.authService.logout(res);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
