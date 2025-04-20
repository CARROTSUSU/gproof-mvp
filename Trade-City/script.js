// Simulasi harga token
document.getElementById("ethPrice").innerText = "$2000";
document.getElementById("gprfPrice").innerText = "$1.50";
document.getElementById("usdtPrice").innerText = "$1.00";

// Logik swap token
document.getElementById("swapButton").addEventListener("click", function() {
    let energyStatus = document.getElementById("energyStatus");
    let energy = parseInt(energyStatus.innerText.replace('%', ''));
    if (energy > 10) {
        energyStatus.innerText = (energy - 10) + "%";
        alert("Tokens swapped!");
    } else {
        alert("Not enough energy for swap!");
    }
});

// Logik untuk update trade feed secara langsung
function updateTradeFeed() {
    let feed = document.getElementById("tradeFeed");
    let li = document.createElement("li");
    li.innerText = "User1 swapped 100 GPRF for ETH";
    feed.appendChild(li);
}

setInterval(updateTradeFeed, 5000); // update setiap 5 detik
