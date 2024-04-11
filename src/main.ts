import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateOpenApi } from '@ts-rest/open-api';
import { SwaggerModule } from '@nestjs/swagger';
import { scheduleContract } from 'contract/schedule.contract';
import { taskContract } from 'contract/task.contract';
import { initContract } from '@ts-rest/core';

const c = initContract();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const contract = c.router({
    Schedules: scheduleContract,
    Tasks: taskContract,
  });
  const document = generateOpenApi(contract, {
    info: {
      title: 'Schedules and Tasks API',
      version: '1.0.0',
    },
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
