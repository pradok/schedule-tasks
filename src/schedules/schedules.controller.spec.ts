import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { schedule } from './mocks';

describe('SchedulesController', () => {
  let app: INestApplication;
  let schedulesService: SchedulesService;
  let controller: SchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [SchedulesService],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
    schedulesService = module.get<SchedulesService>(SchedulesService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /schedules', () => {
    it('should return an array of schedules', async () => {
      const response = await request(app.getHttpServer()).get('/schedules');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: '33',
          account_id: 1,
          agent_id: 1,
          start_time: expect.any(String),
          end_time: expect.any(String),
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
      });
    });
    it('should return 404 if schedule not found', async () => {
      jest.spyOn(schedulesService, 'findOne').mockImplementation(() => null);
      const response = await request(app.getHttpServer()).get('/schedules/34');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Schedule not found' });
    });
  });
});
