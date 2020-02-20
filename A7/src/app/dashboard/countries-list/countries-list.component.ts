import { Component, OnInit } from '@angular/core';
import { EteuentryService } from 'src/app/eteuentry.service';
import { EUCountry } from 'src/app/model/common.model';
@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  constructor(private service: EteuentryService) { }

  public countries: EUCountry [] =[];


  ngOnInit() {
    this.service.getEucountries().subscribe(cntry => {
      if(!cntry) {
        this.service.showAlert('danger', 'unable to get all applicants');
        return;
      }
      this.countries = cntry;
      // console.log(cntry)
    })
  }

}
