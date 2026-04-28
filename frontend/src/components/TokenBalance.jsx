import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./styles.css";
import abiArtifact from "../abi/MyToken.json";

const abi = abiArtifact.abi;

const TokenBalance = ({ provider, account }) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdate, setLastUpdate] = useState(null);

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  useEffect(() => {
    const fetchBalance = async () => {
      if (!provider || !account || !contractAddress) {
        setError("Missing contract address. Please set VITE_CONTRACT_ADDRESS in .env");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        
        const balanceResult = await contract.balanceOf(account);
        const formattedBalance = ethers.formatUnits(balanceResult, 18);
        
        setBalance(parseFloat(formattedBalance).toFixed(4));
        setLastUpdate(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Balance fetch error:", err);
        
        if (err.message.includes("Contract address")) {
          setError("Invalid contract address. Please check your .env configuration.");
        } else if (err.message.includes("call") || err.message.includes("Contract")) {
          setError("Unable to fetch balance. Contract may not be deployed on this network.");
        } else {
          setError("Failed to fetch balance. Please try again.");
        }
        setBalance(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();

    // Refresh balance every 10 seconds
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [provider, account, contractAddress]);

  const handleRefresh = async () => {
    setLoading(true);
    setError("");
    
    try {
      if (!provider || !account || !contractAddress) {
        setError("Missing configuration");
        return;
      }

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const balanceResult = await contract.balanceOf(account);
      const formattedBalance = ethers.formatUnits(balanceResult, 18);
      
      setBalance(parseFloat(formattedBalance).toFixed(4));
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      setError("Refresh failed");
      console.error("Refresh error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card fade-in">
      <h2 className="mb-4 flex items-center gap-2">
        <span className="text-2xl">💰</span>
        Token Balance
      </h2>

      {error && (
        <div className="toast-error mb-4 flex items-start gap-2">
          <span className="text-lg mt-0.5">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {loading && !balance ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="spin text-3xl mb-3">⏳</div>
          <p className="text-gray-400">Fetching balance...</p>
        </div>
      ) : balance !== null ? (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Your Balance</p>
            <p className="text-3xl font-bold text-blue-400">{balance}</p>
            <p className="text-xs text-gray-500 mt-2">MTK (MyToken)</p>
          </div>
          
          {lastUpdate && (
            <p className="text-xs text-gray-500">
              Last updated: {lastUpdate}
            </p>
          )}
          
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="btn-secondary w-full flex items-center justify-center gap-2"
            aria-label="Refresh Balance"
          >
            {loading ? (
              <>
                <span className="spin">⏳</span>
                Updating...
              </>
            ) : (
              <>
                <span>🔄</span>
                Refresh
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="py-8 text-center text-gray-400">
          <p className="text-sm">Connect your wallet to view balance</p>
        </div>
      )}
    </div>
  );
};

export default TokenBalance;