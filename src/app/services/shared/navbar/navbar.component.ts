import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {

  }
  onClick(){
    if(this.api.bill.cid==undefined){
      this.router.navigate(['/type'])
    }
    else{
      this.router.navigate(['/addbill'])
    }
  }


}
