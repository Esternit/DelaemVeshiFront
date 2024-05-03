/* 
    passed id is of format: ${reference-name}-button
    list element id is of format: ${reference-name}
*/
function changeStatus(cart_button_id) {
    var bullet = document.getElementById(cart_button_id.replace(/-button+$/, ''));
    const bullet_src = bullet.src.slice(bullet.src.lastIndexOf("/")+1);

    if (bullet_src == "list_bullet.png") {
        bullet.src = "./assets/list_bullet_checked.png";
    } else {
        bullet.src = "./assets/list_bullet.png";
    }
    take_MSK = !take_MSK;
    if(take_MSK){
        document.getElementById("delivery-address").value = "Заберу в Москве";
        document.getElementById("delivery-address").readOnly = true;
    }
    else{
        document.getElementById("delivery-address").value = standart_adress;
        document.getElementById("delivery-address").readOnly = false;
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