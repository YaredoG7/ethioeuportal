import { Component, OnInit } from '@angular/core';
import { ItemOrder } from 'src/app/model/common.model';

@Component({
  selector: 'app-selling-items',
  templateUrl: './selling-items.component.html',
  styleUrls: ['./selling-items.component.scss']
})
export class SellingItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  basic: boolean = false;
  pickup: boolean = false;

  public products: ItemOrder [] = [
    {
      name: 'JBL GO 2 bluetooth',
      price: '3000',
      available: true,
      img: ['/assets/sell/jbl_1.png', '/assets/sell/jbl_2.png', '/assets/sell/jbl_3.png'],
      left: 5,
    },
    {
      name: 'JBL bluetooth headphone',
      price: '4000',
      available: true,
      img: ['/assets/sell/jbl_4.png', '/assets/sell/jbl_5.png', '/assets/sell/jbl_6.png'],
      left: 5,
    },
    {
      name: 'Sony headphone',
      price: '800',
      available: true,
      img: ['/assets/sell/sony_1_2800.png', '/assets/sell/sony_2800.png', '/assets/sell/sony_head.png'],
      left: 5,
    },
    {
      name: 'JBL headphone',
      price: '1000',
      available: true,
      img: ['/assets/sell/jbl_7.png', '/assets/sell/jbl_8.png', '/assets/sell/jbl_12_1200ft.png'],
      left: 5,
    },
        {
      name: 'JBL bluetooth headphone',
      price: '2000-2500',
      available: true,
      img: ['/assets/sell/jbl_9.png', '/assets/sell/jbl_10.png', '/assets/sell/jbl_11.png'],
      left: 5,
    },
    {
      name: 'Asus / GENIUS / Lenevo  Wireless mouse',
      price: '1800',
      available: true,
      img: ['/assets/sell/mouse_4000.png', '/assets/sell/mouse.png', '/assets/sell/mouse_4000.png'],
      left: 5,
    },
    {
      name: 'Pen Drive / Flash disk (32GB or 128 GB)',
      price: '700 - 1200',
      available: true,
      img: ['/assets/sell/sony_32gb_4000.png', '/assets/sell/kingston_16gb_1300.PNG'],
      left: 5,
    },
    {
      name: 'Orginal Kit',
      price: '8000',
      available: true,
      img: ['/assets/sell/kits.png', '/assets/sell/mane_1.PNG', '/assets/sell/mane_2.PNG'],
      left: 5,
      description: 'Premier League, Laliga, Serie A and Bundesliga teams'

    }
  ]

}
