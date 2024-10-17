# Farm Fresh Project

**Farm Fresh** is an e-commerce web application designed to connect consumers with local farmers by allowing them to purchase fresh produce online. The app provides a seamless shopping experience, featuring product listings, a shopping cart, and order tracking.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Database Structure](#database-structure)
5. [API Endpoints](#api-endpoints)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact Information](#contact-information)

## Features

- Browse and search for fresh produce.
- Add items to a shopping cart.
- Checkout and view order summaries.
- Track orders in real-time.
- Responsive design for optimal viewing on various devices.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Django (Python)
- **Database**: PostgreSQL
- **Version Control**: Git
- **Hosting**: [Render and vercel]

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Python 3.x
- MySQL Server
- Node.js (for any frontend package management)
- Git

### Clone the Repository

```bash
git clone https://github.com:nandwa-j/Farm_Fresh.git
cd Farm_Fresh
Backend Setup
Create a virtual environment (recommended):

bash
Copy code
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install Flak and required packages:

bash
Copy code
pip install Flask Flask-SQLAlchemy mysqlclient
Set up the MySQL database:

Create a new database named farm_fresh_db in MySQL.
Run the SQL scripts provided in the database folder to create the necessary tables.
Run the Flask application:

bash
Copy code
python app.py
Frontend Setup
Install dependencies (if any are used, e.g., via npm):

bash
Copy code
npm install
Open checkout.html, fresh.html, order.html, and tracking.html in your browser to view the application.

Database Structure
The following tables are part of the database schema:

1. Produces Table
id: INT, primary key
name: VARCHAR(255)
price: DECIMAL(10, 2)
rating_stars: DECIMAL(3, 2)
rating_count: INT
image: VARCHAR(255)
available_quantity: INT
2. Cart Table
id: INT, primary key
user_id: INT, foreign key
produce_id: INT, foreign key
quantity: INT
3. Orders Table
id: INT, primary key
user_id: INT, foreign key
total_price: DECIMAL(10, 2)
order_date: TIMESTAMP
status: VARCHAR(50)
4. Order Items Table
id: INT, primary key
order_id: INT, foreign key
produce_id: INT, foreign key
quantity: INT
API Endpoints
GET /api/produces: Retrieve a list of all available produce.
POST /api/cart: Add items to the cart.
GET /api/cart: Retrieve current cart items.
POST /api/orders: Place a new order.
GET /api/orders/:id: Get order details by ID.
Usage
Browse Produce: Navigate to fresh.html to view available products.
Add to Cart: Select items and quantities, then click "Add to Cart".
Checkout: Click on the cart icon to view your items and proceed to checkout.
Order Tracking: Use the order tracking page to view the status of your orders.
Contributing
Contributions are welcome! If you have suggestions for improvements or want to report bugs, please open an issue or submit a pull request.

Fork the repository.
Create your feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact Information
For any inquiries or feedback, please contact:

Name: Nandwa Japheth
Email: [nandwajapheth7@gmail.com]
GitHub: nandwa-j
