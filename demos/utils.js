const config = require("./config.js")

function getProvider() {
    const provider = new ethers.providers.JsonRpcProvider(config.rpcURL);
    return provider;
}

function getSigner() {
    const provider = new ethers.providers.JsonRpcProvider(config.rpcURL);
    const signer = new ethers.Wallet(config.privateKey, provider);
    return signer;
}

module.exports = {
    getProvider,
    getSigner
}