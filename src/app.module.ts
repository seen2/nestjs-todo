import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfigOption } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfigOption), TasksModule],
})
export class AppModule {}
