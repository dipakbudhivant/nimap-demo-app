import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent {

  constructor(private toastrService: NbToastrService) {}
  goToInfo() {
    window.open('https://nimapinfotech.com/', '_blank');
  }

  sendEmailNoti(email: any){
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailRegex.test(email)){
      this.toastrService.show("You have successfully subscribed to our Job Seeker Mailing List. ", "Job Seeker Mail", { status: 'success', duration: 5000 });
    }
    else{
      this.toastrService.show("Kindly enter correct email", "Job Seeker Mail", { status: 'danger', duration: 5000 });
    }
  }
}
