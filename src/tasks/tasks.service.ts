import { Injectable } from '@nestjs/common';
import { TaskDto, TaskUpdateDto } from './dto.types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async create(task: TaskDto) {
    return this.prisma.task.create({
      data: task,
    });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  update(id: string, task: TaskUpdateDto) {
    return this.prisma.task.update({
      where: { id },
      data: task,
    });
  }

  delete(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
