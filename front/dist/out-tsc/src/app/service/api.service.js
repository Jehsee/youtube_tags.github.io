import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
let ApiService = class ApiService {
    constructor(http) {
        this.http = http;
        this.BASE_URL = environment.API_URL;
    }
    getVideos() {
        return this.http.get(`${this.BASE_URL}/videos`);
    }
    createVideo(url, tags) {
        return this.http.post(`${this.BASE_URL}/videos`, { url, tags });
    }
    deleteVideo(id) {
        return this.http.delete(`${this.BASE_URL}/videos/${id}`);
    }
};
ApiService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ApiService);
export { ApiService };
//# sourceMappingURL=api.service.js.map