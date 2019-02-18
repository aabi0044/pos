import { Component, OnInit } from '@angular/core';
import{Product}from '../../product.model';
import { ApiService } from '../../services/api/api.service';
import { map } from 'rxjs/operators';
import{NgForm} from '@angular/forms';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
searchText = '';
  name: string;
  price:number;
  quantity=0;
  date= Date.now();
  private product:Product;
products;
id;
startDate = new Date();
endDate = new Date("2018-12-10");
filterByDate;
res;
check;
filter;
warrning;

  constructor(public api: ApiService) {
    this.daysInMonth(12, 2018);
   }

  daysInMonth (month, year) {
    this.startDate = new Date(""+year+'-'+month+'-'+1+"");
    let daysInMonth = new Date(year.toString(), month.toString(), 0).getDate();
    this.endDate = new Date(""+year+'-'+month+'-'+daysInMonth+"");

    console.log(this.startDate, this.endDate);
}


  ngOnInit() {
    this.getLimitedProducts();
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
     quantity:this.quantity,
      date:this.date
    }

    this.product = p;

    this.api.createProduct(this.product).then(res => {
      console.log('product Added');
  
      
      this.name='';
      this.price=0;
      this.quantity=0;

    })
    this.resetForm();
  }
  showProducts() {
    this.api.getProducts().pipe(map(list => list.map(item => {
      let data = item.payload.doc.data();
      let id = item.payload.doc.id;
      return { id, ...data };
    }))).subscribe(res => {
      this.products= res;
      console.log(res);
    })
   

  }
  resetForm(form? : NgForm){
    if (form != null){
    form.reset();
    this.product={
    
      name:'',
      price:0,
      quantity:0
    }
  }
  }
  onItemClick(prd){
    console.log(prd)
    this.name=prd.name; 
    this.price=prd.price;
   this.quantity=prd.quantity;
    this.id = prd.id;
    // this.product=Object.assign({},prd); 
  }
  updateProduct(){

  console.log(this.id);
    let d = {
      name: this.name,
    quantity:this.quantity,
      price: this.price,
      date:this.date
     
    }
    this.api.updateProduct(this.id,d).then(res=>{
      console.log('Product updated')
    })
  }
  deleteProduct(item){

    if(confirm ("Are you sure to delete ?")==true){
    this.api.deleteProduct(item.id).then(res=>{
      console.log(item.id);
      console.log('product deletes');
    
    })
    this.showProducts();
    this.resetForm();
  }}
  
  filterCondition(product){
    return product.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }
  getLimitedProducts(){
    this.api.getProducts().pipe(map(list => list.map(item => {
      let data = item.payload.doc.data();
      let id = item.payload.doc.id;
      return { id, ...data };
    }))).subscribe(res => {
      this.check=res;
      console.log(res);
      let f= this.check.filter(elem=> elem.quantity<=1);
      console.log(f);
      this.filter=f;
      if(this.filter!=[]){
        console.log("object");
        this.warrning=true;
      }
        
      })
    }
   
 
  // let f = this.filterByDate.filter(elem => elem.date > this.startDate && elem.date < this.endDate);
 
 
}
