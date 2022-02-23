import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  form: FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  email: FormControl = new FormControl("", [Validators.required,Validators.email]);
  phone: FormControl = new FormControl("", [Validators.required]);
  companyName: FormControl = new FormControl("", [Validators.required]);
  message: FormControl = new FormControl("", [Validators.required]);
  businessType: FormControl = new FormControl("");
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  response: string; // the response message to show to the user
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message,
      phone: this.phone,
      companyName: this.companyName,
      businessType: this.businessType
    });
    this.response = "";
  }

    ngOnInit(): void {}
    onSubmit() {
      if (this.form.status == "VALID") {
        this.form.disable(); 

        let formData: any = new FormData();
        let name = this.form.get("name")!.value;
        let email =  this.form.get("email")!.value;
        let message = this.form.get("message")!.value;
        let phone = this.form.get("phone")!.value;
        let companyName = this.form.get("companyName")!.value;
        let businessType = this.form.get("businessType")!.value;

        formData.append("Name", name);
        formData.append("Email", email);
        formData.append("Pessage", message);
        formData.append("Phone", phone);
        formData.append("CompanyName", companyName);
        formData.append("BusinessType", businessType);

        console.log('form' + formData);

        // let postbody = JSON.stringify(formData);
        // console.log('body' + postbody);

        let successResponse = `Thank you for your Submission!
        Name: ${this.name}
        Email: ${this.email}
        Message: ${this.message}
        Phone: ${this.phone}
        Company Name: ${this.companyName}
        Business Type: ${this.businessType}`;


        this.isLoading = true; 
        this.submitted = false; 
        var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

        // this.http.get('https://localhost:5001/api/ContactUs/messageId?id=1').subscribe(
        //   (getResponse) => {
        //     console.log(getResponse);
        //   },
        //   (error) => {
        //     console.log(error);
        //   });

        this.http.post('https://localhost:5001/api/ContactUs', formData, {headers: headers}).subscribe(
          (postResponse) => {
            this.response = successResponse;
            this.form.enable(); // re enable the form after a success
            this.submitted = true; // show the response message
            this.isLoading = false; // re enable the submit button
            console.log(postResponse);
          },
          (error) => {
            this.response = "Oops! An error occurred... Reload the page and try again.";
            this.form.enable(); // re enable the form after a success
            this.submitted = true; // show the response message
            this.isLoading = false; // re enable the submit button
            console.log(error);
          }
        );
      }
    }
  }
