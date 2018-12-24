import { Component, OnInit } from '@angular/core';
import{Daily}from '../.././daily.model';
import{ApiService}from '../../services/api/api.service';
import { map } from 'rxjs/operators';
import{NgForm} from '@angular/forms';
import { database } from 'firebase';

@Component({
  selector: 'app-adddaily',
  templateUrl: './adddaily.component.html',
  styleUrls: ['./adddaily.component.css']
})
export class AdddailyComponent implements OnInit {


private daily:Daily;

  sale: number;
  profit:number;
  date= Date.now();
 
prd;
id;
length;

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.showSales();
    this.addTotal();
    
  }
  addSale() {

    let p ={
      sale: this.sale,
      profit:this.profit,
      date:this.date
    }
console.log(p);
    this.daily=p;
    // let date=this.prd[this.length-1].date
    // console.log(this.prd[this.length-1].date);
    // if(date==this.date){
    
    //   console.log('object');
    // }
 this.api.addSale(this.daily).then(res => {
  console.log('product Added');

  this.resetForm();

})
   }
  showSales() {
    this.api.getSales().pipe(map(list => list.map(item => {
      let data = item.payload.doc.data();
      let id = item.payload.doc.id;
      return { id, ...data };
    }))).subscribe(res => {
      this.prd = res;
      this.length=this.prd.length;
      console.log(res);
      console.log(res.length); 
    })
  }
  resetForm(form? : NgForm){
    if (form != null){
    form.reset();
    this.daily={
    
      sale:0,
      profit:0
    }
  }
  }
  onItemClick(prd){
    console.log(prd)
    this.sale=prd.sale; 
    this.profit=prd.profit;
   
    this.id = prd.id;
    // this.product=Object.assign({},prd); 
  }
  updateSale(){

  console.log(this.id);
    let d = {
      sale:this.sale,
      profit:this.profit
     
     
      
     
    }
    this.api.updateSale(this.id,d).then(res=>{
      console.log('Product updated')
    })
  }
  deleteSale(){

    if(confirm ("Are you sure to delete ?")==true){
    this.api.deleteSale(this.id).then(res=>{
      console.log(this.id);
      console.log('product deletes');
    
    })
    this.showSales();
    this.resetForm();
  }}
  addTotal(){
    this.api.getSales().pipe(map(list => list.map(item => {
      let data = item.payload.doc.data();
      let id = item.payload.doc.id;
      return { id, ...data };
    }))).subscribe(res => {
      this.prd = res;
      console.log(this.prd[0].sale, this.prd[0].profit);
      
  //  let y = parseInt(res[i].sale);

      let len = res.length;

// let sale= res[0].profit;
      // for (var i = 0; i < len; i++) {

      //   let y = parseInt(res[i].sale);
      //    let total = (y + total);
      //   console.log(y);
  
  
  
  
      // }
    })

   
  }

}
