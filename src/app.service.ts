import { Injectable } from '@nestjs/common';
import { context, trace } from '@opentelemetry/api';

@Injectable()
export class AppService {
  getHello(): string {
    // Get the current span from the tracer
    const span = trace.getSpan(context.active());
    // recordException converts the error into a span event.
    span.setAttribute('test', true);
    span.recordException(new Error('This is a test error'));
    return 'Hello World!';
  }
}
