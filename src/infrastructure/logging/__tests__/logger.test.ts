import { logger } from '../logger';

describe('Centralized Logger Infrastructure', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should format and log info messages with tag and timestamp', () => {
    logger.info('TestModule', 'Test info log message', { key: 'value' });
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('[INFO] [TestModule]: Test info log message');
  });

  it('should redact sensitive fields in data payloads', () => {
    const sensitiveData = {
      token: 'jwt-secret-token-12345',
      password: 'myPassword!',
      user: {
        medicalNotes: 'Sensitive diagnosis details',
        name: 'John Doe',
      },
    };

    logger.info('AuthModule', 'User login attempt', sensitiveData);
    const loggedPayload = consoleSpy.mock.calls[0][1];
    expect(loggedPayload.token).toBe('***REDACTED***');
    expect(loggedPayload.password).toBe('***REDACTED***');
    expect(loggedPayload.user.medicalNotes).toBe('***REDACTED***');
    expect(loggedPayload.user.name).toBe('John Doe');
  });
});
