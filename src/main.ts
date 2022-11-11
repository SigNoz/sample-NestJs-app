import tracer from './tracer';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

// All of your application code and any imports that should leverage
// OpenTelemetry automatic instrumentation must go here.

async function bootstrap() {
  await tracer.start();

  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  await app.listen(3001);
}
bootstrap();
