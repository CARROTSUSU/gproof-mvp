// Pastikan anda telah memasang ethers.js atau Web3.js, contohnya dengan CDN
// <script src="https://cdn.jsdelivr.net/npm/ethers/dist/ethers.umd.min.js"></script>
// Sambungkan ke Wallet menggunakan Ethers.js

const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer, userAddress;

// Alamat kontrak yang diperlukan
const vaultContractAddress = '0xYourVaultContractAddress'; // Gantikan dengan alamat kontrak QuantumVault
const stakingContractAddress = '0xYourStakingContractAddress'; // Gantikan dengan alamat kontrak Staking
const rewardTokenAddress = '0xYourRewardTokenAddress'; // Gantikan dengan alamat kontrak GPRF

// ABI untuk kontrak QuantumVault
const vaultABI = [
  // Masukkan ABI QuantumVault.sol di sini
];

// ABI untuk kontrak Staking
const stakingABI = [
  // Masukkan ABI Staking.sol di sini
];

// ABI untuk kontrak GPRF (ERC20)
const rewardTokenABI = [
  // Masukkan ABI ERC20 untuk GPRF di sini
];

// Dapatkan kontrak dari alamat dan ABI
const vaultContract = new ethers.Contract(vaultContractAddress, vaultABI, provider);
const stakingContract = new ethers.Contract(stakingContractAddress, stakingABI, provider);
const rewardToken = new ethers.Contract(rewardTokenAddress, rewardTokenABI, provider);

// Fungsi untuk sambung wallet
async function connectWallet() {
  try {
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    console.log("Wallet connected:", userAddress);
    checkAccess();
  } catch (err) {
    console.error("Error connecting wallet:", err);
  }
}

// Fungsi untuk semak akses vault
async function checkAccess() {
  const userTier = await stakingContract.userTier(userAddress);
  const userReputation = await stakingContract.userReputation(userAddress);
  const userStake = await stakingContract.userStake(userAddress);
  
  if (userTier >= 4 && userReputation >= 900 && userStake >= ethers.utils.parseUnits('10000', 18)) {
    document.querySelector('.vault-status').innerHTML = "Vault Status: <strong>Ready</strong>";
    document.querySelector('button').disabled = false; // Enable Unlock Vault button
  } else {
    document.querySelector('.vault-status').innerHTML = "Vault Status: <strong>Insufficient Requirements</strong>";
  }
}

// Fungsi untuk akses vault
async function accessVault() {
  try {
    const tx = await vaultContract.connect(signer).accessVault();
    await tx.wait();
    console.log("Vault accessed successfully!");
    document.querySelector('.vault-status').innerHTML = "Vault Status: <strong>Accessed</strong>";
  } catch (err) {
    console.error("Error accessing vault:", err);
  }
}

// Fungsi untuk claim reward
async function claimReward(amount) {
  try {
    const tx = await vaultContract.connect(signer).claimReward(ethers.utils.parseUnits(amount.toString(), 18));
    await tx.wait();
    console.log(`Claimed ${amount} rewards successfully!`);
  } catch (err) {
    console.error("Error claiming reward:", err);
  }
}

// Tambahkan Event Listeners untuk butang
document.querySelector('button').addEventListener('click', accessVault); // Unlock Vault
document.querySelector('button:nth-child(2)').addEventListener('click', () => claimReward(10)); // Claim Reward (example)

