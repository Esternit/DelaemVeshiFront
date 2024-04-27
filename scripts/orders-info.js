var BackButton = window.Telegram.WebApp.BackButton;
BackButton.show();

BackButton.onClick(function () {
    window.location.href = 'personal_cabinet.html';

    BackButton.hide();
});

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const filterCombiner = (d, filterArray) => {
    for (let fn of filterArray) {
      if (!fn(d)) {
        return false;
      }
    }
    return true;
  }
  

function loadOrders() {
    fetch('https://crmback-production.up.railway.app/getUserOrders', { //https://crmback-production.up.railway.app
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ user_id: 735028324 }) //window.Telegram.WebApp.initDataUnsafe.user.id
    })
        .then(response => response.json())
        .then(data => loadHTMLOrders(data));
}


function loadHTMLOrders(data) {
    console.log(data);
    data=data["data"];
    var TABLE = document.getElementById("orders-table");
    var orders = data["orders"];
    var items = data["items"];
    var lastorders = ``;
    var firstorders = ``;


    orders.forEach(({ order_id, status, date, user_price, status_color }) => {
        const filter = [
            d => d.order_id == order_id,
          ];
        const arr1 = items.filter(d => filterCombiner(d, filter));
        var temphtml = `<div class="order-overview-images">`;
        for(var i = 0; i < arr1.length; i++) {
            temphtml += `<img class="order-image" src="${arr1[i]["img"]}">`
        }
        temphtml += `</div>`;
        let check = true;
        if(status == "Доставлен"){
            let datecheck = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
            let Difference_In_Time =datecheck.getTime() - temp.getTime();
            let Difference_In_Days =Math.round(Difference_In_Time / (1000 * 3600 * 24));
            if(parseInt(Difference_In_Days,10) > 3){
                check = false;
            }
            
        }
        let d = date.split(" ");
        let mgy = d[0].split("/");
        let mh = d[1].split(":");
        let hours = mh[0];
        let minutes = mh[1];
        if(parseInt(minutes,10) < 10){
            minutes = '0' + minutes;
        }
        let monthnum = mgy[1];
        let datenum = mgy[2];
        let yearnum = mgy[0];
        var temp = new Date(`${yearnum}-${monthnum}-${datenum}`);
        monthnum = temp.toLocaleString('default', { month: 'long' });
        if(status != "Отменён" && check){ 


            var statushtml;
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


            firstorders = `<div class="order-container"><a href="./order.html?order_id=${order_id}">
            <div class="order-overview-container">
                <div class="order-overview-text">
                    <span id="order-id">#${order_id}</span>
                    <span id="order-cost">${numberWithSpaces(user_price)}₽</span>
                    <span id="order-time">${datenum} ${monthnum} ${hours}:${minutes}</span>
                </div>

                ${temphtml}

                <!-- add class 'active' to progress -->
                <!-- add class 'cancel' to show cancel icon -->
                ${statushtml}

                <span id="order-progress-text">${status}</span>
            </div>
        </a>
        </div>` + firstorders;
        }
        else{
            lastorders += `<div class="order-container">
            <a href="#">
                <div class="order-overview-container">
                    <div class="order-overview-text">
                        <span id="order-id">#${order_id}</span>
                        <span id="order-cost">${numberWithSpaces(user_price)}₽</span>
                        <span id="order-time">${datenum} ${monthnum} ${hours}:${minutes}</span>
                        <span id="order-delivered" style="background-color: ${status_color};">${status}</span>
                    </div>
    
                    ${temphtml}
                </div>
            </a>
        </div>`
        console.log(lastorders);
        }
    
    });
    TABLE.innerHTML += firstorders;
    TABLE.innerHTML += lastorders;
}

loadOrders();