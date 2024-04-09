import { ScheduleCreateSchema } from 'contract/schedule.contract';
import { z } from 'zod';

export type ScheduleCreate = z.infer<typeof ScheduleCreateSchema>;
