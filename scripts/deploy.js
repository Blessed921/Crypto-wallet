// This script deploys the MyToken contract to the Ethereum network using Hardhat.
// It requires the Hardhat environment and uses ethers.js to interact with the Ethereum blockchain.
// Ensure you have the necessary dependencies installed:
const hre = require("hardhat");

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with address:", deployer.address);

  // Define the initial supply (adjust if necessary based on your contract's decimals)
  const initialSupply = hre.ethers.parseUnits("1000", 18); // 1000 tokens with 18 decimals

  // Get the contract factory and deploy with the required constructor argument
  const Token = await hre.ethers.getContractFactory("MyToken");
  const myToken = await Token.deploy(initialSupply);

  await myToken.waitForDeployment();
  console.log("Contract deployed to:", await myToken.getAddress());
};

// Run the function and handle errors
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
