import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '../../contract';
import { SchedulesService } from './schedules.service';
import { Controller, Param } from '@nestjs/common';

@Controller()
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

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
