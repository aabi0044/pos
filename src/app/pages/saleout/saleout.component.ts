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

}
