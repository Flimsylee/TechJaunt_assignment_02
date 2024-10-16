const filterToggle = document.querySelector('#filterToggle');
const filterOpts =document.querySelector(".filter-opts");



filterToggle.addEventListener('click', ()=>{
// if(filterOpts.style.display ==="none"){
//     filterOpts.style.display ="block";
// }
// else{
//     filterOpts.style.display ="none";
// };

filterOpts.style.display = filterOpts.style.display === "none" ? "block" :"none";

// alert('yo');
});

// // navigation bar selector

document.addEventListener('DOMContentLoaded', function() {
    const headerContent = document.querySelector(".header__content");
    const showMenuClass = "show-menu";
    const btnOpen = document.getElementById("btn-open-menu");
    const btnClose = document.querySelector(".btn-close-menu");
    
    function toggleMenu() {
        headerContent.classList.toggle(showMenuClass);
        console.log("Menu toggled");
    }
    
    btnOpen.addEventListener('click', toggleMenu);
    btnClose.addEventListener('click', toggleMenu);
});