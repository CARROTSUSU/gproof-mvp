// Function to update market prices and indicators
setInterval(function() {
    updateMarketData();
}, 5000); // Update every 5 seconds

function updateMarketData() {
    // Simulated market data (replace with real API calls in future)
    const ethPrice = (Math.random() * 3000).toFixed(2);  // Simulate ETH price
    const gprfPrice = (Math.random() * 5).toFixed(2);   // Simulate GPRF price
    const usdtPrice = 1.00;                             // USDT is always 1
    const ethIndicator = (Math.random() > 0.5) ? "green" : "red";
    const gprfIndicator = (Math.random() > 0.5) ? "green" : "red";
    const usdtIndicator = "yellow";  // USDT indicator is always yellow

    // Update the prices in the HUD
    document.getElementById("eth-price").innerText = `ETH: $${ethPrice}`;
    document.getElementById("gprf-price").innerText = `GPRF: $${gprfPrice}`;
    document.getElementById("usdt-price").innerText = `USDT: $${usdtPrice}`;

    // Update the market indicators
    document.getElementById("eth-indicator").style.backgroundColor = ethIndicator;
    document.getElementById("gprf-indicator").style.backgroundColor = gprfIndicator;
    document.getElementById("usdt-indicator").style.backgroundColor = usdtIndicator;

    // Simulate market trends and volume
    const tradeVolume = (Math.random() * 100000).toFixed(2);
    const marketTrends = (Math.random() > 0.5) ? "Bullish" : "Bearish";

    // Update trade volume and market trends
    document.getElementById("trade-volume").innerText = `Volume: $${tradeVolume}`;
    document.getElementById("market-trends").innerText = `Trends: ${marketTrends}`;
}

// Initial call to set up data on load
updateMarketData();
