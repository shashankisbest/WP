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
                <p>Price: Rs.${item.price}</p>
                <button class="remove-btn" onclick="cart.removeItem(${item.id})">Remove</button>
            `;
            cartContainer.appendChild(cartItemDiv);
        });

        // Display the total price
        totalPriceContainer.textContent = `Total: Rs.${this.totalPrice.toFixed(2)}`;
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

//WHAT WILL ADD TO CART BUTTON DO
document.querySelectorAll('.addtocart').forEach((button, index) => {
    button.addEventListener('click', function() {
        cart.addItem(products[index]);
    });
});

// Handle toggle sidebar functionality
document.getElementById("toggleBtn").addEventListener("click", function() {
    document.getElementById("sidebar").classList.toggle("collapsed");
});


function toggletheme(){
    let currtheme = document.getElementById("theme").innerText;

    if(currtheme == "Light-mode")
    {

        document.getElementById("theme").textContent = "Dark-mode";
    }
    
    else if(currtheme == "Dark-mode")
    {

        document.getElementById("theme").textContent = "Light-mode";
    }

}

document.getElementById("theme").addEventListener("click",toggletheme())


// timer-----------------------------------
let timerInterval;
let time = 0;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");

function parseTime(input) {
    const parts = input.split(":").map(Number);
    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
        return parts[0];
    }
    return 0;
}

function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.value = formatTime(time);
    if (time > 10) {
        timerDisplay.style.backgroundColor = "#28a745";
        timerDisplay.style.color = "white";
    } else if (time > 5) {
        timerDisplay.style.backgroundColor = "#ffc107";
        timerDisplay.style.color = "black";
    } else {
        timerDisplay.style.backgroundColor = "#dc3545";
        timerDisplay.style.color = "white";
    }
}

function startPauseTimer() {
    if (!isRunning) {
        if (time === 0) {
            time = parseTime(timerDisplay.value);
            if (time <= 0) return;
        }
        
        timerInterval = setInterval(() => {
            if (time > 0) {
                time--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                startPauseButton.textContent = "Start";
            }
        }, 1000);
        startPauseButton.textContent = "Pause";
    } else {
        clearInterval(timerInterval);
        startPauseButton.textContent = "Resume";
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timerInterval);
    time = 0;
    timerDisplay.value = "";
    timerDisplay.style.backgroundColor = "white";
    timerDisplay.style.color = "black";
    startPauseButton.textContent = "Start";
    isRunning = false;
}

startPauseButton.addEventListener("click", startPauseTimer);
resetButton.addEventListener("click", resetTimer);
// --------------------------------------




// -------theme toggle-------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("themeToggle");
    const body = document.body;

    // Check for saved theme in localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    // Toggle theme and save preference
    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode")  ;
        localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    });
});

// --------------------------------------


// light box

document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const galleryImages = document.querySelectorAll(".gallery-img");

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.classList.add("active");
            lightboxImg.src = img.src;
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });
});

