import {
  Component,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  OnInit,
  ComponentRef,
  EmbeddedViewRef,
  ElementRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ItemComponent } from './item/item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ItemDTO } from './DTOs/ItemDTO';
import { DataService } from './data.service';
import { Item } from './DTOs/Item.class';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    ItemComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  items: ItemDTO[] = [];

  constructor(private dataService: DataService) {}

  @ViewChild('container', { read: ViewContainerRef, static: true })
  private viewContainerRef!: ViewContainerRef;


  lastListedItem: ComponentRef<ItemComponent> | null = null;

  addItem(): void {
    if (this.lastListedItem && this.lastListedItem.instance.new) {
      this.lastListedItem.instance.SaveInput();
    }
    this.lastListedItem = this.viewContainerRef.createComponent(ItemComponent);
    this.lastListedItem.instance.componentRef = this.lastListedItem;
  }
  
  listItem(task: string): void {
    let compRef: ComponentRef<ItemComponent> = this.viewContainerRef.createComponent(ItemComponent);
    compRef.instance.content = task;
    compRef.instance.new = false;
    compRef.instance.componentRef = compRef;
  }

  ngOnInit(): void {
    console.log('initializing items from db');
    this.dataService.getItems().subscribe((data) => {
      this.items = data;
      this.sortItemsById();
      for (let item of this.items) {
        this.listItem(item.task);
      }

    });
  }

  sortItemsById(): void {
    this.items.sort((a, b) => {
      return (a.id ?? 0) - (b.id ?? 0);
    });
  }
}
