import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/auth.dto';

@Controller('/login')
export class AuthController {
    constructor(private authService:AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() signInDto: loginDTO) {
    return this.authService.signIn(signInDto.email, signInDto.senha);
  }
}
