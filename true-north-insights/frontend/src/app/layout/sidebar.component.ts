import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
