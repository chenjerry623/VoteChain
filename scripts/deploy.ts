import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";

async function main() {
  const candidates = ["Alice", "Bob", "Charlie"];
  const VoteChain = await ethers.getContractFactory("VoteChain");
  const contract = await VoteChain.deploy(candidates);
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log(`✅ VoteChain deployed to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});