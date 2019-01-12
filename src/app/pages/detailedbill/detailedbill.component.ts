import { Component, OnInit } from '@angular/core';
import{ApiService}from '../../services/api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailedbill',
  templateUrl: './detailedbill.component.html',
  styleUrls: ['./detailedbill.component.css']
})
export class DetailedbillComponent implements OnInit {
uid;
response;
name;
constructor(private api:ApiService,private route: ActivatedRoute) { 
  this.uid = this.route.snapshot.params['id'];
  console.log(this.uid);
  this.name=this.api.username;
  console.log(this.name);
}

  ngOnInit() {
    this.getSpecificBill();
  }
  getSpecificBill(){
    this.api.getSpecificBill(this.uid).subscribe(res=>{
      this.response=res;
      console.log(this.response);
    })
  }

}
