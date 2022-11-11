import Pino, { Logger } from 'pino';
import { LoggerOptions, destination } from 'pino';
import { trace, context } from '@opentelemetry/api';

export const loggerOptions: LoggerOptions = {
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: "pid,hostname,context,req,res,responseTime,trace_id,span_id,trace_flags",
            messageFormat: '{levelLabel} - {pid} - url:{req.url} - traceId:{trace_id} - spanId:{span_id} {msg}'
        }
    }
};

export const logger: Logger = Pino(
    loggerOptions,
    destination(process.env.LOG_FILE_NAME),
);