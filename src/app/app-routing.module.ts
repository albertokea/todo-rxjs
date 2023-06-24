import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo-list',
    pathMatch: 'full'
  },
  {
    path: 'todo-list',
    loadChildren: () => import('./views/todo-list/todo-list.module').then((m) => m.ToDoListModule),
  },
  {
    path: '**',
    redirectTo: 'todo-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
