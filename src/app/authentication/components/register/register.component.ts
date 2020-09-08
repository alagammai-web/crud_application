import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import { CryptojsService } from 'src/app/core/services/cryptojs.service';
import { RegisterService } from '../../services/register.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  contactForm: FormGroup;
  mn: any;

  
  // tslint:disable-next-line:max-line-length
  constructor(private fm: FormBuilder, private crypto: CryptojsService, private registerService: RegisterService, private myrouter: Router, private http: HttpClient) {
    this.contactForm = this.fm.group({
      uName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      uMail: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+).([a-zA-Z]{2,5})$/)]),
      uAge: new FormControl('', [Validators.required]),
      uMobile: new FormControl('', [Validators.required, Validators.pattern(/^((\+91)?|(91)?|(0)?)([6-9]{1})([0-9]{9})$/)]),
      uPAN: new FormControl('', [Validators.required]),
      uGender: new FormControl('', [Validators.required]),
      uHobbies: this.fm.array([], [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cpwd: new FormControl('', [Validators.required])
    }, {
      validator: this.pwdValidator()
    });
  }




  get fname() {
    return this.contactForm.get('uName');
  }
  get uemail() {
    return this.contactForm.get('uMail');
  }
  get uage() {
    return this.contactForm.get('uAge');
  }
  get umobile() {
    return this.contactForm.get('uMobile');
  }
  get ugender() {
    return this.contactForm.get('uGender');
  }
  get ucountry() {
    return this.contactForm.get('country');
  }
  get upwd() {
    return this.contactForm.get('password');
  }
  get ucpwd() {
    return this.contactForm.get('cpwd');
  }
  get upan() {
    return this.contactForm.get('uPAN');
  }




  uHobbies: Array < any > = [{
      name: 'read',
      value: 'read'
    },
    {
      name: 'cycling',
      value: 'cycling'
    },
    {
      name: 'gardening',
      value: 'gardening'
    }
  ];

  // password validation
  pwdValidator() {
    const pwdvalidate: ValidatorFn = (formGroup: FormGroup) => {
      const pwd1 = formGroup.get('password').value;
      const cpwd1 = formGroup.get('cpwd').value;
      if (cpwd1 !== pwd1) {
        return {
          pwdmismatch: true
        };
      }
    };
    return pwdvalidate;
  }

  ngOnInit(): void {
    this.mn = this.crypto.todayDate();




  }


  // multiple checkbox
  fruitchange(e) {
    const arraycheck1: FormArray = this.contactForm.get('uHobbies') as FormArray;
    if (e.target.checked) {
      arraycheck1.push(new FormControl(e.target.value));
    } else {
      // tslint:disable-next-line:no-inferrable-types
      let i: number = 0;
      arraycheck1.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          arraycheck1.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  register() {
    this.contactForm.value.password = this.crypto.passwordHashing(this.contactForm.value.password);
    this.contactForm.value.uPAN = (this.contactForm.value.uPAN).toUpperCase();
    const hobbiesselected = this.contactForm.value.uHobbies;
    this.contactForm.value.uHobbies = hobbiesselected.join(',');
    // console.log(this.contactForm);
    console.log(this.contactForm.value);
    console.log('password', this.contactForm.value.password);
    console.log('uAge', this.contactForm.value.uAge);
    console.log('uGender', this.contactForm.value.uGender);
    console.log('uHobbies', this.contactForm.value.uHobbies);
    console.log('uMail', this.contactForm.value.uMail);
    console.log('uMobile', this.contactForm.value.uMobile);
    console.log('uName', this.contactForm.value.uName);
    console.log('uPAN', this.contactForm.value.uPAN );

    delete this.contactForm.value.cpwd;


    this.registerService.regsiteraa(this.contactForm.value).subscribe(
      (resp)=>
      {
alert('user registered successfully. try login now');
this.myrouter.navigate(['/login']);
      },
      (err)=>{
        console.log('ERROR OCCUREd', err);
      })
  }

}
