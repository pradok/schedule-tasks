import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TaskType } from '@prisma/client';
import { PrismaError } from '../prisma/prisma.error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const task = {
  id: '03drtf42-60d6-427d-87b1-83fbgaf0c66c0',
  account_id: 1,
  schedule_id: '03dd0f42-60d6-427d-87b1-83caaf0c66c0',
  start_time: new Date(),
  duration: 60,
  type: TaskType.work,
  created_at: new Date(),
  updated_at: new Date(),
};

describe('TasksController', () => {
  let app: INestApplication;
  let tasksService: TasksService;
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, PrismaService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /tasks', () => {
    it('should create a task', async () => {
      jest.spyOn(tasksService, 'create').mockResolvedValue(task);
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send(task);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        ...task,
        start_time: expect.any(String),
        updated_at: expect.any(String),
        created_at: expect.any(String),
      });
    });
  });

  describe('PATCH /tasks/:id', () => {
    it('should update a task', async () => {
      jest.spyOn(tasksService, 'update').mockResolvedValue(task);
      const response = await request(app.getHttpServer())
        .patch(`/tasks/${task.id}`)
        .send({
          account_id: 1,
          schedule_id: '03dd0f42-60d6-427d-87b1-83caaf0c66c0',
          start_time: '2021-01-01T00:00:00Z',
          duration: 60,
          type: TaskType.work,
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        ...task,
        start_time: expect.any(String),
        updated_at: expect.any(String),
        created_at: expect.any(String),
      });
    });
    it('should return 404 if task not found', async () => {
      jest.spyOn(tasksService, 'update').mockImplementation(() => {
        throw new PrismaClientKnownRequestError('Record does not exist', {
          code: PrismaError.RecordDoesNotExist as string,
          clientVersion: '2.20.0',
        });
      });
      const response = await request(app.getHttpServer())
        .patch('/tasks/123')
        .send({
          account_id: 1,
          schedule_id: '03dd0f42-60d6-427d-87b1-83caaf0c66c0',
          start_time: '2021-01-01T00:00:00Z',
          duration: 60,
          type: TaskType.work,
        });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        message: 'Task with id 123 not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });
  });

  describe('GET /tasks', () => {
    it('should get all tasks', async () => {
      jest.spyOn(tasksService, 'findAll').mockResolvedValue([task]);
      const response = await request(app.getHttpServer()).get('/tasks');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([
        {
          ...task,
          start_time: expect.any(String),
          updated_at: expect.any(String),
          created_at: expect.any(String),
        },
      ]);
    });
  });

  describe('GET /tasks/:id', () => {
    it('should get a task by id', async () => {
      jest.spyOn(tasksService, 'findOne').mockResolvedValue(task);
      const response = await request(app.getHttpServer()).get(
        `/tasks/${task.id}`,
      );
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        ...task,
        start_time: expect.any(String),
        updated_at: expect.any(String),
        created_at: expect.any(String),
      });
    });

    it('should return 404 if task not found', async () => {
      jest.spyOn(tasksService, 'findOne').mockResolvedValue(null);
      const response = await request(app.getHttpServer()).get('/tasks/123');
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        message: 'Task with id 123 not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete a task', async () => {
      jest.spyOn(tasksService, 'delete').mockResolvedValue(task);
      const response = await request(app.getHttpServer()).delete(
        `/tasks/${task.id}`,
      );
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Task deleted',
      });
    });

    it('should return 404 if task not found', async () => {
      jest.spyOn(tasksService, 'delete').mockImplementation(() => {
        throw new PrismaClientKnownRequestError('Record does not exist', {
          code: PrismaError.RecordDoesNotExist as string,
          clientVersion: '2.20.0',
        });
      });
      const response = await request(app.getHttpServer()).delete('/tasks/123');
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        message: 'Task with id 123 not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });
  });
});
