import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardUserData = { firstData: '', secondData: '' };
  dashboardForm!: FormGroup;
  submitted = false;
  constructor(public ROUTER: Router, public AUTH: AuthService, private notifyService: NotificationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.dashboardForm = this.fb.group({
      firstData: ['', [Validators.required, Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$')]],
      secondData: ['', [Validators.required, Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$')]]
    });
  }

  get f() { return this.dashboardForm.controls; }

  checkAnagram() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dashboardForm.invalid) {
      return;
    }
    this.AUTH.checkAnagramForUser(this.dashboardUserData)
      .subscribe(
        res => {
          this.notifyService.showSuccess(`${res.email} logged-In Successfully`, 'Notification:');
          this.dashboardUserData = { firstData: '', secondData: '' };
        },
        err => {
          this.notifyService.showError(err.error, 'Login Failure:');
        }
      );
  }


}
