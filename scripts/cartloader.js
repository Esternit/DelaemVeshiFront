function loadCart() {
    fetch('https://crmback-production.up.railway.app/getCart', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ id: window.Telegram.WebApp.initDataUnsafe.user.id })
    })
        .then(response => response.json())
        .then(data => loadHTMLCart(data['data']));
}

function loadHTMLCart(data) {
    const TABLE = document.getElementById("shoppingcart");
    data.forEach(({ id, img, total_price, product_name, size_name, product_id, product_article }) => {
        TABLE.innerHTML += `<div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded" id = "${id}">
        <div class="mr-1"><img class="rounded" src="${img}" width="70"></div>
        <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">${product_name}</span>
            <div class="d-flex flex-row product-desc">
                <div class="size mr-1"><span class="text-grey">Размер:</span><span class="font-weight-bold">&nbsp;${size_name}</span></div>
                <div class="color"><span class="text-grey">Артикул:</span><span class="font-weight-bold">&nbsp;${product_article}</span></div>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center qty">
            <h5 class="text-grey mt-1 mr-1 ml-1"></h5></div>
        <div>
            <h5 class="text-grey">${total_price} руб.</h5>
        </div>
        <div class="d-flex align-items-center" onclick = "deleteitem(${id})"><i class="fa fa-trash mb-1 text-danger"></i></div>
    </div>`
    });
    TABLE.innerHTML += ` <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><input type="text" class="form-control border-0 gift-card" placeholder="Сколько списывать с бонусного счёта?"><button class="btn btn-outline-warning btn-sm ml-2" type="button">Apply</button></div>`
    TABLE.innerHTML += `<div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button class="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button">Proceed to Pay</button></div>`;
}

function deleteitem(id){
    console.log(id);

    const parent = document.getElementById("shoppingcart");
    const child = document.getElementById(id);
    parent.removeChild(child);
    fetch('https://crmback-production.up.railway.app/deleteItem', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ item_id: id, user_id: window.Telegram.WebApp.initDataUnsafe.user.id })
    })
    
}
loadCart();