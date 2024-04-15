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