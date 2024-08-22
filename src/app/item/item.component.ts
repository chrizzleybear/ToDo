import { NgTemplateOutlet } from '@angular/common';
import { Component, ComponentRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataService } from '../data.service';
import { Item } from '../DTOs/Item.class';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  constructor(private dataService: DataService) {}

  content: string = '';
  new: boolean = true;
  checked: boolean = false;

  componentRef!: ComponentRef<ItemComponent>;

  deleteItem() {
    console.log('destroying this Item');
    this.componentRef.destroy();
  }

  checkItem() {
    /* for now we are just destroying the component. But what we want to do is:
    /  - introducing PostgREST
    /  - storing the content of this item in the db
    /  - build a simple routing mechanism to switch between active todos and checked todos
    /  - maybe implement some statistics about how many items have been checked and when (with graphs)
    */

    console.log('checking the Item');
    this.componentRef.destroy();
  }



  SaveInput() {
    console.log('onSaveInput() has been called');
    this.new = false;
    let item: Item = new Item(this.content);
    this.dataService.postItem(item).subscribe();
  }
}
