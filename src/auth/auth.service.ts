import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
    const hash = await bcrypt.hash(authCredentialsDto.password, salt);
    authCredentialsDto.password = hash;
    const user = await this.userRepository.signUp(authCredentialsDto);
    const payload = { sub: user?.id, username: user?.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.signIn(authCredentialsDto);
    const isMatch = await bcrypt.compare(
      authCredentialsDto.password,
      user.password,
    );
    const logger = new Logger('AuthService: signIn');
    logger.verbose(`Is User Authenticated: ${isMatch}`);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
