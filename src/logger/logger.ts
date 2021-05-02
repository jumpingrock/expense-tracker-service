import winston, { createLogger, format, transports } from 'winston';
import { LogLevel } from './LogLevel';

export class Logger {
  private static logger: winston.Logger;

  public static getInstance(): winston.Logger {
    if (this.logger !== undefined) {
      return this.logger;
    }

    this.logger = createLogger({
      level: LogLevel.INFO.valueOf(),
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
      ),
      defaultMeta: { service: 'Expense Tracker Service' },
      transports: [
        new transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });
    return this.logger;
  }
}
