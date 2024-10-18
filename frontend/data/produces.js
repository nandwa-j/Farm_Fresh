export let produces = [];

export async function fetchProduces() {
  try {
    const response = await fetch(
      "https://farm-fresh-q3d6.onrender.com/api/products/get-all/"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    produces = await response.json();
  } catch (error) {
    console.error("Error fetching produces:", error);
  }
}

export function getProduce(produceId) {
  return produces.find((produce) => produce.id === produceId);
}
