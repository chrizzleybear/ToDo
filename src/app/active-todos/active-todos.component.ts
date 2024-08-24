import {
    Component,
    ViewChild,
    ViewContainerRef,
    OnInit,
    ComponentRef,
  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ItemComponent } from '../item/item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ItemDTO } from '../DTOs/ItemDTO';
import { DataService } from '../data.service';

@Component({
  selector: 'app-active-todos',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    ItemComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './active-todos.component.html',
  styleUrl: './active-todos.component.css',
})
export class ActiveTodosComponent implements OnInit {
  items: ItemDTO[] = [];

  constructor(private dataService: DataService) {}

  @ViewChild('container', { read: ViewContainerRef, static: true })
  private viewContainerRef!: ViewContainerRef;

  lastListedItem: ComponentRef<ItemComponent> | null = null;

  addItem(): void {
    if (this.lastListedItem && this.lastListedItem.instance.inputMode) {
      this.lastListedItem.instance.SaveInput();
    }
    this.lastListedItem = this.viewContainerRef.createComponent(ItemComponent);
    this.lastListedItem.instance.componentRef = this.lastListedItem;
  }

  listItem(item: ItemDTO): void {
    let componentRef = this.viewContainerRef.createComponent(ItemComponent);
    let instance: ItemComponent = componentRef.instance;

    instance.itemDto = item;
    instance.componentRef = componentRef;
    instance.inputMode = false;
  }

  ngOnInit(): void {
    console.log('initializing items from db');
    this.dataService.getItems().subscribe((data) => {
      this.items = data;
      this.sortItemsById();
      for (let item of this.items) {
        this.listItem(item);
      }
    });
  }

  sortItemsById(): void {
    this.items.sort((a, b) => {
      return (a.id ?? 0) - (b.id ?? 0);
    });
  }
}
