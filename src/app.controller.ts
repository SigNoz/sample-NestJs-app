import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from 'nestjs-pino';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly logger: Logger) { }

  @Get()
  getHello(): string {
    this.logger.log('Calling getHello()', AppController.name);
    return this.appService.getHello();
  }
}
