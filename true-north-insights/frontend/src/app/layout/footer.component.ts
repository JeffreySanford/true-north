import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
