import { useState } from "react";
import { ethers } from "ethers";
import "./styles.css";

const ConnectWallet = ({ account, setAccount, setProvider, setChainId }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const connect = async () => {
    setError("");
    setIsLoading(true);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install it to use this app.");
      }

      const accounts = await window.ethereum.request({ 
        method: "eth_requestAccounts" 
      });

      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);

        // Initialize provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        // Get network info
        const network = await provider.getNetwork();
        setChainId(Number(network.chainId));

        // Clear any previous errors
        setError("");
      }
    } catch (err) {
      if (err.code === 4001) {
        setError("Connection was rejected. Please try again.");
      } else if (err.message.includes("not installed")) {
        setError(err.message);
      } else {
        setError("Failed to connect wallet. Please try again.");
      }
      console.error("Connection error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setProvider(null);
    setChainId(null);
    setError("");
  };

  return (
    <div className="card fade-in">
      <h2 className="mb-4 flex items-center gap-2">
        <span className="text-2xl">🔐</span>
        Wallet Connection
      </h2>

      {error && (
        <div className="toast-error mb-4 flex items-start gap-2">
          <span className="text-lg mt-0.5">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {!account ? (
        <div>
          <p className="text-gray-400 text-sm mb-4">
            Connect your MetaMask wallet to interact with the smart contract.
          </p>
          <button
            onClick={connect}
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2"
            aria-label="Connect MetaMask Wallet"
          >
            {isLoading ? (
              <>
                <span className="spin">⏳</span>
                Connecting...
              </>
            ) : (
              <>
                <span>🦊</span>
                Connect MetaMask
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Connected Address</p>
            <p className="font-mono text-sm break-all text-green-400">{account}</p>
          </div>
          <button
            onClick={disconnect}
            className="btn-secondary w-full"
            aria-label="Disconnect Wallet"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;