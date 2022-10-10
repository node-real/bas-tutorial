const { times } = require("ramda");

require("@nomiclabs/hardhat-ethers");

async function vote(privateKey, proposalID) {

  const rpcURL = "https://bas-cube-devnet.bk.nodereal.cc"; // todo: you may need change this
  const provider = new ethers.providers.JsonRpcProvider(rpcURL);
  
  const signer = new ethers.Wallet(privateKey, provider);

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

  const stakingContract = new ethers.Contract(stakingAddress, stakingABI, signer);
  const slashingIndicatorContract = new ethers.Contract(slashingIndicatorAddress, slashingIndicatorABI, signer);
  const systemRewardContract = new ethers.Contract(systemRewardAddress, systemRewardABI, signer);
  const stakingPoolContract = new ethers.Contract(stakingPoolAddress, stakingPoolABI, signer);
  const goveranceContract = new ethers.Contract(governanceAddr, goveranceABI, signer);
  const chainconfigContract = new ethers.Contract(chainconfigAddress, chainconfigABI, signer);
  const runtimeUpgradeContract = new ethers.Contract(runtimeUpgradeAddress, runtimeUpgradeABI, signer);

//   enum ProposalState {
//     Pending,            // 0
//     Active,             // 1
//     Canceled,           // 2
//     Defeated,           // 3
//     Succeeded,          // 4
//     Queued,             // 5
//     Expired,            // 6
//     Executed            // 7
//   }
  console.log("proposal state: " + await goveranceContract.state(proposalID));
  let tx = await goveranceContract.castVote(proposalID, 1);
  await tx.wait(1);
}

async function main() {

  const privateKeys = [
    // todo: fill the privateKeys. **NOTE** this is demo, NEVER do this in production.
  ];
  const proposalID = ""; // todo: fill proposal id from proposall step.
  for (const privateKey of privateKeys) {
    console.log("vote: ", privateKey)
    await vote(privateKey, proposalID)
  }

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
