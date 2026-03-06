require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.20",
    networks: {
        "base-sepolia": {
            url: "https://sepolia.base.org",
            accounts: process.env.DEPLOYER_PRIVATE_KEY
                ? [process.env.DEPLOYER_PRIVATE_KEY]
                : [],
            chainId: 84532,
            gasPrice: "auto"
        },
        "base": {
            url: "https://mainnet.base.org",
            accounts: process.env.DEPLOYER_PRIVATE_KEY
                ? [process.env.DEPLOYER_PRIVATE_KEY]
                : [],
            chainId: 8453,
            gasPrice: "auto"
        }
    },
    paths: {
        sources: "./contracts",
        artifacts: "./artifacts"
    }
};
