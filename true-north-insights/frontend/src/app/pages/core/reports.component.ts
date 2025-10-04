import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  template: `<div class="reports-view">
    <h1>Reports</h1>
    <p>Welcome to the reports view. Add reporting features here.</p>
  </div>`,
  styles: [
    `
      .reports-view {
        padding: 2em;
      }
    `,
  ],
  standalone: true,
})
export class ReportsComponent {}
