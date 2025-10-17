import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET: string = typeof process.env.JWT_SECRET === 'string' && process.env.JWT_SECRET.length > 0 ? process.env.JWT_SECRET : 'default_secret';
const JWT_EXPIRES_IN: string = typeof process.env.JWT_EXPIRES_IN === 'string' && process.env.JWT_EXPIRES_IN.length > 0 ? process.env.JWT_EXPIRES_IN : '1h';


/**
 * Signs a JWT token with the given payload.
 * @param payload - The payload to sign.
 * @returns The signed JWT token as a string.
 */
export function signJwt(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifies a JWT token and returns the decoded payload if valid.
 * @param token - The JWT token to verify.
 * @returns The decoded payload as JwtPayload, or null if invalid.
 */
export function verifyJwt(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'object') {
      return decoded as JwtPayload;
    }
    return null;
  } catch {
    return null;
  }
}
