import { Component, OnInit, ViewChild } from '@angular/core';
import { EteuentryService } from '../eteuentry.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { ClrWizard } from '@clr/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  @ViewChild("wizardlg") wizardLarge: ClrWizard;
  lgOpen: boolean = false;
  second: boolean = false;
  basic: boolean = false;


  public user: User;
  public _u = { email : '', password: '' }
  public reset : boolean = true;
 
  public access_code: boolean = false;
  public new_password: boolean = false;
  public access_email: string = '';
  public rememberMe: boolean = false;
  public showRegi: boolean = false;
  constructor(
    private service: EteuentryService,
    private router: Router,
  ) {



  }

  reset_password = {
    access_code: '',
    password: '',
  }

  templateFormSubmit(templateFormValues: {}) {
    console.log('template form submit', templateFormValues);
  }


  ngOnInit() {
    this.user = {company: '', firstname: '', lastname: '', address: {city: '', country: '', postcode: '', house_num: ''}, role: '', password: '', phone: '', payment: '', email: '', vit_id: '', metadata: null };

  }

  registerUser() {
    // console.log(this.user);
   this.service.createUser(this.user).subscribe(res => {
     if (res.code === 201) {
        this.lgOpen = false;
        this.second = false;
        setTimeout(() => {
          this.service.showAlert('success', res.message);
        }, 800)
   
     }else{
       this.service.showAlert('warning', res.message)
     }
   }, err => {
    this.service.showAlert('danger', 'Server came back with error, try again.')
   }
   )
  

  }


  public loginUser(valid: boolean) {
    if(valid) {
      this.service.login(this._u).subscribe(response => {
        if (response.code == 200) {
          this.service.showAlert('success', response.message)
          //  this.navigateUser(response.data.role)
          this.router.navigate([ 'dashboard']);
        } 
      }, err => {
        this.service.showAlert('danger','Invalid email and password combination.')
      })
    } else {
      this.service.showAlert('warning', 'Incomplete form')
    }
  }


  sendAccessCode() {
    if (!this.access_email) {
      this.service.showAlert('danger', 'please provide a valide email');
      return;
    }
    this.service.sendAccessCode(this.access_email).subscribe(res=> {
      if(res.code == 201 || res.code == 200) {
        this.service.showAlert('success', 'Access code has been sent to your Email');
      }
    }, err => {
      this.basic = false;
      this.service.showAlert('danger', 'Error while sending new access code');
    })
    setTimeout(() => {
      this.reset = false;
    }, 1000)
  }


  VerifyAccessCode() {
    if(!this.reset_password.access_code || !this.reset_password.password) {
      this.service.showAlert('danger', 'Incorrect acceess information has been provided.')
    }
    this.service.verifyAccessCode(this.reset_password.access_code, this.reset_password.password).subscribe(res => {
      if(res.code == 201 || res.code == 200) {
        this.basic = false;
    setTimeout(() => {
      this.service.showAlert('success', 'Password has been updated');
      },   1000)        
      }
    }, err => {
      this.basic = false;
      this.service.showAlert('danger', 'Error while updating new password');
    })
  }

}
