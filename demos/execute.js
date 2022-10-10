require("@nomiclabs/hardhat-ethers");

const { utils } = require("ethers");
const contract = require("./constract.js")
const putils = require("./utils.js")

async function main() {
    const signer = putils.getSigner()
    const goveranceContract = contract.goveranceContract.connect(signer)

  // todo: need fill info 
  const description = "propose: change free gas address admin";
  const upgradeSelector = "setFreeGasAddressAdmin";
  const newAddress = "0x"; // todo: put in the new admin address
  console.log("address: ", newAddress);
  const transferCalldata = await contract.chainconfigContract.interface.encodeFunctionData(upgradeSelector, [newAddress]);
  console.log('transferCalldata: ', transferCalldata);

  const proposalID = ""; // todo: fill proposal id from proposal step.
  
  const timer = ms => new Promise( res => setTimeout(res, ms));
  let state;
  do {
    state = await goveranceContract.state(proposalID);
    console.log("state: ", state);
    timer(10000000).then(_ => console.log("sleep"));
  } while (state != 4);

  const executeTx = await goveranceContract.execute([contract.chainconfigAddress], [0], [transferCalldata], utils.keccak256(utils.toUtf8Bytes(description)), {
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
