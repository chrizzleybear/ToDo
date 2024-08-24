import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActiveTodosComponent } from './active-todos/active-todos.component';
import { CompletedTodosComponent } from './completed-todos/completed-todos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ItemComponent,
    MatButtonModule,
    MatIconModule,
    ActiveTodosComponent,
    CompletedTodosComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
