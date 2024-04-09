import { Injectable } from '@nestjs/common';
import { ScheduleCreate } from './model';
import { PrismaService } from 'src/prisma/prisma.service';

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

  findOne(id: string) {
    return this.prisma.schedule.findUnique({
      where: { id },
    });
  }
}
