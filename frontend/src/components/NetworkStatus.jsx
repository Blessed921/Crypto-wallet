const NETWORKS = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  11155111: 'Sepolia Testnet',
  137: 'Polygon',
  80001: 'Mumbai Testnet',
};

const NetworkStatus = ({ chainId }) => {
  const networkName = NETWORKS[chainId] || `Chain ${chainId}`;
  
  const isTestnet = chainId && [5, 11155111, 80001].includes(chainId);
  const isMainnet = chainId === 1;

  return (
    <div className="mb-6">
      {chainId && (
        <div className={`card-sm flex items-center gap-2 ${
          isMainnet ? 'border-amber-700 bg-amber-900/20' : 
          isTestnet ? 'border-blue-700 bg-blue-900/20' : 
          'border-gray-700'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isMainnet ? 'bg-amber-500' : 'bg-blue-500'
          } animate-pulse`}></div>
          <span className="text-sm font-medium">
            {networkName}
            {isMainnet && ' ⚠️ Production'}
            {isTestnet && ' (Testnet)'}
          </span>
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;
