const { ethers } = require("ethers");

const contract = require("./constract.js")
const utils = require("./utils.js")

const p = require("./propose.js")
const v = require("./vote.js")
const s = require("./state.js")
const e = require("./execute.js")

async function params() {
    
    // todo: need fill info 
    const description = "propose: change free gas address admin";
    const upgradeSelector = "setFreeGasAddressAdmin";
    const newAddress = "0x0000000000000000000000000000000000007004"; // todo: put in the new admin address


    const transferCalldata = await contract.chainconfigContract.interface.encodeFunctionData(upgradeSelector, [newAddress]);
    console.log('transferCalldata: ', transferCalldata);
    return [description, contract.chainconfigAddress, 0, transferCalldata]
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