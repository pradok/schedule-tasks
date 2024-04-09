import { TaskType } from '@prisma/client';
import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

export const TaskCreateSchema = z.object({
  account_id: z.number().int(),
  schedule_id: z.string(),
  start_time: z.string().transform((str) => new Date(str)),
  duration: z.number().int(),
  type: z.enum([TaskType.break, TaskType.work]),
});

export const TaskUpdateSchema = z.object({
  account_id: z.number().int().optional(),
  schedule_id: z.string().optional(),
  start_time: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  duration: z.number().int().optional(),
  type: z.enum([TaskType.break, TaskType.work]).optional(),
});

export const TaskSchema = TaskCreateSchema.extend({
  id: z.string(),
  start_time: z.date(),
});

export const taskContract = c.router({
  createTask: {
    method: 'POST',
    path: '/tasks',
    responses: {
      201: TaskSchema,
    },
    body: TaskCreateSchema,
    summary: 'Create a task',
  },
  getTask: {
    method: 'GET',
    path: '/tasks/:id',
    responses: {
      200: TaskSchema.nullable(),
    },
    pathParams: z.object({
      id: z.string(),
    }),
    summary: 'Get a task by id',
  },
  getAllTasks: {
    method: 'GET',
    path: '/tasks',
    responses: {
      200: z.array(TaskSchema),
    },
    summary: 'get all tasks',
  },
  updateTask: {
    method: 'PATCH',
    path: '/tasks/:id',
    responses: {
      200: TaskSchema,
    },
    body: TaskUpdateSchema,
    summary: 'Update a task by id',
  },
  deleteTask: {
    method: 'DELETE',
    path: '/tasks/:id',
    responses: {
      200: c.type<{ message: string }>(),
    },
    body: null,
    summary: 'Delete a task by id',
  },
});
