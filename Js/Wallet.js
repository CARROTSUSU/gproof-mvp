let provider, signer, userAddress;
let tokenContract, coreContract, taskContract, rewardContract, stakingContract;
let refreshInterval;

// Masukkan alamat kontrak & ABI masing-masing
const tokenAddress = "0x..."; // GPRF Token
const tokenABI = [ /* ... */ ];

const coreAddress = "0x..."; // GPROOF Core
const coreABI = [ /* ... */ ];

const taskManagerAddress = "0x..."; // TaskManager
const taskManagerABI = [ /* ... */ ];

const rewardManagerAddress = "0x..."; // RewardManager
const rewardManagerABI = [ /* ... */ ];

const stakingAddress = "0x..."; // Staking (jika ada)
const stakingABI = [ /* ... */ ];

// Fungsi sambung wallet
async function connectWallet() {
  try {
    if (!window.ethereum) {
      alert("Sila pasang MetaMask untuk teruskan.");
      return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    // Paparkan alamat wallet
    document.getElementById("wallet").innerText = "Wallet: " + userAddress;
    localStorage.setItem("gproof_wallet", userAddress);

    // Sambung kontrak
    tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    coreContract = new ethers.Contract(coreAddress, coreABI, signer);
    taskContract = new ethers.Contract(taskManagerAddress, taskManagerABI, signer);
    rewardContract = new ethers.Contract(rewardManagerAddress, rewardManagerABI, signer);
    stakingContract = new ethers.Contract(stakingAddress, stakingABI, signer);

    // Muat data
    await updateStats(userAddress);
    await updateStakingInfo();
    await loadReputation();

    // Auto refresh
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      updateStats(userAddress);
      updateStakingInfo();
    }, 15000);

  } catch (error) {
    console.error("Ralat sambung wallet:", error);
    alert("Gagal sambung wallet. Sila cuba lagi.");
  }
}

// Auto-trigger sambungan jika sebelum ini sudah sambung
window.addEventListener("DOMContentLoaded", async () => {
  const btn = document.getElementById("sambung-btn");
  if (btn) btn.addEventListener("click", connectWallet);

  const saved = localStorage.getItem("gproof_wallet");
  if (saved && window.ethereum) {
    document.getElementById("wallet").innerText = "Wallet: " + saved;
    await connectWallet();
  }
});
