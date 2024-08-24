import { NgTemplateOutlet } from '@angular/common';
import { Component, ComponentRef, ViewChild } from '@angular/core';
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
import { TemplateRef } from '@angular/core';

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
  constructor(private dataService: DataService) {
    this.itemDto = {
      task: '',
      done: false,
    };
  }
  @ViewChild('inputField', {static: true}) inputField!: TemplateRef<any>;
  @ViewChild('submittedItem', {static: true}) submittedItem!: TemplateRef<any>;
  @ViewChild('completedItem', {static: true}) completedItem!: TemplateRef<any>;

  inputMode: boolean = true;
  checked: boolean = false;
  itemDto?: ItemDTO = undefined;

  componentRef!: ComponentRef<ItemComponent>;

  defineTemplate() : TemplateRef<any>{
    if (this.itemDto!.done) {
        return this.completedItem;
    }
    if (this.inputMode) {
        return this.inputField;
    }
    return this.submittedItem;
  }



  deleteItem() {
    // if its new, it has not been stored yet and does not have to be deleted in DB
    if (this.inputMode) {
      console.log('deleting a freshly created Item');
      this.componentRef.destroy();
    } else if (this.itemDto && this.itemDto.id) {
      console.log( `Deleting item ${this.itemDto.id} with content ${this.itemDto.task} from db`
      );
      this.dataService.deleteItem(this.itemDto!.id!).subscribe({
        next: (response: ItemDTO) => {
          console.log(response);
        },
      });
      this.componentRef.destroy();
    } else throw new Error('ItemDto is undefined or does not have a valid Id');
  }

  checkItem() {
    this.itemDto!.done = true;
    this.dataService.updateItem(this.itemDto!).subscribe({
      next: (responseItem: ItemDTO) => {
        console.log(responseItem);
        this.itemDto = responseItem;
      },
    });
    console.log('checking the Item');
    this.componentRef.destroy();
  }

  reactivateItem() {
    this.itemDto!.done = false;
    this.dataService.updateItem(this.itemDto!).subscribe({
      next: (responseItem: ItemDTO) => {
        console.log(responseItem);
        this.itemDto = responseItem;
      },
    });
    console.log('reactivating the Item');
    this.componentRef.destroy();
  }
  goInInsertMode() {
    console.log('with this you can change the item. logic not yet implemented');
    this.inputMode = true;
  }

  // if one changes his mind about typing in a new item
  removeInputField() {
    this.componentRef.destroy();
  }

  // this method acts differently depending on the status of the item
  // if item is new and was never stored to db it does not have an id and can saved as new Item with post method
  // if item was already stored it is updated with update method which uses PATCH under the hood
  SaveInput() {
    console.log('onSaveInput() has been called:');
    this.inputMode = false;

    if (this.itemDto!.id) {
      this.dataService.updateItem(this.itemDto!).subscribe({
        next: (response: ItemDTO) => {
          console.log(response);
        },
      });
      return;
    }

    let item: ItemDTO = new Item(this.itemDto!.task);
    this.dataService.postItem(item).subscribe({
      next: (responseItem: ItemDTO) => {
        console.log(responseItem);
        this.itemDto = responseItem;
      },
    });
  }
}
