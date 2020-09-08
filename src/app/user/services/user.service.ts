import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // getUserAPIUrl = environment.apiURL + '/api/users/:id';
  usersRESTAPIUrl = environment.apiURL + '/api/users';
  userDetails: any;
  userToUpdate: any;


  


  constructor(private http: HttpClient) { }


 

  setUserDetails(user: any) {
    this.userDetails = user;
  }
  getUserDetails() {
    return this.userDetails;
  }
  getUser(userID: string) {
    return this.http.get(this.usersRESTAPIUrl + '/' + userID);
  }
  getUsersList() {
    return this.http.get(this.usersRESTAPIUrl);
  }
  updateUserProfile(userProfile: any){
    return this.http.post(this.usersRESTAPIUrl + '/' + this.userDetails._id + '/updateprofile', userProfile);
  }

  changePassword(passform: any){
    passform._id = this.userDetails._id;
    return this.http.post(this.usersRESTAPIUrl + '/' + this.userDetails._id + '/changepassword', passform );
  }
  updateUser(userDetails: any) {
    return this.http.put(this.usersRESTAPIUrl + '/' + this.userToUpdate._id, userDetails);
  }
  
  deleteUser(userID: any){
    return this.http.delete(this.usersRESTAPIUrl + '/' + userID);
  }


}
