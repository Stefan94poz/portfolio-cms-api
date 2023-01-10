import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    const isMatch = await this.isMatch(password, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const { id, name, email } = loginUserDto;

    const payload = { sub: id, email: email, name: name }; // Here

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async isMatch(inputPassowrd: string, dbPassword: string) {
    return await bcrypt.compare(inputPassowrd, dbPassword);
  }
}
