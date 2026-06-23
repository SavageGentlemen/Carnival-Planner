import { b as encode, c as resolvePromisedValue } from "./bundler-Dmn5v2kr.js";
import "./index-CXUot43X.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
async function sendBatchTransaction(options) {
  const { account, transactions } = options;
  if (!account) {
    throw new Error("not connected");
  }
  if (transactions.length === 0) {
    throw new Error("No transactions to send");
  }
  const firstTx = transactions[0];
  if (!firstTx) {
    throw new Error("No transactions to send");
  }
  if (account.sendBatchTransaction) {
    const serializedTxs = await Promise.all(transactions.map(async (tx) => {
      const [data, to, accessList, value] = await Promise.all([
        encode(tx),
        resolvePromisedValue(tx.to),
        resolvePromisedValue(tx.accessList),
        resolvePromisedValue(tx.value)
      ]);
      const serializedTx = {
        accessList,
        chainId: tx.chain.id,
        data,
        to,
        value
      };
      return serializedTx;
    }));
    const result = await account.sendBatchTransaction(serializedTxs);
    return {
      ...result,
      chain: firstTx.chain,
      client: firstTx.client
    };
  }
  throw new Error("Account doesn't implement sendBatchTransaction");
}
export {
  sendBatchTransaction
};
