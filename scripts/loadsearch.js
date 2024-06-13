let tgl = window.Telegram.WebApp;
let page = 1;
let limit = 10;
const loading = document.querySelector('.loader');
let done = 0;
let needscroll = 0;

tgl.expand();
var BackButton = window.Telegram.WebApp.BackButton;
BackButton.onClick(function () {
    window.location.href = "index.html";

    BackButton.hide();
    tg.MainButton.hide();
});
function loadsearch() {
    BackButton.show();
    const sh = new URLSearchParams(window.location.search).get('search');
    const trypage = new URLSearchParams(window.location.search).get('page');
    let searcher = document.getElementById("searcher");
    let test = document.createElement("div");
    test.className = "product-search";
    test.innerHTML += `<input placeholder="" id="search-input" class = "wideinputbox"  onchange="searchfunc()">`;
    test.innerHTML += `<div class="search-btn" onclick="searchfunc()"><img class="icon-search" src="./assets/search_logo.png"></div>`

    searcher.appendChild(test);
    if (sh != null) {
        document.getElementById("search-input").value = sh;
        if (trypage != null) {
            page = parseInt(trypage);
            resetsearch();
        }
        else {
            searchfunc();
        }


    }

}

function setsearch() {
    if (document.querySelector('#search-input') != null) {
        window.location.href = "search.html?search=" + document.querySelector('#search-input').value
    }

}
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function resetsearch() {
    const sh = new URLSearchParams(window.location.search).get('search');
    const trypage = new URLSearchParams(window.location.search).get('page');
    needscroll = 1;
    fetch('https://rmstoreapi-production.up.railway.app/searchDataFromStart/' + sh, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ limiter: limit, paging: parseInt(trypage) })
    })
        .then(response => response.json())
        .then(data => loadSearchHTMLTable(data['data']));


}

function searchfunc() {
    
    if (document.querySelector('#search-input') != null) {
        searchValue = document.querySelector('#search-input').value;
    }
    document.activeElement.blur();
    console.log(searchValue);
    if (searchValue.length == 0) {
        page = 1;
    }
    else {
        console.log(page);
        fetch('https://rmstoreapi-production.up.railway.app/search/' + searchValue, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ limiter: limit, paging: page })
        })
            .then(response => response.json())
            .then(data => loadSearchHTMLTable(data['data']));
    }

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
                <div class="price">${numberWithSpaces(start_price)} ₽</div>
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

        params = new URLSearchParams(window.location.search);
        const spuds = params.get('spuds');
        done = 0;
        if (needscroll == 1) {
            let y = document.getElementById(spuds).getBoundingClientRect().top;
            window.scrollTo({
                left: 0,
                top: y,
                behavior: 'smooth'
            });
        }

    }
    else if(data.length == 0 && page == 1){
        ROOT_PRODUCTS.innerHTML = `<span
        style="display: block; margin-top: 4rem; text-align: center; font-family: 'Inter', sans-serif; font-weight: 400; font-size: 20px;">
        Пока такого товара нет</span>`
    }
}

function showLoading() {
    loading.classList.add('show');

    done = 1;
    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(() => {
            page++;
            searchfunc();

        }, 300);
    }, 1000);
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 30 && done == 0) {
        if (needscroll == 0) {
            console.log("here ");
            done = 1;
            showLoading();
        }
        else {
            needscroll = 0;
        }

    }
});

loadsearch();