import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { MetricsExampleController } from './metrics-example.controller';

@Module({
  controllers: [ApiController, MetricsExampleController],
})
export class AppModule {}
