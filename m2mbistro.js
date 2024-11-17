document.addEventListener('DOMContentLoaded', () => {
    const filterToggle = document.querySelector('#filterToggle');
    const filterOpts = document.querySelector(".filter-opts");
    const badge = document.getElementById('badge');
    const cartIcon = document.getElementById('cart-icon');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    

   
    // Filter toggle functionality
    if (filterToggle && filterOpts) {
        filterToggle.addEventListener('click', () => {
            filterOpts.style.display = filterOpts.style.display === "none" ? "block" : "none";
        });
    }

    // Navigation bar functionality
    const headerContent = document.querySelector(".header__content");
    const showMenuClass = "show-menu";
    const btnOpen = document.getElementById("btn-open-menu");
    const btnClose = document.querySelector(".btn-close-menu");
    
    function toggleMenu() {
        if (headerContent) {
            headerContent.classList.toggle(showMenuClass);
        }
    }
    
    if (btnOpen) btnOpen.addEventListener('click', toggleMenu);
    if (btnClose) btnClose.addEventListener('click', toggleMenu);

    // Cart functionality
    function updateCart() {
        if (badge) {
            badge.textContent = cart.reduce((total, item) => total + item.quantity, 0);
            badge.style.display = cart.length > 0 ? 'block' : 'none';
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        
    }

    // function to check if cart-container exist else return to show empty cart
    function renderCart() {
        const cartContainer = document.getElementById('cart-container');
        if (!cartContainer) return; 

        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i id="bx-cart">🛒</i>
                    <p>Your cart is empty</p>
                    <p>Yo! We've got something palatable for you Bruv!</p>
                    <button id="add-to-cart" type="button">Add Something to get started</button>
                </div>
            `;
            const addToCartBtn = document.getElementById('add-to-cart');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    window.location.href = 'index.html';
                });
            }
        } else {
            let cartHTML = `
                <div class="go-back">
                    <h6><a href="index.html"><i class="bx bx-arrow-back"></i> Back to Menu</a></h6>
                </div>
                <h4>Shopping summary</h4>
            `;
            cart.forEach(item => {
                cartHTML += `
                    <div id="order-card">
                        <img src="${item.img}" alt="${item.name}" />
                        <h6>${item.name}</h6>
                        <input type="number" name="number" class="item-quantity" data-id="${item.id}" value="${item.quantity}" min="1" />
                        <h5>$${(item.price * item.quantity).toFixed(2)}</h5>
                        <i class='bx bxs-trash-alt remove-item' data-id="${item.id}"></i>
                    </div>
                `;
            });
            cartHTML += `

               <div class="total-value" id="total-value">
                   <p> Total : ${cartTotal()} </p>
                </div>

                <div class="coupon-input">
                <p id="message" class="message"></p>
                    <form class="coupon-form" method="GET" action="">
                    <input  type="text" name="coupon" id="coupon" placeholder="Enter coupon code" />
                     <input type="button" name="apply" id="apply" value="Apply Coupon" />

                    </form>
                </div>

                

                <div id="payment_link">
                <button id="proceed" type="button" > Proceed to checkout </button>
                </div>
            `;


            function cartTotal() {
               const total = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
                localStorage.setItem('cartTotal', total);
                return total;
            } 
            cartContainer.innerHTML = cartHTML;
           
            // Add event listeners for quantity changes and item removal
            document.querySelectorAll('.item-quantity').forEach(input => {
                input.addEventListener('change', (e) => {
                    const id = e.target.dataset.id;
                    const quantity = parseInt(e.target.value);
                    updateItemQuantity(id, quantity);
                });
            });

            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.dataset.id;
                    removeItem(id);
                });
            });
        }
    }

    function updateItemQuantity(id, quantity) {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart[index].quantity = quantity;
            updateCart();
        }
    }

    function removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }

    // Add to cart functionality
    document.querySelectorAll('.grouped_btn').forEach(button => {
        button.addEventListener("click", () => {
            const itemsCard = button.closest('.items-card');
            const itemName = itemsCard.querySelector('#items-name').innerText;
            const itemPrice = parseFloat(itemsCard.querySelector('#items-price').innerText.replace('$', ''));
            const itemImg = itemsCard.querySelector('img').src;
            const itemId = itemName.toLowerCase().replace(/ /g, '-');
            

            const existingItem = cart.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: itemId,
                    name: itemName,
                    price: itemPrice,
                    quantity: 1,
                    img: itemImg,
                    
                });
            }
            updateCart();
        });
    });

    // Make cart icon clickable
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }

    // Initialize cart on page load
    updateCart();

});

// window.onload = function() {
//     const totalPrice = localStorage.getItem('cartTotal');
//     if (totalPrice) {
//       document.getElementById('rgt').innerText=`$${cartTotal}`
//     }

//   };

// function to load total price from cart page into check Out page
 

function showPrice() {
            const cartTotal = localStorage.getItem('cartTotal');
            if (cartTotal) {
                document.querySelectorAll('#rgt').forEach(el => {
                    el.innerText = `$${cartTotal}`;
                    
                });
                
             }
        }
   
      
          window.onload = function() {
            showPrice();
        };
     

// Pop-up message functionality

document.addEventListener('DOMContentLoaded', () => {
    let closePopUp = document.getElementById("close-btn");
    let msgContainer = document.getElementById("msg_container");
    
    
    if (!sessionStorage.getItem('popupShown')) {
        
        if (msgContainer) {
            msgContainer.style.display = "block";
        }
        
        sessionStorage.setItem('popupShown', 'true');
    } else {
        
        if (msgContainer) {
            msgContainer.style.display = "none";
        }
    }
    
    if (closePopUp && msgContainer) {
        closePopUp.addEventListener('click', () => {
            msgContainer.style.display = "none";
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === msgContainer) {
                msgContainer.style.display = 'none';
            }
        });
    }
});

// coupon link from homepage
// s




    
//     const ProceedToCheckout = document.getElementById('proceed');
//    ProceedToCheckout.addEventListener('click', function(){
//      window.location.href ='checkOut.html'; 
//     console.log("clicked");
       
//   }); // 2nd to last enclosure
  

//   }); //enclose end



 //  event-listener for the checkout button

 Window.onload = function(){
    document.addEventListener('DOMContentLoaded', ()=>{
        const checkOut = document.getElementById('checkout-btn');
        checkOut.addEventListener('click', ()=>{
            console.log('checkedout');
             
        })
    
     });
    
 }
 


//  functionality to validate the checkout form

 const cardNumberInput = document.getElementById('pan-input');
 const cvvInput = document.getElementById('details-input-cvv');
 const expirationInput = document.getElementById('details-input-exp');

    cardNumberInput.onkeydown = function(event) {
        if (isNaN(event.key) && event.key !== 'Backspace') {
            event.preventDefault();
        };
    
     };  

     cvvInput.onkeydown = (e)=>{
        if(isNaN(e.key) && e.key !== "Backspace") {
            e.preventDefault();
        }
     };

     function formatInput(input) {
        
        let value = input.value.replace(/[^0-9]/g, ''); 
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2); 
        }
        
       
        // if (value.length > 7) {
        //     value = value.slice(0, 7);
        // }

        input.value = value;
    }
  

   