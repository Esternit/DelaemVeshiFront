var BackButton = window.Telegram.WebApp.BackButton;
var copyText;
BackButton.show();

BackButton.onClick(function () {
    window.location.href = 'index.html';

    BackButton.hide();
});


function loadProfile() {
    fetch('https://crmback-production.up.railway.app/getUserCab', { //https://crmback-production.up.railway.app
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ user_id: window.Telegram.WebApp.initDataUnsafe.user.id }) //window.Telegram.WebApp.initDataUnsafe.user.id
    })
        .then(response => response.json())
        .then(data => loadHTMLProfile(data));
}

function loadHTMLProfile(data) {
    data = data["data"][0];
    console.log(data);
    document.getElementById("profile-name").innerText = data["tg_name"];
    document.getElementById("bonuses-amount").innerText = data["bonuses"];
    document.getElementById("reward-amount").innerText = `+${data["bonus_adds_owner"]}₽`;
    document.getElementById("referral-link").innerText = data["ref_link"].substring(0,26) + "...";
    copyText = data["ref_link"];
}

function copyToClipboard() {
    navigator.clipboard.writeText(copyText);
}
loadProfile();