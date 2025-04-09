import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 2,
      title: 'Task 1',
      description: 'this is task 1',
      status: 'TODO',
      ownerId: -1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isDeleted: false,
    },
  ];

  create(dto: CreateTaskDto) {
    const NextId = Math.max(...this.tasks.map((task) => task.id)) + 1;

    const task = new Task(NextId, dto.title, dto.description);

    this.tasks.push(task);

    return task;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id && !task.isDeleted);
  }

  update(id: number, dto: UpdateTaskDto): Task | undefined {
    const task = this.findOne(id);
    if (task !== undefined) {
      if (dto.title) {
        task.title = dto.title;
      }
      if (dto.description) {
        task.description = dto.description;
      }
      if (dto.status) {
        task.status = dto.status;
      }

      task.updatedAt = Date.now();
    }

    return task;
  }

  remove(id: number): Task | undefined {
    const task = this.findOne(id);
    if (task !== undefined) {
      task.isDeleted = true;
      task.updatedAt = Date.now();
    }
    return task;
  }
}
