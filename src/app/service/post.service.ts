import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlContant } from 'src/assets/Url-Contant';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  userDefinedURLs = UrlContant;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  LoginUser(data: any): Observable<any> {
    return this.http.post(this.userDefinedURLs.LoginUrl, data);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(this.userDefinedURLs.CreateUserUrl, data);
  }

  createEvent(data: any): Observable<any> {
    return this.http.post(this.userDefinedURLs.CreateEventUrl, data);
  }

  createReward(data: any): Observable<any> {
    return this.http.post(this.userDefinedURLs.CreateRewardUrl, data);
  }

  createContact(data: any): Observable<any> {
    return this.http.post(this.userDefinedURLs.CreateContactUrl, data);
  }

  processUserFromEvent(data: any): Observable<any> {
    return this.http.put(this.userDefinedURLs.processUserFromEventUrl, data);
  }

}
