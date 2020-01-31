import { Component, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from "../../service/api.service";
import { Video } from 'src/app/model/video';
import { Router } from '@angular/router';

@Component({
  selector: 'chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
  @Input() youtubeUrl:string;
  @Input() tags: string[] = [];
  public videos: Array<Video>;
  public errorMsg: string;
  public successMsg: string;

  visible:boolean = true;
  selectable:boolean = true;
  removable:boolean = true;
  addOnBlur:boolean = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private apiService: ApiService, 
    public router: Router) {}

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  
  remove(tag:string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  saveVideo() {
    this.apiService.createVideo(this.youtubeUrl,this.tags)
      .subscribe((createdVideo: Video) => {
        console.log('createdVideo: ',createdVideo);
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      })
  }

}
