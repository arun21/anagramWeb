import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'https://meowing-sulfuric-hole.glitch.me/api/register';
  private loginUrl = 'https://meowing-sulfuric-hole.glitch.me/api/login';
  private checkUserUrl = 'https://meowing-sulfuric-hole.glitch.me/api/checkUser';

  constructor(private http: HttpClient, private router: Router, private notifyService: NotificationService) { }

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
    localStorage.removeItem('code');
    this.notifyService.showSuccess('LoggedOut Successfully', '');
    this.router.navigate(['/login']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  checkAnagramForUser(data: any) {
    return this.http.post<any>(this.registerUrl, data);
  }
}
