
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dataSubject = new BehaviorSubject<any>(null);
  private userObjectSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  constructor() {
  }

  setData(newData: any) {
    this.dataSubject.next(newData);
  }

  setDataUserObject(newData: any) {
    this.userObjectSubject.next(newData);
  }

  login(username: string, password: string) {
    sessionStorage.setItem('currentUserRole', 'user');
  }

  logout() {
    sessionStorage.removeItem('currentUserRole');
  }

  getUserRole(): string {
    const currentUserRole: any = sessionStorage.getItem('currentUserRole')
    return currentUserRole;
  }
  getUserObject(): string {
    const currentUserRole: any = sessionStorage.getItem('currentUserRole')
    return currentUserRole;
  }
  getDataUserObject(): Observable<any> {
    return this.userObjectSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.getUserRole() !== null;
  }
}
