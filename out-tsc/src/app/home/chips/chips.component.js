import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
let ChipsComponent = class ChipsComponent {
    constructor(apiService, router) {
        this.apiService = apiService;
        this.router = router;
        this.tags = [];
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.separatorKeysCodes = [ENTER, COMMA];
    }
    ngOnInit() {
        console.log('this.tags: ', this.tags);
    }
    add(event) {
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
    remove(tag) {
        const index = this.tags.indexOf(tag);
        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    }
    saveVideo() {
        this.apiService.createVideo(this.youtubeUrl, this.tags)
            .subscribe((createdVideo) => {
            console.log('createdVideo: ', createdVideo);
        }, (error) => {
            this.errorMsg = error.error.message;
        });
    }
};
tslib_1.__decorate([
    Input()
], ChipsComponent.prototype, "youtubeUrl", void 0);
tslib_1.__decorate([
    Input()
], ChipsComponent.prototype, "tags", void 0);
ChipsComponent = tslib_1.__decorate([
    Component({
        selector: 'chips',
        templateUrl: './chips.component.html',
        styleUrls: ['./chips.component.scss']
    })
], ChipsComponent);
export { ChipsComponent };
//# sourceMappingURL=chips.component.js.map