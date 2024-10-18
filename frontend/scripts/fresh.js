import { cart, addProduceToCart } from '../data/cart.js';
import { fetchProduces, produces } from '../data/produces.js';

async function renderProduces() {
    await fetchProduces();

    let producesHTML = '';
    
    if (produces.length > 0) {
        produces.forEach((produce) => {
            producesHTML += `
                <div class="produce-container">
                    <div class="produce-image-container">
                        <img class="produce-image" src="${produce.image}" alt="${produce.name}">
                    </div>
                    <div class="produce-name limit-text-to-2-lines">${produce.name}</div>
                    <div class="produce-price">kshs.${produce.price}</div>
                    <div class="produce-quantity-container">
                        <select class="js-quantity-selector">
                            <option selected value="1">1kg</option>
                            <option value="2">2kg</option>
                            <option value="3">3kg</option>
                            <option value="4">4kg</option>
                            <option value="5">5kg</option>
                            <option value="6">6kg</option>
                            <option value="7">7kg</option>
                            <option value="8">8kg</option>
                            <option value="9">9kg</option>
                            <option value="10">10kg</option>
                        </select>
                    </div>
                    <div class="added-to-cart" style="display: none;">
                        <img src="images/icons/checkmark.png"> Added
                    </div>
                    <button class="add-to-cart-button button-primary js-add-to-cart" data-produce-id="${produce.id}">
                        Add to Cart
                    </button>
                </div>
            `;
        });
        
        // Insert the produced HTML into the grid
        document.querySelector('.js-produces-grid').innerHTML = producesHTML;

        // Attach event listeners to "Add to Cart" buttons
        document.querySelectorAll('.js-add-to-cart').forEach((button) => {
            button.addEventListener('click', (event) => {
                const produceId = event.target.dataset.produceId;
                const quantity = event.target.closest('.produce-container').querySelector('.js-quantity-selector').value;
                addProduceToCart(produceId, quantity);
                refreshCartCount();
                alert('Item added to cart.');
            });
        });

        // Refresh the cart count
        refreshCartCount();
    } else {
        document.querySelector('.js-produces-grid').innerHTML = '<p>No produces available.</p>';
    }
}

// Function to refresh cart count
function refreshCartCount() {
    let cartCount = 0;
    cart.forEach((cartItem) => {
        cartCount += cartItem.quantity;
    });
    document.querySelector('.js-cart-quantity').textContent = cartCount;
}

// Call renderProduces to fetch and display produces
renderProduces();
