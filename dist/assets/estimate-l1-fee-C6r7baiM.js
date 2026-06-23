import { a4 as size, a7 as BaseError, a5 as fromNumber, as as trimLeft, l as concat, aG as toBigInt, F as getContract } from "./index-CXUot43X.js";
import { v as toSerializableTransaction, r as readContract } from "./bundler-Dmn5v2kr.js";
import { y as yParityToV, I as InvalidVError, f as fromHex, e as extract, t as toTuple, a as toTupleList$1, b as fromLegacy, v as vToYParity } from "./Authorization-CEwvBCmC.js";
import { a as assert$4 } from "./Address-CuEhN18Y.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
function toTupleList(accessList) {
  if (!accessList || accessList.length === 0)
    return [];
  const tuple = [];
  for (const { address, storageKeys } of accessList) {
    for (let j = 0; j < storageKeys.length; j++)
      if (size(storageKeys[j]) !== 32)
        throw new InvalidStorageKeySizeError({
          storageKey: storageKeys[j]
        });
    if (address)
      assert$4(address, { strict: false });
    tuple.push([address, storageKeys]);
  }
  return tuple;
}
class InvalidStorageKeySizeError extends BaseError {
  constructor({ storageKey }) {
    super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${size(storageKey)} bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AccessList.InvalidStorageKeySizeError"
    });
  }
}
const exponents = {
  wei: 0,
  gwei: 9,
  szabo: 12,
  finney: 15,
  ether: 18
};
function format(value, decimals = 0) {
  let display = value.toString();
  const negative = display.startsWith("-");
  if (negative)
    display = display.slice(1);
  display = display.padStart(decimals, "0");
  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals)
  ];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
}
function formatGwei(wei, unit = "wei") {
  return format(wei, exponents.gwei - exponents[unit]);
}
class FeeCapTooHighError extends BaseError {
  constructor({ feeCap } = {}) {
    super(`The fee cap (\`maxFeePerGas\`/\`maxPriorityFeePerGas\`${feeCap ? ` = ${formatGwei(feeCap)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionEnvelope.FeeCapTooHighError"
    });
  }
}
class GasPriceTooHighError extends BaseError {
  constructor({ gasPrice } = {}) {
    super(`The gas price (\`gasPrice\`${gasPrice ? ` = ${formatGwei(gasPrice)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionEnvelope.GasPriceTooHighError"
    });
  }
}
class InvalidChainIdError extends BaseError {
  constructor({ chainId }) {
    super(typeof chainId !== "undefined" ? `Chain ID "${chainId}" is invalid.` : "Chain ID is invalid.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionEnvelope.InvalidChainIdError"
    });
  }
}
class TipAboveFeeCapError extends BaseError {
  constructor({ maxPriorityFeePerGas, maxFeePerGas } = {}) {
    super([
      `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}).`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionEnvelope.TipAboveFeeCapError"
    });
  }
}
function assert$3(envelope) {
  const { chainId, gasPrice, to } = envelope;
  if (to)
    assert$4(to, { strict: false });
  if (typeof chainId !== "undefined" && chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (gasPrice && BigInt(gasPrice) > 2n ** 256n - 1n)
    throw new GasPriceTooHighError({ gasPrice });
}
function serialize$3(envelope, options = {}) {
  const { chainId = 0, gas, data, input, nonce, to, value, gasPrice } = envelope;
  assert$3(envelope);
  let serialized = [
    nonce ? fromNumber(nonce) : "0x",
    gasPrice ? fromNumber(gasPrice) : "0x",
    gas ? fromNumber(gas) : "0x",
    to ?? "0x",
    value ? fromNumber(value) : "0x",
    data ?? input ?? "0x"
  ];
  const signature = (() => {
    if (options.signature)
      return {
        r: options.signature.r,
        s: options.signature.s,
        v: yParityToV(options.signature.yParity)
      };
    if (typeof envelope.r === "undefined" || typeof envelope.s === "undefined")
      return void 0;
    return {
      r: envelope.r,
      s: envelope.s,
      v: envelope.v
    };
  })();
  if (signature) {
    const v = (() => {
      if (signature.v >= 35) {
        const inferredChainId = Math.floor((signature.v - 35) / 2);
        if (inferredChainId > 0)
          return signature.v;
        return 27 + (signature.v === 35 ? 0 : 1);
      }
      if (chainId > 0)
        return chainId * 2 + 35 + signature.v - 27;
      const v2 = 27 + (signature.v === 27 ? 0 : 1);
      if (signature.v !== v2)
        throw new InvalidVError({ value: signature.v });
      return v2;
    })();
    serialized = [
      ...serialized,
      fromNumber(v),
      signature.r === 0n ? "0x" : trimLeft(fromNumber(signature.r)),
      signature.s === 0n ? "0x" : trimLeft(fromNumber(signature.s))
    ];
  } else if (chainId > 0)
    serialized = [...serialized, fromNumber(chainId), "0x", "0x"];
  return fromHex(serialized);
}
const serializedType$1 = "0x02";
function assert$2(envelope) {
  const { chainId, maxPriorityFeePerGas, maxFeePerGas, to } = envelope;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to)
    assert$4(to, { strict: false });
  if (maxFeePerGas && BigInt(maxFeePerGas) > 2n ** 256n - 1n)
    throw new FeeCapTooHighError({ feeCap: maxFeePerGas });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({
      maxFeePerGas,
      maxPriorityFeePerGas
    });
}
function serialize$2(envelope, options = {}) {
  const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data, input } = envelope;
  assert$2(envelope);
  const accessTupleList = toTupleList(accessList);
  const signature = extract(options.signature || envelope);
  const serialized = [
    fromNumber(chainId),
    nonce ? fromNumber(nonce) : "0x",
    maxPriorityFeePerGas ? fromNumber(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? fromNumber(maxFeePerGas) : "0x",
    gas ? fromNumber(gas) : "0x",
    to ?? "0x",
    value ? fromNumber(value) : "0x",
    data ?? input ?? "0x",
    accessTupleList,
    ...signature ? toTuple(signature) : []
  ];
  return concat(serializedType$1, fromHex(serialized));
}
function assert$1(envelope) {
  const { chainId, gasPrice, to } = envelope;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to)
    assert$4(to, { strict: false });
  if (gasPrice && BigInt(gasPrice) > 2n ** 256n - 1n)
    throw new GasPriceTooHighError({ gasPrice });
}
function serialize$1(envelope, options = {}) {
  const { chainId, gas, data, input, nonce, to, value, accessList, gasPrice } = envelope;
  assert$1(envelope);
  const accessTupleList = toTupleList(accessList);
  const signature = extract(options.signature || envelope);
  const serialized = [
    fromNumber(chainId),
    nonce ? fromNumber(nonce) : "0x",
    gasPrice ? fromNumber(gasPrice) : "0x",
    gas ? fromNumber(gas) : "0x",
    to ?? "0x",
    value ? fromNumber(value) : "0x",
    data ?? input ?? "0x",
    accessTupleList,
    ...signature ? toTuple(signature) : []
  ];
  return concat("0x01", fromHex(serialized));
}
const serializedType = "0x04";
function assert(envelope) {
  const { authorizationList } = envelope;
  if (authorizationList) {
    for (const authorization of authorizationList) {
      const { address, chainId } = authorization;
      if (address)
        assert$4(address, { strict: false });
      if (Number(chainId) < 0)
        throw new InvalidChainIdError({ chainId });
    }
  }
  assert$2(envelope);
}
function serialize(envelope, options = {}) {
  const { authorizationList, chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data, input } = envelope;
  assert(envelope);
  const accessTupleList = toTupleList(accessList);
  const authorizationTupleList = toTupleList$1(authorizationList);
  const signature = extract(options.signature || envelope);
  const serialized = [
    fromNumber(chainId),
    nonce ? fromNumber(nonce) : "0x",
    maxPriorityFeePerGas ? fromNumber(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? fromNumber(maxFeePerGas) : "0x",
    gas ? fromNumber(gas) : "0x",
    to ?? "0x",
    value ? fromNumber(value) : "0x",
    data ?? input ?? "0x",
    accessTupleList,
    authorizationTupleList,
    ...signature ? toTuple(signature) : []
  ];
  return concat(serializedType, fromHex(serialized));
}
function serializeTransaction(options) {
  const { transaction } = options;
  const type = getTransactionEnvelopeType(transaction);
  const signature = (() => {
    if (options.signature) {
      if ("v" in options.signature && typeof options.signature.v !== "undefined") {
        return fromLegacy({
          r: toBigInt(options.signature.r),
          s: toBigInt(options.signature.s),
          v: Number(options.signature.v)
        });
      }
      return {
        r: toBigInt(options.signature.r),
        s: toBigInt(options.signature.s),
        // We force the Signature type here because we filter for legacy type above
        yParity: options.signature.yParity
      };
    }
    if (typeof transaction.v === "undefined" && typeof transaction.yParity === "undefined") {
      return void 0;
    }
    if (transaction.r === void 0 || transaction.s === void 0) {
      throw new Error("Invalid signature provided with transaction");
    }
    return {
      r: typeof transaction.r === "bigint" ? transaction.r : toBigInt(transaction.r),
      s: typeof transaction.s === "bigint" ? transaction.s : toBigInt(transaction.s),
      yParity: typeof transaction.v !== "undefined" && typeof transaction.yParity === "undefined" ? vToYParity(Number(transaction.v)) : Number(transaction.yParity)
    };
  })();
  if (type === "eip1559") {
    const typedTransaction = transaction;
    assert$2(typedTransaction);
    return serialize$2(typedTransaction, {
      signature
    });
  }
  if (type === "legacy") {
    const typedTransaction = transaction;
    assert$3(typedTransaction);
    return serialize$3(typedTransaction, {
      signature
    });
  }
  if (type === "eip2930") {
    const typedTransaction = transaction;
    assert$1(typedTransaction);
    return serialize$1(typedTransaction, {
      signature
    });
  }
  if (type === "eip7702") {
    const typedTransaction = transaction;
    assert(typedTransaction);
    return serialize(typedTransaction, {
      signature
    });
  }
  throw new Error("Invalid transaction type");
}
function getTransactionEnvelopeType(transactionEnvelope) {
  if (typeof transactionEnvelope.type !== "undefined") {
    return transactionEnvelope.type;
  }
  if (typeof transactionEnvelope.authorizationList !== "undefined") {
    return "eip7702";
  }
  if (typeof transactionEnvelope.maxFeePerGas !== "undefined" || typeof transactionEnvelope.maxPriorityFeePerGas !== "undefined") {
    return "eip1559";
  }
  if (typeof transactionEnvelope.gasPrice !== "undefined") {
    if (typeof transactionEnvelope.accessList !== "undefined") {
      return "eip2930";
    }
    return "legacy";
  }
  throw new Error("Invalid transaction type");
}
const OPStackGasPriceOracleAddress = "0x420000000000000000000000000000000000000F";
async function estimateL1Fee(options) {
  const { transaction, gasPriceOracleAddress } = options;
  const oracleContract = getContract({
    address: gasPriceOracleAddress || OPStackGasPriceOracleAddress,
    chain: transaction.chain,
    client: transaction.client
  });
  const { gasPrice, ...serializableTx } = await toSerializableTransaction({
    transaction
  });
  const serialized = serializeTransaction({
    transaction: serializableTx
  });
  return readContract({
    contract: oracleContract,
    method: "function getL1Fee(bytes memory _data) view returns (uint256)",
    params: [serialized]
  });
}
export {
  estimateL1Fee
};
