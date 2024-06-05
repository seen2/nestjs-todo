import { Repository } from 'typeorm';
import { Tasks } from './task.entity';
import { Injectable, NotFoundException, Search } from '@nestjs/common';
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
    if (result.affected == 0)
      throw new NotFoundException(`Task Not found for ID: ${id}`);
  }

  async updateTaskStatus(id: number, status: TaskStatus) {
    Tasks.update(id, { status });
  }
  async getTasksWithFilter(
    search: string,
    status: TaskStatus,
  ): Promise<Tasks[]> {
    let tasks: Tasks[];
    const query = Tasks.createQueryBuilder('tasks');
    tasks = await query.getMany();
    // if (search && status) {
    //   tasks = await Tasks.find({ where: { status, title: search } });
    // } else if (search) {
    //   tasks = await Tasks.find({ where: { title: search } });
    // } else if (status) {
    //   tasks = await Tasks.find({ where: { status } });
    // } else {
    //   tasks = await Tasks.find();
    // }
    if (status) {
      query.andWhere('tasks.status=:status', { status });
    }
    if (Search) {
      query.andWhere(
        'tasks.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    tasks = await query.getMany();

    return tasks;
  }
}
