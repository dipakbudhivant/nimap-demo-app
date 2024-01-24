import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

import { NbWindowRef } from "@nebular/theme";
import { FormDataServiceService } from "../../../form-data-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-registration-popup",
  templateUrl: "./registration-popup.component.html",
  styleUrls: ["./registration-popup.component.scss"],
})
export class RegistrationPopupComponent implements OnInit {
  userRegistrationForm: FormGroup;
  submitted: boolean = false;
  addressType: string = "";
  newsLetter: boolean = false;
  ageValue: number = 20;
  countryList: any;
  stateList: any = [];

  constructor(
    public windowRef: NbWindowRef,
    private formBuilder: FormBuilder,
    private formDataService: FormDataServiceService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.userRegistrationForm = this.formBuilder.group({
      firstName: ["", [Validators.required, this.disableWhitespaces]],
      lastName: ["", [Validators.required, this.disableWhitespaces]],
      emailId: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
          this.disableWhitespaces,
        ]),
      ],
      phoneNumber: ["", [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      // phoneNumber: [""],
      addressType: ["", Validators.required], 
      homeAddress1: [""],
      homeAddress2: [""],
      companyAddress1: [""],
      companyAddress2: [""],
      country: ["", Validators.required],
      state: ["", Validators.required],
      newsLetter: [false],
      age: [20, [Validators.required, Validators.min(20), Validators.max(60)]]
    });


    // value change
    this.userRegistrationForm.get('addressType').valueChanges.subscribe(val => {
      if (val === 'home') {
        this.f['homeAddress1'].setValidators([Validators.required, Validators.maxLength(50)]);
        this.f['homeAddress2'].setValidators([Validators.required, Validators.maxLength(50)]);
        this.f['companyAddress1'].setValidators([]);
        this.f['companyAddress2'].setValidators([]);
        this.f['companyAddress1'].setValue('');
        this.f['companyAddress2'].setValue('');
      } else {
        this.f['companyAddress1'].setValidators([Validators.required, Validators.maxLength(50)]);
        this.f['companyAddress2'].setValidators([Validators.required, Validators.maxLength(50)]);
        this.f['homeAddress1'].setValidators([]);
        this.f['homeAddress2'].setValidators([]);
        this.f['homeAddress1'].setValue('');
        this.f['homeAddress2'].setValue('');
      }
      this.f['companyAddress1'].updateValueAndValidity();
      this.f['companyAddress2'].updateValueAndValidity();
      this.f['homeAddress1'].updateValueAndValidity();
      this.f['homeAddress2'].updateValueAndValidity();
    });

    this.countryListApi();
  }

  get f() {
    return this.userRegistrationForm.controls;
  }

  countryListApi(){
    this.formDataService.getCountryList()
    .subscribe((data: any) => {
      this.countryList = data;
    }, (error: any) => {
      console.log(error);
    });
  }

  stateListApi(country: any){
    // Because of the subscription of api i implemented the logocbut commented the code 
    this.stateList = [
      "California", "Texas", "New York", "Ontario", "Quebec", 
      "England", "Bavaria", "Tokyo", "Andhra Pradesh", "Maharashtra"
    ];
    // this.formDataService.getStateList(country)
    // .subscribe((data: any) => {
    //   this.stateList = data;
    // }, (error: any) => {
    //   console.log(error);
    // });
  }

  onChange(selectedValue: any) {
    this.stateListApi(selectedValue);
  }

  disableWhitespaces(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, "").length) {
      control.setValue("");
      return { required: true };
    } else {
      return null;
    }
  }
  
  OnDestroy() {
    this.resetForm();
  }

  close() {
    this.windowRef.close();
  }

  onSubmit() {
    console.log("");
    this.submitted = true;
    if (this.userRegistrationForm.valid){
      this.submitted = false;
      console.log("Valid Form Data",this.userRegistrationForm.getRawValue());
      this.formDataService.setFormData(this.userRegistrationForm.getRawValue());
      this.router.navigate(['pages/profile']);
      this.resetForm();
    }
    else {
      this.submitted = true;
      console.log("Invalid Form")
    }
  }
  
  resetForm() {
    this.userRegistrationForm.reset();
    this.windowRef.close();
  }
  
  toggleNewsLetter() {
    this.newsLetter = !this.newsLetter;
  } 

}

