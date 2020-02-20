import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-on-roles',
  templateUrl: './common-on-roles.component.html',
  styleUrls: ['./common-on-roles.component.scss']
})
export class CommonOnRolesComponent implements OnInit {

  @Input() role: string = 'GST';
  

  constructor() { }


  ngOnInit() {
  }

  menuClicked(): boolean {
    return 
  }

}
