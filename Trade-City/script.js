// Quantum Vision Mode (responsive for mobile)
document.addEventListener("DOMContentLoaded", () => {
    applyQuantumVision();
});

function applyQuantumVision() {
    document.body.classList.add('quantum-vision');

    // Update Prices
    document.getElementById('ethPrice').innerText = "$3,102";
    document.getElementById('gprfPrice').innerText = "$0.12";
    document.getElementById('usdtPrice').innerText = "$1.00";

    // Energy Bar
    const fill = document.querySelector('.energy-fill');
    if (fill) fill.style.width = '82%';

    // Live Trade Feed
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
