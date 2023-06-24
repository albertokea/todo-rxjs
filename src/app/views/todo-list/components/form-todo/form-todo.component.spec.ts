/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTodoComponent } from './form-todo.component';
import { ToDoListModule } from '../../todo-list.module';
import { AppModule } from '../../../../../../src/app/app.module';

describe('FormTodoComponent', () => {
  let component: FormTodoComponent;
  let fixture: ComponentFixture<FormTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTodoComponent ],
      imports: [ToDoListModule, AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it("should emit task if form is valid", () => {
        const newTaskEmitterSpy = jest.spyOn(component.newTask, 'emit');
        component.todoForm.setValue({ description: "Test task" });
        component.addTask();
        expect(newTaskEmitterSpy).toHaveBeenCalledWith("Test task");
    });
});
