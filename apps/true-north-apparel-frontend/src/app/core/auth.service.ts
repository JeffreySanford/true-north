import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 *
 */
@Injectable({ providedIn: 'root' })

export class AuthService {
  private sessionKey = 'tna_session';
  readonly isAuthenticated$ = new BehaviorSubject<boolean>(false);


  setSession(token: string): void {
    localStorage.setItem(this.sessionKey, token);
    this.isAuthenticated$.next(!this.isSessionExpired());
  }

  getSession(): string | null {
    return localStorage.getItem(this.sessionKey);
  }


  clearSession(): void {
    localStorage.removeItem(this.sessionKey);
    this.isAuthenticated$.next(false);
  }

  isSessionExpired(): boolean {
    const token: string | null = this.getSession();
    if (token == null || token === '') return true;
    const payload: { exp?: number } | null = this.decodeToken(token);
    if (payload == null || typeof payload.exp !== 'number') return true;
    const now: number = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }

  getUserPayload(): Record<string, unknown> | null {
    const token: string | null = this.getSession();
    return token != null && token !== '' ? this.decodeToken(token) : null;
  }

  private decodeToken(token: string): Record<string, unknown> | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    } catch {
      return null;
    }
  }

  cleanupSession(): void {
    if (this.isSessionExpired()) {
      this.clearSession();
    } else {
      this.isAuthenticated$.next(true);
    }
  }
}
