var styleSameAddress = document.head.appendChild(document.createElement("style"));
var stylePickupMoscow = document.head.appendChild(document.createElement("style"));
var styleSameName = document.head.appendChild(document.createElement("style"));
var styleSameNumber = document.head.appendChild(document.createElement("style"));

function toggleCheckFor(list_id) {
    const currentStyle = window.getComputedStyle(document.getElementById(list_id), '::marker').getPropertyValue("content");

    var styleElem;
    if (currentStyle == "url(\"https://raw.githubusercontent.com/Esternit/DelaemVeshiFront/main/assets/list_bullet.svg\")") {
        styleElem = "#" + list_id + "::marker {content: url(\"https://raw.githubusercontent.com/Esternit/DelaemVeshiFront/main/assets/list_bullet_checked.svg\");}";
    } else {
        styleElem = "#" + list_id + "::marker {content: url(\"https://raw.githubusercontent.com/Esternit/DelaemVeshiFront/main/assets/list_bullet.svg\");}";
    }

    switch (list_id) {
        case 'same-address':
            styleSameAddress.innerHTML = styleElem;
            break;

        case 'pickup-moscow':
            stylePickupMoscow.innerHTML = styleElem;
            break;

        case 'same-name':
            styleSameName.innerHTML = styleElem;
            break;

        case 'same-number':
            styleSameNumber.innerHTML = styleElem;
            break;
    }
}

/* 
    passed id is of format: ${reference-name}-button
    list element id is of format: ${reference-name}
*/
function changeStatus(cart_button_id) {
    const list_bullet = document.getElementById(cart_button_id.replace(/-button+$/, ''));

    toggleCheckFor(cart_button_id.replace(/-button+$/, ''));
}

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


// Install input filters.
setInputFilter(document.getElementById("phone-number"), function (value) {
    return /^\+?\d*(\d[ ]?\d*){0,6}$/.test(value);
});