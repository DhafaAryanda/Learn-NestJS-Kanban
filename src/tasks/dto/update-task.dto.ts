import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TASK_STATUSES, TaskStatus } from '../entities/task.entity';
import { IsIn } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsIn(TASK_STATUSES)
  status: TaskStatus;
}
