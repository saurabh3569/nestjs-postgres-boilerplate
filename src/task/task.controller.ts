import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() data: CreateTaskDto) {
    return this.taskService.create(data);
  }

  @Get('users/:userId')
  findAll(@Param('userId') userId: number) {
    return this.taskService.findAll(userId);
  }

  @Get(':id/users/:userId')
  findOne(@Param('id') id: string, @Param('userId') userId: number) {
    return this.taskService.findOne(+id, userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateTaskDto) {
    return this.taskService.update(+id, data);
  }

  @Delete(':id/users/:userId')
  remove(@Param('id') id: string, @Param('userId') userId: number) {
    return this.taskService.remove(+id, userId);
  }
}
