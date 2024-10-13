export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
cart =[{
     produceId: '7OUQWS8V',
    quantity: 2,
  }, {
    produceId: 'L62HXTVJ',
    quantity: 1
}];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addProduceToCart(produceId) {
  let existingItem;

  cart.forEach((cartProduct) => {
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
    });
  }

  saveToStorage();
}
export function removeItem(produceId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.produceId !== produceId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}
