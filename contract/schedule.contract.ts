import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

export const ScheduleCreateSchema = z.object({
  account_id: z.number({ required_error: 'Missing Notification ID' }).int(),
  agent_id: z.number().int(),
  start_time: z.string().transform((str) => new Date(str)),
  end_time: z.string().transform((str) => new Date(str)),
});

export const ScheduleUpdateSchema = ScheduleCreateSchema.partial();

export const ScheduleSchema = z.object({
  id: z.string(),
  agent_id: z.number().int(),
  start_time: z.date(),
  end_time: z.date(),
});

export const scheduleContract = c.router({
  createSchedule: {
    method: 'POST',
    path: '/schedules',
    responses: {
      201: ScheduleSchema,
    },
    body: ScheduleCreateSchema,
    summary: 'Create a schedule',
  },
  getSchedule: {
    method: 'GET',
    path: '/schedules/:id',
    responses: {
      200: ScheduleSchema.nullable(),
    },
    pathParams: z.object({
      id: z.string(),
    }),
    summary: 'Get a schedule by id',
  },
  getAllSchedules: {
    method: 'GET',
    path: '/schedules',
    responses: {
      200: z.array(ScheduleSchema),
    },
    summary: 'get all schedules',
  },
  updateSchedule: {
    method: 'PATCH',
    path: '/schedules/:id',
    responses: {
      200: ScheduleSchema,
    },
    body: ScheduleUpdateSchema,
    summary: 'Update a schedule by id',
  },
  deleteSchedule: {
    method: 'DELETE',
    path: '/schedules/:id',
    responses: {
      200: c.type<{ message: string }>(),
    },
    body: null,
    summary: 'Delete a schedule by id',
  },
});
