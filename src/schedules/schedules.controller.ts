import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '../../contract';
import { SchedulesService } from './schedules.service';
import { Controller, Param } from '@nestjs/common';

@Controller()
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @TsRestHandler(contract.createSchedule)
  async create() {
    return tsRestHandler(contract.createSchedule, async ({ body }) => {
      const schedule = await this.schedulesService.create(body);
      return { status: 201, body: schedule };
    });
  }

  @TsRestHandler(contract.updateSchedule)
  async update() {
    return tsRestHandler(contract.updateSchedule, async ({ body, params }) => {
      const schedule = await this.schedulesService.update(params.id, body);
      return { status: 200, body: schedule };
    });
  }

  @TsRestHandler(contract.deleteSchedule)
  async delete() {
    return tsRestHandler(contract.deleteSchedule, async ({ params }) => {
      await this.schedulesService.delete(params.id);
      return { status: 204, body: { message: 'Schedule deleted' } };
    });
  }

  @TsRestHandler(contract.getAllSchedules)
  async findAll() {
    return tsRestHandler(contract.getAllSchedules, async () => {
      const schedules = await this.schedulesService.findAll();
      return { status: 200, body: schedules };
    });
  }

  @TsRestHandler(contract.getSchedule)
  findOne(@Param('id') id: string) {
    return tsRestHandler(contract.getSchedule, async () => {
      const schedule = await this.schedulesService.findOne(id);
      if (!schedule) {
        return { status: 404, body: { message: 'Schedule not found' } };
      }
      return { status: 200, body: schedule };
    });
  }
}
