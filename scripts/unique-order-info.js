var BackButton = window.Telegram.WebApp.BackButton;
BackButton.show();

BackButton.onClick(function () {
    window.location.href = 'orders.html';

    BackButton.hide();
});

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


function loader(){

    var params = new URLSearchParams(window.location.search).get("order_id");
    console.log(params);
    fetch('https://crmback-production.up.railway.app/getUserUniqueOrder', { //https://crmback-production.up.railway.app
    headers: {
        'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ 
        user_id: 735028324,
        order_id: params
    }) //window.Telegram.WebApp.initDataUnsafe.user.id
})
    .then(response => response.json())
    .then(data => loadHTMLorder(data));
}

function loadHTMLorder(data){

    console.log(data);
    data=data["data"];
    let order = data["base"][0];
    let items = data["items"];
    let status = order["status"];
    var statushtml = ``;
    let date = order["date"];

    let d = date.split(" ");
    let mgy = d[0].split("/");
    let mh = d[1].split(":");
    let hours = mh[0];
    let minutes = mh[1];

    var status_text = "";
    if(status == "Новый"){
        status_text = "Новый заказ. Ожидает оплаты";
    }
    else if(status == "Оплачен, выкупается"){
        status_text = "Производим покупку товаров на платформе Poizon";
    }
    else if(status == "Доставляется на склад в Китае"){
        status_text = "Заказ направляется на наш склад в Китае"
    }
    else if(status == "Доставляется в Москву"){
        status_text = "Заказ направляется из Китая в Москву"
    }
    else if(status == "Доставлен"){
        status_text = "Заказ доставлен";
    }


    let monthnum = mgy[1];
    let datenum = mgy[2];
    let yearnum = mgy[0];
    var temp = new Date(`${yearnum}-${monthnum}-${datenum}`);
    monthnum = temp.toLocaleString('default', { month: 'long' });

    if(status == "Новый"){
        statushtml = `<ul id="progressbar" class="text-center">
        <li class="step1"></li>
        <li class="step2"></li>
        <li class="step3"></li>
        <li class="step4"></li>
    </ul>`
    }
    else if(status == "Оплачен, выкупается"){
        statushtml = `<ul id="progressbar" class="text-center">
        <li class="active step1"></li>
        <li class="step2"></li>
        <li class="step3"></li>
        <li class="step4"></li>
    </ul>`
    }
    else if(status == "Доставляется на склад в Китае"){
        statushtml = `<ul id="progressbar" class="text-center">
        <li class="active step1"></li>
        <li class="active step2"></li>
        <li class="step3"></li>
        <li class="step4"></li>
    </ul>`
    }
    else if(status == "Доставлен"){
        statushtml = `<ul id="progressbar" class="text-center">
        <li class="active step1"></li>
        <li class="active step2"></li>
        <li class="active step3"></li>
        <li class="active step4"></li>
    </ul>`
    }

    var itemshtml=``;
    items.forEach(({status, status_color, whole_price, size_name, product_name, img}) => {
        itemshtml += `<ul>
        <li>
            <img class="list-bullet" id="same-number" width="15px" height="15px" src="./assets/list_bullet.png" />
            <div class="order-item-container">
                <div class="order-item-details-container">
                    <span class="order-item-title">${product_name}</span>
                    <span class="order-item-size">${size_name} EU</span>
                    <span class="order-item-price">${numberWithSpaces(whole_price)} ₽</span>
                    <div class="status-badge" style="background-color: ${status_color};">
                        <span class="status-badge-text">${status}</span>
                    </div>
                </div>
                <img class="order-item-picture"
                    src="${img}">
            </div>
        </li>
    </ul>`
    })
    document.getElementById("order-table").innerHTML = `<div style="width: fit-content; height: 30px;">

    </div>

    <span class="page-title">Заказ #${order["order_id"]}</span>
    <span id="order-time">${datenum} ${monthnum} ${hours}:${minutes}</span>

    <div class="order-container">
        <div class="order-overview-container">

            ${statushtml}

            <span id="order-progress-text">${status_text}</span>
        </div>
    </div>

    <div class="order-contents">
        <span class="order-contents-title">Состав</span>
        <div class="order-contents-data">
            <div id="order-items">
                ${itemshtml}
            </div>
        </div>
    </div>

    <div class="order-conclusion">
        <span class="order-contents-title">Итог:</span>
        <br>
        <span class="order-total-sum">${numberWithSpaces(order["user_price"])} ₽</span>
    </div>
    <script src="./scripts/unique-order-info.js"></script>`
}


loader();