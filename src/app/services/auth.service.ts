import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { dev } from '../config/service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = dev.baseUrl + dev.endpoint.registerUrl;
  private popularCountsUrl = dev.baseUrl + dev.endpoint.popularCountsUrl;
  private verifyUrl = dev.baseUrl + dev.endpoint.verifyUrl;
  private checkAnagram = dev.baseUrl + dev.endpoint.checkAnagram;
  private loginUrl = dev.baseUrl + dev.endpoint.loginUrl;
  private checkUserUrl = dev.baseUrl + dev.endpoint.checkUserUrl;

  constructor(private http: HttpClient, private router: Router, private notifyService: NotificationService) { }


  popularCounts() {
    return this.http.get<any>(this.popularCountsUrl);
  }

  verifyToken(token: any) {
    const params = new HttpParams().set('token', token);
    return this.http.get<any>(this.verifyUrl, { params });
  }

  registerUser(user: any) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this.loginUrl, user);
  }

  checkUser(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.get<any>(this.checkUserUrl, { params });
  }

  logOutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.notifyService.showSuccess('LoggedOut Successfully', '');
    this.router.navigate(['/login']);
  }

  loggedIn() {
    return localStorage.getItem('token') !== null ? true : false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  checkAnagramForUser(data: any) {
    return this.http.post<any>(this.checkAnagram, data);
  }
}
