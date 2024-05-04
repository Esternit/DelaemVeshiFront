function loadHeader(){
    const bonus = localStorage.getItem('bonus');
    const items = localStorage.getItem('items');

    if(!bonus || !items){
        fetch('https://crmback-production.up.railway.app/getUserBaseInfo', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ user_id: window.Telegram.WebApp.initDataUnsafe.user.id })
        })
            .then(response => response.json())
            .then(data => {
                loadHeaderHTML(data['data']);
            });
    }
    else{
        console.log("speed variant");
        if(document.getElementById("personal-balance-badge")){
            document.getElementById("personal-balance-badge").innerText = `+${bonus}₽`;
        }
        document.getElementById("cart-item-amount-badge").innerText = `${items}`;
        
    }


}
loadHeader();
function loadHeaderHTML(data){
    console.log(data);
    if(document.getElementById("personal-balance-badge")){
        document.getElementById("personal-balance-badge").innerText = `+${data["bonus"][0]["bonus_adds_owner"]}₽`;
    }
    
    document.getElementById("cart-item-amount-badge").innerText = `${data["base"][0]["COUNT(*)"]}`;
    localStorage.setItem('bonus', data["bonus"][0]["bonus_adds_owner"]);
    localStorage.setItem('items', data["base"][0]["COUNT(*)"]);
}

function loadOneHeader(){
    document.getElementById("cart-item-amount-badge").innerText = `${items}`;
}

function checkHeader(){
    fetch('https://crmback-production.up.railway.app/getUserBaseInfo', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ user_id: window.Telegram.WebApp.initDataUnsafe.user.id })
    })
        .then(response => response.json())
        .then(data => {
            checkDATA(data['data']);
        });
}


function checkDATA(data){
    var bonus = localStorage.getItem('bonus');
    var items = localStorage.getItem('items');

    if(data["bonus"][0]["bonus_adds_owner"] != bonus || data["base"][0]["COUNT(*)"] != items){
        localStorage.setItem('bonus', data["bonus"][0]["bonus_adds_owner"]);
        localStorage.setItem('items', data["base"][0]["COUNT(*)"]);
        console.log("test failed", data["base"][0]["COUNT(*)"], items)
        loadHeaderHTML(data);
    }
}

checkHeader();