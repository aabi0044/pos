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
  
    constructor(private api:ApiService,private router :Router) { }
  
    ngOnInit() {
  
     
    }
    addNewCustomer(){
      let data={
        name:this.name,
        number:this.number
      }
  this.api.createUser(data).then(res=>{
    console.log("user Created");
  })

}
getUsers(){
  this.api.getUSers().pipe(map(list=>list.map(item=>{
    let data=item.payload.doc.data();
    let id=item.payload.doc.id;
  return{id,...data}
  }))).subscribe(res=>{
    console.log(res);
  })
}
}