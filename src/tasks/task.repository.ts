import { Repository } from 'typeorm';
import { Tasks } from './task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.enum';

@Injectable()
export class TaskRepository extends Repository<Tasks> {
  async getTaskById(id: number): Promise<Tasks> {
    const found = await Tasks.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task Not found for ID: ${id}`);
    } else {
      return found;
    }
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    const newTask = new Tasks();
    newTask.title = createTaskDto.title;
    newTask.description = createTaskDto.description;
    newTask.status = TaskStatus.OPEN;
    await newTask.save();
    return newTask;
  }
  async deleteTaskById(id: number) {
    const result = await Tasks.delete(id);
    if (result.affected==0) throw new NotFoundException(`Task Not found for ID: ${id}`);
  }

  async updateTaskStatus(id: number, status: TaskStatus) {
    Tasks.update(id,{status});
  }
}
