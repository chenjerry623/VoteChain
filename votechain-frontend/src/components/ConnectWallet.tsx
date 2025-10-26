interface Props {
  connectWallet: () => void;
}

export default function ConnectWallet({ connectWallet }: Props) {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1>VoteChain 🗳️</h1>
      <p style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "1.5rem" }}>
        Welcome to VoteChain — a decentralized voting platform powered by
        Ethereum. Each election is transparent, secure, and verifiable on the
        blockchain.
      </p>
      <button
        onClick={connectWallet}
        style={{
          marginTop: "2rem",
          padding: "1rem 2rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
}