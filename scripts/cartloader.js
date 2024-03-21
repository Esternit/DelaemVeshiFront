let tg = window.Telegram.WebApp;
let first_price = 0;
let bonus = 0;
tg.expand();

var BackButton = window.Telegram.WebApp.BackButton;
BackButton.show();

BackButton.onClick(function () {
    window.location.href = 'index.html';

    BackButton.hide();
});

function loadCart() {
    fetch('https://crmback-production.up.railway.app/getCart', { //https://crmback-production.up.railway.app
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ id: window.Telegram.WebApp.initDataUnsafe.user.id }) //window.Telegram.WebApp.initDataUnsafe.user.id
    })
        .then(response => response.json())
        .then(data => loadHTMLCart(data));
}

function loadHTMLCart(data) {
    let user = data[data.length-1];
    data = data.slice(0,data.length-1);
    console.log(user);
    let full_price = 0;
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
    full_price += total_price;
    });
    if(data.length > 0){
        first_price = full_price;
        TABLE.innerHTML += ` <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><input type="number"  onKeyUp="calculatePrice(${user.bonuses})" class="form-control border-0 gift-card" placeholder="(доступно ${user.bonuses} руб.)" id = "bonus"></div>`;
        TABLE.innerHTML += `<div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button class="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button" id = "proceed" onclick = "proceedPayment()">Перейти к оплате (${full_price} руб)</button></div>`;
    }
    else{
        TABLE.innerHTML += `<h4>Пока здесь ничего нет...</h4>`
    }
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

function calculatePrice(bon){
    let val = document.querySelector("#bonus").value;
    console.log(val);
    if (val > bon){
        val = bon;
        document.querySelector("#bonus").value = bon;
    }
    let buttonText = document.getElementById("proceed").firstChild.data;
    buttonText = buttonText.split(" ");
    let value = first_price - val;
    bonus = val;
    buttonText[3] = "("+value.toString();
    document.getElementById("proceed").firstChild.data = buttonText.join(" ");
    console.log(buttonText);

    
}

function proceedPayment(){
    fetch('https://crmback-production.up.railway.app/createOrder', { //https://crmback-production.up.railway.app
    headers: {
        'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ id: window.Telegram.WebApp.initDataUnsafe.user.id, bonus_used: bonus }) //window.Telegram.WebApp.initDataUnsafe.user.id
})
}
loadCart();