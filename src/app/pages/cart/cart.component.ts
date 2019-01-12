import { Component, OnInit } from '@angular/core';
import{ApiService}from '../../services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
amad;
resp;
billid;
date;
net;
net1;
quantity;
dealprice;
  constructor(private api:ApiService,private router:Router) { }


  ngOnInit() {
    this.totalOfBill();
  }

  remove(id) {
    let index = this.api.cart.findIndex(element => element.id === id);
    this.api.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
  }
  clearCart() {
    this.api.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
    // this.total = 0;
  }
checkout(){
  console.log(this.api.cart);
  let len=this.api.cart.length;
  for(let i=0;i<len;i++){
    let res=this.api.cart[i];
    console.log(res);
let id=res.id;
let quantity=res.quantity;
this.api.getProduct(id).subscribe(respo=>{
  this.amad=respo;
  console.log(this.amad.quantity);
  let acutualquantity=this.amad.quantity;
  let leftquantity=acutualquantity-quantity;
  let name=this.amad.name;
  let price=this.amad.price;

  console.log(leftquantity);
  let data={
    quantity:leftquantity,
    name:name,
    price:price
  }
this.api.updateProduct(id,data).then(respon=>{
  console.log("product Quantity Updated");
})
})
  
  }
}
checkout1() {
  
 
  console.log(this.api.cart);
  this.api.bill.cart = this.api.cart;
  console.log(this.api.bill);
  
  // this.api.addBill(this.api.bill).then(res => {
  //   console.log(res);
  
  //   this.clearCart();
  //   this.net=0;
  //   this.router.navigate(['/addbills'])
  // })
 
}
totalOfBill() {
  let x = JSON.parse(localStorage.getItem('cart'));
  console.log(x);
  var len = x.length;
  let totalBill = 0
  let totalSale = 0
  let deal=0;
  let quan=0;
  let afterdeal=0;
  let saveBill = 0
  for (let i = 0; i < len; i++) {
    let l = parseInt(x[i].totalActualPrice);
    totalBill = (l + totalBill);
    this.net=totalBill;
  }
  for (let j = 0; j < len; j++) {
    let m = parseInt(x[j].totalDiscountPrice);
    totalSale = (m + totalSale);
    this.net1=totalSale;
  }
  for (let j = 0; j < len; j++) {
    let m = parseInt(x[j].quantity);
    quan = (m + quan);
    this.quantity=quan;
  }
  for (let j = 0; j < len; j++) {
    let m = parseInt(x[j].deal);
    deal = (m + deal);
    this.dealprice=deal;

  }
  console.log(this.net1);
  console.log(this.dealprice);
  afterdeal=this.net1-this.dealprice;
  this.net1=afterdeal;
  console.log(this.net1);
  
  saveBill = totalBill - totalSale;
  // this.bill.totalActual = totalSale;
  // this.bill.totalSale = totalBill;
  // this.bill.totalSave = saveBill;
  // console.log(this.bill.totalActual);
  // console.log(this.bill.totalSale);
  // console.log(this.bill.totalSave);
}


total(){
  let x = JSON.parse(localStorage.getItem('cart'));
  console.log(x);
  var len = x.length;
  let z=0;
// this.len=this.resp.length;
// this.net= this.resp.orderArray[0].saleTotal;


for (var i = 0; i < len; i++) {
  let n=x[i].saleTotal;
  console.log(n);
  
     z=n+ z;
  }
  this.net=z;
  console.log(this.net);
}

}
