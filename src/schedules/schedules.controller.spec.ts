import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { schedule } from './fixtures';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaError } from '../prisma/prisma.error';

describe('SchedulesController', () => {
  let app: INestApplication;
  let schedulesService: SchedulesService;
  let controller: SchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [SchedulesService, PrismaService],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
    schedulesService = module.get<SchedulesService>(SchedulesService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /schedules', () => {
    it('should create a schedule', async () => {
      jest.spyOn(schedulesService, 'create').mockResolvedValue(schedule);
      const response = await request(app.getHttpServer())
        .post('/schedules')
        .send({
          account_id: 1,
          agent_id: 1,
          start_time: '2021-01-01T00:00:00Z',
          end_time: '2021-01-01T00:00:00Z',
        });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        ...schedule,
        start_time: expect.any(String),
        end_time: expect.any(String),
        updated_at: expect.any(String),
        created_at: expect.any(String),
      });
    });
  });

  describe('PATCH /schedules/:id', () => {
    it('should update a schedule', async () => {
      jest.spyOn(schedulesService, 'update').mockResolvedValue(schedule);
      const response = await request(app.getHttpServer())
        .patch('/schedules/33')
        .send({
          account_id: 1,
          agent_id: 1,
          start_time: '2021-01-01T00:00:00Z',
          end_time: '2021-01-01T00:00:00Z',
        });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...schedule,
        start_time: expect.any(String),
        end_time: expect.any(String),
        updated_at: expect.any(String),
        created_at: expect.any(String),
      });
    });
    it('should return 404 if schedule not found', async () => {
      jest.spyOn(schedulesService, 'update').mockImplementation(() => {
        throw new PrismaClientKnownRequestError('Record does not exist', {
          code: PrismaError.RecordDoesNotExist as string,
          clientVersion: '2.20.0',
        });
      });
      const response = await request(app.getHttpServer())
        .patch('/schedules/34')
        .send({
          account_id: 1,
          agent_id: 1,
          start_time: '2021-01-01T00:00:00Z',
          end_time: '2021-01-01T00:00:00Z',
        });
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: 'Schedule with id 34 not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });
  });

  describe('DELETE /schedules/:id', () => {
    it('should delete a schedule', async () => {
      jest.spyOn(schedulesService, 'delete').mockResolvedValue(schedule);
      const response = await request(app.getHttpServer()).delete(
        '/schedules/33',
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Schedule deleted' });
    });
    it('should return 404 if schedule not found', async () => {
      jest.spyOn(schedulesService, 'delete').mockImplementation(() => {
        throw new PrismaClientKnownRequestError('Record does not exist', {
          code: PrismaError.RecordDoesNotExist as string,
          clientVersion: '2.20.0',
        });
      });
      const response = await request(app.getHttpServer()).delete(
        '/schedules/34',
      );
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: 'Schedule with id 34 not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });
  });

  describe('GET /schedules', () => {
    it('should return an array of schedules', async () => {
      jest.spyOn(schedulesService, 'findAll').mockResolvedValue([schedule]);
      const response = await request(app.getHttpServer()).get('/schedules');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: '45',
          account_id: 1,
          agent_id: 1,
          start_time: expect.any(String),
          end_time: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      ]);
    });
  });

  describe('GET /schedules/:id', () => {
    it('should return a schedule by id', async () => {
      jest.spyOn(schedulesService, 'findOne').mockResolvedValue(schedule);
      const response = await request(app.getHttpServer()).get('/schedules/33');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...schedule,
        start_time: expect.any(String),
        end_time: expect.any(String),
        updated_at: expect.any(String),
        created_at: expect.any(String),
      });
    });
    it('should return 404 if schedule not found', async () => {
      jest.spyOn(schedulesService, 'findOne').mockResolvedValue(null);
      const response = await request(app.getHttpServer()).get('/schedules/34');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: 'Schedule with id 34 not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });
  });
});
