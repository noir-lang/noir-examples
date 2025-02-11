import { useContext, useMemo } from 'react';
import { MerkleTreeContext } from '../providers/merkleTree.tsx';
import merkle from '../utils/mt/merkle.json' with { type: 'json' };
import { useAccount, useConnect } from 'wagmi';
import { Address } from 'viem';

interface UseEligibleAddressesResult {
  eligibleAddresses: string[];
  nonEligibleAddresses: string[];
  isLoading: boolean;
}

export function useEligibleAddresses(addresses: Address[] | undefined): UseEligibleAddressesResult {
  const merkleTree = useContext(MerkleTreeContext);

  return useMemo(() => {
    if (!merkleTree) {
      return {
        eligibleAddresses: [] as `0x${string}`[],
        nonEligibleAddresses: [] as `0x${string}`[],
        isLoading: true,
      };
    }

    // Get all addresses from merkle.json
    const eligibleAddresses = addresses?.filter(
      address => merkleTree.indexOf(BigInt(address)) !== -1,
    ) as `0x${string}`[];

    // For now, we don't have a list of non-eligible addresses
    // This would typically come from your application's state or another source
    const nonEligibleAddresses: string[] =
      addresses?.filter(address => merkleTree.indexOf(BigInt(address)) === -1) ?? [];

    return {
      eligibleAddresses,
      nonEligibleAddresses,
      isLoading: false,
    };
  }, [merkleTree, addresses]);
}
