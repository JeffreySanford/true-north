import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// Import JSON seed using default import (avoids upcoming named export restrictions in bundler)
import seedData from '../../../../documentation/data/time-tracking-seed.json';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  estimatedHours: number;
  actualHours: number;
  startedAt: string;
  completedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  // Strongly type the portion of the seed file we consume
  private readonly rawTasks: Task[] = (seedData as { tasks?: unknown }).tasks ?
    // Narrow & validate shape defensively; fallback to empty array if unexpected
    (seedData as { tasks: Task[] }).tasks.slice() : [];

  public getTasks(): Observable<Task[]> {
    // Return a shallow copy to avoid accidental mutation of the seed reference
    return of(this.rawTasks.map(t => ({ ...t })));
  }
}
