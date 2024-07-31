import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-item',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, NgTemplateOutlet],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

    content: string = '';
    submitted: boolean = false;

    onChange(event: Event){
        console.log('onChange has been called')
        let eventTarget = event.target as HTMLInputElement
        this.content = eventTarget.value;
        console.log(this.content)
    }

    onSaveInput() {
        console.log('onSaveInput() has been called')
        this.submitted = true;
    }
}
