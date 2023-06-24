import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-todo',
  templateUrl: './filter-todo.component.html',
  styleUrls: ['./filter-todo.component.scss']
})
export class FilterTodoComponent {

  @Output() filterChange = new EventEmitter<number>();
  filterValue = 2

  public changeFilter() {
    this.filterChange.emit(this.filterValue);
  }

}
