import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterTaskDto: FilterTaskDto): Task[] {
    // console.log(filterTaskDto);
    return this.tasksService.getTasksWithFilter(filterTaskDto);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Param('id') id: string,
  ): Task | string {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
