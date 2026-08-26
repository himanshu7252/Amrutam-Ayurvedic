import { ENV } from '@app/config/env';

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

interface LogPayload {
  context?: string;
  data?: unknown;
  timestamp: string;
}

class Logger {
  private isDevelopment = ENV.environment === 'development';

  private formatMessage(level: LogLevel, tag: string, message: string, payload?: LogPayload): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${tag}]: ${message}`;
  }

  private sanitize(data: unknown): unknown {
    if (!data) return data;
    if (typeof data !== 'object') return data;

    try {
      const sanitized = JSON.parse(JSON.stringify(data));
      const sensitiveKeys = ['password', 'token', 'secret', 'auth', 'creditCard', 'ssn', 'medicalNotes'];

      const redact = (obj: Record<string, unknown>) => {
        for (const key of Object.keys(obj)) {
          if (sensitiveKeys.some((s) => key.toLowerCase().includes(s.toLowerCase()))) {
            obj[key] = '***REDACTED***';
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            redact(obj[key] as Record<string, unknown>);
          }
        }
      };

      redact(sanitized as Record<string, unknown>);
      return sanitized;
    } catch {
      return '[Unparseable Data]';
    }
  }

  debug(tag: string, message: string, data?: unknown): void {
    if (this.isDevelopment && ENV.enablePerfLogs) {
      console.log(this.formatMessage('DEBUG', tag, message), data ? this.sanitize(data) : '');
    }
  }

  info(tag: string, message: string, data?: unknown): void {
    console.info(this.formatMessage('INFO', tag, message), data ? this.sanitize(data) : '');
  }

  warn(tag: string, message: string, data?: unknown): void {
    console.warn(this.formatMessage('WARN', tag, message), data ? this.sanitize(data) : '');
  }

  error(tag: string, message: string, error?: unknown): void {
    console.error(this.formatMessage('ERROR', tag, message), error ? this.sanitize(error) : '');
  }
}

export const logger = new Logger();
