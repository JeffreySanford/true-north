import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ViewModeService {
  // false = table, true = kanban
  private readonly _kanban = signal(false);

  // Expose read accessor for template & components
  kanban() { return this._kanban(); }
  setKanban(value: boolean) { this._kanban.set(value); }
  toggle() { this._kanban.update(v => !v); }
}
