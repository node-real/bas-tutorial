const { ethers } = require("ethers");

const contract = require("./constract.js")
const utils = require("./utils.js")

async function vote(proposalId) {
  console.log("vote: " + proposalId)

  const signer = utils.getSigner()
  const goveranceContract = contract.goveranceContract.connect(signer)
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
  console.log("proposal state: " + await goveranceContract.state(proposalId));
  console.log("before vote")
  let tx = await goveranceContract.castVote(proposalId, 1);
  console.log("after vote:", tx.hash)
  await tx.wait(1);
}

module.exports = {
  vote: vote
}