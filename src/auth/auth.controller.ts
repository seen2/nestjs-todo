import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return await this.authService.signUp(authCredentialsDto);
  }
  @Post('/signIn')
  async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return await this.authService.signIn(authCredentialsDto);
  }
}
