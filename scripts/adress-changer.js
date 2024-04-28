var current_state = "unsaved";

function changeButton(){
    if(current_state == "unsaved"){
        current_state = "ready to save";
        document.getElementById("save-data-button").disabled = false;
        document.getElementById("save-data-button").style.backgroundColor = "#00E8CD";
    }
    else if(current_state == "changeble"){
        document.getElementById("save-data-button").disabled = false;
        document.getElementById("save-data-button").style.backgroundColor = "#FF7C03";
    }
}

function activateChangeButton(){
    let city=document.getElementById("city-inp").value;
    let street=document.getElementById("street-inp").value;
    let house=document.getElementById("house-inp").value;
    if(city != "" && street != "" && house != ""){
        let address = city + "/" + street + "/" + house;
        fetch('https://crmback-production.up.railway.app/updateUserAdress', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                adress:address,
                 user_id: window.Telegram.WebApp.initDataUnsafe.user.id
                 })
        })
        current_state = "saved";
        document.getElementById("save-data-button").disabled = true;
        document.getElementById("save-data-button").style.backgroundColor = "#D9D9D9";
    }
}

function onLoad() {
    fetch('https://crmback-production.up.railway.app/getUserAdress', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ 
            user_id: window.Telegram.WebApp.initDataUnsafe.user.id
            })
    })
    .then(response => response.json())
    .then(data => {
        loadHTMLAdress(data)

    })
}


function loadHTMLAdress(data){
    console.log(data);
    data = data['data'][0];
    document.getElementById("myaddress-body").innerHTML = `    <div style="width: fit-content; height: 30px;">
    <a href="./personal_cabinet.html" style="height: inherit; text-decoration: none; color: #000000;">
        <img src="./assets/exit_arrow.png" style="height: inherit; object-fit: contain; margin: 24px 0px 0px 15px;">
    </a>
</div>
<span class="page-title">Мой адрес</span>

<span class="page-subtitle">Мой ближайший пункт выдачи заказа (ПВЗ) СДЭК<img width="25px" height="25px"
        src="./assets/address-icon.png"></span>

<div class="main-container">
    <div class="input-desc-container">
        <img width="36px" height="36px" style="margin-left: 25px;" src="./assets/address-icon1.png">
        <span class="input-title">Город</span>
    </div>
    <input class="addr-input" id="city-inp" type="text" placeholder="Введите свой город..."  oninput="changeButton()">

    <div class="input-desc-container">
        <img width="36px" height="36px" style="margin-left: 25px;" src="./assets/address-icon2.png">
        <span class="input-title">Улица</span>
    </div>
    <input class="addr-input" id="street-inp" type="text" placeholder="Введите свою улицу..."  oninput="changeButton()">

    <div class="input-desc-container">
        <img width="36px" height="36px" style="margin-left: 25px;" src="./assets/address-icon3.png">
        <span class="input-title">Дом&nbsp;&nbsp;</span>
    </div>
    <input class="addr-input" id="house-inp" type="text" placeholder="Введите номер дома..."  oninput="changeButton()">
</div>

<button id="save-data-button" type="submit" style="background-color: #D9D9D9;" disabled onclick="activateChangeButton()">Сохранить</button>
<script src="./scripts/adress-changer.js"></script>`
    if(data['adress'].split("/").length == 3){
        document.getElementById("city-inp").value = data['adress'].split("/")[0];
        document.getElementById("street-inp").value = data['adress'].split("/")[1];
        document.getElementById("house-inp").value = data['adress'].split("/")[2];
        document.getElementById("save-data-button").innerText = "Изменить";
        current_state = "changeble";
    }
}
onLoad()