const { utils, ethers } = require("ethers");
const contract = require("./constract.js")
const putils = require("./utils.js")

async function execute(description, address, value, data) {
  const signer = putils.getSigner()
  const goveranceContract = contract.goveranceContract.connect(signer)

  const timer = ms => new Promise(res => setTimeout(res, ms));
  let state;
  do {
    state = await goveranceContract.state(proposalId);
    console.log("state: ", state);
    timer(10000000).then(_ => console.log("sleep"));
  } while (state != 4);

  const executeTx = await goveranceContract.execute([address], [value], [data], utils.keccak256(utils.toUtf8Bytes(description)), {
    gasLimit: 3000000,
  });
  const executeReceipt = await executeTx.wait(1);
  console.log('executeReciept: ', executeReceipt);
  const proposalId = executeReceipt.events[0].args.proposalId;
  console.log(`Proposed with proposal ID:\n  ${proposalId}`);
}

module.exports = {
  execute: execute,
}

