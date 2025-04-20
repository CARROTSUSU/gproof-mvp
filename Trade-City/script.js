// Toggle Quantum Vision and Wireframe Mode
const toggleModeBtn = document.getElementById('toggleMode');
if (toggleModeBtn) {
    toggleModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('wireframe');
        document.body.classList.toggle('quantum-vision');
    });
}

// Simulated Data Fetch
function updatePrices() {
    document.getElementById('ethPrice').innerText = "$3,102";
    document.getElementById('gprfPrice').innerText = "$0.12";
    document.getElementById('usdtPrice').innerText = "$1.00";
}

function updateEnergyBar(percent = 100) {
    const fill = document.querySelector('.energy-fill');
    if (fill) fill.style.width = percent + '%';
}

function populateTradeFeed() {
    const tradeFeed = document.getElementById('tradeFeed');
    const sample = [
        { avatar: '🧠', user: 'Node001', rep: 92, amount: '120 GPRF' },
        { avatar: '⚡', user: 'Node007', rep: 75, amount: '45 USDT' },
        { avatar: 'AI', user: 'NodeQuantum', rep: 99, amount: '0.4 ETH' }
    ];
    tradeFeed.innerHTML = '';
    sample.forEach(trade => {
        const li = document.createElement('li');
        li.innerHTML = `${trade.avatar} <strong>${trade.user}</strong> | Rep: ${trade.rep} | Swap: ${trade.amount}`;
        tradeFeed.appendChild(li);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    updatePrices();
    updateEnergyBar(82);
    populateTradeFeed();
});
