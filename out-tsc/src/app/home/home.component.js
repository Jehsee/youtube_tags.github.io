import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
let HomeComponent = class HomeComponent {
    constructor(_snackBar) {
        this._snackBar = _snackBar;
        this.reframed = false;
        this.done = false;
        this.playerCreated = false;
        this.showChipsComponent = false;
        this.errorMsg = null;
    }
    ngOnInit() {
        this.tagForm = new FormGroup({
            youtubeLink: new FormControl('')
        });
        this.tagForm.valueChanges.subscribe(console.log);
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    onYouTubeIframeAPIReady(tagForm) {
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
        this.showChipsComponent = true;
        this.errorMsg = null;
    }
    onPlayerError(event) {
        if (event.data == 2) {
            this.showChipsComponent = false;
            this.errorMsg = 'The url seems to be invalid';
            this.openSnackBar('The url seems to be invalid', 'Check URL');
        }
    }
    close() {
        this.errorMsg = null;
    }
    openSnackBar(message, action) {
        this._snackBar.open(message, action, {
            duration: 4000,
        });
    }
};
HomeComponent = tslib_1.__decorate([
    Component({
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss'],
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map