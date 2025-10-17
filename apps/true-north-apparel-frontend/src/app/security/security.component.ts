import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { BehaviorSubject } from 'rxjs';

/**
 *
 */
@Component({
  selector: 'tna-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
  standalone: false
})
export class SecurityComponent {
  readonly user$ = new BehaviorSubject<Record<string, unknown> | null>(null);
  readonly auditLog$ = new BehaviorSubject<Array<{ action: string; timestamp: string; user: string }>>([
    { action: 'Login', timestamp: '2025-10-16T09:00:00Z', user: 'admin' },
    { action: 'Viewed Shop', timestamp: '2025-10-16T09:05:00Z', user: 'admin' },
    { action: 'Logout', timestamp: '2025-10-16T09:10:00Z', user: 'admin' },
    { action: 'Login', timestamp: '2025-10-16T10:00:00Z', user: 'user1' },
    { action: 'Viewed Security', timestamp: '2025-10-16T10:02:00Z', user: 'user1' },
  ]);

  constructor(private auth: AuthService) {
    this.user$.next(this.auth.getUserPayload());
  }

  get isAuthenticated(): boolean {
    return !this.auth.isSessionExpired();
  }

  logout(): void {
    this.auth.clearSession();
    this.user$.next(null);
  }
}
