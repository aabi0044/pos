import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators'

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
  actualquantity = 0;
  leftquantity = 0;
  amadName;
  amadPrice;
  manualdatebill = {
    cid:'',
    cart: [],
    customerName:'',
    address: '',
    totalactual:0,
    totaldiscount: 0,
    totalsave: 0,
    totaldeal:0,
    totalquantity:0,
    date: new Date
  }
  manualbilldate;
  getdate;
  hidecheckout:boolean=true;
  constructor(public api: ApiService, private router: Router) { }


  ngOnInit() {
    this.totalOfBill();
    if(this.api.bill.cid==''){
     
      this.clearCart();
      this.net=0;
      this.net1=0;
      this.quantity=0;
     }
  }

  remove(id) {
    let index = this.api.cart.findIndex(element => element.id === id);
    this.api.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
    this.totalOfBill();
  }
  clearCart() {
    this.api.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
    // this.total = 0;
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
  checkout1() {


    console.log(this.api.cart);
    this.api.bill.cart = this.api.cart;
    console.log(this.api.bill);

    this.api.addBill(this.api.bill).then(res => {
      console.log(res);
this.checkout();
      this.clearCart();
      this.net=0;
      this.net1=0;
      this.quantity=0;
      this.router.navigate(['/addbills'])
    })
    this.api.bill.cid='';
    this.api.bill.customerName='';

  }
  manualdate1(){
    this.hidecheckout=false;

  }
  addauto(){
    this.hidecheckout=true;
  }
  ManualDateCeckout() {
    var timestamp_end = new Date(this.getdate)
    this.manualbilldate=timestamp_end;
    console.log(this.manualbilldate);
this.manualdatebill.cid=this.api.bill.cid;
this.manualdatebill.customerName=this.api.bill.customerName;
this.manualdatebill.date=this.manualbilldate;
    console.log(this.api.cart);
    this.manualdatebill.cart = this.api.cart;
    console.log(this.api.bill);

    this.api.addBill(this.manualdatebill).then(res => {
      console.log(res);
this.checkout();
      this.clearCart();
      this.net=0;
      this.net1=0;
      this.quantity=0;
      this.router.navigate(['/addbills'])
    })
    this.api.bill.cid='';
    this.api.bill.customerName='';

  }
  totalOfBill() {
    let x = JSON.parse(localStorage.getItem('cart'));
    console.log(x);
    var len = x.length;
    let totalBill = 0
    let totalSale = 0
    let deal = 0;
    let quan = 0;
    let afterdeal = 0;
    let saveBill = 0
    for (let i = 0; i < len; i++) {
      let l = parseInt(x[i].totalActualPrice);
      totalBill = (l + totalBill);
      this.net = totalBill;
      this.api.bill.totalactual=this.net;
      this.manualdatebill.totalactual=this.net;
    }
    for (let j = 0; j < len; j++) {
      let m = parseInt(x[j].totalDiscountPrice);
      totalSale = (m + totalSale);
      this.net1 = totalSale;
      this.api.bill.totaldiscount=this.net1;
      this.manualdatebill.totaldiscount=this.net1;
    }
    for (let j = 0; j < len; j++) {
      let m = parseInt(x[j].quantity);
      quan = (m + quan);
      this.quantity = quan;
      this.api.bill.totalquantity=this.quantity;
      this.manualdatebill.totalquantity=this.quantity;
    }
    for (let j = 0; j < len; j++) {
      let m = parseInt(x[j].totalDeal);
      deal = (m + deal);
      this.dealprice = deal;
this.api.bill.totaldeal=this.dealprice;
this.manualdatebill.totaldeal=this.dealprice;
    }
    console.log(this.net1);
    console.log(this.dealprice);
    afterdeal = this.net1 - this.dealprice;
    this.net1 = afterdeal;
    console.log(this.net1);


    saveBill = this.net- this.net1;
    this.api.bill.totalsave=saveBill;
    this.manualdatebill.totalsave=saveBill;
    // this.bill.totalActual = totalSale;
    // this.bill.totalSale = totalBill;
    // this.bill.totalSave = saveBill;
    // console.log(this.bill.totalActual);
    // console.log(this.bill.totalSale);
    // console.log(this.bill.totalSave);
  }


  total() {
    let x = JSON.parse(localStorage.getItem('cart'));
    console.log(x);
    var len = x.length;
    let z = 0;
    // this.len=this.resp.length;
    // this.net= this.resp.orderArray[0].saleTotal;


    for (var i = 0; i < len; i++) {
      let n = x[i].saleTotal;
      console.log(n);

      z = n + z;
    }
    this.net = z;
    console.log(this.net);
  }

}
