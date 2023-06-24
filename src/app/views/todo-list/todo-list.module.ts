import { NgModule } from '@angular/core';

import { TodoListComponent } from './todo-list.component';
import { ToDoRoutingModule } from './todo-list-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormTodoComponent } from './components/form-todo/form-todo.component';
import { ItemTodoComponent } from './components/item-todo/item-todo.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FilterTodoComponent } from './components/filter-todo/filter-todo.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    TodoListComponent,
    FormTodoComponent,
    ItemTodoComponent,
    FilterTodoComponent,
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatRadioModule,
    FormsModule
  ],
})
export class ToDoListModule {}
