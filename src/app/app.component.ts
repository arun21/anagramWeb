import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Anagram';

  auth: any;
  constructor(public AUTH: AuthService) { }

  ngOnInit(): void {
    this.auth = this.AUTH;
  }

  public localStorageItem(id: string) {
    return localStorage.getItem(id) ? localStorage.getItem(id) : null;
  }
}
