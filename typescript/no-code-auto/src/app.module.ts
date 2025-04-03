import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';

@Module({
  controllers: [ApiController],
})
export class AppModule {}
