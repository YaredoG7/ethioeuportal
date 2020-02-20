import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EteuentryService } from 'src/app/eteuentry.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: EteuentryService) { }
 
  public lggdUser: User = JSON.parse(sessionStorage.getItem("ETEUPORTALUSER")).data;

  public user: User = {address: {city: '', country: '', postcode: ''}, company: '', email: '', password: '', payment: '' , phone: '', firstname: '', lastname: '', vit_id: '', role: '', metadata: null}
  public fullname: string='';
  public address: string='';
  public  star: number = 0;
  public  opened : boolean = false;
  public  points: number = 0;
  public uploaded : any = 0;
  public uploaded1 : any = 0;
  public uploaded2 : any = 0;
  public cnfrm: boolean = false;
  public role: string = '';
  

  // public opened: boolean = false;

  ngOnInit() {
    let userId = this.route.snapshot.params['userId']
    this.role = this.lggdUser.role;
    this.service.getUser(userId).subscribe(user => {
      // console.log(this.route.snapshot.params['userId'])
    if(!user) {
      this.service.showAlert('danger', 'Unable to find user');
      return;
    } else {
      
      // console.log(user)
       this.user = user[0];
       this.fullname = user[0].firstname + ' ' + user[0].lastname;
       this.address = user[0].address.city + ',' + user[0].address.country
    }
    //  console.log(user)
    })
  }


  public deleteMember(code): void{
    if(code) {
     this.service.deleteMember(this.user.vit_id).subscribe(res => {
       if (res.code == 200){ 
       this.service.showAlert('success', 'Member has been deleted');
       return;
       } else{
         this.service.showAlert('warning', 'Error while deleting the record')
       }
     }, err => {
       this.service.showAlert('danger', 'Opps! Error has occured from the server')
     })
    }
    setTimeout(() => {
     this.cnfrm = false;
    }, 2000)
   }

  public calcualtePoits() {
    this.points =  Number(this.uploaded) + Number(this.uploaded1) + Number(this.uploaded2);
    this.user.points = this.points;
    this.calculateStars();
  
  }

  private calculateStars() {
    this.star = Number((this.points / 25).toFixed(1))
  }

  public updateUser() {
    this.user.points = this.points;
    this.user.star = this.star;

    // console.log(this.user)
    this.service.updateUser(this.user.vit_id, this.user).subscribe(status => {
        if(status.code == 201) {
          this.service.showAlert('success', status.message);
        } else {
          this.service.showAlert('warning', status.message);
        }
      }, err => {
        this.service.showAlert('danger', 'Opps! Something is not working in the server');
      })
  }

public dowloadDoc(userId) {
  // const uri =  `http://localhost:3000/api/v1/files/zip/${userId}`
  const uri = `https://app.ethioportal.eu:2626/api/v1/files/zip/${userId}`
  window.open(uri);
}

}
