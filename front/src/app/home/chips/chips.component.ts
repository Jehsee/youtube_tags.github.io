import { Component, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Tag {
  name: string;
}

@Component({
  selector: 'chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {
  @Input() youtubeUrl:string;

  visible:boolean = true;
  selectable:boolean = true;
  removable:boolean = true;
  addOnBlur:boolean = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [];

  add(event: MatChipInputEvent): void {
    console.log('this.youtubeUrl: ',this.youtubeUrl);
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }
    
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  
  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}
