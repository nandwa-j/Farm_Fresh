export let produces = [];

// Function to fetch produces
export async function fetchProduces() {
  try {
    const response = await fetch(
      "https://farm-fresh-q3d6.onrender.com/api/products/get-all/"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    produces = await response.json();
    displayProduces(); 
  } catch (error) {
    console.error("Error fetching produces:", error);
  
    document.getElementById("error-message").innerText = "Failed to load produces. Please try again later.";
  }
}

function displayProduces() {
  const producesContainer = document.getElementById("produces-container");
  producesContainer.innerHTML = ""; 
  
  produces.forEach((produce) => {
    const produceElement = document.createElement("div");
    produceElement.classList.add("produce-item");
    produceElement.innerHTML = `
      <h2>${produce.name}</h2>
      <p>Price: $${produce.price}</p>
      <img src="${produce.image}" alt="${produce.name}">
    `;
    producesContainer.appendChild(produceElement);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProduces();
});
