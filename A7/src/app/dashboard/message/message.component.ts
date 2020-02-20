import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/model/common.model';
import { User } from 'src/app/model/user.model';
import { EteuentryService } from 'src/app/eteuentry.service';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, filter} from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private service: EteuentryService) { }

  public user: User = JSON.parse(sessionStorage.getItem("ETEUPORTALUSER")).data;
  public users: User [] = [];
  public _users: User [] = [];
  public showFromTo: boolean;
  // style1 = false;

  
  @ViewChild('instance', {read: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  
  ngOnInit() {
    this.service.getMessage(this.user.vit_id).subscribe(resp => {
      if (resp[0]) {

        this.messages = resp[0].message;
        // console.log(resp)
        sessionStorage.setItem('msg', resp[0].message.length)

      }
    })

    this.service.getUsers().subscribe(users=> {
        // console.log(users)
      if(users) {
        this.users = users;
      }
    })

    this.showFromTo = false;
  }




  formatter = (result: User) => result.firstname + ', '+result.email+', '+ result.address.city;


  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.users
        : this._users = this.users.filter(v => v.firstname.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }



public message: Message = {message: '', to: '', from: this.user.firstname +' ' +this.user.lastname}

public messages: Message [] = [];

  sendMessage() {
    this.service.sendMessage(this.message, this.message.to).subscribe(resp => {
      if (resp.code == 200) {
        this.service.showAlert('success', 'Message has been sent!')
      } else {
        this.service.showAlert('warning', resp.message)
      }

      setTimeout(() => {
        this.message.message = '';
      })
    }, err => {
      this.service.showAlert('danger', 'Opps! Server Ano-Dazy Giggs came back tripping');
    })
  }


  public selectedItem(userId) {
    this.message.to = userId;
  }

  changeCategory(msg: Message) {
   this.message = msg;
   this.showFromTo = true;
  }


}
