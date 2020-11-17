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
  result: any;
  records: any = [];
  constructor(public ROUTER: Router, public AUTH: AuthService, private notifyService: NotificationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.AUTH.verifyToken(localStorage.getItem('token'))
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          this.ROUTER.navigate(['/login']);
        }
      );
    this.dashboardForm = this.fb.group({
      firstData: ['', [Validators.required, Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$')]],
      secondData: ['', [Validators.required, Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$')]]
    });
    this.AUTH.popularCounts()
      .subscribe(
        res => {
          this.records = res;
        },
        err => {
          this.notifyService.showError(err);
        }
      );
  }

  get f() { return this.dashboardForm.controls; }

  checkAnagram() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dashboardForm.invalid) {
      return;
    }
    const data = {
      firstData: this.dashboardUserData.firstData,
      secondData: this.dashboardUserData.secondData,
      email: localStorage.getItem('email')
    };
    this.AUTH.checkAnagramForUser(data)
      .subscribe(
        res => {
          this.result = res;
          if (res.code) {
            this.AUTH.popularCounts()
              .subscribe(
                response => {
                  this.records = response;
                },
                err => {
                  this.notifyService.showError(err);
                }
              );
          }
        },
        err => {
          this.notifyService.showError(err);
        }
      );
  }


}
