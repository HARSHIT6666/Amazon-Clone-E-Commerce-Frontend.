 class Cart{
 cartItems;
 localStoragekey;

 constructor(localStoragekey){
    this.localStoragekey = localStoragekey;
       this.loadFromStorage();
 
 }
 loadFromStorage(){
   this.cartItems = JSON.parse(localStorage.getItem(this.localStoragekey));
 if(!this.cart){

 this.cart = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2,
    deliveryOptionId :'1'
 },
 {
productId :  "15b6fc6f-327a-4ec4-896f-486349e85a3d",
quantity: 1,
 deliveryOptionId :'2'
 }
];
 }}

 saveToStorage(){
 this.localStorage.setItem(localStoragekey,JSON.stringify(this.cart));
}

addtocart(productId){
 let matchingItem;

 this.cart.forEach((cartItem)=>{
  if(productId === cartItem.productId){
    matchingItem=cartItem;
  }
 });

 const QuantitySelector =document.querySelector(`.js-quantity-selector-${productId}`);
 const finalSelectedQuantity = Number(QuantitySelector);

 if(matchingItem){
  matchingItem.quantity +=finalSelectedQuantity;
 }else{
  this.cart.push({
  productId  : productId,
  quantity : finalSelectedQuantity,
  deliveryOptionId : '1'

 });

 }
 this.saveToStorage();
}

removefromcart(productId){
  const newCart = [];
  this.cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  })
  this.cart =newCart;
  this.saveToStorage();
}

updateQuantity(productId , newQuantity){
  let matchingItem;
  this.cart.forEach((cartItem)=>{
  if(productId === cartItem.productId){
    matchingItem=cartItem;
  }
 });
 matchingItem.quantity = newQuantity;
 this.saveToStorage();
}

updateDeliveryOption(productId ,deliveryOptionId){
   let matchingItem;
  this.cart.forEach((cartItem)=>{
  if(productId === cartItem.productId){
    matchingItem=cartItem;
  }
});
matchingItem.deliveryOptionId =deliveryOptionId;
this.saveToStorage();
}

 }
 

 const cart =  new Cart('cart-oop');
 const businessCart =  new Cart('cart-business');


 

 console.log(cart);
 console.log(businessCart);


 console.log(businessCart instanceof Cart);

 










 