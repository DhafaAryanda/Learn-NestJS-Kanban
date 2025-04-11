import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should added new task', () => {
    const dto: CreateTaskDto = {
      title: 'Task 2',
      description: 'Description 2',
    };

    const tasks = service.create(dto);
    expect(tasks.id).toBe(3);
    expect(tasks.title).toBe(dto.title);
    expect(tasks.description).toBe(dto.description);
    expect(tasks.isDeleted).toBe(false);
    expect(service.findAll()).toHaveLength(2);
  });

  it('create 2 tasks should added 2 tasks', () => {
    const dto: CreateTaskDto = {
      title: 'task two',
      description: 'this is task two',
    };

    let task = service.create(dto);
    expect(task.id).toBe(3);

    task = service.create(dto);
    expect(task.id).toBe(4);

    expect(service.findAll()).toHaveLength(3);
  });
});
