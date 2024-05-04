var styleElem = document.head.appendChild(document.createElement("style"));
var flipped = false;
var BackButton = window.Telegram.WebApp.BackButton;
var selectedBrand = [];
var selectedActivity = [];
var selectedSize = "";
var minprice = 0;
var maxprice = 0;
var tempBrands = ['adidas', 'adidas originals', 'Asics', 'Converse', 'Jordan', 'New Balance', 'Nike', 'OLD ORDER'];
var tempActivity = ["running", "basketball", "soccer" ,"training", "golf", "tennis"];
BackButton.show();

BackButton.onClick(function () {
    window.location.href = 'index.html';

    BackButton.hide();
});
function flipArrow() {
    console.log(flipped);
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
    // let filter = document.getElementById(selectedActivity);
    // var bgColor = getStyle(filter, 'backgroundColor');

    // filter.style.backgroundColor = "#D9D9D9";
    // filter.style.color = "#000000";

    filter = document.getElementById(filter_id);
    var bgColor = getStyle(filter, 'backgroundColor');

    if (bgColor == "rgb(217, 217, 217)") {
        filter.style.backgroundColor = "#00E8CD";
        filter.style.color = "#FFFFFF";
        selectedActivity.push(filter_id);
    } else {
        filter.style.backgroundColor = "#D9D9D9";
        filter.style.color = "#000000";
        selectedActivity.splice(selectedActivity.indexOf(filter_id), 1);
    }
    // selectedActivity = filter_id;
}

function changeStatusBrand(filter_id) {
    // let filter = document.getElementById(selectedBrand);
    // var bgColor = getStyle(filter, 'backgroundColor');

    // filter.style.backgroundColor = "#D9D9D9";
    // filter.style.color = "#000000";

    filter = document.getElementById(filter_id);
    var bgColor = getStyle(filter, 'backgroundColor');

    if (bgColor == "rgb(217, 217, 217)") {
        filter.style.backgroundColor = "#00E8CD";
        filter.style.color = "#FFFFFF";
        selectedBrand.push(filter_id);
    } else {
        filter.style.backgroundColor = "#D9D9D9";
        filter.style.color = "#000000";
        selectedBrand.splice(selectedBrand.indexOf(filter_id), 1)
    }
    // selectedBrand = filter_id;
    console.log(selectedBrand.join([separator = ',']));
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
    var types = data["types"];
    data = data["sizes"];
    

    brands = brands.sort((a, b) => {
        if (a.brand.toUpperCase() < b.brand.toUpperCase()) {
          return -1;
        }
      });
    types=types.sort((a, b) => {
        if (a.lastcategory.toUpperCase() < b.lastcategory.toUpperCase()) {
          return -1;
        }
      });

    data = data.sort((a, b) => {
        if (a.name_size < b.name_size) {
          return -1;
        }
      });
      console.log(brands,types);
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

    // const brandsTable = document.getElementById("brand-container");
    // brandsTable.innerHTML = ``;
    // for(let i = 0; i < 8; i++) {
    //     // let word = brands[i]["brand"];
    //     // word = word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    //     // brandsTable.innerHTML += `<span id = "${brands[i]["brand"]}" class="single-filter" onclick="changeStatusBrand('${brands[i]["brand"]}')">${word}</span>`;
    //     tempBrands.push(brands[i]["brand"]);
    // }
    // const typeTable = document.getElementById("type-container");
    // typeTable.innerHTML = ``;
    // for(let i = 0; i < types.length; i++) {
    //     let word = "None";
    //     if(types[i]["lastcategory"] == "running"){
    //         word = "Бег";
    //     }
    //     else if(types[i]["lastcategory"] == "basketball"){
    //         word = "Бакстебол";
    //     }
    //     else if(types[i]["lastcategory"] == "soccer"){
    //         word = "Футбол";
    //     }
    //     else if(types[i]["lastcategory"] == "training"){
    //         word = "Тренировки";
    //     }
    //     else if(types[i]["lastcategory"] == "golf"){
    //         word = "Гольф";
    //     }
    //     else if(types[i]["lastcategory"] == "tennis"){
    //         word = "Теннис";
    //     }
    
    //     if(word != "None"){
    //         // word = word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    //         // typeTable.innerHTML += `<span id="${types[i]["lastcategory"]}" class="single-filter" onclick="changeStatus('${types[i]["lastcategory"]}')">${word}</span>`;
    //         // tempActivity.push(types[i]["lastcategory"]);
    //     }

    // }
    console.log(tempBrands, tempActivity);
}

loadSizes();

function saveFilters(){
    console.log(minprice, maxprice, selectedBrand, selectedActivity, selectedSize,);
    if(selectedBrand.length == 0){
        selectedBrand = tempBrands;
    }
    if(selectedActivity.length == 0){
        selectedActivity = tempActivity;
    }
    window.location.href=`filters_result.html?page=1&minprice=${minprice}&maxprice=${maxprice}&brand=${selectedBrand.join([separator = ','])}&activity=${selectedActivity.join([separator = ','])}&size=${selectedSize}`

}