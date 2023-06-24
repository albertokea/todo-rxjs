import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../src/app/services/task.service';
import {
  Observable,
} from 'rxjs';
import { Task } from '../../../../src/app/models/task.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getAllTasks();
    this.tasks$ = this.taskService.tasks.asObservable();
  }

  public addTask(taskDescription: string) {
    this.taskService.addTask(taskDescription);
  }

  public changeTask(taskInfo: {id: number, action: string}) {
    if(taskInfo.action === 'delete') {
      this.taskService.deleteTask(taskInfo.id)
    } else {
      this.taskService.orderTasks();
    }
  }

  public changeFilter(filterValue: number) {
    this.taskService.filterTasks(filterValue);
  }
}
