import { ScheduleCreateSchema } from "contract";
import { z } from "zod";

export type ScheduleCreate = z.infer<typeof ScheduleCreateSchema>;
