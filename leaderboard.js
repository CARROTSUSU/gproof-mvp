// leaderboard.js

import Web3 from "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js";

// Ganti dengan ABI dan alamat kontrak GPROOFCore anda
const GPROOFCoreABI = [/* ABI GPROOFCore di sini */];
const GPROOFCoreAddress = "0xA7E672Eb1b11d8Fa50D4B8f9D527405189C6C581"; // Contoh Sepolia

let web3;
let contract;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    contract = new web3.eth.Contract(GPROOFCoreABI, GPROOFCoreAddress);
    loadLeaderboard();
  } else {
    alert("Please install Metamask!");
  }
}

async function loadLeaderboard() {
  try {
    const totalNodes = await contract.methods.getNodeCount().call();
    let nodes = [];

    for (let i = 0; i < totalNodes; i++) {
      const addr = await contract.methods.nodeList(i).call();
      const rep = await contract.methods.getReputation(addr).call();
      nodes.push({ address: addr, reputation: parseInt(rep) });
    }

    // Sort ikut reputasi tertinggi
    nodes.sort((a, b) => b.reputation - a.reputation);

    // Generate table rows
    const tbody = document.querySelector("#leaderboard-body");
    tbody.innerHTML = "";

    nodes.forEach((node, index) => {
      const row = document.createElement("tr");

      const rankCell = document.createElement("td");
      const badge = document.createElement("span");
      badge.textContent = index + 1;

      // Tambah kelas lencana
      if (index === 0) badge.className = "rank-badge gold";
      else if (index === 1) badge.className = "rank-badge silver";
      else if (index === 2) badge.className = "rank-badge bronze";
      else badge.className = "rank-badge";

      rankCell.appendChild(badge);
      row.appendChild(rankCell);

      const addressCell = document.createElement("td");
      addressCell.textContent = node.address.slice(0, 6) + "..." + node.address.slice(-4);
      row.appendChild(addressCell);

      const repCell = document.createElement("td");
      repCell.textContent = node.reputation;
      row.appendChild(repCell);

      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Failed to load leaderboard:", err);
  }
}

// Auto-connect
window.addEventListener("load", connectWallet);
