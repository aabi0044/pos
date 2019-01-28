import { Component, OnInit } from '@angular/core';
import{ApiService} from '../../services/api/api.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-viewsaleout',
  templateUrl: './viewsaleout.component.html',
  styleUrls: ['./viewsaleout.component.css']
})
export class ViewsaleoutComponent implements OnInit {

  constructor(private api:ApiService) { }
bills;
  ngOnInit() {
    this.getsaleoutbill();
  }
  getsaleoutbill() {
    this.api.readSaleItems().pipe(map(list => list.map(item => {
      let data = item.payload.doc.data();
      let id = item.payload.doc.id;
      return { id, ...data };
    }))).subscribe(res => {
      this.bills = res;
      console.log(res);
    })
  }

}
