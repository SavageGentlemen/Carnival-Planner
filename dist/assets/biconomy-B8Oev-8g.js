import { r as readContract, g as encodeAbiParameters, Z as ZERO_ADDRESS } from "./bundler-Dmn5v2kr.js";
import { r as stringify, B as isHex, F as getContract, t as getAddress, G as keccak256 } from "./index-CXUot43X.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
const BATCH_ID = 0n;
async function prepareBiconomyTransaction({ account, serializableTransaction, transaction, gasless }) {
  const forwarderContract = getContract({
    address: gasless.relayerForwarderAddress,
    chain: transaction.chain,
    client: transaction.client
  });
  const nonce = await readContract({
    contract: forwarderContract,
    method: "function getNonce(address,uint256) view returns (uint256)",
    params: [account.address, BATCH_ID]
  });
  const deadline = Math.floor(Date.now() / 1e3) + (gasless.deadlineSeconds ?? 3600);
  const request = {
    batchId: BATCH_ID,
    batchNonce: nonce,
    data: serializableTransaction.data,
    deadline,
    from: account.address,
    to: serializableTransaction.to,
    token: ZERO_ADDRESS,
    tokenGasPrice: 0n,
    txGas: serializableTransaction.gas
  };
  if (!request.to) {
    throw new Error("Cannot send a transaction without a `to` address");
  }
  if (!request.txGas) {
    throw new Error("Cannot send a transaction without a `gas` value");
  }
  if (!request.data) {
    throw new Error("Cannot send a transaction without a `data` value");
  }
  const message = encodeAbiParameters([
    { type: "address" },
    { type: "address" },
    { type: "address" },
    { type: "uint256" },
    { type: "uint256" },
    { type: "uint256" },
    { type: "uint256" },
    { type: "bytes32" }
  ], [
    getAddress(request.from),
    getAddress(request.to),
    getAddress(request.token),
    request.txGas,
    request.tokenGasPrice,
    request.batchId,
    request.batchNonce,
    keccak256(request.data)
  ]);
  const signature = await account.signMessage({ message });
  return [request, signature];
}
async function relayBiconomyTransaction(options) {
  const [request, signature] = await prepareBiconomyTransaction(options);
  const response = await fetch("https://api.biconomy.io/api/v2/meta-tx/native", {
    body: stringify({
      apiId: options.gasless.apiId,
      from: request.from,
      gasLimit: request.txGas,
      params: [request, signature],
      to: request.to
    }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "x-api-key": options.gasless.apiKey
    },
    method: "POST"
  });
  if (!response.ok) {
    throw new Error(`Failed to send transaction: ${await response.text()}`);
  }
  const json = await response.json();
  const transactionHash = json.txHash;
  if (isHex(transactionHash)) {
    return {
      chain: options.transaction.chain,
      client: options.transaction.client,
      transactionHash
    };
  }
  throw new Error(`Failed to send transaction: ${stringify(json)}`);
}
export {
  prepareBiconomyTransaction,
  relayBiconomyTransaction
};
