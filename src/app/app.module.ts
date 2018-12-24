import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule}from '@angular/forms';
import{RouterModule}from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddproductsComponent } from './pages/addproducts/addproducts.component';
import { AddbillsComponent } from './pages/addbills/addbills.component';
import { ViewbillsComponent } from './pages/viewbills/viewbills.component';
import { AdddailyComponent } from './pages/adddaily/adddaily.component';
import { ViewdailyComponent } from './pages/viewdaily/viewdaily.component';
import { PendingComponent } from './pages/dashboard/pending/pending.component';
// import { TypeComponent } from './pages/type/type.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddproductsComponent,
    AddbillsComponent,
    ViewbillsComponent,
    AdddailyComponent,
    ViewdailyComponent,
    PendingComponent
    // TypeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.fireConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    FormsModule,
   RouterModule.forRoot([ {path:'',redirectTo:'login',pathMatch:'full'},
   {path:'login',component:LoginComponent},
      {path:'dashboard',component:DashboardComponent},

        {path:'addproducts',component:AddproductsComponent},
        {path:'addbills',component:AddbillsComponent},
        // {path:'type',component:TypeComponent},
        {path:'viewbills',component:ViewbillsComponent},
        {path:'adddaily',component:AdddailyComponent},
        {path:'viewdaily',component:ViewdailyComponent},
        
     
  
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
