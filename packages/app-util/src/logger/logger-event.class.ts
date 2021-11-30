import { LogLevel } from './logs-level.enum';
import { EventBus } from '../shared/event-bus.class';

export type LogEvent = {
  log: {
    ctx: string;
    log: string;
    level: LogLevel;
  };
};

export class LoggerEvent extends EventBus<LogEvent> {
  constructor() {
    super();
    this.sendEvent = this.emit;
  }
}
