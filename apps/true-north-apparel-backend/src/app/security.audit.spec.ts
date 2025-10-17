import { AuditEvent } from '../../../../libs/shared/api-interfaces/src/lib/dtos';

describe('Security/Audit', () => {
  it('should create a valid AuditEvent', () => {
    const event: AuditEvent = {
      ts: new Date().toISOString(),
      actor: 'user:123',
      action: 'LOGIN',
      entity: 'user:123',
      details: { ip: '127.0.0.1' }
    };
    expect(event.ts).toMatch(/\d{4}-\d{2}-\d{2}T/);
    expect(event.actor).toContain('user:');
    expect(event.action).toBe('LOGIN');
    expect(event.entity).toBe('user:123');
    expect(event.details).toHaveProperty('ip');
  });

  it('should allow system actor', () => {
    const event: AuditEvent = {
      ts: new Date().toISOString(),
      actor: 'system',
      action: 'SCHEDULED_TASK',
      entity: 'order:456',
    };
    expect(event.actor).toBe('system');
  });
});
