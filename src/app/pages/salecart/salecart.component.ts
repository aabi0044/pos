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
  checkout() {


    let len = this.api.cart.length;
    

    for (let i = 0; i < len; i++) {
      let res = this.api.cart[i];
      let id = res.prdid;

      let quantity = res.quantity;
      this.api.getProduct(id).pipe(first()).toPromise().then(respo => {
        this.amad = respo;

        console.log(respo);

        this.actualquantity = Number(this.amad.quantity);

        this.leftquantity = this.actualquantity + quantity;
        let data = {
          quantity: this.leftquantity,

        }
        this.api.updateProduct(id, data).then(resp => {
          console.log('updtaed');
        })

     
      })



    }
    console.log("loop End");
  }

}
