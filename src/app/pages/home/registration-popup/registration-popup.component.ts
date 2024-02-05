import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ElementRef, ViewChild, InjectionToken, Inject, Input, OnDestroy } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators, } from "@angular/forms";

import { NbWindowRef, NbTagComponent, NbTagInputDirective } from "@nebular/theme";
import { FormDataServiceService } from "../../../form-data-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-registration-popup",
  templateUrl: "./registration-popup.component.html",
  styleUrls: ["./registration-popup.component.scss"],
})
export class RegistrationPopupComponent implements OnInit, AfterViewInit, OnDestroy  {
  @Input() context: any;
  @Input() assignFormDataCallback: any;
  
  userRegistrationForm: FormGroup;
  submitted: boolean = false;
  imgSubmitted: boolean = false;
  addressType: string = "";
  newsLetter: boolean = false;
  ageValue: number = 20;
  countryList: any;
  stateList: any = [];
  tagsArr: string[] = [];
  // tags: any = ["Hockey"];
  tags: Set<string> = new Set<string>();
  options: string[] = [ "Hockey", "Valorant", "CS:GO", "Hiking"];
  imagePath: any;
  selectedImagePath: any;
  editMode: boolean = false;
  imgSizeError: boolean;
  constructor(
    public windowRef: NbWindowRef,
    private formBuilder: FormBuilder,
    private formDataService: FormDataServiceService,
    private router: Router,
  ) {}


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
    this.editMode = typeof this.context == 'undefined' ? false : true;
    this.userRegistrationForm = this.formBuilder.group({
      firstName: ["",[Validators.required, Validators.pattern("^[A-Za-z]{1,20}$")]],
      lastName: ["", [Validators.required, Validators.pattern("^[A-Za-z]{1,20}$")]],
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
    this.stateListApi('India');
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

  ngOnDestroy(): void {
    this.resetForm();
  }

  ngAfterViewInit(){
    if(this.editMode){
      this.userRegistrationForm.patchValue(this.context);
      // this.tags = this.f['tags'].value;
      this.tags = new Set<string>(this.f['tags'].value);
      this.selectedImagePath = this.f['selectedImagePath'].value;
    }
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

    this.submitted = true;
    if (this.userRegistrationForm.valid && this.tagsArr.length !== 0 && this.selectedImagePath.length !== 0){
      this.submitted = false;
      console.log("Valid Form Data",this.userRegistrationForm.getRawValue());
      this.formDataService.setFormData(this.userRegistrationForm.getRawValue());
        this.router.navigate(['pages/profile']);
        if (this.context && typeof this.assignFormDataCallback === 'function') {
          this.assignFormDataCallback();
        }
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
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          const img = new Image();
          img.src = e.target.result;
  
          img.onload = () => {
            const width = img.width;
            const height = img.height;
  
            if (width === 310 && height === 325) {
              this.selectedImagePath = e.target.result;
              this.imgSizeError = false;
            } else {
              this.selectedImagePath = null;
              this.imgSizeError = true;
            }
          };
        };
  
        reader.readAsDataURL(file);
      } else {
        this.selectedImagePath = null;
        this.imgSubmitted = true;
        this.imgSizeError = false;
      }
    }
  }
  


}

