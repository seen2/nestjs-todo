import { TaskStatus } from '../task.enum';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends CreateTaskDto {
  status: TaskStatus;
}
