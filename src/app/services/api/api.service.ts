import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  cart: any[] = [];
  salecart: any[] = [];
  data = [];
  index = 0;

  bill = {
    cid:'',
    cart: [],
    customerName:'',
    address: '',
    totalactual:0,
    totaldiscount: 0,
    totalsave: 0,
    totaldeal:0,
    totalquantity:0,
    date: new Date()
  }
  saleitembill={
    salecart:[],
    date: new Date()
  }
  amount: number;
  total: number;
userid;
username;

  constructor(private afs: AngularFirestore) {
    if (localStorage.getItem('cart') !== null) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
  }

///--------------------- Users


  createUser(data) {
    return this.afs.collection('users').add(data);
  }

  //read One 
  getUser(uid) {
    return this.afs.doc('users/' + uid).valueChanges();
  }
  //Read All
  getUSers() {
    return this.afs.collection('users').snapshotChanges();
  }
  //UPDATE 
  updateUser(uid, data) {
    return this.afs.doc('users/' + uid).update(data);
  }
  //Delete 
  deleteUser(uid) {

    return this.afs.doc('users/' + uid).delete();

  }
//==========================================================================================
  createProduct(data) {
    return this.afs.collection('products').add(data);
  }

  //read One 
  getProduct(uid) {
    return this.afs.doc('products/' + uid).valueChanges();
  }
  getproduct(uid){
    return this.afs.doc('products/'+uid).get();
  }
  //Read All
  getProducts() {
    return this.afs.collection('products',ref=>ref.orderBy('quantity','desc')).snapshotChanges();
  }
  //UPDATE 
    updateProduct(uid, data) {
    return this.afs.doc('products/' + uid).update(data);
  }
  //Delete 
  deleteProduct(uid) {

    return this.afs.doc('products/' + uid).delete();

  }
  //--------------------------------Cart-----------------------------------------

  saveToCart(cart) {
    let data = JSON.stringify(cart);
    localStorage.setItem('cart', data);
  }

  getSavedCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  clearSavedCart() {
    localStorage.removeItem('cart');
  }



  addItemToCart(item) {
    return this.cart.push(item);
  }
  removeItemFromCart(index) {
    this.cart.splice(index, 1);
  }

  //--------------------------------------------------------------------------------------------------------//
  /** Get Data from Cart  */
  getCartData(id) {
    console.log(id)
    return this.afs.doc('cart/' + id).valueChanges();
  }
  /* ---------------ORDER--------------------------------------------------------------------------- */

  //CREATE
   addBill(data) {
    console.log(data);
    return this.afs.collection('bills').add(data);
  }

  //READ ONE
  readBill(id) {

    return this.afs.doc('bills/' + id).valueChanges();
  }
  //READ ALL
  readBills() {
    return this.afs.collection('bills').snapshotChanges();

  }
  // DELETE 
  removebill(id) {
    console.log(id);
    return this.afs.doc('bills/' + id).delete();
  }
  //UPDATE 

  updatebill(id) {
    return this.afs.doc('bills/' + id).valueChanges();
  }
  //-----------------------------------------------------FILTERS--------------------------------------------
  readSpecificBills(val) {
    console.log(val)
    console.log(typeof val)
    return this.afs.collection('bills', ref => ref.where('customerId', '==', val)).valueChanges();
  }

  //----------------------------------------------------------------------------------------------------------

  priceFilter(min, max) {
    console.log(min)
    console.log(typeof min)
    console.log(max)
    console.log(typeof max)
    return this.afs.collection('products', ref =>
      ref.where('price', '>=', min)
        .where('price', '<=', max)).snapshotChanges();
  }

  newArrival(date) {
    console.log(date);
    return this.afs.collection('products', ref => ref.where('date', '>=', date)).snapshotChanges();
  }
  oldProducts(date) {
    console.log(date);
    return this.afs.collection('products', ref => ref.where('date', '<', date)).snapshotChanges();
  }

  rangOf(date) {
    console.log(date);
    return this.afs.collection('products', ref => ref
      .where('date', '>=', date)
      .where('date', '<=', date)).snapshotChanges();
  }
  //-------------------------------------sales daily sale profit---------------------

  addSale(data) {
    return this.afs.collection('sales').add(data);
  }

  //read One 
  getSale(uid) {
    return this.afs.doc('sales/' + uid).valueChanges();
  }
  //Read All
  getSales() {
    return this.afs.collection('sales', ref=>ref.orderBy('date')).snapshotChanges();
  }
  //UPDATE 
  updateSale(uid, data) {
    return this.afs.doc('sales/' + uid).update(data);
  }
  //Delete 
  deleteSale(uid) {

    return this.afs.doc('sales/' + uid).delete();

  }
  getspecificpersonbill(id){
 
      console.log(id);
      return this.afs.collection('bills', ref => ref.where('cid', '==', id)).snapshotChanges();
    
  }
  getSpecificBill(id){
    console.log(id);
    return this.afs.doc('bills/' +id).valueChanges();
  }
   /* ---------------sales--------------------------------------------------------------------------- */

  //CREATE
  addSaleItem(data) {
    console.log(data);
    return this.afs.collection('saleitems').add(data);
  }

  //READ ONE
  readSaleItem(id) {

    return this.afs.doc('saleitems/' + id).valueChanges();
  }
  //READ ALL
  readSaleItems() {
    return this.afs.collection('saleitems').snapshotChanges();

  }
  // DELETE 
  removeSaleItem(id) {
    console.log(id);
    return this.afs.doc('saleitems/' + id).delete();
  }
  //UPDATE 

  updateSaleItem(id) {
    return this.afs.doc('saleitems/' + id).valueChanges();
  }
  // ============================================= sale cart==================
   saveToSaleCart(cart) {
    let data = JSON.stringify(cart);
    localStorage.setItem('salecart', data);
  }

  getSavedSaleCart() {
    return JSON.parse(localStorage.getItem('salecart')) || [];
  }

  clearSavedSaleCart() {
    localStorage.removeItem('salecart');
  }

  addItemToSaleCart(item) {
    return this.salecart.push(item);
  }
  removeItemFromSaleCart(index) {
    this.salecart.splice(index, 1);
  }

}
