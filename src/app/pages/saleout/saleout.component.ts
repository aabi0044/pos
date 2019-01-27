import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-saleout',
  templateUrl: './saleout.component.html',
  styleUrls: ['./saleout.component.css']
})
export class SaleoutComponent implements OnInit {
prd;
name;
price;
prdid;
searchText='';
  constructor(private api:ApiService,private router:Router) { }

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
  filterCondition(product) {
    return product.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }
  onclick(prd){
this.name=prd.name;
this.price=prd.price;
this.prdid=prd.id;
  }
  addProductToSaleCart(){
    let product={
     prdid:this.prdid,
     name:this.name,
     price:this.price

    }
    this.api.salecart.push(product);
    localStorage.setItem('salecart', JSON.stringify(this.api.salecart));
    // console.log(this.api.cart);
    console.log(this.api.getSavedSaleCart());
    this.router.navigate(['/salecart'])
  }
}
