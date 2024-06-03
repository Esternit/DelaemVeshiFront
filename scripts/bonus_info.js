var BackButton = window.Telegram.WebApp.BackButton;
BackButton.show();

BackButton.onClick(function () {
    window.location.href = 'personal_cabinet.html';

    BackButton.hide();
});

function loadBonusInfo() {
    fetch('https://crmback-production.up.railway.app/getBonusInfo', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ user_id: window.Telegram.WebApp.initDataUnsafe.user.id })  //window.Telegram.WebApp.initDataUnsafe.user.id
    })
        .then(response => response.json())
        .then(data => loadHTMLTable(data));
}

function loadHTMLTable(data) {
    document.getElementById("bonuses-body").innerHTML = `
    <span class="page-title">Бонусы</span>
	<div style="margin-top: 2rem;">
		<div class="bonus-badge">
			<span class="bonus-title">Твой баланс бонусов: </span>
			<span class="bonus-amount">${data["bonuses"]}</span>
			<div class="bonuses-currency">₽</div>
		</div>
		<div class="bonus-badge">
			<span class="bonus-title">Сколько друзей ты привел: </span>
			<span class="bonus-amount">${data["entered"]}</span>
		</div>
		<div class="bonus-badge">
			<span class="bonus-title">Сколько товаров купили твои пришедшие друзья: </span>
			<span class="bonus-amount">${data["amountofusers"]}</span>
		</div>
		<div class="bonus-badge">
			<span class="bonus-title">Твои бонусы за месяц: </span>
			<span class="bonus-amount">${data["selfBonusMonth"]}</span>
			<div class="bonuses-currency">₽</div>
		</div>
	</div>
	<script src="./scripts/bonus_info.js"></script>
    `;
}

loadBonusInfo();