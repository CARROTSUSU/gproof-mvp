// staking.js
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const stakingContractAddress = "0xYourStakingContractAddress"; // ganti dengan HyperStaking.sol address sebenar
const gproofTokenAddress = "0xYourGProofTokenAddress"; // GPROOF token address

const stakingAbi = [
  "function stake(uint256 amount) public",
  "function claimReward() public",
  "function getStakedAmount(address user) public view returns (uint256)"
];

const tokenAbi = [
  "function approve(address spender, uint256 amount) public returns (bool)"
];

const stakingContract = new ethers.Contract(stakingContractAddress, stakingAbi, signer);
const tokenContract = new ethers.Contract(gproofTokenAddress, tokenAbi, signer);

async function stakeTokens() {
  const amount = document.getElementById("stakeAmount").value;
  if (!amount || amount <= 0) return alert("Enter a valid amount");

  const parsedAmount = ethers.utils.parseUnits(amount, 18);

  try {
    const tx1 = await tokenContract.approve(stakingContractAddress, parsedAmount);
    await tx1.wait();

    const tx2 = await stakingContract.stake(parsedAmount);
    await tx2.wait();

    alert("Staked successfully!");
    updateStakeInfo();
  } catch (err) {
    console.error(err);
    alert("Error while staking");
  }
}

async function claimReward() {
  try {
    const tx = await stakingContract.claimReward();
    await tx.wait();
    alert("Reward claimed!");
  } catch (err) {
    console.error(err);
    alert("Error claiming reward");
  }
}

async function updateStakeInfo() {
  try {
    const address = await signer.getAddress();
    const staked = await stakingContract.getStakedAmount(address);
    const formatted = ethers.utils.formatUnits(staked, 18);
    document.getElementById("stakeInfo").innerText = `You staked: ${formatted} GPROOF`;
  } catch (err) {
    console.error(err);
    document.getElementById("stakeInfo").innerText = "Failed to load stake info";
  }
}

window.onload = updateStakeInfo;
