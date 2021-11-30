import { LogLevel } from './logs-level.enum';
import { LoggerEvent } from './logger-event.class';
import { Color } from './logs-colors.enum';

type LoggersMaps = Record<string, LoggerService>;
type LoggerFn = (...message: any[]) => void;

export class LoggerService {
  public static readonly eventBus = new LoggerEvent();
  private static _loggers: LoggersMaps = {};
  public static _enabled = true;

  static new(ctx: string, logLevel: LogLevel = LogLevel.trace): LoggerService {
    const logger = new LoggerService(ctx, logLevel);
    LoggerService._loggers[ctx] = logger;
    return logger;
  }

  static get(ctx: string): LoggerService {
    const cachedLogger = LoggerService._loggers[ctx];
    if (cachedLogger) {
      return cachedLogger;
    }
    return LoggerService.new(ctx);
  }

  constructor(private readonly ctx: string, private readonly logLevel: LogLevel) {
    return this;
  }

  private logger = (level: LogLevel = LogLevel.trace, color: Color, ...message: any[]): any[] | void => {
    let m = '';
    try {
      m = JSON.stringify(message, null, 2);
    } catch (e) {
      m = 'Cant show message';
    }
    LoggerService.eventBus.sendEvent?.('log', {
      level,
      ctx: this.ctx,
      log: m
    });
    if (!LoggerService._enabled) {
      return;
    }
    if (this.logLevel <= level) {
      const date = new Date();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return [`${color}[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] , [${this.ctx}] `, ...message];
    }
  };

  mutedLogger = (): null => null;

  debug = ((...message: any[]) => {
    const log = this.logger(LogLevel.debug, Color.FgBlack, ...message);
    if (!log) {
      return this.mutedLogger;
    }
    return Function.prototype.bind.call(console.log, console, ...log) as LoggerFn;
  })();

  error = ((...message: any[]) => {
    const log = this.logger(LogLevel.error, Color.FgRed, ...message);
    if (!log) {
      return this.mutedLogger;
    }
    return Function.prototype.bind.call(console.log, console, ...log) as LoggerFn;
  })();

  info = ((...message: any[]) => {
    const log = this.logger(LogLevel.info, Color.FgCyan, ...message);
    if (!log) {
      return this.mutedLogger;
    }
    return Function.prototype.bind.call(console.log, console, ...log) as LoggerFn;
  })();

  warn = ((...message: any[]) => {
    const log = this.logger(LogLevel.warn, Color.FgYellow, ...message);
    if (!log) {
      return this.mutedLogger;
    }
    return Function.prototype.bind.call(console.log, console, ...log) as LoggerFn;
  })();

  trace = ((...message: any[]) => {
    const log = this.logger(LogLevel.trace, Color.FgBlack, ...message);
    if (!log) {
      return this.mutedLogger;
    }
    return Function.prototype.bind.call(console.log, console, ...log) as LoggerFn;
  })();

  log = ((...message: any[]) => {
    const log = this.logger(LogLevel.log, Color.FgWhite, ...message);
    if (!log) {
      return this.mutedLogger;
    }
    return Function.prototype.bind.call(console.log, console, ...log) as LoggerFn;
  })();
}
