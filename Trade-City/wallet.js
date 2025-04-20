// Wallet.js untuk sambungan MetaMask dan pengurusan transaksi
window.onload = async function () {
  // Memastikan pengguna menggunakan MetaMask
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is available!");
  } else {
    alert("MetaMask is not installed. Please install it to continue.");
    return;
  }

  // Menyambung ke dompet
  const connectWallet = async () => {
    try {
      // Meminta pengguna untuk menyambung ke dompet
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log("Connected to wallet address: " + userAddress);
      document.getElementById("wallet-address").innerText = userAddress;
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  // Menyemak status sambungan wallet
  const checkWalletConnection = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      document.getElementById("wallet-address").innerText = accounts[0];
    } else {
      document.getElementById("wallet-address").innerText = "No wallet connected";
    }
  };

  // Menerima transaksi
  const sendTransaction = async (toAddress, amount) => {
    const transactionParameters = {
      to: toAddress,
      from: ethereum.selectedAddress,
