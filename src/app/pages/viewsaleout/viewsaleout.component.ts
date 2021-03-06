import { Component, OnInit } from '@angular/core';
import{ApiService} from '../../services/api/api.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-viewsaleout',
  templateUrl: './viewsaleout.component.html',
  styleUrls: ['./viewsaleout.component.css']
})
export class ViewsaleoutComponent implements OnInit {

  constructor(public api:ApiService) { }
bills:any;
month:any;
year:any;
val:any;
val2:any;
sales:any;
today= Date.now();
dp:any;
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
  deleteBill(item){
    let id=item.id;
    this.api.removeSaleItem(id).then(res=>{
      console.log("deleted");
    })
  }
  selectToday() {
    // this.set=0;
    // this.set1=0;
    // this.set2=0;
    let e=0;
    let f=0;


 let date= new Date(this.today);
 console.log(date);
 let  o= { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
 console.log(o);
 let d;
    this.api.readSaleItems().pipe(map(list => list.map(item => {
     let data = item.payload.doc.data();
     let id = item.payload.doc.id;
    
     return { id, ...data };
   }))).subscribe(res => {
     this.sales= res;
     console.log(this.sales);
     d = this.sales.filter((elem => {
       console.log( elem.date.toDate());
       let y = elem.date.toDate();
       
       let u = { year: y.getFullYear(), month: y.getMonth() + 1, day: y.getDate() };
       console.log(u);
       return u.year == o.year && u.month == o.month && u.day==o.day ;
     
   })
 //   .subscribe(res => {
 //    this.daily = res;
 // console.log(this.daily);
   
 //    })
 
    );
    console.log(d);
      if (d[0] == undefined) {
        console.log("okay");
        this.bills = d;
      
      }
      else {
      this.bills=d;
        }
      

      
      
    })
    
  }
  ManualDate() {
    // this.set=0;
    // this.set1=0;
    // this.set2=0;
    let e=0;
    let f=0;


 let date= new Date(this.dp);
 console.log(date);
 let  o= { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
 console.log(o);
 let d;
    this.api.readSaleItems().pipe(map(list => list.map(item => {
     let data = item.payload.doc.data();
     let id = item.payload.doc.id;
    
     return { id, ...data };
   }))).subscribe(res => {
     this.sales= res;
     console.log(this.sales);
     d = this.sales.filter((elem => {
       console.log( elem.date.toDate());
       let y = elem.date.toDate();
       
       let u = { year: y.getFullYear(), month: y.getMonth() + 1, day: y.getDate() };
       console.log(u);
       return u.year == o.year && u.month == o.month && u.day==o.day ;
     
   })
 //   .subscribe(res => {
 //    this.daily = res;
 // console.log(this.daily);
   
 //    })
 
    );
    console.log(d);
      if (d[0] == undefined) {
        console.log("okay");
        this.bills = d;
      
      }
      else {
      this.bills=d;
        }
      

      
      
    })
    
  }
  ManualMonthAndYear() {
    // this.set=0;
    // this.set1=0;
    // this.set2=0;
    let e=0;
    let f=0;


//  let date= new Date(this.dp);
//  console.log(date);
//  let  o= { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
//  console.log(o);
 let d;
    this.api.readSaleItems().pipe(map(list => list.map(item => {
     let data = item.payload.doc.data();
     let id = item.payload.doc.id;
    
     return { id, ...data };
   }))).subscribe(res => {
     this.sales= res;
     console.log(this.sales);
     d = this.sales.filter((elem => {
       console.log( elem.date.toDate());
       let y = elem.date.toDate();
       
       let u = { year: y.getFullYear(), month: y.getMonth() + 1, day: y.getDate() };
       console.log(u);
       return u.year == this.year && u.month == this.month  ;
     
   })
 //   .subscribe(res => {
 //    this.daily = res;
 // console.log(this.daily);
   
 //    })
 
    );
    console.log(d);
      if (d[0] == undefined) {
        console.log("okay");
        this.bills = d;
      
      }
      else {
      this.bills=d;
        }
      

      
      
    })
    
  }

  // filterCondition(product) {
  //   return product._id.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  // }
  months(event:any){
    this.val=event.target.value;
    console.log(this.val);
    if (this.val == 'jan') {
      this.month = 1;
    }
    else if (this.val == 'feb') {
      this.month = 2;
    }
    else if (this.val == 'mar') {
      this.month = 3;
    }
    else if (this.val == 'apr') {
      this.month = 4;
    }
    else if (this.val == 'may') {
      this.month = 5;
    }
    else if (this.val == 'jun') {
      this.month = 6;
    }
    else if (this.val == 'jul') {
      this.month = 7;
    }
    else if (this.val == 'aug') {
      this.month = 8;
    }
    else if (this.val == 'sep') {
      this.month = 9;
    }
    else if (this.val == 'oct') {
      this.month = 10;
    }
    else if (this.val == 'nov') {
      this.month = 11;
    }
    else if (this.val == 'dec') {
      this.month = 12;
    }
    console.log(this.month);
  }
  years(event: any) {
    this.val2 = event.target.value;
    console.log(this.val2);
    if (this.val2 == '2019') {
      this.year = 2019;
    }
    else if (this.val2 == '2018') {
      this.year = 2018;
    }
    else if (this.val2 == '2020') {
      this.year = 2020;
    }
    else if (this.val2 == '2020') {
      this.year = 2020;
    }
    else if (this.val2 == '2021') {
      this.year = 2021;
    }
    else if (this.val2 == '2022') {
      this.year = 2022;
    }
    else if (this.val2 == '2023') {
      this.year = 2023;
    }
    else if (this.val2 == '2024') {
      this.year = 2024;
    }
    else if (this.val2 == '2025') {
      this.year = 2025;
    }
    else if (this.val2 == '2026') {
      this.year = 2026;
    }
    else if (this.val2 == '2027') {
      this.year = 2027;
    }
    else if (this.val2 == '2028') {
      this.year = 2028;
    }
    else if (this.val2 == '2029') {
      this.year = 2029;
    }
    else if (this.val2 == '2030') {
      this.year = 2030;
    }
    else if (this.val2 == '2031') {
      this.year = 2031;
    }
    else if (this.val2 == '2032') {
      this.year = 2032;
    }
    else if (this.val2 == '2033') {
      this.year = 2033;
    }
    else if (this.val2 == '2034') {
      this.year = 2034;
    }
    else if (this.val2 == '2035') {
      this.year = 2035;
    }
    else if (this.val2 == '2036') {
      this.year = 2036;
    }
    else if (this.val2 == '2037') {
      this.year = 2037;
    }
    else if (this.val2 == '2038') {
      this.year = 2038;
    }
    else if (this.val2 == '2039') {
      this.year = 2039;
    }
    else if (this.val2 == '2040') {
      this.year = 2040;
    }
    console.log(this.year);
  }
  // deleteBill(item){
  //   let id =item.id;
  //   console.log(id);
  //   this.api.removebill(id).then(res=>{
  //     console.log("deleted");
  //   })
  // }


}
