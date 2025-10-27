/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import HelpModal from "./HelpModal";


interface Props {
  electionId: number;
  contract: ethers.Contract;
  onBack: () => void;
}

export default function ElectionPage({ electionId, contract, onBack }: Props) {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  

  async function loadData() {
    const cands = await contract.getCandidates(electionId);
    const results: Record<string, number> = {};
    for (const c of cands) {
      const count = await contract.getVotes(electionId, c);
      results[c] = Number(count);
    }
    setCandidates(cands);
    setVotes(results);
  }

  async function vote(candidate: string) {
  try {
    setLoading(true);

    const provider = new ethers.BrowserProvider(window.ethereum!);
    const signer = await provider.getSigner();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const signed = contract.connect(signer) as any;

    const tx = await signed.vote(electionId, candidate);
    await tx.wait();

    alert(`✅ Voted for ${candidate}`);
    await loadData();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    alert(err.reason || err.message);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    loadData();
  }, [electionId]);

  return (

    
    <div style={{ textAlign: "center", padding: "2rem" }}  className="center-page">
      <button onClick={onBack}>⬅ Back</button>
      <h2>Election #{electionId}</h2>
      {loading && <p>⏳ Processing...</p>}
      {candidates.map((c) => (
        <div key={c} style={{ margin: "1rem" }}>
          <strong>{c}</strong> — {votes[c] ?? 0} votes{" "}
          <button disabled={loading} onClick={() => vote(c)}>
            Vote
          </button>
        </div>
      ))}
      <HelpModal /> 
    </div>
  );
}
