import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Version,
} from '@nestjs/common';
import { AuthRequest } from 'src/core/requests/auth';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.OK) // pada default semua response 200 kecuali post menghasilkan 201, tetapi dapat diubah menggunakan HttpCode
  // @UseGuards(AuthGuard)
  create(@Req() req: AuthRequest, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(req.authenticatedUser.id, dto);
  }

  @Version('1')
  @Get()
  async findAll(@Req() req: AuthRequest) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return this.tasksService.findAll(req.authenticatedUser.id);
  }

  @Get(':id')
  async findOne(@Req() req: AuthRequest, @Param('id') id: number) {
    const task = await this.tasksService.findOne(req.authenticatedUser.id, id);
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  @Patch(':id')
  async update(
    @Req() req: AuthRequest,
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.update(
      req.authenticatedUser.id,
      id,
      dto,
    );

    if (!task) {
      throw new NotFoundException('task not found');
    }

    return task;
  }

  @Delete(':id')
  async remove(@Req() req: AuthRequest, @Param('id') id: number) {
    const task = await this.tasksService.remove(req.authenticatedUser.id, id);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    return task;
  }
}
