import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators, } from "@angular/forms";

import { NbWindowRef, NbTagComponent, NbTagInputDirective } from "@nebular/theme";
import { FormDataServiceService } from "../../../form-data-service.service";
import { Router } from "@angular/router";
// import { trees } from './trees-list';

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
  tagsArr: string[] = [];
  tags: Set<string> = new Set<string>();
  options: string[] = [ "Hockey", "Valorant", "CS:GO", "Hiking"];
  imagePath: any;
  selectedImagePath: any;
  constructor(
    public windowRef: NbWindowRef,
    private formBuilder: FormBuilder,
    private formDataService: FormDataServiceService,
    private router: Router,
  ) {}

    // list tags

    @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInput: ElementRef<HTMLInputElement>;
  
    onTagRemove(tagToRemove: NbTagComponent): void {
      this.tags.delete(tagToRemove.text);
      this.options.push(tagToRemove.text);
    }
  
    onTagAdd(value: string): void {
      if (value) {
        this.tags.add(value);
        this.options = this.options.filter(o => o !== value);
      }
      this.tagInput.nativeElement.value = '';
    }

  ngOnInit() {
    this.userRegistrationForm = this.formBuilder.group({
      firstName: ["",[Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
      lastName: ["", [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
      emailId: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
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
      age: [20, [Validators.required, Validators.min(20), Validators.max(60)]],
      tags: [[]],
      selectedImagePath: [""]
      // userImage: ['', Validators.required]
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

  // disableWhitespaces(control: AbstractControl) {
  //   if (control && control.value && !control.value.replace(/\s/g, "").length) {
  //     control.setValue("");
  //     return { required: true };
  //   } else {
  //     return null;
  //   }
  // }
  
  OnDestroy() {
    this.resetForm();
  }

  close() {
    this.windowRef.close();
  }

  onSubmit() {
    this.tagsArr = Array.from(this.tags)
    this.f['tags'].setValue(this.tagsArr);
    this.f['selectedImagePath'].setValue(this.selectedImagePath);
    
    console.log("tagstagstags",this.tags, this.tagsArr,'\n\n',this.userRegistrationForm.getRawValue());
    console.log('Selected Image Path:', this.selectedImagePath);

    // console.log("tagstagstags",this.tags, this.tagsArr,'\n\n',(this.userRegistrationForm.getRawValue()).push(this.tagsArr));
    this.submitted = true;
    if (this.userRegistrationForm.valid && this.tagsArr.length !== 0){
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

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      // Assuming you want to log the path of the first selected file
      this.selectedImagePath = URL.createObjectURL(files[0]);
    }
  }


}

