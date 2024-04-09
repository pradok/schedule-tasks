import { TaskCreateSchema, TaskUpdateSchema } from 'contract/task.contract';
import { z } from 'zod';

export type TaskDto = z.infer<typeof TaskCreateSchema>;
export type TaskUpdateDto = z.infer<typeof TaskUpdateSchema>;
