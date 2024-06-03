var delchn;
var delmos;
var ins;
var comm;
var exchange = 14.2;
var BackButton = window.Telegram.WebApp.BackButton;
BackButton.show();

BackButton.onClick(function () {
    window.location.href = 'index.html';

    BackButton.hide();
});

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;

            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value - restore the previous one
                this.classList.add("input-error");
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                // Rejected value - nothing to restore
                this.value = "";
            }
        });
    });
}

// input filter for phone number
setInputFilter(document.getElementById("yuan-cost"), function (value) {
    return /^$|^[1-9]\d*(\.\d{0,2})?$/.test(value);
});

function recalc() {
    var category = document.getElementById("item-category").options[document.getElementById("item-category").selectedIndex].text
    var price = document.getElementById("yuan-cost").value;

    if(price != "" && category != "") {
        if(category == "Обувь обычная"){
            delchn = 350;
            delmos = 1100;
            ins = 500;
            comm = 1500;
        }
        else if(category == "Обувь зима"){
            delchn = 350;
            delmos = 1300;
            ins = 500;
            comm = 1500;
        }
        else if(category == "Кепки/шапки"){
            delchn = 350;
            delmos = 500;
            ins = 200;
            comm = 700;
        }
        else if(category == "Носки"){
            delchn = 350;
            delmos = 500;
            ins = 200;
            comm = 700;
        }
        else if(category == "Футболки/шорты"){
            delchn = 350;
            delmos = 600;
            ins = 300;
            comm = 800;
        }
        else if(category == "Рубашки"){
            delchn = 350;
            delmos = 600;
            ins = 300;
            comm = 800;
        }
        else if(category == "Худи/свитшоты/штаны"){
            delchn = 350;
            delmos = 800;
            ins = 300;
            comm = 1000;
        }
        else if(category == "Куртки/пуховики"){
            delchn = 350;
            delmos = 1000;
            ins = 400;
            comm = 1500;
        }
        else if(category == "Ветровки"){
            delchn = 350;
            delmos = 600;
            ins = 300;
            comm = 800;
        }
        else if(category == "Рюкзаки"){
            delchn = 350;
            delmos = 800;
            ins = 300;
            comm = 1000;
        }
        else if(category == "Сумки женские"){
            delchn = 350;
            delmos = 600;
            ins = 400;
            comm = 1000;
        }
        else if(category == "Сумки большие"){
            delchn = 350;
            delmos = 800;
            ins = 500;
            comm = 1300;
        }
        else if(category == "Парфюм до 1000 юаней"){
            delchn = 350;
            delmos = 650;
            ins = 400;
            comm = 1000;
        }
        document.getElementById("result").innerHTML = `
        Актуальный курс юаня: ${exchange}<br>
		Доставка по Китаю: ${delchn}₽<br>
		Доставка до Москвы: ${delmos}₽<br>
		Страховка груза: ${ins}₽<br>
		Комиссия за услуги: ${comm}₽<br>`
        document.getElementById("total-sum-number").innerHTML = numberWithSpaces((price * exchange + delchn + delmos + ins + comm).toFixed(0)) + " ₽";
    }
    console.log(category, price);
} 

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function finishcalculation(){
    var price = document.getElementById("yuan-cost").value;
    var category = document.getElementById("item-category").options[document.getElementById("item-category").selectedIndex].text
    if(price != "" && category != "" && delchn != 0 && delmos != 0 && ins != 0 && comm != 0){ 
        fetch('https://crmback-production.up.railway.app/sendMessage', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                sender: "admin",
             userId: window.Telegram.WebApp.initDataUnsafe.user.id, //window.Telegram.WebApp.initDataUnsafe.user.id
             message: " Ваш рассчёт создан и был отправлен. Ожидайте ответа. %0A Категория товара: " + category + " %0A Цена в юанях: " + price + "¥ %0A Финальная сумма рассчёта: " + numberWithSpaces((price * exchange + delchn + delmos + ins + comm).toFixed(0)) + " ₽",
             needtosend: true
             })
        })
        .then(response => response.json())
        .then(data => closing(data));
        
    }

}

function closing(data){
    console.log(data);
    window.Telegram.WebApp.close();
}

