var styleElem = document.head.appendChild(document.createElement("style"));
var checked = false;

function toggleCheckFor(id) {
    if (!checked) {
        styleElem.innerHTML = "#pickup-moscow::marker {content: url(\"https://raw.githubusercontent.com/Esternit/DelaemVeshiFront/main/assets/list_bullet_checked.svg\");}";
        checked = true;
    } else {
        styleElem.innerHTML = "#pickup-moscow::marker {content: url(\"https://raw.githubusercontent.com/Esternit/DelaemVeshiFront/main/assets/list_bullet.svg\");}";
        checked = false;
    }
}

/* 
    passed id is of format: ${reference-name}-button
    list element id is of format: ${reference-name}
*/
function changeStatus(cart_button_id) {
    const list_bullet = document.getElementById(cart_button_id.replace(/-button+$/, ''));

    toggleCheckFor(cart_button_id.replace(/-button+$/, ''));
    console.log(window.getComputedStyle(list_bullet, '::marker').getPropertyValue("content"));
}