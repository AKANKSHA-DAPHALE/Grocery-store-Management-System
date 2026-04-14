// === Global Cart Handling ===
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// === Add Item to Cart ===
function addToCart(product, price) {
    // Create a new cart item object with name and price
    const item = { 
        name: product,  // Store the product name
        price: price 
    };
    
    // Add the item to the cart array
    cart.push(item);

    // Store the updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    updateCartDisplay();

    // Show notification
    showNotification(`${product} added to cart!`);
}

// === Update Cart Display ===
function updateCartDisplay() {
    const cartList = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");

    if (!cartList || !totalDisplay) return;

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
        cartList.appendChild(li);
        total += item.price;
    });

    totalDisplay.textContent = total.toFixed(2);
}

// === Checkout Function ===
function checkout() {
    alert('Proceeding to Checkout');
    window.location.href = '{% url "payment-options" %}';
}

// === Billing Page Display ===
function loadBillingPage() {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    const tableBody = document.getElementById('billing-items');
    const totalSpan = document.getElementById('billing-total');
    
    if (!tableBody || !totalSpan) return;

    let total = 0;
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.price.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
        total += item.price;
    });

    totalSpan.textContent = total.toFixed(2);
}

// === Simple Chatbot ===
let chatVisible = false;

function toggleChat() {
    const chatbox = document.getElementById("chatbox");
    chatVisible = !chatVisible;
    chatbox.style.display = chatVisible ? "block" : "none";
}

function sendMessage() {
    console.log("sendMessage function triggered!");  // This will log every time the button is clicked
    var userInput = document.getElementById('user-input').value;  // Get user input
    if (userInput.trim() !== '') {  // Check if input is not empty
        var chatBody = document.getElementById('chat-body');
        if (chatBody) {
            var userMsg = document.createElement('div');
            userMsg.classList.add('user-msg');
            userMsg.textContent = userInput;
            chatBody.appendChild(userMsg);

            var botMsg = document.createElement('div');
            botMsg.classList.add('bot-msg');
            botMsg.textContent = 'You offered: ' + userInput + '. We will check and let you know.';
            chatBody.appendChild(botMsg);

            // Clear the input field
            document.getElementById('user-input').value = '';

            // Scroll the chat to the bottom so the latest messages are visible
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }
}

// === Show Notification ===
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Add these styles to your styles.css file
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);



