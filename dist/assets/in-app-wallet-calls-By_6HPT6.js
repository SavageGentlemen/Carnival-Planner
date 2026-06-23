import { H as waitForReceipt, a0 as LruMap, a1 as getRpcClient, a2 as eth_getTransactionReceipt } from "./index-CXUot43X.js";
import { l as sendTransaction, m as randomBytesHex } from "./bundler-Dmn5v2kr.js";
import { sendBatchTransaction } from "./send-batch-transaction-B5YWRBly.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
async function sendAndConfirmTransaction(options) {
  const submittedTx = await sendTransaction(options);
  return waitForReceipt(submittedTx);
}
const bundlesToTransactions = new LruMap(1e3);
async function inAppWalletSendCalls(args) {
  const { account, calls } = args;
  const transactions = calls.map((call) => ({
    ...call,
    chain: args.chain
  }));
  const hashes = [];
  const id = randomBytesHex(65);
  bundlesToTransactions.set(id, hashes);
  if (account.sendBatchTransaction) {
    const receipt = await sendBatchTransaction({
      account,
      transactions
    });
    hashes.push(receipt.transactionHash);
    bundlesToTransactions.set(id, hashes);
  } else {
    for (const tx of transactions) {
      const receipt = await sendAndConfirmTransaction({
        account,
        transaction: tx
      });
      hashes.push(receipt.transactionHash);
      bundlesToTransactions.set(id, hashes);
    }
  }
  return id;
}
async function inAppWalletGetCallsStatus(args) {
  const { chain, client, id } = args;
  const bundle = bundlesToTransactions.get(id);
  if (!bundle) {
    throw new Error("Failed to get calls status, unknown bundle id");
  }
  const request = getRpcClient({ chain, client });
  let status = "success";
  const receipts = await Promise.all(bundle.map((hash) => eth_getTransactionReceipt(request, { hash }).then((receipt) => ({
    blockHash: receipt.blockHash,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed,
    logs: receipt.logs.map((l) => ({
      address: l.address,
      data: l.data,
      topics: l.topics
    })),
    status: receipt.status,
    transactionHash: receipt.transactionHash
  })).catch(() => {
    status = "pending";
    return null;
  })));
  return {
    atomic: false,
    chainId: chain.id,
    id,
    receipts: receipts.filter((r) => r !== null),
    status,
    statusCode: 200,
    version: "2.0.0"
  };
}
async function inAppWalletGetCallsStatusRaw(args) {
  const { chain, client, id } = args;
  const bundle = bundlesToTransactions.get(id);
  if (!bundle) {
    throw new Error("Failed to get calls status, unknown bundle id");
  }
  const request = getRpcClient({ chain, client });
  let status = 200;
  const receipts = [];
  for (const hash of bundle) {
    try {
      const receipt = await eth_getTransactionReceipt(request, { hash });
      receipts.push({
        blockHash: receipt.blockHash,
        blockNumber: `0x${receipt.blockNumber.toString(16)}`,
        gasUsed: `0x${receipt.gasUsed.toString(16)}`,
        logs: receipt.logs.map((l) => ({
          address: l.address,
          data: l.data,
          topics: l.topics
        })),
        status: receipt.status === "success" ? "0x1" : "0x0",
        transactionHash: receipt.transactionHash
      });
    } catch {
      status = 100;
    }
  }
  return {
    atomic: false,
    chainId: `0x${chain.id.toString(16)}`,
    id,
    receipts,
    status,
    version: "2.0.0"
  };
}
export {
  inAppWalletGetCallsStatus,
  inAppWalletGetCallsStatusRaw,
  inAppWalletSendCalls
};
