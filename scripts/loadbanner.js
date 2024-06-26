var page = 1;
var limit = 14;
const loading = document.querySelector('.loader');
var doneloading = true;
var needscroll = false;
var minprice;
var maxprice;
var selectedBrand;
var selectedActivity;
var selectedSize;
var BackButton = window.Telegram.WebApp.BackButton;


function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
BackButton.show();

BackButton.onClick(function () {
    window.location.href = 'index.html';

    BackButton.hide();
});
function afterLoad(){
    minprice = new URLSearchParams(window.location.search).get('minprice');
    maxprice = new URLSearchParams(window.location.search).get('maxprice');
    selectedBrand = new URLSearchParams(window.location.search).get('brand');
    selectedActivity = new URLSearchParams(window.location.search).get('activity');
    selectedSize = new URLSearchParams(window.location.search).get('size');

    if(selectedBrand.indexOf(',') != -1){
        selectedBrand=selectedBrand.split(',');
    }
    else{
        selectedBrand = [selectedBrand];
    }
    if(selectedActivity.indexOf(',') != -1){
        selectedActivity=selectedActivity.split(',');
    }
    else{
        selectedActivity = [selectedActivity];
    }
    console.log(minprice, maxprice, selectedBrand, selectedActivity, selectedSize, page);
    fetch('https://crmback-production.up.railway.app/loadBanner', {  //https://crmback-production.up.railway.app
    headers: {
        'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({minPrice: minprice, 
        maxPrice: maxprice,
        brand: selectedBrand, 
        category: selectedActivity, 
        size: selectedSize,
        limit: limit,
        page: page
    })
})
    .then(response => response.json())
    .then(data => {
        loadHTMLTable(data['data']);
    })
}
function loadFilters(){

    minprice = new URLSearchParams(window.location.search).get('minprice');
    maxprice = new URLSearchParams(window.location.search).get('maxprice');
    selectedBrand = new URLSearchParams(window.location.search).get('brand');
    selectedActivity = new URLSearchParams(window.location.search).get('activity');
    selectedSize = new URLSearchParams(window.location.search).get('size');
    page = new URLSearchParams(window.location.search).get('page');
    
    if(selectedBrand.indexOf(',') != -1){
        selectedBrand=selectedBrand.split(',');
    }
    else{
        selectedBrand = [selectedBrand];
    }
    if(selectedActivity.indexOf(',') != -1){
        selectedActivity=selectedActivity.split(',');
    }
    else{
        selectedActivity = [selectedActivity];
    }
    console.log(minprice, maxprice, selectedBrand, selectedActivity, selectedSize);
    if(page != 1){
        needscroll = true;
        fetch('https://crmback-production.up.railway.app/loadBanner', {  //https://crmback-production.up.railway.app
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({minPrice: minprice, 
            maxPrice: maxprice,
            brand: selectedBrand, 
            category: selectedActivity, 
            size: selectedSize,
            limit: limit*page,
            page: 1
        })
    })
        .then(response => response.json())
        .then(data => {
            loadHTMLTable(data['data']);
        })
    }
    else{
        fetch('https://crmback-production.up.railway.app/loadBanner', {  //https://crmback-production.up.railway.app
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({minPrice: minprice, 
            maxPrice: maxprice,
            brand: selectedBrand, 
            category: selectedActivity, 
            size: selectedSize,
            limit: limit,
            page: page
        })
    })
        .then(response => response.json())
        .then(data => {
            loadHTMLTable(data['data']);
        })
    }

}

loadFilters();

function loadHTMLTable(data) {
    const ROOT_PRODUCTS = document.getElementById('listing');
    console.log(data);
    if (data.length > 0) {
        console.log(data.length);
        let catalog = '';
        data.forEach(({ img, title, start_price, spuId }) => {
            catalog += `

            <a class="product-card" id="${spuId}" href="detail.html?id=${spuId}&page=${page}&minprice=${minprice}&maxprice=${maxprice}&brand=${selectedBrand}&activity=${selectedActivity}&size=${selectedSize}" onclick="getPage()">
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
    }
    else if(data.length == 0 && page == 1){
        ROOT_PRODUCTS.innerHTML = `<span
        style="display: block; margin-top: 4rem; text-align: center; font-family: 'Inter', sans-serif; font-weight: 400; font-size: 20px;">
        Пока такого товара нет</span>`
    }
    if(needscroll){
        const spuds = new URLSearchParams(window.location.search).get('spuds');

        let y = document.getElementById(spuds).getBoundingClientRect().top;
        window.scrollTo(0, y);
        needscroll = false;
    }

    doneloading = true;
}


function showLoading() {
    loading.classList.add('show');

    done = 1;
    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(() => {

            page++;
            afterLoad();
        }, 300);
    }, 1000);
}

window.addEventListener('scroll', () => {
    
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 30) {
        if(doneloading){
            console.log("loader enetered");
            showLoading();
            doneloading = false;
        }

    }
});