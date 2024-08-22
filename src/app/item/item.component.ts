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
import { ItemDTO } from '../DTOs/ItemDTO';

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

  new: boolean = true;
  checked: boolean = false;
  itemDto?: ItemDTO = undefined;

  componentRef!: ComponentRef<ItemComponent>;

  deleteItem() {
    // if its new, it has not been stored yet and does not have to be deleted in DB
    if (this.new) {
        console.log('deleting a freshly created Item');
      this.componentRef.destroy();
    } else if (this.itemDto && this.itemDto.id) {
        console.log(`Deleting item ${this.itemDto.id} with content ${this.itemDto.task} from db`)
      this.dataService.deleteItem(this.itemDto!.id!).subscribe();
      this.componentRef.destroy();
    } else throw new Error('ItemDto is undefined or does not have a valid Id');
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
    let item: Item = new Item(this.itemDto!.task);
    this.dataService.postItem(item).subscribe({
      next: (responseItem: ItemDTO) => {},
    });
  }
}
