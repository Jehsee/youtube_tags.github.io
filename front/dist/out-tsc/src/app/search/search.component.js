import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let SearchComponent = class SearchComponent {
    constructor(apiService) {
        this.apiService = apiService;
        this.columns = ['videoUrls', 'videoTags', 'update'];
    }
    ngOnInit() {
        this.apiService.getVideos()
            .subscribe((videos) => {
            this.videos = videos;
            console.log('this.videos: ', this.videos);
        }, (error) => {
            this.errorMsg = error.error.message;
        });
    }
    ngAfterViewInit() {
        console.log("this is ngafterview init");
        // Invoked when the component’s view has been fully initialized.
        // @ts-ignore
        new YT.Player('player-0', {
            videoId: 'DAlvbZzrppQ',
            events: {
                'onReady': this.onPlayerReady.bind(this),
            }
        });
    }
    onYouTubeIframeAPIReady() {
        this.youtubeUrl = tagForm.value.youtubeLink;
        let videoId = tagForm.value.youtubeLink.split('?v=')[1];
        if (this.player) {
            this.player.destroy();
        }
        // @ts-ignore
        this.player = new YT.Player('player', {
            height: '450',
            width: '100%',
            videoId: videoId,
            events: {
                'onReady': this.onPlayerReady.bind(this),
                'onError': this.onPlayerError.bind(this)
            }
        });
        this.playerCreated = true;
    }
    onPlayerReady(event) {
        event.target.playVideo();
    }
};
SearchComponent = tslib_1.__decorate([
    Component({
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.scss']
    })
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map