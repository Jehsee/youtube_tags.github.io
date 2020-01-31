import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from 'src/app/model/video';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = environment.API_URL

  constructor(private http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.BASE_URL}/videos`);
  }

  createVideo(url:string, tags: Array<string>): Observable<Video> {
    return this.http.post<Video>(`${this.BASE_URL}/videos`, { url, tags });
  }

  udpateVideo(id:string, tags: Array<string>): Observable<Video> {
    return this.http.put<Video>(`${this.BASE_URL}/videos/${id}`, {"tags": tags});
  }

  deleteVideo(id:string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/videos/${id}`);
  }
}
