import { useEffect, useState } from "react";
import { ethers } from "ethers";


interface ElectionListProps {
  contract: ethers.Contract;
  account: string;
  onSelect: (id: number) => void;
}

export default function ElectionList({ contract, account, onSelect }: ElectionListProps) {
  const [elections, setElections] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadElections() {
    try {
      const [names, ids] = await contract.getAllElections();
      console.log("🧭 Raw elections fetched:", names, ids);
      const list = ids.map((id: bigint, i: number) => ({
        id: Number(id),
        name: names[i],
      }));
      setElections(list);
    } catch (err) {
      console.error("Error loading elections:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadElections();
  }, [contract]);

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading elections...</p>;

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}  className="center-page">
      <h2>Welcome, {account.slice(0, 6)}...</h2>
      <h3>Select an election:</h3>

      {elections.length === 0 && <p>No elections available.</p>}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {elections.map((e) => (
          <div
            key={e.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem",
              width: "300px",
              margin: "1rem",
            }}
          >
            <h3>{e.name}</h3>
            <button onClick={() => onSelect(e.id)}>Enter</button>
          </div>
        ))}
      </div>
    </div>
  );
}
