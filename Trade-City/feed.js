// Simulate fetching live prices and trades from an API (can be replaced with real API)
setInterval(function() {
    updateMarketData();
    updateTradeActivity();
}, 5000); // Update every 5 seconds

function updateMarketData() {
    // Simulated price data (can replace with API calls to fetch actual prices)
    const ethPrice = (Math.random() * (2000 - 1500) + 1500).toFixed(2);
    const gprfPrice = (Math.random() * (100 - 50) + 50).toFixed(2);
    const usdtPrice = (Math.random() * (1.2 - 0.8) + 0.8).toFixed(2);

    document.getElementById("eth-price").textContent = `$${ethPrice}`;
    document.getElementById("gprf-price").textContent = `$${gprfPrice}`;
    document.getElementById("usdt-price").textContent = `$${usdtPrice}`;
}

function updateTradeActivity() {
    // Simulate trade activity
    const trades = [
        "ETH → GPRF: 1 ETH for 100 GPRF",
        "GPRF → USDT: 50 GPRF for 25 USDT",
        "USDT → ETH: 200 USDT for 0.1 ETH"
    ];
    
    const tradeList = document.getElementById("trade-list");
    tradeList.innerHTML = ""; // Clear existing trade list

    trades.forEach(function(trade) {
        const li = document.createElement("li");
        li.textContent = trade;
        tradeList.appendChild(li);
    });
}

// Simulate price chart with random data
const ctx = document.getElementById("priceChart").getContext("2d");
const priceChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: Array.from({ length: 20 }, (_, i) => `T${i + 1}`),
        datasets: [{
            label: "ETH Price",
            data: Array.from({ length: 20 }, () => Math.random() * (2000 - 1500) + 1500),
            borderColor: "#28a745",
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: "Time"
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: "Price (USD)"
                }
            }
        }
    }
});

// Simulate market trend indicators
function updateMarketIndicator() {
    const trend = ["Uptrend", "Downtrend", "Stable"];
    const currentTrend = trend[Math.floor(Math.random() * trend.length)];

    const indicator = document.getElementById("market-indicator");
    indicator.innerHTML = `<span>Trend: ${currentTrend}</span>`;
}

// Update market trend every 10 seconds
setInterval(updateMarketIndicator, 10000);
