import { Component, OnInit } from '@angular/core';
import{ApiService}from '../../services/api/api.service';
import { map } from 'rxjs/operators';
import{Router}from '@angular/router';


@Component({
  selector: 'app-viewbills',
  templateUrl: './viewbills.component.html',
  styleUrls: ['./viewbills.component.css']
})
export class ViewbillsComponent implements OnInit {
bills;
startDate= new Date();
endDate=new Date("2018-12-30");
filterByDate;
user;
  constructor(public api:ApiService,private router:Router) { this.daysInMonth(12,2018)}

  ngOnInit() {
    this.viewBills();
    this.getUsers();
  }
  viewBills(){
    this.api.readBills().pipe(map(list=>list.map(item=>{
      let data=item.payload.doc.data();
      let id=item.payload.doc.id;
      return{id,...data}
    }))).subscribe(res=>{
      this.bills=res;
      this.filterByDate = res;
      let f = this.filterByDate.filter(elem => elem.date > this.startDate && elem.date < this.endDate);
      console.log(f);
    })
  }
  daysInMonth (month, year) {
    this.startDate = new Date(""+year+'-'+month+'-'+1+"");
    let daysInMonth = new Date(year.toString(), month.toString(), 0).getDate();
    this.endDate = new Date(""+year+'-'+month+'-'+daysInMonth+"");

    console.log(this.startDate, this.endDate);
}
getUsers(){
  this.api.getUSers().pipe(map(list=>list.map(item=>{
    let data=item.payload.doc.data();
    let id=item.payload.doc.id;
  return{id,...data}
  }))).subscribe(res=>{
    console.log(res);
    this.user=res;
  })
//   this.api.getspecificpersonbill(this.user.id).subscribe(res=>{
//   let coming=res;
// console.log(coming);

//   })
}
onClick(item){
  let id =item.id;
  let name=item.name;
  let number=item.number;
  this.api.userid=id;
  this.api.username=name;
  this.router.navigate(['billlist'])
  
}

}
