import {
  Injectable
} from '@angular/core';
import {
  environment
} from 'src/environments/environment';
import {
  HttpClient
} from '@angular/common/http';
import {
  StorageService
} from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  signInAPIUrl = environment.apiURL + '/api/auth/signin';
  resetPasswordAPIUrl = environment.apiURL + '/api/auth/forgotpassword';
  sessionTimer: any;
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private storageService: StorageService, private userService: UserService, private myrouter: Router) {}


  userLogin(loginData: any) {
   const userObj = {
     email: loginData.email,
     pwd: loginData.pwd
   };
    // tslint:disable-next-line:align
   this.http.post(this.signInAPIUrl, userObj).subscribe(
      (resp: any) => {
        console.log('response is=>', resp);
        console.log('response id is-->', resp._id);
        if (resp.accessToken) {
          this.storageService.setSessionData('token', resp.accessToken);
          loginData.role = resp.role;
          this.storageService.setSessionData('userDetails', JSON.stringify(resp));
          this.userService.setUserDetails(loginData);
          this.myrouter.navigate(['/home']);
          this.initInactivityTimer();
        }
      },
      (err) => {
        console.log('error in login');
      });
  }


  resetPassword(dataObj: any) {
    return this.http.post(this.resetPasswordAPIUrl, dataObj);
  }


  initInactivityTimer() {
    window.onload = () => {
      this.resetSessionTimer();
    };

    document.onmousemove = () => {
      this.resetSessionTimer();
    };

    document.onkeypress = () => {
      this.resetSessionTimer();
    };
  }

  getToken() {
    return this.storageService.getSessionData('token');
  }

  clearTimers() {
    clearTimeout(this.sessionTimer);
  }

  resetSessionTimer() {
    clearTimeout(this.sessionTimer);
    this.sessionTimer = setTimeout(() => {
    this.userLogout();
    }, 180000);  
  }


  userLogout() {
    this.storageService.deleteSessionData('token');
    this.myrouter.navigate(['/login']);
  }


}
