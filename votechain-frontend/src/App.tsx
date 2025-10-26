/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import VoteChainABI from "./VoteChainABI.json";
import ConnectWallet from "./components/ConnectWallet";
import ElectionList from "./components/ElectionList";
import ElectionPage from "./components/ElectionPage";

const CONTRACT_ADDRESS = "0x2967e5717899ca052C793ea1C5FD3b8DB4BCDCf8";

function App() {
  const [account, setAccount] = useState<string>("");
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [selectedElection, setSelectedElection] = useState<number | null>(null);

  // connect to MetaMask
  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const [addr] = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];
    setProvider(provider);
    setAccount(addr);
  }

  // load contract when connected
  useEffect(() => {
    if (provider && account) {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, VoteChainABI.abi, provider);
      setContract(contract);
    }
  }, [provider, account]);

  // page logic
  if (!account)
    return <ConnectWallet connectWallet={connectWallet} />;

  if (account && contract && selectedElection === null)
    return (
      <ElectionList
        contract={contract}
        account={account}
        onSelect={(id) => setSelectedElection(id)}
      />
    );

  if (selectedElection !== null && contract)
    return (
      <ElectionPage
        electionId={selectedElection}
        contract={contract}
        onBack={() => setSelectedElection(null)}
      />
    );

  return null;
}

export default App;