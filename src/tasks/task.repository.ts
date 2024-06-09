import { Repository } from 'typeorm';
import { Tasks } from './task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.enum';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class TaskRepository extends Repository<Tasks> {
  async getTaskById(id: number, user: UserDto): Promise<Tasks> {
    const found = await Tasks.findOne({
      where: { id: id, userId: user.userId },
    });
    console.log(found);
    if (!found) {
      throw new NotFoundException(`Task Not found for ID: ${id}`);
    } else {
      return found;
    }
  }
  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserDto,
  ): Promise<Tasks> {
    const newTask = new Tasks();
    newTask.title = createTaskDto.title;
    newTask.description = createTaskDto.description;
    newTask.status = TaskStatus.OPEN;
    newTask.userId = user.userId;
    await newTask.save();
    return newTask;
  }
  async deleteTaskById(id: number, user: UserDto) {
    const result = await Tasks.delete({ id: id, userId: user.userId });
    if (result.affected == 0)
      throw new NotFoundException(`Task Not found for ID: ${id}`);
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: UserDto) {
    Tasks.update({ id: id, userId: user.userId }, { status });
  }
  async getTasksWithFilter(
    search: string,
    status: TaskStatus,
    user: UserDto,
  ): Promise<Tasks[]> {
    let tasks: Tasks[];
    const query = Tasks.createQueryBuilder('tasks');
    tasks = await query.getMany();
    query.andWhere('tasks.userId=:userId', { userId: user.userId });
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
    if (search) {
      query.andWhere(
        'tasks.title LIKE :search OR tasks.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    tasks = await query.getMany();

    return tasks;
  }
}
