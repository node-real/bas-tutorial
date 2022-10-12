const { ethers } = require("ethers");

const contract = require("./constract.js")
const utils = require("./utils.js")

const p = require("./propose.js")
const v = require("./vote.js")
const s = require("./state.js")
const e = require("./execute.js")

async function params() {
    
    // todo: need fill info 
    // note: before change validator owner, you would best claim your delegate fee first.
    const description = "propose: change validator owner";
    const upgradeSelector = "changeValidatorOwner";
    const validatorAddress = "0x0000000000000000000000000000000000000000"; // todo: put in the validator address
    const newOwner = "0x0000000000000000000000000000000000000000"; // todo: put in the new owner address


    const transferCalldata = await contract.stakingContract.interface.encodeFunctionData(upgradeSelector, [validatorAddress, newOwner]);
    console.log('transferCalldata: ', transferCalldata);
    return [description, contract.stakingAddress, 0, transferCalldata]
}

async function propose() {
    const param = await params()
    await p.propose(param[0], param[1], param[2], param[3])
}

async function vote(proposalId) {
    await v.vote(proposalId)
}

async function state(proposalId) {
    await s.state(proposalId)
}

async function execute() {
    const param = await params()
    await e.execute(param[0], param[1], param[2], param[3])
}

async function main() {
    const myArgs = process.argv.slice(2);
    console.log('myArgs: ', myArgs);

    switch (myArgs[0]) {
        case 'propose':
            await propose();
            break;
        case 'vote':
            await vote(myArgs[1]);
            break;
        case 'state':
            await state(myArgs[1]);
            break;
        case 'execute':
            await execute();
            break;
        default:
            console.log('args: propose | vote proposalId | state proposalId | execute');
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });