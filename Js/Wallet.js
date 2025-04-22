let provider, signer, userAddress;
let tokenContract, coreContract, taskContract, rewardContract, stakingContract;
let refreshInterval;

// Alamat kontrak & ABI (placeholder — sila isi)
const tokenAddress = "0x...";        // GPRF Token
const tokenABI = [ /* ... */ ];

const coreAddress = "0x...";         // GPROOF Core
const coreABI = [ /* ... */ ];

const taskManagerAddress = "0x...";  // TaskManager
const taskManagerABI = [ /* ... */ ];

const rewardManagerAddress = "0x...";// RewardManager
const rewardManagerABI = [ /* ... */ ];

const stakingAddress = "0x...";      // Staking (jika ada)
const stakingABI = [ /* ... */ ];

// Fungsi sambung wallet
async function connectWallet() {
  try {
    if (!window.ethereum) return alert("Sila pasang MetaMask untuk teruskan.");

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    // Tunjuk alamat wallet
    document.getElementById("wallet").innerText = "Wallet: " + userAddress;
    localStorage.setItem("gproof_wallet", userAddress);

    // Sambung semua kontrak
    tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    coreContract = new ethers.Contract(coreAddress, coreABI, signer);
    taskContract = new ethers.Contract(taskManagerAddress, taskManagerABI, signer);
    rewardContract = new ethers.Contract(rewardManagerAddress, rewardManagerABI, signer);
    stakingContract = new ethers.Contract(stakingAddress, stakingABI, signer);

    // Panggil fungsi selepas sambungan
    await updateStats(userAddress);
    await updateStakingInfo();
    await loadReputation();

    // Auto-refresh
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      updateStats(userAddress);
      updateStakingInfo();
    }, 15000);

  } catch (error) {
    console.error("Ralat semasa sambung wallet:", error);
    alert("Gagal sambung wallet. Sila cuba lagi.");
  }
}

// Tunggu DOM siap, barulah pasang listener
window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("sambung-btn");
  if (btn) btn.addEventListener("click", connectWallet);
});
