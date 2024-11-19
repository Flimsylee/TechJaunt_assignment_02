// // event-listener for proceed button to load check out page

document.addEventListener('DOMContentLoaded', () => {
    function setupCheckOutButton() {
        const ProceedToCheckout = document.getElementById('proceed');
        if (ProceedToCheckout) {
            // Remove any existing event listeners more safely
            ProceedToCheckout.removeEventListener('click', checkoutHandler);
            ProceedToCheckout.addEventListener('click', checkoutHandler);
        }
    }

    function checkoutHandler() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length > 0) {
            window.location.href = 'checkOut.html';
        } else {
            alert('Your cart is empty. Please add items before proceeding to checkout.');
        }
    }

    // Initial setup
    setupCheckOutButton();

    // Reattach event listener if cart changes
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        const config = { childList: true, subtree: true };
        const callback = function() {
            setupCheckOutButton();
        };
        const observer = new MutationObserver(callback);
        observer.observe(cartContainer, config);
    }
});


// function validateForm() {
//     const form = document.querySelector('form');
//     if (!form) return false;

//     const inputs = form.querySelectorAll('input');
//     let isValid = true;

//     inputs.forEach(input => {
//         if (!input.value.trim()) {
//             isValid = false;
//             input.style.borderColor = 'red';
//         } else {
//             input.style.borderColor = '';
//         }
//     });

//     if (!isValid) {
//         alert('Please fill in all fields');
//     }

//     return isValid;
// }

