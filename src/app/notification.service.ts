import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: any, title: any) {
    this.toastr.success(message, title, {
      timeOut: 5000,
      positionClass: 'toast-top-center'
    });
  }

  showError(message: any, title: any) {
    this.toastr.error(message, title, {
      timeOut: 5000,
      positionClass: 'toast-top-center',
    });
  }
}
