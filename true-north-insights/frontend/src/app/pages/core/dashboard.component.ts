import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `<div class="dashboard-view"><h1>Dashboard</h1><p>Welcome to the dashboard view. Add widgets and analytics here.</p></div>`,
  styles: [`.dashboard-view { padding: 2em; }`],
  standalone: true,
})
export class DashboardComponent {}
