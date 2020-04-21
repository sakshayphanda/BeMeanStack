import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  httpGet(url: string): Observable<any> {
    return this.http.get(url);
  }

  httpPost(url: string, requestPayload: any): Observable<any> {
    return this.http.post(url, requestPayload);
  }
}