export const TASK_STATUSES = [
  'TODO',
  'ON_PROGRESS',
  'DONE',
  'ARCHIVED',
] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export class Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  ownerId: number;
  createdAt: number; //unix timestamp in milliseconds
  updatedAt: number; //unix timestamp in milliseconds
  isDeleted: boolean;

  constructor(id: number, title: string, description: string) {
    const timestamp = Date.now();
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = 'TODO';
    this.ownerId = -1;
    this.isDeleted = false;
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }
}
