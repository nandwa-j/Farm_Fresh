export function getProduce(produceId) {
  let existingProduce;

  produces.forEach((produce) => {
    if (produce.id === produceId) {
      existingProduce = produce;
    }
  });

  return existingProduce;
}

export const produces = [
  {
    id: "7OUQWS8V",
    image: "images/produces/cabbages.jpg",
    name: "Cabbage",
    rating: {
      stars: 4.5,
      count: 105,
    },
    price: 80,
  },
  {
    id: "L62HXTVJ",
    image: "images/produces/english-cucumber.jpg",
    name: "English Cucumber",
    rating: {
      stars: 5,
      count: 189,
    },
    price: 10,
  },
  {
    id: "J3LUCCMK",
    image: "images/produces/mini-cucumber.jpg",
    name: "Mini Cucumber",
    rating: {
      stars: 4,
      count: 89,
    },
    price: 90,
  },
  {
    id: "R9UNCC8X",
    image: "images/produces/organic-tomatoes.jpg",
    name: "Organic Tomatoes",
    rating: {
      stars: 4.5,
      count: 906,
    },
    price: 20,
  },
  {
    id: "MYMW7W87",
    image: "images/produces/red-bell-peppers.jpg",
    name: "Red Bell Peppers",
    rating: {
      stars: 4,
      count: 67,
    },
    price: 50,
  },
  {
    id: "483GAF44",
    image: "images/produces/yellow-bell-peppers.jpg",
    name: "Yellow Bell Peppers",
    rating: {
      stars: 4.5,
      count: 117,
    },
    price: 50,
  },
  {
    id: "XIVY825Y",
    image: "images/produces/round-cherry-tomatoes.jpg",
    name: "Round Cherry Tomatoes",
    rating: {
      stars: 5,
      count: 608,
    },
    price: 400,
  },
];
