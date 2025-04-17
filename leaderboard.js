import Web3 from "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js";

// Gantikan dengan ABI sebenar
const GPROOFCoreABI = [/* ABI GPROOFCore di sini */];
const GPROOFCoreAddress = "0xA7E672Eb1b11d8Fa50D4B8f9D527405189C6C581";

// Gantikan dengan GProofToken jika berbeza
const GPROOFTokenABI = [/* ABI ERC20 Token di sini */];
const GPROOFTokenAddress = "0xYourGPROOFTokenAddressHere";

let web3;
let coreContract;
let tokenContract;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    coreContract = new web3.eth.Contract(GPROOFCoreABI, GPROOFCoreAddress);
    tokenContract = new web3.eth.Contract(GPROOFTokenABI, GPROOFTokenAddress);

    loadLeaderboard();
  } else {
    alert("Please install MetaMask!");
  }
}
async function calculateTaskReward() {
    try {
        // Ambil alamat pengguna semasa
        const userAddress = await ethereum.request({ method: 'eth_requestAccounts' });

        // Ambil kontrak pintar (contoh: GPROOFCore)
        const contract = new ethers.Contract(
            "0xA7E672Eb1b11d8Fa50D4B8f9D527405189C6C581", // GPROOFCore address (semasa)
            ["function getReputation(address user) public view returns (uint256)",
             "function getTasksCompleted(address user) public view returns (uint256)"], // ABI
            provider
        );

        // Ambil reputasi dan jumlah tugas yang diselesaikan
        const reputation = await contract.getReputation(userAddress[0]);
        const tasksCompleted = await contract.getTasksCompleted(userAddress[0]);

        // Log nilai untuk debug
        console.log(`Reputasi: ${reputation}`);
        console.log(`Tugas Diselesaikan: ${tasksCompleted}`);

        // Logik untuk mengira ganjaran (contoh)
        const reward = tasksCompleted * 10 + reputation * 2; // Contoh logik ganjaran

        // Kemas kini UI untuk memaparkan ganjaran
        document.getElementById("calculatedReward").innerText = `${reward} GPROOF`;

    } catch (error) {
        console.error("Ralat semasa mengira ganjaran:", error);
    }
}

function getTier(reputation) {
  if (reputation >= 600) return { name: "Quantum", reward: 50 };
  if (reputation >= 300) return { name: "Gold", reward: 35 };
  if (reputation >= 100) return { name: "Silver", reward: 20 };
  return { name: "Bronze", reward: 10 };
}

async function loadLeaderboard() {
  try {
    const totalNodes = await coreContract.methods.getNodeCount().call();
    let nodes = [];

    for (let i = 0; i < totalNodes; i++) {
      const addr = await coreContract.methods.nodeList(i).call();
      const rep = await coreContract.methods.getReputation(addr).call();
      const tasks = await coreContract.methods.getTasksCompleted(addr).call();
      const gprfRaw = await tokenContract.methods.balanceOf(addr).call();

      const gprf = parseFloat(web3.utils.fromWei(gprfRaw, 'ether'));

      nodes.push({
        address: addr,
        reputation: parseInt(rep),
        tasks: parseInt(tasks),
        gprf
      });
    }

    nodes.sort((a, b) => b.reputation - a.reputation); // Ikut REP tertinggi

    const tbody = document.querySelector("#leaderboard-body");
    tbody.innerHTML = "";

    nodes.forEach((node, index) => {
      const row = document.createElement("tr");

      // Rank
      const rankCell = document.createElement("td");
      const badge = document.createElement("span");
      badge.textContent = index + 1;

      if (index === 0) badge.className = "rank-badge gold";
      else if (index === 1) badge.className = "rank-badge silver";
      else if (index === 2) badge.className = "rank-badge bronze";
      else badge.className = "rank-badge";

      rankCell.appendChild(badge);
      row.appendChild(rankCell);

      // Wallet Address
      const addressCell = document.createElement("td");
      addressCell.textContent = node.address.slice(0, 6) + "..." + node.address.slice(-4);
      row.appendChild(addressCell);

      // Tasks
      const taskCell = document.createElement("td");
      taskCell.textContent = node.tasks;
      row.appendChild(taskCell);

      // Reputation
      const repCell = document.createElement("td");
      repCell.textContent = node.reputation;
      row.appendChild(repCell);

      // GPRF Token
      const gprfCell = document.createElement("td");
      gprfCell.textContent = node.gprf.toFixed(2);
      row.appendChild(gprfCell);

      // Badge column (optional)
      const badgeCell = document.createElement("td");
      badgeCell.textContent =
        index === 0 ? "Legendary" :
        index === 1 ? "Elite" :
        index === 2 ? "Pro" : "-";
      row.appendChild(badgeCell);

      tbody.appendChild(row);
    });

  } catch (err) {
    console.error("Failed to load leaderboard:", err);
  }
}

window.addEventListener("load", connectWallet);
