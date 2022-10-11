const { utils, ethers } = require("ethers");
const contract = require("./constract.js")
const putils = require("./utils.js")

async function state(proposalId) {
  const provider = putils.getProvider()
  const goveranceContract = contract.goveranceContract.connect(provider)

  const timer = ms => new Promise(res => setTimeout(res, ms));
  let state;
  do {
    state = await goveranceContract.state(proposalId);
    console.log("state: ", state);
    timer(10000000).then(_ => console.log("sleep"));
  } while (state != 4);

}

module.exports = {
    state: state,
}

