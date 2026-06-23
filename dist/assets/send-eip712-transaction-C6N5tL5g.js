const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/bundler-Dmn5v2kr.js","assets/index-CXUot43X.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { e as eth_sendRawTransaction } from "./eth_sendRawTransaction-CgrUWHw8.js";
import { _ as BaseError, au as toBytes, av as pad, v as uint8ArrayToHex, aw as toHex, a1 as getRpcClient, t as getAddress, ax as hexToBytes } from "./index-CXUot43X.js";
import { concatHex } from "./concat-hex-Dx-81yeB.js";
import { v as toSerializableTransaction, c as resolvePromisedValue, b as encode } from "./bundler-Dmn5v2kr.js";
import { m as maxUint16, s as sha256, t as toRlp } from "./sha256-C8LtJplw.js";
const maxBytecodeSize = maxUint16 * 32n;
class BytecodeLengthExceedsMaxSizeError extends BaseError {
  constructor({ givenLength, maxBytecodeSize: maxBytecodeSize2 }) {
    super(`Bytecode cannot be longer than ${maxBytecodeSize2} bytes. Given length: ${givenLength}`, { name: "BytecodeLengthExceedsMaxSizeError" });
  }
}
class BytecodeLengthInWordsMustBeOddError extends BaseError {
  constructor({ givenLengthInWords }) {
    super(`Bytecode length in 32-byte words must be odd. Given length in words: ${givenLengthInWords}`, { name: "BytecodeLengthInWordsMustBeOddError" });
  }
}
class BytecodeLengthMustBeDivisibleBy32Error extends BaseError {
  constructor({ givenLength }) {
    super(`The bytecode length in bytes must be divisible by 32. Given length: ${givenLength}`, { name: "BytecodeLengthMustBeDivisibleBy32Error" });
  }
}
function hashBytecode(bytecode) {
  const bytecodeBytes = toBytes(bytecode);
  if (bytecodeBytes.length % 32 !== 0)
    throw new BytecodeLengthMustBeDivisibleBy32Error({
      givenLength: bytecodeBytes.length
    });
  if (bytecodeBytes.length > maxBytecodeSize)
    throw new BytecodeLengthExceedsMaxSizeError({
      givenLength: bytecodeBytes.length,
      maxBytecodeSize
    });
  const hashStr = sha256(bytecodeBytes);
  const hash = toBytes(hashStr);
  const bytecodeLengthInWords = bytecodeBytes.length / 32;
  if (bytecodeLengthInWords % 2 === 0) {
    throw new BytecodeLengthInWordsMustBeOddError({
      givenLengthInWords: bytecodeLengthInWords
    });
  }
  const bytecodeLength = toBytes(bytecodeLengthInWords);
  const bytecodeLengthPadded = pad(bytecodeLength, { size: 2 });
  const codeHashVersion = new Uint8Array([1, 0]);
  hash.set(codeHashVersion, 0);
  hash.set(bytecodeLengthPadded, 2);
  return hash;
}
function toBigInt(value) {
  if (["string", "number"].includes(typeof value) && !Number.isInteger(Number(value))) {
    throw new Error(`Expected value to be an integer to convert to a bigint, got ${value} of type ${typeof value}`);
  }
  if (value instanceof Uint8Array) {
    return BigInt(uint8ArrayToHex(value));
  }
  return BigInt(value);
}
const replaceBigInts = (obj, replacer) => {
  if (typeof obj === "bigint")
    return replacer(obj);
  if (Array.isArray(obj))
    return obj.map((x) => replaceBigInts(x, replacer));
  if (obj && typeof obj === "object")
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, replaceBigInts(v, replacer)]));
  return obj;
};
const gasPerPubdataDefault = 50000n;
const getEip712Domain = (transaction) => {
  const message = transactionToMessage(transaction);
  return {
    domain: {
      chainId: transaction.chainId,
      name: "zkSync",
      version: "2"
    },
    message,
    primaryType: "Transaction",
    types: {
      Transaction: [
        { name: "txType", type: "uint256" },
        { name: "from", type: "uint256" },
        { name: "to", type: "uint256" },
        { name: "gasLimit", type: "uint256" },
        { name: "gasPerPubdataByteLimit", type: "uint256" },
        { name: "maxFeePerGas", type: "uint256" },
        { name: "maxPriorityFeePerGas", type: "uint256" },
        { name: "paymaster", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" },
        { name: "factoryDeps", type: "bytes32[]" },
        { name: "paymasterInput", type: "bytes" }
      ]
    }
  };
};
function transactionToMessage(transaction) {
  const { gas, nonce, to, from, value, maxFeePerGas, maxPriorityFeePerGas, paymaster, paymasterInput, gasPerPubdata, data, factoryDeps } = transaction;
  return {
    data: data ? data : "0x0",
    factoryDeps: factoryDeps?.map((dep) => toHex(hashBytecode(dep))) ?? [],
    from: BigInt(from),
    gasLimit: gas ?? 0n,
    gasPerPubdataByteLimit: gasPerPubdata ?? gasPerPubdataDefault,
    maxFeePerGas: maxFeePerGas ?? 0n,
    maxPriorityFeePerGas: maxPriorityFeePerGas ?? 0n,
    nonce: nonce ? BigInt(nonce) : 0n,
    paymaster: paymaster ? BigInt(paymaster) : 0n,
    paymasterInput: paymasterInput ? paymasterInput : "0x",
    to: to ? BigInt(to) : 0n,
    txType: 113n,
    value: value ?? 0n
  };
}
async function sendEip712Transaction(options) {
  const { account, transaction } = options;
  const eip712Transaction = await populateEip712Transaction(options);
  const hash = await signEip712Transaction({
    account,
    chainId: transaction.chain.id,
    eip712Transaction
  });
  const rpc = getRpcClient(transaction);
  const result = await eth_sendRawTransaction(rpc, hash);
  return {
    chain: transaction.chain,
    client: transaction.client,
    transactionHash: result
  };
}
async function signEip712Transaction(options) {
  const { account, eip712Transaction, chainId } = options;
  const eip712Domain = getEip712Domain(eip712Transaction);
  const customSignature = await account.signTypedData({
    // biome-ignore lint/suspicious/noExplicitAny: TODO type properly
    ...eip712Domain
  });
  return serializeTransactionEIP712({
    ...eip712Transaction,
    chainId,
    customSignature
  });
}
async function populateEip712Transaction(options) {
  const { account, transaction } = options;
  const { gas, maxFeePerGas, maxPriorityFeePerGas, gasPerPubdata } = await getZkGasFees({ from: getAddress(account.address), transaction });
  const serializableTransaction = await toSerializableTransaction({
    from: account.address,
    transaction: {
      ...transaction,
      gas,
      maxFeePerGas,
      maxPriorityFeePerGas
    }
  });
  return {
    ...serializableTransaction,
    ...transaction.eip712,
    from: account.address,
    gasPerPubdata
  };
}
function serializeTransactionEIP712(transaction) {
  const { chainId, gas, nonce, to, from, value, maxFeePerGas, maxPriorityFeePerGas, customSignature, factoryDeps, paymaster, paymasterInput, gasPerPubdata, data } = transaction;
  const serializedTransaction = [
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x0",
    toHex(chainId),
    toHex(""),
    toHex(""),
    toHex(chainId),
    from ?? "0x",
    gasPerPubdata ? toHex(gasPerPubdata) : toHex(gasPerPubdataDefault),
    factoryDeps ?? [],
    customSignature ?? "0x",
    // EIP712 signature
    paymaster && paymasterInput ? [paymaster, paymasterInput] : []
  ];
  return concatHex(["0x71", toRlp(serializedTransaction)]);
}
async function getZkGasFees(args) {
  const { transaction, from } = args;
  let [gas, maxFeePerGas, maxPriorityFeePerGas, eip712] = await Promise.all([
    resolvePromisedValue(transaction.gas),
    resolvePromisedValue(transaction.maxFeePerGas),
    resolvePromisedValue(transaction.maxPriorityFeePerGas),
    resolvePromisedValue(transaction.eip712)
  ]);
  let gasPerPubdata = eip712?.gasPerPubdata;
  if (gas === void 0 || maxFeePerGas === void 0 || maxPriorityFeePerGas === void 0) {
    const rpc = getRpcClient(transaction);
    const params = await formatTransaction({ from, transaction });
    try {
      const result = await rpc({
        // biome-ignore lint/suspicious/noExplicitAny: TODO add to RPC method types
        method: "zks_estimateFee",
        // biome-ignore lint/suspicious/noExplicitAny: TODO add to RPC method types
        params: [replaceBigInts(params, toHex)]
      });
      gas = toBigInt(result.gas_limit) * 2n;
      const baseFee = toBigInt(result.max_fee_per_gas);
      maxFeePerGas = baseFee * 2n;
      maxPriorityFeePerGas = toBigInt(result.max_priority_fee_per_gas) || 1n;
      gasPerPubdata = toBigInt(result.gas_per_pubdata_limit) * 2n;
      if (gasPerPubdata < 50000n) {
        gasPerPubdata = 50000n;
      }
    } catch {
      const [{ estimateGas }, { getDefaultGasOverrides }] = await Promise.all([
        __vitePreload(() => import("./bundler-Dmn5v2kr.js").then((n) => n.bi), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0),
        __vitePreload(() => import("./bundler-Dmn5v2kr.js").then((n) => n.bh), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0)
      ]);
      const [estimatedGas, gasOverrides] = await Promise.all([
        gas === void 0 ? estimateGas({ transaction, from }) : Promise.resolve(gas),
        getDefaultGasOverrides(transaction.client, transaction.chain)
      ]);
      gas = estimatedGas * 2n;
      if ("maxFeePerGas" in gasOverrides && gasOverrides.maxFeePerGas) {
        maxFeePerGas = gasOverrides.maxFeePerGas * 2n;
      } else if ("gasPrice" in gasOverrides && gasOverrides.gasPrice) {
        maxFeePerGas = gasOverrides.gasPrice * 2n;
      }
      if ("maxPriorityFeePerGas" in gasOverrides && gasOverrides.maxPriorityFeePerGas) {
        maxPriorityFeePerGas = gasOverrides.maxPriorityFeePerGas;
      } else {
        maxPriorityFeePerGas = 1n;
      }
      gasPerPubdata = 100000n;
    }
  }
  return {
    gas,
    gasPerPubdata,
    maxFeePerGas,
    maxPriorityFeePerGas
  };
}
async function formatTransaction(args) {
  const { transaction, from } = args;
  const [data, to, value, eip712] = await Promise.all([
    encode(transaction),
    resolvePromisedValue(transaction.to),
    resolvePromisedValue(transaction.value),
    resolvePromisedValue(transaction.eip712)
  ]);
  const gasPerPubdata = eip712?.gasPerPubdata;
  return {
    data,
    eip712Meta: {
      ...eip712,
      factoryDeps: eip712?.factoryDeps?.map((dep) => Array.from(hexToBytes(dep))),
      gasPerPubdata: gasPerPubdata || 50000n
    },
    from,
    gasPerPubdata,
    to,
    type: "0x71",
    value
  };
}
const sendEip712Transaction$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getZkGasFees,
  populateEip712Transaction,
  sendEip712Transaction,
  signEip712Transaction
}, Symbol.toStringTag, { value: "Module" }));
export {
  sendEip712Transaction$1 as a,
  populateEip712Transaction as p,
  signEip712Transaction as s,
  toBigInt as t
};
