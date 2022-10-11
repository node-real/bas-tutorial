const { ethers } = require("ethers");

const contract = require("./constract.js")
const utils = require("./utils.js")

async function propose(description, address, value, data) {
  const signer = utils.getSigner()
  const goveranceContract = contract.goveranceContract.connect(signer)

  const proposeTx = await goveranceContract.propose([address], [value], [data], description, {
    gasLimit: 2000000,
  });
  const proposeReceipt = await proposeTx.wait(1);
  const proposalId = proposeReceipt.events[0].args.proposalId;
  console.log(`Proposed with proposal ID:\n  ${proposalId}`);
}

module.exports = {
  propose: propose,
}