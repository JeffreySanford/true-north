import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ViewModeService } from '../shared/ui-services/view-mode.service';
import {
  Router,
  NavigationEnd,
  Route,
  RoutesRecognized,
} from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: false,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly viewMode = inject(ViewModeService);
  private readonly router = inject(Router);
  public showKanbanToggle = false;
  private readonly destroy$ = new Subject<void>();

  // Observable navigation items
  public navItems$: BehaviorSubject<Array<{ path: string; title: string }>> =
    new BehaviorSubject<Array<{ path: string; title: string }>>([]);

  // Simulated user authentication state
  public isAuthenticated$ = new BehaviorSubject(false);

  get kanbanActive() {
    return this.viewMode.kanban();
  }
  toggleMode() {
    this.viewMode.toggle();
  }

  ngOnInit(): void {
    this.updateKanbanToggle(this.router.url);
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.updateKanbanToggle(event.urlAfterRedirects);
      });

    // Collect navigation items from router config
    this.collectNavItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateKanbanToggle(url: string) {
    this.showKanbanToggle = url.includes('/projects');
  }

  private collectNavItems() {
    // Get all routes from router config
    const routes: Route[] = this.router.config[0]?.loadChildren
      ? []
      : this.router.config;
    // Fallback: manually collect from coreRoutes if needed
    // For now, hardcode coreRoutes import
    const coreRoutes: Route[] = [
      { path: 'overview', data: { title: 'Overview' } },
      { path: 'projects', data: { title: 'Planning' } },
      { path: 'dashboard', data: { title: 'Dashboard' } },
      { path: 'reports', data: { title: 'Reports' } },
      { path: 'contact', data: { title: 'Contact' } },
      { path: 'about', data: { title: 'About' } },
      { path: 'development', data: { title: 'Development' } },
    ];
    // Filter by authentication state
    const allowed = coreRoutes.filter((route) => {
      // Example: only show dashboard/reports if authenticated
      if (
        (route.path === 'dashboard' || route.path === 'reports') &&
        !this.isAuthenticated$.value
      ) {
        return false;
      }
      return true;
    });
    this.navItems$.next(
      allowed.map((route) => ({
        path: `/${route.path}`,
        title: route.data?.['title'] || route.path,
      }))
    );
  }

  // Simulate authentication toggle (for demo)
  toggleAuth() {
    this.isAuthenticated$.next(!this.isAuthenticated$.value);
    this.collectNavItems();
  }
}
