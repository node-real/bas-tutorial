require("@nomiclabs/hardhat-ethers");

const contract = require("./constract.js")
const utils = require("./utils.js")

async function vote(proposalID) {

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
  console.log("proposal state: " + await goveranceContract.state(proposalID));
  let tx = await goveranceContract.castVote(proposalID, 1);
  await tx.wait(1);
}

async function main() {

  const proposalID = ""; // todo: fill proposal id from proposal step.
  await vote(privateKey, proposalID)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
