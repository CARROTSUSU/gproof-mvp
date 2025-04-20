// Function to update market prices dynamically (example, replace with API data)
function updateMarketPrices() {
    document.getElementById('eth-price').textContent = 'ETH: $2500';
    document.getElementById('gprf-price').textContent = 'GPRF: $5.50';
    document.getElementById('usdt-price').textContent = 'USDT: $1';
}

// Function to simulate quantum progress bar during transaction
function simulateQuantumProgress() {
    let progress = 0;
    let interval = setInterval(() => {
        progress += 10;
        document.getElementById('quantumProgress').value = progress;
        if (progress >= 100) {
            clearInterval(interval);
            alert('Transaction Complete!');
        }
    }, 500);
}

// Function to simulate live trade feed updates
function updateLiveTradeFeed() {
    const trades = [
        { avatar: 'node1.png', reputation: 'Gold', swapAmount: '100 GPRF' },
        { avatar: 'node2.png', reputation: 'Silver', swapAmount: '50 ETH' },
    ];
    let tradeFeed = document.getElementById('liveTrades');
    trades.forEach(trade => {
        let tradeDiv = document.createElement('div');
        tradeDiv.innerHTML = `<img src="${trade.avatar}" alt="Avatar"><p>${trade.reputation} - ${trade.swapAmount}</p>`;
        tradeFeed.appendChild(tradeDiv);
    });
}

// Function to simulate wallet connect (QR Scan)
document.getElementById('connectWallet').addEventListener('click', function() {
    alert('Scan QR to Connect Wallet');
});

// Initialize everything
updateMarketPrices();
updateLiveTradeFeed();
