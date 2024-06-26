let tg = window.Telegram.WebApp;
let first_price = 0;
let bonus = 0;
var full_pricing = 0;
var bonus_active = false;
var activate_button = true;
var take_MSK = false;
var standart_adress = "";
var empty = false;
var name_holder = {};
var BackButton = window.Telegram.WebApp.BackButton;

BackButton.show();

BackButton.onClick(function () {
    window.location.href = 'index.html';

    BackButton.hide();
});

tg.expand();

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

var BackButton = window.Telegram.WebApp.BackButton;
BackButton.show();

BackButton.onClick(function () {
    window.location.href = 'index.html';

    BackButton.hide();
});

function loadCart() {
    var itemsinfo = JSON.parse(localStorage.getItem('itemsinfo'));
    console.log(itemsinfo, "-item output");
    for(let i = 0; i < itemsinfo.length; i++){
        if(typeof itemsinfo[i] == "string"){
            itemsinfo[i] = JSON.parse(itemsinfo[i]);
        }
        
    }
    var adressinfo = JSON.parse(localStorage.getItem('adress'));
    if(itemsinfo){
        console.log("speed load");
        loadHTMLCart(itemsinfo.concat(adressinfo));
    }
    else{
        fetch('https://crmback-production.up.railway.app/getCart', { //https://crmback-production.up.railway.app
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ id: window.Telegram.WebApp.initDataUnsafe.user.id}) //window.Telegram.WebApp.initDataUnsafe.user.id
    })
        .then(response => response.json())
        .then(data => loadHTMLCart(data));
    }

}

function loadHTMLCart(data) {
    let user = data[data.length - 1];
    data = data.slice(0, data.length - 1);
    let full_price = 0;
    let info = {};
    const TABLE = document.getElementById("cart-item-container");
    if(user.adress == "Не указан"){
        activate_button = false;
    }
    else{
        document.getElementById("delivery-address").value=user.adress;
        standart_adress = user.adress;
    }
    if(user.phone_number == "Не указан"){
        activate_button = false;
    }
    else{
        document.getElementById("phone-number").value=user.phone_number;
    }
    if(user.FIO == "Не указан"){
        activate_button = false;
    }
    else{
        document.getElementById("name-surname").value=user.FIO;
    }
    if(data.length == 0){
        empty = true;
        activate_button = false;
    }
    
    data.forEach(({ id, img, total_price, product_name, size_name, product_id, product_article }) => {
        if(info[product_id + size_name]){
            info[product_id + size_name] = info[product_id + size_name] + 1;
            var element = document.getElementById(product_id + size_name);
            TABLE.removeChild(element);
        }
        else{
            info[product_id + size_name] = 1
        }
        
        TABLE.innerHTML += `<div class="cart-item" id = "${product_id + size_name}">
        <div class="cart-item-image">
            <img id="cart-item-img-src" src="${img}">
        </div>
        <div class="cart-item-description">
            <span class="cart-item-name">${product_name}</span>
            <span class="cart-item-size">${size_name} EU</span>
            <div class="cart-item-subcont">
                <span class="cart-item-price">${numberWithSpaces(total_price)} ₽</span>
                <div class="cart-item-counter" id="counter${product_id + size_name}">
                    <span class="counter-button" id="decrease-items" onclick = "deleteitem(${id},${product_id},'${size_name}',${total_price})">-</span>
                    <span class="counter-number" id="item-counter${product_id }${size_name}">${info[product_id + size_name]}</span>
                    <span class="counter-button" id="increase-items" onclick="adder('${img}',${total_price},'${size_name}',${product_id},'${product_article}')">+</span>
                </div>
            </div>
        </div>
    </div>`
    name_holder[product_id] = product_name;
        full_price += total_price;
    });
    if (data.length > 0) {
        first_price = full_price;
        document.getElementById("bonuses-data").innerHTML = `<span style="display: inline-flex;align-items: center;">Потратить</span>
		<input class="charge-amount" max = "${user.bonuses}"  type="tel" id="bonus" onKeyUp="calculatePrice(${user.bonuses})"></input>
		<div class="bonuses-currency">₽</div>
		<label class="charge-switch">
			<input type="checkbox">
			<span class="slider round" onclick = "changeBonus()"></span>
		</label>`
        document.getElementById("full-price").innerHTML=`<span class="block-title" style="display: inline-block; width: 100%;">Итог:</span>
		<span id="total-price">${numberWithSpaces(full_price)} ₽</span>`
        full_pricing = full_price;
        //TABLE.innerHTML += ` <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><input type="number"  onKeyUp="calculatePrice(${user.bonuses})" class="form-control border-0 gift-card" placeholder="(доступно ${user.bonuses} руб.)" id = "bonus"></div>`;
        //TABLE.innerHTML += `<div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button class="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button" id = "proceed" onclick = "proceedPayment()">Перейти к оплате (${full_price} руб)</button></div>`;
    }
    else {
        TABLE.innerHTML = `<span style="display: block; margin-top: 1rem; text-align: center; font-family: 'Inter', sans-serif; font-weight: 400; font-size: 20px;">Пока здесь ничего нет...</span>`
    }

    if(activate_button){
        activator();
    }
}

function deleteFormLocalItems(pid,sizen){
    var items = JSON.parse(localStorage.getItem('itemsinfo'));
    for (let i = 0; i < items.length; i++) {
        items[i] = JSON.parse(items[i]);
        if (items[i].id == pid && items[i].size_name == sizen) {
            items.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('itemsinfo', JSON.stringify(items));
    console.log(localStorage.getItem('itemsinfo'));
}
function deleteitem(id, pid,sizen,price) {
    first_price = first_price - price;
    fetch('https://crmback-production.up.railway.app/deleteItem', { //https://crmback-production.up.railway.app
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ product_id: pid, user_id: window.Telegram.WebApp.initDataUnsafe.user.id, size_name: sizen })
    })
    console.log(document.getElementById("item-counter" + pid+sizen).textContent);
    if(document.getElementById("item-counter" + pid+sizen).textContent > 1){
        document.getElementById("item-counter" + pid+sizen).textContent = document.getElementById("item-counter" + pid+sizen).textContent - 1;
    }
    else{
        const TABLE = document.getElementById("cart-item-container");
        TABLE.removeChild(document.getElementById(""+pid+sizen));
    }
    document.getElementById("total-price").textContent = `${numberWithSpaces(full_pricing - price)} ₽`;
    full_pricing = full_pricing - price;
    var items = localStorage.getItem('items');
    localStorage.removeItem("items");
    items = parseInt(items);
    localStorage.setItem('items', items - 1);
    deleteFormLocalItems(pid,sizen);
}

function calculatePrice(bon) {
    
        let val = document.querySelector("#bonus").value;
        if (val > bon) {
            val = bon;
            document.querySelector("#bonus").value = bon;
        }
        if(bonus_active){
            let value = first_price - val;
            full_pricing = value;
        
            document.getElementById("total-price").textContent = `${numberWithSpaces(value)} ₽`;
            bonus = val;
            if(bonus == ""){
                bonus = 0;
            }
        }
        console.log(bonus);
        

    


}

function changeBonus() {
    bonus_active = !bonus_active;
    if(bonus_active){
        calculatePrice(document.querySelector("#bonus").value);
    }
    else{
        bonus = 0;
        document.getElementById("total-price").textContent = `${numberWithSpaces(first_price)} ₽`;
        full_pricing = first_price;
    }
}
function proceedPayment() {
    localStorage.setItem('items', 0);
    fetch('https://crmback-production.up.railway.app/createOrder', { //https://crmback-production.up.railway.app
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ id: window.Telegram.WebApp.initDataUnsafe.user.id, bonus_used: bonus, adress: document.getElementById("delivery-address").value, phone: document.getElementById("phone-number").value, name: document.getElementById("name-surname").value }) //window.Telegram.WebApp.initDataUnsafe.user.id
    })
    .then(response => {
        window.location.href = "index.html";;
        
    })
    .catch(function(err) {
        console.info(err + " url: " + url);
    });
    document.getElementById("cart").innerHTML = `<svg viewBox="25 25 50 50">
    <circle r="20" cy="50" cx="50"></circle>
</svg>`
    setTimeout(redirecter, 5000);
}
loadCart();

function activator(){
    if(activate_button){
        document.getElementById("pay-button").disabled = false;
        document.getElementById("pay-button").style.backgroundColor = "#00E8CD";
    }
    else{
        document.getElementById("pay-button").disabled = true;
        document.getElementById("pay-button").style.backgroundColor = "#D9D9D9";
    }

}

function checkChange(){

    standart_adress = document.getElementById("delivery-address").value;
    if(document.getElementById("delivery-address").value == "" || document.getElementById("phone-number").value == "" || document.getElementById("name-surname").value == ""){
        activate_button = false;
        activator()
    }
    else{
        activate_button = true;
        if(empty == false){
            activator()
        }
        
    }
    document.activeElement.blur();
}

function redirecter(){
    window.location.href="index.html";
}

function adder(img, total_price,  size_name, product_id, product_article){
    first_price = first_price + total_price;
    var items = localStorage.getItem('items');
    localStorage.removeItem("items");
    items = parseInt(items);
    localStorage.setItem('items', items + 1);
    document.getElementById("total-price").textContent = `${numberWithSpaces(full_pricing + total_price)} ₽`;
    full_pricing = full_pricing + total_price;
    item = JSON.stringify({
        title: name_holder[product_id],
        pricing: total_price,
        size_name: size_name,
        total_price: total_price,
        product_name: name_holder[product_id],
        product_id: product_id,
        product_article: product_article,
        id: product_id,
        img: img,
        article: product_article,
        user_id: window.Telegram.WebApp.initDataUnsafe.user.id,
        store: "DelaemVeshi"
    });
    var itemsinfo = JSON.parse(localStorage.getItem('itemsinfo'));
    // itemsinfo = [itemsinfo];
    console.log("adder", itemsinfo, typeof itemsinfo, itemsinfo.length);
    itemsinfo.push(item);
    localStorage.setItem('itemsinfo', JSON.stringify(itemsinfo));
    console.log(JSON.parse(localStorage.getItem('itemsinfo')))
    document.getElementById("item-counter" + product_id+size_name).textContent = parseInt(document.getElementById("item-counter" + product_id+size_name).textContent,10) + 1;
    fetch('https://crmback-production.up.railway.app/addToCart', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: item
    })
}
