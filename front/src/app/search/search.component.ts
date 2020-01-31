import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Video } from 'src/app/model/video';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public YT: any;
  public player: any;
  public videos: Array<Video>;
  public errorMsg: string;
  public columns = ['videoUrls','videoTags','update'];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initYoutubeScript();
    this.apiService.getVideos()
      .subscribe((videos: Video[]) => {
        this.videos = videos;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      },
      () => {
        // For some reason, the dom element that the Youtube iframe function is looking for is not available by the time the service is completed. 
        // I thought ngAfterViewInit should take care of this? but it doesnt. =(
        // temporary solution - settimeout to make sure the dom elements are rendered before function below runs.
        setTimeout(()=> {
          this.loadAllVideos()
        }, 13)
        // interesting fact - a team of neuroscientists from MIT has found that the human brain can process entire images that the eye sees for as little as 13 milliseconds, which i set the timeout to.
      })
  }
  
  initYoutubeScript() {
    var tag = document.createElement('script');
  
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);    
  }

  loadAllVideos() {
    this.videos.forEach((p,i) => {
      this.onYouTubeIframeAPIReady(p,i);
    })
  }

  onYouTubeIframeAPIReady(video, index) {
    let videoId = video.url.split('?v=')[1]
    let playerId = `player-${index}`;

    // @ts-ignore
    new YT.Player(playerId, {
      height: 250,
      width: '75%',
      videoId: videoId
    });
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }

  updateVideo(video) {
    this.apiService.udpateVideo(video._id,video.tags)
      .subscribe((updatedVideo)=> {
        console.log('updatedVideo: ',updatedVideo);
      },
      (error) => {
        this.errorMsg = error.error.message;
      })
  }

}
