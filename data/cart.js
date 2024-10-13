export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
cart =[{
     produceId: '7OUQWS8V',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    produceId: 'L62HXTVJ',
    quantity: 1,
     deliveryOptionId: '2'
}];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addProduceToCart(produceId) {
  let existingItem;

  cart.forEach((cartProduce) => {
    if (produceId === cartProduce.produceId) {
      existingItem = cartProduce;
    }
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      produceId: produceId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeItem(produceId) {
  const newCart = [];

  cart.forEach((cartProduce) => {
    if (cartProduce.produceId !== produceId) {
      newCart.push(cartProduce);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let existingItem;

  cart.forEach((cartProduce) => {
    if (productId === cartProduce.productId) {
      matchingItem = cartProduce;
    }
  });

  existingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
