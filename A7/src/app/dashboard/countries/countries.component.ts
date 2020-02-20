import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EteuentryService } from 'src/app/eteuentry.service';
import { EUCountry } from 'src/app/model/common.model';
// import { ToasterService, BodyOutputType, Toast } from 'angular2-toaster';


export interface Country {
    name: string,
    capital: string,
    region: string,
    sub_region: string,
    population: string,
    flag: string
}
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  

  constructor(private service: EteuentryService) { }
  public userPaid : boolean = false;
  public countries: EUCountry [] = [];
  public countryCount = [] ;
  public basic: boolean = false;

  public country: Country = {name: 'Netherland', capital: '', region: '', sub_region: '', population: '', flag: ''}
  ngOnInit() {

    this.service.getEucountries().subscribe(res => {
      // 
      // console.log(res)
      // filter response, remove duplicate and assign it to countries
      this.countries = res.filter((thing, index, self) =>
      index === self.findIndex((t) => (t.code === thing.code)))
      })
  
  }
  public countrySelected(code){
    let cntry= this.countries.filter(item=> item.code.indexOf(code) > -1)
    // console.log(cntry)
    this.checkCntrLength();
    if(this.countryCount.length < 3){
      this.countryCount.push(cntry[0])
      this.service.showAlert('info', `You have selected ${cntry[0].name}`)
    } else {
   
      this.service.showAlert( 'warning', 'You have selected max number of countries')
      return;
    }
  }


  checkCntrLength(){
    if(this.countryCount.length == 3) {
      this.basic = true;
    }
    return ;
  }


  saveCntry() {
    
  }



}
