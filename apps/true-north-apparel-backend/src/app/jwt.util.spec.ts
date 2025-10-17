import { signJwt, verifyJwt } from './jwt.util';

describe('JWT Utility', () => {
  it('should sign and verify a valid token', (): void => {
    const payload = { userId: 'abc123', role: 'user' };
    const token = signJwt(payload);
    const decoded = verifyJwt(token) as { userId: string; role: string };
    expect(decoded.userId).toBe('abc123');
    expect(decoded.role).toBe('user');
  });

  it('should return null for invalid token', (): void => {
    expect(verifyJwt('invalid.token')).toBeNull();
  });
});
