let tg = window.Telegram.WebApp;

tg.expand();

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function containsNumber(str) {
    return str.match(/\d+/) !== null;
  }
tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

if (tg.MainButton.isVisible) {
    tg.MainButton.hide();
}

let item = {};
var BackButton = window.Telegram.WebApp.BackButton;
BackButton.show();
BackButton.onClick(function () {
    const Id = new URLSearchParams(window.location.search).get('id');
    const paging = new URLSearchParams(window.location.search).get('page');
    const sh = new URLSearchParams(window.location.search).get('search');
    let minprice = new URLSearchParams(window.location.search).get('minprice');
    let maxprice = new URLSearchParams(window.location.search).get('maxprice');
    let selectedBrand = new URLSearchParams(window.location.search).get('brand');
    let selectedActivity = new URLSearchParams(window.location.search).get('activity');
    let selectedSize = new URLSearchParams(window.location.search).get('size');
    if (sh != null) {
        window.location.href = 'search.html?page=' + paging + "&spuds=" + Id + "&search=" + sh;
    }    
    else if(minprice != null && maxprice != null && selectedBrand != null && selectedActivity != null && selectedSize != null){
        window.location.href =`filters_result.html?minprice=${minprice}&maxprice=${maxprice}&brand=${selectedBrand}&activity=${selectedActivity}&size=${selectedSize}&page=${paging}&spuds=${Id}`
    }
    else {
        doning = 1;
        window.location.href = 'index.html?page=' + paging + "&spuds=" + Id;
    }

    BackButton.hide();
    tg.MainButton.hide();
});

document.addEventListener('DOMContentLoaded', function () {
    const Id = new URLSearchParams(window.location.search).get('id');
    fetch('https://rmstoreapi-production.up.railway.app/getById', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ productId: Id, store: "DVesshi" })
    })
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});

function loadHTMLTable(data) {
    document.getElementById('full-body').innerHTML = ` <div id="cart-popup">
    <span>Добавлено в корзину</span>
    <br>
    <span style="padding: 0px 1.4em; background-color: #FFFFFF; border-radius: 5px;" onclick = "openCart()">Оформить заказ</span>
</div>

<div id="item-picture-container">
    <!--<button onclick="test()">pick</button> -->
    <div class="pre-search-link-cont" id="cart-container">
        <a href="./cart.html">
            <img class="header-logo-image" src="./assets/cart_image.png">
            <div id="cart-item-amount-badge">0</div>
        </a>
    </div>

    <div id="usercard">
        <div class="loader"></div>
    </div>
    <p id="naming"></p>
</div>

<div class="pricing-container">
    <div class="sizes" id="sizing">

    </div>
    <div class="sizes" id="sizing2">

    </div>
</div>

<button class="poizon-item-link" id="add-to-cart" type="button" onclick="addItemToCart(this.id)">В корзину</button>

<div class="item-info-container">
    <p class="item-info-title">Доставка</p>
    <p class="item-info">С момента отправки вашего заказа из Китая, приблизительные сроки доставки - 3* недели. (*Товар может приехать
        как быстрее, так и в редких случаях чуть задержаться, в зависимости от быстроты прохождения таможни и погодных условий)</p>
</div>

<script src="scripts/tg-connect.js"></script>
<script src="scripts/item-card-functionality.js"></script>`;
    const outData = data['base'];
    const innerData = data['sizes']
    let html = `
    <div id="itemCarousel" class="carousel slide" data-ride="carousel" data-interval="3000">
        <div class="carousel-control-prev" href="#itemCarousel" role="button" data-slide="prev"></div>
        <div class="carousel-inner">
    `+ fillCarousel(data) + `
        </div>
        <div class="carousel-control-next" href="#itemCarousel" role="button" data-slide="next"></div>
    </div>
    `;
    const ROOT_SIZIING = document.getElementById('sizing');
    const ROOT_SIZIING2 = document.getElementById('sizing2');
    const ROOT_PRODUCTS = document.getElementById('usercard');
    let countsizes=0;

    innerData.forEach(({ name_size, price }) => {
        countsizes++;
        let inner = document.createElement('div');
        inner.className = 'size';
        if(containsNumber(name_size)){
            inner.innerHTML = ` <span class="size-sizing">EU ${name_size}</span><br><span class="size-price">${numberWithSpaces(price)} ₽</span>`;
        }
        else{
            inner.innerHTML = ` <span class="size-sizing">${name_size}</span><br><span class="size-price">${numberWithSpaces(price)} ₽</span>`;
        }
        // inner.innerHTML = ` <span class="size-sizing">EU ${name_size}</span><br><span class="size-price">${numberWithSpaces(price)} ₽</span>`;
        inner.addEventListener("click", function () {
            // replacing price

            // showing purchase button
            item = JSON.stringify({
                title: outData[0]["title"],
                pricing: price,
                total_price: price,
                product_name: outData[0]["title"],
                product_id: outData[0]["spuId"],
                product_article: outData[0]["article"],
                size_name: name_size,
                id: outData[0]["spuId"],
                img: outData[0]["img"],
                article: outData[0]["article"],
                user_id: window.Telegram.WebApp.initDataUnsafe.user.id, //window.Telegram.WebApp.initDataUnsafe.user.id
                store: "DelaemVeshi"
            });
            console.log(item);
        })
        if(countsizes > 8){
            ROOT_SIZIING2.appendChild(inner);
        }
        else{
            ROOT_SIZIING.appendChild(inner);
        }
    });


    ROOT_PRODUCTS.innerHTML = html;
    const ROOT_NAME = document.getElementById('naming');
    ROOT_NAME.innerText = outData[0]["title"];

    enableCarouselSwiping();
    loadHeader();
}

function fillCarousel(data) {
    let carouselItems = `
        <div class="carousel-item active">
            <img src="${data['base'][0]["img"]}" class="image">
        </div>
    `;

    for (let i = 0; i < data["images"].length; i++) {
        carouselItems += `
        <div class="carousel-item">
            <img src="${data["images"][i].image}" alt="" class="d-block image">
        </div>
        `;
    }

    return carouselItems;
}

function enableCarouselSwiping() {
    const itmCar = document.querySelector("#itemCarousel");
    itmCar.addEventListener('touchstart', moveSlideByTouch);
}

function moveSlideByTouch(event) {
    const xClick = event.touches[0].pageX;
    console.log($(".carousel"));

    $(".carousel").one('touchmove', function (event) {
        const xMove = event.originalEvent.touches[0].pageX;
        const sensitivityInPx = 5;

        if (Math.floor(xClick - xMove) > sensitivityInPx) {
            $(".carousel").find(".carousel-control-next").click();
        } else if (Math.floor(xClick - xMove) < -sensitivityInPx) {
            $(".carousel").find(".carousel-control-prev").click();
        }
    });

    $(".carousel").on('touchend', function () {
        $(".carousel").off('touchmove');
    });
}


function addItemToCart(id) {
    var items = localStorage.getItem('items');
    localStorage.removeItem("items");
    items = parseInt(items);
    localStorage.setItem('items', items + 1);
    document.getElementById("cart-item-amount-badge").innerText = `${localStorage.getItem('items')}`;
    fetch('https://crmback-production.up.railway.app/addToCart', {  //https://crmback-production.up.railway.app
    headers: {
        'Content-type': 'application/json'
    },
    method: 'POST',
    body: item
})
    var itemsinfo = JSON.parse(localStorage.getItem('itemsinfo'));
    
    console.log("first",itemsinfo);
    if(!itemsinfo){
        itemsinfo = [item];
        localStorage.removeItem("itemsinfo");
        localStorage.setItem('itemsinfo', JSON.stringify(itemsinfo));
    }
    else{
        
        itemsinfo.push(item);
        localStorage.setItem('itemsinfo', JSON.stringify(itemsinfo));
    }

    console.log(localStorage.getItem('itemsinfo'));
    
    var popup = document.getElementById("cart-popup");
    popup.style.transform = "translateY(0%)";

    var cart = document.getElementById("cart-container");
    cart.style.opacity = "0";
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(function () {
        cart.style.visibility = "hidden";
    }, 500);

    setTimeout(function () {
        popup.style.transform = "translateY(-100%)";
        cart.style.visibility = "visible";
        cart.style.opacity = "1";
    }, 15000);
    setTimeout(function () {
        cart.style.visibility = "hidden";
    }.bind(this), 500);

    setTimeout(function () {
        popup.style.transform = "translateY(-100%)";
        cart.style.visibility = "visible";
        cart.style.opacity = "1";
    }.bind(this), 15000);
    
}

// function test() {
//     console.log(item);


//     const Id = new URLSearchParams(window.location.search).get('id');
//     const paging = new URLSearchParams(window.location.search).get('page');
//     const sh = new URLSearchParams(window.location.search).get('search');
//     let minprice = new URLSearchParams(window.location.search).get('minprice');
//     let maxprice = new URLSearchParams(window.location.search).get('maxprice');
//     let selectedBrand = new URLSearchParams(window.location.search).get('brand');
//     let selectedActivity = new URLSearchParams(window.location.search).get('activity');
//     let selectedSize = new URLSearchParams(window.location.search).get('size');
//     if (sh != null) {
//         window.location.href = 'search.html?page=' + paging + "&spuds=" + Id + "&search=" + sh;
//     }
//     else if(minprice != null && maxprice != null && selectedBrand != null && selectedActivity != null && selectedSize != null){
//         window.location.href =`filters_result.html?minprice=${minprice}&maxprice=${maxprice}&brand=${selectedBrand}&activity=${selectedActivity}&size=${selectedSize}&page=${paging}&spuds=${Id}`
//     }
//     else {
//         doning = 1;
//         window.location.href = 'index.html?page=' + paging + "&spuds=" + Id;
//     }

//     BackButton.hide();
//     tg.MainButton.hide();


// }

function backfunc() {
    const Id = new URLSearchParams(window.location.search).get('id');
    const paging = new URLSearchParams(window.location.search).get('page');
    const sh = new URLSearchParams(window.location.search).get('search');
    if (sh != null) {
        window.location.href = 'search.html?page=' + paging + "&spuds=" + Id + "&search=" + sh;
    }
    else {
        doning = 1;
        window.location.href = 'index.html?page=' + paging + "&spuds=" + Id;
    }

}

function poizonOpener() {
    const Id = new URLSearchParams(window.location.search).get('id');
    let link = "https://m.dewu.com/router/product/ProductDetail?spuId=" + Id + "&sourceName=shareDetail&skuId=&fromUserId=048b9570ac482c65b6de33c0f386c0da&share_platform_title=7&outside_channel_type=0"
    tg.openLink(link);
    console.log("opened");
}

function testfunc() {
    const Id = new URLSearchParams(window.location.search).get('id');
    const paging = new URLSearchParams(window.location.search).get('page');
    const sh = new URLSearchParams(window.location.search).get('search');
    if (sh != null) {
        window.location.href = 'search.html?page=' + paging + "&spuds=" + Id + "&search=" + sh;
    }
    else {
        doning = 1;
        window.location.href = 'search.html?page=' + paging + "&spuds=" + Id;
    }

    BackButton.hide();
    tg.MainButton.hide();
}


function openCart(){
    window.location.href = "cart.html";
}


// function loadHeader(){

//     fetch('https://crmback-production.up.railway.app/getUserBaseInfo', {
//         headers: {
//             'Content-type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({ user_id: window.Telegram.WebApp.initDataUnsafe.user.id  })
//     })
//         .then(response => response.json())
//         .then(data => {
//             loadHeaderHTML(data['data']);
//         });
// }
// //setTimeout(loadHeader,2200);
// function loadHeaderHTML(data){
//     console.log(data);
//     //document.getElementById("personal-balance-badge").innerText = `+${data["bonus"][0]["bonus_adds_owner"]}₽`;
//     document.getElementById("cart-item-amount-badge").innerText = `${data["base"][0]["COUNT(*)"]}`;
// }