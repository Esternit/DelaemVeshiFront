function addItemToCart(id) {
    var popup = document.getElementById("cart-popup");
    popup.style.transform = "translateY(0%)";

    var cart = document.getElementById("cart-container");
    cart.style.opacity = "0";

    setTimeout(function() {
        cart.style.visibility = "hidden";
    }, 500);

    setTimeout(function() {
        popup.style.transform = "translateY(-100%)";
        cart.style.visibility = "visible";
        cart.style.opacity = "1";
    }, 15000);
}