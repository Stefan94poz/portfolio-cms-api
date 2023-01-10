import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  id: string;

  @ApiProperty()
  name: string;
}
