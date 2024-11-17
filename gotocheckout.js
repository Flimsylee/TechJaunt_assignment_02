// event-listener for proceed button to load check out page
document.addEventListener("DOMContentLoaded", (event)=>{
    
    window.onload = setupCheckOutButton();
  });
    
    function setupCheckOutButton() {
        const ProceedToCheckout = document.getElementById('proceed');
        
        if (ProceedToCheckout){
            ProceedToCheckout.addEventListener('click', ()=>{
             loadCheckout();
                console.log('clicked');
                localStorage.getItem('cartTotal')
            });
        }
      
        };

    function loadCheckout(){
        const ProceedToCheckout = document.getElementById('proceed');
        if (ProceedToCheckout){
            window.location.href ='checkOut.html'; 
        } else{
            alert('Your cart is empty. Please add items before proceeding to checkout.');
        }
    }