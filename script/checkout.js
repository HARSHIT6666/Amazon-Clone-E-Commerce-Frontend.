import { cart } from "../data/cart.js";
import { product } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { removefromcart ,updateQuantity } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOption.js";

//  below code represent days external libraries
  const today = dayjs();
  const delivery = today.add(7 , 'days');
  console.log(delivery.format('dddd, MMMM D'));

let cartSummaryHTML ='';

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    let matchingProduct;
    product.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });

    const deliveryOptionId= cartItem.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    });
      const today =dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,'days'
    );
    const dateString =  deliveryDate.format('dddd, MMMM, D');
    
  
    



    cartSummaryHTML+=
    // console.log(matchingProduct);
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id} ">
            <div class="delivery-date">
              Delivery date:${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link " data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="js-quantity-input js-quantity-input2-${matchingProduct.id}" >
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">save
                  </span>                      
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                ${deliveryOptionHtml(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
    `;
});
// console.log(cartSummaryHTML);

function deliveryOptionHtml(matchingProduct , cartItem){
  let html = '';
deliveryOptions.forEach((deliveryOption)=>{
  const today =dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,'days'
  );
  const dateString =  deliveryDate.format('dddd, MMMM D');

  const priceString = delivery.priceCents === 0
  ? 'FREE'
  : `$${formatCurrency(deliveryOption.priceCents)} -`;

  const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
  html +=
  `
  <div class="delivery-option">
                  <input type="radio"
                ${isChecked ? 'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} - Shipping
                    </div>
                  </div>
                </div>
  `

});
return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

 document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
   const productId = link.dataset.productId;
  removefromcart(productId);
  // console.log(cart);


 const container =  document.querySelector(`.js-cart-item-container-${productId}`);
 container.remove();
 
 updateCartQuantity();
  })
})

function updateCartQuantity (){
    let cartQunatity = 0 ;
 cart.forEach((cartItem)=>{
  cartQunatity+=cartItem.quantity
 
});
document.querySelector('.js-return-to-home-link').innerHTML=`${cartQunatity} items`;
};
updateCartQuantity();


document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click' ,()=>{
    const productId = link.dataset.productId;
    // console.log(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.js-save-link').forEach((link)=>{
link.addEventListener('click',()=>{
  const productId = link.dataset.productId;

  const container =  document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.remove('is-editing-quantity');


  const quantityInput = document.querySelector(`.js-quantity-input2-${productId}`);
  const newQuantity = Number(quantityInput.value); 
  updateQuantity(productId,newQuantity);

  const quantitylabel = document.querySelector(`.js-quantity-label- ${productId}`);
  quantitylabel.innerHTML = newQuantity;
  updateCartQuantity();
  
});
});



  
  

