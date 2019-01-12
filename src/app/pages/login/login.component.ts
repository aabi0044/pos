import { Component, OnInit } from '@angular/core';
import{Router}from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
usname;
password;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  login(){
    if(this.password=='abdul4344'){
this.router.navigate(['/dashboard']);
    }
else {
  err=>{
    console.log(err);
  }
}
  }

}
