import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';
import { JwtPayload } from './user.interface';

interface LoginDto {
  email: string;
  password: string;
}
interface LoginResponseDto {
  accessToken: string;
  user: { id: string; email: string; roles: Role[]; displayName: string };
}

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService, private jwt: JwtService) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    const user = await this.auth.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    const accessToken = await this.jwt.signAsync(payload);
    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
        displayName: user.displayName,
      },
    };
  }
}
