import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: 'Test',
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'access_token' in req.cookies) {
      return req.cookies.access_token;
    }

    return null;
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email, name: payload.name };
  }
}
