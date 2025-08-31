function filterPhones(category) {
    const sections = document.querySelectorAll('main section');

    sections.forEach(section => {
        if (category === 'all' || section.classList.contains('phone' + category)) {
            section.style.display = 'grid';
        } else {
            section.style.display = 'none';
        }
    });
}

function addToCart(event) {
    event.preventDefault();
    
    const button = event.target;
    const card = button.closest('.mobile-card');
    
    const image = card.querySelector('img').src;
    const name = card.querySelector('.mobile-title').textContent;
    const priceText = card.querySelector('.mobile-price').textContent;
    const price = parseInt(priceText.replace('₹', '').replace(',', ''));
    
    const item = {
        name: name,
        price: price,
        image: image
    };
    
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({...item, quantity: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    showLocalAlert(button, 'Successfully Added!');
}

function showLocalAlert(button, message) {
    const alert = document.createElement('div');
    alert.className = 'local-alert';
    alert.textContent = message;
    
    const buttonRect = button.getBoundingClientRect();
    alert.style.position = 'fixed';
    alert.style.left = (buttonRect.left - 50) + 'px';
    alert.style.top = (buttonRect.top - 40) + 'px';
    alert.style.background = '#28a745';
    alert.style.color = 'white';
    alert.style.padding = '8px 12px';
    alert.style.borderRadius = '6px';
    alert.style.fontSize = '12px';
    alert.style.fontWeight = 'bold';
    alert.style.zIndex = '1000';
    alert.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    alert.style.animation = 'popIn 0.3s ease';
    alert.style.whiteSpace = 'nowrap';
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});
