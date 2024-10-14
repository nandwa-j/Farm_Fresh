// tracking.js
async function fetchOrderTracking(orderId) {
    try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch order details');
        }

        const orderData = await response.json();
        populateOrderTracking(orderData);
    } catch (error) {
        console.error(error);
    }
}

function populateOrderTracking(order) {
    // Populate delivery date
    const deliveryDateElement = document.getElementById('delivery-date');
    deliveryDateElement.textContent = `Arriving on ${order.deliveryDate}`;

    // Populate produce info
    const produceInfoElement = document.getElementById('produce-info');
    produceInfoElement.textContent = order.produceName;

    // Populate produce quantity
    const produceQuantityElement = document.getElementById('produce-quantity');
    produceQuantityElement.textContent = `Quantity: ${order.quantity}`;

    // Populate produce image
    const produceImageElement = document.getElementById('produce-image');
    produceImageElement.src = order.image;

    // Update progress bar
    updateProgress(order.status);
}

function updateProgress(status) {
    const progressLabels = document.querySelectorAll('.progress-label');
    progressLabels.forEach(label => {
        label.classList.remove('current-status');
    });

    if (status === 'Preparing') {
        document.getElementById('progress-preparing').classList.add('current-status');
    } else if (status === 'Shipped') {
        document.getElementById('progress-shipped').classList.add('current-status');
    } else if (status === 'Delivered') {
        document.getElementById('progress-delivered').classList.add('current-status');
    }

    // Simulate a progress bar (this can be adjusted based on the actual order status)
    const progressBar = document.getElementById('progress-bar');
    if (status === 'Preparing') {
        progressBar.style.width = '33%';
    } else if (status === 'Shipped') {
        progressBar.style.width = '66%';
    } else if (status === 'Delivered') {
        progressBar.style.width = '100%';
    }
}

// Fetch the order tracking details
const orderId = '12345'; // This should be dynamically set based on user selection or context
fetchOrderTracking(orderId);
