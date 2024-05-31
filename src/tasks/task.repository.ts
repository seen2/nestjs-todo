import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {}
