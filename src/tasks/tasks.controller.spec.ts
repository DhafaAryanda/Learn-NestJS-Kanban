import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { NotFoundException } from '@nestjs/common';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
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

  it('find all should return empty task', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(() => [] as Task[]);

    const tasks = await controller.findAll();
    expect(tasks).toHaveLength(0);
  });

  it('find all should return all task', async () => {
    const tasks: Task[] = [
      new Task(1, 'Task 1', 'Description 1'),
      new Task(2, 'Task 2', 'Description 2'),
    ];

    jest.spyOn(service, 'findAll').mockImplementation(() => tasks);

    const actual = await controller.findAll();
    expect(actual).toBe(tasks);
  });

  it('find one should be return task', () => {
    const task: Task = new Task(32, 'Task 1', 'Description 1');
    jest
      .spyOn(service, 'findOne')
      .mockImplementation((id: number): Task | undefined => {
        expect(id).toBe(task.id);
        return task;
      });

    const actual = controller.findOne(32);
    expect(actual).toBe(task);
  });

  it('find one should be thrown not found exeption ', () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation((id: number): Task | undefined => {
        expect(id).toBe(32);
        return undefined;
      });

    expect(() => controller.findOne(32)).toThrow(NotFoundException);
  });
});
