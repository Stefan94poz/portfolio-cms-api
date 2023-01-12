import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    const isMatch = user && (await this.isMatch(password, user.password));

    if (user && isMatch) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { id, name, email } = loginUserDto;

    const payload = { sub: id, email: email, name: name };
    const token = this.jwtService.sign(payload);

    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('access_token', token, { httpOnly: true });
    return res.send({ message: 'Succesful' });
  }

  async logout(loginUserDto: LoginUserDto, res: Response) {}

  async isMatch(inputPassowrd: string, dbPassword: string) {
    return await bcrypt.compare(inputPassowrd, dbPassword);
  }
}
