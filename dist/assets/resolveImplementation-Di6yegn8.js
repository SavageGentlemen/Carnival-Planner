import { t as getAddress, af as getBytecode, F as getContract, ag as isAddress, a1 as getRpcClient } from "./index-CXUot43X.js";
import { r as readContract } from "./bundler-Dmn5v2kr.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
async function eth_getStorageAt(request, params) {
  return await request({
    method: "eth_getStorageAt",
    params: [
      getAddress(params.address),
      params.position,
      params.blockTag ?? "latest"
    ]
  });
}
function extractMinimalProxyImplementationAddress(bytecode) {
  if (!bytecode.startsWith("0x")) {
    bytecode = `0x${bytecode}`;
  }
  if (bytecode.startsWith("0x363d3d373d3d3d363d73")) {
    const implementationAddress = bytecode.slice(22, 62);
    return `0x${implementationAddress}`;
  }
  if (bytecode.startsWith("0x36603057343d5230")) {
    const implementationAddress = bytecode.slice(122, 122 + 40);
    return `0x${implementationAddress}`;
  }
  if (bytecode.startsWith("0x3d3d3d3d363d3d37363d73")) {
    const implementationAddress = bytecode.slice(24, 24 + 40);
    return `0x${implementationAddress}`;
  }
  if (bytecode.startsWith("0x366000600037611000600036600073")) {
    const implementationAddress = bytecode.slice(32, 32 + 40);
    return `0x${implementationAddress}`;
  }
  if (bytecode.startsWith("0x36600080376020600036600073")) {
    const implementationAddress = bytecode.slice(28, 28 + 40);
    return `0x${implementationAddress}`;
  }
  if (bytecode.startsWith("0x365f5f375f5f365f73")) {
    const implementationAddress = bytecode.slice(20, 60);
    return `0x${implementationAddress}`;
  }
  if (bytecode.length === 48 && bytecode.startsWith("0xef0100")) {
    const implementationAddress = bytecode.slice(8, 48);
    return `0x${implementationAddress}`;
  }
  return void 0;
}
const AddressZero = "0x0000000000000000000000000000000000000000";
const ZERO_BYTES32 = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function resolveImplementation(contract) {
  const [originalBytecode, beacon] = await Promise.all([
    getBytecode(contract),
    getBeaconFromStorageSlot(contract)
  ]);
  const minimalProxyImplementationAddress = extractMinimalProxyImplementationAddress(originalBytecode);
  if (minimalProxyImplementationAddress) {
    return {
      address: minimalProxyImplementationAddress,
      bytecode: await getBytecode(getContract({
        ...contract,
        address: minimalProxyImplementationAddress
      }))
    };
  }
  if (beacon && beacon !== AddressZero) {
    contract = getContract({
      ...contract,
      address: beacon
    });
  }
  const implementations = await Promise.all([
    getImplementationFromStorageSlot(contract),
    getImplementationFromContractCall(contract)
  ]);
  for (const implementationAddress of implementations) {
    if (implementationAddress && isAddress(implementationAddress) && implementationAddress !== AddressZero) {
      const implementationBytecode = await getBytecode({
        ...contract,
        address: implementationAddress
      });
      if (implementationBytecode === "0x") {
        return {
          address: contract.address,
          bytecode: originalBytecode
        };
      }
      return {
        address: implementationAddress,
        bytecode: implementationBytecode
      };
    }
  }
  return { address: contract.address, bytecode: originalBytecode };
}
async function getBeaconFromStorageSlot(contract) {
  const rpcRequest = getRpcClient({
    chain: contract.chain,
    client: contract.client
  });
  try {
    const proxyStorage = await eth_getStorageAt(rpcRequest, {
      address: contract.address,
      position: "0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50"
    });
    if (proxyStorage.length >= 40) {
      return `0x${proxyStorage.slice(-40)}`;
    }
    return void 0;
  } catch {
    return void 0;
  }
}
async function getImplementationFromStorageSlot(contract) {
  const rpcRequest = getRpcClient({
    chain: contract.chain,
    client: contract.client
  });
  try {
    const proxyStoragePromises = [
      eth_getStorageAt(rpcRequest, {
        address: contract.address,
        position: "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      }),
      eth_getStorageAt(rpcRequest, {
        address: contract.address,
        position: (
          // keccak256("matic.network.proxy.implementation") - used in polygon USDT proxy: https://polygonscan.com/address/0xc2132d05d31c914a87c6611c10748aeb04b58e8f#code
          "0xbaab7dbf64751104133af04abc7d9979f0fda3b059a322a8333f533d3f32bf7f"
        )
      }),
      eth_getStorageAt(rpcRequest, {
        address: contract.address,
        position: (
          // keccak256("org.zeppelinos.proxy.implementation") - e.g. base USDC proxy: https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913#code
          "0x7050c9e0f4ca769c69bd3a8ef740bc37934f8e2c036e5a723fd8ee048ed3f8c3"
        )
      })
    ];
    const proxyStorages = await Promise.all(proxyStoragePromises);
    const proxyStorage = proxyStorages.find((storage) => storage !== ZERO_BYTES32);
    return proxyStorage ? `0x${proxyStorage.slice(-40)}` : AddressZero;
  } catch {
    return void 0;
  }
}
const UPGRADEABLE_PROXY_ABI = {
  inputs: [],
  name: "implementation",
  outputs: [
    {
      internalType: "address",
      name: "",
      type: "address"
    }
  ],
  stateMutability: "view",
  type: "function"
};
async function getImplementationFromContractCall(contract) {
  try {
    return await readContract({ contract, method: UPGRADEABLE_PROXY_ABI });
  } catch {
    return void 0;
  }
}
export {
  resolveImplementation
};
