let currentUser = "guest";
let currentHost = "rig";

const loginForm = document.getElementById("login-form");
const skipBtn = document.getElementById("skip-login");
const logoutBtn = document.getElementById("logout-btn");
const ttyScreen = document.getElementById("tty-login");
const shopDesktop = document.getElementById("shop-desktop");

function enterSession(user, host) {
	currentUser = user.trim() || "guest";
	currentHost = host.trim() || "swiss-node";

	document.getElementById("display-session").textContent = `${currentUser}@${currentHost}`;
	document.getElementById("prompt-label").textContent = `${currentUser}@${currentHost}:~/cryptoniacs_lab$`;

	document.querySelectorAll(".dynamic-host").forEach(el => {
		el.textContent = currentHost;
	});

	ttyScreen.classList.add("hidden");
	shopDesktop.classList.remove("hidden");
}

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	enterSession(
		document.getElementById("username").value,
		document.getElementById("hostname").value
	);
});

skipBtn.addEventListener("click", () => {
	enterSession("anon", "swiss-node");
});

logoutBtn.addEventListener("click", () => {
	shopDesktop.classList.add("hidden");
	ttyScreen.classList.remove("hidden");
});

const searchInput = document.getElementById("search-input");
const clearBtn = document.getElementById("clear-btn");
const cards = document.querySelectorAll(".hardware-card");
const noResults = document.getElementById("no-results");

searchInput.addEventListener("input", () => {
	const q = searchInput.value.toLowerCase().trim();

	if (q === "clear") {
		searchInput.value = "";
		resetFilter();
		return;
	}

	clearBtn.classList.toggle("hidden", q === "");
	let visibleCount = 0;

	cards.forEach(card => {
		const text = card.textContent.toLowerCase();
		const keys = card.getAttribute("data-keywords") || "";
		if (q === "" || q === "ls" || text.includes(q) || keys.includes(q)) {
			card.classList.remove("hidden");
			visibleCount++;
		} else {
			card.classList.add("hidden");
		}
	});

	noResults.classList.toggle("hidden", visibleCount > 0);
});

funtion resetFilter() {
	clearBtn.classList.add("hidden");
	noResults.classList.add("hidden");
	cards.forEach(c => c.classList.remove("hidden"));
}

clearBtn.addEventListener("click", () => {
	searchInput.value = "";
	resetFilter();
});

const dellUpgradeCheck = document.getElementById("dell-ram-upgrade");
const dellPriceDisplay = document.getElementById("dell-price-display");

dellUpgradeCheck.addEventListener("change", () => {
	const total = dellUpgradeCheck.checked ? 199 + 25 : 199;
	dellPriceDisplay.textContent = `${total}.- CHF`;
});

/*const modal = document.getElementById("order-modal");
const orderSummary = document.getElementById("order-summary");
const mailtoLink = document.getElementById("mailto-link");

document.querySelectorAll(".order-btn").forEach(bnt => {
	bnt.addEventListener("click", () => {
		const product = btn.getAttribute("data-product");
		let price = parseInt(btn.getAttribute("data-base"), 10);
		const osSelectId = btn.getAttribute("data-os");
		const chosenOS = document.getElementById(osSelectId).value;

		let upgradeText = "None (Standard configuration");
		const upgradeId = btn.getAttribute("data-upgrade");
		if (upgradeId && document.getElementById(upgradeId).checked) {
			price += 25;
			upgradeText = "Upgrade 16GB RAM DDR4 (+25 CHF)";
		}

		const receipt =
	`=== CRYPTONIACS_LAB // DIRECT ORDER ===
	Client:		${currentUser}@${currentHost}
	Product:	${product}
	Chosen OS:	${chosenOS}
	Upgrade:	${upgradeText}
	Total:		${price}.- CHF (+ PostPac CH)
	Preferred payment: Crypto / QR-IBAN / Cash`;

		orderSummary.testContent = receipt;
		mailtoLink.href = `mailto:cryptoniacs_lab@proton.me?subject=${encodeURIComponent("Cryptoniacs_lab Order: " + product)}&body=${encodeURIComponent(receipt)}`;
		modal.classList.remove("hidden");
	});
});

document.getElementById("close-modal").addEventListener("click", () => {
	modal.classList.add("hidden");
});

document.getElementById("copy-order-btn").addEventListener("click" () => {
	navigator.clipboard.writeText(orderSummary.textContent);
	alert("Order successfully copied!");
});

/*function generateCheckoutCrypto(product, priceCHF, cryptoType) {
	const addressBTC = "bc1qmyBTCaddress...";
	const addressXMR = "88myXMRaddress...___";
	const bankIban = "CH00 0000 0000 0000 0";
	const bank_Owner = "Name Surname / Cryptoniacs_lab, postcode City";
	const contactEmail = "Cryptoniacs_lab@proton.me";

	let currentOrder = {
		product: "",
		price: 0,
		os: "",
		upgrade: "",
		method: "XMR"
	};

	const modal = document.getElementById("order-modal");
	const orderSummary = document.getElementById("order-summary");
	const mailtoLink = document.getElementById("mailto-link");
	const modalHint = document.getElementById("modal-hint-text");

	function renderReceipt() {
		let paymentDetails = "";

		if (currentOrder.method === "XMR") {
			paymentDetails =
		`Method:  Monero (XMR) [Privacy Mode]
		Amount:   Equivalent in ${currentOrder.price}.- CHF
		Wallet:   ${addressXMR}`;
			modalHint.textContent = "Send the equivalent in XMR, after the payment share the TXID via email to confirm the order.";
		} //
		

	let cryptoInstructions = "";
	if (cryptoType === "BTC") {
		cryptoInstructions = `Currency: Bitcoin (BTC) on-chain / Lightning\nAddress: ${addressBTC}`;
	} else {
		cryptoInstructions = `Currency: Monero (XMR) [Privacy Max]\nAddress: ${addressXMR}`;
	}

	const receipt = 
	`=== CRYPTONIACS_LAB // CRYPTO CHECKOUT ===
	Client:		${currentUser}@${currentHost}
	Product:	${product}
	Chosen OS:	${chosenOS}
	Upgrade:	${upgradeText}
	Total:		${price}.- CHF (+ PostPac CH) (Equivalent in ${cryptoType})

	${cryptoInstructions}

	*Note: After the payment, send the hash of the transaction (TXID) via email to confirm the PostPac.*`;

		return receipt;
}*/
