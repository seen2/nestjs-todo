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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks } from './task.entity';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task.enum';
import { FilterTaskDto } from './dto/get-task-filter.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterTaskDto: FilterTaskDto,
  ): Promise<Tasks[]> {
    // console.log(filterTaskDto);
    return this.tasksService.getTasksWithFilter(filterTaskDto);
  }
  // @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.tasksService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Tasks> {
    return this.tasksService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number) {
    this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
