 export const cart = [];


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
}
