import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-todo',
  templateUrl: './form-todo.component.html',
  styleUrls: ['./form-todo.component.scss']
})
export class FormTodoComponent {

  @Output() newTask = new EventEmitter<string>();
  todoForm: FormGroup;

  constructor(private fb:FormBuilder) {
    this.todoForm = this.fb.group({
      description: ['', Validators.required]
    })
   }

   addTask() {
    this.newTask.emit(this.todoForm.value.description);
    this.todoForm.reset();
   }

}
