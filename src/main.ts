import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateOpenApi } from '@ts-rest/open-api';
import { SwaggerModule } from '@nestjs/swagger';
import { scheduleContract } from 'contract/schedule.contract';
import { taskContract } from 'contract/task.contract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = generateOpenApi(
    { ...scheduleContract, ...taskContract },
    {
      info: {
        title: 'Schedules and Tasks API',
        version: '1.0.0',
      },
    },
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
