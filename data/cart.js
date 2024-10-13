export const cart = [];

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
