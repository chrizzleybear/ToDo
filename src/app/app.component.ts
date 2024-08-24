import { Component } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActiveTodosComponent } from './active-todos/active-todos.component';
import { CompletedTodosComponent } from './completed-todos/completed-todos.component';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTabsModule,
    RouterLink,
    RouterLinkActive,
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
export class AppComponent {
  links = [
    { path: '/active-todos', name: 'Active Todos' },
    { path: '/completed-todos', name: 'Completed Todos' },
  ];
  activeLink = { path: '/active-todos', name: 'Active Todos' };
}
