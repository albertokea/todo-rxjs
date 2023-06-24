/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilterTodoComponent } from './filter-todo.component';
import { ToDoListModule } from '../../todo-list.module';

describe('FilterTodoComponent', () => {
  let component: FilterTodoComponent;
  let fixture: ComponentFixture<FilterTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTodoComponent ],
      imports: [ToDoListModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should emit a correct value", () => {
    const filterTodo = new FilterTodoComponent();
    const mockEmitter = jest.fn();
    filterTodo.filterChange.subscribe(mockEmitter);
    filterTodo.changeFilter();
    expect(mockEmitter).toHaveBeenCalledWith(filterTodo.filterValue);
});
});
