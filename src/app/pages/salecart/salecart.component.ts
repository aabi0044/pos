import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
@Component({
  selector: 'app-salecart',
  templateUrl: './salecart.component.html',
  styleUrls: ['./salecart.component.css']
})
export class SalecartComponent implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit() {
  }
  checkoutSaleCart(){
    
  }

}
