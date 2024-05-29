import { TaskStatus } from '../task.model';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends CreateTaskDto {
  status: TaskStatus;
}
