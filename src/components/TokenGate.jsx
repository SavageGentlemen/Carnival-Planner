import React from 'react';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { getContract } from 'thirdweb';
import { defineChain } from 'thirdweb/chains';
import { thirdwebClient } from '../thirdwebClient';
import { Lock, Wallet } from 'lucide-react';
import { ConnectButton } from 'thirdweb/react';

// Easily swappable network configuration
const DEFAULT_CHAIN_ID = 84532; // Base Sepolia (testnet)
// For Base Mainnet, use 8453

export default function TokenGate({ 
  contractAddress, 
  tokenId = 0n, 
  chainId = DEFAULT_CHAIN_ID,
  children,
  fallbackMessage = "You need a specific Soca Passport NFT to access this content."
}) {
  const account = useActiveAccount();

  // Initialize the contract
  const contract = contractAddress ? getContract({
    client: thirdwebClient,
    chain: defineChain(chainId),
    address: contractAddress,
  }) : null;

  // Read balance if contract exists and account is connected
  const { data: balance, isLoading, error } = useReadContract({
    contract,
    method: "function balanceOf(address account, uint256 id) view returns (uint256)",
    params: [account?.address || "0x0000000000000000000000000000000000000000", tokenId],
    queryOptions: {
        enabled: !!contract && !!account,
    }
  });

  if (!contractAddress) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center">
        TokenGate Configuration Error: contractAddress is required.
      </div>
    );
  }

  // Not connected state
  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-900 border border-gray-800 rounded-2xl text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Wallet className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Connect Wallet</h3>
        <p className="text-gray-400 mb-6 max-w-md">
          {fallbackMessage}
        </p>
        <ConnectButton client={thirdwebClient} />
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-900 border border-gray-800 rounded-2xl animate-pulse">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4" />
        <p className="text-gray-400">Verifying NFT ownership...</p>
      </div>
    );
  }

  // Error state (Usually means contract doesn't exist or isn't standard ERC1155)
  // We log the error but still show the Access Denied screen instead of a broken UI.
  if (error) {
    console.warn("TokenGate checking failed:", error.message);
  }

  // Access Denied state (balance is 0, or there was a read error like empty contract)
  if (error || balance === undefined || balance === 0n) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl text-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl" />
        
        <div className="relative z-10 w-20 h-20 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-xl border border-gray-700">
          <Lock className="w-8 h-8 text-gray-400" />
        </div>
        
        <h3 className="relative z-10 text-2xl font-black text-white mb-3 tracking-tight">VIP Access Restricted</h3>
        <p className="relative z-10 text-gray-400 mb-6 max-w-md">
          {fallbackMessage}
        </p>
        
        <div className="relative z-10 flex flex-col gap-3">
          <p className="text-xs font-mono text-gray-500 bg-gray-900/80 px-3 py-1.5 rounded-lg border border-gray-800">
            Checking Contract: {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)} | Token ID: {tokenId.toString()}
          </p>
          <div className="mt-2 scale-90">
             <ConnectButton client={thirdwebClient} />
          </div>
        </div>
      </div>
    );
  }

  // Access Granted!
  return <>{children}</>;
}
