import { Component, OnInit } from '@angular/core';
import{ApiService} from '../../services/api/api.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-viewdaily',
  templateUrl: './viewdaily.component.html',
  styleUrls: ['./viewdaily.component.css']
})
export class ViewdailyComponent implements OnInit {
prd;
length;
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.showSales();
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
  deleteSale(item){
    let id=item.id;
    this.api.deleteSale(id).then(res=>{
      console.log("deleted");
    })
  }

}
