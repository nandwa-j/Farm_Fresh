import { cart } from "../data/cart.js";
import { produces } from "../data/produces.js";

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const produceId = cartItem.produceId;

  let sameProduce;

  produces.forEach((produce) => {
    if (produce.id === produceId) {
      sameProduce = produce;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${sameProduce.id}">
      <div class="delivery-date">
        Delivery date: 14 Monday October 
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${sameProduce.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${sameProduce.name}
          </div>
          <div class="product-price">
            kshs.${sameProduce.price}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${sameProduce.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${sameProduce.id}">
            <div>
              <div class="delivery-option-date">
                14 Monday October
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${sameProduce.id}">
            <div>
              <div class="delivery-option-date">
                16 Wednesday October
              </div>
              <div class="delivery-option-price">
                kshs. 100 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${sameProduce.id}">
            <div>
              <div class="delivery-option-date">
                14 Monday October
              </div>
              <div class="delivery-option-price">
                kshs 150 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
