/* 
    passed id is of format: ${reference-name}-button
    list element id is of format: ${reference-name}
*/
function changeStatus(cart_button_id) {
    var bullet = document.getElementById(cart_button_id.replace(/-button+$/, ''));
    console.log(bullet.src);
    if (bullet.src == "https://raw.githubusercontent.com/Esternit/DelaemVeshiFront/main/assets/list_bullet.png") {
        bullet.src = "https://raw.githubusercontent.com/Esternit/DelaemVeshiFront/main/assets/list_bullet_checked.png";
    } else {
        bullet.src = "https://raw.githubusercontent.com/Esternit/DelaemVeshiFront/main/assets/list_bullet.png";
    }
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

// input filter for phone number
setInputFilter(document.getElementById("phone-number"), function (value) {
    return /^\+?\d*(\d[ ]?\d*){0,6}$/.test(value);
});

// input filter for bonus currency amount
setInputFilter(document.getElementById("spend-bonus"), function (value) {
    return /^\d*$/.test(value);
});