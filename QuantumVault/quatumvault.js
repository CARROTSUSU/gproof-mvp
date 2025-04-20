let web3;
let contract;
let accounts;
const vaultAddress = '0xYourQuantumVaultAddress'; // Alamat kontrak QuantumVault
const stakingContractAddress = '0xYourStakingContractAddress'; // Alamat kontrak Staking
const rewardTokenAddress = '0xYourGPRFTokenAddress'; // Alamat kontrak Token GPRF

// ABI untuk QuantumVault dan Staking Contract
const quantumVaultABI = [...]; // Masukkan ABI untuk QuantumVault.sol
const stakingContractABI = [...]; // Masukkan ABI untuk Staking Contract

// Inisialisasi Web3 dan kontrak
async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Meminta akses wallet Metamask
        accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(quantumVaultABI, vaultAddress);
        checkUserInfo(); // Memanggil fungsi untuk mendapatkan maklumat pengguna
    } else {
        alert("Sila pasang MetaMask untuk sambung ke blockchain.");
    }
}

// Memeriksa maklumat pengguna dari kontrak staking (Tier, Reputasi, Stake)
async function checkUserInfo() {
    const stakingContract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);
    const userTier = await stakingContract.methods.userTier(accounts[0]).call();
    const userReputation = await stakingContract.methods.userReputation(accounts[0]).call();
    const userStake = await stakingContract.methods.userStake(accounts[0]).call();

    document.getElementById("user-tier").textContent = getTierName(userTier);
    document.getElementById("user-reputation").textContent = userReputation;
    document.getElementById("user-stake").textContent = web3.utils.fromWei(userStake, 'ether');
}

// Menukar nombor tier kepada nama tier
function getTierName(tier) {
    switch(tier) {
        case '4': return "Quantum";
        case '3': return "Gold";
        case '2': return "Silver";
        case '1': return "Bronze";
        default: return "Unknown";
    }
}

// Akses Vault: Membolehkan pengguna mengakses vault jika mereka berada di Quantum Tier
async function accessVault() {
    const tier = await contract.methods.userTier(accounts[0]).call();
    if (tier === "4") {
        await contract.methods.accessVault().send({ from: accounts[0] });
        document.getElementById("vault-status").textContent = "Vault Diakses!";
    } else {
        document.getElementById("vault-status").textContent = "Anda perlu berada di Quantum Tier untuk akses vault.";
    }
}

// Claim Reward: Membolehkan pengguna claim ganjaran dari vault
async function claimReward() {
    const vaultBalance = await contract.methods.getVaultBalance().call();
    if (vaultBalance > 0) {
        await contract.methods.claimReward(web3.utils.toWei('10', 'ether')).send({ from: accounts[0] });
        document.getElementById("vault-status").textContent = "Ganjaran Berjaya Diambil!";
    } else {
        document.getElementById("vault-status").textContent = "Tiada ganjaran yang tersedia.";
    }
}

// Fungsi untuk memanggil dan melaksanakan fungsi utama
window.onload = () => {
    initWeb3();

    // Tetapkan event listener untuk button "Access Vault"
    document.getElementById("access-vault-btn").addEventListener("click", accessVault);

    // Tetapkan event listener untuk button "Claim Reward"
    document.getElementById("claim-reward-btn").addEventListener("click", claimReward);
};
