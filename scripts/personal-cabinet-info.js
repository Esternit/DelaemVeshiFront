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
    document.getElementById("full-body").innerHTML = `	<div style=" width: fit-content; height: 30px;">

	</div>

	<div class="profile-picture">
		<img src="./assets/chat_pfp.png">
	</div>
	<span class="profile-name" id="profile-name"></span>

	<div class="bonuses-container">
		<span class="bonuses-text">Бонусы: <span id="bonuses-amount"></span></span>
		<div class="bonuses-currency">₽</div>
	</div>

	<div class="referral-link-container">
		<span id="reward-amount"></span>
		<span class="reward-description">за приглашённого друга</span>
		<div class="referral-link-text-container">
			<span id="referral-link">t.me...</span>
			<img class="referral-link-img" src="./assets/link_copy_button.png" onclick="copyToClipboard()">
		</div>
		<div style="text-align: center;">просто скинь ему ссылку</div>
	</div>

	<div class="page-link-container">
		<a href="./orders.html"><span class="page-link-text" id="link-my-orders">Мои заказы</span></a>
	</div>
	<div class="page-link-container">
		<a href="./myaddress.html"><span class="page-link-text" id="link-address">Адрес</span></a>
	</div>
	<div class="page-link-container">
		<a href="./bonuses.html"><span class="page-link-text" id="link-FAQ">Бонусы</span></a>
	</div>
	<div class="page-link-container">
		<a href="./faq.html"><span class="page-link-text" id="link-FAQ">FAQ</span></a>
	</div>
	<script src="./scripts/personal-cabinet-info.js"></script>`
    document.getElementById("profile-name").innerText = data["tg_name"];
    document.getElementById("bonuses-amount").innerText = data["bonuses"];
    document.getElementById("reward-amount").innerText = `+${data["bonus_adds_owner"]}₽`;
    document.getElementById("referral-link").innerText = data["ref_link"];
    copyText = data["ref_link"];
}

function copyToClipboard() {
	window.Telegram.WebApp.showAlert("Ссылка находится в личных сообщениях с ботом");
	fetch('https://crmback-production.up.railway.app/sendLink', {  //https://crmback-production.up.railway.app
		headers: {
			'Content-type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			chat_id: window.Telegram.WebApp.initDataUnsafe.user.id,  //window.Telegram.WebApp.initDataUnsafe.user.id
			link: copyText
		})
	})
    //navigator.clipboard.writeText(copyText);
}
loadProfile();