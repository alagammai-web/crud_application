import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.scss']
})
export class UpdateuserComponent implements OnInit {

  updateform: FormGroup;
  userToUpdate1: any;

  constructor(private fm: FormBuilder, private userService: UserService, private router: Router, private storageService: StorageService) { 


this.userToUpdate1  = this.userService.userToUpdate;
console.log('print value of user', this.userToUpdate1);

this.updateform = this.fm.group({
uName:  new FormControl(this.userToUpdate1.name, [Validators.required, Validators.minLength(2)]),
uMail: new FormControl(this.userToUpdate1.email, [Validators.required, Validators.email, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+).([a-zA-Z]{2,5})$/)]),
uAge: new FormControl(this.userToUpdate1.age, [Validators.required]),
// tslint:disable-next-line: max-line-length
uMobile: new FormControl(this.userToUpdate1.mobileno, [Validators.required, Validators.pattern(/^((\+91)?|(91)?|(0)?)([6-9]{1})([0-9]{9})$/)]),
uPAN: new FormControl(this.userToUpdate1.pan, [Validators.required]),
uGender: new FormControl(this.userToUpdate1.gender, [Validators.required])
});
  }


  ngOnInit(): void {
  }


  updateuser(){
    this.updateform.value.uPAN = this.updateform.value.uPAN.toUpperCase();
    this.updateform.value._id = this.userToUpdate1._id;

  

    this.userService.updateUser(this.updateform.value).subscribe((resp: any) => {
      alert('User Updated Successfully!.');
      console.log(this.updateform.value);
      this.router.navigate(['/home']);
    }, (err) => {
      console.log('Error: ', err);
    });



    

  }

}
