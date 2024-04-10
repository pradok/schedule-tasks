import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SchedulesService', () => {
  let service: SchedulesService;
  let prisma: PrismaService;
  let id: string;

  const schedule = {
    account_id: 1,
    agent_id: 1,
    start_time: new Date(),
    end_time: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulesService, PrismaService],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
    prisma = module.get<PrismaService>(PrismaService);
    const newSchedule = await prisma.schedule.create({ data: schedule });
    id = newSchedule.id;
  });

  afterAll(async () => {
    const deleteSchedule = prisma.schedule.deleteMany();

    await prisma.$transaction([deleteSchedule]);
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a schedule', async () => {
    const scheduleCreated = await service.create(schedule);
    // id = scheduleCreated.id;
    expect(scheduleCreated).toHaveProperty('id');
    expect(scheduleCreated).toEqual({
      account_id: 1,
      agent_id: 1,
      id: expect.any(String),
      start_time: expect.any(Date),
      end_time: expect.any(Date),
      updated_at: expect.any(Date),
      created_at: expect.any(Date),
    });
  });

  it('should find a schedule', async () => {
    const schedule = await service.findOne(id);
    expect(schedule).toHaveProperty('id');
    expect(schedule).toEqual({
      account_id: 1,
      agent_id: 1,
      id,
      start_time: expect.any(Date),
      end_time: expect.any(Date),
      updated_at: expect.any(Date),
      created_at: expect.any(Date),
    });
  });

  it('should find all schedules', async () => {
    const schedules = await service.findAll();
    expect(schedules).toHaveLength(2);
  });

  it('should update a schedule', async () => {
    const scheduleUpdated = await service.update(id, {
      account_id: 33,
      agent_id: 22,
    });
    expect(scheduleUpdated).toHaveProperty('id');
    expect(scheduleUpdated).toEqual({
      account_id: 33,
      agent_id: 22,
      id,
      start_time: expect.any(Date),
      end_time: expect.any(Date),
      updated_at: expect.any(Date),
      created_at: expect.any(Date),
    });
  });

  it('should delete a schedule', async () => {
    await service.delete(id);
    const schedule = await service.findOne(id);
    expect(schedule).toBeNull();
  });
});
