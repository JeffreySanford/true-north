import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.scss'],
  standalone: false,
})
export class MiniCalendarComponent implements OnChanges {
  @Input() startDate = '';
  @Input() endDate = '';
  @Input() highlight = false;

  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  monthName = '';
  year = 0;
  calendarCells: {
    day: number;
    isHighlighted: boolean;
    borderColor?: string;
    type?: string;
  }[] = [];

  ngOnChanges() {
    // Defensive: ensure string type for startDate/endDate
    const startStr = this.startDate ?? '';
    const endStr = this.endDate ?? '';
    if (!startStr || !endStr) return;
    const start = new Date(startStr);
    const end = new Date(endStr);
    this.monthName = start.toLocaleString('default', { month: 'short' });
    this.year = start.getFullYear();
    const firstDayOfMonth = new Date(start.getFullYear(), start.getMonth(), 1);
    const lastDayOfMonth = new Date(
      start.getFullYear(),
      start.getMonth() + 1,
      0
    );
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();
    this.calendarCells = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      this.calendarCells.push({ day: 0, isHighlighted: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const current = new Date(start.getFullYear(), start.getMonth(), day);
      let borderColor = '';
      let isHighlighted = false;
      let type = '';
      if (current.getTime() === start.getTime()) {
        isHighlighted = true;
        borderColor = '#388e3c'; // green for start
        type = 'start';
      } else if (current.getTime() === end.getTime()) {
        isHighlighted = true;
        borderColor = '#1976d2'; // blue for completed
        type = 'completed';
      } else if (current > start && current < end) {
        isHighlighted = true;
        borderColor = '#fbc02d'; // yellow for active
        type = 'active';
      }
      this.calendarCells.push({ day, isHighlighted, borderColor, type });
    }
  }
}
