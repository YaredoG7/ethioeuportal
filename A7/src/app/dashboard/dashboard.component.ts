import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';
import { EteuentryService } from '../eteuentry.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private service: EteuentryService
  ) { }

  public quote = false;
  public  role: string = 'GST';
  public user: User = JSON.parse(sessionStorage.getItem("ETEUPORTALUSER")).data;
  hasMsg: boolean = false;
  collapsed: boolean = false;
  ngOnInit() {
      
   this.role = this.user.role;
  //  console.log(this.role)

  this.service.getMessage(this.user.vit_id).subscribe(resp => {
    if (resp[0]) {
      let msg = sessionStorage.getItem('msg');
      if(!msg) {
        return;
      }
      this.hasMsg = JSON.parse(msg) < resp[0].message.length;
      // console.log(resp)
      sessionStorage.setItem('msg', resp[0].message.length)

    }
  })

  
  }

  toggleQuote() {
    this.quote = !this.quote;
 }

 lemat(e) {
  console.log(e)
 }

 public config: ToasterConfig = 
 new ToasterConfig({
     showCloseButton: true, 
     tapToDismiss: false, 
     timeout: 0,
     animation: 'fade'
 });


 logOut() {
  sessionStorage.removeItem('ETEUPORTALUSER');
  this.router.navigate(['/'])
}

 
}
