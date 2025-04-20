// Import Web3 dan ABI kontrak pintar
const Web3 = require("web3");
const web3 = new Web3(window.ethereum); // Anggap MetaMask atau penyedia web3 lain disuntik

const quantumVaultABI = [ /* ABI dari QuantumVault.sol */ ];
const stakingContractABI = [ /* ABI dari Staking Contract */ ];
const rewardTokenABI = [ /* ABI dari ERC20 Token GPRF */ ];

const quantumVaultAddress = "0x..."; // Alamat QuantumVault.sol
const stakingContractAddress = "0x..."; // Alamat Staking Contract
const rewardTokenAddress = "0x..."; // Alamat Token GPRF

const quantumVault = new web3.eth.Contract(quantumVaultABI, quantumVaultAddress);
const stakingContract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);
const rewardToken = new web3.eth.Contract(rewardTokenABI, rewardTokenAddress);

// Fungsi untuk memeriksa status akses Vault
async function checkVaultAccess(userAddress) {
  try {
    const hasAccessed = await quantumVault.methods.hasAccessedVault(userAddress).call();
    if (hasAccessed) {
      console.log("User has accessed the vault.");
    } else {
      console.log("User has not accessed the vault.");
    }
  } catch (error) {
    console.error("Error checking vault access:", error);
  }
}

// Fungsi untuk mengakses Vault
async function accessQuantumVault() {
  const accounts = await web3.eth.requestAccounts();
  const userAddress = accounts[0];

  try {
    await quantumVault.methods.accessVault().send({ from: userAddress });
    console.log("Successfully accessed Quantum Vault");
  } catch (error) {
    console.error("Error accessing the vault:", error);
  }
}

// Fungsi untuk mengklaim ganjaran
async function claimReward(amount) {
  const accounts = await web3.eth.requestAccounts();
  const userAddress = accounts[0];

  try {
    await quantumVault.methods.claimReward(amount).send({ from: userAddress });
    console.log(`Successfully claimed ${amount} GPRF rewards`);
  } catch (error) {
    console.error("Error claiming reward:", error);
  }
}

// Fungsi untuk menambah dana ke Vault (Only Owner)
async function addFundsToVault(amount) {
  const accounts = await web3.eth.requestAccounts();
  const ownerAddress = accounts[0];

  try {
    await quantumVault.methods.addFunds(amount).send({ from: ownerAddress });
    console.log(`Successfully added ${amount} to the Quantum Vault`);
  } catch (error) {
    console.error("Error adding funds to vault:", error);
  }
}

// Fungsi untuk mengambil dana dari Vault (Only Owner)
async function removeFundsFromVault(amount) {
  const accounts = await web3.eth.requestAccounts();
  const ownerAddress = accounts[0];

  try {
    await quantumVault.methods.removeFunds(amount).send({ from: ownerAddress });
    console.log(`Successfully removed ${amount} from the Quantum Vault`);
  } catch (error) {
    console.error("Error removing funds from vault:", error);
  }
}

// Dapatkan baki Vault
async function getVaultBalance() {
  try {
    const balance = await quantumVault.methods.getVaultBalance().call();
    console.log("Quantum Vault balance:", web3.utils.fromWei(balance, "ether"));
  } catch (error) {
    console.error("Error getting vault balance:", error);
  }
}

// Menambah pendengar acara kepada butang-butang dalam UI
document.getElementById('access-vault-btn').addEventListener('click', accessQuantumVault);
document.getElementById('claim-reward-btn').addEventListener('click', () => {
  const amount = document.getElementById('reward-amount').value;
  claimReward(web3.utils.toWei(amount, "ether"));
});

// Menunjukkan baki vault
document.getElementById('vault-balance-btn').addEventListener('click', getVaultBalance);
