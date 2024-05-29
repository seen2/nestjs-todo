import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskStatusDto } from './dto/update-task-status.dto'; //DTO Approach
import { FilterTaskDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilter(filterTaskDto: FilterTaskDto): Task[] {
    if (filterTaskDto.search && filterTaskDto.status) {
      return this.tasks.filter(
        (task: Task) =>
          task.status === filterTaskDto.status &&
          task.title.toLowerCase().includes(filterTaskDto.search.toLowerCase()),
      );
    } else if (filterTaskDto.status) {
      return this.tasks.filter(
        (task: Task) => task.status === filterTaskDto.status,
      );
    } else if (filterTaskDto.search) {
      return this.tasks.filter((task: Task) =>
        task.title.toLowerCase().includes(filterTaskDto.search.toLowerCase()),
      );
    } else {
      return this.getAllTasks();
    }
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const newTask: Task = {
      id: uuid.v1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }
  getTaskById(id: string): Task {
    return this.tasks.find((task: Task) => task.id === id);
  }
  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
  }
  //DTO Approach
  // updateTaskStatus(updateTaskStatusDto: UpdateTaskStatusDto): Task | string {
  // const { id, status } = updateTaskStatusDto;
  // ----------------
  //Plain Approach
  updateTaskStatus(id: string, status: TaskStatus): Task | string {
    const task: Task | undefined = this.getTaskById(id);
    task.status = status;
    return task ? task : 'Not found';
  }
}
