import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { User } from './user.interface';
import { Role } from './roles.enum';
import * as crypto from 'crypto';

type EnvParsedUser = User;

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);
  private users: EnvParsedUser[] = [];
  private indexedByEmail: Map<string, EnvParsedUser> = new Map();

  onModuleInit() {
    this.loadUsersFromEnv();
  }

  private parseRoles(raw: string | undefined): Role[] {
    if (!raw) return [Role.USER];
    return raw
      .split(',')
      .map((r) => r.trim().toLowerCase())
      .filter((r) => r.length > 0)
      .map((r) => r as Role)
      .filter((r) => Object.values(Role).includes(r));
  }

  private sha256(value: string): string {
    return crypto.createHash('sha256').update(value).digest('hex');
  }

  private loadUsersFromEnv() {
    const env = process.env;
    const prefix = 'USER_';
    const keys = Object.keys(env).filter(
      (k) => k.startsWith(prefix) && k.endsWith('_EMAIL')
    );
    const nowIso = new Date().toISOString();
    const users: EnvParsedUser[] = [];

    for (const emailKey of keys) {
      const base = emailKey.substring(
        prefix.length,
        emailKey.length - '_EMAIL'.length
      ); // e.g. CAPTAIN_COLLECTIONS
      const email = env[emailKey];
      if (!email) continue;
      const display = env[`USER_${base}_DISPLAY`] || base;
      const rolesRaw = env[`USER_${base}_ROLES`];
      const roles = this.parseRoles(rolesRaw);
      const passwordPlain = env[`USER_${base}_PASSWORD`];
      const passwordHashEnv = env[`USER_${base}_PASSWORD_SHA256`];
      let passwordHash: string | undefined = passwordHashEnv;

      if (!passwordHash && passwordPlain) {
        passwordHash = this.sha256(passwordPlain);
      }
      if (!passwordHash) {
        // fallback to global shared or dev password hash
        passwordHash = env['DEV_PASSWORD_SHA256'] || 'MISSING_HASH_DEV_ONLY';
      }
      const id = `u-${base.toLowerCase()}`;
      users.push({
        id,
        email,
        displayName: display,
        passwordHash,
        roles,
        createdAt: nowIso,
        status: 'active',
      });
    }

    this.users = users;
    this.indexedByEmail = new Map(users.map((u) => [u.email.toLowerCase(), u]));
    this.logger.log(`Loaded ${users.length} users from environment.`);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.indexedByEmail.get(email.toLowerCase());
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    const digest = this.sha256(password);
    return digest === hash;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const ok = await this.validatePassword(password, user.passwordHash);
    return ok ? user : null;
  }
}
