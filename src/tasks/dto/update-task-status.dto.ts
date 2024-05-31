import { TaskStatus } from '../task.enum';

export class UpdateTaskStatusDto {
  id: string;
  status: TaskStatus;
}
