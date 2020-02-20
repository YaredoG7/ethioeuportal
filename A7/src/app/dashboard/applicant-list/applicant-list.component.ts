import { Component, OnInit } from '@angular/core';
import { EteuentryService } from 'src/app/eteuentry.service';
import { Applicant, Cost, DocumentUpload, AppFeePayment } from 'src/app/model/common.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss']
})
export class ApplicantListComponent implements OnInit {

  constructor(private service: EteuentryService) { }

  public applicant: Applicant = {user: '', documentId: null, payment: null, cost: null, fav_country: ''};
  public cost: Cost = { flight: '', food: '', app: '', extra: '', tuition: '', house: ''}
  public users: User [] = [];
  ngOnInit() {
    this.service.getUsers().subscribe(users => {
      if(!users) {
        this.service.showAlert('danger', 'unable to get all applicants');
        return;
      }
      this.users = users;
    })
  }

}
