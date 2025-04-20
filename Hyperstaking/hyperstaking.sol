// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract HyperStaking {
    IERC20 public gproofToken;
    address public owner;

    struct StakeInfo {
        uint256 amount;
        uint256 lastClaim;
    }

    mapping(address => StakeInfo) public stakes;
    uint256 public rewardRate = 1e16; // 0.01 GPROOF per second per token (adjust ikut keperluan)

    constructor(address _gproofToken) {
        gproofToken = IERC20(_gproofToken);
        owner = msg.sender;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        gproofToken.transferFrom(msg.sender, address(this), amount);

        _claimReward(msg.sender);

        stakes[msg.sender].amount += amount;
        stakes[msg.sender].lastClaim = block.timestamp;
    }

    function claimReward() external {
        _claimReward(msg.sender);
        stakes[msg.sender].lastClaim = block.timestamp;
    }

    function _claimReward(address user) internal {
        StakeInfo storage info = stakes[user];
        if (info.amount == 0) return;

        uint256 timePassed = block.timestamp - info.lastClaim;
        uint256 reward = (info.amount * rewardRate * timePassed) / 1e18;

        if (reward > 0) {
            gproofToken.transfer(user, reward);
        }
    }

    function getStakedAmount(address user) external view returns (uint256) {
        return stakes[user].amount;
    }

    // Optional: owner boleh ubah kadar ganjaran
    function updateRewardRate(uint256 newRate) external {
        require(msg.sender == owner, "Only owner");
        rewardRate = newRate;
    }
}
