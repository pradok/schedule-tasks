import { Injectable } from '@nestjs/common';
// import { CreateScheduleDto } from './dto/create-schedule.dto';
// import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  async findAll() {
    return Promise.resolve([
      {
        id: '33',
        account_id: 1,
        agent_id: 1,
        start_time: new Date(),
        end_time: new Date(),
      },
    ]);
  }

  findOne(id: string) {
    return {
      id,
      account_id: 1,
      agent_id: 1,
      start_time: new Date(),
      end_time: new Date(),
    };
  }
}
