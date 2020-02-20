import { Component, OnInit } from '@angular/core';
import { EteuentryService } from 'src/app/eteuentry.service';
import { EUCountry, Cost, Course } from 'src/app/model/common.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-admin',
  templateUrl: './country-admin.component.html',
  styleUrls: ['./country-admin.component.scss']
})
export class CountryAdminComponent implements OnInit {
  
  public course: Course = {name_1: '', name_2: '', name_3: '', tution_1: '', tution_2: '', tution_3: '', uni: '', address: '', comment: '' }
  public country: EUCountry = {name: '', long_name: '', native: '', capital: '', code: '', flag: '/assets/img_1.jpg', aval_schlr: '', aval_uni: '' }
  public cost: Cost = { flight: '', food: '', app: '', extra: '', tuition: '', house: ''}
  public countries = [];
  public isEditing: boolean = false;
  public cnfrmd : boolean = false;
  public shwCnf : boolean = false;
  public cntryCode: string = '';

  constructor(private service: EteuentryService, private route: ActivatedRoute,) {
  }

  ngOnInit() {


    this.cntryCode= this.route.snapshot.params['cntryId']

    if(this.cntryCode) {
      this.service.getCountryByCode(this.cntryCode).subscribe(item => {
        //  console.log(item)
        if(item){
          this.country = item;
          this.country = {
            name: item.name, long_name: item.long_name, native: item.native, capital: item.capital, code: item.code, flag: item.flag
            ,  aval_schlr: item.aval_schlr, aval_uni: item.aval_uni, comment: item.comment, cost: this.cost
          }

          
          this.isEditing = true;
        }
      })
    }
    this.service.getEUCountries().subscribe(item => {
      this.countries = item;
      //  console.log(item[26].currencies[0])

    })
 
  }
  selectedItem(item) {
  
    item.preventDefault();
    this.countries.filter(res => {
    
      if(res.name.indexOf(item.target.value) != -1){
        let crncy = res.currencies[0];

        this.country = {
          name: res.name, long_name: res.nativeName, native: res.nativeName, capital: res.capital, code: res.alpha2Code, flag: res.flag
          , currency: crncy.symbol + ' ' + crncy.name , aval_schlr: '', aval_uni: '', comment: this.course, cost: this.cost
        }
      }
    })
    // this.country = item.item;
    // console.log(item.target.value)
   
  }


  public regiOrUp() {
    if(this.isEditing) {
      this.updateEucontry();
    } else {
      this.registerEucountry();
    }
  }

  private registerEucountry(): void {
    this.service.createEucountry(this.country).subscribe(res => {
      if (res.code == 201){ 
      this.service.showAlert('success', res.message);
      return;
      } else{
        this.service.showAlert('warning', res.message)
      }
    }, err => {
      this.service.showAlert('danger', 'Opps! Error has occured from the server')
    })
  }


  private updateEucontry(): void {
    this.service.updateEUCountry(this.country.code).subscribe(res => {
      if (res.code == 201){ 
      this.service.showAlert('success', 'Record has been updated');
      return;
      } else{
        this.service.showAlert('warning', 'Error while updating the record')
      }
    }, err => {
      this.service.showAlert('danger', 'Opps! Error has occured from the server')
    })

  }

  public deleteEucountry(code): void{
   if(code) {
    this.service.deleteEucountry(this.cntryCode).subscribe(res => {
      if (res.code == 200){ 
      this.service.showAlert('success', 'Record has been updated');
      return;
      } else{
        this.service.showAlert('warning', 'Error while updating the record')
      }
    }, err => {
      this.service.showAlert('danger', 'Opps! Error has occured from the server')
    })
   }
   setTimeout(() => {
    this.shwCnf = false;
   }, 2000)
  }

}
