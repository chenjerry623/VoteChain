import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const { ALCHEMY_API_URL, PRIVATE_KEY } = process.env;

const config = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: ALCHEMY_API_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;