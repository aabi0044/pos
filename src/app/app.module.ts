import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule}from '@angular/forms';
import{RouterModule}from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


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
import { TypeComponent } from './pages/type/type.component';
import{ NavbarComponent}from './services/shared/navbar/navbar.component';
import { CartComponent } from './pages/cart/cart.component';
import { BilllistComponent } from './pages/billlist/billlist.component';
import { DetailedbillComponent } from './pages/detailedbill/detailedbill.component';
import { SaleoutComponent } from './pages/saleout/saleout.component';
import { ViewsaleoutComponent } from './pages/viewsaleout/viewsaleout.component';

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
    PendingComponent,
    TypeComponent,
    NavbarComponent,
    CartComponent,
    BilllistComponent,
    DetailedbillComponent,
    SaleoutComponent,
    ViewsaleoutComponent
    
    // TypeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.fireConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    FormsModule,
   RouterModule.forRoot([ {path:'',redirectTo:'login',pathMatch:'full'},
   {path:'login',component:LoginComponent},
      {path:'dashboard',component:DashboardComponent},

        {path:'addproducts',component:AddproductsComponent},
        {path:'addbills',component:AddbillsComponent},
    
        {path:'type',component:TypeComponent},
        {path:'viewbills',component:ViewbillsComponent},
        {path:'billlist',component:BilllistComponent},
        {path:'detailedbill',component:DetailedbillComponent},
        {path:'detailedbill/:id',component:DetailedbillComponent},

        {path:'adddaily',component:AdddailyComponent},
        {path:'viewdaily',component:ViewdailyComponent},
        {path:'adddealer',component:TypeComponent},
        {path:'cart',component:CartComponent},
     
  
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
