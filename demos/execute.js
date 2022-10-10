require("@nomiclabs/hardhat-ethers");

const { utils } = require("ethers");

async function main() {
    const rpcURL = "https://bas-cube-devnet.bk.nodereal.cc"; // todo: you may need change this
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
  
    const privateKey = ""; // todo: fill the privateKey. **NOTE** this is demo, NEVER do this in production.
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

  // todo: need fill info 
  const description = "propose: change free gas address admin";
  const upgradeSelector = "setFreeGasAddressAdmin";
  const newAddress = "0x"; // todo: put in the new admin address
  console.log("address: ", newAddress);
  const transferCalldata = await runtimeUpgradeContract.interface.encodeFunctionData(upgradeSelector, newAddress);
  console.log('transferCalldata: ', transferCalldata);

  const proposalID = ""; // todo: fill proposal id from proposal step.
  
  const timer = ms => new Promise( res => setTimeout(res, ms));
  let state;
  do {
    state = await goveranceContract.state(proposalID);
    console.log("state: ", state);
    timer(10000000).then(_ => console.log("sleep"));
  } while (state != 4);

  const executeTx = await goveranceContract.execute([runtimeUpgradeAddress],[0],[transferCalldata], utils.keccak256(utils.toUtf8Bytes(description)), {
    gasLimit: 3000000,
  });
  const executeReceipt = await executeTx.wait(1);
  console.log('executeReciept: ', executeReceipt);
  const proposalId = executeReceipt.events[0].args.proposalId;
  console.log(`Proposed with proposal ID:\n  ${proposalId}`);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
