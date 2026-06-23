const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/resolveImplementation-Di6yegn8.js","assets/index-CXUot43X.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css","assets/extractIPFS-Cpfm21d8.js","assets/getInstalledModules-CCOgmvkA.js","assets/detectExtension-Bd2ZKTZs.js","assets/eth_estimateGas-2yjy3sG-.js","assets/estimate-l1-fee-C6r7baiM.js","assets/Authorization-CEwvBCmC.js","assets/Address-CuEhN18Y.js","assets/concat-hex-Dx-81yeB.js","assets/common-BU--rVy5.js","assets/send-eip712-transaction-C6N5tL5g.js","assets/eth_sendRawTransaction-CgrUWHw8.js","assets/sha256-C8LtJplw.js","assets/eth_getTransactionCount-DHChJTEw.js","assets/send-gasless-transaction-DuS5V2Y6.js"])))=>i.map(i=>d[i]);
import { _ as BaseError$1, b3 as size, $ as isHex, au as toBytes$1, az as toHex, bt as stringToBytes, bf as SliceOffsetOutOfBoundsError, b4 as numberToHex, b8 as padHex, bh as boolToHex, ba as IntegerOutOfRangeError, b9 as stringToHex, bv as assertSize, ay as bytesToHex, b5 as hexToNumber, b7 as trim, bb as InvalidBytesBooleanError, b6 as hexToBigInt, ax as hexToBytes, bw as defineFormatter, bl as formatTransaction, v as uint8ArrayToHex, aR as getClientFetch, V as withCache, F as getContract, w as numberToHex$1, B as isHex$1, l as concat$1, ag as isAddress$1, bx as padHex$1, by as boolToHex$1, u as stringToHex$1, ac as slice$1, r as stringify$1, a0 as LruMap$1, y as hexToBigInt$1, a1 as getRpcClient, A as defineChain$1, bz as track, t as getAddress$1, a5 as fromNumber, bA as createStore, aW as isZkSyncChain, bB as validate, bC as toNumber, aw as toHex$1, aP as getDefaultBundlerUrl, aQ as ENTRYPOINT_ADDRESS_v0_6, bD as MANAGED_ACCOUNT_GAS_BUFFER } from "./index-CXUot43X.js";
import { _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
function execTyped$1(regex, string) {
  const match = regex.exec(string);
  return match?.groups;
}
const bytesRegex$3 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
const integerRegex$3 = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
const isTupleRegex$1 = /^\(.+?\).*?$/;
const tupleRegex$1 = /^tuple(?<array>(\[(\d*)\])*)$/;
function formatAbiParameter$1(abiParameter) {
  let type = abiParameter.type;
  if (tupleRegex$1.test(abiParameter.type) && "components" in abiParameter) {
    type = "(";
    const length = abiParameter.components.length;
    for (let i = 0; i < length; i++) {
      const component = abiParameter.components[i];
      type += formatAbiParameter$1(component);
      if (i < length - 1)
        type += ", ";
    }
    const result = execTyped$1(tupleRegex$1, abiParameter.type);
    type += `)${result?.array ?? ""}`;
    return formatAbiParameter$1({
      ...abiParameter,
      type
    });
  }
  if ("indexed" in abiParameter && abiParameter.indexed)
    type = `${type} indexed`;
  if (abiParameter.name)
    return `${type} ${abiParameter.name}`;
  return type;
}
function formatAbiParameters$1(abiParameters) {
  let params = "";
  const length = abiParameters.length;
  for (let i = 0; i < length; i++) {
    const abiParameter = abiParameters[i];
    params += formatAbiParameter$1(abiParameter);
    if (i !== length - 1)
      params += ", ";
  }
  return params;
}
function formatAbiItem$2(abiItem) {
  if (abiItem.type === "function")
    return `function ${abiItem.name}(${formatAbiParameters$1(abiItem.inputs)})${abiItem.stateMutability && abiItem.stateMutability !== "nonpayable" ? ` ${abiItem.stateMutability}` : ""}${abiItem.outputs?.length ? ` returns (${formatAbiParameters$1(abiItem.outputs)})` : ""}`;
  if (abiItem.type === "event")
    return `event ${abiItem.name}(${formatAbiParameters$1(abiItem.inputs)})`;
  if (abiItem.type === "error")
    return `error ${abiItem.name}(${formatAbiParameters$1(abiItem.inputs)})`;
  if (abiItem.type === "constructor")
    return `constructor(${formatAbiParameters$1(abiItem.inputs)})${abiItem.stateMutability === "payable" ? " payable" : ""}`;
  if (abiItem.type === "fallback")
    return `fallback() external${abiItem.stateMutability === "payable" ? " payable" : ""}`;
  return "receive() external payable";
}
function formatAbiItem$1(abiItem, { includeName = false } = {}) {
  if (abiItem.type !== "function" && abiItem.type !== "event" && abiItem.type !== "error")
    throw new InvalidDefinitionTypeError(abiItem.type);
  return `${abiItem.name}(${formatAbiParams(abiItem.inputs, { includeName })})`;
}
function formatAbiParams(params, { includeName = false } = {}) {
  if (!params)
    return "";
  return params.map((param) => formatAbiParam(param, { includeName })).join(includeName ? ", " : ",");
}
function formatAbiParam(param, { includeName }) {
  if (param.type.startsWith("tuple")) {
    return `(${formatAbiParams(param.components, { includeName })})${param.type.slice("tuple".length)}`;
  }
  return param.type + (includeName && param.name ? ` ${param.name}` : "");
}
class AbiConstructorNotFoundError extends BaseError$1 {
  constructor({ docsPath: docsPath2 }) {
    super([
      "A constructor was not found on the ABI.",
      "Make sure you are using the correct ABI and that the constructor exists on it."
    ].join("\n"), {
      docsPath: docsPath2,
      name: "AbiConstructorNotFoundError"
    });
  }
}
class AbiConstructorParamsNotFoundError extends BaseError$1 {
  constructor({ docsPath: docsPath2 }) {
    super([
      "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.",
      "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."
    ].join("\n"), {
      docsPath: docsPath2,
      name: "AbiConstructorParamsNotFoundError"
    });
  }
}
class AbiDecodingDataSizeInvalidError extends BaseError$1 {
  constructor({ data, size: size2 }) {
    super([
      `Data size of ${size2} bytes is invalid.`,
      "Size must be in increments of 32 bytes (size % 32 === 0)."
    ].join("\n"), {
      metaMessages: [`Data: ${data} (${size2} bytes)`],
      name: "AbiDecodingDataSizeInvalidError"
    });
  }
}
class AbiDecodingDataSizeTooSmallError extends BaseError$1 {
  constructor({ data, params, size: size2 }) {
    super([`Data size of ${size2} bytes is too small for given parameters.`].join("\n"), {
      metaMessages: [
        `Params: (${formatAbiParams(params, { includeName: true })})`,
        `Data:   ${data} (${size2} bytes)`
      ],
      name: "AbiDecodingDataSizeTooSmallError"
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "params", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "size", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.data = data;
    this.params = params;
    this.size = size2;
  }
}
class AbiDecodingZeroDataError extends BaseError$1 {
  constructor() {
    super('Cannot decode zero data ("0x") with ABI parameters.', {
      name: "AbiDecodingZeroDataError"
    });
  }
}
class AbiEncodingArrayLengthMismatchError extends BaseError$1 {
  constructor({ expectedLength, givenLength, type }) {
    super([
      `ABI encoding array length mismatch for type ${type}.`,
      `Expected length: ${expectedLength}`,
      `Given length: ${givenLength}`
    ].join("\n"), { name: "AbiEncodingArrayLengthMismatchError" });
  }
}
class AbiEncodingBytesSizeMismatchError extends BaseError$1 {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size(value)}) does not match expected size (bytes${expectedSize}).`, { name: "AbiEncodingBytesSizeMismatchError" });
  }
}
class AbiEncodingLengthMismatchError extends BaseError$1 {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding params/values length mismatch.",
      `Expected length (params): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"), { name: "AbiEncodingLengthMismatchError" });
  }
}
class AbiErrorInputsNotFoundError extends BaseError$1 {
  constructor(errorName, { docsPath: docsPath2 }) {
    super([
      `Arguments (\`args\`) were provided to "${errorName}", but "${errorName}" on the ABI does not contain any parameters (\`inputs\`).`,
      "Cannot encode error result without knowing what the parameter types are.",
      "Make sure you are using the correct ABI and that the inputs exist on it."
    ].join("\n"), {
      docsPath: docsPath2,
      name: "AbiErrorInputsNotFoundError"
    });
  }
}
class AbiErrorNotFoundError extends BaseError$1 {
  constructor(errorName, { docsPath: docsPath2 } = {}) {
    super([
      `Error ${errorName ? `"${errorName}" ` : ""}not found on ABI.`,
      "Make sure you are using the correct ABI and that the error exists on it."
    ].join("\n"), {
      docsPath: docsPath2,
      name: "AbiErrorNotFoundError"
    });
  }
}
class AbiErrorSignatureNotFoundError extends BaseError$1 {
  constructor(signature, { docsPath: docsPath2 }) {
    super([
      `Encoded error signature "${signature}" not found on ABI.`,
      "Make sure you are using the correct ABI and that the error exists on it.",
      `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`
    ].join("\n"), {
      docsPath: docsPath2,
      name: "AbiErrorSignatureNotFoundError"
    });
    Object.defineProperty(this, "signature", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.signature = signature;
  }
}
class AbiEventSignatureEmptyTopicsError extends BaseError$1 {
  constructor({ docsPath: docsPath2 }) {
    super("Cannot extract event signature from empty topics.", {
      docsPath: docsPath2,
      name: "AbiEventSignatureEmptyTopicsError"
    });
  }
}
class AbiEventSignatureNotFoundError extends BaseError$1 {
  constructor(signature, { docsPath: docsPath2 }) {
    super([
      `Encoded event signature "${signature}" not found on ABI.`,
      "Make sure you are using the correct ABI and that the event exists on it.",
      `You can look up the signature here: https://openchain.xyz/signatures?query=${signature}.`
    ].join("\n"), {
      docsPath: docsPath2,
      name: "AbiEventSignatureNotFoundError"
    });
  }
}
class AbiEventNotFoundError extends BaseError$1 {
  constructor(eventName, { docsPath: docsPath2 } = {}) {
    super([
      `Event ${eventName ? `"${eventName}" ` : ""}not found on ABI.`,
      "Make sure you are using the correct ABI and that the event exists on it."
    ].join("\n"), {
      docsPath: docsPath2,
      name: "AbiEventNotFoundError"
    });
  }
}
class AbiFunctionNotFoundError extends BaseError$1 {
  constructor(functionName, { docsPath: docsPath2 } = {}) {
    super([
      `Function ${functionName ? `"${functionName}" ` : ""}not found on ABI.`,
      "Make sure you are using the correct ABI and that the function exists on it."
    ].join("\n"), {
      docsPath: docsPath2,
      name: "AbiFunctionNotFoundError"
    });
  }
}
class AbiFunctionOutputsNotFoundError extends BaseError$1 {
  constructor(functionName, { docsPath: docsPath2 }) {
    super([
      `Function "${functionName}" does not contain any \`outputs\` on ABI.`,
      "Cannot decode function result without knowing what the parameter types are.",
      "Make sure you are using the correct ABI and that the function exists on it."
    ].join("\n"), {
      docsPath: docsPath2,
      name: "AbiFunctionOutputsNotFoundError"
    });
  }
}
class AbiFunctionSignatureNotFoundError extends BaseError$1 {
  constructor(signature, { docsPath: docsPath2 }) {
    super([
      `Encoded function signature "${signature}" not found on ABI.`,
      "Make sure you are using the correct ABI and that the function exists on it.",
      `You can look up the signature here: https://openchain.xyz/signatures?query=${signature}.`
    ].join("\n"), {
      docsPath: docsPath2,
      name: "AbiFunctionSignatureNotFoundError"
    });
  }
}
class AbiItemAmbiguityError extends BaseError$1 {
  constructor(x, y) {
    super("Found ambiguous types in overloaded ABI items.", {
      metaMessages: [
        `\`${x.type}\` in \`${formatAbiItem$1(x.abiItem)}\`, and`,
        `\`${y.type}\` in \`${formatAbiItem$1(y.abiItem)}\``,
        "",
        "These types encode differently and cannot be distinguished at runtime.",
        "Remove one of the ambiguous items in the ABI."
      ],
      name: "AbiItemAmbiguityError"
    });
  }
}
class BytesSizeMismatchError extends BaseError$1 {
  constructor({ expectedSize, givenSize }) {
    super(`Expected bytes${expectedSize}, got bytes${givenSize}.`, {
      name: "BytesSizeMismatchError"
    });
  }
}
class DecodeLogDataMismatch extends BaseError$1 {
  constructor({ abiItem, data, params, size: size2 }) {
    super([
      `Data size of ${size2} bytes is too small for non-indexed event parameters.`
    ].join("\n"), {
      metaMessages: [
        `Params: (${formatAbiParams(params, { includeName: true })})`,
        `Data:   ${data} (${size2} bytes)`
      ],
      name: "DecodeLogDataMismatch"
    });
    Object.defineProperty(this, "abiItem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "params", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "size", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.abiItem = abiItem;
    this.data = data;
    this.params = params;
    this.size = size2;
  }
}
class DecodeLogTopicsMismatch extends BaseError$1 {
  constructor({ abiItem, param }) {
    super([
      `Expected a topic for indexed event parameter${param.name ? ` "${param.name}"` : ""} on event "${formatAbiItem$1(abiItem, { includeName: true })}".`
    ].join("\n"), { name: "DecodeLogTopicsMismatch" });
    Object.defineProperty(this, "abiItem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.abiItem = abiItem;
  }
}
class InvalidAbiEncodingTypeError extends BaseError$1 {
  constructor(type, { docsPath: docsPath2 }) {
    super([
      `Type "${type}" is not a valid encoding type.`,
      "Please provide a valid ABI type."
    ].join("\n"), { docsPath: docsPath2, name: "InvalidAbiEncodingType" });
  }
}
class InvalidAbiDecodingTypeError extends BaseError$1 {
  constructor(type, { docsPath: docsPath2 }) {
    super([
      `Type "${type}" is not a valid decoding type.`,
      "Please provide a valid ABI type."
    ].join("\n"), { docsPath: docsPath2, name: "InvalidAbiDecodingType" });
  }
}
class InvalidArrayError extends BaseError$1 {
  constructor(value) {
    super([`Value "${value}" is not a valid array.`].join("\n"), {
      name: "InvalidArrayError"
    });
  }
}
class InvalidDefinitionTypeError extends BaseError$1 {
  constructor(type) {
    super([
      `"${type}" is not a valid definition type.`,
      'Valid types: "function", "event", "error"'
    ].join("\n"), { name: "InvalidDefinitionTypeError" });
  }
}
class UnsupportedPackedAbiType extends BaseError$1 {
  constructor(type) {
    super(`Type "${type}" is not supported for packed encoding.`, {
      name: "UnsupportedPackedAbiType"
    });
  }
}
class FilterTypeNotSupportedError extends BaseError$1 {
  constructor(type) {
    super(`Filter type "${type}" is not supported.`, {
      name: "FilterTypeNotSupportedError"
    });
  }
}
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
const rotlSH = (h, l, s) => h << s | l >>> 32 - s;
const rotlSL = (h, l, s) => l << s | h >>> 32 - s;
const rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
const rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
const crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function ahash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  anumber(h.outputLen);
  anumber(h.blockLen);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
function rotl(word, shift) {
  return word << shift | word >>> 32 - shift >>> 0;
}
const isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
  return arr;
}
const swap32IfBE = isLE ? (u) => u : byteSwap32;
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function concatBytes$1(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}
class Hash {
}
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto && typeof crypto.getRandomValues === "function") {
    return crypto.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto && typeof crypto.randomBytes === "function") {
    return Uint8Array.from(crypto.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}
const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const _7n = BigInt(7);
const _256n = BigInt(256);
const _0x71n = BigInt(113);
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = [];
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
const IOTAS = split(_SHA3_IOTA, true);
const SHA3_IOTA_H = IOTAS[0];
const SHA3_IOTA_L = IOTAS[1];
const rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
const rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  clean(B);
}
class Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    this.enableXOF = false;
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    anumber(outputLen);
    if (!(0 < blockLen && blockLen < 200))
      throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    swap32IfBE(this.state32);
    keccakP(this.state32, this.rounds);
    swap32IfBE(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { blockLen, state } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0; i < take; i++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    clean(this.state);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
}
const gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
const keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();
function keccak256(value, to_) {
  const to = to_ || "hex";
  const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes$1(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}
const hash = (value) => keccak256(toBytes$1(value));
function hashSignature(sig) {
  return hash(sig);
}
function normalizeSignature(signature) {
  let active = true;
  let current = "";
  let level = 0;
  let result = "";
  let valid = false;
  for (let i = 0; i < signature.length; i++) {
    const char = signature[i];
    if (["(", ")", ","].includes(char))
      active = true;
    if (char === "(")
      level++;
    if (char === ")")
      level--;
    if (!active)
      continue;
    if (level === 0) {
      if (char === " " && ["event", "function", ""].includes(result))
        result = "";
      else {
        result += char;
        if (char === ")") {
          valid = true;
          break;
        }
      }
      continue;
    }
    if (char === " ") {
      if (signature[i - 1] !== "," && current !== "," && current !== ",(") {
        current = "";
        active = false;
      }
      continue;
    }
    result += char;
    current += char;
  }
  if (!valid)
    throw new BaseError$1("Unable to normalize signature.");
  return result;
}
const toSignature = (def) => {
  const def_ = (() => {
    if (typeof def === "string")
      return def;
    return formatAbiItem$2(def);
  })();
  return normalizeSignature(def_);
};
function toSignatureHash(fn) {
  return hashSignature(toSignature(fn));
}
const toEventSelector = toSignatureHash;
class InvalidAddressError extends BaseError$1 {
  constructor({ address }) {
    super(`Address "${address}" is invalid.`, {
      metaMessages: [
        "- Address must be a hex value of 20 bytes (40 hex characters).",
        "- Address must match its checksum counterpart."
      ],
      name: "InvalidAddressError"
    });
  }
}
class LruMap extends Map {
  constructor(size2) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size2;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
}
const checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
function checksumAddress(address_, chainId) {
  if (checksumAddressCache.has(`${address_}.${chainId}`))
    return checksumAddressCache.get(`${address_}.${chainId}`);
  const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
  const hash2 = keccak256(stringToBytes(hexAddress), "bytes");
  const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash2[i >> 1] >> 4 >= 8 && address[i]) {
      address[i] = address[i].toUpperCase();
    }
    if ((hash2[i >> 1] & 15) >= 8 && address[i + 1]) {
      address[i + 1] = address[i + 1].toUpperCase();
    }
  }
  const result = `0x${address.join("")}`;
  checksumAddressCache.set(`${address_}.${chainId}`, result);
  return result;
}
function getAddress(address, chainId) {
  if (!isAddress(address, { strict: false }))
    throw new InvalidAddressError({ address });
  return checksumAddress(address, chainId);
}
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
const isAddressCache = /* @__PURE__ */ new LruMap(8192);
function isAddress(address, options) {
  const { strict = true } = options ?? {};
  const cacheKey = `${address}.${strict}`;
  if (isAddressCache.has(cacheKey))
    return isAddressCache.get(cacheKey);
  const result = (() => {
    if (!addressRegex.test(address))
      return false;
    if (address.toLowerCase() === address)
      return true;
    if (strict)
      return checksumAddress(address) === address;
    return true;
  })();
  isAddressCache.set(cacheKey, result);
  return result;
}
function concat(values) {
  if (typeof values[0] === "string")
    return concatHex(values);
  return concatBytes(values);
}
function concatBytes(values) {
  let length = 0;
  for (const arr of values) {
    length += arr.length;
  }
  const result = new Uint8Array(length);
  let offset = 0;
  for (const arr of values) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}
function concatHex(values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
function slice(value, start, end, { strict } = {}) {
  if (isHex(value, { strict: false }))
    return sliceHex(value, start, end, {
      strict
    });
  return sliceBytes(value, start, end, {
    strict
  });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size(value) - 1)
    throw new SliceOffsetOutOfBoundsError({
      offset: start,
      position: "start",
      size: size(value)
    });
}
function assertEndOffset(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError({
      offset: end,
      position: "end",
      size: size(value)
    });
  }
}
function sliceBytes(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = value_.slice(start, end);
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}
function sliceHex(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = `0x${value_.replace("0x", "").slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}
const arrayRegex$1 = /^(.*)\[([0-9]*)\]$/;
const bytesRegex$2 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
const integerRegex$2 = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
function encodeAbiParameters$1(params, values) {
  if (params.length !== values.length)
    throw new AbiEncodingLengthMismatchError({
      expectedLength: params.length,
      givenLength: values.length
    });
  const preparedParams = prepareParams$1({
    params,
    values
  });
  const data = encodeParams$1(preparedParams);
  if (data.length === 0)
    return "0x";
  return data;
}
function prepareParams$1({ params, values }) {
  const preparedParams = [];
  for (let i = 0; i < params.length; i++) {
    preparedParams.push(prepareParam$1({ param: params[i], value: values[i] }));
  }
  return preparedParams;
}
function prepareParam$1({ param, value }) {
  const arrayComponents = getArrayComponents$1(param.type);
  if (arrayComponents) {
    const [length, type] = arrayComponents;
    return encodeArray$1(value, { length, param: { ...param, type } });
  }
  if (param.type === "tuple") {
    return encodeTuple$1(value, {
      param
    });
  }
  if (param.type === "address") {
    return encodeAddress$1(value);
  }
  if (param.type === "bool") {
    return encodeBool$1(value);
  }
  if (param.type.startsWith("uint") || param.type.startsWith("int")) {
    const signed = param.type.startsWith("int");
    const [, , size2 = "256"] = integerRegex$2.exec(param.type) ?? [];
    return encodeNumber$1(value, {
      signed,
      size: Number(size2)
    });
  }
  if (param.type.startsWith("bytes")) {
    return encodeBytes$1(value, { param });
  }
  if (param.type === "string") {
    return encodeString$1(value);
  }
  throw new InvalidAbiEncodingTypeError(param.type, {
    docsPath: "/docs/contract/encodeAbiParameters"
  });
}
function encodeParams$1(preparedParams) {
  let staticSize = 0;
  for (let i = 0; i < preparedParams.length; i++) {
    const { dynamic, encoded } = preparedParams[i];
    if (dynamic)
      staticSize += 32;
    else
      staticSize += size(encoded);
  }
  const staticParams = [];
  const dynamicParams = [];
  let dynamicSize = 0;
  for (let i = 0; i < preparedParams.length; i++) {
    const { dynamic, encoded } = preparedParams[i];
    if (dynamic) {
      staticParams.push(numberToHex(staticSize + dynamicSize, { size: 32 }));
      dynamicParams.push(encoded);
      dynamicSize += size(encoded);
    } else {
      staticParams.push(encoded);
    }
  }
  return concat([...staticParams, ...dynamicParams]);
}
function encodeAddress$1(value) {
  if (!isAddress(value))
    throw new InvalidAddressError({ address: value });
  return { dynamic: false, encoded: padHex(value.toLowerCase()) };
}
function encodeArray$1(value, { length, param }) {
  const dynamic = length === null;
  if (!Array.isArray(value))
    throw new InvalidArrayError(value);
  if (!dynamic && value.length !== length)
    throw new AbiEncodingArrayLengthMismatchError({
      expectedLength: length,
      givenLength: value.length,
      type: `${param.type}[${length}]`
    });
  let dynamicChild = false;
  const preparedParams = [];
  for (let i = 0; i < value.length; i++) {
    const preparedParam = prepareParam$1({ param, value: value[i] });
    if (preparedParam.dynamic)
      dynamicChild = true;
    preparedParams.push(preparedParam);
  }
  if (dynamic || dynamicChild) {
    const data = encodeParams$1(preparedParams);
    if (dynamic) {
      const length2 = numberToHex(preparedParams.length, { size: 32 });
      return {
        dynamic: true,
        encoded: preparedParams.length > 0 ? concat([length2, data]) : length2
      };
    }
    if (dynamicChild)
      return { dynamic: true, encoded: data };
  }
  return {
    dynamic: false,
    encoded: concat(preparedParams.map(({ encoded }) => encoded))
  };
}
function encodeBytes$1(value, { param }) {
  const [, paramSize] = param.type.split("bytes");
  const bytesSize = size(value);
  if (!paramSize) {
    let value_ = value;
    if (bytesSize % 32 !== 0)
      value_ = padHex(value_, {
        dir: "right",
        size: Math.ceil((value.length - 2) / 2 / 32) * 32
      });
    return {
      dynamic: true,
      encoded: concat([padHex(numberToHex(bytesSize, { size: 32 })), value_])
    };
  }
  if (bytesSize !== Number.parseInt(paramSize, 10))
    throw new AbiEncodingBytesSizeMismatchError({
      expectedSize: Number.parseInt(paramSize, 10),
      value
    });
  return { dynamic: false, encoded: padHex(value, { dir: "right" }) };
}
function encodeBool$1(value) {
  if (typeof value !== "boolean")
    throw new BaseError$1(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
  return { dynamic: false, encoded: padHex(boolToHex(value)) };
}
function encodeNumber$1(value, { signed, size: size2 = 256 }) {
  if (typeof size2 === "number") {
    const max = 2n ** (BigInt(size2) - (signed ? 1n : 0n)) - 1n;
    const min = signed ? -max - 1n : 0n;
    if (value > max || value < min)
      throw new IntegerOutOfRangeError({
        max: max.toString(),
        min: min.toString(),
        signed,
        size: size2 / 8,
        value: value.toString()
      });
  }
  return {
    dynamic: false,
    encoded: numberToHex(value, {
      size: 32,
      signed
    })
  };
}
function encodeString$1(value) {
  const hexValue = stringToHex(value);
  const partsLength = Math.ceil(size(hexValue) / 32);
  const parts = [];
  for (let i = 0; i < partsLength; i++) {
    parts.push(padHex(slice(hexValue, i * 32, (i + 1) * 32), {
      dir: "right"
    }));
  }
  return {
    dynamic: true,
    encoded: concat([
      padHex(numberToHex(size(hexValue), { size: 32 })),
      ...parts
    ])
  };
}
function encodeTuple$1(value, { param }) {
  let dynamic = false;
  const preparedParams = [];
  for (let i = 0; i < param.components.length; i++) {
    const param_ = param.components[i];
    const index = Array.isArray(value) ? i : param_.name;
    const preparedParam = prepareParam$1({
      param: param_,
      value: value[index]
    });
    preparedParams.push(preparedParam);
    if (preparedParam.dynamic)
      dynamic = true;
  }
  return {
    dynamic,
    encoded: dynamic ? encodeParams$1(preparedParams) : concat(preparedParams.map(({ encoded }) => encoded))
  };
}
function getArrayComponents$1(type) {
  const matches = type.match(/^(.*)\[(\d+)?\]$/);
  return matches ? (
    // Return `null` if the array is dynamic.
    [matches[2] ? Number(matches[2]) : null, matches[1]]
  ) : void 0;
}
const toFunctionSelector = (fn) => slice(toSignatureHash(fn), 0, 4);
function getAbiItem(parameters) {
  const { abi, args = [], name } = parameters;
  const isSelector = isHex(name, { strict: false });
  const abiItems = abi.filter((abiItem) => {
    if (isSelector) {
      if (abiItem.type === "function")
        return toFunctionSelector(abiItem) === name;
      if (abiItem.type === "event")
        return toEventSelector(abiItem) === name;
      return false;
    }
    return "name" in abiItem && abiItem.name === name;
  });
  if (abiItems.length === 0)
    return void 0;
  if (abiItems.length === 1)
    return abiItems[0];
  let matchedAbiItem;
  for (const abiItem of abiItems) {
    if (!("inputs" in abiItem))
      continue;
    if (!args || args.length === 0) {
      if (!abiItem.inputs || abiItem.inputs.length === 0)
        return abiItem;
      continue;
    }
    if (!abiItem.inputs)
      continue;
    if (abiItem.inputs.length === 0)
      continue;
    if (abiItem.inputs.length !== args.length)
      continue;
    const matched = args.every((arg, index) => {
      const abiParameter = "inputs" in abiItem && abiItem.inputs[index];
      if (!abiParameter)
        return false;
      return isArgOfType(arg, abiParameter);
    });
    if (matched) {
      if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
        const ambiguousTypes = getAmbiguousTypes(abiItem.inputs, matchedAbiItem.inputs, args);
        if (ambiguousTypes)
          throw new AbiItemAmbiguityError({
            abiItem,
            type: ambiguousTypes[0]
          }, {
            abiItem: matchedAbiItem,
            type: ambiguousTypes[1]
          });
      }
      matchedAbiItem = abiItem;
    }
  }
  if (matchedAbiItem)
    return matchedAbiItem;
  return abiItems[0];
}
function isArgOfType(arg, abiParameter) {
  const argType = typeof arg;
  const abiParameterType = abiParameter.type;
  switch (abiParameterType) {
    case "address":
      return isAddress(arg, { strict: false });
    case "bool":
      return argType === "boolean";
    case "function":
      return argType === "string";
    case "string":
      return argType === "string";
    default: {
      if (abiParameterType === "tuple" && "components" in abiParameter)
        return Object.values(abiParameter.components).every((component, index) => {
          return isArgOfType(Object.values(arg)[index], component);
        });
      if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
        return argType === "number" || argType === "bigint";
      if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
        return argType === "string" || arg instanceof Uint8Array;
      if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
        return Array.isArray(arg) && arg.every((x) => isArgOfType(x, {
          ...abiParameter,
          // Pop off `[]` or `[M]` from end of type
          type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
        }));
      }
      return false;
    }
  }
}
function getAmbiguousTypes(sourceParameters, targetParameters, args) {
  for (const parameterIndex in sourceParameters) {
    const sourceParameter = sourceParameters[parameterIndex];
    const targetParameter = targetParameters[parameterIndex];
    if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter)
      return getAmbiguousTypes(sourceParameter.components, targetParameter.components, args[parameterIndex]);
    const types = [sourceParameter.type, targetParameter.type];
    const ambiguous = (() => {
      if (types.includes("address") && types.includes("bytes20"))
        return true;
      if (types.includes("address") && types.includes("string"))
        return isAddress(args[parameterIndex], { strict: false });
      if (types.includes("address") && types.includes("bytes"))
        return isAddress(args[parameterIndex], { strict: false });
      return false;
    })();
    if (ambiguous)
      return types;
  }
  return;
}
const docsPath$1 = "/docs/contract/encodeEventTopics";
function encodeEventTopics(parameters) {
  const { abi, eventName, args } = parameters;
  let abiItem = abi[0];
  if (eventName) {
    const item = getAbiItem({ abi, name: eventName });
    if (!item)
      throw new AbiEventNotFoundError(eventName, { docsPath: docsPath$1 });
    abiItem = item;
  }
  if (abiItem.type !== "event")
    throw new AbiEventNotFoundError(void 0, { docsPath: docsPath$1 });
  const definition = formatAbiItem$1(abiItem);
  const signature = toEventSelector(definition);
  let topics = [];
  if (args && "inputs" in abiItem) {
    const indexedInputs = abiItem.inputs?.filter((param) => "indexed" in param && param.indexed);
    const args_ = Array.isArray(args) ? args : Object.values(args).length > 0 ? indexedInputs?.map((x) => args[x.name]) ?? [] : [];
    if (args_.length > 0) {
      topics = indexedInputs?.map((param, i) => {
        if (Array.isArray(args_[i]))
          return args_[i].map((_, j) => encodeArg({ param, value: args_[i][j] }));
        return typeof args_[i] !== "undefined" && args_[i] !== null ? encodeArg({ param, value: args_[i] }) : null;
      }) ?? [];
    }
  }
  return [signature, ...topics];
}
function encodeArg({ param, value }) {
  if (param.type === "string" || param.type === "bytes")
    return keccak256(toBytes$1(value));
  if (param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
    throw new FilterTypeNotSupportedError(param.type);
  return encodeAbiParameters$1([param], [value]);
}
const panicReasons = {
  1: "An `assert` condition failed.",
  17: "Arithmetic operation resulted in underflow or overflow.",
  18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
  33: "Attempted to convert to an invalid type.",
  34: "Attempted to access a storage byte array that is incorrectly encoded.",
  49: "Performed `.pop()` on an empty array",
  50: "Array index is out of bounds.",
  65: "Allocated too much memory or created an array which is too large.",
  81: "Attempted to call a zero-initialized variable of internal function type."
};
const solidityError = {
  inputs: [
    {
      name: "message",
      type: "string"
    }
  ],
  name: "Error",
  type: "error"
};
const solidityPanic = {
  inputs: [
    {
      name: "reason",
      type: "uint256"
    }
  ],
  name: "Panic",
  type: "error"
};
class NegativeOffsetError extends BaseError$1 {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`, {
      name: "NegativeOffsetError"
    });
  }
}
class PositionOutOfBoundsError extends BaseError$1 {
  constructor({ length, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`, { name: "PositionOutOfBoundsError" });
  }
}
class RecursiveReadLimitExceededError extends BaseError$1 {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`, { name: "RecursiveReadLimitExceededError" });
  }
}
const staticCursor = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length, position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + length - 1);
    return this.bytes.subarray(position, position + length);
  },
  inspectUint8(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes) {
    this.assertPosition(this.position + bytes.length - 1);
    this.bytes.set(bytes, this.position);
    this.position += bytes.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & 255);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length, size2) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length);
    this.position += size2 ?? length;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
function createCursor(bytes, { recursiveReadLimit = 8192 } = {}) {
  const cursor = Object.create(staticCursor);
  cursor.bytes = bytes;
  cursor.dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  cursor.positionReadCount = /* @__PURE__ */ new Map();
  cursor.recursiveReadLimit = recursiveReadLimit;
  return cursor;
}
function fromBytes(bytes, toOrOpts) {
  const opts = typeof toOrOpts === "string" ? { to: toOrOpts } : toOrOpts;
  const to = opts.to;
  if (to === "number")
    return bytesToNumber(bytes, opts);
  if (to === "bigint")
    return bytesToBigInt(bytes, opts);
  if (to === "boolean")
    return bytesToBool(bytes, opts);
  if (to === "string")
    return bytesToString(bytes, opts);
  return bytesToHex(bytes, opts);
}
function bytesToBigInt(bytes, opts = {}) {
  if (typeof opts.size !== "undefined")
    assertSize(bytes, { size: opts.size });
  const hex = bytesToHex(bytes, opts);
  return hexToBigInt(hex, opts);
}
function bytesToBool(bytes_, opts = {}) {
  let bytes = bytes_;
  if (typeof opts.size !== "undefined") {
    assertSize(bytes, { size: opts.size });
    bytes = trim(bytes);
  }
  if (bytes.length > 1 || bytes[0] > 1)
    throw new InvalidBytesBooleanError(bytes);
  return Boolean(bytes[0]);
}
function bytesToNumber(bytes, opts = {}) {
  if (typeof opts.size !== "undefined")
    assertSize(bytes, { size: opts.size });
  const hex = bytesToHex(bytes, opts);
  return hexToNumber(hex, opts);
}
function bytesToString(bytes_, opts = {}) {
  let bytes = bytes_;
  if (typeof opts.size !== "undefined") {
    assertSize(bytes, { size: opts.size });
    bytes = trim(bytes, { dir: "right" });
  }
  return new TextDecoder().decode(bytes);
}
function decodeAbiParameters(params, data) {
  const bytes = typeof data === "string" ? hexToBytes(data) : data;
  const cursor = createCursor(bytes);
  if (size(bytes) === 0 && params.length > 0)
    throw new AbiDecodingZeroDataError();
  if (size(data) && size(data) < 32)
    throw new AbiDecodingDataSizeTooSmallError({
      data: typeof data === "string" ? data : bytesToHex(data),
      params,
      size: size(data)
    });
  let consumed = 0;
  const values = [];
  for (let i = 0; i < params.length; ++i) {
    const param = params[i];
    cursor.setPosition(consumed);
    const [data2, consumed_] = decodeParameter(cursor, param, {
      staticPosition: 0
    });
    consumed += consumed_;
    values.push(data2);
  }
  return values;
}
function decodeParameter(cursor, param, { staticPosition }) {
  const arrayComponents = getArrayComponents$1(param.type);
  if (arrayComponents) {
    const [length, type] = arrayComponents;
    return decodeArray(cursor, { ...param, type }, { length, staticPosition });
  }
  if (param.type === "tuple")
    return decodeTuple(cursor, param, { staticPosition });
  if (param.type === "address")
    return decodeAddress(cursor);
  if (param.type === "bool")
    return decodeBool(cursor);
  if (param.type.startsWith("bytes"))
    return decodeBytes(cursor, param, { staticPosition });
  if (param.type.startsWith("uint") || param.type.startsWith("int"))
    return decodeNumber(cursor, param);
  if (param.type === "string")
    return decodeString(cursor, { staticPosition });
  throw new InvalidAbiDecodingTypeError(param.type, {
    docsPath: "/docs/contract/decodeAbiParameters"
  });
}
const sizeOfLength = 32;
const sizeOfOffset = 32;
function decodeAddress(cursor) {
  const value = cursor.readBytes(32);
  return [checksumAddress(bytesToHex(sliceBytes(value, -20))), 32];
}
function decodeArray(cursor, param, { length, staticPosition }) {
  if (!length) {
    const offset = bytesToNumber(cursor.readBytes(sizeOfOffset));
    const start = staticPosition + offset;
    const startOfData = start + sizeOfLength;
    cursor.setPosition(start);
    const length2 = bytesToNumber(cursor.readBytes(sizeOfLength));
    const dynamicChild = hasDynamicChild(param);
    let consumed2 = 0;
    const value2 = [];
    for (let i = 0; i < length2; ++i) {
      cursor.setPosition(startOfData + (dynamicChild ? i * 32 : consumed2));
      const [data, consumed_] = decodeParameter(cursor, param, {
        staticPosition: startOfData
      });
      consumed2 += consumed_;
      value2.push(data);
    }
    cursor.setPosition(staticPosition + 32);
    return [value2, 32];
  }
  if (hasDynamicChild(param)) {
    const offset = bytesToNumber(cursor.readBytes(sizeOfOffset));
    const start = staticPosition + offset;
    const value2 = [];
    for (let i = 0; i < length; ++i) {
      cursor.setPosition(start + i * 32);
      const [data] = decodeParameter(cursor, param, {
        staticPosition: start
      });
      value2.push(data);
    }
    cursor.setPosition(staticPosition + 32);
    return [value2, 32];
  }
  let consumed = 0;
  const value = [];
  for (let i = 0; i < length; ++i) {
    const [data, consumed_] = decodeParameter(cursor, param, {
      staticPosition: staticPosition + consumed
    });
    consumed += consumed_;
    value.push(data);
  }
  return [value, consumed];
}
function decodeBool(cursor) {
  return [bytesToBool(cursor.readBytes(32), { size: 32 }), 32];
}
function decodeBytes(cursor, param, { staticPosition }) {
  const [_, size2] = param.type.split("bytes");
  if (!size2) {
    const offset = bytesToNumber(cursor.readBytes(32));
    cursor.setPosition(staticPosition + offset);
    const length = bytesToNumber(cursor.readBytes(32));
    if (length === 0) {
      cursor.setPosition(staticPosition + 32);
      return ["0x", 32];
    }
    const data = cursor.readBytes(length);
    cursor.setPosition(staticPosition + 32);
    return [bytesToHex(data), 32];
  }
  const value = bytesToHex(cursor.readBytes(Number.parseInt(size2, 10), 32));
  return [value, 32];
}
function decodeNumber(cursor, param) {
  const signed = param.type.startsWith("int");
  const size2 = Number.parseInt(param.type.split("int")[1] || "256", 10);
  const value = cursor.readBytes(32);
  return [
    size2 > 48 ? bytesToBigInt(value, { signed }) : bytesToNumber(value, { signed }),
    32
  ];
}
function decodeTuple(cursor, param, { staticPosition }) {
  const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
  const value = hasUnnamedChild ? [] : {};
  let consumed = 0;
  if (hasDynamicChild(param)) {
    const offset = bytesToNumber(cursor.readBytes(sizeOfOffset));
    const start = staticPosition + offset;
    for (let i = 0; i < param.components.length; ++i) {
      const component = param.components[i];
      cursor.setPosition(start + consumed);
      const [data, consumed_] = decodeParameter(cursor, component, {
        staticPosition: start
      });
      consumed += consumed_;
      value[hasUnnamedChild ? i : component?.name] = data;
    }
    cursor.setPosition(staticPosition + 32);
    return [value, 32];
  }
  for (let i = 0; i < param.components.length; ++i) {
    const component = param.components[i];
    const [data, consumed_] = decodeParameter(cursor, component, {
      staticPosition
    });
    value[hasUnnamedChild ? i : component?.name] = data;
    consumed += consumed_;
  }
  return [value, consumed];
}
function decodeString(cursor, { staticPosition }) {
  const offset = bytesToNumber(cursor.readBytes(32));
  const start = staticPosition + offset;
  cursor.setPosition(start);
  const length = bytesToNumber(cursor.readBytes(32));
  if (length === 0) {
    cursor.setPosition(staticPosition + 32);
    return ["", 32];
  }
  const data = cursor.readBytes(length, 32);
  const value = bytesToString(trim(data));
  cursor.setPosition(staticPosition + 32);
  return [value, 32];
}
function hasDynamicChild(param) {
  const { type } = param;
  if (type === "string")
    return true;
  if (type === "bytes")
    return true;
  if (type.endsWith("[]"))
    return true;
  if (type === "tuple")
    return param.components?.some(hasDynamicChild);
  const arrayComponents = getArrayComponents$1(param.type);
  if (arrayComponents && hasDynamicChild({ ...param, type: arrayComponents[1] }))
    return true;
  return false;
}
function decodeErrorResult(parameters) {
  const { abi, data } = parameters;
  const signature = slice(data, 0, 4);
  if (signature === "0x")
    throw new AbiDecodingZeroDataError();
  const abi_ = [...abi || [], solidityError, solidityPanic];
  const abiItem = abi_.find((x) => x.type === "error" && signature === toFunctionSelector(formatAbiItem$1(x)));
  if (!abiItem)
    throw new AbiErrorSignatureNotFoundError(signature, {
      docsPath: "/docs/contract/decodeErrorResult"
    });
  return {
    abiItem,
    args: "inputs" in abiItem && abiItem.inputs && abiItem.inputs.length > 0 ? decodeAbiParameters(abiItem.inputs, slice(data, 4)) : void 0,
    errorName: abiItem.name
  };
}
const stringify = (value, replacer, space) => JSON.stringify(value, (key, value_) => {
  const value2 = typeof value_ === "bigint" ? value_.toString() : value_;
  return typeof replacer === "function" ? replacer(key, value2) : value2;
}, space);
const rpcTransactionType = {
  legacy: "0x0",
  eip2930: "0x1",
  eip1559: "0x2",
  eip4844: "0x3",
  eip7702: "0x4"
};
function formatTransactionRequest(request, _) {
  const rpcRequest = {};
  if (typeof request.authorizationList !== "undefined")
    rpcRequest.authorizationList = formatAuthorizationList(request.authorizationList);
  if (typeof request.accessList !== "undefined")
    rpcRequest.accessList = request.accessList;
  if (typeof request.blobVersionedHashes !== "undefined")
    rpcRequest.blobVersionedHashes = request.blobVersionedHashes;
  if (typeof request.blobs !== "undefined") {
    if (typeof request.blobs[0] !== "string")
      rpcRequest.blobs = request.blobs.map((x) => bytesToHex(x));
    else
      rpcRequest.blobs = request.blobs;
  }
  if (typeof request.data !== "undefined")
    rpcRequest.data = request.data;
  if (request.account)
    rpcRequest.from = request.account.address;
  if (typeof request.from !== "undefined")
    rpcRequest.from = request.from;
  if (typeof request.gas !== "undefined")
    rpcRequest.gas = numberToHex(request.gas);
  if (typeof request.gasPrice !== "undefined")
    rpcRequest.gasPrice = numberToHex(request.gasPrice);
  if (typeof request.maxFeePerBlobGas !== "undefined")
    rpcRequest.maxFeePerBlobGas = numberToHex(request.maxFeePerBlobGas);
  if (typeof request.maxFeePerGas !== "undefined")
    rpcRequest.maxFeePerGas = numberToHex(request.maxFeePerGas);
  if (typeof request.maxPriorityFeePerGas !== "undefined")
    rpcRequest.maxPriorityFeePerGas = numberToHex(request.maxPriorityFeePerGas);
  if (typeof request.nonce !== "undefined")
    rpcRequest.nonce = numberToHex(request.nonce);
  if (typeof request.to !== "undefined")
    rpcRequest.to = request.to;
  if (typeof request.type !== "undefined")
    rpcRequest.type = rpcTransactionType[request.type];
  if (typeof request.value !== "undefined")
    rpcRequest.value = numberToHex(request.value);
  return rpcRequest;
}
const defineTransactionRequest = /* @__PURE__ */ defineFormatter("transactionRequest", formatTransactionRequest);
function formatAuthorizationList(authorizationList) {
  return authorizationList.map((authorization) => ({
    address: authorization.address,
    r: authorization.r ? numberToHex(BigInt(authorization.r)) : authorization.r,
    s: authorization.s ? numberToHex(BigInt(authorization.s)) : authorization.s,
    chainId: numberToHex(authorization.chainId),
    nonce: numberToHex(authorization.nonce),
    ...typeof authorization.yParity !== "undefined" ? { yParity: numberToHex(authorization.yParity) } : {},
    ...typeof authorization.v !== "undefined" && typeof authorization.yParity === "undefined" ? { v: numberToHex(authorization.v) } : {}
  }));
}
function formatBlock(block, _) {
  const transactions = (block.transactions ?? []).map((transaction) => {
    if (typeof transaction === "string")
      return transaction;
    return formatTransaction(transaction);
  });
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
    difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
    excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : void 0,
    timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  };
}
const defineBlock = /* @__PURE__ */ defineFormatter("block", formatBlock);
function isAddressEqual(a, b) {
  if (!isAddress(a, { strict: false }))
    throw new InvalidAddressError({ address: a });
  if (!isAddress(b, { strict: false }))
    throw new InvalidAddressError({ address: b });
  return a.toLowerCase() === b.toLowerCase();
}
const docsPath = "/docs/contract/decodeEventLog";
function decodeEventLog(parameters) {
  const { abi, data, strict: strict_, topics } = parameters;
  const strict = strict_ ?? true;
  const [signature, ...argTopics] = topics;
  if (!signature)
    throw new AbiEventSignatureEmptyTopicsError({ docsPath });
  const abiItem = abi.find((x) => x.type === "event" && signature === toEventSelector(formatAbiItem$1(x)));
  if (!(abiItem && "name" in abiItem) || abiItem.type !== "event")
    throw new AbiEventSignatureNotFoundError(signature, { docsPath });
  const { name, inputs } = abiItem;
  const isUnnamed = inputs?.some((x) => !("name" in x && x.name));
  const args = isUnnamed ? [] : {};
  const indexedInputs = inputs.map((x, i) => [x, i]).filter(([x]) => "indexed" in x && x.indexed);
  for (let i = 0; i < indexedInputs.length; i++) {
    const [param, argIndex] = indexedInputs[i];
    const topic = argTopics[i];
    if (!topic)
      throw new DecodeLogTopicsMismatch({
        abiItem,
        param
      });
    args[isUnnamed ? argIndex : param.name || argIndex] = decodeTopic({
      param,
      value: topic
    });
  }
  const nonIndexedInputs = inputs.filter((x) => !("indexed" in x && x.indexed));
  if (nonIndexedInputs.length > 0) {
    if (data && data !== "0x") {
      try {
        const decodedData = decodeAbiParameters(nonIndexedInputs, data);
        if (decodedData) {
          if (isUnnamed)
            for (let i = 0; i < inputs.length; i++)
              args[i] = args[i] ?? decodedData.shift();
          else
            for (let i = 0; i < nonIndexedInputs.length; i++)
              args[nonIndexedInputs[i].name] = decodedData[i];
        }
      } catch (err) {
        if (strict) {
          if (err instanceof AbiDecodingDataSizeTooSmallError || err instanceof PositionOutOfBoundsError)
            throw new DecodeLogDataMismatch({
              abiItem,
              data,
              params: nonIndexedInputs,
              size: size(data)
            });
          throw err;
        }
      }
    } else if (strict) {
      throw new DecodeLogDataMismatch({
        abiItem,
        data: "0x",
        params: nonIndexedInputs,
        size: 0
      });
    }
  }
  return {
    eventName: name,
    args: Object.values(args).length > 0 ? args : void 0
  };
}
function decodeTopic({ param, value }) {
  if (param.type === "string" || param.type === "bytes" || param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
    return value;
  const decodedArg = decodeAbiParameters([param], value) || [];
  return decodedArg[0];
}
function parseEventLogs$1(parameters) {
  const { abi, args, logs, strict = true } = parameters;
  const eventName = (() => {
    if (!parameters.eventName)
      return void 0;
    if (Array.isArray(parameters.eventName))
      return parameters.eventName;
    return [parameters.eventName];
  })();
  return logs.map((log) => {
    try {
      const abiItem = abi.find((abiItem2) => abiItem2.type === "event" && log.topics[0] === toEventSelector(abiItem2));
      if (!abiItem)
        return null;
      const event = decodeEventLog({
        ...log,
        abi: [abiItem],
        strict
      });
      if (eventName && !eventName.includes(event.eventName))
        return null;
      if (!includesArgs({
        args: event.args,
        inputs: abiItem.inputs,
        matchArgs: args
      }))
        return null;
      return { ...event, ...log };
    } catch (err) {
      let eventName2;
      let isUnnamed;
      if (err instanceof AbiEventSignatureNotFoundError)
        return null;
      if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
        if (strict)
          return null;
        eventName2 = err.abiItem.name;
        isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
      }
      return { ...log, args: isUnnamed ? [] : {}, eventName: eventName2 };
    }
  }).filter(Boolean);
}
function includesArgs(parameters) {
  const { args, inputs, matchArgs } = parameters;
  if (!matchArgs)
    return true;
  if (!args)
    return false;
  function isEqual(input, value, arg) {
    try {
      if (input.type === "address")
        return isAddressEqual(value, arg);
      if (input.type === "string" || input.type === "bytes")
        return keccak256(toBytes$1(value)) === arg;
      return value === arg;
    } catch {
      return false;
    }
  }
  if (Array.isArray(args) && Array.isArray(matchArgs)) {
    return matchArgs.every((value, index) => {
      if (value === null || value === void 0)
        return true;
      const input = inputs[index];
      if (!input)
        return false;
      const value_ = Array.isArray(value) ? value : [value];
      return value_.some((value2) => isEqual(input, value2, args[index]));
    });
  }
  if (typeof args === "object" && !Array.isArray(args) && typeof matchArgs === "object" && !Array.isArray(matchArgs))
    return Object.entries(matchArgs).every(([key, value]) => {
      if (value === null || value === void 0)
        return true;
      const input = inputs.find((input2) => input2.name === key);
      if (!input)
        return false;
      const value_ = Array.isArray(value) ? value : [value];
      return value_.some((value2) => isEqual(input, value2, args[key]));
    });
  return false;
}
function defineChain(chain) {
  return {
    formatters: void 0,
    fees: void 0,
    serializers: void 0,
    ...chain
  };
}
const version = "1.0.8";
class BaseError extends Error {
  constructor(shortMessage, args = {}) {
    const details = args.cause instanceof BaseError ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
    const docsPath2 = args.cause instanceof BaseError ? args.cause.docsPath || args.docsPath : args.docsPath;
    const message = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      ...docsPath2 ? [`Docs: https://abitype.dev${docsPath2}`] : [],
      ...details ? [`Details: ${details}`] : [],
      `Version: abitype@${version}`
    ].join("\n");
    super(message);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "metaMessages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiTypeError"
    });
    if (args.cause)
      this.cause = args.cause;
    this.details = details;
    this.docsPath = docsPath2;
    this.metaMessages = args.metaMessages;
    this.shortMessage = shortMessage;
  }
}
function execTyped(regex, string) {
  const match = regex.exec(string);
  return match?.groups;
}
const bytesRegex$1 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
const integerRegex$1 = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
const isTupleRegex = /^\(.+?\).*?$/;
const tupleRegex = /^tuple(?<array>(\[(\d*)\])*)$/;
function formatAbiParameter(abiParameter) {
  let type = abiParameter.type;
  if (tupleRegex.test(abiParameter.type) && "components" in abiParameter) {
    type = "(";
    const length = abiParameter.components.length;
    for (let i = 0; i < length; i++) {
      const component = abiParameter.components[i];
      type += formatAbiParameter(component);
      if (i < length - 1)
        type += ", ";
    }
    const result = execTyped(tupleRegex, abiParameter.type);
    type += `)${result?.array ?? ""}`;
    return formatAbiParameter({
      ...abiParameter,
      type
    });
  }
  if ("indexed" in abiParameter && abiParameter.indexed)
    type = `${type} indexed`;
  if (abiParameter.name)
    return `${type} ${abiParameter.name}`;
  return type;
}
function formatAbiParameters(abiParameters) {
  let params = "";
  const length = abiParameters.length;
  for (let i = 0; i < length; i++) {
    const abiParameter = abiParameters[i];
    params += formatAbiParameter(abiParameter);
    if (i !== length - 1)
      params += ", ";
  }
  return params;
}
function formatAbiItem(abiItem) {
  if (abiItem.type === "function")
    return `function ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability && abiItem.stateMutability !== "nonpayable" ? ` ${abiItem.stateMutability}` : ""}${abiItem.outputs?.length ? ` returns (${formatAbiParameters(abiItem.outputs)})` : ""}`;
  if (abiItem.type === "event")
    return `event ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
  if (abiItem.type === "error")
    return `error ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
  if (abiItem.type === "constructor")
    return `constructor(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability === "payable" ? " payable" : ""}`;
  if (abiItem.type === "fallback")
    return `fallback() external${abiItem.stateMutability === "payable" ? " payable" : ""}`;
  return "receive() external payable";
}
function formatAbi(abi) {
  const signatures = [];
  const length = abi.length;
  for (let i = 0; i < length; i++) {
    const abiItem = abi[i];
    const signature = formatAbiItem(abiItem);
    signatures.push(signature);
  }
  return signatures;
}
const errorSignatureRegex = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function isErrorSignature(signature) {
  return errorSignatureRegex.test(signature);
}
function execErrorSignature(signature) {
  return execTyped(errorSignatureRegex, signature);
}
const eventSignatureRegex = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function isEventSignature(signature) {
  return eventSignatureRegex.test(signature);
}
function execEventSignature(signature) {
  return execTyped(eventSignatureRegex, signature);
}
const functionSignatureRegex = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
function isFunctionSignature(signature) {
  return functionSignatureRegex.test(signature);
}
function execFunctionSignature(signature) {
  return execTyped(functionSignatureRegex, signature);
}
const structSignatureRegex = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
function isStructSignature(signature) {
  return structSignatureRegex.test(signature);
}
function execStructSignature(signature) {
  return execTyped(structSignatureRegex, signature);
}
const constructorSignatureRegex = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function isConstructorSignature(signature) {
  return constructorSignatureRegex.test(signature);
}
function execConstructorSignature(signature) {
  return execTyped(constructorSignatureRegex, signature);
}
const fallbackSignatureRegex = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
function isFallbackSignature(signature) {
  return fallbackSignatureRegex.test(signature);
}
function execFallbackSignature(signature) {
  return execTyped(fallbackSignatureRegex, signature);
}
const receiveSignatureRegex = /^receive\(\) external payable$/;
function isReceiveSignature(signature) {
  return receiveSignatureRegex.test(signature);
}
const eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
const functionModifiers = /* @__PURE__ */ new Set([
  "calldata",
  "memory",
  "storage"
]);
class InvalidAbiItemError extends BaseError {
  constructor({ signature }) {
    super("Failed to parse ABI item.", {
      details: `parseAbiItem(${JSON.stringify(signature, null, 2)})`,
      docsPath: "/api/human#parseabiitem-1"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAbiItemError"
    });
  }
}
class UnknownTypeError extends BaseError {
  constructor({ type }) {
    super("Unknown type.", {
      metaMessages: [
        `Type "${type}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnknownTypeError"
    });
  }
}
class UnknownSolidityTypeError extends BaseError {
  constructor({ type }) {
    super("Unknown type.", {
      metaMessages: [`Type "${type}" is not a valid ABI type.`]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnknownSolidityTypeError"
    });
  }
}
class InvalidParameterError extends BaseError {
  constructor({ param }) {
    super("Invalid ABI parameter.", {
      details: param
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidParameterError"
    });
  }
}
class SolidityProtectedKeywordError extends BaseError {
  constructor({ param, name }) {
    super("Invalid ABI parameter.", {
      details: param,
      metaMessages: [
        `"${name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SolidityProtectedKeywordError"
    });
  }
}
class InvalidModifierError extends BaseError {
  constructor({ param, type, modifier }) {
    super("Invalid ABI parameter.", {
      details: param,
      metaMessages: [
        `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidModifierError"
    });
  }
}
class InvalidFunctionModifierError extends BaseError {
  constructor({ param, type, modifier }) {
    super("Invalid ABI parameter.", {
      details: param,
      metaMessages: [
        `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`,
        `Data location can only be specified for array, struct, or mapping types, but "${modifier}" was given.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidFunctionModifierError"
    });
  }
}
class InvalidAbiTypeParameterError extends BaseError {
  constructor({ abiParameter }) {
    super("Invalid ABI parameter.", {
      details: JSON.stringify(abiParameter, null, 2),
      metaMessages: ["ABI parameter type is invalid."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAbiTypeParameterError"
    });
  }
}
class InvalidSignatureError extends BaseError {
  constructor({ signature, type }) {
    super(`Invalid ${type} signature.`, {
      details: signature
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidSignatureError"
    });
  }
}
class UnknownSignatureError extends BaseError {
  constructor({ signature }) {
    super("Unknown signature.", {
      details: signature
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnknownSignatureError"
    });
  }
}
class InvalidStructSignatureError extends BaseError {
  constructor({ signature }) {
    super("Invalid struct signature.", {
      details: signature,
      metaMessages: ["No properties exist."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidStructSignatureError"
    });
  }
}
class CircularReferenceError extends BaseError {
  constructor({ type }) {
    super("Circular reference detected.", {
      metaMessages: [`Struct "${type}" is a circular reference.`]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "CircularReferenceError"
    });
  }
}
class InvalidParenthesisError extends BaseError {
  constructor({ current, depth }) {
    super("Unbalanced parentheses.", {
      metaMessages: [
        `"${current.trim()}" has too many ${depth > 0 ? "opening" : "closing"} parentheses.`
      ],
      details: `Depth "${depth}"`
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidParenthesisError"
    });
  }
}
function getParameterCacheKey(param, type, structs) {
  let structKey = "";
  if (structs)
    for (const struct of Object.entries(structs)) {
      if (!struct)
        continue;
      let propertyKey = "";
      for (const property of struct[1]) {
        propertyKey += `[${property.type}${property.name ? `:${property.name}` : ""}]`;
      }
      structKey += `(${struct[0]}{${propertyKey}})`;
    }
  if (type)
    return `${type}:${param}${structKey}`;
  return param;
}
const parameterCache = /* @__PURE__ */ new Map([
  // Unnamed
  ["address", { type: "address" }],
  ["bool", { type: "bool" }],
  ["bytes", { type: "bytes" }],
  ["bytes32", { type: "bytes32" }],
  ["int", { type: "int256" }],
  ["int256", { type: "int256" }],
  ["string", { type: "string" }],
  ["uint", { type: "uint256" }],
  ["uint8", { type: "uint8" }],
  ["uint16", { type: "uint16" }],
  ["uint24", { type: "uint24" }],
  ["uint32", { type: "uint32" }],
  ["uint64", { type: "uint64" }],
  ["uint96", { type: "uint96" }],
  ["uint112", { type: "uint112" }],
  ["uint160", { type: "uint160" }],
  ["uint192", { type: "uint192" }],
  ["uint256", { type: "uint256" }],
  // Named
  ["address owner", { type: "address", name: "owner" }],
  ["address to", { type: "address", name: "to" }],
  ["bool approved", { type: "bool", name: "approved" }],
  ["bytes _data", { type: "bytes", name: "_data" }],
  ["bytes data", { type: "bytes", name: "data" }],
  ["bytes signature", { type: "bytes", name: "signature" }],
  ["bytes32 hash", { type: "bytes32", name: "hash" }],
  ["bytes32 r", { type: "bytes32", name: "r" }],
  ["bytes32 root", { type: "bytes32", name: "root" }],
  ["bytes32 s", { type: "bytes32", name: "s" }],
  ["string name", { type: "string", name: "name" }],
  ["string symbol", { type: "string", name: "symbol" }],
  ["string tokenURI", { type: "string", name: "tokenURI" }],
  ["uint tokenId", { type: "uint256", name: "tokenId" }],
  ["uint8 v", { type: "uint8", name: "v" }],
  ["uint256 balance", { type: "uint256", name: "balance" }],
  ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
  ["uint256 value", { type: "uint256", name: "value" }],
  // Indexed
  [
    "event:address indexed from",
    { type: "address", name: "from", indexed: true }
  ],
  ["event:address indexed to", { type: "address", name: "to", indexed: true }],
  [
    "event:uint indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: true }
  ],
  [
    "event:uint256 indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: true }
  ]
]);
function parseSignature(signature, structs = {}) {
  if (isFunctionSignature(signature))
    return parseFunctionSignature(signature, structs);
  if (isEventSignature(signature))
    return parseEventSignature(signature, structs);
  if (isErrorSignature(signature))
    return parseErrorSignature(signature, structs);
  if (isConstructorSignature(signature))
    return parseConstructorSignature(signature, structs);
  if (isFallbackSignature(signature))
    return parseFallbackSignature(signature);
  if (isReceiveSignature(signature))
    return {
      type: "receive",
      stateMutability: "payable"
    };
  throw new UnknownSignatureError({ signature });
}
function parseFunctionSignature(signature, structs = {}) {
  const match = execFunctionSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "function" });
  const inputParams = splitParameters(match.parameters);
  const inputs = [];
  const inputLength = inputParams.length;
  for (let i = 0; i < inputLength; i++) {
    inputs.push(parseAbiParameter(inputParams[i], {
      modifiers: functionModifiers,
      structs,
      type: "function"
    }));
  }
  const outputs = [];
  if (match.returns) {
    const outputParams = splitParameters(match.returns);
    const outputLength = outputParams.length;
    for (let i = 0; i < outputLength; i++) {
      outputs.push(parseAbiParameter(outputParams[i], {
        modifiers: functionModifiers,
        structs,
        type: "function"
      }));
    }
  }
  return {
    name: match.name,
    type: "function",
    stateMutability: match.stateMutability ?? "nonpayable",
    inputs,
    outputs
  };
}
function parseEventSignature(signature, structs = {}) {
  const match = execEventSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "event" });
  const params = splitParameters(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter(params[i], {
      modifiers: eventModifiers,
      structs,
      type: "event"
    }));
  return { name: match.name, type: "event", inputs: abiParameters };
}
function parseErrorSignature(signature, structs = {}) {
  const match = execErrorSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "error" });
  const params = splitParameters(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter(params[i], { structs, type: "error" }));
  return { name: match.name, type: "error", inputs: abiParameters };
}
function parseConstructorSignature(signature, structs = {}) {
  const match = execConstructorSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "constructor" });
  const params = splitParameters(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter(params[i], { structs, type: "constructor" }));
  return {
    type: "constructor",
    stateMutability: match.stateMutability ?? "nonpayable",
    inputs: abiParameters
  };
}
function parseFallbackSignature(signature) {
  const match = execFallbackSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "fallback" });
  return {
    type: "fallback",
    stateMutability: match.stateMutability ?? "nonpayable"
  };
}
const abiParameterWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
const abiParameterWithTupleRegex = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
const dynamicIntegerRegex = /^u?int$/;
function parseAbiParameter(param, options) {
  const parameterCacheKey = getParameterCacheKey(param, options?.type, options?.structs);
  if (parameterCache.has(parameterCacheKey))
    return parameterCache.get(parameterCacheKey);
  const isTuple = isTupleRegex.test(param);
  const match = execTyped(isTuple ? abiParameterWithTupleRegex : abiParameterWithoutTupleRegex, param);
  if (!match)
    throw new InvalidParameterError({ param });
  if (match.name && isSolidityKeyword(match.name))
    throw new SolidityProtectedKeywordError({ param, name: match.name });
  const name = match.name ? { name: match.name } : {};
  const indexed = match.modifier === "indexed" ? { indexed: true } : {};
  const structs = options?.structs ?? {};
  let type;
  let components = {};
  if (isTuple) {
    type = "tuple";
    const params = splitParameters(match.type);
    const components_ = [];
    const length = params.length;
    for (let i = 0; i < length; i++) {
      components_.push(parseAbiParameter(params[i], { structs }));
    }
    components = { components: components_ };
  } else if (match.type in structs) {
    type = "tuple";
    components = { components: structs[match.type] };
  } else if (dynamicIntegerRegex.test(match.type)) {
    type = `${match.type}256`;
  } else {
    type = match.type;
    if (!(options?.type === "struct") && !isSolidityType(type))
      throw new UnknownSolidityTypeError({ type });
  }
  if (match.modifier) {
    if (!options?.modifiers?.has?.(match.modifier))
      throw new InvalidModifierError({
        param,
        type: options?.type,
        modifier: match.modifier
      });
    if (functionModifiers.has(match.modifier) && !isValidDataLocation(type, !!match.array))
      throw new InvalidFunctionModifierError({
        param,
        type: options?.type,
        modifier: match.modifier
      });
  }
  const abiParameter = {
    type: `${type}${match.array ?? ""}`,
    ...name,
    ...indexed,
    ...components
  };
  parameterCache.set(parameterCacheKey, abiParameter);
  return abiParameter;
}
function splitParameters(params, result = [], current = "", depth = 0) {
  const length = params.trim().length;
  for (let i = 0; i < length; i++) {
    const char = params[i];
    const tail = params.slice(i + 1);
    switch (char) {
      case ",":
        return depth === 0 ? splitParameters(tail, [...result, current.trim()]) : splitParameters(tail, result, `${current}${char}`, depth);
      case "(":
        return splitParameters(tail, result, `${current}${char}`, depth + 1);
      case ")":
        return splitParameters(tail, result, `${current}${char}`, depth - 1);
      default:
        return splitParameters(tail, result, `${current}${char}`, depth);
    }
  }
  if (current === "")
    return result;
  if (depth !== 0)
    throw new InvalidParenthesisError({ current, depth });
  result.push(current.trim());
  return result;
}
function isSolidityType(type) {
  return type === "address" || type === "bool" || type === "function" || type === "string" || bytesRegex$1.test(type) || integerRegex$1.test(type);
}
const protectedKeywordsRegex = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
function isSolidityKeyword(name) {
  return name === "address" || name === "bool" || name === "function" || name === "string" || name === "tuple" || bytesRegex$1.test(name) || integerRegex$1.test(name) || protectedKeywordsRegex.test(name);
}
function isValidDataLocation(type, isArray) {
  return isArray || type === "bytes" || type === "string" || type === "tuple";
}
function parseStructs(signatures) {
  const shallowStructs = {};
  const signaturesLength = signatures.length;
  for (let i = 0; i < signaturesLength; i++) {
    const signature = signatures[i];
    if (!isStructSignature(signature))
      continue;
    const match = execStructSignature(signature);
    if (!match)
      throw new InvalidSignatureError({ signature, type: "struct" });
    const properties = match.properties.split(";");
    const components = [];
    const propertiesLength = properties.length;
    for (let k = 0; k < propertiesLength; k++) {
      const property = properties[k];
      const trimmed = property.trim();
      if (!trimmed)
        continue;
      const abiParameter = parseAbiParameter(trimmed, {
        type: "struct"
      });
      components.push(abiParameter);
    }
    if (!components.length)
      throw new InvalidStructSignatureError({ signature });
    shallowStructs[match.name] = components;
  }
  const resolvedStructs = {};
  const entries = Object.entries(shallowStructs);
  const entriesLength = entries.length;
  for (let i = 0; i < entriesLength; i++) {
    const [name, parameters] = entries[i];
    resolvedStructs[name] = resolveStructs(parameters, shallowStructs);
  }
  return resolvedStructs;
}
const typeWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
function resolveStructs(abiParameters, structs, ancestors = /* @__PURE__ */ new Set()) {
  const components = [];
  const length = abiParameters.length;
  for (let i = 0; i < length; i++) {
    const abiParameter = abiParameters[i];
    const isTuple = isTupleRegex.test(abiParameter.type);
    if (isTuple)
      components.push(abiParameter);
    else {
      const match = execTyped(typeWithoutTupleRegex, abiParameter.type);
      if (!match?.type)
        throw new InvalidAbiTypeParameterError({ abiParameter });
      const { array, type } = match;
      if (type in structs) {
        if (ancestors.has(type))
          throw new CircularReferenceError({ type });
        components.push({
          ...abiParameter,
          type: `tuple${array ?? ""}`,
          components: resolveStructs(structs[type] ?? [], structs, /* @__PURE__ */ new Set([...ancestors, type]))
        });
      } else {
        if (isSolidityType(type))
          components.push(abiParameter);
        else
          throw new UnknownTypeError({ type });
      }
    }
  }
  return components;
}
function parseAbi(signatures) {
  const structs = parseStructs(signatures);
  const abi = [];
  const length = signatures.length;
  for (let i = 0; i < length; i++) {
    const signature = signatures[i];
    if (isStructSignature(signature))
      continue;
    abi.push(parseSignature(signature, structs));
  }
  return abi;
}
function parseAbiItem(signature) {
  let abiItem;
  if (typeof signature === "string")
    abiItem = parseSignature(signature);
  else {
    const structs = parseStructs(signature);
    const length = signature.length;
    for (let i = 0; i < length; i++) {
      const signature_ = signature[i];
      if (isStructSignature(signature_))
        continue;
      abiItem = parseSignature(signature_, structs);
      break;
    }
  }
  if (!abiItem)
    throw new InvalidAbiItemError({ signature });
  return abiItem;
}
const sepolia = /* @__PURE__ */ defineChain({
  id: 11155111,
  name: "Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://11155111.rpc.thirdweb.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
      apiUrl: "https://api-sepolia.etherscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 751532
    },
    ensUniversalResolver: {
      address: "0xeeeeeeee14d718c2b47d9923deab1335e144eeee",
      blockCreated: 8928790
    }
  },
  testnet: true
});
const DEFAULT_GATEWAY = "https://{clientId}.ipfscdn.io/ipfs/{cid}";
function resolveScheme(options) {
  if (options.uri.startsWith("ipfs://")) {
    const gateway = options.client.config?.storage?.gatewayUrl ?? DEFAULT_GATEWAY;
    const clientId = options.client.clientId;
    const cid = findIPFSCidFromUri(options.uri);
    let bundleId;
    if (typeof globalThis !== "undefined" && "Application" in globalThis) {
      bundleId = globalThis.Application.applicationId;
    }
    return `${gateway.replace("{clientId}", clientId).split("/ipfs")[0]}/ipfs/${cid}${bundleId ? `?bundleId=${bundleId}` : ""}`;
  }
  if (options.uri.startsWith("http")) {
    return options.uri;
  }
  throw new Error(`Invalid URI scheme, expected "ipfs://" or "http(s)://"`);
}
function findIPFSCidFromUri(uri) {
  if (!uri.startsWith("ipfs://")) {
    return uri;
  }
  const firstIndex = uri.search(/\/(Qm|baf)/i);
  return uri.slice(firstIndex + 1);
}
function randomBytesHex(length = 32) {
  return uint8ArrayToHex(randomBytesBuffer(length));
}
function randomBytesBuffer(length = 32) {
  return globalThis.crypto.getRandomValues(new Uint8Array(length));
}
async function download(options) {
  let url;
  if (options.uri.startsWith("ar://")) {
    const { resolveArweaveScheme } = await __vitePreload(async () => {
      const { resolveArweaveScheme: resolveArweaveScheme2 } = await import("./arweave-BmejQRVS.js");
      return { resolveArweaveScheme: resolveArweaveScheme2 };
    }, true ? [] : void 0);
    url = resolveArweaveScheme(options);
  } else {
    url = resolveScheme(options);
  }
  const res = await getClientFetch(options.client)(url, {
    headers: options.client.config?.storage?.fetch?.headers,
    keepalive: options.client.config?.storage?.fetch?.keepalive,
    requestTimeoutMs: options.requestTimeoutMs ?? options.client.config?.storage?.fetch?.requestTimeoutMs ?? 6e4
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to download file: ${res.status} ${res.statusText} ${error || ""}`);
  }
  return res;
}
const download$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  download
}, Symbol.toStringTag, { value: "Module" }));
function resolveContractAbi(contract, contractApiBaseUrl = "https://contract.thirdweb.com/abi") {
  return withCache(async () => {
    if (contract.abi) {
      return contract.abi;
    }
    if (contract.chain.id === 31337 || contract.chain.id === 1337 || contract.chain.id === sepolia.id) {
      return await resolveCompositeAbi(contract);
    }
    try {
      return await resolveAbiFromContractApi(contract, contractApiBaseUrl);
    } catch {
      return await resolveCompositeAbi(contract);
    }
  }, {
    cacheKey: `${contract.chain.id}-${contract.address}`,
    cacheTime: 1e3 * 60 * 60 * 1
    // 1 hour
  });
}
async function resolveAbiFromContractApi(contract, contractApiBaseUrl = "https://contract.thirdweb.com/abi") {
  const response = await getClientFetch(contract.client)(`${contractApiBaseUrl}/${contract.chain.id}/${contract.address}`);
  const json = await response.json();
  if (!json || json.error) {
    throw new Error(`Failed to resolve ABI from contract API. ${json.error || ""}`);
  }
  return json;
}
async function resolveAbiFromBytecode(contract) {
  const [{ resolveImplementation }, { extractIPFSUri }] = await Promise.all([
    __vitePreload(() => import("./resolveImplementation-Di6yegn8.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0),
    __vitePreload(() => import("./extractIPFS-Cpfm21d8.js"), true ? __vite__mapDeps([8,1,2,3,4,5,6,7]) : void 0)
  ]);
  const { bytecode } = await resolveImplementation(contract);
  if (bytecode === "0x") {
    const { id, name } = contract.chain;
    throw new Error(`Failed to load contract bytecode. Make sure the contract [${contract.address}] exists on the chain [${name || "Unknown Chain"} (chain id: ${id})]`);
  }
  const ipfsUri = extractIPFSUri(bytecode);
  if (!ipfsUri) {
    return [];
  }
  try {
    const res = await download({ client: contract.client, uri: ipfsUri });
    const json = await res.json();
    return json.output.abi;
  } catch {
    return [];
  }
}
const PLUGINS_ABI = {
  inputs: [],
  name: "getAllPlugins",
  outputs: [
    {
      components: [
        {
          internalType: "bytes4",
          name: "functionSelector",
          type: "bytes4"
        },
        {
          internalType: "string",
          name: "functionSignature",
          type: "string"
        },
        {
          internalType: "address",
          name: "pluginAddress",
          type: "address"
        }
      ],
      internalType: "struct IPluginMap.Plugin[]",
      name: "registered",
      type: "tuple[]"
    }
  ],
  stateMutability: "view",
  type: "function"
};
const BASE_ROUTER_ABI = {
  inputs: [],
  name: "getAllExtensions",
  outputs: [
    {
      components: [
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string"
            },
            {
              internalType: "string",
              name: "metadataURI",
              type: "string"
            },
            {
              internalType: "address",
              name: "implementation",
              type: "address"
            }
          ],
          internalType: "struct IExtension.ExtensionMetadata",
          name: "metadata",
          type: "tuple"
        },
        {
          components: [
            {
              internalType: "bytes4",
              name: "functionSelector",
              type: "bytes4"
            },
            {
              internalType: "string",
              name: "functionSignature",
              type: "string"
            }
          ],
          internalType: "struct IExtension.ExtensionFunction[]",
          name: "functions",
          type: "tuple[]"
        }
      ],
      internalType: "struct IExtension.Extension[]",
      name: "allExtensions",
      type: "tuple[]"
    }
  ],
  stateMutability: "view",
  type: "function"
};
const DIAMOND_ABI = {
  inputs: [],
  name: "facets",
  outputs: [
    {
      components: [
        {
          internalType: "address",
          name: "facetAddress",
          type: "address"
        },
        {
          internalType: "bytes4[]",
          name: "functionSelectors",
          type: "bytes4[]"
        }
      ],
      type: "tuple[]"
    }
  ],
  stateMutability: "view",
  type: "function"
};
async function resolveCompositeAbi(contract, rootAbi, resolveSubAbi) {
  const [rootAbi_, pluginPatternAddresses, baseRouterAddresses, modularExtensionAddresses, diamondFacetAddresses] = await Promise.all([
    resolveAbiFromBytecode(contract),
    // check these all at the same time
    resolvePluginPatternAddresses(contract),
    resolveBaseRouterAddresses(contract),
    resolveModularModuleAddresses(contract),
    resolveDiamondFacetAddresses(contract)
  ]);
  const mergedPlugins = [
    .../* @__PURE__ */ new Set([
      ...pluginPatternAddresses,
      ...baseRouterAddresses,
      ...modularExtensionAddresses,
      ...diamondFacetAddresses
    ])
  ];
  if (!mergedPlugins.length) {
    return rootAbi_;
  }
  const pluginAbis = await getAbisForPlugins({
    contract,
    plugins: mergedPlugins,
    resolveSubAbi
  });
  return joinAbis({ pluginAbis, rootAbi: rootAbi_ });
}
async function resolvePluginPatternAddresses(contract) {
  try {
    const { readContract: readContract2 } = await __vitePreload(async () => {
      const { readContract: readContract3 } = await Promise.resolve().then(() => readContract$1);
      return { readContract: readContract3 };
    }, true ? void 0 : void 0);
    const pluginMap = await readContract2({
      contract,
      method: PLUGINS_ABI
    });
    if (!pluginMap.length) {
      return [];
    }
    return [...new Set(pluginMap.map((item) => item.pluginAddress))];
  } catch {
  }
  return [];
}
async function resolveBaseRouterAddresses(contract) {
  try {
    const { readContract: readContract2 } = await __vitePreload(async () => {
      const { readContract: readContract3 } = await Promise.resolve().then(() => readContract$1);
      return { readContract: readContract3 };
    }, true ? void 0 : void 0);
    const pluginMap = await readContract2({
      contract,
      method: BASE_ROUTER_ABI
    });
    if (!pluginMap.length) {
      return [];
    }
    return [...new Set(pluginMap.map((item) => item.metadata.implementation))];
  } catch {
  }
  return [];
}
async function resolveModularModuleAddresses(contract) {
  try {
    const { getInstalledModules } = await __vitePreload(async () => {
      const { getInstalledModules: getInstalledModules2 } = await import("./getInstalledModules-CCOgmvkA.js");
      return { getInstalledModules: getInstalledModules2 };
    }, true ? __vite__mapDeps([9,10,1,2,3,4,5,6,7]) : void 0);
    const modules = await getInstalledModules({ contract });
    if (!modules.length) {
      return [];
    }
    return [...new Set(modules.map((item) => item.implementation))];
  } catch {
  }
  return [];
}
async function resolveDiamondFacetAddresses(contract) {
  try {
    const { readContract: readContract2 } = await __vitePreload(async () => {
      const { readContract: readContract3 } = await Promise.resolve().then(() => readContract$1);
      return { readContract: readContract3 };
    }, true ? void 0 : void 0);
    const facets = await readContract2({ contract, method: DIAMOND_ABI });
    if (!facets.length) {
      return [];
    }
    return facets.map((item) => item.facetAddress);
  } catch {
  }
  return [];
}
async function getAbisForPlugins(options) {
  return Promise.all(options.plugins.map((pluginAddress) => {
    const newContract = getContract({
      ...options.contract,
      address: pluginAddress
    });
    if (options.resolveSubAbi) {
      return options.resolveSubAbi(newContract);
    }
    return resolveAbiFromBytecode(newContract);
  }));
}
function joinAbis(options) {
  let mergedPlugins = options.pluginAbis.flat().filter((item) => item.type !== "constructor");
  if (options.rootAbi) {
    mergedPlugins = [...options.rootAbi, ...mergedPlugins].filter((item) => item.type !== "fallback" && item.type !== "receive").filter(Boolean);
  }
  const humanReadableAbi = [...new Set(formatAbi(mergedPlugins))];
  return parseAbi(humanReadableAbi);
}
function isAbiEvent(item) {
  return !!(item && typeof item === "object" && "type" in item && item.type === "event");
}
function prepareEvent(options) {
  const { signature } = options;
  let resolvedSignature;
  if (isAbiEvent(signature)) {
    resolvedSignature = signature;
  } else {
    resolvedSignature = parseAbiItem(signature);
  }
  return {
    abiEvent: resolvedSignature,
    hash: toSignatureHash(resolvedSignature),
    // @ts-expect-error - TODO: investiagte why this complains, it works fine however
    topics: encodeEventTopics({
      abi: [resolvedSignature],
      args: options.filters
    })
  };
}
function parseEventLogs(options) {
  const { logs, events, strict } = options;
  return parseEventLogs$1({
    abi: events.map((e) => e.abiEvent),
    logs,
    strict
  });
}
function encodeStateOverrides(overrides) {
  return Object.fromEntries(Object.entries(overrides).map(([address, override]) => {
    return [
      address,
      {
        balance: override.balance ? numberToHex$1(override.balance) : void 0,
        code: override.code,
        nonce: override.nonce ? numberToHex$1(override.nonce) : void 0,
        state: override.state,
        stateDiff: override.stateDiff
      }
    ];
  }));
}
async function eth_call(request, params) {
  const { blockNumber, blockTag, ...txRequest } = params;
  const blockNumberHex = blockNumber ? numberToHex$1(blockNumber) : void 0;
  const block = blockNumberHex || blockTag || "latest";
  return await request({
    method: "eth_call",
    params: params.stateOverrides ? [
      txRequest,
      block,
      encodeStateOverrides(params.stateOverrides)
    ] : [txRequest, block]
  });
}
function byteSize(value) {
  if (isHex$1(value, { strict: false })) {
    return Math.ceil((value.length - 2) / 2);
  }
  return value.length;
}
function encodeAbiParameters(params, values) {
  if (params.length !== values.length) {
    throw new Error("The number of parameters and values must match.");
  }
  const preparedParams = prepareParams({
    params,
    values
  });
  const data = encodeParams(preparedParams);
  if (data.length === 0) {
    return "0x";
  }
  return data;
}
function prepareParams({ params, values }) {
  const preparedParams = [];
  for (let i = 0; i < params.length; i++) {
    preparedParams.push(prepareParam({ param: params[i], value: values[i] }));
  }
  return preparedParams;
}
function prepareParam({ param, value }) {
  const arrayComponents = getArrayComponents(param.type);
  if (arrayComponents) {
    const [length, type] = arrayComponents;
    return encodeArray(value, { length, param: { ...param, type } });
  }
  if (param.type === "tuple") {
    return encodeTuple(value, {
      param
    });
  }
  if (param.type === "address") {
    return encodeAddress(value);
  }
  if (param.type === "bool") {
    return encodeBool(value);
  }
  if (param.type.startsWith("uint") || param.type.startsWith("int")) {
    const signed = param.type.startsWith("int");
    return encodeNumber(value, { signed });
  }
  if (param.type.startsWith("bytes")) {
    return encodeBytes(value, { param });
  }
  if (param.type === "string") {
    return encodeString(value);
  }
  throw new Error(`Unsupported parameter type: ${param.type}`);
}
function encodeParams(preparedParams) {
  let staticSize = 0;
  for (let i = 0; i < preparedParams.length; i++) {
    const { dynamic, encoded } = preparedParams[i];
    if (dynamic) {
      staticSize += 32;
    } else {
      staticSize += byteSize(encoded);
    }
  }
  const staticParams = [];
  const dynamicParams = [];
  let dynamicSize = 0;
  for (let i = 0; i < preparedParams.length; i++) {
    const { dynamic, encoded } = preparedParams[i];
    if (dynamic) {
      staticParams.push(numberToHex$1(staticSize + dynamicSize, { size: 32 }));
      dynamicParams.push(encoded);
      dynamicSize += byteSize(encoded);
    } else {
      staticParams.push(encoded);
    }
  }
  return concat$1(...[...staticParams, ...dynamicParams]);
}
function encodeAddress(value) {
  if (value !== "" && value !== void 0 && !isAddress$1(value)) {
    throw new Error(`Invalid address: ${value}`);
  }
  return { dynamic: false, encoded: padHex$1(value.toLowerCase()) };
}
function encodeArray(value, { length, param }) {
  const dynamic = length === null;
  if (!Array.isArray(value)) {
    throw new Error("Invalid array value.");
  }
  if (!dynamic && value.length !== length) {
    throw new Error("Invalid array length.");
  }
  let dynamicChild = false;
  const preparedParams = [];
  for (let i = 0; i < value.length; i++) {
    const preparedParam = prepareParam({ param, value: value[i] });
    if (preparedParam.dynamic) {
      dynamicChild = true;
    }
    preparedParams.push(preparedParam);
  }
  if (dynamic || dynamicChild) {
    const data = encodeParams(preparedParams);
    if (dynamic) {
      const length_ = numberToHex$1(preparedParams.length, { size: 32 });
      return {
        dynamic: true,
        encoded: preparedParams.length > 0 ? concat$1(...[length_, data]) : length_
      };
    }
    if (dynamicChild) {
      return { dynamic: true, encoded: data };
    }
  }
  return {
    dynamic: false,
    encoded: concat$1(...preparedParams.map(({ encoded }) => encoded))
  };
}
function encodeBytes(value, { param }) {
  const [, paramSize] = param.type.split("bytes");
  const bytesSize = byteSize(value);
  if (!paramSize) {
    let value_ = value;
    if (bytesSize % 32 !== 0) {
      value_ = padHex$1(value_, {
        dir: "right",
        size: Math.ceil((value.length - 2) / 2 / 32) * 32
      });
    }
    return {
      dynamic: true,
      encoded: concat$1(...[padHex$1(numberToHex$1(bytesSize, { size: 32 })), value_])
    };
  }
  if (bytesSize !== Number.parseInt(paramSize)) {
    throw new Error(`Invalid bytes${paramSize} size: ${bytesSize}`);
  }
  return { dynamic: false, encoded: padHex$1(value, { dir: "right" }) };
}
function encodeBool(value) {
  return { dynamic: false, encoded: padHex$1(boolToHex$1(value)) };
}
function encodeNumber(value, { signed }) {
  return {
    dynamic: false,
    encoded: numberToHex$1(value, {
      signed,
      size: 32
    })
  };
}
function encodeString(value) {
  const hexValue = stringToHex$1(value);
  const partsLength = Math.ceil(byteSize(hexValue) / 32);
  const parts = [];
  for (let i = 0; i < partsLength; i++) {
    parts.push(padHex$1(slice$1(hexValue, i * 32, (i + 1) * 32), {
      dir: "right"
    }));
  }
  return {
    dynamic: true,
    encoded: concat$1(...[padHex$1(numberToHex$1(byteSize(hexValue), { size: 32 })), ...parts])
  };
}
function encodeTuple(value, { param }) {
  let dynamic = false;
  const preparedParams = [];
  for (let i = 0; i < param.components.length; i++) {
    const param_ = param.components[i];
    const index = Array.isArray(value) ? i : param_.name;
    const preparedParam = prepareParam({
      param: param_,
      // biome-ignore lint/style/noNonNullAssertion: we know the value is not `undefined`.
      // biome-ignore lint/suspicious/noExplicitAny: TODO: fix any
      value: value[index]
    });
    preparedParams.push(preparedParam);
    if (preparedParam.dynamic) {
      dynamic = true;
    }
  }
  return {
    dynamic,
    encoded: dynamic ? encodeParams(preparedParams) : concat$1(...preparedParams.map(({ encoded }) => encoded))
  };
}
function getArrayComponents(type) {
  const matches = type.match(/^(.*)\[(\d+)?\]$/);
  return matches ? (
    // Return `null` if the array is dynamic.
    // biome-ignore lint/style/noNonNullAssertion: we know the value is not `undefined`.
    [matches[2] ? Number(matches[2]) : null, matches[1]]
  ) : void 0;
}
const prepareMethodCache = new LruMap$1(4096);
function prepareMethod(method) {
  const key = typeof method === "string" ? method : stringify$1(method);
  if (prepareMethodCache.has(key)) {
    return prepareMethodCache.get(key);
  }
  const abiFn = typeof method === "string" ? (
    // @ts-expect-error - we're sure it's a string...
    parseAbiItem(method)
  ) : method;
  const sig = toFunctionSelector(abiFn);
  const ret = [sig, abiFn.inputs, abiFn.outputs];
  prepareMethodCache.set(key, ret);
  return ret;
}
async function eth_gasPrice(request) {
  const result = await request({
    method: "eth_gasPrice"
  });
  return hexToBigInt$1(result);
}
async function getGasPrice(options) {
  const { client, chain, percentMultiplier } = options;
  const rpcClient = getRpcClient({ chain, client });
  const gasPrice_ = await eth_gasPrice(rpcClient);
  const extraTip = percentMultiplier ? gasPrice_ / BigInt(100) * BigInt(percentMultiplier) : 0n;
  const txGasPrice = gasPrice_ + extraTip;
  return txGasPrice;
}
const base = /* @__PURE__ */ defineChain$1({
  blockExplorers: [
    {
      apiUrl: "https://api.basescan.org/api",
      name: "Basescan",
      url: "https://basescan.org"
    }
  ],
  id: 8453,
  name: "Base",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" }
});
const baseSepolia = /* @__PURE__ */ defineChain$1({
  blockExplorers: [
    {
      apiUrl: "https://api-sepolia.basescan.org/api",
      name: "Basescan",
      url: "https://sepolia.basescan.org"
    }
  ],
  id: 84532,
  name: "Base Sepolia",
  nativeCurrency: { decimals: 18, name: "Sepolia Ether", symbol: "ETH" },
  testnet: true
});
const optimism = /* @__PURE__ */ defineChain$1({
  blockExplorers: [
    {
      apiUrl: "https://api-optimistic.etherscan.io",
      name: "Optimism Explorer",
      url: "https://optimistic.etherscan.io"
    }
  ],
  id: 10,
  name: "OP Mainnet",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" }
});
const optimismSepolia = /* @__PURE__ */ defineChain$1({
  blockExplorers: [
    {
      apiUrl: "https://optimism-sepolia.blockscout.com/api",
      name: "Blockscout",
      url: "https://optimism-sepolia.blockscout.com"
    }
  ],
  id: 11155420,
  name: "OP Sepolia",
  nativeCurrency: { decimals: 18, name: "Sepolia Ether", symbol: "ETH" },
  testnet: true
});
const zora = /* @__PURE__ */ defineChain$1({
  blockExplorers: [
    {
      apiUrl: "https://explorer.zora.energy/api",
      name: "Explorer",
      url: "https://explorer.zora.energy"
    }
  ],
  id: 7777777,
  name: "Zora",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  }
});
const zoraSepolia = /* @__PURE__ */ defineChain$1({
  blockExplorers: [
    {
      apiUrl: "https://sepolia.explorer.zora.energy/api",
      name: "Zora Sepolia Explorer",
      url: "https://sepolia.explorer.zora.energy/"
    }
  ],
  id: 999999999,
  name: "Zora Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Zora Sepolia",
    symbol: "ETH"
  },
  testnet: true
});
const opChains = [
  base.id,
  baseSepolia.id,
  optimism.id,
  optimismSepolia.id,
  zora.id,
  zoraSepolia.id,
  34443,
  // mode
  919,
  // mode testnet
  42220,
  // celo
  44787,
  // celo testnet
  204,
  // opBNB
  5611
  // opBNB testnet
];
async function isOpStackChain(chain) {
  if (chain.id === 1337 || chain.id === 31337) {
    return false;
  }
  if (opChains.includes(chain.id)) {
    return true;
  }
  try {
    const { getChainMetadata } = await __vitePreload(async () => {
      const { getChainMetadata: getChainMetadata2 } = await import("./index-CXUot43X.js").then((n) => n.cv);
      return { getChainMetadata: getChainMetadata2 };
    }, true ? __vite__mapDeps([1,2,3,4,5,6,7]) : void 0);
    const chainMetadata = await getChainMetadata(chain);
    return chainMetadata.stackType === "optimism_bedrock";
  } catch {
    return false;
  }
}
async function eth_getBlockByNumber(request, params) {
  const blockTag = params.blockTag ?? "latest";
  const includeTransactions = params.includeTransactions ?? false;
  const blockNumberHex = params.blockNumber !== void 0 ? numberToHex$1(params.blockNumber) : void 0;
  const block = await request({
    method: "eth_getBlockByNumber",
    params: [blockNumberHex || blockTag, includeTransactions]
  });
  if (!block) {
    throw new Error("Block not found");
  }
  return formatBlock(block);
}
async function eth_maxPriorityFeePerGas(request) {
  const result = await request({
    method: "eth_maxPriorityFeePerGas"
  });
  return hexToBigInt$1(result);
}
async function resolvePromisedValue(value) {
  return typeof value === "function" ? await value() : value;
}
function toTokens(units2, decimals) {
  const stringValue = units2.toString();
  const prefix = stringValue[0] === "-" ? "-" : "";
  const absStringValue = prefix ? stringValue.slice(1) : stringValue;
  const paddedValue = absStringValue.padStart(decimals + 1, "0");
  const splitIndex = paddedValue.length - decimals;
  const integerPart = paddedValue.slice(0, splitIndex) || "0";
  let fractionPart = paddedValue.slice(splitIndex);
  for (let i = fractionPart.length - 1; i >= 0; i--) {
    if (fractionPart[i] !== "0") {
      fractionPart = fractionPart.slice(0, i + 1);
      break;
    }
    if (i === 0) {
      fractionPart = "";
    }
  }
  return `${prefix}${integerPart}${fractionPart ? `.${fractionPart}` : ""}`;
}
function toEther(wei) {
  return toTokens(wei, 18);
}
function toUnits(tokens, decimals) {
  if (tokens.includes("e")) {
    tokens = Number(tokens).toFixed(decimals);
  }
  let [integerPart, fractionPart = ""] = tokens.split(".");
  const prefix = integerPart.startsWith("-") ? "-" : "";
  if (prefix) {
    integerPart = integerPart.slice(1);
  }
  fractionPart = fractionPart.padEnd(decimals, "0");
  if (decimals === 0) {
    if (fractionPart[0] && Number.parseInt(fractionPart[0]) >= 5) {
      integerPart = (BigInt(integerPart) + 1n).toString();
    }
    fractionPart = "";
  } else {
    if (fractionPart.length > decimals) {
      const roundingDigit = fractionPart[decimals];
      if (roundingDigit && Number.parseInt(roundingDigit, 10) >= 5) {
        const roundedFraction = BigInt(fractionPart.substring(0, decimals)) + 1n;
        fractionPart = roundedFraction.toString().padStart(decimals, "0");
        if (fractionPart.length > decimals) {
          integerPart = (BigInt(integerPart) + 1n).toString();
          fractionPart = fractionPart.substring(fractionPart.length - decimals);
        }
      } else {
        fractionPart = fractionPart.substring(0, decimals);
      }
    }
  }
  return BigInt(`${prefix}${integerPart}${fractionPart}`);
}
function toWei(tokens) {
  return toUnits(tokens, 18);
}
const units = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  toEther,
  toTokens,
  toUnits,
  toWei
}, Symbol.toStringTag, { value: "Module" }));
function roundUpGas(value) {
  if (value === 0n || (value & value - 1n) === 0n) {
    return value;
  }
  let highestBit = 1n;
  while (value > 0n) {
    value >>= 1n;
    highestBit <<= 1n;
  }
  return highestBit;
}
const FORCE_GAS_PRICE_CHAIN_IDS = [
  78600,
  // Vanar testnet
  2040,
  // Vanar mainnet
  248,
  // Oasys Mainnet
  9372,
  // Oasys Testnet
  841,
  // Taraxa Mainnet
  842,
  // Taraxa Testnet
  2016,
  // MainnetZ Mainnet
  9768,
  // MainnetZ Testnet
  2442,
  // Polygon zkEVM Cardona Testnet
  1942999413,
  // Humanity Testnet
  1952959480,
  // Lumia Testnet
  994873017,
  // Lumia Mainnet
  19011,
  // Homeverse Mainnet
  40875,
  // Homeverse Testnet
  1511670449,
  // GPT Mainnet
  5464,
  // Saga Mainnet
  2020,
  // Ronin Mainnet
  2021,
  // Ronin Testnet (Saigon)
  98866,
  // Plume mainnet
  1417429182
  // Wilderworld Zephyr Testnet
];
async function getGasOverridesForTransaction(transaction) {
  const [maxFeePerGas, maxPriorityFeePerGas, gasPrice, type] = await Promise.all([
    resolvePromisedValue(transaction.maxFeePerGas),
    resolvePromisedValue(transaction.maxPriorityFeePerGas),
    resolvePromisedValue(transaction.gasPrice),
    resolvePromisedValue(transaction.type)
  ]);
  if (maxFeePerGas !== void 0 && maxPriorityFeePerGas !== void 0) {
    return {
      maxFeePerGas,
      maxPriorityFeePerGas
    };
  }
  if (typeof gasPrice === "bigint") {
    return { gasPrice };
  }
  const defaultGasOverrides = await getDefaultGasOverrides(transaction.client, transaction.chain, type === "legacy" ? "legacy" : "eip1559");
  if (transaction.chain.experimental?.increaseZeroByteCount) {
    if (defaultGasOverrides.gasPrice) {
      return { gasPrice: roundUpGas(defaultGasOverrides.gasPrice) };
    }
    return {
      maxFeePerGas: maxFeePerGas ?? roundUpGas(defaultGasOverrides.maxFeePerGas ?? 0n),
      maxPriorityFeePerGas: maxPriorityFeePerGas ?? roundUpGas(defaultGasOverrides.maxPriorityFeePerGas ?? 0n)
    };
  }
  if (defaultGasOverrides.gasPrice !== void 0) {
    return defaultGasOverrides;
  }
  return {
    maxFeePerGas: maxFeePerGas ?? defaultGasOverrides.maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas ?? defaultGasOverrides.maxPriorityFeePerGas
  };
}
async function getDefaultGasOverrides(client, chain, feeType) {
  const resolvedFeeType = feeType ?? chain.feeType;
  if (resolvedFeeType === "legacy" || FORCE_GAS_PRICE_CHAIN_IDS.includes(chain.id)) {
    return {
      gasPrice: await getGasPrice({ chain, client, percentMultiplier: 10 })
    };
  }
  const feeData2 = await getDynamicFeeData(client, chain);
  if (feeData2.maxFeePerGas !== null && feeData2.maxPriorityFeePerGas !== null) {
    return {
      maxFeePerGas: feeData2.maxFeePerGas,
      maxPriorityFeePerGas: feeData2.maxPriorityFeePerGas
    };
  }
  return {
    gasPrice: await getGasPrice({ chain, client, percentMultiplier: 10 })
  };
}
async function getDynamicFeeData(client, chain, percentMultiplier = 10) {
  let maxFeePerGas = null;
  let maxPriorityFeePerGas_ = null;
  const rpcRequest = getRpcClient({ chain, client });
  const [block, maxPriorityFeePerGas] = await Promise.all([
    eth_getBlockByNumber(rpcRequest, { blockTag: "latest" }),
    eth_maxPriorityFeePerGas(rpcRequest).catch(() => null)
  ]);
  const baseBlockFee = block?.baseFeePerGas;
  const chainId = chain.id;
  if (chainId === 220 || chainId === 1220) {
    return { maxFeePerGas: null, maxPriorityFeePerGas: null };
  }
  if (chainId === 80002 || chainId === 137) {
    maxPriorityFeePerGas_ = await getPolygonGasPriorityFee(chainId);
  } else if (maxPriorityFeePerGas !== null) {
    maxPriorityFeePerGas_ = maxPriorityFeePerGas;
  }
  if (maxPriorityFeePerGas_ == null || baseBlockFee == null) {
    return { maxFeePerGas: null, maxPriorityFeePerGas: null };
  }
  maxPriorityFeePerGas_ = getPreferredPriorityFee(maxPriorityFeePerGas_, percentMultiplier);
  maxFeePerGas = baseBlockFee * 2n + maxPriorityFeePerGas_;
  if (chainId === 42220 || chainId === 44787 || chainId === 62320) {
    maxPriorityFeePerGas_ = maxFeePerGas;
  }
  return {
    maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas_
  };
}
function getPreferredPriorityFee(defaultPriorityFeePerGas, percentMultiplier = 10) {
  const extraTip = defaultPriorityFeePerGas / BigInt(100) * BigInt(percentMultiplier);
  const totalPriorityFee = defaultPriorityFeePerGas + extraTip;
  return totalPriorityFee;
}
function getGasStationUrl(chainId) {
  switch (chainId) {
    case 137:
      return "https://gasstation.polygon.technology/v2";
    case 80002:
      return "https://gasstation.polygon.technology/amoy";
  }
}
const MIN_POLYGON_GAS_PRICE = 31n;
async function getPolygonGasPriorityFee(chainId) {
  const gasStationUrl = getGasStationUrl(chainId);
  try {
    const data = await (await fetch(gasStationUrl)).json();
    const priorityFee = data.fast.maxPriorityFee;
    if (priorityFee > 0) {
      const fixedFee = Number.parseFloat(priorityFee).toFixed(9);
      return toUnits(fixedFee, 9);
    }
  } catch (e) {
    console.error("failed to fetch gas", e);
  }
  return MIN_POLYGON_GAS_PRICE;
}
const feeData = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDefaultGasOverrides,
  getGasOverridesForTransaction
}, Symbol.toStringTag, { value: "Module" }));
function isInsufficientFundsError(error) {
  if (!error)
    return false;
  const errorMessage = typeof error === "string" ? error : error?.message || error?.data?.message || "";
  const message = errorMessage.toLowerCase();
  return message.includes("insufficient funds") || message.includes("insufficient balance") || message.includes("insufficient") && (message.includes("native") || message.includes("gas")) || // Common error codes from various wallets/providers
  error?.code === "INSUFFICIENT_FUNDS" || error?.reason === "insufficient funds";
}
function getErrorDetails(error) {
  if (!error)
    return { message: "Unknown error" };
  const message = typeof error === "string" ? error : error?.message || error?.data?.message || String(error);
  const code = error?.code || error?.reason;
  return { code, message };
}
async function trackTransaction(args) {
  return trackTransactionEvent({
    ...args,
    action: "transaction:sent"
  });
}
function trackTransactionEvent(args) {
  return track({
    client: args.client,
    data: {
      action: args.action,
      chainId: args.chainId,
      clientId: args.client.clientId,
      contractAddress: args.contractAddress,
      errorCode: stringify$1(args.error),
      functionName: args.functionName,
      gasPrice: args.gasPrice,
      transactionHash: args.transactionHash,
      walletAddress: args.walletAddress,
      walletType: args.walletType
    },
    ecosystem: args.ecosystem
  });
}
async function trackInsufficientFundsError(args) {
  const errorDetails = getErrorDetails(args.error);
  return track({
    client: args.client,
    data: {
      action: "transaction:insufficient_funds",
      chainId: args.chainId,
      clientId: args.client.clientId,
      contractAddress: args.contractAddress,
      errorCode: errorDetails.code ? stringify$1(errorDetails.code) : void 0,
      errorMessage: errorDetails.message,
      functionName: args.functionName,
      requiredAmount: args.requiredAmount?.toString(),
      transactionValue: args.transactionValue?.toString(),
      userBalance: args.userBalance?.toString(),
      walletAddress: args.walletAddress
    },
    ecosystem: args.ecosystem
  });
}
async function extractError(args) {
  const { error, contract, fromAddress } = args;
  if (isInsufficientFundsError(error) && contract) {
    trackInsufficientFundsError({
      chainId: contract.chain?.id,
      client: contract.client,
      contractAddress: contract.address,
      error,
      walletAddress: fromAddress
    });
  }
  const result = await extractErrorResult({ contract, error });
  if (result) {
    return new TransactionError(result, contract);
  }
  return error;
}
async function extractErrorResult(args) {
  const { error, contract } = args;
  if (typeof error === "object") {
    const errorObj = error;
    if (errorObj.data) {
      if (errorObj.data !== "0x" && isHex$1(errorObj.data)) {
        let abi = contract?.abi;
        if (contract && !abi) {
          abi = await resolveContractAbi(contract).catch(() => void 0);
        }
        const parsedError = decodeErrorResult({
          abi,
          data: errorObj.data
        });
        return `${parsedError.errorName}${parsedError.args ? ` - ${parsedError.args}` : ""}`;
      }
    }
  }
  return `Execution Reverted: ${stringify(error)}`;
}
class TransactionError extends Error {
  constructor(reason, contract) {
    let message = reason;
    super(message);
    Object.defineProperty(this, "contractAddress", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "chainId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.name = "TransactionError";
    this.contractAddress = contract?.address;
    this.chainId = contract?.chain?.id;
    this.message = message;
  }
}
const cache = /* @__PURE__ */ new WeakMap();
async function estimateGas(options) {
  const fromAddress = typeof options.from === "string" ? options.from ?? void 0 : options.from?.address ?? options.account?.address;
  const txWithFrom = { ...options.transaction, from: fromAddress };
  if (cache.has(txWithFrom)) {
    return cache.get(txWithFrom);
  }
  const { account } = options;
  const promise = (async () => {
    const predefinedGas = await resolvePromisedValue(options.transaction.gas);
    if (predefinedGas !== void 0) {
      return predefinedGas;
    }
    if (account?.estimateGas) {
      try {
        let gas = await account.estimateGas(options.transaction);
        if (options.transaction.chain.experimental?.increaseZeroByteCount) {
          gas = roundUpGas(gas);
        }
        return gas;
      } catch (error) {
        throw await extractError({
          contract: options.transaction.__contract,
          error,
          fromAddress
        });
      }
    }
    const { encode: encode2 } = await __vitePreload(async () => {
      const { encode: encode3 } = await Promise.resolve().then(() => encode$1);
      return { encode: encode3 };
    }, true ? void 0 : void 0);
    const [encodedData, toAddress, value, authorizationList] = await Promise.all([
      encode2(options.transaction),
      resolvePromisedValue(options.transaction.to),
      resolvePromisedValue(options.transaction.value),
      resolvePromisedValue(options.transaction.authorizationList)
    ]);
    const [{ getRpcClient: getRpcClient2 }, { eth_estimateGas }] = await Promise.all([
      __vitePreload(() => import("./index-CXUot43X.js").then((n) => n.cx), true ? __vite__mapDeps([1,2,3,4,5,6,7]) : void 0),
      __vitePreload(() => import("./eth_estimateGas-2yjy3sG-.js"), true ? __vite__mapDeps([11,1,2,3,4,5,6,7]) : void 0)
    ]);
    const rpcRequest = getRpcClient2(options.transaction);
    try {
      const formattedTx = formatTransactionRequest({
        authorizationList: authorizationList?.map((auth) => ({
          ...auth,
          address: getAddress$1(auth.address),
          nonce: Number(auth.nonce),
          r: fromNumber(auth.r),
          s: fromNumber(auth.s)
        })),
        data: encodedData,
        from: fromAddress ? getAddress$1(fromAddress) : void 0,
        to: toAddress ? getAddress$1(toAddress) : void 0,
        value
      });
      let gas = await eth_estimateGas(rpcRequest, formattedTx);
      if (options.transaction.chain.experimental?.increaseZeroByteCount) {
        gas = roundUpGas(gas);
      }
      return gas;
    } catch (error) {
      throw await extractError({
        contract: options.transaction.__contract,
        error,
        fromAddress
      });
    }
  })();
  cache.set(txWithFrom, promise);
  return promise;
}
const estimateGas$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  estimateGas
}, Symbol.toStringTag, { value: "Module" }));
async function estimateGasCost(options) {
  const { transaction } = options;
  const from = options.account?.address ?? void 0;
  const gasLimit = await resolvePromisedValue(transaction.gas) || await estimateGas({ from, transaction });
  const fees = await getDefaultGasOverrides(transaction.client, transaction.chain);
  const gasPrice = fees.maxFeePerGas || fees.gasPrice;
  if (gasPrice === void 0) {
    throw new Error(`Unable to determine gas price for chain ${transaction.chain.id}`);
  }
  let l1Fee;
  if (await isOpStackChain(transaction.chain)) {
    const { estimateL1Fee } = await __vitePreload(async () => {
      const { estimateL1Fee: estimateL1Fee2 } = await import("./estimate-l1-fee-C6r7baiM.js");
      return { estimateL1Fee: estimateL1Fee2 };
    }, true ? __vite__mapDeps([12,1,2,3,4,5,6,7,13,14]) : void 0);
    l1Fee = await estimateL1Fee({
      transaction
    });
  } else {
    l1Fee = 0n;
  }
  const wei = gasLimit * gasPrice + l1Fee;
  return {
    ether: toEther(wei),
    wei
  };
}
function isAbiFunction(item) {
  return !!(item && typeof item === "object" && "type" in item && item.type === "function");
}
async function getTransactionGasCost(tx, from) {
  try {
    const gasCost = await estimateGasCost({
      from,
      transaction: tx
    });
    const bufferCost = gasCost.wei / 10n;
    return gasCost.wei + bufferCost;
  } catch {
    const gasPrice = await getGasPrice({
      chain: tx.chain,
      client: tx.client
    });
    return 1000000n * gasPrice;
  }
}
async function readContract(options) {
  const { contract, method, params } = options;
  const resolvePreparedMethod = async () => {
    if (Array.isArray(method)) {
      return method;
    }
    if (isAbiFunction(method)) {
      return prepareMethod(method);
    }
    if (typeof method === "function") {
      return prepareMethod(
        // @ts-expect-error - we're sure it's a function
        await method(contract)
      );
    }
    if (typeof method === "string" && method.startsWith("function ")) {
      const abiItem = parseAbiItem(method);
      if (abiItem.type === "function") {
        return prepareMethod(abiItem);
      }
      throw new Error(`"method" passed is not of type "function"`);
    }
    if (contract.abi && contract.abi?.length > 0) {
      const abiFunction = contract.abi?.find((item) => item.type === "function" && item.name === method);
      if (abiFunction) {
        return prepareMethod(abiFunction);
      }
    }
    throw new Error(`Could not resolve method "${method}".`);
  };
  const [resolvedPreparedMethod, resolvedParams] = await Promise.all([
    resolvePreparedMethod(),
    typeof params === "function" ? params() : params
  ]);
  let encodedData;
  if (resolvedPreparedMethod[1].length === 0) {
    encodedData = resolvedPreparedMethod[0];
  } else {
    encodedData = resolvedPreparedMethod[0] + encodeAbiParameters(
      resolvedPreparedMethod[1],
      // @ts-expect-error - TODO: fix this type issue
      resolvedParams
    ).slice(2);
  }
  const rpcRequest = getRpcClient({
    chain: contract.chain,
    client: contract.client
  });
  const result = await eth_call(rpcRequest, {
    data: encodedData,
    from: options.from ? getAddress$1(options.from) : void 0,
    to: contract.address
  });
  const decoded = decodeAbiParameters(resolvedPreparedMethod[2], result);
  if (Array.isArray(decoded) && decoded.length === 1) {
    return decoded[0];
  }
  return decoded;
}
const readContract$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  readContract
}, Symbol.toStringTag, { value: "Module" }));
const NATIVE_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
function isNativeTokenAddress(address) {
  return address.toLowerCase() === NATIVE_TOKEN_ADDRESS;
}
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const arrayRegex = /^(.*)\[([0-9]*)\]$/;
const bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
const integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
const maxUint96 = 2n ** 96n - 1n;
const maxUint256 = 2n ** 256n - 1n;
const encodeWeakMap = /* @__PURE__ */ new WeakMap();
async function encode(transaction) {
  if (encodeWeakMap.has(transaction)) {
    return encodeWeakMap.get(transaction);
  }
  const promise = (async () => {
    const [data, extraData, { concatHex: concatHex2 }] = await Promise.all([
      getDataFromTx(transaction),
      getExtraCallDataFromTx(transaction),
      __vitePreload(() => import("./concat-hex-Dx-81yeB.js"), true ? __vite__mapDeps([15,1,2,3,4,5,6,7]) : void 0)
    ]);
    if (extraData) {
      return concatHex2([data, extraData]);
    }
    return data;
  })();
  encodeWeakMap.set(transaction, promise);
  return promise;
}
async function getDataFromTx(transaction) {
  if (transaction.data === void 0) {
    return "0x";
  }
  if (typeof transaction.data === "function") {
    const data = await transaction.data();
    if (!data) {
      return "0x";
    }
    return data;
  }
  return transaction.data;
}
async function getExtraCallDataFromTx(transaction) {
  if (!transaction.extraCallData) {
    return void 0;
  }
  if (typeof transaction.extraCallData === "function") {
    const extraData = await transaction.extraCallData();
    if (!extraData)
      return void 0;
    if (!extraData.startsWith("0x")) {
      throw Error("Invalid extra calldata - must be a hex string");
    }
    if (extraData === "0x") {
      return void 0;
    }
    return extraData;
  }
  if (!transaction.extraCallData.startsWith("0x")) {
    throw Error("Invalid extra calldata - must be a hex string");
  }
  return transaction.extraCallData;
}
const encode$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  encode,
  getDataFromTx,
  getExtraCallDataFromTx
}, Symbol.toStringTag, { value: "Module" }));
async function getTransactions(args) {
  const [{ getV1WalletsByWalletAddressTransactions }, { getThirdwebDomains }, { getClientFetch: getClientFetch2 }, { assertInsightEnabled }, { stringify: stringify2 }] = await Promise.all([
    __vitePreload(() => import("./thirdweb-5zyu4waI.js"), true ? [] : void 0),
    __vitePreload(() => import("./index-CXUot43X.js").then((n) => n.ct), true ? __vite__mapDeps([1,2,3,4,5,6,7]) : void 0),
    __vitePreload(() => import("./index-CXUot43X.js").then((n) => n.cu), true ? __vite__mapDeps([1,2,3,4,5,6,7]) : void 0),
    __vitePreload(() => import("./common-BU--rVy5.js"), true ? __vite__mapDeps([16,1,2,3,4,5,6,7]) : void 0),
    __vitePreload(() => import("./index-CXUot43X.js").then((n) => n.cw), true ? __vite__mapDeps([1,2,3,4,5,6,7]) : void 0)
  ]);
  await assertInsightEnabled(args.chains);
  const threeMonthsAgoInSeconds = Math.floor((Date.now() - 3 * 30 * 24 * 60 * 60 * 1e3) / 1e3);
  const { client, walletAddress, chains, queryOptions } = args;
  const defaultQueryOptions = {
    chain: chains.map((chain) => chain.id),
    filter_block_timestamp_gte: threeMonthsAgoInSeconds,
    limit: 100
  };
  const result = await getV1WalletsByWalletAddressTransactions({
    baseUrl: `https://${getThirdwebDomains().insight}`,
    fetch: getClientFetch2(client),
    path: {
      wallet_address: walletAddress
    },
    query: {
      ...defaultQueryOptions,
      ...queryOptions
    }
  });
  if (result.error) {
    throw new Error(`${result.response.status} ${result.response.statusText} - ${result.error ? stringify2(result.error) : "Unknown error"}`);
  }
  return result.data.data || [];
}
const transactionsByAddress = /* @__PURE__ */ new Map();
function getTransactionStore(address) {
  const existingStore = transactionsByAddress.get(address);
  if (existingStore) {
    return existingStore;
  }
  const newStore = createStore([]);
  transactionsByAddress.set(address, newStore);
  return newStore;
}
function addTransactionToStore(options) {
  const { address, transactionHash, chainId } = options;
  const tranasctionStore = getTransactionStore(address);
  tranasctionStore.setValue([
    ...tranasctionStore.getValue(),
    { chainId, transactionHash }
  ]);
  transactionsByAddress.set(address, tranasctionStore);
}
async function getPastTransactions(options) {
  const { walletAddress, chain, client } = options;
  const oneMonthsAgoInSeconds = Math.floor((Date.now() - 1 * 30 * 24 * 60 * 60 * 1e3) / 1e3);
  const result = await getTransactions({
    chains: [chain],
    client,
    queryOptions: {
      filter_block_timestamp_gte: oneMonthsAgoInSeconds,
      limit: 20,
      decode: true
    },
    walletAddress
  });
  return result.map((tx) => ({
    chainId: typeof tx.chain_id === "string" ? Number(tx.chain_id) : tx.chain_id,
    receipt: {
      status: tx.status === 0 ? "failed" : "success",
      to: tx.to_address
    },
    transactionHash: tx.hash,
    decoded: tx.decoded
  }));
}
async function toSerializableTransaction(options) {
  const isZkSync = await isZkSyncChain(options.transaction.chain);
  if (isZkSync) {
    const { getZkGasFees } = await __vitePreload(async () => {
      const { getZkGasFees: getZkGasFees2 } = await import("./send-eip712-transaction-C6N5tL5g.js").then((n) => n.a);
      return { getZkGasFees: getZkGasFees2 };
    }, true ? __vite__mapDeps([17,2,3,4,18,1,5,6,7,15,19]) : void 0);
    const { gas: gas2, maxFeePerGas, maxPriorityFeePerGas } = await getZkGasFees({
      from: typeof options.from === "string" ? getAddress$1(options.from) : options.from !== void 0 ? getAddress$1(options.from.address) : void 0,
      transaction: options.transaction
    });
    options.transaction = {
      ...options.transaction,
      gas: gas2,
      maxFeePerGas,
      maxPriorityFeePerGas
    };
  }
  const rpcRequest = getRpcClient(options.transaction);
  const chainId = options.transaction.chain.id;
  const from = options.from;
  let [data, nonce, gas, feeData2, to, accessList, value, authorizationList, type] = await Promise.all([
    encode(options.transaction),
    (async () => {
      const resolvedNonce = await resolvePromisedValue(options.transaction.nonce);
      if (resolvedNonce !== void 0) {
        return resolvedNonce;
      }
      return from ? await __vitePreload(async () => {
        const { eth_getTransactionCount } = await import("./eth_getTransactionCount-DHChJTEw.js");
        return { eth_getTransactionCount };
      }, true ? __vite__mapDeps([20,1,2,3,4,5,6,7]) : void 0).then(({ eth_getTransactionCount }) => eth_getTransactionCount(rpcRequest, {
        address: typeof from === "string" ? getAddress$1(from) : getAddress$1(from.address),
        blockTag: "pending"
      })) : void 0;
    })(),
    // takes the same options as the sendTransaction function thankfully!
    estimateGas({
      ...options,
      from: options.from
    }),
    getGasOverridesForTransaction(options.transaction),
    resolvePromisedValue(options.transaction.to),
    resolvePromisedValue(options.transaction.accessList),
    resolvePromisedValue(options.transaction.value),
    resolvePromisedValue(options.transaction.authorizationList),
    resolvePromisedValue(options.transaction.type)
  ]);
  const extraGas = await resolvePromisedValue(options.transaction.extraGas);
  if (extraGas) {
    gas += extraGas;
  }
  return {
    accessList,
    authorizationList,
    chainId,
    data,
    gas,
    nonce,
    to,
    type,
    value,
    ...feeData2
  };
}
async function sendTransaction(options) {
  let { account, transaction, gasless } = options;
  if (account.onTransactionRequested) {
    await account.onTransactionRequested(transaction);
  }
  if (transaction.eip712) {
    const { sendEip712Transaction } = await __vitePreload(async () => {
      const { sendEip712Transaction: sendEip712Transaction2 } = await import("./send-eip712-transaction-C6N5tL5g.js").then((n) => n.a);
      return { sendEip712Transaction: sendEip712Transaction2 };
    }, true ? __vite__mapDeps([17,2,3,4,18,1,5,6,7,15,19]) : void 0);
    return sendEip712Transaction({
      account,
      transaction
    });
  }
  const serializableTransaction = await toSerializableTransaction({
    from: account,
    transaction
  });
  if (gasless) {
    const { sendGaslessTransaction } = await __vitePreload(async () => {
      const { sendGaslessTransaction: sendGaslessTransaction2 } = await import("./send-gasless-transaction-DuS5V2Y6.js");
      return { sendGaslessTransaction: sendGaslessTransaction2 };
    }, true ? __vite__mapDeps([21,2,3,4,1,5,6,7]) : void 0);
    return sendGaslessTransaction({
      account,
      gasless,
      serializableTransaction,
      transaction
    });
  }
  const result = await account.sendTransaction(serializableTransaction);
  addTransactionToStore({
    address: account.address,
    chainId: transaction.chain.id,
    transactionHash: result.transactionHash
  });
  return { ...result, chain: transaction.chain, client: transaction.client };
}
const sendTransaction$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  sendTransaction
}, Symbol.toStringTag, { value: "Module" }));
function prepareTransaction(options, info) {
  if (info) {
    options.__preparedMethod = info.preparedMethod;
    options.__contract = info.contract;
  }
  return options;
}
const prepareTransaction$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  prepareTransaction
}, Symbol.toStringTag, { value: "Module" }));
function parseTypedData(typedData) {
  const domain = typedData.domain;
  if (domain?.chainId !== void 0 && validate(domain.chainId)) {
    typedData.domain = {
      ...typedData.domain,
      chainId: toNumber(typedData.domain.chainId)
    };
  }
  return typedData;
}
function prepareContractCall(options) {
  const { contract, method, params, ...rest } = options;
  const preparedMethodPromise = () => (async () => {
    if (Array.isArray(method)) {
      return method;
    }
    if (isAbiFunction(method)) {
      return prepareMethod(method);
    }
    if (typeof method === "function") {
      return prepareMethod(
        // @ts-expect-error - method *is* function in this case
        await method(contract)
      );
    }
    if (typeof method === "string" && method.startsWith("function ")) {
      const abiItem = parseAbiItem(method);
      if (abiItem.type === "function") {
        return prepareMethod(abiItem);
      }
      throw new Error(`"method" passed is not of type "function"`);
    }
    if (contract.abi && contract.abi?.length > 0) {
      const abiFunction = contract.abi?.find((item) => item.type === "function" && item.name === method);
      if (abiFunction) {
        return prepareMethod(abiFunction);
      }
    }
    throw new Error(`Could not resolve method "${method}".`);
  })();
  return prepareTransaction({
    ...rest,
    chain: contract.chain,
    client: contract.client,
    data: async () => {
      let preparedM;
      if (Array.isArray(method)) {
        preparedM = method;
      } else {
        preparedM = await preparedMethodPromise();
      }
      if (preparedM[1].length === 0) {
        return preparedM[0];
      }
      return preparedM[0] + encodeAbiParameters(
        preparedM[1],
        // @ts-expect-error - TODO: fix this type issue
        await resolvePromisedValue(params ?? [])
      ).slice(2);
    },
    // these always inferred from the contract
    to: contract.address
  }, {
    contract,
    preparedMethod: preparedMethodPromise
  });
}
function once(fn) {
  let result;
  return () => {
    if (!result) {
      result = fn();
    }
    return result;
  };
}
function userOperationRevertReasonEvent(filters = {}) {
  return prepareEvent({
    filters,
    signature: "event UserOperationRevertReason(bytes32 indexed userOpHash, address indexed sender, uint256 nonce, bytes revertReason)"
  });
}
function postOpRevertReasonEvent(filters = {}) {
  return prepareEvent({
    filters,
    signature: "event PostOpRevertReason(bytes32 indexed userOpHash, address indexed sender, uint256 nonce, bytes revertReason)"
  });
}
function formatUserOperationReceipt(userOpReceiptRaw) {
  const { receipt: transactionReceipt } = userOpReceiptRaw;
  const receipt = {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs,
    status: transactionReceipt.status,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionHash: transactionReceipt.transactionHash,
    transactionIndex: transactionReceipt.transactionIndex,
    type: transactionReceipt.type
  };
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  const userOpReceipt = {
    ...userOpReceiptRaw,
    actualGasCost: BigInt(userOpReceiptRaw.actualGasCost),
    actualGasUsed: BigInt(userOpReceiptRaw.actualGasUsed),
    nonce: BigInt(userOpReceiptRaw.nonce),
    receipt,
    userOpHash: userOpReceiptRaw.userOpHash
  };
  return userOpReceipt;
}
const generateRandomUint192 = () => {
  const rand1 = BigInt(Math.floor(Math.random() * 4294967296));
  const rand2 = BigInt(Math.floor(Math.random() * 4294967296));
  const rand3 = BigInt(Math.floor(Math.random() * 4294967296));
  const rand4 = BigInt(Math.floor(Math.random() * 4294967296));
  const rand5 = BigInt(Math.floor(Math.random() * 4294967296));
  const rand6 = BigInt(Math.floor(Math.random() * 4294967296));
  return rand1 << BigInt(160) | rand2 << BigInt(128) | rand3 << BigInt(96) | rand4 << BigInt(64) | rand5 << BigInt(32) | rand6;
};
function hexlifyUserOp(userOp) {
  return Object.fromEntries(Object.entries(userOp).map(([key, val]) => [
    key,
    // turn any value that's not hex into hex
    val === void 0 || val === null || isHex$1(val) ? val : toHex$1(val)
  ]));
}
async function bundleUserOp(args) {
  return sendBundlerRequest({
    ...args,
    operation: "eth_sendUserOperation",
    params: [
      hexlifyUserOp(args.userOp),
      args.options.entrypointAddress ?? ENTRYPOINT_ADDRESS_v0_6
    ]
  });
}
async function estimateUserOpGas(args, stateOverrides) {
  const res = await sendBundlerRequest({
    ...args,
    operation: "eth_estimateUserOperationGas",
    params: [
      hexlifyUserOp(args.userOp),
      args.options.entrypointAddress ?? ENTRYPOINT_ADDRESS_v0_6,
      stateOverrides ?? {}
    ]
  });
  return {
    callGasLimit: hexToBigInt$1(res.callGasLimit) + MANAGED_ACCOUNT_GAS_BUFFER,
    paymasterPostOpGasLimit: res.paymasterPostOpGasLimit !== void 0 ? hexToBigInt$1(res.paymasterPostOpGasLimit) : void 0,
    paymasterVerificationGasLimit: res.paymasterVerificationGasLimit !== void 0 ? hexToBigInt$1(res.paymasterVerificationGasLimit) : void 0,
    preVerificationGas: hexToBigInt$1(res.preVerificationGas),
    verificationGas: res.verificationGas !== void 0 ? hexToBigInt$1(res.verificationGas) : void 0,
    verificationGasLimit: hexToBigInt$1(res.verificationGasLimit)
  };
}
async function getUserOpGasFees(args) {
  const res = await sendBundlerRequest({
    ...args,
    operation: "thirdweb_getUserOperationGasPrice",
    params: []
  });
  return {
    maxFeePerGas: hexToBigInt$1(res.maxFeePerGas),
    maxPriorityFeePerGas: hexToBigInt$1(res.maxPriorityFeePerGas)
  };
}
async function getUserOpReceipt(args) {
  const res = await getUserOpReceiptRaw(args);
  if (!res) {
    return void 0;
  }
  if (res.success === false) {
    const logs = parseEventLogs({
      events: [userOperationRevertReasonEvent(), postOpRevertReasonEvent()],
      logs: res.logs
    });
    const revertReason = logs[0]?.args?.revertReason;
    if (!revertReason) {
      throw new Error(`UserOp failed at txHash: ${res.receipt.transactionHash}`);
    }
    const revertMsg = decodeErrorResult({
      data: revertReason
    });
    throw new Error(`UserOp failed with reason: '${revertMsg.args.join(",")}' at txHash: ${res.receipt.transactionHash}`);
  }
  return res.receipt;
}
async function getUserOpReceiptRaw(args) {
  const res = await sendBundlerRequest({
    operation: "eth_getUserOperationReceipt",
    options: args,
    params: [args.userOpHash]
  });
  if (!res) {
    return void 0;
  }
  return formatUserOperationReceipt(res);
}
async function getZkPaymasterData(args) {
  const res = await sendBundlerRequest({
    operation: "zk_paymasterData",
    options: args.options,
    params: [args.transaction]
  });
  return {
    paymaster: res.paymaster,
    paymasterInput: res.paymasterInput
  };
}
async function executeWithSignature(args) {
  const res = await sendBundlerRequest({
    ...args,
    operation: "tw_execute",
    params: [
      args.eoaAddress,
      args.wrappedCalls,
      args.signature,
      args.authorization
    ]
  });
  if (!res.queueId) {
    throw new Error(`Error executing 7702 transaction: ${stringify$1(res)}`);
  }
  return {
    transactionId: res.queueId
  };
}
async function getQueuedTransactionHash(args) {
  const res = await sendBundlerRequest({
    ...args,
    operation: "tw_getTransactionHash",
    params: [args.transactionId]
  });
  return {
    transactionHash: res.transactionHash
  };
}
async function broadcastZkTransaction(args) {
  const res = await sendBundlerRequest({
    operation: "zk_broadcastTransaction",
    options: args.options,
    params: [
      {
        ...args.transaction,
        signedTransaction: args.signedTransaction
      }
    ]
  });
  return {
    transactionHash: res.transactionHash
  };
}
async function sendBundlerRequest(args) {
  const { options, operation, params } = args;
  const bundlerUrl = options.bundlerUrl ?? getDefaultBundlerUrl(options.chain);
  const fetchWithHeaders = getClientFetch(options.client);
  const response = await fetchWithHeaders(bundlerUrl, {
    useAuthToken: true,
    body: stringify$1({
      id: 1,
      jsonrpc: "2.0",
      method: operation,
      params
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  const res = await response.json();
  if (!response.ok || res.error) {
    let error = res.error || response.statusText;
    if (typeof error === "object") {
      error = stringify$1(error);
    }
    const code = res.code || "UNKNOWN";
    throw new Error(`${operation} error: ${error}
Status: ${response.status}
Code: ${code}`);
  }
  return res.result;
}
export {
  slice as $,
  abytes as A,
  aoutput as B,
  clean as C,
  createHasher as D,
  rotr as E,
  prepareTransaction as F,
  isNativeTokenAddress as G,
  Hash as H,
  prepareContractCall as I,
  once as J,
  toUnits as K,
  toWei as L,
  hexlifyUserOp as M,
  getUserOpReceipt as N,
  getUserOpGasFees as O,
  getDefaultGasOverrides as P,
  generateRandomUint192 as Q,
  maxUint96 as R,
  estimateUserOpGas as S,
  getZkPaymasterData as T,
  broadcastZkTransaction as U,
  bundleUserOp as V,
  isInsufficientFundsError as W,
  trackInsufficientFundsError as X,
  getAddress as Y,
  ZERO_ADDRESS as Z,
  keccak256 as _,
  toFunctionSelector as a,
  arrayRegex$1 as a$,
  rotl as a0,
  sliceHex as a1,
  isAddress as a2,
  InvalidAddressError as a3,
  formatTransactionRequest as a4,
  checksumAddress as a5,
  LruMap as a6,
  AbiConstructorNotFoundError as a7,
  AbiConstructorParamsNotFoundError as a8,
  AbiDecodingDataSizeInvalidError as a9,
  bytesToString as aA,
  concatBytes as aB,
  concatHex as aC,
  decodeEventLog as aD,
  defineBlock as aE,
  defineChain as aF,
  defineTransactionRequest as aG,
  encodeEventTopics as aH,
  formatBlock as aI,
  fromBytes as aJ,
  getAbiItem as aK,
  toEventSelector as aL,
  toSignature as aM,
  parseEventLogs$1 as aN,
  rpcTransactionType as aO,
  sliceBytes as aP,
  toSignatureHash as aQ,
  sepolia as aR,
  execTyped$1 as aS,
  isTupleRegex$1 as aT,
  bytesRegex$3 as aU,
  integerRegex$3 as aV,
  formatAbiItem$1 as aW,
  panicReasons as aX,
  solidityError as aY,
  integerRegex$2 as aZ,
  bytesRegex$2 as a_,
  AbiDecodingDataSizeTooSmallError as aa,
  AbiDecodingZeroDataError as ab,
  AbiEncodingArrayLengthMismatchError as ac,
  AbiEncodingBytesSizeMismatchError as ad,
  AbiEncodingLengthMismatchError as ae,
  AbiErrorInputsNotFoundError as af,
  AbiErrorNotFoundError as ag,
  AbiErrorSignatureNotFoundError as ah,
  AbiEventNotFoundError as ai,
  AbiEventSignatureEmptyTopicsError as aj,
  AbiEventSignatureNotFoundError as ak,
  AbiFunctionNotFoundError as al,
  AbiFunctionOutputsNotFoundError as am,
  AbiFunctionSignatureNotFoundError as an,
  BytesSizeMismatchError as ao,
  DecodeLogDataMismatch as ap,
  DecodeLogTopicsMismatch as aq,
  FilterTypeNotSupportedError as ar,
  InvalidAbiDecodingTypeError as as,
  InvalidAbiEncodingTypeError as at,
  InvalidArrayError as au,
  InvalidDefinitionTypeError as av,
  UnsupportedPackedAbiType as aw,
  bytesToBigInt as ax,
  bytesToBool as ay,
  bytesToNumber as az,
  encode as b,
  keccak_256 as b0,
  formatAbiParameters$1 as b1,
  ahash as b2,
  anumber as b3,
  randomBytes as b4,
  concatBytes$1 as b5,
  formatAbiItem$2 as b6,
  NATIVE_TOKEN_ADDRESS as b7,
  resolveScheme as b8,
  executeWithSignature as b9,
  getQueuedTransactionHash as ba,
  getTransactionGasCost as bb,
  estimateGas as bc,
  getTransactionStore as bd,
  getPastTransactions as be,
  download$1 as bf,
  units as bg,
  feeData as bh,
  estimateGas$1 as bi,
  sendTransaction$1 as bj,
  prepareTransaction$1 as bk,
  resolvePromisedValue as c,
  decodeAbiParameters as d,
  encodeAbiParameters as e,
  addTransactionToStore as f,
  encodeAbiParameters$1 as g,
  toTokens as h,
  decodeErrorResult as i,
  isAddressEqual as j,
  concat as k,
  sendTransaction as l,
  randomBytesHex as m,
  integerRegex as n,
  bytesRegex as o,
  parseTypedData as p,
  arrayRegex as q,
  readContract as r,
  stringify as s,
  trackTransaction as t,
  maxUint256 as u,
  toSerializableTransaction as v,
  createCursor as w,
  createView as x,
  aexists as y,
  toBytes as z
};
