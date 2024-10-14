import { cart, addProduceToCart } from '../data/cart.js';
import { produces } from '../data/produces.js';

function updateCartQuantity() {
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.js-cart-quantity').textContent = cartQuantity;
}

function displayOrders() {
    let ordersHTML = '';

    cart.forEach((cartItem) => {
        const produce = produces.find(item => item.id === cartItem.produceId);
        ordersHTML += `
            <div class="order-container">
                <div class="order-image-container">
                    <img class="order-image" src="${produce.image}" alt="${produce.name}">
                </div>
                <div class="order-details">
                    <div class="order-name">${produce.name}</div>
                    <div class="order-quantity">Quantity: ${cartItem.quantity}kg</div>
                    <button class="buy-again-button js-buy-again" data-produce-id="${produce.id}">
                        Buy Again
                    </button>
                </div>
            </div>
        `;
    });

    document.querySelector('.js-order-grid').innerHTML = ordersHTML;

    document.querySelectorAll('.js-buy-again').forEach(button => {
        button.addEventListener('click', (event) => {
            const produceId = event.target.dataset.produceId;
            addProduceToCart(produceId);
            updateCartQuantity();
            alert('Item added to cart.');
        });
    });
}

updateCartQuantity();
displayOrders();
