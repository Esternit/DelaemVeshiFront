var styleElem = document.head.appendChild(document.createElement("style"));
var flipped = false;

function flipArrow() {
    if (!flipped) {
        styleElem.innerHTML = ".select-container::after {clip-path: polygon(0% 100%, 50% 0%, 100% 100%);}";
        flipped = true;
    } else {
        styleElem.innerHTML = ".select-container::after {clip-path: polygon(100% 0%, 0 0%, 50% 100%);}";
        flipped = false;
    }
}

function changeStatus(filter_id) {
    const filter = document.getElementById(filter_id);
    var bgColor = getStyle(filter, 'backgroundColor');

    if (bgColor == "rgb(217, 217, 217)") {
        filter.style.backgroundColor = "#00E8CD";
        filter.style.color = "#FFFFFF";
    } else {
        filter.style.backgroundColor = "#D9D9D9";
        filter.style.color = "#000000";
    }
}

function getStyle(el, styleProp) {
    if (el.currentStyle)
        return el.currentStyle[styleProp];

    return document.defaultView.getComputedStyle(el, null)[styleProp];
}