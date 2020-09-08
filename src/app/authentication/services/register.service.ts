import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  // signUpAPIUrl = `https://rkroboto.herokuapp.com/api/auth/signin`;
  signUpAPIUrl = environment.apiURL + '/api/auth/signup';
  regsiteraa(user1: any) {
    console.log('registerd details', user1);
    return this.http.post(this.signUpAPIUrl, user1);
  }

}
