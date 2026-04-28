import { useState } from "react";
import { ethers } from "ethers";
import "./styles.css";
import abiArtifact from "../abi/MyToken.json";

const abi = abiArtifact.abi;

const TransferToken = ({ provider, account }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success', 'error', 'info'
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  const isValidAddress = (addr) => {
    try {
      return ethers.isAddress(addr);
    } catch {
      return false;
    }
  };

  const isValidAmount = (amt) => {
    try {
      const num = parseFloat(amt);
      return num > 0 && !isNaN(num);
    } catch {
      return false;
    }
  };

  const transfer = async () => {
    try {
      setMessage("");
      setTxHash("");
      setMessageType("");

      // Validation
      if (!recipient.trim()) {
        setMessage("Please enter a recipient address");
        setMessageType("error");
        return;
      }

      if (!isValidAddress(recipient)) {
        setMessage("Invalid Ethereum address format");
        setMessageType("error");
        return;
      }

      if (!amount.trim()) {
        setMessage("Please enter an amount");
        setMessageType("error");
        return;
      }

      if (!isValidAmount(amount)) {
        setMessage("Amount must be a positive number");
        setMessageType("error");
        return;
      }

      if (!contractAddress) {
        setMessage("Contract address not configured");
        setMessageType("error");
        return;
      }

      setIsLoading(true);
      setMessageType("info");
      setMessage("Processing transaction...");

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Estimate gas
      try {
        const gasEstimate = await contract.transfer.estimateGas(
          recipient,
          ethers.parseUnits(amount, 18)
        );
        console.log("Gas estimate:", gasEstimate.toString());
      } catch (gasErr) {
        console.warn("Gas estimation warning:", gasErr);
      }

      // Send transaction
      const tx = await contract.transfer(
        recipient,
        ethers.parseUnits(amount, 18)
      );

      setMessage("Transaction submitted! Waiting for confirmation...");
      setTxHash(tx.hash);

      const receipt = await tx.wait();

      if (receipt && receipt.status === 1) {
        setMessageType("success");
        setMessage(
          `✅ Transfer successful! Transaction confirmed`
        );
        setRecipient("");
        setAmount("");
      } else {
        setMessageType("error");
        setMessage("Transaction failed. Please try again.");
      }
    } catch (err) {
      console.error("Transfer error:", err);
      setMessageType("error");

      if (err.code === "INSUFFICIENT_FUNDS") {
        setMessage("Insufficient balance for this transaction");
      } else if (err.code === "ACTION_REJECTED") {
        setMessage("Transaction was rejected");
      } else if (err.message.includes("reverted")) {
        setMessage("Transaction reverted. Check your balance and recipient.");
      } else {
        setMessage("Transfer failed. Please check your inputs and try again.");
      }
      setTxHash("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const isFormValid = isValidAddress(recipient) && isValidAmount(amount);

  return (
    <div className="card fade-in">
      <h2 className="mb-4 flex items-center gap-2">
        <span className="text-2xl">📤</span>
        Transfer Tokens
      </h2>

      {message && (
        <div className={`mb-4 flex items-start gap-2 ${
          messageType === 'success' ? 'toast-success' :
          messageType === 'error' ? 'toast-error' :
          'toast-info'
        }`}>
          <span className="text-lg mt-0.5">
            {messageType === 'success' ? '✅' :
             messageType === 'error' ? '❌' :
             'ℹ️'}
          </span>
          <div className="flex-1">
            <span>{message}</span>
            {txHash && (
              <p className="text-xs mt-2 break-all font-mono">
                {txHash}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium mb-2">
            Recipient Address
          </label>
          <input
            id="recipient"
            type="text"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={isLoading}
            className="input-field"
            aria-label="Recipient Address"
          />
          {recipient && !isValidAddress(recipient) && (
            <p className="text-xs text-red-400 mt-1">Invalid address format</p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Amount (MTK)
          </label>
          <input
            id="amount"
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
            disabled={isLoading}
            className="input-field"
            aria-label="Transfer Amount"
          />
          {amount && !isValidAmount(amount) && (
            <p className="text-xs text-red-400 mt-1">Must be a positive number</p>
          )}
        </div>

        <button
          onClick={transfer}
          disabled={isLoading || !isFormValid}
          className="btn-primary w-full flex items-center justify-center gap-2"
          aria-label="Send Tokens"
        >
          {isLoading ? (
            <>
              <span className="spin">⏳</span>
              Sending...
            </>
          ) : (
            <>
              <span>📤</span>
              Send Tokens
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        ⚠️ Always verify the recipient address before confirming the transaction
      </p>
    </div>
  );
};

export default TransferToken;