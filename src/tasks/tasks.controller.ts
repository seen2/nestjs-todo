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
import { User } from 'src/auth/user.decorator';
import { UserDto } from 'src/auth/dto/user.dto';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @User() user: UserDto,
    @Query(ValidationPipe) filterTaskDto: FilterTaskDto,
  ): Promise<Tasks[]> {
    console.log(user);
    return this.tasksService.getTasksWithFilter(filterTaskDto, user);
  }
  // @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @User() user: UserDto,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Tasks> {
    return await this.tasksService.createTask(createTaskDto, user);
  }
  @Get('/:id')
  getTaskById(
    @User() user: UserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Tasks> {
    return this.tasksService.getTaskById(id, user);
  }
  @Delete('/:id')
  deleteTaskById(@User() user: UserDto, @Param('id', ParseIntPipe) id: number) {
    this.tasksService.deleteTaskById(id, user);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @User() user: UserDto,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
