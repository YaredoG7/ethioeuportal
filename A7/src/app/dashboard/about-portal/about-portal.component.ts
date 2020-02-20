import { Component, OnInit } from '@angular/core';
import { LeaderBoard } from 'src/app/model/common.model';
import { User } from 'src/app/model/user.model';
import { EteuentryService } from 'src/app/eteuentry.service';

@Component({
  selector: 'app-about-portal',
  templateUrl: './about-portal.component.html',
  styleUrls: ['./about-portal.component.scss']
})
export class AboutPortalComponent implements OnInit {

  public leaders: LeaderBoard [] = [] ;
  public users: User[] = [];
  public rate = 4.4;
  opened: boolean = false;

  public  role: string = 'GST';

  public user: User = JSON.parse(sessionStorage.getItem("ETEUPORTALUSER")).data;

    constructor(private service: EteuentryService,) { }
  
  ngOnInit() {
    this.role = this.user.role;
    
    this.service.getUsers().subscribe(users => {
      if(!users){
        this.service.showAlert('warning', 'unable to get portal users, please report an issue');
        return;
      }

      this.users = users;

      users.map((_user, err) => {
        let leader: LeaderBoard = {
          name: _user.firstname + ' ' + _user.lastname,
          stars: _user.star,
          points: _user.points,
          from: _user.address.city + ' ' + _user.address.country,
          userId: _user.vit_id
        }


        if(leader.stars !== undefined && leader.stars > 0) {
          this.leaders.push(
            leader
          )
        }
      })


      /**** Work on leaders board****/
  

   //  let filtered = this.leaders.filter(item => item.stars !== undefined)
    this.leaders.sort(this.dynamicSort('-stars'))

    })



  }


  


  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        // console.log(result , sortOrder)
        return result * sortOrder;
    }

}

}
