import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormDataServiceService } from '../../form-data-service.service';
import { RegistrationPopupComponent } from '../home/registration-popup/registration-popup.component';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  constructor(private formDataService: FormDataServiceService, private windowService: NbWindowService) {}
  formData: any;
  ngOnInit() {
    console.log('first');
    this.formData =  this.formDataService.getFormData();
    console.log('Form Data in Success Component:', this.formData);

  }
  ngAfterViewInit(){
    this.formData =  this.formDataService.getFormData();
    console.log('Form Data in Success Component:', this.formData);
  }
  editForm(){
    console.log("Edit Form")
    this.windowService.open(
      RegistrationPopupComponent,
      {
        title: 'Edit Profile',
        hasBackdrop: false,
        closeOnEsc: false,
        context: {
          context: this.formData,
          assignFormDataCallback: this.assignFormData.bind(this),  
        },    
      },
    );
  }

  assignFormData(){
    this.formData =  this.formDataService.getFormData();
    console.log('Form Data in Success Component:', this.formData);
  }
}
