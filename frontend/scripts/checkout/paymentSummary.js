import { cart, removeItem, updateDeliveryOption } from '../../data/cart.js';
import { produces, getProduce, fetchProduces } from '../../data/produces.js'; // Make sure to import fetchProduces
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export async function renderOrderSummary() {
  // Ensure produces are fetched before rendering
  await fetchProduces();
  
  let cartSummaryHTML = '';

  cart.forEach((cartProduce) => {
    const produceId = cartProduce.produceId;
    const existingProduce = getProduce(produceId);
    
    console.log(`Checking produceId: ${produceId}`, existingProduce);
    
    if (!existingProduce) {
      console.error(`Produce not found for ID: ${produceId}`);
      return; // Skip this iteration if produce is not found
    }

    const deliveryOptionId = cartProduce.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${existingProduce.id}">
        <div class="delivery-date">Delivery date: ${dateString}</div>

        <div class="cart-item-details-grid">
          <img class="produce-image" src="${existingProduce.image}">

          <div class="cart-item-details">
            <div class="produce-name">${existingProduce.name}</div>
            <div class="produce-price">kshs.${existingProduce.price}</div>
            <div class="produce-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartProduce.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-produce-id="${existingProduce.id}">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-produce-id="${existingProduce.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionsHTML(existingProduce, cartProduce)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(existingProduce, cartProduce) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.price === 0 ? 'FREE' : `kshs.${deliveryOption.price} -`;
      const isChecked = deliveryOption.id === cartProduce.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
          data-produce-id="${existingProduce.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input"
            name="delivery-option-${existingProduce.id}">
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} Shipping</div>
          </div>
        </div>
      `;
    });

    return html;
  }

  // Update the order summary in the DOM
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Delete link event listeners
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const produceId = link.dataset.produceId;
      removeItem(produceId);

      const container = document.querySelector(`.js-cart-item-container-${produceId}`);
      container.remove();

      renderPaymentSummary();
    });
  });

  // Update quantity event listeners
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const produceId = link.dataset.produceId;
      const newQuantity = prompt('Enter new quantity:');

      if (newQuantity && !isNaN(newQuantity) && newQuantity > 0) {
        updateQuantity(produceId, parseInt(newQuantity));
        renderOrderSummary();
        renderPaymentSummary();
      } else {
        alert('Invalid quantity entered.');
      }
    });
  });

  // Delivery option event listeners
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { produceId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(produceId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

function updateQuantity(produceId, newQuantity) {
  cart.forEach((cartProduce) => {
    if (cartProduce.produceId === produceId) {
      cartProduce.quantity = newQuantity;
    }
  });
  saveToStorage(); 
}
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
