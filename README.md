# 🗳️ VoteChain

VoteChain is a decentralized voting dApp built on the Ethereum Sepolia test network.  
It allows users to connect their MetaMask wallet, cast one on-chain vote per account, and view live vote counts verified by the blockchain.

---

## 🚀 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Smart Contracts** | Solidity (v0.8.28) |
| **Framework** | Hardhat 2 + Ethers.js v6 |
| **Blockchain** | Ethereum Sepolia Testnet |
| **Frontend** | React + TypeScript + Vite |
| **Wallet** | MetaMask (EIP-1193 Provider) |
| **Deployment** | Alchemy RPC + Vercel / Netlify |

---

## 📦 Features

- ✅ Blockchain-verified voting — 1 vote per wallet address  
- 🔗 MetaMask wallet connection (EIP-1193 standard)  
- 🧾 Real-time vote counting  
- 🧱 Smart contract deployed to Sepolia  
- 🪶 Clean, responsive UI (React + TypeScript)

---

## 🧰 Project Structure
VoteChain/
├─ contracts/ # Solidity smart contracts
│ └─ VoteChain.sol
├─ scripts/ # Deployment scripts
│ └─ deploy.ts
├─ frontend/ (votechain-frontend)
│ ├─ src/
│ │ ├─ App.tsx
│ │ ├─ VoteChainABI.json
│ │ └─ global.d.ts
│ └─ package.json
├─ hardhat.config.ts
└─ README.md


## ⚙️ Setup Instructions

create .env with:
ALCHEMY_API_URL=https://eth-sepolia.g.alchemy.com/v2/<your-alchemy-key>
PRIVATE_KEY=0x<your-metamask-private-key>

run npx hardhat compile

run npx hardhat run scripts/deploy.ts --network sepolia

# frontend:
cd votechain-frontend
npm install

in app.tsx:
const CONTRACT_ADDRESS = "0xYourContractAddressHere";
get address from the deploy.ts command

In src/VoteChainABI.json, paste the ABI array from:
../artifacts/contracts/VoteChain.sol/VoteChain.json

npm run dev

# metamask:
🪙 MetaMask Setup

Install MetaMask
 (browser extension)

Switch to Sepolia Test Network

Fund your wallet via Sepolia Faucet (https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

Click Connect Wallet in VoteChain
