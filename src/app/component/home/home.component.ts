import {
 Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { CryptojsService } from 'src/app/services/cryptojs.service';
import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  title = 'user management system';
  userDetails1: any;
  userProfile: any;
  usersList: any;
  isAdmin: boolean;
  updateprof: boolean;
  changepwd1: boolean;
  mn: any;

  // profileUpdateForm: FormGroup;
  userdetails2: any;

  // tslint:disable-next-line: max-line-length
  constructor(private fm: FormBuilder, private storageService: StorageService, private userService: UserService, private loginService: LoginService, private cryptojsService: CryptojsService, private router: Router) {
    this.userDetails1 = this.userService.getUserDetails();
    this.userdetails2 = JSON.parse(this.storageService.getSessionData('userDetails'));
    console.log('userennfvmnv', this.userdetails2);
    this.userService.setUserDetails(this.userdetails2);


    // this.profileUpdateForm = this.fm.group({
    //   mobileNo: new FormControl('', [Validators.required, Validators.pattern(/^((\+91)?|(91)?|(0)?)([6-9]{1})([0-9]{9})$/)]),
    //   PANNo: new FormControl('', [Validators.required]),
    // });
  }

  // get umobile() {
  //   return this.updateForm.get('uMobile');
  // }
  // get upan() {
  //   return this.updateForm.get('uPAN');
  // }


  ngOnInit() {
    console.log('show details of the user-->', this.userDetails1);
    if (this.userDetails1.role === 'level1') {
      this.isAdmin = false;
      this.userService.getUser(this.userdetails2._id).subscribe((resp: any) => {
        this.userProfile = resp;
        console.log('User Profile -->', this.userProfile);
        console.log('get user details:', this.userdetails2);
      }, (err) => {
        console.log('Error: ', err);
      });
    } else if (this.userDetails1.role === 'level2') {
      this.isAdmin = true;
      this.userService.getUsersList().subscribe((resp: any) => {
        this.usersList = resp;
        console.log('Users List -->', resp);
        const mn = JSON.stringify(this.usersList);
      }, (err) => {
        console.log('Error: ', err);
      });
    }

   
  }

  logout(){
    this.loginService.userLogout();
  }
updateprofile(){
  this.updateprof = true;
}
changepwd(){
  this.changepwd1 = true;
}

  update(userupdateform: any){
    userupdateform.value._id = this.userProfile._id;
    this.userService.updateUserProfile(userupdateform.value).subscribe((resp)=>{
      console.log('resp-->', resp);
    });
  }

  changepass(changepass1: any){
    changepass1.value.opwd = this.cryptojsService.passwordHashing(changepass1.value.opwd);
    changepass1.value.pwd = this.cryptojsService.passwordHashing(changepass1.value.pwd);
    delete changepass1.value.cpwd;
    this.userService.changePassword(changepass1.value).subscribe((resp)=>{
      console.log('resp is-->', resp);
    });
  }

 
  deleteuser(userID: any){
    const confirmed = confirm('are you sure you want to delete this user? ' );
    if(confirmed){
      this.userService.deleteUser(userID).subscribe((resp: any)=>{
        console.log('res is -->', resp);
      });
    }
  }


  edituser(user: any){
    this.userService.userToUpdate = user;
    this.router.navigate(['/update']);
  }
}
