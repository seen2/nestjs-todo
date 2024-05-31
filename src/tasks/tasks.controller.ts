import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterTaskDto: FilterTaskDto): Task[] {
  //   // console.log(filterTaskDto);
  //   return this.tasksService.getTasksWithFilter(filterTaskDto);
  // }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id);
  }
  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string) {
  //   this.tasksService.deleteTaskById(id);
  // }
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  //   @Param('id') id: string,
  // ): Task | string {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
