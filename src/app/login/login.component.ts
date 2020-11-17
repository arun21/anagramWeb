import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = { email: '', password: '' };
  loginForm!: FormGroup;
  submitted = false;
  constructor(public ROUTER: Router, public AUTH: AuthService, private notifyService: NotificationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  loginUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.AUTH.loginUser(this.loginUserData)
      .subscribe(
        res => {
          if (res.value) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('email', res.email);
            this.notifyService.showSuccess(`${res.email} loggedIn Successfully`);
            this.loginUserData = { email: '', password: '' };
            this.ROUTER.navigate(['/dashboard']);
          } else {
            this.notifyService.showError(res.text, 'Login Failure:');
          }
        },
        err => {
          this.notifyService.showError(err.error, 'Login Failure:');
        }
      );
  }

}
