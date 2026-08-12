 export let cart =
 

 if(!cart){

  cart = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2
 },
 {
productId :  "15b6fc6f-327a-4ec4-896f-486349e85a3d",
quantity: 1,
 }
];
 }


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

 export function addtocart(productId){
 let matchingItem;

 cart.forEach((cartItem)=>{
  if(productId === cartItem.productId){
    matchingItem=cartItem;
  }
 });

 const QuantitySelector =document.querySelector(`.js-quantity-selector-${productId}`);
 const finalSelectedQuantity = Number(QuantitySelector.value);

 if(matchingItem){
  matchingItem.quantity +=finalSelectedQuantity;
 }else{
  cart.push({
  productId  : productId,
  quantity : finalSelectedQuantity

 });

 }
 saveToStorage();
}



export function removefromcart(productId){
  const newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  })
  cart =newCart;
  saveToStorage();
}