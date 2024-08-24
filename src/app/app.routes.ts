import { Routes } from '@angular/router';
import { ActiveTodosComponent } from './active-todos/active-todos.component';
import { CompletedTodosComponent } from './completed-todos/completed-todos.component';

export const routes: Routes = [
    {path: 'active-todos', component: ActiveTodosComponent}, 
    {path: 'completed-todos', component: CompletedTodosComponent},
];
