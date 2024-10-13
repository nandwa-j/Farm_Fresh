let producesHTML = '';

produces.forEach((produce) => {
  producesHTML += `
    <div class="produce-container">
      <div class="produce-image-container">
        <img class="produce-image" src="${produce.image}">
      </div>

      <div class="produce-name limit-text-to-2-lines">
        ${produce.name}
      </div>

      <div class="produce-rating-container">
        <img class="produce-rating-stars" src="images/ratings/rating-${produce.rating.stars * 10}.png">
        <div class="produce-rating-count link-primary">
          ${produce.rating.count}
        </div>
      </div>

      <div class="produce-price">
        kshs.${produce.price} <!-- Corrected syntax here -->
      </div>

      <div class="produce-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="produce-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-produce-id="${produce.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-produces-grid').innerHTML = producesHTML;

// Add event listeners for the 'Add to Cart' buttons
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const produceId = button.dataset.produceId;

    // Find matching item in the cart or add a new one
    let matchingItem = cart.find(item => item.produceId === produceId);

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        produceId: produceId,
        quantity: 1
      });
    }

    // Calculate total items in cart
    let cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    // Update cart quantity display
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  });
});
