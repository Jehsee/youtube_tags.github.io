import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  videoId: string;

  constructor() { }

  ngOnInit() {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
  
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  
  onYouTubeIframeAPIReady(form: NgForm) {
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
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }


}
