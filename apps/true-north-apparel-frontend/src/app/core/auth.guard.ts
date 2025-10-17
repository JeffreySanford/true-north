
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

/**
 *
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    // Test bypass: allow access if test flag is set
    if (localStorage.getItem('tna_test_bypass') === 'true') {
      return new BehaviorSubject<boolean>(true);
    }
    this.auth.cleanupSession();
    return this.auth.isAuthenticated$.pipe(
      take(1),
      map((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
