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
setInputFilter(document.getElementById("yuan-cost"), function (value) {
    return /^$|^[1-9]\d*(\.\d{0,2})?$/.test(value);
});

// input filter for bonus currency amount
setInputFilter(document.getElementById("item-type"), function (value) {
    return /^$|^\d{0,2}((\.\d?)|( [1-2]\/?3?))? ?( E| EU| U| US)?$/.test(value);
});