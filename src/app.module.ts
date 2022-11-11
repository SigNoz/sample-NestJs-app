import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';


@Module({
  imports: [LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
