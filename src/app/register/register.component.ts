import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData = { email: '', password: '' };
  registerForm!: FormGroup;
  submitted = false;
  countries: any = [];
  constructor(private formBuilder: FormBuilder, private ROUTER: Router, private _auth: AuthService,
    private notifyService: NotificationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  registerUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this._auth.checkUser(this.registerUserData.email)
      .subscribe(
        response => {
          if (!response) {
            this._auth.registerUser(this.registerUserData)
              .subscribe(
                res => {
                  localStorage.setItem('token', res.token);
                  localStorage.setItem('email', res.email);
                  localStorage.setItem('code', res.code);
                  this.notifyService.showSuccess(`${res.email} successfully registered`, 'Notification:');
                  this.registerUserData = { email: '', password: '' };
                  this.ROUTER.navigate(['/dashboard']);
                },
                err => {
                  this.notifyService.showError(err.message, 'Registeration Failure:');
                }
              );
          } else {
            this.notifyService.showError('User Already Registered', 'Registeration Failure:');
          }
        },
        err => {
          this.notifyService.showError(err.error, 'Registeration Failure:');
        }
      );
  }

}