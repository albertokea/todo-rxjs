import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.interface';
import { BehaviorSubject, Subject, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public tasks = new BehaviorSubject<Task[]>([]);
  public allTasks = new BehaviorSubject<Task[]>([]);
  public tasksCount = new BehaviorSubject<number>(0);
  public pendingTasksCount = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {}

  public getAllTasks(): void {
    this.http
      .get<Task[]>('allTasks')
      .pipe(
        map((tasks) => tasks.sort((a, b) => a.status - b.status)),
        take(1)
      )
      .subscribe({
        next: (tasks) => {
          this.tasks.next(tasks);
          this.allTasks.next(tasks)
          this.updateCount(tasks);
        },
        error: (error) => console.error(error),
      });
  }

  public addTask(taskDescription: string): void {
    const task = {
      id: this.tasksCount.getValue() + 1,
      description: taskDescription,
      status: 0,
    };
    this.http
      .post<Task>('task', { task: task })
      .pipe(take(1))
      .subscribe({
        next: () => {
          let tasks = this.tasks.getValue();
          tasks.unshift(task);
          this.allTasks.next(tasks)
          this.updateCount(tasks);
        },
        error: (error) => console.error(error),
      });
  }

  public deleteTask(id: number): void {
    // This would be a DELETE method request but I do it POST to not complicate stubby requests
    this.http
      .post<Task>('deleteTask', { id })
      .pipe(take(1))
      .subscribe({
        next: () => {
          let tasks = this.tasks.getValue();
          tasks = tasks.filter((task) => task.id !== id);
          this.tasks.next(tasks);
          this.allTasks.next(tasks)
          this.updateCount(tasks);
        },
        error: (error) => console.error(error),
      });
  }

  public filterTasks(filterValue: number): void {
    if(filterValue === 2) {
      this.tasks.next(this.allTasks.getValue())
    } else {
      this.tasks.next(this.allTasks.getValue().filter(task => task.status === filterValue))
    }
  }

  public orderTasks(): void {
    this.tasks.getValue().sort((a, b) => a.status - b.status);
    this.updateCount(this.tasks.getValue());
  }

  private updateCount(tasks: Task[]): void {
    this.tasksCount.next(tasks.length);
    this.pendingTasksCount.next(
      tasks.filter((task) => task.status === 0).length
    );
  }
}
