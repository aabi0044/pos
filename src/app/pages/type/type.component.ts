import { Component, OnInit } from '@angular/core';
import {ApiService}from '../../services/api/api.service';
import{Router}from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

name;
number;
user;
noofbills;
    constructor(private api:ApiService,private router :Router) { }
  
    ngOnInit() {
  this.getUsers();
     
    }
    addNewCustomer(){
      let data={
        name:this.name,
        number:this.number
      }
  this.api.createUser(data).then(res=>{
    console.log("user Created");
  })
  this.name='';
  this.number=null;

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
  this.api.bill.cid=id;
  this.api.bill.customerName=name;
  this.router.navigate(['addbills/'+id])
  
}
}