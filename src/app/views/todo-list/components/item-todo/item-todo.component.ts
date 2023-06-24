import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.interface';

@Component({
  selector: 'app-item-todo',
  templateUrl: './item-todo.component.html',
  styleUrls: ['./item-todo.component.scss']
})
export class ItemTodoComponent {
  @Input() task: Task;
  @Output() changedTask = new EventEmitter<{id: number, action: string}>()

  public endTask() {
    this.task.status = 1;
    this.changedTask.emit({id: this.task.id, action: 'end'})
  }

  public deleteTask() {
    this.changedTask.emit({id: this.task.id, action: 'delete'})
  }

  get finishedTask() {
    return this.task.status === 1;
  }

}
