// Inisialisasi Web3 dan kontrak
let web3;
let contract;
let accounts;
const vaultAddress = '0xYourQuantumVaultAddress'; // Gantikan dengan alamat kontrak QuantumVault
const stakingContractAddress = '0xYourStakingContractAddress'; // Gantikan dengan alamat kontrak Staking
const quantumVaultABI = [...]; // Masukkan ABI QuantumVault
const stakingContractABI = [...]; // Masukkan ABI Staking Contract

// Inisialisasi Web3
async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Meminta akses MetaMask
        accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(quantumVaultABI, vaultAddress);
        checkVaultStatus(); // Periksa status vault pengguna
    } else {
        alert("Pasang MetaMask untuk mengakses!");
    }
}

// Memeriksa status Vault
async function checkVaultStatus() {
    const vaultStatus = await contract.methods.getVaultStatus(accounts[0]).call();
    document.getElementById("vaultStatus").textContent = vaultStatus ? "Accessed" : "Not Accessed";
}

// Akses Vault
async function accessVault() {
    const tier = await getUserTier();
    if (tier === "4") { // Hanya Quantum Tier boleh akses vault
        await contract.methods.accessVault().send({ from: accounts[0] });
        document.getElementById("vaultStatus").textContent = "Vault Accessed!";
    } else {
        document.getElementById("vaultStatus").textContent = "Only Quantum Tier can access!";
    }
}

// Claim Reward
async function claimReward() {
    const reward = await contract.methods.claimReward().send({ from: accounts[0] });
    const rewardAmount = web3.utils.fromWei(reward, 'ether');
    document.getElementById("vaultReward").textContent = `${rewardAmount} GPROOF`;
}

// Dapatkan Tier Pengguna dari kontrak Staking
async function getUserTier() {
    const stakingContract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);
    const tier = await stakingContract.methods.getUserTier(accounts[0]).call();
    return tier; // Mengembalikan nilai tier (contoh: 4 untuk Quantum)
}

// Inisialisasi dan tetapkan event listener
window.onload = () => {
    initWeb3();

    // Event listener untuk akses vault
    document.getElementById("accessVaultBtn").addEventListener("click", accessVault);

    // Event listener untuk claim ganjaran
    document.getElementById("claimRewardBtn").addEventListener("click", claimReward);
};
