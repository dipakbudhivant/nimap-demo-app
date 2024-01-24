import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowService } from '@nebular/theme';
import { RegistrationPopupComponent } from './registration-popup/registration-popup.component';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;
  submitted: boolean = false;
  partTime: boolean = false;
  fullTime: boolean = false;
  locations: any = [
    'Mumbai',
    'Pune',
    'Delhi',
    'New York'
  ]
  constructor(private fb: FormBuilder, private windowService: NbWindowService,) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      jobDesc: ['', Validators.required],
      partTime: [false],
      fullTime: [false],
      location: ['']
    })
  }

  get f() { return this.searchForm.controls; }
  // @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

  onSearchFormSubmit(){
    this.submitted = true;
    if (this.searchForm.valid){
      this.submitted = false;
      console.log("Valid Form Data",this.searchForm.getRawValue())
    }
    else {
      this.submitted = true;
      console.log("Invalid Form")
    }
  }
  
  registerUser(){
    console.log('User clicked !...')

    this.windowService.open(
      RegistrationPopupComponent,
      {
        title: 'Registration',
        hasBackdrop: false,
        closeOnEsc: false,
      },
    );
  }

  jobType(a: any){
    if(a == 1){
      this.partTime = !this.partTime;
    } else if(a == 2){
      this.fullTime = !this.fullTime;
    }
  }

}
