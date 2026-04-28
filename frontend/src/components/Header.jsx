const Header = ({ account }) => {
  const truncateAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center font-bold text-lg">
              M
            </div>
            <div>
              <h1 className="text-xl font-bold">MyToken</h1>
              <p className="text-xs text-gray-400">Crypto Wallet</p>
            </div>
          </div>

          {account && (
            <div className="bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
              <p className="text-sm text-gray-400">Connected</p>
              <p className="text-sm font-mono font-semibold">{truncateAddress(account)}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
