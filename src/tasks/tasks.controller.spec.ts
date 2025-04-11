import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useClass: Repository<Task> },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find all should return empty task', () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve([] as Task[]));

    const tasks = controller.findAll();
    expect(tasks).resolves.toHaveLength(0);
  });

  it('find all should return all task', async () => {
    const tasks: Task[] = [
      new Task(1, 'Task 1', 'Description 1'),
      new Task(2, 'Task 2', 'Description 2'),
    ];

    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(tasks));

    const actual = await controller.findAll();
    expect(actual).toBe(tasks);
  });

  it('find one should be return task', () => {
    const task: Task = new Task(32, 'Task 1', 'Description 1');
    jest
      .spyOn(service, 'findOne')
      .mockImplementation((id: number): Promise<Task | null> => {
        expect(id).toBe(task.id);
        return Promise.resolve(task);
      });

    const actual = controller.findOne(32);
    expect(actual).resolves.toBe(task);
  });

  it('find one should be thrown not found exeption ', () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation((id: number): Promise<Task | null> => {
        expect(id).toBe(32);
        return Promise.resolve(null);
      });

    expect(controller.findOne(32)).rejects.toThrow(NotFoundException);
  });
});
