import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfigOption: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'codespaces-3556ac',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'task_management',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
