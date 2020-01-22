import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public YT: any;
  public video: any;
  public player: any;
  public reframed: boolean = false;
  public done: boolean = false;

  youtubeLink = new FormControl();
  videoId: string;
  submitted: boolean = false;

  constructor() { }

  ngOnInit() {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
  
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  
  onYouTubeIframeAPIReady(form: NgForm) {
    this.submitted = true;
    this.videoId = form.value.youtubeLink.split('?v=')[1]

    // @ts-ignore
    this.player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: this.videoId,
      events: {
        'onReady': this.onPlayerReady.bind(this)
      }
    });

    console.log('this.player: ',this.player)
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }


}
