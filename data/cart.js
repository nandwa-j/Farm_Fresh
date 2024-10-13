export let cart = [{
     produceId: '7OUQWS8V',
    quantity: 2,
  }, {
    produceId: 'L62HXTVJ',
    quantity: 1
}];

export function addProduceToCart(produceId) {
  let existingItem;

  cart.forEach((cartProduct) => {
    if (produceId === cartProduct.produceId) {
      existingItem = cartProduct;
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
}
export function removeItem(produceId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.produceId !== produceId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

}
