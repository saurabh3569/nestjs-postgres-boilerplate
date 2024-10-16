import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Task } from 'entity/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entity/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(data: CreateTaskDto) {
    const user = await this.userRepository.exists({
      where: { id: data.userId },
    });
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    return await this.taskRepository.save(data);
  }

  async findAll(userId: number) {
    const tasks = await this.taskRepository.findAndCount({
      where: { userId },
    });
    return { tasks: tasks[0], count: tasks[1] };
  }

  async findOne(id: number, userId: number) {
    const task = await this.taskRepository.findOne({
      where: { id, userId },
    });
    if (!task) {
      throw new NotFoundException('Task Not Found!');
    }
    return task;
  }

  async update(id: number, data: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id, userId: data.userId },
    });
    if (!task) {
      throw new NotFoundException('Task Not Found!');
    }
    return await this.taskRepository.save({ ...task, ...data });
  }

  async remove(id: number, userId: number) {
    const task = await this.taskRepository.findOne({
      where: { id, userId },
    });
    if (!task) {
      throw new NotFoundException('Task Not Found!');
    }
    return await this.taskRepository.remove(task);
  }
}
