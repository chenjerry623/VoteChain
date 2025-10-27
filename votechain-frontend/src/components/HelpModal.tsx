import { useState } from "react";
import "./HelpModal.css";

export default function HelpModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating help button */}
      <button className="help-button" onClick={() => setOpen(true)}>
        ❔ Help
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="help-overlay" onClick={() => setOpen(false)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <h2>🧭 How to Use VoteChain</h2>
            <ol>
              <li>
                <strong>Install MetaMask:</strong>{" "}
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download MetaMask
                </a>{" "}
                and create your wallet.
              </li>
              <li>
                <strong>Switch to Sepolia Test Network:</strong>  
                Click the top right dropdown in MetaMask → select Networks → scroll down and check "show test networks" → select Sepolia.
              </li>
              <li>
                <strong>Get free Sepolia ETH:</strong>{" "}
                Visit{" "}
                <a
                  href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Cloud Sepolia Faucet
                </a>{" "}
                → paste your wallet address and claim free test ETH.
              </li>
              <li>
                Return here, connect your wallet, and start voting 🗳️
              </li>
            </ol>

            <button className="close-button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}