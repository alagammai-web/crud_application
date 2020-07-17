import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptojsService {

  constructor() { }

  todayDate() {
    const ndate = new Date();
    return ndate;
  }

  passwordHashing(pwd: string) {
    return CryptoJS.SHA256(pwd).toString();
  }

  // CryptoJS.SHA256(pwd).toString();
  // const pwdhash = CryptoJs.SHA256(this.contactForm.value.pwd).toString();
}
