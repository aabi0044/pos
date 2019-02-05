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
userid;
show:boolean=false;
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
updateuser(user){
console.log(user.id);
this.userid=user.id;
this.name=user.name;
this.number=user.number;
this.show=true;
}
update(){
  let data={
    name:this.name,
    number:this.number
  }
  this.api.updateUser(this.userid,data).then(res=>{
    console.log("userUpdated");
    this.show=false;
  })
}
}