import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulesModule } from './schedules/schedules.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SchedulesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
