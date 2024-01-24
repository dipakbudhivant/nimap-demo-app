import { Component, OnInit } from '@angular/core';
import { FormDataServiceService } from '../../form-data-service.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private formDataService: FormDataServiceService) {}
  formData: any;
  ngOnInit() {
    console.log('first');
    this.formData =  this.formDataService.getFormData();
    console.log('Form Data in Success Component:', this.formData);

  }
}
