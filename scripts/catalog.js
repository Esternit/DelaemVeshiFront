let limit = 10;
let page = 1;
let scrollneed = 0;
let search = 0;
let searchValue = "";
let tg = window.Telegram.WebApp;
let doning = 0;
let doningsearch = 0;
let timescalled = 0;
var BackButton = window.Telegram.WebApp.BackButton;
BackButton.onClick(function () {
    window.location.href = 'index.html';

    BackButton.hide();
    tgk.MainButton.hide();
});

tg.expand();
tg.MainButton.hide();
console.log("info");

function resetsearch() {
    search = 1;
    timescalled++;
    searchValue = new URLSearchParams(window.location.search).get("search");
    page = new URLSearchParams(window.location.search).get("page");
    scrollneed = 1;
    fetch('https://rmstoreapi-production.up.railway.app/searchDataFromStart/' + searchValue, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ limiter: limit, paging: page, store: "RM" })
    })
        .then(response => response.json())
        .then(data => loadSearchHTMLTable(data['data']));
}


function loadSearchHTMLTable(data) {
    const ROOT_PRODUCTS = document.getElementById('listing');
    if (data.length > 0) {
        let catalog = '';
        searchValue = document.querySelector('#search-input').value;
        data.forEach(({ img, title, start_price, spuId }) => {
            catalog += `

            <a class="product-card" id="${spuId}" href="detail.html?id=${spuId}&page=${page}&search=${searchValue}" onclick="getPage()">
                <div class="item">
                    <img src="${img}" alt="" class="img">
                </div>
                <div class="itemname">${title}</div>
                <div class="price">${start_price} ₽</div>
                <div class="btn">Заказать</div>
            </a>
            `;
            /* ₽ */
        });
        const html = `
        <div class="inner">
            ${catalog}
        </div>
        `;
        if (page == 1) {
            ROOT_PRODUCTS.innerHTML = html;
        }
        else {
            ROOT_PRODUCTS.innerHTML += html;
        }


    }
    done = 0;
    let iD = new URLSearchParams(window.location.search).get("spuds");
    if (iD != null) {
        let y = document.getElementById(iD).getBoundingClientRect().top;
        if (doningsearch == 0) {
            window.scrollTo(0, y);
            doningsearch = 1
        }
    }



}

function searchfunc() {
    if (document.querySelector('#search-input') != null) {
        searchValue = document.querySelector('#search-input').value;
        window.location.href = "search.html?search=" + searchValue
    }

}



function loader() {
    BackButton.hide();
    params = new URLSearchParams(window.location.search);
    const cookieValue = params.get('page');
    const searchinfo = params.get("search");
    console.log(searchinfo);
    if (searchinfo != null && search == 0) {
        resetsearch();
    }


    else {

        if (doning == 1 || cookieValue == null) {


            fetch('https://rmstoreapi-production.up.railway.app/getAll', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ limiter: limit, paging: page, store: "RM" })
            })
                .then(response => response.json())
                .then(data => loadHTMLTable(data['data']));
        }
        else {


            console.log(cookieValue, doning);
            fetch('https://rmstoreapi-production.up.railway.app/getAllDataFromStart', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ limiter: limit, paging: cookieValue, store: "RM" })
            })
                .then(response => response.json())
                .then(data => loadHTMLTable(data['data']));
        }
    }




}

document.addEventListener('DOMContentLoaded', loader());

function loadHTMLTable(data) {
    if (data.length > 0) {
        let catalog = '';
        console.log(data);
        data.forEach(({ img, title, start_price, spuId }) => {
            catalog += `
            <a class="product-card" id="${spuId}" href="detail.html?id=${spuId}&page=${page}" onclick="getPage()">
                <div class="item">
                    <img src="${img}" alt="" class="img">
                </div>
                <div class="itemname">${title}</div>
                <div class="price">${start_price} ₽</div>
                <div class="btn">Заказать</div>
            </a>
            `;
        });
        const html = `
        <div class="inner">
            ${catalog}
        </div>
        `;

        const ROOT_PRODUCTS = document.getElementById('listing');
        if (page == 1) {
            ROOT_PRODUCTS.innerHTML = html;
        }
        else {
            ROOT_PRODUCTS.innerHTML += html;
        }

    }
    done = 0;
    params = new URLSearchParams(window.location.search);
    const spuds = params.get('spuds');

    if (doning == 0) {
        if (spuds != null) {
            let y = document.getElementById(spuds).getBoundingClientRect().top;
            window.scrollTo(0, y);
        }

        doning = 1;
    }
    tg.MainButton.hide();

    enableCarouselSwiping();
}

function enableCarouselSwiping() {
    const itmCar = document.querySelector("#brandCarousel");
    itmCar.addEventListener('touchstart', moveSlideByTouch);
}

function moveSlideByTouch(event) {
    const xClick = event.touches[0].pageX;
    console.log($(".carousel"));

    $(".carousel").one('touchmove', function (event) {
        const xMove = event.originalEvent.touches[0].pageX;
        const sensitivityInPx = 5;
        console.log("here111");

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

function isTextInput(node) {
    return ['INPUT', 'TEXTAREA'].indexOf(node.nodeName) !== -1;
}

document.addEventListener('touchstart', function (e) {
    if (!isTextInput(e.target) && isTextInput(document.activeElement)) {
        document.activeElement.blur();
        console.log(document.activeElement);
    }
}, false);

function openRM() {

    tg.openTelegramLink("https://t.me/hypekickspoizon");
    /* tg.openLink("https://rmpoizon.store"); */
    console.log("opened");
}

function openManager() {

    tg.openTelegramLink("https://t.me/HKpozion");
    console.log("opened");
}

function openTeletype(line) {
    tg.openLink(line);
}

function openTGLink(link) {
    tg.openTelegramLink(link);
}
function showLoading() {
    loading.classList.add('show');

    done = 1;
    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(() => {

            page++;
            if (search == 0) {
                console.log("loader");
                loader();
            }
            else {
                searchfunc();
            }
        }, 300);
    }, 1000);
}

window.addEventListener('scroll', () => {

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 30) {
        if (done == 0) {
            showLoading();
        }
    }
});
