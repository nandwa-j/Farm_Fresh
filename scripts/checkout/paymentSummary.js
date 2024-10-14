import {cart} from '../../data/cart.js';
import {getProduce} from '../../data/produces.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';

export function renderPaymentSummary() {
  let producePrice = 0;
  let shippingPrice = 0;

  cart.forEach((cartProduce) => {
    const produce = getProduce(cartProduce.produceId);
    producePrice += produce.price * cartProduce.quantity;

    const deliveryOption = getDeliveryOption(cartProduce.deliveryOptionId);
    shippingPrice += deliveryOption.price;
  });

  const beforeVat = producePrice + shippingPrice;
  const vat = Math.round(beforeVat * 0.16);
  const totals = beforeVat + vat;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        kshs.${producePrice}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        kshs.${shippingPrice}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        kshs.${beforeVat}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (16%):</div>
      <div class="payment-summary-money">
        kshs.${vat}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        kshs.${totals}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}