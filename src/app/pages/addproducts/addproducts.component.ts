import { Component, OnInit } from '@angular/core';
import{Product}from '../../product.model';
import { ApiService } from '../../services/api/api.service';
import { map } from 'rxjs/operators';
import{NgForm} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
searchText = '';
  name: string;
  price:number;
  date= Date.now();
  private product:Product;
prd;
id;
startDate = new Date();
endDate = new Date("2018-12-10");
filterByDate;
res;

  constructor(private api: ApiService) {
    this.daysInMonth(12, 2018);
   }

  daysInMonth (month, year) {
    this.startDate = new Date(""+year+'-'+month+'-'+1+"");
    let daysInMonth = new Date(year.toString(), month.toString(), 0).getDate();
    this.endDate = new Date(""+year+'-'+month+'-'+daysInMonth+"");

    console.log(this.startDate, this.endDate);
}


  ngOnInit() {
    this.api.getProducts().pipe(map (list => {
      return list.map(
        item => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return{ id, ...data};
        }
      )
    })).subscribe( resp => {
      console.log(resp)
      this.filterByDate = resp;
      let f = this.filterByDate.filter(elem => elem.date > this.startDate && elem.date < this.endDate);
      console.log(f)
    })
    this.showProducts();
  }

  addProduct() {

    let p ={
      name:this.name,
      price: this.price,
     
      date:this.date
    }

    this.product = p;

    this.api.createProduct(this.product).then(res => {
      console.log('product Added');
  
      this.resetForm();

    })}
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
  resetForm(form? : NgForm){
    if (form != null){
    form.reset();
    this.product={
    
      name:'',
      price:0
    }
  }
  }
  onItemClick(prd){
    console.log(prd)
    this.name=prd.name; 
    this.price=prd.price;
   
    this.id = prd.id;
    // this.product=Object.assign({},prd); 
  }
  updateProduct(){

  console.log(this.id);
    let d = {
      name: this.name,
    
      price: this.price,
      date:this.date
     
    }
    this.api.updateProduct(this.id,d).then(res=>{
      console.log('Product updated')
    })
  }
  deleteProduct(){

    if(confirm ("Are you sure to delete ?")==true){
    this.api.deleteProduct(this.id).then(res=>{
      console.log(this.id);
      console.log('product deletes');
    
    })
    this.showProducts();
    this.resetForm();
  }}
  
  filterCondition(product){
    return product.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }
  checkout() {


    //move the cart to an order... 
    this.res = JSON.parse(localStorage.getItem('cart'));
    if (this.res != '') {
      // this.api.bill.customerId = localStorage.getItem('uid');
      // this.api.bill.email = localStorage.getItem('email');
      this.api.bill.address = '';
      // this.api.bill.totalAmount = this.;


      this.api.bill.cart = this.api.cart;

      // console.log(this.api.bill.totalAmount);
      // console.log(this.toknid);
      //paymemt 
      /*  
      stripe-checkout     
      */
      // this.openCheckout();
      //send order to db 

  



    }
    else {
      console.log('Nothing in the Cart')
    }

  }
}
