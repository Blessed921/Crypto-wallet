require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY],
      // gas: 2100000, // Set the gas limit (if needed)
      // gasPrice: 20000000000, // Set the gas price (if needed)
    }
  }
};
