import { Component, inject } from '@angular/core';
import { ViewModeService } from '../shared/ui-services/view-mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: false,
})
export class HeaderComponent {
  private readonly viewMode = inject(ViewModeService);
  get kanbanActive() { return this.viewMode.kanban(); }

  toggleMode() { this.viewMode.toggle(); }
}
