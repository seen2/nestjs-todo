import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task.enum';
import { FilterTaskDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}
  async getTaskById(id: number): Promise<Tasks> {
    return await this.taskRepository.getTaskById(id);
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    return await this.taskRepository?.createTask(createTaskDto);
  }
  async updateTaskStatus(id: number, status: TaskStatus) {
    return await this.taskRepository.updateTaskStatus(id, status);
  }
  async deleteTaskById(id: number) {
    await this.taskRepository.deleteTaskById(id);
  }
  async getTasksWithFilter(filterTaskDto: FilterTaskDto) {
    return await this.taskRepository.getTasksWithFilter(
      filterTaskDto.search,
      filterTaskDto.status,
    );
  }
}
