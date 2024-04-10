import { Injectable } from '@nestjs/common';
import { ScheduleCreate, ScheduleUpdate } from './model';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  async create(createSchedule: ScheduleCreate) {
    return this.prisma.schedule.create({
      data: createSchedule,
    });
  }
  async findAll() {
    return this.prisma.schedule.findMany();
  }

  async findOne(id: string) {
    return this.prisma.schedule.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateSchedule: ScheduleUpdate) {
    return this.prisma.schedule.update({
      where: { id },
      data: updateSchedule,
    });
  }

  async delete(id: string) {
    return this.prisma.schedule.delete({
      where: { id },
    });
  }
}
