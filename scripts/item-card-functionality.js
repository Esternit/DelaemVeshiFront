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

    console.log("called");
    fetch('http://localhost:5000/addToCart', {  //https://crmback-production.up.railway.app
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: item
    })
}