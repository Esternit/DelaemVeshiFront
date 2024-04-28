var current_state = "unsaved";

var BackButton = window.Telegram.WebApp.BackButton;
BackButton.show();

BackButton.onClick(function () {
    window.location.href = 'personal_cabinet.html';

    BackButton.hide();
});


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
            user_id: 735028324
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
    if(data['adress'].split("/").length == 3){
        document.getElementById("city-inp").value = data['adress'].split("/")[0];
        document.getElementById("street-inp").value = data['adress'].split("/")[1];
        document.getElementById("house-inp").value = data['adress'].split("/")[2];
        document.getElementById("save-data-button").innerText = "Изменить";
        current_state = "changeble";
    }
}
onLoad()