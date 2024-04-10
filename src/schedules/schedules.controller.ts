import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { SchedulesService } from './schedules.service';
import { Controller, Param } from '@nestjs/common';
import { scheduleContract } from '../../contract/schedule.contract';
import { ScheduleNotFoundException } from './exceptions/scheduleNotFound.exception';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../prisma/prisma.error';

@Controller()
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @TsRestHandler(scheduleContract.createSchedule)
  async create() {
    return tsRestHandler(scheduleContract.createSchedule, async ({ body }) => {
      const schedule = await this.schedulesService.create(body);
      return { status: 201, body: schedule };
    });
  }

  @TsRestHandler(scheduleContract.updateSchedule)
  async update() {
    return tsRestHandler(
      scheduleContract.updateSchedule,
      async ({ body, params }) => {
        try {
          const schedule = await this.schedulesService.update(params.id, body);
          return { status: 200, body: schedule };
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === PrismaError.RecordDoesNotExist
          ) {
            throw new ScheduleNotFoundException(params.id);
          }
          throw error;
        }
      },
    );
  }

  @TsRestHandler(scheduleContract.deleteSchedule)
  async delete() {
    return tsRestHandler(
      scheduleContract.deleteSchedule,
      async ({ params }) => {
        try {
          await this.schedulesService.delete(params.id);
          return { status: 200, body: { message: 'Schedule deleted' } };
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === PrismaError.RecordDoesNotExist
          ) {
            throw new ScheduleNotFoundException(params.id);
          }
          throw error;
        }
      },
    );
  }

  @TsRestHandler(scheduleContract.getAllSchedules)
  async findAll() {
    return tsRestHandler(scheduleContract.getAllSchedules, async () => {
      const schedules = await this.schedulesService.findAll();
      return { status: 200, body: schedules };
    });
  }

  @TsRestHandler(scheduleContract.getSchedule)
  findOne(@Param('id') id: string) {
    return tsRestHandler(scheduleContract.getSchedule, async () => {
      const schedule = await this.schedulesService.findOne(id);
      if (!schedule) {
        throw new ScheduleNotFoundException(id);
      }
      return { status: 200, body: schedule };
    });
  }
}
