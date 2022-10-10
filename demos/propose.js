require("@nomiclabs/hardhat-ethers")

const contract = require("./constract.js")
const utils = require("./utils.js")

async function main() {
  const signer = utils.getSigner()
  const goveranceContract = contract.goveranceContract.connect(signer)

  // todo: need fill info 
  const description = "propose: change free gas address admin";
  const upgradeSelector = "setFreeGasAddressAdmin";
  const newAddress = "0x0000000000000000000000000000000000007004"; // todo: put in the new admin address
  console.log("address: ", newAddress);
  const transferCalldata = await contract.chainconfigContract.interface.encodeFunctionData(upgradeSelector, [newAddress]);
  console.log('transferCalldata: ', transferCalldata);

  const proposeTx = await goveranceContract.propose([contract.chainconfigAddress], [0], [transferCalldata], description, {
    gasLimit: 2000000,
  });
  const proposeReceipt = await proposeTx.wait(1);
  const proposalId = proposeReceipt.events[0].args.proposalId;
  console.log(`Proposed with proposal ID:\n  ${proposalId}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
