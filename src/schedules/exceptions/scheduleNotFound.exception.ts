import { NotFoundException } from '@nestjs/common';

export class ScheduleNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Schedule with id ${id} not found`);
  }
}
