import {Component, ViewChild, OnInit} from "@angular/core";
import {ClrWizard} from "@clr/angular";
import {User} from '../model/user.model';
import { ToastrService } from 'ngx-toastr';
import { EteuentryService } from '../eteuentry.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private service: EteuentryService ,private route: ActivatedRoute, private http: HttpClient) {

   }

   public user: User = JSON.parse(sessionStorage.getItem("ETEUPORTALUSER")).data;


   public docs: any = [];


  ngOnInit() {
   //   console.log(this.route.snapshot.params['userId'])
    
    this.service.getDocument(this.route.snapshot.params['userId']).subscribe(user => {
    if(!user) {
      this.service.showAlert('danger', 'Unable to find user');
      return;
    } else {
      
      this.docs = user;
    }
    
    })
  }


}
