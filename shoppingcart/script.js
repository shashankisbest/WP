class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

class Cart {
    constructor() {
        this.items = [];
        this.totalPrice = 0;
    }

    addItem(product) {
        this.items.push(product);
        this.totalPrice += product.price;
        this.displayCart();
    }

    removeItem(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.totalPrice -= this.items[index].price;
            this.items.splice(index, 1);
        }
        this.displayCart();
    }

    displayCart() {
        const cartContainer = document.getElementById('cartItems');
        const totalPriceContainer = document.getElementById('totalPrice');
        
        // Clear the current cart display
        cartContainer.innerHTML = '';

        // Add each item in the cart to the display
        this.items.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <p>${item.name}</p>
                <p>Price: $${item.price}</p>
                <button class="remove-btn" onclick="cart.removeItem(${item.id})">Remove</button>
            `;
            cartContainer.appendChild(cartItemDiv);
        });

        // Display the total price
        totalPriceContainer.textContent = `Total: $${this.totalPrice.toFixed(2)}`;
    }
}

// Create products
const products = [
    new Product(1, 'Product 1', 25.99, './itemimages/item1.jfif'),
    new Product(2, 'Product 2', 35.99, './itemimages/item2.jfif'),
    new Product(3, 'Product 3', 45.99, './itemimages/item3.jfif'),
    new Product(4, 'Product 4', 55.99, './itemimages/item4.jfif')
];

// Create cart instance
const cart = new Cart();

// Add event listeners to Add to Cart buttons
document.querySelectorAll('.addtocart').forEach((button, index) => {
    button.addEventListener('click', function() {
        cart.addItem(products[index]);
    });
});

// Handle toggle sidebar functionality
document.getElementById("toggleBtn").addEventListener("click", function() {
    document.getElementById("sidebar").classList.toggle("collapsed");
});
