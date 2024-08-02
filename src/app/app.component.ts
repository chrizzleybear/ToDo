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
import { ItemDTO } from './ItemDTO';
import { DataService } from './data.service';

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

  @ViewChild('template') private templateRef!: TemplateRef<any>;

  lastSavedItem: ComponentRef<ItemComponent> | null = null;

  addItem(): void {
    if (this.lastSavedItem) {
      this.lastSavedItem.instance.onSaveInput();
    }
    this.lastSavedItem = this.viewContainerRef.createComponent(ItemComponent);
    this.lastSavedItem.instance.componentRef = this.lastSavedItem;
  }

  ngOnInit(): void {
    console.log('initializing items from db');
    this.dataService.getItems().subscribe((data) => {
      this.items = data;
      this.sortItemsByRank();
      for (let item of this.items) {
        console.log(item.content);
        this.addItem();
        this.lastSavedItem!.instance.content = item.content
      }
      this.lastSavedItem?.instance.onSaveInput();
    });
  }

  sortItemsByRank(): void {
    this.items.sort((a, b) => {
      return a.rank - b.rank;
    });
  }
}
