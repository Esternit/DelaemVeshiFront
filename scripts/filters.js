var styleElem = document.head.appendChild(document.createElement("style"));
var flipped = false;
var BackButton = window.Telegram.WebApp.BackButton;
var selectedBrand = "Adidas";
var selectedActivity = "running";
var selectedSize = "";
var minprice = 0;
var maxprice = 0;
BackButton.show();

BackButton.onClick(function () {
    window.location.href = 'index.html';

    BackButton.hide();
});
function flipArrow() {
    if (!flipped) {
        styleElem.innerHTML = ".select-container::after {clip-path: polygon(0% 100%, 50% 0%, 100% 100%);}";
        flipped = true;
    } else {
        styleElem.innerHTML = ".select-container::after {clip-path: polygon(100% 0%, 0 0%, 50% 100%);}";
        flipped = false;
    }
}

function selectSize(name_size) {
    console.log(name_size);
    selectedSize = name_size; 
    document.getElementById("size-select-placeholder").innerText = name_size + " EU";
}

function changeStatus(filter_id) {
    let filter = document.getElementById(selectedActivity);
    var bgColor = getStyle(filter, 'backgroundColor');

    filter.style.backgroundColor = "#D9D9D9";
    filter.style.color = "#000000";

    filter = document.getElementById(filter_id);
    var bgColor = getStyle(filter, 'backgroundColor');

    if (bgColor == "rgb(217, 217, 217)") {
        filter.style.backgroundColor = "#00E8CD";
        filter.style.color = "#FFFFFF";
    } else {
        filter.style.backgroundColor = "#D9D9D9";
        filter.style.color = "#000000";
    }
    selectedActivity = filter_id;
}

function changeStatusBrand(filter_id) {
    let filter = document.getElementById(selectedBrand);
    var bgColor = getStyle(filter, 'backgroundColor');

    filter.style.backgroundColor = "#D9D9D9";
    filter.style.color = "#000000";

    filter = document.getElementById(filter_id);
    var bgColor = getStyle(filter, 'backgroundColor');

    if (bgColor == "rgb(217, 217, 217)") {
        filter.style.backgroundColor = "#00E8CD";
        filter.style.color = "#FFFFFF";
    } else {
        filter.style.backgroundColor = "#D9D9D9";
        filter.style.color = "#000000";
    }
    selectedBrand = filter_id;
}

function getStyle(el, styleProp) {
    if (el.currentStyle)
        return el.currentStyle[styleProp];

    return document.defaultView.getComputedStyle(el, null)[styleProp];
}

function changePricing(type){
    if(type == 'min'){
        let val = document.getElementById("from-filter-input").value;
        if(val != "" && val > 0){
            minprice = val;
        }
        if(val < 0){
            document.getElementById("from-filter-input").value = "0₽";
        }
    }
    if(type == 'max'){
        let val = document.getElementById("to-filter-input").value;
        if(val != "" && val > 0){
            maxprice = val;
        }
        if(val < 0){
            document.getElementById("to-filter-input").value = "0₽";
        }
    }
}

function loadSizes() {
    fetch('https://crmback-production.up.railway.app/getAvailableSizes', {  //https://crmback-production.up.railway.app
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            loadHTMLSizes(data)
        })
}

function loadHTMLSizes(data) {
    data = data["data"];
    var brands = data["brands"];
    data = data["sizes"];

    brands = brands.sort((a, b) => {
        if (a.brand.toUpperCase() < b.brand.toUpperCase()) {
          return -1;
        }
      });

    data = data.sort((a, b) => {
        if (a.name_size < b.name_size) {
          return -1;
        }
      });
    const TABLE = document.getElementById("size-block-content");
    TABLE.innerHTML = ``;
    var countrow = 1;
    var countcolumn = 1;
    data.forEach(element => {
        if(!element["name_size"].includes("/")){
            TABLE.innerHTML += `<span  onclick="selectSize('${element["name_size"]}')" class="single-filter size-filter"
            style="grid-row: ${countrow} / ${countrow}; grid-column: ${countcolumn} / ${countcolumn};">${element["name_size"]} EU</span>`
            countrow++;
            if(countrow ==12){
                countrow = 1;
                countcolumn++;
            }
        }

    });

    const brandsTable = document.getElementById("brand-container");
    brandsTable.innerHTML = ``;
    for(let i = 0; i < 8; i++) {
        let word = brands[i]["brand"];
        word = word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
        brandsTable.innerHTML += `<span id = "${word}" class="single-filter" onclick="changeStatusBrand('${word}')">${word}</span>`;
    }
}

loadSizes();

function saveFilters(){
    console.log(minprice, maxprice, selectedBrand, selectedActivity, selectedSize);
    window.location.href=`filters_result.html?page=1&minprice=${minprice}&maxprice=${maxprice}&brand=${selectedBrand}&activity=${selectedActivity}&size=${selectedSize}`

}