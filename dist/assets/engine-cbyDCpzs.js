import { r as stringify, F as getContract, H as waitForReceipt } from "./index-CXUot43X.js";
import { r as readContract } from "./bundler-Dmn5v2kr.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
async function prepareEngineTransaction({ account, serializableTransaction, transaction, gasless }) {
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
      throw new Error("engine transactions must have a 'to' address");
    }
    if (!serializableTransaction.gas) {
      throw new Error("engine transactions must have a 'gas' value");
    }
    if (!serializableTransaction.data) {
      throw new Error("engine transactions must have a 'data' value");
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
async function relayEngineTransaction(options) {
  const { message, messageType, signature } = await prepareEngineTransaction(options);
  const response = await fetch(options.gasless.relayerUrl, {
    body: stringify({
      forwarderAddress: options.gasless.relayerForwarderAddress,
      request: message,
      signature,
      type: messageType
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  if (!response.ok) {
    throw new Error(`Failed to send transaction: ${await response.text()}`);
  }
  const json = await response.json();
  if (!json.result) {
    throw new Error(`Relay transaction failed: ${json.message}`);
  }
  const queueId = json.result.queueId;
  const timeout = 6e4;
  const interval = 1e3;
  const endtime = Date.now() + timeout;
  while (Date.now() < endtime) {
    const receipt = await fetchReceipt({ options, queueId });
    if (receipt) {
      return {
        chain: options.transaction.chain,
        client: options.transaction.client,
        transactionHash: receipt.transactionHash
      };
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error(`Failed to find relayed transaction after ${timeout}ms`);
}
async function fetchReceipt(args) {
  const { options, queueId } = args;
  const url = options.gasless.relayerUrl.split("/relayer/")[0];
  const res = await fetch(`${url}/transaction/status/${queueId}`, {
    method: "GET"
  });
  const resJson = await res.json();
  if (!res.ok) {
    return null;
  }
  const result = resJson.result;
  if (!result) {
    return null;
  }
  switch (result.status) {
    case "errored":
      throw new Error(`Transaction errored with reason: ${result.errorMessage}`);
    case "cancelled":
      throw new Error("Transaction execution cancelled.");
    case "mined": {
      const receipt = await waitForReceipt({
        chain: options.transaction.chain,
        client: options.transaction.client,
        transactionHash: result.transactionHash
      });
      return receipt;
    }
    default: {
      return null;
    }
  }
}
export {
  prepareEngineTransaction,
  relayEngineTransaction
};
