import {
  ScheduleCreateSchema,
  ScheduleUpdateSchema,
} from 'contract/schedule.contract';
import { z } from 'zod';

export type ScheduleCreate = z.infer<typeof ScheduleCreateSchema>;
export type ScheduleUpdate = z.infer<typeof ScheduleUpdateSchema>;
