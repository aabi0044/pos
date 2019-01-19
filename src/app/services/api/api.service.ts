import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  cart: any[] = [];
  data = [];
  index = 0;

  bill = {
    cid:'',
    cart: [],
    customerName:'',
    address: '',
    totalactual:null,
    totaldiscount: null,
    totalsave: null,
    totaldeal:0,
    date: Date.now()
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
    return this.afs.collection('products').snapshotChanges();
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
  //-------------------------------------sales---------------------

  addSale(data) {
    return this.afs.collection('sales').add(data);
  }

  //read One 
  getSale(uid) {
    return this.afs.doc('sales/' + uid).valueChanges();
  }
  //Read All
  getSales() {
    return this.afs.collection('sales').snapshotChanges();
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
}
