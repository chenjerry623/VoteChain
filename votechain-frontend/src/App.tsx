/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import VoteChainABI from "./VoteChainABI.json";

const CONTRACT_ADDRESS = "0x2967e5717899ca052C793ea1C5FD3b8DB4BCDCf8";

function App() {
  const [account, setAccount] = useState<string>("");
  const [candidates, setCandidates] = useState<string[]>([]);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  // Connect wallet
  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }
    const [addr] = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];
    setAccount(addr);
  }

  // Load candidates + vote counts
  async function loadContractData() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum!);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        VoteChainABI.abi,
        provider
      );

      const cands = await contract.getCandidates();
      const results: Record<string, number> = {};

      for (const name of cands) {
        const count = await contract.getVotes(name);
        results[name] = Number(count);
      }

      setCandidates(cands);
      setVotes(results);
    } catch (err) {
      console.error(err);
    }
  }

  // Vote for a candidate
  async function vote(candidate: string) {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        VoteChainABI.abi,
        signer
      );

      const tx = await contract.vote(candidate);
      await tx.wait(); // wait for block confirmation
      alert(`✅ Vote submitted for ${candidate}!`);
      await loadContractData(); // refresh results
    } catch (err: any) {
      alert(`❌ ${err.reason || err.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (account) loadContractData();
  }, [account]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>VoteChain 🗳️</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected as {account}</p>
      )}

      {loading && <p>⏳ Waiting for transaction...</p>}

      {candidates.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          {candidates.map((c) => (
            <div key={c} style={{ margin: "1rem 0" }}>
              <strong>{c}</strong> — {votes[c] ?? 0} votes{" "}
              <button onClick={() => vote(c)} disabled={loading}>
                Vote
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;