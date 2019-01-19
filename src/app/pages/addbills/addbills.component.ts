import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.model';
import { ApiService } from '../../services/api/api.service';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-addbills',
  templateUrl: './addbills.component.html',
  styleUrls: ['./addbills.component.css']
})
export class AddbillsComponent implements OnInit {
  name: string;
  price: number;
  percentage: number;
  quantity: number;
  perprice: number;
  deal:number=0;
  savingPrice: number;
  totalActualPrice: number;
  totalDiscountPrice: number;
  totalSavePrice: number;
  totalDeal:number=0;
  totalactualbill: number = 0;
  totalsavebill: number = 0;
  totaldiscountbill: number = 0;
  totalforbill:number=0;
  totalsaveforbill:number=0;
  totaldiscountforbill:number=0;
  date = Date.now();
  private product: Product;
  prd;
  id;
  searchText = '';
uid;
  constructor(private api: ApiService,private route:ActivatedRoute,private router:Router) { 
   console.log(this.api.bill.cid);
   if(this.api.bill.cid==''){
    this.router.navigate(['/type']);
     console.log("object");
   }
    this.uid = this.route.snapshot.params['id'];
    console.log(this.uid);
    // if(this.uid==undefined){
    // 
    // }
  }

  ngOnInit() {
    this.showProducts();
   

  }
  showProducts() {
    this.api.getProducts().pipe(map(list => list.map(item => {
      let data = item.payload.doc.data();
      let id = item.payload.doc.id;
      return { id, ...data };
    }))).subscribe(res => {
      this.prd = res;
      console.log(res);
    })
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
      // this.product={
      //   name:'',
      //   price:Number,
      //   description:'',
      //   status:'',
      // }
    }
  }
  onItemClick(prd) {
    console.log(prd)
    this.name = prd.name;
    this.price = prd.price;
    this.id = prd.id;
    console.log(this.id);
    // this.product=Object.assign({},prd); 
  }
  //--------------------cart -----------
  addProductToBill() {
    //simple save item to cart 
    let price = this.price;
    let sale = this.percentage;
    this.savingPrice = (price * sale) / 100;
    //var saleprice = price - savings;
    this.perprice = this.price - this.savingPrice;
    this.totalActualPrice = this.price * this.quantity;
    this.totalDiscountPrice = this.perprice * this.quantity;
    this.totalSavePrice = this.savingPrice * this.quantity;
    this.totalDeal=this.deal*this.quantity;
    console.log(this.totalActualPrice);
    console.log(this.totalDiscountPrice);
    console.log(this.totalSavePrice);
    // console.log(this.perprice);
    //       console.log( this.savingPrice.toLocaleString());
    let product = {
      prdid:this.id,
      name: this.name,
      price: this.price,
      percentage: this.percentage,
      quantity: this.quantity,
      perprice: this.perprice,
      deal:this.deal,
      savePrice: this.savingPrice,
      totalActualPrice: this.totalActualPrice,
      totalSavePrice: this.totalSavePrice,
      totalDiscountPrice: this.totalDiscountPrice,
      totalDeal:this.totalDeal,
      billAddedDate: this.date
    }
    console.log(product);
    this.api.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
    // console.log(this.api.cart);
    console.log(this.api.getSavedCart());
    // console.log(this.totalActualPrice);
    this.name='';
    this.price=0;
    this.quantity=0;
    this.percentage=0;
    this.deal=0;
    this.totalPriceforcart();
  }
  totalPriceforcart() {
    let x = JSON.parse(localStorage.getItem('cart'));
    console.log(x);
    var len = x.length;
    for (var i = 0; i < len; i++) {
      let l = parseInt(x[i].totalActualPrice);

      this.totalactualbill = (l + this.totalactualbill);
    }
    for (let i = 0; i < len; i++) {
      let m = parseInt(x[i].totalDiscountPrice);
      this.totaldiscountbill = (m + this.totaldiscountbill);
    }
    for (let i = 0; i < len; i++) {
      let n = parseInt(x[i].totalSavePrice);
      this.totalsavebill = (n + this.totalsavebill);
    }
    console.log(this.totalactualbill);
    console.log(this.totaldiscountbill);
    console.log(this.totalsavebill);
  }

  filterCondition(product) {
    return product.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }
  checkout(){
    // //move the cart to an order... 
    // this.api.bill.customerId = localStorage.getItem('uid');
    // this.api.bill.email = localStorage.getItem('email');
    this.api.bill.address = '';
    this.api.bill.cart = this.api.cart;
    //send order to db 
    this.api.addBill(this.api.bill).then(res=>{
      console.log('order created')
      this.api.clearSavedCart();
    },err=> console.log(err.message));
  }
  clearCart() {
    this.api.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
    this.totalActualPrice = 0;
    this.totalDiscountPrice = 0;
    this.totalSavePrice = 0;
  }
}
