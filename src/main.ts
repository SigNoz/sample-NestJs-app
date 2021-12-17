const tracer = require('./tracer')
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
  // All of your application code and any imports that should leverage
  // OpenTelemetry automatic instrumentation must go here.

async function bootstrap() {
    await tracer.start();
    const app = await NestFactory.create(AppModule);
    await app.listen(3001);
  }
  bootstrap();

