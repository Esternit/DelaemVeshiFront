

jQuery(document).ready(function () {
    alert("jquery loaded");
    $("#sizing").delegate(".size", "click", function (event) {
        console.log("before toggle");
        jQuery('.size').removeClass('active');
        jQuery(this).toggleClass('active');
    });

    $("#sizing2").delegate(".size", "click", function (event) {
        console.log("before toggle");
        jQuery('.size').removeClass('active');
        jQuery(this).toggleClass('active');
    });
});

console.log("called");
