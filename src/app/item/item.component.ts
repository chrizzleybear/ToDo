import { NgTemplateOutlet } from '@angular/common';
import { Component, ComponentRef } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, NgTemplateOutlet, MatCardModule, MatButtonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

    content: string = '';
    submitted: boolean = false;

    componentRef!: ComponentRef<ItemComponent>

    onChange(event: Event){
        console.log('onChange has been called')
        let eventTarget = event.target as HTMLInputElement
        this.content = eventTarget.value;
        console.log(this.content)
    }

    deleteItem() {
        console.log('destroying this Item')
        this.componentRef.destroy();
    }

    onSaveInput() {
        console.log('onSaveInput() has been called')
        this.submitted = true;
    }
}
