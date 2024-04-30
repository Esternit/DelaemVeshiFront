function addItemToCart(id) {
    var popup = document.getElementById("cart-popup");
    popup.style.transform = "translateY(0%)";

    var cart = document.getElementById("cart-container");
    cart.style.opacity = "0";
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(function () {
        cart.style.visibility = "hidden";
    }, 500);

    setTimeout(function () {
        popup.style.transform = "translateY(-100%)";
        cart.style.visibility = "visible";
        cart.style.opacity = "1";
    }, 15000);
}

jQuery(document).ready(function () {
    $("#sizing").delegate(".size", "click", function (event) {
        console.log("before toggle");
        jQuery('.size').removeClass('active');
        jQuery(this).toggleClass('active');
    });

    $("#sizing2").delegate(".size", "click", function (event) {
        console.log("before toggle");
        jQuery('.size').removeClass('active');
        jQuery(this).toggleClass('active');
    });
});

console.log("called");
fetch('https://crmback-production.up.railway.app/addToCart', {  //https://crmback-production.up.railway.app
    headers: {
        'Content-type': 'application/json'
    },
    method: 'POST',
    body: item
});
