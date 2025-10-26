import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying MultiVoteChain...");

  const MultiVoteChain = await ethers.getContractFactory("MultiVoteChain");
  const contract = await MultiVoteChain.deploy();

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log(`✅ MultiVoteChain deployed to: ${contractAddress}`);

  // (Optional) Create a test election directly after deploy
  const transaction1 = await contract.createElection("Region 1", ["Mary", "Bob"]);
  await transaction1.wait();
  console.log("🗳️ Created test election 1");

  const transaction2 = await contract.createElection("Region 2", ["John", "Bill"]);
  await transaction2.wait();
  console.log("🗳️ Created test election 2");

  const transaction3 = await contract.createElection("Region 3", ["Alice", "Jane"]);
  await transaction3.wait();
  console.log("🗳️ Created test election 3");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
