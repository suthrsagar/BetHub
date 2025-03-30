document.addEventListener("DOMContentLoaded", function () {
    // 🔄 Load Wallet Balance from LocalStorage
    let walletBalance = parseInt(localStorage.getItem("walletBalance") || 0);
    document.getElementById("wallet-balance").innerText = walletBalance;

    // 🔄 Check if user is logged in
    let username = localStorage.getItem("username");
    if (username) {
        document.getElementById("user-name").innerText = username;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("betting-section").style.display = "block";
    }
});

// 🔑 User Login Function
function loginUser() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username && password) {
        localStorage.setItem("username", username);
        document.getElementById("user-name").innerText = username;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("betting-section").style.display = "block";
    } else {
        alert("⚠️ Please enter valid credentials!");
    }
}

// 🚪 Logout User
function logoutUser() {
    localStorage.removeItem("username");
    document.getElementById("login-section").style.display = "block";
    document.getElementById("betting-section").style.display = "none";
}

// 💰 Add Money using UPI Payment
function addMoneyUPI() {
    let amount = prompt("💰 Enter amount to add:");

    if (!amount || isNaN(amount) || amount <= 0) {
        alert("⚠️ Enter a valid amount!");
        return;
    }

    let upiId = "8905730102@axl"; // 🔥 आपकी UPI ID
    let transactionId = "TXN_" + new Date().getTime();

    // 🔥 UPI Payment Links
    let phonePeUrl = `upi://pay?pa=${upiId}&pn=BetHub&mc=0000&tid=${transactionId}&tr=${transactionId}&tn=Wallet+Topup&am=${amount}&cu=INR`;
    let googlePayUrl = `upi://pay?pa=${upiId}&pn=BetHub&mc=0000&tid=${transactionId}&tr=${transactionId}&tn=Wallet+Topup&am=${amount}&cu=INR`;
    let paytmUrl = `upi://pay?pa=${upiId}&pn=BetHub&mc=0000&tid=${transactionId}&tr=${transactionId}&tn=Wallet+Topup&am=${amount}&cu=INR`;

    // 🔥 Payment Popup
    let popup = window.open("", "PaymentOptions", "width=400,height=400");

    setTimeout(() => {
        let paymentPopup = `
            <html>
            <head>
                <title>Choose Payment Option</title>
                <style>
                    body { text-align: center; font-family: Arial, sans-serif; padding: 20px; }
                    h3 { color: #333; }
                    button { padding: 12px; margin: 10px; border: none; cursor: pointer; border-radius: 5px; font-size: 16px; }
                    .phonepe { background: #8340f1; color: white; }
                    .gpay { background: #34a853; color: white; }
                    .paytm { background: #0033cc; color: white; }
                </style>
            </head>
            <body>
                <h3>Choose Payment Option</h3>
                <a href="${phonePeUrl}" target="_blank"><button class="phonepe">📱 Pay with PhonePe</button></a><br>
                <a href="${googlePayUrl}" target="_blank"><button class="gpay">💳 Pay with Google Pay</button></a><br>
                <a href="${paytmUrl}" target="_blank"><button class="paytm">🏦 Pay with Paytm</button></a>
            </body>
            </html>
        `;

        popup.document.write(paymentPopup);
        popup.document.close();
    }, 100);

    // 🔔 Wallet Balance Update (User को मैन्युअली Confirm करना होगा)
    setTimeout(() => {
        let confirmPayment = confirm("✅ Payment successful? Click OK to update wallet balance.");
        if (confirmPayment) {
            let walletBalance = parseInt(localStorage.getItem("walletBalance") || 0);
            walletBalance += parseInt(amount);
            localStorage.setItem("walletBalance", walletBalance);
            document.getElementById("wallet-balance").innerText = walletBalance;
            alert(`✅ ₹${amount} added to wallet!`);
        }
    }, 10000);
}

// 🎲 Place a Bet
function placeBet() {
    let betAmount = parseInt(document.getElementById("bet-amount").value);
    let walletBalance = parseInt(localStorage.getItem("walletBalance") || 0);

    if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
        alert("⚠️ Enter a valid bet amount!");
        return;
    }

    if (betAmount > walletBalance) {
        alert("❌ Insufficient balance!");
        return;
    }

    // 🔥 Simulate Winning (50% chance)
    let win = Math.random() < 0.5;

    if (win) {
        let winnings = betAmount * 2;
        walletBalance += winnings;
        alert(`🎉 You won ₹${winnings}!`);
    } else {
        walletBalance -= betAmount;
        alert(`😞 You lost ₹${betAmount}. Better luck next time!`);
    }

    localStorage.setItem("walletBalance", walletBalance);
    document.getElementById("wallet-balance").innerText = walletBalance;
}
