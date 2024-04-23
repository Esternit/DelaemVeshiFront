function detectBodyOverflow() {
    var html = document.getElementsByTagName("html")[0];
    const lowest_element_rect = document.getElementById("calculate-button").getBoundingClientRect();
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    console.log("html height: ", html.clientHeight);
    console.log("lowest element position: ", lowest_element_rect.bottom);

    if (html.clientHeight < lowest_element_rect.bottom) {
        console.log("vertical overflow detected");

        html.setAttribute("style", "zoom: " + html.clientHeight / (lowest_element_rect.bottom) + ";");
    } else {
        console.log("no vertical overflow detected");
    }
}

detectBodyOverflow();