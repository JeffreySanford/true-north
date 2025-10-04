import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss'],
})
export class OverviewComponent {}
