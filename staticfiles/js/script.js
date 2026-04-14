// === Global Cart Handling ===
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// === Add Item to Cart ===
function addToCart(product, price) {
    // Create a new cart item object
    const item = { product, price };
    
    // Add the item to the cart array
    cart.push(item);

    // Store the updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display (in the current page)
    updateCartDisplay();
}

// === Update Cart Display (e.g., in a side cart UI) ===
function updateCartDisplay() {
    const cartList = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");

    if (!cartList || !totalDisplay) return; // Exit if not on the cart page

    cartList.innerHTML = ""; // Clear the existing list
    let total = 0;

    // Loop through cart items and display them
    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.product} - ₹${item.price.toFixed(2)}`;
        cartList.appendChild(li);
        total += item.price;
    });

    // Update the total price
    totalDisplay.textContent = total.toFixed(2);
}

// === Checkout Function ===
function checkout() {
    alert('Proceeding to Checkout');
    // Redirect to checkout page or payment options page
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
            <td>${item.product}</td>
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



