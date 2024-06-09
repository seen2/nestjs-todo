import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task.enum';
import { FilterTaskDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}
  async getTaskById(id: number, user: UserDto): Promise<Tasks> {
    return await this.taskRepository.getTaskById(id, user);
  }
  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserDto,
  ): Promise<Tasks> {
    return await this.taskRepository?.createTask(createTaskDto, user);
  }
  async updateTaskStatus(id: number, status: TaskStatus, user: UserDto) {
    return await this.taskRepository.updateTaskStatus(id, status, user);
  }
  async deleteTaskById(id: number, user: UserDto) {
    await this.taskRepository.deleteTaskById(id, user);
  }
  async getTasksWithFilter(filterTaskDto: FilterTaskDto, user: UserDto) {
    return await this.taskRepository.getTasksWithFilter(
      filterTaskDto.search,
      filterTaskDto.status,
      user,
    );
  }
}
