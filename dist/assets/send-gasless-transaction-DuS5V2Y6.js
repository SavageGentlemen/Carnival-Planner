const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/biconomy-B8Oev-8g.js","assets/bundler-Dmn5v2kr.js","assets/index-CXUot43X.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css","assets/openzeppelin-cMIYyALT.js","assets/engine-cbyDCpzs.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { f as addTransactionToStore } from "./bundler-Dmn5v2kr.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./index-CXUot43X.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
async function sendGaslessTransaction({ account, transaction, serializableTransaction, gasless }) {
  if (serializableTransaction.value && serializableTransaction.value > 0n) {
    throw new Error("Gasless transactions cannot have a value");
  }
  let result;
  if (gasless.provider === "biconomy") {
    const { relayBiconomyTransaction } = await __vitePreload(async () => {
      const { relayBiconomyTransaction: relayBiconomyTransaction2 } = await import("./biconomy-B8Oev-8g.js");
      return { relayBiconomyTransaction: relayBiconomyTransaction2 };
    }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8]) : void 0);
    result = await relayBiconomyTransaction({
      account,
      gasless,
      serializableTransaction,
      transaction
    });
  }
  if (gasless.provider === "openzeppelin") {
    const { relayOpenZeppelinTransaction } = await __vitePreload(async () => {
      const { relayOpenZeppelinTransaction: relayOpenZeppelinTransaction2 } = await import("./openzeppelin-cMIYyALT.js");
      return { relayOpenZeppelinTransaction: relayOpenZeppelinTransaction2 };
    }, true ? __vite__mapDeps([9,2,3,4,5,6,7,8,1]) : void 0);
    result = await relayOpenZeppelinTransaction({
      account,
      gasless,
      serializableTransaction,
      transaction
    });
  }
  if (gasless.provider === "engine") {
    const { relayEngineTransaction } = await __vitePreload(async () => {
      const { relayEngineTransaction: relayEngineTransaction2 } = await import("./engine-cbyDCpzs.js");
      return { relayEngineTransaction: relayEngineTransaction2 };
    }, true ? __vite__mapDeps([10,2,3,4,5,6,7,8,1]) : void 0);
    result = await relayEngineTransaction({
      account,
      gasless,
      serializableTransaction,
      transaction
    });
  }
  if (!result) {
    throw new Error("Unsupported gasless provider");
  }
  addTransactionToStore({
    address: account.address,
    chainId: transaction.chain.id,
    transactionHash: result.transactionHash
  });
  return result;
}
export {
  sendGaslessTransaction
};
