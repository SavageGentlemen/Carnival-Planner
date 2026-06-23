import { r as stringify, B as isHex, F as getContract } from "./index-CXUot43X.js";
import { r as readContract } from "./bundler-Dmn5v2kr.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
async function prepareOpenZeppelinTransaction({ account, serializableTransaction, transaction, gasless }) {
  const forrwaderContract = getContract({
    address: gasless.relayerForwarderAddress,
    chain: transaction.chain,
    client: transaction.client
  });
  const nonce = await readContract({
    contract: forrwaderContract,
    method: "function getNonce(address) view returns (uint256)",
    params: [account.address]
  });
  const [signature, message] = await (async () => {
    if (!serializableTransaction.to) {
      throw new Error("OpenZeppelin transactions must have a 'to' address");
    }
    if (!serializableTransaction.gas) {
      throw new Error("OpenZeppelin transactions must have a 'gas' value");
    }
    if (!serializableTransaction.data) {
      throw new Error("OpenZeppelin transactions must have a 'data' value");
    }
    if (gasless.experimentalChainlessSupport) {
      const message3 = {
        chainid: BigInt(transaction.chain.id),
        data: serializableTransaction.data,
        from: account.address,
        gas: serializableTransaction.gas,
        nonce,
        to: serializableTransaction.to,
        value: 0n
      };
      return [
        await account.signTypedData({
          domain: {
            name: "GSNv2 Forwarder",
            verifyingContract: forrwaderContract.address,
            version: "0.0.1"
          },
          message: message3,
          primaryType: "ForwardRequest",
          types: { ForwardRequest: ChainAwareForwardRequest }
        }),
        message3
      ];
    }
    const message2 = {
      data: serializableTransaction.data,
      from: account.address,
      gas: serializableTransaction.gas,
      nonce,
      to: serializableTransaction.to,
      value: 0n
    };
    return [
      await account.signTypedData({
        domain: {
          chainId: transaction.chain.id,
          name: gasless.domainName ?? "GSNv2 Forwarder",
          verifyingContract: forrwaderContract.address,
          version: gasless.domainVersion ?? "0.0.1"
        },
        message: message2,
        primaryType: "ForwardRequest",
        types: { ForwardRequest }
      }),
      message2
    ];
  })();
  const messageType = "forward";
  return { message, messageType, signature };
}
const ForwardRequest = [
  { name: "from", type: "address" },
  { name: "to", type: "address" },
  { name: "value", type: "uint256" },
  { name: "gas", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "data", type: "bytes" }
];
const ChainAwareForwardRequest = [
  { name: "from", type: "address" },
  { name: "to", type: "address" },
  { name: "value", type: "uint256" },
  { name: "gas", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "data", type: "bytes" },
  { name: "chainid", type: "uint256" }
];
async function relayOpenZeppelinTransaction(options) {
  const { message, messageType, signature } = await prepareOpenZeppelinTransaction(options);
  const response = await fetch(options.gasless.relayerUrl, {
    body: stringify({
      forwarderAddress: options.gasless.relayerForwarderAddress,
      request: message,
      signature,
      type: messageType
    }),
    method: "POST"
  });
  if (!response.ok) {
    throw new Error(`Failed to send transaction: ${await response.text()}`);
  }
  const json = await response.json();
  if (!json.result) {
    throw new Error(`Relay transaction failed: ${json.message}`);
  }
  const transactionHash = JSON.parse(json.result).txHash;
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
  prepareOpenZeppelinTransaction,
  relayOpenZeppelinTransaction
};
