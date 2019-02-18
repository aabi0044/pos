import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-salecart',
  templateUrl: './salecart.component.html',
  styleUrls: ['./salecart.component.css']
})
export class SalecartComponent implements OnInit {

  constructor(public api:ApiService,private router:Router) { }
amad;
actualquantity;
leftquantity;
  ngOnInit() {
  }
  checkoutSaleCart(){

  }
  checkout() {


    let len = this.api.salecart.length;
    

    for (let i = 0; i < len; i++) {
      let res = this.api.salecart[i];
      let id = res.prdid;

      let quantity = res.quantity;
      this.api.getProduct(id).pipe(first()).toPromise().then(respo => {
        this.amad = respo;

        console.log(respo);

        this.actualquantity = Number(this.amad.quantity);

        this.leftquantity = this.actualquantity - quantity;
        let data = {
          quantity: this.leftquantity,

        }
        this.api.updateProduct(id, data).then(resp => {
          console.log('updtaed');
          this.checkout1();
        })

     
      })



    }
    console.log("loop End");
  }
  checkout1() {


    console.log(this.api.cart);
    this.api.saleitembill.salecart = this.api.salecart;
    console.log(this.api.bill);

    this.api.addSaleItem(this.api.saleitembill).then(res => {
      console.log(res);

      this.clearCart();
      // this.net=0;
      // this.net1=0;
      // this.quantity=0;
      this.router.navigate(['/viewsaleout'])
    })
  

  }
  clearCart() {
    this.api.salecart = [];
    localStorage.setItem('salecart', JSON.stringify(this.api.salecart));
    // this.total = 0;
  }
}
