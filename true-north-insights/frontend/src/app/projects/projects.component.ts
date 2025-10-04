import { Component, OnInit } from '@angular/core';
import { PROJECTS, ProjectSeed, TaskSeed } from './projects-seed';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
  standalone: false,
})
export class ProjectsComponent implements OnInit {
  tableMode: 'full' | 'category' = 'full';
  setTableMode(mode: 'full' | 'category') {
    this.tableMode = mode;
  }
  // Category color map
  categoryColors: { [key: string]: string } = {
    planning: '#1976d2', // blue
    active: '#388e3c', // green
    completed: '#fbc02d', // yellow
    backlog: '#7b1fa2', // purple
    metrics: '#0288d1', // cyan
    security: '#c62828', // red
    performance: '#f57c00', // orange
    rbac: '#6d4c41', // brown
    supplychain: '#00897b', // teal
    devops: '#455a64', // blue-grey
    ai: '#8e24aa', // violet
    writing: '#3949ab', // indigo
    translation: '#00838f', // blue
    gpu: '#00bcd4', // light blue
    graph: '#43a047', // green
    present: '#009688', // teal
    future: '#e65100', // deep orange
    past: '#5d4037', // dark brown
  };

  getCategoryColor(category: string): string {
    // Normalize category string for keys
    const key = category.replace(/[-\s]/g, '').toLowerCase();
    return this.categoryColors[key] || '#cccccc';
  }
  projects: ProjectSeed[] = PROJECTS;
  selectedProjectId: string = PROJECTS[0]?.id;
  isExpandedRow = (_: number, row: TaskSeed) => this.expandedTask === row;
  kanbanView = true;
  expandedTask: TaskSeed | null = null;
  allTasks: TaskSeed[] = [];
  categories: string[] = [];
  displayedColumns: string[] = ['title', 'category', 'status'];

  constructor() {}

  ngOnInit(): void {
    this.updateProjectView(this.selectedProjectId);
  }

  onProjectChange(projectId: string): void {
    this.updateProjectView(projectId);
  }

  updateProjectView(projectId: string): void {
    const project = this.projects.find((p) => p.id === projectId);
    this.allTasks = project ? project.tasks : [];
    this.categories = project
      ? Array.from(new Set(project.tasks.map((t) => t.category)))
      : [];
  }

  getTasksByCategory(category: string): TaskSeed[] {
    return this.allTasks.filter((t) => t.category === category);
  }

  toggleExpand(task: TaskSeed): void {
    this.expandedTask = this.expandedTask === task ? null : task;
  }

  openTask(task: TaskSeed): void {
    // For now, just expand the card/row; later, open a dialog or route
    this.expandedTask = task;
    // TODO: Add dialog/modal for full task details with icons/tooltips
  }

  // Drag-and-drop handler for Kanban board
  onTaskDrop(event: any, targetCategory: string): void {
    const previousContainer = event.previousContainer;
    const container = event.container;
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    const task = previousContainer.data[previousIndex];
    // Remove from previous category
    if (previousContainer !== container) {
      // Remove from old category
      const oldCategoryTasks = previousContainer.data;
      oldCategoryTasks.splice(previousIndex, 1);
      // Add to new category
      const newCategoryTasks = container.data;
      task.category = targetCategory;
      newCategoryTasks.splice(currentIndex, 0, task);
      // Update allTasks to reflect change
      this.allTasks = this.categories.flatMap((cat) =>
        this.getTasksByCategory(cat)
      );
    } else {
      // Reorder within same category
      const categoryTasks = container.data;
      categoryTasks.splice(previousIndex, 1);
      categoryTasks.splice(currentIndex, 0, task);
      this.allTasks = this.categories.flatMap((cat) =>
        this.getTasksByCategory(cat)
      );
    }
  }
}
