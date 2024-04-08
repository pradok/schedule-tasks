import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const ScheduleSchema = z.object({
  id: z.string(),
  account_id: z.number().int(),
  agent_id: z.number().int(),
  start_time: z.date(),
  end_time: z.date(),
});

export const contract = c.router({
  createSchedule: {
    method: 'POST',
    path: '/schedules',
    responses: {
      201: ScheduleSchema,
    },
    body: z.object({
      account_id: z.string(),
      agent_id: z.string(),
    }),
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
    body: ScheduleSchema,
    summary: 'Update a schedule by id',
  },
  deleteSchedule: {
    method: 'DELETE',
    path: '/schedules/:id',
    responses: {
      204: c.type<{ message: string }>(),
    },
    body: z.object({}),
    summary: 'Delete a schedule by id',
  },
});
