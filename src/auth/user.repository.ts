import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.password = password;
    try {
      await this.save(user);
    } catch (e: any) {
      if (e?.errno === process.env.DUPLICATE_USERNAME_CODE) {
        throw new ConflictException('Username already Exist');
      } else {
        throw new InternalServerErrorException('Something Went Wrong');
      }
    }
    return user;
  }
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const user = await this.findOne({
      where: { username: authCredentialsDto.username },
    });
    if (!user) {
      throw new NotFoundException(
        `Username: ${authCredentialsDto.username}, Not Found`,
      );
    }
    return user;
  }
}
