import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectComponent } from './project.component';
import { ProjectDataService, Task } from './project-data.service';

class MockProjectDataService {
  // Minimal observable-like object supporting pipe().subscribe() for the component test
  getTasks() {
    const tasks: Task[] = [{
      id: 't1',
      title: 'Test Task',
      description: 'Desc',
      status: 'completed',
      priority: 'high',
      category: 'dev',
      estimatedHours: 1,
      actualHours: 1,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    }];
    return {
      pipe: () => ({
        subscribe: (fn: (t: Task[]) => void) => fn(tasks)
      })
    } as { pipe: () => { subscribe: (fn: (t: Task[]) => void) => void } };
  }
}

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectComponent],
      imports: [
        FormsModule,
        MatCardModule,
        MatSlideToggleModule,
        MatTableModule,
        DragDropModule
      ],
      providers: [
        { provide: ProjectDataService, useClass: MockProjectDataService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
