import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { taskContract } from '../../contract/task.contract';
import { PrismaError } from '../prisma/prisma.error';
import { TaskNotFoundException } from './exceptions/taskNotFound.exception';
import { Prisma } from '@prisma/client';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @TsRestHandler(taskContract.createTask)
  async create() {
    return tsRestHandler(taskContract.createTask, async ({ body }) => {
      const task = await this.tasksService.create(body);
      return { status: 201, body: task };
    });
  }

  @TsRestHandler(taskContract.updateTask)
  async update() {
    return tsRestHandler(taskContract.updateTask, async ({ body, params }) => {
      try {
        const task = await this.tasksService.update(params.id, body);
        return { status: 200, body: task };
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === PrismaError.RecordDoesNotExist
        ) {
          throw new TaskNotFoundException(params.id);
        }
        throw error;
      }
    });
  }

  @TsRestHandler(taskContract.deleteTask)
  async delete() {
    return tsRestHandler(taskContract.deleteTask, async ({ params }) => {
      try {
        await this.tasksService.delete(params.id);
        return { status: 200, body: { message: 'Task deleted' } };
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === PrismaError.RecordDoesNotExist
        ) {
          throw new TaskNotFoundException(params.id);
        }
        throw error;
      }
    });
  }

  @TsRestHandler(taskContract.getAllTasks)
  async findAll() {
    return tsRestHandler(taskContract.getAllTasks, async () => {
      const tasks = await this.tasksService.findAll();
      return { status: 200, body: tasks };
    });
  }

  @TsRestHandler(taskContract.getTask)
  async findOne() {
    return tsRestHandler(taskContract.getTask, async ({ params }) => {
      const task = await this.tasksService.findOne(params.id);
      if (!task) {
        throw new TaskNotFoundException(params.id);
      }
      return { status: 200, body: task };
    });
  }
}
