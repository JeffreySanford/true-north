import { Component, OnInit, OnDestroy, inject, effect } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectDataService, Task } from './project-data.service';
import { ViewModeService } from '../shared/ui-services/view-mode.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

interface StageBuckets {
  backlog: Task[];
  active: Task[];
  completed: Task[];
  design: Task[];
  planning: Task[];
}

// Default stage definition; can later be overridden per role / preference
const DEFAULT_STAGES: ReadonlyArray<{
  key: keyof StageBuckets;
  label: string;
}> = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

function deriveStagesForUser(
  role: string | null
): ReadonlyArray<{ key: keyof StageBuckets; label: string }> {
  // Placeholder: in future adapt ordering or visibility based on role
  // e.g., if (role === 'manager') return [...];
  if (role === 'manager') {
    return [
      { key: 'active', label: 'Active' },
      { key: 'backlog', label: 'Backlog' },
      { key: 'completed', label: 'Completed' },
    ];
  } else if (role === 'developer') {
    return [
      { key: 'backlog', label: 'Backlog' },
      { key: 'active', label: 'Active' },
      { key: 'completed', label: 'Completed' },
    ];
  } else if (role === 'designer') {
    return [
      { key: 'design', label: 'Design' },
      { key: 'planning', label: 'Planning' },
      { key: 'active', label: 'Active' },
      { key: 'completed', label: 'Completed' },
    ];
  }

  return DEFAULT_STAGES;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.html',
  styleUrl: './project.scss',
  standalone: false,
})
export class ProjectComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [
    'id',
    'title',
    'status',
    'priority',
    'category',
    'estimatedHours',
    'actualHours',
  ];
  public isKanbanView = false; // mirrored from shared ViewModeService

  public allTasks: Task[] = [];
  public stages = deriveStagesForUser(null); // later pass actual role
  public backlog: Task[] = [];
  public active: Task[] = [];
  public completed: Task[] = [];
  public design: Task[] = [];
  public planning: Task[] = [];
  private readonly destroy$ = new Subject<void>();
  private readonly projectDataService = inject(ProjectDataService);
  private readonly viewMode = inject(ViewModeService);
  private readonly syncEffect = effect(() => {
    this.isKanbanView = this.viewMode.kanban();
  });

  ngOnInit(): void {
    this.isKanbanView = this.viewMode.kanban();
    this.projectDataService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.allTasks = tasks;
        // Simple heuristic mapping: tasks not started -> backlog; in‑progress -> active; finished -> completed
        this.backlog = tasks.filter(
          (t) => !t.startedAt || new Date(t.startedAt) > new Date()
        );
        this.active = tasks.filter(
          (t) =>
            new Date(t.startedAt) <= new Date() &&
            new Date(t.completedAt) >= new Date()
        );
        this.completed = tasks.filter(
          (t) => new Date(t.completedAt) < new Date()
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
