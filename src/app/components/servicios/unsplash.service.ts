import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  private url: string = environment.urlUnsplash;

  constructor(private http: HttpClient) { }

  getPhotosApi(palabra: string): Observable<any>{
    return this.http.get(`${this.url}?query=${palabra}&client_id=${environment.apiKey}`);
  }
}
