import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import ConnectWallet from './components/ConnectWallet'
import TokenBalance from './components/TokenBalance'
import TransferToken from './components/TransferToken'
import Header from './components/Header'
import NetworkStatus from './components/NetworkStatus'

function App() {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Auto-connect if wallet was previously connected
  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          })
          if (accounts.length > 0) {
            setAccount(accounts[0])
            const provider = new ethers.BrowserProvider(window.ethereum)
            setProvider(provider)
            
            const network = await provider.getNetwork()
            setChainId(Number(network.chainId))
          }
        } catch (err) {
          console.error('Auto-connect error:', err)
        }
      }
    }

    connectWallet()

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          setAccount(null)
          setProvider(null)
        }
      })

      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged')
        window.ethereum.removeAllListeners('chainChanged')
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-gray-900 text-white">
      <Header account={account} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <NetworkStatus chainId={chainId} />
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ConnectWallet 
            account={account} 
            setAccount={setAccount}
            setProvider={setProvider}
            setChainId={setChainId}
          />
          
          {account && (
            <>
              <TokenBalance 
                provider={provider} 
                account={account}
              />
              <TransferToken 
                provider={provider}
                account={account}
              />
            </>
          )}
        </div>

        {!account && (
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Connect your wallet to get started</p>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-800 mt-12 py-6 text-center text-gray-500 text-sm">
        <p>MyToken Crypto Wallet • Built with React & Hardhat</p>
      </footer>
    </div>
  )
}

export default App
