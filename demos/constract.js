const stakingAddress = "0x0000000000000000000000000000000000001000";
const slashingIndicatorAddress = "0x0000000000000000000000000000000000001001";
const systemRewardAddress = "0x0000000000000000000000000000000000001002";
const stakingPoolAddress = "0x0000000000000000000000000000000000007001";
const governanceAddr = "0x0000000000000000000000000000000000007002";
const chainconfigAddress = "0x0000000000000000000000000000000000007003";
const runtimeUpgradeAddress = "0x0000000000000000000000000000000000007004";

const stakingABI = require("../systemContracts/ABIs/Staking.json");
const slashingIndicatorABI = require("../systemContracts/ABIs/SlashingIndicator.json");
const systemRewardABI = require("../systemContracts/ABIs/SystemReward.json");
const stakingPoolABI = require("../systemContracts/ABIs/StakingPool.json");
const goveranceABI = require("../systemContracts/ABIs/Governance.json");
const chainconfigABI = require("../systemContracts/ABIs/ChainConfig.json");
const runtimeUpgradeABI = require("../systemContracts/ABIs/RuntimeUpgrade.json");

const stakingBytecode = require("../systemContracts/Staking.json");
const slashingIndicatorBytecode = require("../systemContracts/SlashingIndicator.json");
const systemRewardBytecode = require("../systemContracts/SystemReward.json");
const stakingPoolBytecode = require("../systemContracts/StakingPool.json");
const goveranceBytecode = require("../systemContracts/Governance.json");
const chainconfigBytecode = require("../systemContracts/ChainConfig.json");
const runtimeUpgradeBytecode = require("../systemContracts/RuntimeUpgrade.json");

const stakingContract = new ethers.Contract(stakingAddress, stakingABI);
const slashingIndicatorContract = new ethers.Contract(slashingIndicatorAddress, slashingIndicatorABI);
const systemRewardContract = new ethers.Contract(systemRewardAddress, systemRewardABI);
const stakingPoolContract = new ethers.Contract(stakingPoolAddress, stakingPoolABI);
const goveranceContract = new ethers.Contract(governanceAddr, goveranceABI);
const chainconfigContract = new ethers.Contract(chainconfigAddress, chainconfigABI);
const runtimeUpgradeContract = new ethers.Contract(runtimeUpgradeAddress, runtimeUpgradeABI);

module.exports = {
    stakingAddress: stakingAddress,
    slashingIndicatorAddress: slashingIndicatorAddress,
    systemRewardAddress: systemRewardAddress,
    stakingPoolAddress: stakingPoolAddress,
    governanceAddr: governanceAddr,
    chainconfigAddress: chainconfigAddress,
    runtimeUpgradeAddress: runtimeUpgradeAddress,

    stakingABI: stakingABI,
    slashingIndicatorABI: slashingIndicatorABI,
    systemRewardABI: systemRewardABI,
    stakingPoolABI: stakingPoolABI,
    goveranceABI: goveranceABI,
    chainconfigABI: chainconfigABI,
    runtimeUpgradeABI: runtimeUpgradeABI,

    stakingBytecode: stakingBytecode,
    slashingIndicatorBytecode: slashingIndicatorBytecode,
    systemRewardBytecode: systemRewardBytecode,
    stakingPoolBytecode: stakingPoolBytecode,
    goveranceBytecode: goveranceBytecode,
    chainconfigBytecode: chainconfigBytecode,
    runtimeUpgradeBytecode: runtimeUpgradeBytecode,

    stakingContract: stakingContract,
    slashingIndicatorContract: slashingIndicatorContract,
    systemRewardContract: systemRewardContract,
    stakingPoolContract: stakingPoolContract,
    goveranceContract: goveranceContract,
    chainconfigContract: chainconfigContract,
    runtimeUpgradeContract: runtimeUpgradeContract,
}