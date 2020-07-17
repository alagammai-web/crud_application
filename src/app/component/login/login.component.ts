import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder } from '@angular/forms';
import { CryptojsService } from 'src/app/services/cryptojs.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginHeader = 'User Login';
  loginform: FormGroup;
  abc: string;
  isForgotPassword: boolean;

  
  constructor(private fm: FormBuilder, private crypto: CryptojsService, private loginService: LoginService) {
    this.loginform = this.fm.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+).([a-zA-Z]{2,5})$/)]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
   }

  ngOnInit(): void {
  }

  get lemail(){
    return this.loginform.get('email');
  }
  get lpwd(){
    return this.loginform.get('pwd');
  }

  login(){
    this.loginform.value.pwd = this.crypto.passwordHashing(this.loginform.value.pwd);
    console.log('login form is-->', this.loginform.value);
    this.loginService.userLogin(this.loginform.value);
  }

  setResetPassword(){
    this.isForgotPassword = true;
    this.loginHeader = 'Password Reset';
  }
  resetPassword(loginform){
    const dataobj = {
      uMail: loginform.value.email
    };

    this.loginService.resetPassword(dataobj).subscribe((resp) => {
      console.log('Resp - resetpasword', resp);
      this.isForgotPassword = false;
      this.loginHeader = 'User Login';
    });
    loginform.reset();
  }

}
