const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ccip-KrcYtDWH.js","assets/bundler-Dmn5v2kr.js","assets/index-CXUot43X.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css","assets/rpc-BGTULWFS.js","assets/sha256-C8LtJplw.js","assets/PassportHome-SJEwmPr3.js","assets/trophy-hLhL8QOQ.js","assets/alert-circle-lhG861Pl.js","assets/emotion-unitless.esm-BWDbD2bQ.js","assets/TypedData-B3RAtJ0b.js","assets/Address-CuEhN18Y.js","assets/Authorization-CEwvBCmC.js","assets/decimals-RuAU2I0v.js","assets/arweave-BmejQRVS.js","assets/gift-Biw2Zx2l.js","assets/star-CGQXWRD_.js","assets/award-DJfbIRpy.js","assets/sparkles-BEe8L_dR.js"])))=>i.map(i=>d[i]);
import { b4 as numberToHex, _ as BaseError$2, $ as isHex, az as toHex$1, b6 as hexToBigInt, b3 as size$3, b5 as hexToNumber$1, ax as hexToBytes$1, bE as InvalidBytesLengthError, ay as bytesToHex$1, bk as formatLog, bF as receiptStatuses, b7 as trim$2, au as toBytes, bt as stringToBytes, av as pad$2, b9 as stringToHex, bh as boolToHex, bl as formatTransaction, bm as formatTransactionReceipt, bo as hexToBool } from "./index-CXUot43X.js";
import { aS as execTyped, aT as isTupleRegex, aU as bytesRegex$1, aV as integerRegex$1, aH as encodeEventTopics, aK as getAbiItem, al as AbiFunctionNotFoundError, a as toFunctionSelector, aW as formatAbiItem, g as encodeAbiParameters, aC as concatHex, s as stringify$1, i as decodeErrorResult, aX as panicReasons, ah as AbiErrorSignatureNotFoundError, ab as AbiDecodingZeroDataError, _ as keccak256$1, a5 as checksumAddress, a2 as isAddress, a3 as InvalidAddressError$1, aI as formatBlock, w as createCursor, a4 as formatTransactionRequest, aN as parseEventLogs, am as AbiFunctionOutputsNotFoundError, d as decodeAbiParameters, a7 as AbiConstructorNotFoundError, a8 as AbiConstructorParamsNotFoundError, aD as decodeEventLog, ap as DecodeLogDataMismatch, aq as DecodeLogTopicsMismatch, a6 as LruMap$1, k as concat$1, a1 as sliceHex, $ as slice$2, an as AbiFunctionSignatureNotFoundError, ag as AbiErrorNotFoundError, af as AbiErrorInputsNotFoundError, au as InvalidArrayError$1, aY as solidityError, ae as AbiEncodingLengthMismatchError, aZ as integerRegex$2, a_ as bytesRegex$2, ao as BytesSizeMismatchError$1, a$ as arrayRegex$1, aw as UnsupportedPackedAbiType, j as isAddressEqual, Y as getAddress, b0 as keccak_256, b1 as formatAbiParameters, H as Hash, b2 as ahash, z as toBytes$1, C as clean, y as aexists, A as abytes$1, b3 as anumber, b4 as randomBytes, b5 as concatBytes$1, b6 as formatAbiItem$1 } from "./bundler-Dmn5v2kr.js";
import { t as getContractAddress, I as InternalRpcError, R as RpcRequestError, d as InvalidInputRpcError, r as UnsupportedNonOptionalCapabilityError, c as AtomicityNotSupportedError, h as MethodNotSupportedRpcError, H as HttpRequestError, p as UnknownRpcError, U as UserRejectedRequestError, A as AtomicReadyWalletRejectedUpgradeError, B as BundleTooLargeError, o as UnknownBundleIdError, D as DuplicateIdError, q as UnsupportedChainIdError, S as SwitchChainError, C as ChainDisconnectedError, i as ProviderDisconnectedError, s as UnsupportedProviderMethodError, n as UnauthorizedProviderError, J as JsonRpcVersionUnsupportedError, L as LimitExceededRpcError, b as TransactionRejectedRpcError, l as ResourceUnavailableRpcError, k as ResourceNotFoundRpcError, e as InvalidParamsRpcError, M as MethodNotFoundRpcError, f as InvalidRequestRpcError, P as ParseRpcError, T as TimeoutError } from "./rpc-BGTULWFS.js";
import { t as toRlp, a4 as maxUint256$1, s as sha256, aL as sha256$1 } from "./sha256-C8LtJplw.js";
import { aF as encodedLabelToLabelhash, aA as labelhash, as as withTimeout, at as hashTypedData } from "./PassportHome-SJEwmPr3.js";
import { _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
const version$1 = "1.1.0";
let BaseError$1 = class BaseError extends Error {
  constructor(shortMessage, args = {}) {
    const details = args.cause instanceof BaseError ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
    const docsPath2 = args.cause instanceof BaseError ? args.cause.docsPath || args.docsPath : args.docsPath;
    const message = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      ...docsPath2 ? [`Docs: https://abitype.dev${docsPath2}`] : [],
      ...details ? [`Details: ${details}`] : [],
      `Version: abitype@${version$1}`
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
};
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
const modifiers = /* @__PURE__ */ new Set([
  "memory",
  "indexed",
  "storage",
  "calldata"
]);
const eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
const functionModifiers = /* @__PURE__ */ new Set([
  "calldata",
  "memory",
  "storage"
]);
class InvalidAbiItemError extends BaseError$1 {
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
class UnknownTypeError extends BaseError$1 {
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
class UnknownSolidityTypeError extends BaseError$1 {
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
class InvalidAbiParameterError extends BaseError$1 {
  constructor({ param }) {
    super("Failed to parse ABI parameter.", {
      details: `parseAbiParameter(${JSON.stringify(param, null, 2)})`,
      docsPath: "/api/human#parseabiparameter-1"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAbiParameterError"
    });
  }
}
class InvalidAbiParametersError extends BaseError$1 {
  constructor({ params }) {
    super("Failed to parse ABI parameters.", {
      details: `parseAbiParameters(${JSON.stringify(params, null, 2)})`,
      docsPath: "/api/human#parseabiparameters-1"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAbiParametersError"
    });
  }
}
class InvalidParameterError extends BaseError$1 {
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
class SolidityProtectedKeywordError extends BaseError$1 {
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
class InvalidModifierError extends BaseError$1 {
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
class InvalidFunctionModifierError extends BaseError$1 {
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
class InvalidAbiTypeParameterError extends BaseError$1 {
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
class InvalidSignatureError extends BaseError$1 {
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
class UnknownSignatureError extends BaseError$1 {
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
class InvalidStructSignatureError extends BaseError$1 {
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
class CircularReferenceError extends BaseError$1 {
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
class InvalidParenthesisError extends BaseError$1 {
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
function parseSignature$1(signature, structs = {}) {
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
const abiParameterWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
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
  } else if (match.type === "address payable") {
    type = "address";
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
  const abi2 = [];
  const length = signatures.length;
  for (let i = 0; i < length; i++) {
    const signature = signatures[i];
    if (isStructSignature(signature))
      continue;
    abi2.push(parseSignature$1(signature, structs));
  }
  return abi2;
}
function parseAbiItem(signature) {
  let abiItem;
  if (typeof signature === "string")
    abiItem = parseSignature$1(signature);
  else {
    const structs = parseStructs(signature);
    const length = signature.length;
    for (let i = 0; i < length; i++) {
      const signature_ = signature[i];
      if (isStructSignature(signature_))
        continue;
      abiItem = parseSignature$1(signature_, structs);
      break;
    }
  }
  if (!abiItem)
    throw new InvalidAbiItemError({ signature });
  return abiItem;
}
function parseAbiParameters(params) {
  const abiParameters = [];
  if (typeof params === "string") {
    const parameters = splitParameters(params);
    const length = parameters.length;
    for (let i = 0; i < length; i++) {
      abiParameters.push(parseAbiParameter(parameters[i], { modifiers }));
    }
  } else {
    const structs = parseStructs(params);
    const length = params.length;
    for (let i = 0; i < length; i++) {
      const signature = params[i];
      if (isStructSignature(signature))
        continue;
      const parameters = splitParameters(signature);
      const length2 = parameters.length;
      for (let k = 0; k < length2; k++) {
        abiParameters.push(parseAbiParameter(parameters[k], { modifiers, structs }));
      }
    }
  }
  if (abiParameters.length === 0)
    throw new InvalidAbiParametersError({ params });
  return abiParameters;
}
function getAction(client, actionFn, name) {
  const action_implicit = client[actionFn.name];
  if (typeof action_implicit === "function")
    return action_implicit;
  const action_explicit = client[name];
  if (typeof action_explicit === "function")
    return action_explicit;
  return (params) => actionFn(client, params);
}
function createFilterRequestScope(client, { method }) {
  const requestMap = {};
  if (client.transport.type === "fallback")
    client.transport.onResponse?.(({ method: method_, response: id, status, transport }) => {
      if (status === "success" && method === method_)
        requestMap[id] = transport.request;
    });
  return (id) => requestMap[id] || client.request;
}
async function createContractEventFilter(client, parameters) {
  const { address, abi: abi2, args, eventName, fromBlock, strict, toBlock } = parameters;
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newFilter"
  });
  const topics = eventName ? encodeEventTopics({
    abi: abi2,
    args,
    eventName
  }) : void 0;
  const id = await client.request({
    method: "eth_newFilter",
    params: [
      {
        address,
        fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
        toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
        topics
      }
    ]
  });
  return {
    abi: abi2,
    args,
    eventName,
    id,
    request: getRequest(id),
    strict: Boolean(strict),
    type: "event"
  };
}
function parseAccount(account) {
  if (typeof account === "string")
    return { address: account, type: "json-rpc" };
  return account;
}
const docsPath$4 = "/docs/contract/encodeFunctionData";
function prepareEncodeFunctionData(parameters) {
  const { abi: abi2, args, functionName } = parameters;
  let abiItem = abi2[0];
  if (functionName) {
    const item = getAbiItem({
      abi: abi2,
      args,
      name: functionName
    });
    if (!item)
      throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath$4 });
    abiItem = item;
  }
  if (abiItem.type !== "function")
    throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath$4 });
  return {
    abi: [abiItem],
    functionName: toFunctionSelector(formatAbiItem(abiItem))
  };
}
function encodeFunctionData(parameters) {
  const { args } = parameters;
  const { abi: abi2, functionName } = (() => {
    if (parameters.abi.length === 1 && parameters.functionName?.startsWith("0x"))
      return parameters;
    return prepareEncodeFunctionData(parameters);
  })();
  const abiItem = abi2[0];
  const signature = functionName;
  const data = "inputs" in abiItem && abiItem.inputs ? encodeAbiParameters(abiItem.inputs, args ?? []) : void 0;
  return concatHex([signature, data ?? "0x"]);
}
function formatAbiItemWithArgs({ abiItem, args, includeFunctionName = true, includeName = false }) {
  if (!("name" in abiItem))
    return;
  if (!("inputs" in abiItem))
    return;
  if (!abiItem.inputs)
    return;
  return `${includeFunctionName ? abiItem.name : ""}(${abiItem.inputs.map((input, i) => `${includeName && input.name ? `${input.name}: ` : ""}${typeof args[i] === "object" ? stringify$1(args[i]) : args[i]}`).join(", ")})`;
}
const etherUnits = {
  gwei: 9,
  wei: 18
};
const gweiUnits = {
  ether: -9,
  wei: 9
};
const weiUnits = {
  ether: -18,
  gwei: -9
};
function formatUnits(value, decimals) {
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
function formatEther(wei, unit = "wei") {
  return formatUnits(wei, etherUnits[unit]);
}
function formatGwei(wei, unit = "wei") {
  return formatUnits(wei, gweiUnits[unit]);
}
class AccountStateConflictError extends BaseError$2 {
  constructor({ address }) {
    super(`State for account "${address}" is set multiple times.`, {
      name: "AccountStateConflictError"
    });
  }
}
class StateAssignmentConflictError extends BaseError$2 {
  constructor() {
    super("state and stateDiff are set on the same account.", {
      name: "StateAssignmentConflictError"
    });
  }
}
function prettyStateMapping(stateMapping) {
  return stateMapping.reduce((pretty, { slot, value }) => {
    return `${pretty}        ${slot}: ${value}
`;
  }, "");
}
function prettyStateOverride(stateOverride) {
  return stateOverride.reduce((pretty, { address, ...state }) => {
    let val = `${pretty}    ${address}:
`;
    if (state.nonce)
      val += `      nonce: ${state.nonce}
`;
    if (state.balance)
      val += `      balance: ${state.balance}
`;
    if (state.code)
      val += `      code: ${state.code}
`;
    if (state.state) {
      val += "      state:\n";
      val += prettyStateMapping(state.state);
    }
    if (state.stateDiff) {
      val += "      stateDiff:\n";
      val += prettyStateMapping(state.stateDiff);
    }
    return val;
  }, "  State Override:\n").slice(0, -1);
}
function prettyPrint(args) {
  const entries = Object.entries(args).map(([key, value]) => {
    if (value === void 0 || value === false)
      return null;
    return [key, value];
  }).filter(Boolean);
  const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
  return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
}
class FeeConflictError extends BaseError$2 {
  constructor() {
    super([
      "Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.",
      "Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others."
    ].join("\n"), { name: "FeeConflictError" });
  }
}
class InvalidLegacyVError extends BaseError$2 {
  constructor({ v }) {
    super(`Invalid \`v\` value "${v}". Expected 27 or 28.`, {
      name: "InvalidLegacyVError"
    });
  }
}
class InvalidSerializableTransactionError extends BaseError$2 {
  constructor({ transaction }) {
    super("Cannot infer a transaction type from provided transaction.", {
      metaMessages: [
        "Provided Transaction:",
        "{",
        prettyPrint(transaction),
        "}",
        "",
        "To infer the type, either provide:",
        "- a `type` to the Transaction, or",
        "- an EIP-1559 Transaction with `maxFeePerGas`, or",
        "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
        "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
        "- an EIP-7702 Transaction with `authorizationList`, or",
        "- a Legacy Transaction with `gasPrice`"
      ],
      name: "InvalidSerializableTransactionError"
    });
  }
}
class InvalidSerializedTransactionTypeError extends BaseError$2 {
  constructor({ serializedType }) {
    super(`Serialized transaction type "${serializedType}" is invalid.`, {
      name: "InvalidSerializedTransactionType"
    });
    Object.defineProperty(this, "serializedType", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.serializedType = serializedType;
  }
}
class InvalidSerializedTransactionError extends BaseError$2 {
  constructor({ attributes, serializedTransaction, type }) {
    const missing = Object.entries(attributes).map(([key, value]) => typeof value === "undefined" ? key : void 0).filter(Boolean);
    super(`Invalid serialized transaction of type "${type}" was provided.`, {
      metaMessages: [
        `Serialized Transaction: "${serializedTransaction}"`,
        missing.length > 0 ? `Missing Attributes: ${missing.join(", ")}` : ""
      ].filter(Boolean),
      name: "InvalidSerializedTransactionError"
    });
    Object.defineProperty(this, "serializedTransaction", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "type", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.serializedTransaction = serializedTransaction;
    this.type = type;
  }
}
class InvalidStorageKeySizeError extends BaseError$2 {
  constructor({ storageKey }) {
    super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Math.floor((storageKey.length - 2) / 2)} bytes.`, { name: "InvalidStorageKeySizeError" });
  }
}
class TransactionExecutionError extends BaseError$2 {
  constructor(cause, { account, docsPath: docsPath2, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
    const prettyArgs = prettyPrint({
      chain: chain && `${chain?.name} (id: ${chain?.id})`,
      from: account?.address,
      to,
      value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
      data,
      gas,
      gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
      maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
      maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
      nonce
    });
    super(cause.shortMessage, {
      cause,
      docsPath: docsPath2,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Request Arguments:",
        prettyArgs
      ].filter(Boolean),
      name: "TransactionExecutionError"
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.cause = cause;
  }
}
class TransactionNotFoundError extends BaseError$2 {
  constructor({ blockHash, blockNumber, blockTag, hash: hash2, index: index2 }) {
    let identifier = "Transaction";
    if (blockTag && index2 !== void 0)
      identifier = `Transaction at block time "${blockTag}" at index "${index2}"`;
    if (blockHash && index2 !== void 0)
      identifier = `Transaction at block hash "${blockHash}" at index "${index2}"`;
    if (blockNumber && index2 !== void 0)
      identifier = `Transaction at block number "${blockNumber}" at index "${index2}"`;
    if (hash2)
      identifier = `Transaction with hash "${hash2}"`;
    super(`${identifier} could not be found.`, {
      name: "TransactionNotFoundError"
    });
  }
}
class TransactionReceiptNotFoundError extends BaseError$2 {
  constructor({ hash: hash2 }) {
    super(`Transaction receipt with hash "${hash2}" could not be found. The Transaction may not be processed on a block yet.`, {
      name: "TransactionReceiptNotFoundError"
    });
  }
}
class TransactionReceiptRevertedError extends BaseError$2 {
  constructor({ receipt }) {
    super(`Transaction with hash "${receipt.transactionHash}" reverted.`, {
      metaMessages: [
        'The receipt marked the transaction as "reverted". This could mean that the function on the contract you are trying to call threw an error.',
        " ",
        "You can attempt to extract the revert reason by:",
        "- calling the `simulateContract` or `simulateCalls` Action with the `abi` and `functionName` of the contract",
        "- using the `call` Action with raw `data`"
      ],
      name: "TransactionReceiptRevertedError"
    });
    Object.defineProperty(this, "receipt", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.receipt = receipt;
  }
}
class WaitForTransactionReceiptTimeoutError extends BaseError$2 {
  constructor({ hash: hash2 }) {
    super(`Timed out while waiting for transaction with hash "${hash2}" to be confirmed.`, { name: "WaitForTransactionReceiptTimeoutError" });
  }
}
class CallExecutionError extends BaseError$2 {
  constructor(cause, { account: account_, docsPath: docsPath2, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride }) {
    const account = account_ ? parseAccount(account_) : void 0;
    let prettyArgs = prettyPrint({
      from: account?.address,
      to,
      value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
      data,
      gas,
      gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
      maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
      maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
      nonce
    });
    if (stateOverride) {
      prettyArgs += `
${prettyStateOverride(stateOverride)}`;
    }
    super(cause.shortMessage, {
      cause,
      docsPath: docsPath2,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Raw Call Arguments:",
        prettyArgs
      ].filter(Boolean),
      name: "CallExecutionError"
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.cause = cause;
  }
}
class ContractFunctionExecutionError extends BaseError$2 {
  constructor(cause, { abi: abi2, args, contractAddress, docsPath: docsPath2, functionName, sender }) {
    const abiItem = getAbiItem({ abi: abi2, args, name: functionName });
    const formattedArgs = abiItem ? formatAbiItemWithArgs({
      abiItem,
      args,
      includeFunctionName: false,
      includeName: false
    }) : void 0;
    const functionWithParams = abiItem ? formatAbiItem(abiItem, { includeName: true }) : void 0;
    const prettyArgs = prettyPrint({
      address: contractAddress && getContractAddress(contractAddress),
      function: functionWithParams,
      args: formattedArgs && formattedArgs !== "()" && `${[...Array(functionName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}`,
      sender
    });
    super(cause.shortMessage || `An unknown error occurred while executing the contract function "${functionName}".`, {
      cause,
      docsPath: docsPath2,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        prettyArgs && "Contract Call:",
        prettyArgs
      ].filter(Boolean),
      name: "ContractFunctionExecutionError"
    });
    Object.defineProperty(this, "abi", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "args", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "contractAddress", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "formattedArgs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "functionName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "sender", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.abi = abi2;
    this.args = args;
    this.cause = cause;
    this.contractAddress = contractAddress;
    this.functionName = functionName;
    this.sender = sender;
  }
}
class ContractFunctionRevertedError extends BaseError$2 {
  constructor({ abi: abi2, data, functionName, message }) {
    let cause;
    let decodedData;
    let metaMessages;
    let reason;
    if (data && data !== "0x") {
      try {
        decodedData = decodeErrorResult({ abi: abi2, data });
        const { abiItem, errorName, args: errorArgs } = decodedData;
        if (errorName === "Error") {
          reason = errorArgs[0];
        } else if (errorName === "Panic") {
          const [firstArg] = errorArgs;
          reason = panicReasons[firstArg];
        } else {
          const errorWithParams = abiItem ? formatAbiItem(abiItem, { includeName: true }) : void 0;
          const formattedArgs = abiItem && errorArgs ? formatAbiItemWithArgs({
            abiItem,
            args: errorArgs,
            includeFunctionName: false,
            includeName: false
          }) : void 0;
          metaMessages = [
            errorWithParams ? `Error: ${errorWithParams}` : "",
            formattedArgs && formattedArgs !== "()" ? `       ${[...Array(errorName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}` : ""
          ];
        }
      } catch (err) {
        cause = err;
      }
    } else if (message)
      reason = message;
    let signature;
    if (cause instanceof AbiErrorSignatureNotFoundError) {
      signature = cause.signature;
      metaMessages = [
        `Unable to decode signature "${signature}" as it was not found on the provided ABI.`,
        "Make sure you are using the correct ABI and that the error exists on it.",
        `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`
      ];
    }
    super(reason && reason !== "execution reverted" || signature ? [
      `The contract function "${functionName}" reverted with the following ${signature ? "signature" : "reason"}:`,
      reason || signature
    ].join("\n") : `The contract function "${functionName}" reverted.`, {
      cause,
      metaMessages,
      name: "ContractFunctionRevertedError"
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "raw", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "reason", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "signature", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.data = decodedData;
    this.raw = data;
    this.reason = reason;
    this.signature = signature;
  }
}
class ContractFunctionZeroDataError extends BaseError$2 {
  constructor({ functionName }) {
    super(`The contract function "${functionName}" returned no data ("0x").`, {
      metaMessages: [
        "This could be due to any of the following:",
        `  - The contract does not have the function "${functionName}",`,
        "  - The parameters passed to the contract function may be invalid, or",
        "  - The address is not a contract."
      ],
      name: "ContractFunctionZeroDataError"
    });
  }
}
class CounterfactualDeploymentFailedError extends BaseError$2 {
  constructor({ factory }) {
    super(`Deployment for counterfactual contract call failed${factory ? ` for factory "${factory}".` : ""}`, {
      metaMessages: [
        "Please ensure:",
        "- The `factory` is a valid contract deployment factory (ie. Create2 Factory, ERC-4337 Factory, etc).",
        "- The `factoryData` is a valid encoded function call for contract deployment function on the factory."
      ],
      name: "CounterfactualDeploymentFailedError"
    });
  }
}
class RawContractError extends BaseError$2 {
  constructor({ data, message }) {
    super(message || "", { name: "RawContractError" });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 3
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.data = data;
  }
}
const EXECUTION_REVERTED_ERROR_CODE = 3;
function getContractError(err, { abi: abi2, address, args, docsPath: docsPath2, functionName, sender }) {
  const error = err instanceof RawContractError ? err : err instanceof BaseError$2 ? err.walk((err2) => "data" in err2) || err.walk() : {};
  const { code, data, details, message, shortMessage } = error;
  const cause = (() => {
    if (err instanceof AbiDecodingZeroDataError)
      return new ContractFunctionZeroDataError({ functionName });
    if ([EXECUTION_REVERTED_ERROR_CODE, InternalRpcError.code].includes(code) && (data || details || message || shortMessage)) {
      return new ContractFunctionRevertedError({
        abi: abi2,
        data: typeof data === "object" ? data.data : data,
        functionName,
        message: error instanceof RpcRequestError ? details : shortMessage ?? message
      });
    }
    return err;
  })();
  return new ContractFunctionExecutionError(cause, {
    abi: abi2,
    args,
    contractAddress: address,
    docsPath: docsPath2,
    functionName,
    sender
  });
}
function publicKeyToAddress(publicKey) {
  const address = keccak256$1(`0x${publicKey.substring(4)}`).substring(26);
  return checksumAddress(`0x${address}`);
}
async function recoverPublicKey$1({ hash: hash2, signature }) {
  const hashHex = isHex(hash2) ? hash2 : toHex$1(hash2);
  const { secp256k1: secp256k12 } = await __vitePreload(async () => {
    const { secp256k1: secp256k13 } = await Promise.resolve().then(() => secp256k1$1);
    return { secp256k1: secp256k13 };
  }, true ? void 0 : void 0);
  const signature_ = (() => {
    if (typeof signature === "object" && "r" in signature && "s" in signature) {
      const { r, s, v, yParity } = signature;
      const yParityOrV2 = Number(yParity ?? v);
      const recoveryBit2 = toRecoveryBit(yParityOrV2);
      return new secp256k12.Signature(hexToBigInt(r), hexToBigInt(s)).addRecoveryBit(recoveryBit2);
    }
    const signatureHex = isHex(signature) ? signature : toHex$1(signature);
    if (size$3(signatureHex) !== 65)
      throw new Error("invalid signature length");
    const yParityOrV = hexToNumber$1(`0x${signatureHex.slice(130)}`);
    const recoveryBit = toRecoveryBit(yParityOrV);
    return secp256k12.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
  })();
  const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
  return `0x${publicKey}`;
}
function toRecoveryBit(yParityOrV) {
  if (yParityOrV === 0 || yParityOrV === 1)
    return yParityOrV;
  if (yParityOrV === 27)
    return 0;
  if (yParityOrV === 28)
    return 1;
  throw new Error("Invalid yParityOrV value");
}
async function recoverAddress$1({ hash: hash2, signature }) {
  return publicKeyToAddress(await recoverPublicKey$1({ hash: hash2, signature }));
}
function hashAuthorization(parameters) {
  const { chainId, nonce, to } = parameters;
  const address = parameters.contractAddress ?? parameters.address;
  const hash2 = keccak256$1(concatHex([
    "0x05",
    toRlp([
      chainId ? numberToHex(chainId) : "0x",
      address,
      nonce ? numberToHex(nonce) : "0x"
    ])
  ]));
  if (to === "bytes")
    return hexToBytes$1(hash2);
  return hash2;
}
async function recoverAuthorizationAddress(parameters) {
  const { authorization, signature } = parameters;
  return recoverAddress$1({
    hash: hashAuthorization(authorization),
    signature: signature ?? authorization
  });
}
class EstimateGasExecutionError extends BaseError$2 {
  constructor(cause, { account, docsPath: docsPath2, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
    const prettyArgs = prettyPrint({
      from: account?.address,
      to,
      value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
      data,
      gas,
      gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
      maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
      maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
      nonce
    });
    super(cause.shortMessage, {
      cause,
      docsPath: docsPath2,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Estimate Gas Arguments:",
        prettyArgs
      ].filter(Boolean),
      name: "EstimateGasExecutionError"
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.cause = cause;
  }
}
class ExecutionRevertedError extends BaseError$2 {
  constructor({ cause, message } = {}) {
    const reason = message?.replace("execution reverted: ", "")?.replace("execution reverted", "");
    super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
      cause,
      name: "ExecutionRevertedError"
    });
  }
}
Object.defineProperty(ExecutionRevertedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 3
});
Object.defineProperty(ExecutionRevertedError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /execution reverted/
});
class FeeCapTooHighError extends BaseError$2 {
  constructor({ cause, maxFeePerGas } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
      cause,
      name: "FeeCapTooHighError"
    });
  }
}
Object.defineProperty(FeeCapTooHighError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
});
class FeeCapTooLowError extends BaseError$2 {
  constructor({ cause, maxFeePerGas } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)}` : ""} gwei) cannot be lower than the block base fee.`, {
      cause,
      name: "FeeCapTooLowError"
    });
  }
}
Object.defineProperty(FeeCapTooLowError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
});
class NonceTooHighError extends BaseError$2 {
  constructor({ cause, nonce } = {}) {
    super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, { cause, name: "NonceTooHighError" });
  }
}
Object.defineProperty(NonceTooHighError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /nonce too high/
});
class NonceTooLowError extends BaseError$2 {
  constructor({ cause, nonce } = {}) {
    super([
      `Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`,
      "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
    ].join("\n"), { cause, name: "NonceTooLowError" });
  }
}
Object.defineProperty(NonceTooLowError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /nonce too low|transaction already imported|already known/
});
class NonceMaxValueError extends BaseError$2 {
  constructor({ cause, nonce } = {}) {
    super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, { cause, name: "NonceMaxValueError" });
  }
}
Object.defineProperty(NonceMaxValueError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /nonce has max value/
});
class InsufficientFundsError extends BaseError$2 {
  constructor({ cause } = {}) {
    super([
      "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
    ].join("\n"), {
      cause,
      metaMessages: [
        "This error could arise when the account does not have enough funds to:",
        " - pay for the total gas fee,",
        " - pay for the value to send.",
        " ",
        "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
        " - `gas` is the amount of gas needed for transaction to execute,",
        " - `gas fee` is the gas fee,",
        " - `value` is the amount of ether to send to the recipient."
      ],
      name: "InsufficientFundsError"
    });
  }
}
Object.defineProperty(InsufficientFundsError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /insufficient funds|exceeds transaction sender account balance/
});
class IntrinsicGasTooHighError extends BaseError$2 {
  constructor({ cause, gas } = {}) {
    super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
      cause,
      name: "IntrinsicGasTooHighError"
    });
  }
}
Object.defineProperty(IntrinsicGasTooHighError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /intrinsic gas too high|gas limit reached/
});
class IntrinsicGasTooLowError extends BaseError$2 {
  constructor({ cause, gas } = {}) {
    super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
      cause,
      name: "IntrinsicGasTooLowError"
    });
  }
}
Object.defineProperty(IntrinsicGasTooLowError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /intrinsic gas too low/
});
class TransactionTypeNotSupportedError extends BaseError$2 {
  constructor({ cause }) {
    super("The transaction type is not supported for this chain.", {
      cause,
      name: "TransactionTypeNotSupportedError"
    });
  }
}
Object.defineProperty(TransactionTypeNotSupportedError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /transaction type not valid/
});
class TipAboveFeeCapError extends BaseError$2 {
  constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
    super([
      `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}).`
    ].join("\n"), {
      cause,
      name: "TipAboveFeeCapError"
    });
  }
}
Object.defineProperty(TipAboveFeeCapError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
});
class UnknownNodeError extends BaseError$2 {
  constructor({ cause }) {
    super(`An error occurred while executing: ${cause?.shortMessage}`, {
      cause,
      name: "UnknownNodeError"
    });
  }
}
function getNodeError(err, args) {
  const message = (err.details || "").toLowerCase();
  const executionRevertedError = err instanceof BaseError$2 ? err.walk((e) => e?.code === ExecutionRevertedError.code) : err;
  if (executionRevertedError instanceof BaseError$2)
    return new ExecutionRevertedError({
      cause: err,
      message: executionRevertedError.details
    });
  if (ExecutionRevertedError.nodeMessage.test(message))
    return new ExecutionRevertedError({
      cause: err,
      message: err.details
    });
  if (FeeCapTooHighError.nodeMessage.test(message))
    return new FeeCapTooHighError({
      cause: err,
      maxFeePerGas: args?.maxFeePerGas
    });
  if (FeeCapTooLowError.nodeMessage.test(message))
    return new FeeCapTooLowError({
      cause: err,
      maxFeePerGas: args?.maxFeePerGas
    });
  if (NonceTooHighError.nodeMessage.test(message))
    return new NonceTooHighError({ cause: err, nonce: args?.nonce });
  if (NonceTooLowError.nodeMessage.test(message))
    return new NonceTooLowError({ cause: err, nonce: args?.nonce });
  if (NonceMaxValueError.nodeMessage.test(message))
    return new NonceMaxValueError({ cause: err, nonce: args?.nonce });
  if (InsufficientFundsError.nodeMessage.test(message))
    return new InsufficientFundsError({ cause: err });
  if (IntrinsicGasTooHighError.nodeMessage.test(message))
    return new IntrinsicGasTooHighError({ cause: err, gas: args?.gas });
  if (IntrinsicGasTooLowError.nodeMessage.test(message))
    return new IntrinsicGasTooLowError({ cause: err, gas: args?.gas });
  if (TransactionTypeNotSupportedError.nodeMessage.test(message))
    return new TransactionTypeNotSupportedError({ cause: err });
  if (TipAboveFeeCapError.nodeMessage.test(message))
    return new TipAboveFeeCapError({
      cause: err,
      maxFeePerGas: args?.maxFeePerGas,
      maxPriorityFeePerGas: args?.maxPriorityFeePerGas
    });
  return new UnknownNodeError({
    cause: err
  });
}
function getEstimateGasError(err, { docsPath: docsPath2, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new EstimateGasExecutionError(cause, {
    docsPath: docsPath2,
    ...args
  });
}
function extract$1(value_, { format }) {
  if (!format)
    return {};
  const value = {};
  function extract_(formatted2) {
    const keys = Object.keys(formatted2);
    for (const key of keys) {
      if (key in value_)
        value[key] = value_[key];
      if (formatted2[key] && typeof formatted2[key] === "object" && !Array.isArray(formatted2[key]))
        extract_(formatted2[key]);
    }
  }
  const formatted = format(value_ || {});
  extract_(formatted);
  return value;
}
function serializeStateMapping(stateMapping) {
  if (!stateMapping || stateMapping.length === 0)
    return void 0;
  return stateMapping.reduce((acc, { slot, value }) => {
    if (slot.length !== 66)
      throw new InvalidBytesLengthError({
        size: slot.length,
        targetSize: 66,
        type: "hex"
      });
    if (value.length !== 66)
      throw new InvalidBytesLengthError({
        size: value.length,
        targetSize: 66,
        type: "hex"
      });
    acc[slot] = value;
    return acc;
  }, {});
}
function serializeAccountStateOverride(parameters) {
  const { balance, nonce, state, stateDiff, code } = parameters;
  const rpcAccountStateOverride = {};
  if (code !== void 0)
    rpcAccountStateOverride.code = code;
  if (balance !== void 0)
    rpcAccountStateOverride.balance = numberToHex(balance);
  if (nonce !== void 0)
    rpcAccountStateOverride.nonce = numberToHex(nonce);
  if (state !== void 0)
    rpcAccountStateOverride.state = serializeStateMapping(state);
  if (stateDiff !== void 0) {
    if (rpcAccountStateOverride.state)
      throw new StateAssignmentConflictError();
    rpcAccountStateOverride.stateDiff = serializeStateMapping(stateDiff);
  }
  return rpcAccountStateOverride;
}
function serializeStateOverride(parameters) {
  if (!parameters)
    return void 0;
  const rpcStateOverride = {};
  for (const { address, ...accountState } of parameters) {
    if (!isAddress(address, { strict: false }))
      throw new InvalidAddressError$1({ address });
    if (rpcStateOverride[address])
      throw new AccountStateConflictError({ address });
    rpcStateOverride[address] = serializeAccountStateOverride(accountState);
  }
  return rpcStateOverride;
}
function assertRequest(args) {
  const { account: account_, gasPrice, maxFeePerGas, maxPriorityFeePerGas, to } = args;
  const account = account_ ? parseAccount(account_) : void 0;
  if (account && !isAddress(account.address))
    throw new InvalidAddressError$1({ address: account.address });
  if (to && !isAddress(to))
    throw new InvalidAddressError$1({ address: to });
  if (typeof gasPrice !== "undefined" && (typeof maxFeePerGas !== "undefined" || typeof maxPriorityFeePerGas !== "undefined"))
    throw new FeeConflictError();
  if (maxFeePerGas && maxFeePerGas > maxUint256$1)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
class BaseFeeScalarError extends BaseError$2 {
  constructor() {
    super("`baseFeeMultiplier` must be greater than 1.", {
      name: "BaseFeeScalarError"
    });
  }
}
class Eip1559FeesNotSupportedError extends BaseError$2 {
  constructor() {
    super("Chain does not support EIP-1559 fees.", {
      name: "Eip1559FeesNotSupportedError"
    });
  }
}
class MaxFeePerGasTooLowError extends BaseError$2 {
  constructor({ maxPriorityFeePerGas }) {
    super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${formatGwei(maxPriorityFeePerGas)} gwei).`, { name: "MaxFeePerGasTooLowError" });
  }
}
class BlockNotFoundError extends BaseError$2 {
  constructor({ blockHash, blockNumber }) {
    let identifier = "Block";
    if (blockHash)
      identifier = `Block at hash "${blockHash}"`;
    if (blockNumber)
      identifier = `Block at number "${blockNumber}"`;
    super(`${identifier} could not be found.`, { name: "BlockNotFoundError" });
  }
}
async function getBlock(client, { blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest", includeTransactions: includeTransactions_ } = {}) {
  const includeTransactions = includeTransactions_ ?? false;
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  let block = null;
  if (blockHash) {
    block = await client.request({
      method: "eth_getBlockByHash",
      params: [blockHash, includeTransactions]
    }, { dedupe: true });
  } else {
    block = await client.request({
      method: "eth_getBlockByNumber",
      params: [blockNumberHex || blockTag, includeTransactions]
    }, { dedupe: Boolean(blockNumberHex) });
  }
  if (!block)
    throw new BlockNotFoundError({ blockHash, blockNumber });
  const format = client.chain?.formatters?.block?.format || formatBlock;
  return format(block, "getBlock");
}
async function getGasPrice(client) {
  const gasPrice = await client.request({
    method: "eth_gasPrice"
  });
  return BigInt(gasPrice);
}
async function estimateMaxPriorityFeePerGas(client, args) {
  return internal_estimateMaxPriorityFeePerGas(client, args);
}
async function internal_estimateMaxPriorityFeePerGas(client, args) {
  const { block: block_, chain = client.chain, request } = args || {};
  try {
    const maxPriorityFeePerGas = chain?.fees?.maxPriorityFeePerGas ?? chain?.fees?.defaultPriorityFee;
    if (typeof maxPriorityFeePerGas === "function") {
      const block = block_ || await getAction(client, getBlock, "getBlock")({});
      const maxPriorityFeePerGas_ = await maxPriorityFeePerGas({
        block,
        client,
        request
      });
      if (maxPriorityFeePerGas_ === null)
        throw new Error();
      return maxPriorityFeePerGas_;
    }
    if (typeof maxPriorityFeePerGas !== "undefined")
      return maxPriorityFeePerGas;
    const maxPriorityFeePerGasHex = await client.request({
      method: "eth_maxPriorityFeePerGas"
    });
    return hexToBigInt(maxPriorityFeePerGasHex);
  } catch {
    const [block, gasPrice] = await Promise.all([
      block_ ? Promise.resolve(block_) : getAction(client, getBlock, "getBlock")({}),
      getAction(client, getGasPrice, "getGasPrice")({})
    ]);
    if (typeof block.baseFeePerGas !== "bigint")
      throw new Eip1559FeesNotSupportedError();
    const maxPriorityFeePerGas = gasPrice - block.baseFeePerGas;
    if (maxPriorityFeePerGas < 0n)
      return 0n;
    return maxPriorityFeePerGas;
  }
}
async function estimateFeesPerGas(client, args) {
  return internal_estimateFeesPerGas(client, args);
}
async function internal_estimateFeesPerGas(client, args) {
  const { block: block_, chain = client.chain, request, type = "eip1559" } = args || {};
  const baseFeeMultiplier = await (async () => {
    if (typeof chain?.fees?.baseFeeMultiplier === "function")
      return chain.fees.baseFeeMultiplier({
        block: block_,
        client,
        request
      });
    return chain?.fees?.baseFeeMultiplier ?? 1.2;
  })();
  if (baseFeeMultiplier < 1)
    throw new BaseFeeScalarError();
  const decimals = baseFeeMultiplier.toString().split(".")[1]?.length ?? 0;
  const denominator = 10 ** decimals;
  const multiply = (base) => base * BigInt(Math.ceil(baseFeeMultiplier * denominator)) / BigInt(denominator);
  const block = block_ ? block_ : await getAction(client, getBlock, "getBlock")({});
  if (typeof chain?.fees?.estimateFeesPerGas === "function") {
    const fees = await chain.fees.estimateFeesPerGas({
      block: block_,
      client,
      multiply,
      request,
      type
    });
    if (fees !== null)
      return fees;
  }
  if (type === "eip1559") {
    if (typeof block.baseFeePerGas !== "bigint")
      throw new Eip1559FeesNotSupportedError();
    const maxPriorityFeePerGas = typeof request?.maxPriorityFeePerGas === "bigint" ? request.maxPriorityFeePerGas : await internal_estimateMaxPriorityFeePerGas(client, {
      block,
      chain,
      request
    });
    const baseFeePerGas = multiply(block.baseFeePerGas);
    const maxFeePerGas = request?.maxFeePerGas ?? baseFeePerGas + maxPriorityFeePerGas;
    return {
      maxFeePerGas,
      maxPriorityFeePerGas
    };
  }
  const gasPrice = request?.gasPrice ?? multiply(await getAction(client, getGasPrice, "getGasPrice")({}));
  return {
    gasPrice
  };
}
async function getTransactionCount(client, { address, blockTag = "latest", blockNumber }) {
  const count = await client.request({
    method: "eth_getTransactionCount",
    params: [
      address,
      typeof blockNumber === "bigint" ? numberToHex(blockNumber) : blockTag
    ]
  }, {
    dedupe: Boolean(blockNumber)
  });
  return hexToNumber$1(count);
}
function blobsToCommitments(parameters) {
  const { kzg } = parameters;
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes$1(x)) : parameters.blobs;
  const commitments = [];
  for (const blob of blobs)
    commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
  return to === "bytes" ? commitments : commitments.map((x) => bytesToHex$1(x));
}
function blobsToProofs(parameters) {
  const { kzg } = parameters;
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes$1(x)) : parameters.blobs;
  const commitments = typeof parameters.commitments[0] === "string" ? parameters.commitments.map((x) => hexToBytes$1(x)) : parameters.commitments;
  const proofs = [];
  for (let i = 0; i < blobs.length; i++) {
    const blob = blobs[i];
    const commitment = commitments[i];
    proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
  }
  return to === "bytes" ? proofs : proofs.map((x) => bytesToHex$1(x));
}
function commitmentToVersionedHash(parameters) {
  const { commitment, version: version2 = 1 } = parameters;
  const to = parameters.to ?? (typeof commitment === "string" ? "hex" : "bytes");
  const versionedHash = sha256(commitment, "bytes");
  versionedHash.set([version2], 0);
  return to === "bytes" ? versionedHash : bytesToHex$1(versionedHash);
}
function commitmentsToVersionedHashes(parameters) {
  const { commitments, version: version2 } = parameters;
  const to = parameters.to ?? (typeof commitments[0] === "string" ? "hex" : "bytes");
  const hashes = [];
  for (const commitment of commitments) {
    hashes.push(commitmentToVersionedHash({
      commitment,
      to,
      version: version2
    }));
  }
  return hashes;
}
const blobsPerTransaction = 6;
const bytesPerFieldElement = 32;
const fieldElementsPerBlob = 4096;
const bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
const maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
1 - // zero byte (0x00) appended to each field element.
1 * fieldElementsPerBlob * blobsPerTransaction;
const versionedHashVersionKzg = 1;
class BlobSizeTooLargeError extends BaseError$2 {
  constructor({ maxSize, size: size2 }) {
    super("Blob size is too large.", {
      metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size2} bytes`],
      name: "BlobSizeTooLargeError"
    });
  }
}
class EmptyBlobError extends BaseError$2 {
  constructor() {
    super("Blob data must not be empty.", { name: "EmptyBlobError" });
  }
}
class InvalidVersionedHashSizeError extends BaseError$2 {
  constructor({ hash: hash2, size: size2 }) {
    super(`Versioned hash "${hash2}" size is invalid.`, {
      metaMessages: ["Expected: 32", `Received: ${size2}`],
      name: "InvalidVersionedHashSizeError"
    });
  }
}
class InvalidVersionedHashVersionError extends BaseError$2 {
  constructor({ hash: hash2, version: version2 }) {
    super(`Versioned hash "${hash2}" version is invalid.`, {
      metaMessages: [
        `Expected: ${versionedHashVersionKzg}`,
        `Received: ${version2}`
      ],
      name: "InvalidVersionedHashVersionError"
    });
  }
}
function toBlobs(parameters) {
  const to = parameters.to ?? (typeof parameters.data === "string" ? "hex" : "bytes");
  const data = typeof parameters.data === "string" ? hexToBytes$1(parameters.data) : parameters.data;
  const size_ = size$3(data);
  if (!size_)
    throw new EmptyBlobError();
  if (size_ > maxBytesPerTransaction)
    throw new BlobSizeTooLargeError({
      maxSize: maxBytesPerTransaction,
      size: size_
    });
  const blobs = [];
  let active = true;
  let position = 0;
  while (active) {
    const blob = createCursor(new Uint8Array(bytesPerBlob));
    let size2 = 0;
    while (size2 < fieldElementsPerBlob) {
      const bytes = data.slice(position, position + (bytesPerFieldElement - 1));
      blob.pushByte(0);
      blob.pushBytes(bytes);
      if (bytes.length < 31) {
        blob.pushByte(128);
        active = false;
        break;
      }
      size2++;
      position += 31;
    }
    blobs.push(blob);
  }
  return to === "bytes" ? blobs.map((x) => x.bytes) : blobs.map((x) => bytesToHex$1(x.bytes));
}
function toBlobSidecars(parameters) {
  const { data, kzg, to } = parameters;
  const blobs = parameters.blobs ?? toBlobs({ data, to });
  const commitments = parameters.commitments ?? blobsToCommitments({ blobs, kzg, to });
  const proofs = parameters.proofs ?? blobsToProofs({ blobs, commitments, kzg, to });
  const sidecars = [];
  for (let i = 0; i < blobs.length; i++)
    sidecars.push({
      blob: blobs[i],
      commitment: commitments[i],
      proof: proofs[i]
    });
  return sidecars;
}
function getTransactionType(transaction) {
  if (transaction.type)
    return transaction.type;
  if (typeof transaction.authorizationList !== "undefined")
    return "eip7702";
  if (typeof transaction.blobs !== "undefined" || typeof transaction.blobVersionedHashes !== "undefined" || typeof transaction.maxFeePerBlobGas !== "undefined" || typeof transaction.sidecars !== "undefined")
    return "eip4844";
  if (typeof transaction.maxFeePerGas !== "undefined" || typeof transaction.maxPriorityFeePerGas !== "undefined") {
    return "eip1559";
  }
  if (typeof transaction.gasPrice !== "undefined") {
    if (typeof transaction.accessList !== "undefined")
      return "eip2930";
    return "legacy";
  }
  throw new InvalidSerializableTransactionError({ transaction });
}
async function getChainId(client) {
  const chainIdHex = await client.request({
    method: "eth_chainId"
  }, { dedupe: true });
  return hexToNumber$1(chainIdHex);
}
const defaultParameters = [
  "blobVersionedHashes",
  "chainId",
  "fees",
  "gas",
  "nonce",
  "type"
];
const eip1559NetworkCache = /* @__PURE__ */ new Map();
async function prepareTransactionRequest(client, args) {
  const { account: account_ = client.account, blobs, chain, gas, kzg, nonce, nonceManager: nonceManager2, parameters = defaultParameters, type } = args;
  const account = account_ ? parseAccount(account_) : account_;
  const request = { ...args, ...account ? { from: account?.address } : {} };
  let block;
  async function getBlock$1() {
    if (block)
      return block;
    block = await getAction(client, getBlock, "getBlock")({ blockTag: "latest" });
    return block;
  }
  let chainId;
  async function getChainId$1() {
    if (chainId)
      return chainId;
    if (chain)
      return chain.id;
    if (typeof args.chainId !== "undefined")
      return args.chainId;
    const chainId_ = await getAction(client, getChainId, "getChainId")({});
    chainId = chainId_;
    return chainId;
  }
  if (parameters.includes("nonce") && typeof nonce === "undefined" && account) {
    if (nonceManager2) {
      const chainId2 = await getChainId$1();
      request.nonce = await nonceManager2.consume({
        address: account.address,
        chainId: chainId2,
        client
      });
    } else {
      request.nonce = await getAction(client, getTransactionCount, "getTransactionCount")({
        address: account.address,
        blockTag: "pending"
      });
    }
  }
  if ((parameters.includes("blobVersionedHashes") || parameters.includes("sidecars")) && blobs && kzg) {
    const commitments = blobsToCommitments({ blobs, kzg });
    if (parameters.includes("blobVersionedHashes")) {
      const versionedHashes = commitmentsToVersionedHashes({
        commitments,
        to: "hex"
      });
      request.blobVersionedHashes = versionedHashes;
    }
    if (parameters.includes("sidecars")) {
      const proofs = blobsToProofs({ blobs, commitments, kzg });
      const sidecars = toBlobSidecars({
        blobs,
        commitments,
        proofs,
        to: "hex"
      });
      request.sidecars = sidecars;
    }
  }
  if (parameters.includes("chainId"))
    request.chainId = await getChainId$1();
  if ((parameters.includes("fees") || parameters.includes("type")) && typeof type === "undefined") {
    try {
      request.type = getTransactionType(request);
    } catch {
      let isEip1559Network = eip1559NetworkCache.get(client.uid);
      if (typeof isEip1559Network === "undefined") {
        const block2 = await getBlock$1();
        isEip1559Network = typeof block2?.baseFeePerGas === "bigint";
        eip1559NetworkCache.set(client.uid, isEip1559Network);
      }
      request.type = isEip1559Network ? "eip1559" : "legacy";
    }
  }
  if (parameters.includes("fees")) {
    if (request.type !== "legacy" && request.type !== "eip2930") {
      if (typeof request.maxFeePerGas === "undefined" || typeof request.maxPriorityFeePerGas === "undefined") {
        const block2 = await getBlock$1();
        const { maxFeePerGas, maxPriorityFeePerGas } = await internal_estimateFeesPerGas(client, {
          block: block2,
          chain,
          request
        });
        if (typeof args.maxPriorityFeePerGas === "undefined" && args.maxFeePerGas && args.maxFeePerGas < maxPriorityFeePerGas)
          throw new MaxFeePerGasTooLowError({
            maxPriorityFeePerGas
          });
        request.maxPriorityFeePerGas = maxPriorityFeePerGas;
        request.maxFeePerGas = maxFeePerGas;
      }
    } else {
      if (typeof args.maxFeePerGas !== "undefined" || typeof args.maxPriorityFeePerGas !== "undefined")
        throw new Eip1559FeesNotSupportedError();
      if (typeof args.gasPrice === "undefined") {
        const block2 = await getBlock$1();
        const { gasPrice: gasPrice_ } = await internal_estimateFeesPerGas(client, {
          block: block2,
          chain,
          request,
          type: "legacy"
        });
        request.gasPrice = gasPrice_;
      }
    }
  }
  if (parameters.includes("gas") && typeof gas === "undefined")
    request.gas = await getAction(client, estimateGas, "estimateGas")({
      ...request,
      account,
      prepare: account?.type === "local" ? [] : ["blobVersionedHashes"]
    });
  assertRequest(request);
  delete request.parameters;
  return request;
}
async function estimateGas(client, args) {
  const { account: account_ = client.account, prepare = true } = args;
  const account = account_ ? parseAccount(account_) : void 0;
  const parameters = (() => {
    if (Array.isArray(prepare))
      return prepare;
    if (account?.type !== "local")
      return ["blobVersionedHashes"];
    return void 0;
  })();
  try {
    const { accessList, authorizationList, blobs, blobVersionedHashes, blockNumber, blockTag, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, value, stateOverride, ...rest } = prepare ? await prepareTransactionRequest(client, {
      ...args,
      parameters
    }) : args;
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const rpcStateOverride = serializeStateOverride(stateOverride);
    const to = await (async () => {
      if (rest.to)
        return rest.to;
      if (authorizationList && authorizationList.length > 0)
        return await recoverAuthorizationAddress({
          authorization: authorizationList[0]
        }).catch(() => {
          throw new BaseError$2("`to` is required. Could not infer from `authorizationList`");
        });
      return void 0;
    })();
    assertRequest(args);
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request = format({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract$1(rest, { format: chainFormat }),
      account,
      accessList,
      authorizationList,
      blobs,
      blobVersionedHashes,
      data,
      gas,
      gasPrice,
      maxFeePerBlobGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      value
    }, "estimateGas");
    return BigInt(await client.request({
      method: "eth_estimateGas",
      params: rpcStateOverride ? [
        request,
        block ?? client.experimental_blockTag ?? "latest",
        rpcStateOverride
      ] : block ? [request, block] : [request]
    }));
  } catch (err) {
    throw getEstimateGasError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}
async function estimateContractGas(client, parameters) {
  const { abi: abi2, address, args, functionName, dataSuffix, ...request } = parameters;
  const data = encodeFunctionData({
    abi: abi2,
    args,
    functionName
  });
  try {
    const gas = await getAction(client, estimateGas, "estimateGas")({
      data: `${data}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
      to: address,
      ...request
    });
    return gas;
  } catch (error) {
    const account = request.account ? parseAccount(request.account) : void 0;
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/estimateContractGas",
      functionName,
      sender: account?.address
    });
  }
}
async function getLogs(client, { address, blockHash, fromBlock, toBlock, event, events: events_, args, strict: strict_ } = {}) {
  const strict = strict_ ?? false;
  const events = events_ ?? (event ? [event] : void 0);
  let topics = [];
  if (events) {
    const encoded = events.flatMap((event2) => encodeEventTopics({
      abi: [event2],
      eventName: event2.name,
      args: events_ ? void 0 : args
    }));
    topics = [encoded];
    if (event)
      topics = topics[0];
  }
  let logs;
  if (blockHash) {
    logs = await client.request({
      method: "eth_getLogs",
      params: [{ address, topics, blockHash }]
    });
  } else {
    logs = await client.request({
      method: "eth_getLogs",
      params: [
        {
          address,
          topics,
          fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
          toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock
        }
      ]
    });
  }
  const formattedLogs = logs.map((log) => formatLog(log));
  if (!events)
    return formattedLogs;
  return parseEventLogs({
    abi: events,
    args,
    logs: formattedLogs,
    strict
  });
}
async function getContractEvents(client, parameters) {
  const { abi: abi2, address, args, blockHash, eventName, fromBlock, toBlock, strict } = parameters;
  const event = eventName ? getAbiItem({ abi: abi2, name: eventName }) : void 0;
  const events = !event ? abi2.filter((x) => x.type === "event") : void 0;
  return getAction(client, getLogs, "getLogs")({
    address,
    args,
    blockHash,
    event,
    events,
    fromBlock,
    toBlock,
    strict
  });
}
const docsPath$3 = "/docs/contract/decodeFunctionResult";
function decodeFunctionResult(parameters) {
  const { abi: abi2, args, functionName, data } = parameters;
  let abiItem = abi2[0];
  if (functionName) {
    const item = getAbiItem({ abi: abi2, args, name: functionName });
    if (!item)
      throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath$3 });
    abiItem = item;
  }
  if (abiItem.type !== "function")
    throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath$3 });
  if (!abiItem.outputs)
    throw new AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath: docsPath$3 });
  const values = decodeAbiParameters(abiItem.outputs, data);
  if (values && values.length > 1)
    return values;
  if (values && values.length === 1)
    return values[0];
  return void 0;
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$4 = /* @__PURE__ */ BigInt(0);
const _1n$4 = /* @__PURE__ */ BigInt(1);
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes(item) {
  if (!isBytes(item))
    throw new Error("Uint8Array expected");
}
function abool(title, value) {
  if (typeof value !== "boolean")
    throw new Error(title + " boolean expected, got " + value);
}
function numberToHexUnpadded(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? "0" + hex : hex;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n$4 : BigInt("0x" + hex);
}
const hasHexBuiltin = (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
);
const hexes$1 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes) {
  abytes(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes$1[bytes[i]];
  }
  return hex;
}
const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9)
    return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F)
    return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f)
    return ch - (asciis.a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin)
    return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}
function bytesToNumberBE(bytes) {
  return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
  abytes(bytes);
  return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n, len) {
  return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
    }
  } else if (isBytes(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad2 = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad2);
    pad2 += a.length;
  }
  return res;
}
const isPosBig = (n) => typeof n === "bigint" && _0n$4 <= n;
function inRange(n, min, max) {
  return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
function aInRange(title, n, min, max) {
  if (!inRange(n, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
}
function bitLen(n) {
  let len;
  for (len = 0; n > _0n$4; n >>= _1n$4, len += 1)
    ;
  return len;
}
const bitMask = (n) => (_1n$4 << BigInt(n)) - _1n$4;
const u8n = (len) => new Uint8Array(len);
const u8fr = (arr) => Uint8Array.from(arr);
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  let v = u8n(hashLen);
  let k = u8n(hashLen);
  let i = 0;
  const reset = () => {
    v.fill(1);
    k.fill(0);
    i = 0;
  };
  const h = (...b) => hmacFn(k, v, ...b);
  const reseed = (seed = u8n(0)) => {
    k = h(u8fr([0]), seed);
    v = h();
    if (seed.length === 0)
      return;
    k = h(u8fr([1]), seed);
    v = h();
  };
  const gen = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v = h();
      const sl = v.slice();
      out.push(sl);
      len += v.length;
    }
    return concatBytes(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
const validatorFns = {
  bigint: (val) => typeof val === "bigint",
  function: (val) => typeof val === "function",
  boolean: (val) => typeof val === "boolean",
  string: (val) => typeof val === "string",
  stringOrUint8Array: (val) => typeof val === "string" || isBytes(val),
  isSafeInteger: (val) => Number.isSafeInteger(val),
  array: (val) => Array.isArray(val),
  field: (val, object) => object.Fp.isValid(val),
  hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
};
function validateObject(object, validators, optValidators = {}) {
  const checkField = (fieldName, type, isOptional) => {
    const checkVal = validatorFns[type];
    if (typeof checkVal !== "function")
      throw new Error("invalid validator function");
    const val = object[fieldName];
    if (isOptional && val === void 0)
      return;
    if (!checkVal(val, object)) {
      throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
    }
  };
  for (const [fieldName, type] of Object.entries(validators))
    checkField(fieldName, type, false);
  for (const [fieldName, type] of Object.entries(optValidators))
    checkField(fieldName, type, true);
  return object;
}
function memoized(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}
const version = "0.1.1";
function getVersion() {
  return version;
}
class BaseError2 extends Error {
  constructor(shortMessage, options = {}) {
    const details = (() => {
      if (options.cause instanceof BaseError2) {
        if (options.cause.details)
          return options.cause.details;
        if (options.cause.shortMessage)
          return options.cause.shortMessage;
      }
      if (options.cause && "details" in options.cause && typeof options.cause.details === "string")
        return options.cause.details;
      if (options.cause?.message)
        return options.cause.message;
      return options.details;
    })();
    const docsPath2 = (() => {
      if (options.cause instanceof BaseError2)
        return options.cause.docsPath || options.docsPath;
      return options.docsPath;
    })();
    const docsBaseUrl = "https://oxlib.sh";
    const docs = `${docsBaseUrl}${docsPath2 ?? ""}`;
    const message = [
      shortMessage || "An error occurred.",
      ...options.metaMessages ? ["", ...options.metaMessages] : [],
      ...details || docsPath2 ? [
        "",
        details ? `Details: ${details}` : void 0,
        docsPath2 ? `See: ${docs}` : void 0
      ] : []
    ].filter((x) => typeof x === "string").join("\n");
    super(message, options.cause ? { cause: options.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docs", {
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
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: `ox@${getVersion()}`
    });
    this.cause = options.cause;
    this.details = details;
    this.docs = docs;
    this.docsPath = docsPath2;
    this.shortMessage = shortMessage;
  }
  walk(fn) {
    return walk(this, fn);
  }
}
function walk(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk(err.cause, fn);
  return fn ? null : err;
}
function assertSize$1(bytes, size_) {
  if (size$2(bytes) > size_)
    throw new SizeOverflowError$1({
      givenSize: size$2(bytes),
      maxSize: size_
    });
}
const charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function pad$1(bytes, options = {}) {
  const { dir, size: size2 = 32 } = options;
  if (size2 === 0)
    return bytes;
  if (bytes.length > size2)
    throw new SizeExceedsPaddingSizeError$1({
      size: bytes.length,
      targetSize: size2,
      type: "Bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i = 0; i < size2; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size2 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}
function trim$1(value, options = {}) {
  const { dir = "left" } = options;
  let data = value;
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  return data;
}
function assertSize(hex, size_) {
  if (size$1(hex) > size_)
    throw new SizeOverflowError2({
      givenSize: size$1(hex),
      maxSize: size_
    });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size$1(value) - 1)
    throw new SliceOffsetOutOfBoundsError({
      offset: start,
      position: "start",
      size: size$1(value)
    });
}
function assertEndOffset(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size$1(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError({
      offset: end,
      position: "end",
      size: size$1(value)
    });
  }
}
function pad(hex_, options = {}) {
  const { dir, size: size2 = 32 } = options;
  if (size2 === 0)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError2({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "Hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function trim(value, options = {}) {
  const { dir = "left" } = options;
  let data = value.replace("0x", "");
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (data === "0")
    return "0x";
  if (dir === "right" && data.length % 2 === 1)
    return `0x${data}0`;
  return `0x${data}`;
}
const bigIntSuffix = "#__bigint";
function stringify(value, replacer, space) {
  return JSON.stringify(value, (key, value2) => {
    if (typeof value2 === "bigint")
      return value2.toString() + bigIntSuffix;
    return value2;
  }, space);
}
const decoder = /* @__PURE__ */ new TextDecoder();
const encoder$1 = /* @__PURE__ */ new TextEncoder();
function assert$6(value) {
  if (value instanceof Uint8Array)
    return;
  if (!value)
    throw new InvalidBytesTypeError(value);
  if (typeof value !== "object")
    throw new InvalidBytesTypeError(value);
  if (!("BYTES_PER_ELEMENT" in value))
    throw new InvalidBytesTypeError(value);
  if (value.BYTES_PER_ELEMENT !== 1 || value.constructor.name !== "Uint8Array")
    throw new InvalidBytesTypeError(value);
}
function from$a(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex$3(value);
  return fromArray(value);
}
function fromArray(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromHex$3(value, options = {}) {
  const { size: size2 } = options;
  let hex = value;
  if (size2) {
    assertSize(value, size2);
    hex = padRight(value, size2);
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index2 = 0, j = 0; index2 < length; index2++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError2(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index2] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function fromString$1(value, options = {}) {
  const { size: size2 } = options;
  const bytes = encoder$1.encode(value);
  if (typeof size2 === "number") {
    assertSize$1(bytes, size2);
    return padRight$1(bytes, size2);
  }
  return bytes;
}
function padRight$1(value, size2) {
  return pad$1(value, { dir: "right", size: size2 });
}
function size$2(value) {
  return value.length;
}
function slice$1(value, start, end, options = {}) {
  const { strict } = options;
  const value_ = value.slice(start, end);
  return value_;
}
function toBigInt$1(bytes, options = {}) {
  const { size: size2 } = options;
  if (typeof size2 !== "undefined")
    assertSize$1(bytes, size2);
  const hex = fromBytes$2(bytes, options);
  return toBigInt(hex, options);
}
function toBoolean(bytes, options = {}) {
  const { size: size2 } = options;
  let bytes_ = bytes;
  if (typeof size2 !== "undefined") {
    assertSize$1(bytes_, size2);
    bytes_ = trimLeft$1(bytes_);
  }
  if (bytes_.length > 1 || bytes_[0] > 1)
    throw new InvalidBytesBooleanError(bytes_);
  return Boolean(bytes_[0]);
}
function toNumber$1(bytes, options = {}) {
  const { size: size2 } = options;
  if (typeof size2 !== "undefined")
    assertSize$1(bytes, size2);
  const hex = fromBytes$2(bytes, options);
  return toNumber(hex, options);
}
function toString(bytes, options = {}) {
  const { size: size2 } = options;
  let bytes_ = bytes;
  if (typeof size2 !== "undefined") {
    assertSize$1(bytes_, size2);
    bytes_ = trimRight(bytes_);
  }
  return decoder.decode(bytes_);
}
function trimLeft$1(value) {
  return trim$1(value, { dir: "left" });
}
function trimRight(value) {
  return trim$1(value, { dir: "right" });
}
function validate$4(value) {
  try {
    assert$6(value);
    return true;
  } catch {
    return false;
  }
}
class InvalidBytesBooleanError extends BaseError2 {
  constructor(bytes) {
    super(`Bytes value \`${bytes}\` is not a valid boolean.`, {
      metaMessages: [
        "The bytes array must contain a single byte of either a `0` or `1` value."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.InvalidBytesBooleanError"
    });
  }
}
class InvalidBytesTypeError extends BaseError2 {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify(value) : value}\` of type \`${typeof value}\` is an invalid Bytes value.`, {
      metaMessages: ["Bytes values must be of type `Bytes`."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.InvalidBytesTypeError"
    });
  }
}
let SizeOverflowError$1 = class SizeOverflowError extends BaseError2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeOverflowError"
    });
  }
};
let SizeExceedsPaddingSizeError$1 = class SizeExceedsPaddingSizeError extends BaseError2 {
  constructor({ size: size2, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size2}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeExceedsPaddingSizeError"
    });
  }
};
const encoder = /* @__PURE__ */ new TextEncoder();
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
function assert$5(value, options = {}) {
  const { strict = false } = options;
  if (!value)
    throw new InvalidHexTypeError(value);
  if (typeof value !== "string")
    throw new InvalidHexTypeError(value);
  if (strict) {
    if (!/^0x[0-9a-fA-F]*$/.test(value))
      throw new InvalidHexValueError(value);
  }
  if (!value.startsWith("0x"))
    throw new InvalidHexValueError(value);
}
function concat(...values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
function from$9(value) {
  if (value instanceof Uint8Array)
    return fromBytes$2(value);
  if (Array.isArray(value))
    return fromBytes$2(new Uint8Array(value));
  return value;
}
function fromBoolean(value, options = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof options.size === "number") {
    assertSize(hex, options.size);
    return padLeft(hex, options.size);
  }
  return hex;
}
function fromBytes$2(value, options = {}) {
  let string = "";
  for (let i = 0; i < value.length; i++)
    string += hexes[value[i]];
  const hex = `0x${string}`;
  if (typeof options.size === "number") {
    assertSize(hex, options.size);
    return padRight(hex, options.size);
  }
  return hex;
}
function fromNumber(value, options = {}) {
  const { signed, size: size2 } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value_) : value_).toString(16);
  const hex = `0x${stringValue}`;
  if (size2)
    return padLeft(hex, size2);
  return hex;
}
function fromString(value, options = {}) {
  return fromBytes$2(encoder.encode(value), options);
}
function padLeft(value, size2) {
  return pad(value, { dir: "left", size: size2 });
}
function padRight(value, size2) {
  return pad(value, { dir: "right", size: size2 });
}
function slice(value, start, end, options = {}) {
  const { strict } = options;
  assertStartOffset(value, start);
  const value_ = `0x${value.replace("0x", "").slice((start ?? 0) * 2, (end ?? value.length) * 2)}`;
  if (strict)
    assertEndOffset(value_, start, end);
  return value_;
}
function size$1(value) {
  return Math.ceil((value.length - 2) / 2);
}
function trimLeft(value) {
  return trim(value, { dir: "left" });
}
function toBigInt(hex, options = {}) {
  const { signed } = options;
  if (options.size)
    assertSize(hex, options.size);
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size2 = (hex.length - 2) / 2;
  const max_unsigned = (1n << BigInt(size2) * 8n) - 1n;
  const max_signed = max_unsigned >> 1n;
  if (value <= max_signed)
    return value;
  return value - max_unsigned - 1n;
}
function toNumber(hex, options = {}) {
  const { signed, size: size2 } = options;
  if (!signed && !size2)
    return Number(hex);
  return Number(toBigInt(hex, options));
}
function validate$3(value, options = {}) {
  const { strict = false } = options;
  try {
    assert$5(value, { strict });
    return true;
  } catch {
    return false;
  }
}
class IntegerOutOfRangeError extends BaseError2 {
  constructor({ max, min, signed, size: size2, value }) {
    super(`Number \`${value}\` is not in safe${size2 ? ` ${size2 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
}
class InvalidHexTypeError extends BaseError2 {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify(value) : value}\` of type \`${typeof value}\` is an invalid hex type.`, {
      metaMessages: ['Hex types must be represented as `"0x${string}"`.']
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexTypeError"
    });
  }
}
class InvalidHexValueError extends BaseError2 {
  constructor(value) {
    super(`Value \`${value}\` is an invalid hex value.`, {
      metaMessages: [
        'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexValueError"
    });
  }
}
class SizeOverflowError2 extends BaseError2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeOverflowError"
    });
  }
}
class SliceOffsetOutOfBoundsError extends BaseError2 {
  constructor({ offset, position, size: size2 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size2}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SliceOffsetOutOfBoundsError"
    });
  }
}
class SizeExceedsPaddingSizeError2 extends BaseError2 {
  constructor({ size: size2, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size2}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
}
function toRpc$1(withdrawal) {
  return {
    address: withdrawal.address,
    amount: fromNumber(withdrawal.amount),
    index: fromNumber(withdrawal.index),
    validatorIndex: fromNumber(withdrawal.validatorIndex)
  };
}
function toRpc(blockOverrides) {
  return {
    ...typeof blockOverrides.baseFeePerGas === "bigint" && {
      baseFeePerGas: fromNumber(blockOverrides.baseFeePerGas)
    },
    ...typeof blockOverrides.blobBaseFee === "bigint" && {
      blobBaseFee: fromNumber(blockOverrides.blobBaseFee)
    },
    ...typeof blockOverrides.feeRecipient === "string" && {
      feeRecipient: blockOverrides.feeRecipient
    },
    ...typeof blockOverrides.gasLimit === "bigint" && {
      gasLimit: fromNumber(blockOverrides.gasLimit)
    },
    ...typeof blockOverrides.number === "bigint" && {
      number: fromNumber(blockOverrides.number)
    },
    ...typeof blockOverrides.prevRandao === "bigint" && {
      prevRandao: fromNumber(blockOverrides.prevRandao)
    },
    ...typeof blockOverrides.time === "bigint" && {
      time: fromNumber(blockOverrides.time)
    },
    ...blockOverrides.withdrawals && {
      withdrawals: blockOverrides.withdrawals.map(toRpc$1)
    }
  };
}
const multicall3Abi = [
  {
    inputs: [
      {
        components: [
          {
            name: "target",
            type: "address"
          },
          {
            name: "allowFailure",
            type: "bool"
          },
          {
            name: "callData",
            type: "bytes"
          }
        ],
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "aggregate3",
    outputs: [
      {
        components: [
          {
            name: "success",
            type: "bool"
          },
          {
            name: "returnData",
            type: "bytes"
          }
        ],
        name: "returnData",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
const batchGatewayAbi = [
  {
    name: "query",
    type: "function",
    stateMutability: "view",
    inputs: [
      {
        type: "tuple[]",
        name: "queries",
        components: [
          {
            type: "address",
            name: "sender"
          },
          {
            type: "string[]",
            name: "urls"
          },
          {
            type: "bytes",
            name: "data"
          }
        ]
      }
    ],
    outputs: [
      {
        type: "bool[]",
        name: "failures"
      },
      {
        type: "bytes[]",
        name: "responses"
      }
    ]
  },
  {
    name: "HttpError",
    type: "error",
    inputs: [
      {
        type: "uint16",
        name: "status"
      },
      {
        type: "string",
        name: "message"
      }
    ]
  }
];
const universalResolverErrors = [
  {
    inputs: [
      {
        name: "dns",
        type: "bytes"
      }
    ],
    name: "DNSDecodingFailed",
    type: "error"
  },
  {
    inputs: [
      {
        name: "ens",
        type: "string"
      }
    ],
    name: "DNSEncodingFailed",
    type: "error"
  },
  {
    inputs: [],
    name: "EmptyAddress",
    type: "error"
  },
  {
    inputs: [
      {
        name: "status",
        type: "uint16"
      },
      {
        name: "message",
        type: "string"
      }
    ],
    name: "HttpError",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidBatchGatewayResponse",
    type: "error"
  },
  {
    inputs: [
      {
        name: "errorData",
        type: "bytes"
      }
    ],
    name: "ResolverError",
    type: "error"
  },
  {
    inputs: [
      {
        name: "name",
        type: "bytes"
      },
      {
        name: "resolver",
        type: "address"
      }
    ],
    name: "ResolverNotContract",
    type: "error"
  },
  {
    inputs: [
      {
        name: "name",
        type: "bytes"
      }
    ],
    name: "ResolverNotFound",
    type: "error"
  },
  {
    inputs: [
      {
        name: "primary",
        type: "string"
      },
      {
        name: "primaryAddress",
        type: "bytes"
      }
    ],
    name: "ReverseAddressMismatch",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "selector",
        type: "bytes4"
      }
    ],
    name: "UnsupportedResolverProfile",
    type: "error"
  }
];
const universalResolverResolveAbi = [
  ...universalResolverErrors,
  {
    name: "resolveWithGateways",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "name", type: "bytes" },
      { name: "data", type: "bytes" },
      { name: "gateways", type: "string[]" }
    ],
    outputs: [
      { name: "", type: "bytes" },
      { name: "address", type: "address" }
    ]
  }
];
const universalResolverReverseAbi = [
  ...universalResolverErrors,
  {
    name: "reverseWithGateways",
    type: "function",
    stateMutability: "view",
    inputs: [
      { type: "bytes", name: "reverseName" },
      { type: "uint256", name: "coinType" },
      { type: "string[]", name: "gateways" }
    ],
    outputs: [
      { type: "string", name: "resolvedName" },
      { type: "address", name: "resolver" },
      { type: "address", name: "reverseResolver" }
    ]
  }
];
const textResolverAbi = [
  {
    name: "text",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "name", type: "bytes32" },
      { name: "key", type: "string" }
    ],
    outputs: [{ name: "", type: "string" }]
  }
];
const addressResolverAbi = [
  {
    name: "addr",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "name", type: "bytes32" }],
    outputs: [{ name: "", type: "address" }]
  },
  {
    name: "addr",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "name", type: "bytes32" },
      { name: "coinType", type: "uint256" }
    ],
    outputs: [{ name: "", type: "bytes" }]
  }
];
const erc1271Abi = [
  {
    name: "isValidSignature",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "hash", type: "bytes32" },
      { name: "signature", type: "bytes" }
    ],
    outputs: [{ name: "", type: "bytes4" }]
  }
];
const erc6492SignatureValidatorAbi = [
  {
    inputs: [
      {
        name: "_signer",
        type: "address"
      },
      {
        name: "_hash",
        type: "bytes32"
      },
      {
        name: "_signature",
        type: "bytes"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [
      {
        name: "_signer",
        type: "address"
      },
      {
        name: "_hash",
        type: "bytes32"
      },
      {
        name: "_signature",
        type: "bytes"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "isValidSig"
  }
];
const erc20Abi = [
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ]
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint8"
      }
    ]
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  }
];
const erc20Abi_bytes32 = [
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ]
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint8"
      }
    ]
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "bytes32"
      }
    ]
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "bytes32"
      }
    ]
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  }
];
const erc1155Abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "ERC1155InsufficientBalance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address"
      }
    ],
    name: "ERC1155InvalidApprover",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idsLength",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "valuesLength",
        type: "uint256"
      }
    ],
    name: "ERC1155InvalidArrayLength",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      }
    ],
    name: "ERC1155InvalidOperator",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      }
    ],
    name: "ERC1155InvalidReceiver",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "ERC1155InvalidSender",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "ERC1155MissingApprovalForAll",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]"
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]"
      }
    ],
    name: "TransferBatch",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "TransferSingle",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "URI",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]"
      }
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "address",
        name: "operator",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]"
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
const erc721Abi = [
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: true,
        name: "tokenId",
        type: "uint256"
      }
    ]
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        name: "approved",
        type: "bool"
      }
    ]
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        name: "tokenId",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "payable",
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "getApproved",
    stateMutability: "view",
    inputs: [
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "address"
      }
    ]
  },
  {
    type: "function",
    name: "isApprovedForAll",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "operator",
        type: "address"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "ownerOf",
    stateMutability: "view",
    inputs: [
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "owner",
        type: "address"
      }
    ]
  },
  {
    type: "function",
    name: "safeTransferFrom",
    stateMutability: "payable",
    inputs: [
      {
        name: "from",
        type: "address"
      },
      {
        name: "to",
        type: "address"
      },
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "safeTransferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "from",
        type: "address"
      },
      {
        name: "to",
        type: "address"
      },
      {
        name: "id",
        type: "uint256"
      },
      {
        name: "data",
        type: "bytes"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "setApprovalForAll",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "operator",
        type: "address"
      },
      {
        name: "approved",
        type: "bool"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "tokenByIndex",
    stateMutability: "view",
    inputs: [
      {
        name: "index",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "tokenByIndex",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "index",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "tokenId",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "tokenURI",
    stateMutability: "view",
    inputs: [
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "payable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: []
  }
];
const erc4626Abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        name: "receiver",
        type: "address"
      },
      {
        indexed: false,
        name: "assets",
        type: "uint256"
      },
      {
        indexed: false,
        name: "shares",
        type: "uint256"
      }
    ],
    name: "Deposit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        name: "receiver",
        type: "address"
      },
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: false,
        name: "assets",
        type: "uint256"
      },
      {
        indexed: false,
        name: "shares",
        type: "uint256"
      }
    ],
    name: "Withdraw",
    type: "event"
  },
  {
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "asset",
    outputs: [
      {
        name: "assetTokenAddress",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    name: "convertToAssets",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    name: "convertToShares",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      },
      {
        name: "receiver",
        type: "address"
      }
    ],
    name: "deposit",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "caller",
        type: "address"
      }
    ],
    name: "maxDeposit",
    outputs: [
      {
        name: "maxAssets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "caller",
        type: "address"
      }
    ],
    name: "maxMint",
    outputs: [
      {
        name: "maxShares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "maxRedeem",
    outputs: [
      {
        name: "maxShares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "maxWithdraw",
    outputs: [
      {
        name: "maxAssets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      },
      {
        name: "receiver",
        type: "address"
      }
    ],
    name: "mint",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    name: "previewDeposit",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    name: "previewMint",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    name: "previewRedeem",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    name: "previewWithdraw",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      },
      {
        name: "receiver",
        type: "address"
      },
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "redeem",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "totalAssets",
    outputs: [
      {
        name: "totalManagedAssets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "to",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "from",
        type: "address"
      },
      {
        name: "to",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      },
      {
        name: "receiver",
        type: "address"
      },
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "withdraw",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const aggregate3Signature = "0x82ad56cb";
const deploylessCallViaBytecodeBytecode = "0x608060405234801561001057600080fd5b5060405161018e38038061018e83398101604081905261002f91610124565b6000808351602085016000f59050803b61004857600080fd5b6000808351602085016000855af16040513d6000823e81610067573d81fd5b3d81f35b634e487b7160e01b600052604160045260246000fd5b600082601f83011261009257600080fd5b81516001600160401b038111156100ab576100ab61006b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d9576100d961006b565b6040528181528382016020018510156100f157600080fd5b60005b82811015610110576020818601810151838301820152016100f4565b506000918101602001919091529392505050565b6000806040838503121561013757600080fd5b82516001600160401b0381111561014d57600080fd5b61015985828601610081565b602085015190935090506001600160401b0381111561017757600080fd5b61018385828601610081565b915050925092905056fe";
const deploylessCallViaFactoryBytecode = "0x608060405234801561001057600080fd5b506040516102c03803806102c083398101604081905261002f916101e6565b836001600160a01b03163b6000036100e457600080836001600160a01b03168360405161005c9190610270565b6000604051808303816000865af19150503d8060008114610099576040519150601f19603f3d011682016040523d82523d6000602084013e61009e565b606091505b50915091508115806100b857506001600160a01b0386163b155b156100e1578060405163101bb98d60e01b81526004016100d8919061028c565b60405180910390fd5b50505b6000808451602086016000885af16040513d6000823e81610103573d81fd5b3d81f35b80516001600160a01b038116811461011e57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561015457818101518382015260200161013c565b50506000910152565b600082601f83011261016e57600080fd5b81516001600160401b0381111561018757610187610123565b604051601f8201601f19908116603f011681016001600160401b03811182821017156101b5576101b5610123565b6040528181528382016020018510156101cd57600080fd5b6101de826020830160208701610139565b949350505050565b600080600080608085870312156101fc57600080fd5b61020585610107565b60208601519094506001600160401b0381111561022157600080fd5b61022d8782880161015d565b93505061023c60408601610107565b60608601519092506001600160401b0381111561025857600080fd5b6102648782880161015d565b91505092959194509250565b60008251610282818460208701610139565b9190910192915050565b60208152600082518060208401526102ab816040850160208701610139565b601f01601f1916919091016040019291505056fe";
const erc6492SignatureValidatorByteCode = "0x608060405234801561001057600080fd5b5060405161069438038061069483398101604081905261002f9161051e565b600061003c848484610048565b9050806000526001601ff35b60007f64926492649264926492649264926492649264926492649264926492649264926100748361040c565b036101e7576000606080848060200190518101906100929190610577565b60405192955090935091506000906001600160a01b038516906100b69085906105dd565b6000604051808303816000865af19150503d80600081146100f3576040519150601f19603f3d011682016040523d82523d6000602084013e6100f8565b606091505b50509050876001600160a01b03163b60000361016057806101605760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90610190908b9087906004016105f9565b602060405180830381865afa1580156101ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d19190610633565b6001600160e01b03191614945050505050610405565b6001600160a01b0384163b1561027a57604051630b135d3f60e11b808252906001600160a01b03861690631626ba7e9061022790879087906004016105f9565b602060405180830381865afa158015610244573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102689190610633565b6001600160e01b031916149050610405565b81516041146102df5760405162461bcd60e51b815260206004820152603a602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e6774680000000000006064820152608401610157565b6102e7610425565b5060208201516040808401518451859392600091859190811061030c5761030c61065d565b016020015160f81c9050601b811480159061032b57508060ff16601c14155b1561038c5760405162461bcd60e51b815260206004820152603b602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c756500000000006064820152608401610157565b60408051600081526020810180835289905260ff83169181019190915260608101849052608081018390526001600160a01b0389169060019060a0016020604051602081039080840390855afa1580156103ea573d6000803e3d6000fd5b505050602060405103516001600160a01b0316149450505050505b9392505050565b600060208251101561041d57600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b038116811461045857600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561048c578181015183820152602001610474565b50506000910152565b600082601f8301126104a657600080fd5b81516001600160401b038111156104bf576104bf61045b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156104ed576104ed61045b565b60405281815283820160200185101561050557600080fd5b610516826020830160208701610471565b949350505050565b60008060006060848603121561053357600080fd5b835161053e81610443565b6020850151604086015191945092506001600160401b0381111561056157600080fd5b61056d86828701610495565b9150509250925092565b60008060006060848603121561058c57600080fd5b835161059781610443565b60208501519093506001600160401b038111156105b357600080fd5b6105bf86828701610495565b604086015190935090506001600160401b0381111561056157600080fd5b600082516105ef818460208701610471565b9190910192915050565b828152604060208201526000825180604084015261061e816060850160208701610471565b601f01601f1916919091016060019392505050565b60006020828403121561064557600080fd5b81516001600160e01b03198116811461040557600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";
const multicall3Bytecode = "0x608060405234801561001057600080fd5b506115b9806100206000396000f3fe6080604052600436106100f35760003560e01c80634d2301cc1161008a578063a8b0574e11610059578063a8b0574e14610325578063bce38bd714610350578063c3077fa914610380578063ee82ac5e146103b2576100f3565b80634d2301cc1461026257806372425d9d1461029f57806382ad56cb146102ca57806386d516e8146102fa576100f3565b80633408e470116100c65780633408e470146101af578063399542e9146101da5780633e64a6961461020c57806342cbb15c14610237576100f3565b80630f28c97d146100f8578063174dea7114610123578063252dba421461015357806327e86d6e14610184575b600080fd5b34801561010457600080fd5b5061010d6103ef565b60405161011a9190610c0a565b60405180910390f35b61013d60048036038101906101389190610c94565b6103f7565b60405161014a9190610e94565b60405180910390f35b61016d60048036038101906101689190610f0c565b610615565b60405161017b92919061101b565b60405180910390f35b34801561019057600080fd5b506101996107ab565b6040516101a69190611064565b60405180910390f35b3480156101bb57600080fd5b506101c46107b7565b6040516101d19190610c0a565b60405180910390f35b6101f460048036038101906101ef91906110ab565b6107bf565b6040516102039392919061110b565b60405180910390f35b34801561021857600080fd5b506102216107e1565b60405161022e9190610c0a565b60405180910390f35b34801561024357600080fd5b5061024c6107e9565b6040516102599190610c0a565b60405180910390f35b34801561026e57600080fd5b50610289600480360381019061028491906111a7565b6107f1565b6040516102969190610c0a565b60405180910390f35b3480156102ab57600080fd5b506102b4610812565b6040516102c19190610c0a565b60405180910390f35b6102e460048036038101906102df919061122a565b61081a565b6040516102f19190610e94565b60405180910390f35b34801561030657600080fd5b5061030f6109e4565b60405161031c9190610c0a565b60405180910390f35b34801561033157600080fd5b5061033a6109ec565b6040516103479190611286565b60405180910390f35b61036a600480360381019061036591906110ab565b6109f4565b6040516103779190610e94565b60405180910390f35b61039a60048036038101906103959190610f0c565b610ba6565b6040516103a99392919061110b565b60405180910390f35b3480156103be57600080fd5b506103d960048036038101906103d491906112cd565b610bca565b6040516103e69190611064565b60405180910390f35b600042905090565b60606000808484905090508067ffffffffffffffff81111561041c5761041b6112fa565b5b60405190808252806020026020018201604052801561045557816020015b610442610bd5565b81526020019060019003908161043a5790505b5092503660005b828110156105c957600085828151811061047957610478611329565b5b6020026020010151905087878381811061049657610495611329565b5b90506020028101906104a89190611367565b925060008360400135905080860195508360000160208101906104cb91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16818580606001906104f2919061138f565b604051610500929190611431565b60006040518083038185875af1925050503d806000811461053d576040519150601f19603f3d011682016040523d82523d6000602084013e610542565b606091505b5083600001846020018290528215151515815250505081516020850135176105bc577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260846000fd5b826001019250505061045c565b5082341461060c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610603906114a7565b60405180910390fd5b50505092915050565b6000606043915060008484905090508067ffffffffffffffff81111561063e5761063d6112fa565b5b60405190808252806020026020018201604052801561067157816020015b606081526020019060019003908161065c5790505b5091503660005b828110156107a157600087878381811061069557610694611329565b5b90506020028101906106a791906114c7565b92508260000160208101906106bc91906111a7565b73ffffffffffffffffffffffffffffffffffffffff168380602001906106e2919061138f565b6040516106f0929190611431565b6000604051808303816000865af19150503d806000811461072d576040519150601f19603f3d011682016040523d82523d6000602084013e610732565b606091505b5086848151811061074657610745611329565b5b60200260200101819052819250505080610795576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078c9061153b565b60405180910390fd5b81600101915050610678565b5050509250929050565b60006001430340905090565b600046905090565b6000806060439250434091506107d68686866109f4565b905093509350939050565b600048905090565b600043905090565b60008173ffffffffffffffffffffffffffffffffffffffff16319050919050565b600044905090565b606060008383905090508067ffffffffffffffff81111561083e5761083d6112fa565b5b60405190808252806020026020018201604052801561087757816020015b610864610bd5565b81526020019060019003908161085c5790505b5091503660005b828110156109db57600084828151811061089b5761089a611329565b5b602002602001015190508686838181106108b8576108b7611329565b5b90506020028101906108ca919061155b565b92508260000160208101906108df91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060400190610905919061138f565b604051610913929190611431565b6000604051808303816000865af19150503d8060008114610950576040519150601f19603f3d011682016040523d82523d6000602084013e610955565b606091505b5082600001836020018290528215151515815250505080516020840135176109cf577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260646000fd5b8160010191505061087e565b50505092915050565b600045905090565b600041905090565b606060008383905090508067ffffffffffffffff811115610a1857610a176112fa565b5b604051908082528060200260200182016040528015610a5157816020015b610a3e610bd5565b815260200190600190039081610a365790505b5091503660005b82811015610b9c576000848281518110610a7557610a74611329565b5b60200260200101519050868683818110610a9257610a91611329565b5b9050602002810190610aa491906114c7565b9250826000016020810190610ab991906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060200190610adf919061138f565b604051610aed929190611431565b6000604051808303816000865af19150503d8060008114610b2a576040519150601f19603f3d011682016040523d82523d6000602084013e610b2f565b606091505b508260000183602001829052821515151581525050508715610b90578060000151610b8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b869061153b565b60405180910390fd5b5b81600101915050610a58565b5050509392505050565b6000806060610bb7600186866107bf565b8093508194508295505050509250925092565b600081409050919050565b6040518060400160405280600015158152602001606081525090565b6000819050919050565b610c0481610bf1565b82525050565b6000602082019050610c1f6000830184610bfb565b92915050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f840112610c5457610c53610c2f565b5b8235905067ffffffffffffffff811115610c7157610c70610c34565b5b602083019150836020820283011115610c8d57610c8c610c39565b5b9250929050565b60008060208385031215610cab57610caa610c25565b5b600083013567ffffffffffffffff811115610cc957610cc8610c2a565b5b610cd585828601610c3e565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b610d2281610d0d565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d62578082015181840152602081019050610d47565b83811115610d71576000848401525b50505050565b6000601f19601f8301169050919050565b6000610d9382610d28565b610d9d8185610d33565b9350610dad818560208601610d44565b610db681610d77565b840191505092915050565b6000604083016000830151610dd96000860182610d19565b5060208301518482036020860152610df18282610d88565b9150508091505092915050565b6000610e0a8383610dc1565b905092915050565b6000602082019050919050565b6000610e2a82610ce1565b610e348185610cec565b935083602082028501610e4685610cfd565b8060005b85811015610e825784840389528151610e638582610dfe565b9450610e6e83610e12565b925060208a01995050600181019050610e4a565b50829750879550505050505092915050565b60006020820190508181036000830152610eae8184610e1f565b905092915050565b60008083601f840112610ecc57610ecb610c2f565b5b8235905067ffffffffffffffff811115610ee957610ee8610c34565b5b602083019150836020820283011115610f0557610f04610c39565b5b9250929050565b60008060208385031215610f2357610f22610c25565b5b600083013567ffffffffffffffff811115610f4157610f40610c2a565b5b610f4d85828601610eb6565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000610f918383610d88565b905092915050565b6000602082019050919050565b6000610fb182610f59565b610fbb8185610f64565b935083602082028501610fcd85610f75565b8060005b858110156110095784840389528151610fea8582610f85565b9450610ff583610f99565b925060208a01995050600181019050610fd1565b50829750879550505050505092915050565b60006040820190506110306000830185610bfb565b81810360208301526110428184610fa6565b90509392505050565b6000819050919050565b61105e8161104b565b82525050565b60006020820190506110796000830184611055565b92915050565b61108881610d0d565b811461109357600080fd5b50565b6000813590506110a58161107f565b92915050565b6000806000604084860312156110c4576110c3610c25565b5b60006110d286828701611096565b935050602084013567ffffffffffffffff8111156110f3576110f2610c2a565b5b6110ff86828701610eb6565b92509250509250925092565b60006060820190506111206000830186610bfb565b61112d6020830185611055565b818103604083015261113f8184610e1f565b9050949350505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061117482611149565b9050919050565b61118481611169565b811461118f57600080fd5b50565b6000813590506111a18161117b565b92915050565b6000602082840312156111bd576111bc610c25565b5b60006111cb84828501611192565b91505092915050565b60008083601f8401126111ea576111e9610c2f565b5b8235905067ffffffffffffffff81111561120757611206610c34565b5b60208301915083602082028301111561122357611222610c39565b5b9250929050565b6000806020838503121561124157611240610c25565b5b600083013567ffffffffffffffff81111561125f5761125e610c2a565b5b61126b858286016111d4565b92509250509250929050565b61128081611169565b82525050565b600060208201905061129b6000830184611277565b92915050565b6112aa81610bf1565b81146112b557600080fd5b50565b6000813590506112c7816112a1565b92915050565b6000602082840312156112e3576112e2610c25565b5b60006112f1848285016112b8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b60008235600160800383360303811261138357611382611358565b5b80830191505092915050565b600080833560016020038436030381126113ac576113ab611358565b5b80840192508235915067ffffffffffffffff8211156113ce576113cd61135d565b5b6020830192506001820236038313156113ea576113e9611362565b5b509250929050565b600081905092915050565b82818337600083830152505050565b600061141883856113f2565b93506114258385846113fd565b82840190509392505050565b600061143e82848661140c565b91508190509392505050565b600082825260208201905092915050565b7f4d756c746963616c6c333a2076616c7565206d69736d61746368000000000000600082015250565b6000611491601a8361144a565b915061149c8261145b565b602082019050919050565b600060208201905081810360008301526114c081611484565b9050919050565b6000823560016040038336030381126114e3576114e2611358565b5b80830191505092915050565b7f4d756c746963616c6c333a2063616c6c206661696c6564000000000000000000600082015250565b600061152560178361144a565b9150611530826114ef565b602082019050919050565b6000602082019050818103600083015261155481611518565b9050919050565b60008235600160600383360303811261157757611576611358565b5b8083019150509291505056fea264697066735822122020c1bc9aacf8e4a6507193432a895a8e77094f45a1395583f07b24e860ef06cd64736f6c634300080c0033";
class ChainDoesNotSupportContract extends BaseError$2 {
  constructor({ blockNumber, chain, contract }) {
    super(`Chain "${chain.name}" does not support contract "${contract.name}".`, {
      metaMessages: [
        "This could be due to any of the following:",
        ...blockNumber && contract.blockCreated && contract.blockCreated > blockNumber ? [
          `- The contract "${contract.name}" was not deployed until block ${contract.blockCreated} (current block ${blockNumber}).`
        ] : [
          `- The chain does not have the contract "${contract.name}" configured.`
        ]
      ],
      name: "ChainDoesNotSupportContract"
    });
  }
}
class ChainMismatchError extends BaseError$2 {
  constructor({ chain, currentChainId }) {
    super(`The current chain of the wallet (id: ${currentChainId}) does not match the target chain for the transaction (id: ${chain.id} – ${chain.name}).`, {
      metaMessages: [
        `Current Chain ID:  ${currentChainId}`,
        `Expected Chain ID: ${chain.id} – ${chain.name}`
      ],
      name: "ChainMismatchError"
    });
  }
}
class ChainNotFoundError extends BaseError$2 {
  constructor() {
    super([
      "No chain was provided to the request.",
      "Please provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient."
    ].join("\n"), {
      name: "ChainNotFoundError"
    });
  }
}
class ClientChainNotConfiguredError extends BaseError$2 {
  constructor() {
    super("No chain was provided to the Client.", {
      name: "ClientChainNotConfiguredError"
    });
  }
}
class InvalidChainIdError extends BaseError$2 {
  constructor({ chainId }) {
    super(typeof chainId === "number" ? `Chain ID "${chainId}" is invalid.` : "Chain ID is invalid.", { name: "InvalidChainIdError" });
  }
}
const docsPath$2 = "/docs/contract/encodeDeployData";
function encodeDeployData(parameters) {
  const { abi: abi2, args, bytecode } = parameters;
  if (!args || args.length === 0)
    return bytecode;
  const description = abi2.find((x) => "type" in x && x.type === "constructor");
  if (!description)
    throw new AbiConstructorNotFoundError({ docsPath: docsPath$2 });
  if (!("inputs" in description))
    throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath$2 });
  if (!description.inputs || description.inputs.length === 0)
    throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath$2 });
  const data = encodeAbiParameters(description.inputs, args);
  return concatHex([bytecode, data]);
}
function getChainContractAddress({ blockNumber, chain, contract: name }) {
  const contract = chain?.contracts?.[name];
  if (!contract)
    throw new ChainDoesNotSupportContract({
      chain,
      contract: { name }
    });
  if (blockNumber && contract.blockCreated && contract.blockCreated > blockNumber)
    throw new ChainDoesNotSupportContract({
      blockNumber,
      chain,
      contract: {
        name,
        blockCreated: contract.blockCreated
      }
    });
  return contract.address;
}
function getCallError(err, { docsPath: docsPath2, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new CallExecutionError(cause, {
    docsPath: docsPath2,
    ...args
  });
}
function withResolvers() {
  let resolve = () => void 0;
  let reject = () => void 0;
  const promise = new Promise((resolve_, reject_) => {
    resolve = resolve_;
    reject = reject_;
  });
  return { promise, resolve, reject };
}
const schedulerCache = /* @__PURE__ */ new Map();
function createBatchScheduler({ fn, id, shouldSplitBatch, wait: wait2 = 0, sort }) {
  const exec = async () => {
    const scheduler = getScheduler();
    flush();
    const args = scheduler.map(({ args: args2 }) => args2);
    if (args.length === 0)
      return;
    fn(args).then((data) => {
      if (sort && Array.isArray(data))
        data.sort(sort);
      for (let i = 0; i < scheduler.length; i++) {
        const { resolve } = scheduler[i];
        resolve?.([data[i], data]);
      }
    }).catch((err) => {
      for (let i = 0; i < scheduler.length; i++) {
        const { reject } = scheduler[i];
        reject?.(err);
      }
    });
  };
  const flush = () => schedulerCache.delete(id);
  const getBatchedArgs = () => getScheduler().map(({ args }) => args);
  const getScheduler = () => schedulerCache.get(id) || [];
  const setScheduler = (item) => schedulerCache.set(id, [...getScheduler(), item]);
  return {
    flush,
    async schedule(args) {
      const { promise, resolve, reject } = withResolvers();
      const split = shouldSplitBatch?.([...getBatchedArgs(), args]);
      if (split)
        exec();
      const hasActiveScheduler = getScheduler().length > 0;
      if (hasActiveScheduler) {
        setScheduler({ args, resolve, reject });
        return promise;
      }
      setScheduler({ args, resolve, reject });
      setTimeout(exec, wait2);
      return promise;
    }
  };
}
async function call(client, args) {
  const { account: account_ = client.account, authorizationList, batch = Boolean(client.batch?.multicall), blockNumber, blockTag = client.experimental_blockTag ?? "latest", accessList, blobs, blockOverrides, code, data: data_, factory, factoryData, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride, ...rest } = args;
  const account = account_ ? parseAccount(account_) : void 0;
  if (code && (factory || factoryData))
    throw new BaseError$2("Cannot provide both `code` & `factory`/`factoryData` as parameters.");
  if (code && to)
    throw new BaseError$2("Cannot provide both `code` & `to` as parameters.");
  const deploylessCallViaBytecode = code && data_;
  const deploylessCallViaFactory = factory && factoryData && to && data_;
  const deploylessCall = deploylessCallViaBytecode || deploylessCallViaFactory;
  const data = (() => {
    if (deploylessCallViaBytecode)
      return toDeploylessCallViaBytecodeData({
        code,
        data: data_
      });
    if (deploylessCallViaFactory)
      return toDeploylessCallViaFactoryData({
        data: data_,
        factory,
        factoryData,
        to
      });
    return data_;
  })();
  try {
    assertRequest(args);
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const rpcBlockOverrides = blockOverrides ? toRpc(blockOverrides) : void 0;
    const rpcStateOverride = serializeStateOverride(stateOverride);
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request = format({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract$1(rest, { format: chainFormat }),
      accessList,
      account,
      authorizationList,
      blobs,
      data,
      gas,
      gasPrice,
      maxFeePerBlobGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to: deploylessCall ? void 0 : to,
      value
    }, "call");
    if (batch && shouldPerformMulticall({ request }) && !rpcStateOverride && !rpcBlockOverrides) {
      try {
        return await scheduleMulticall(client, {
          ...request,
          blockNumber,
          blockTag
        });
      } catch (err) {
        if (!(err instanceof ClientChainNotConfiguredError) && !(err instanceof ChainDoesNotSupportContract))
          throw err;
      }
    }
    const params = (() => {
      const base = [
        request,
        block
      ];
      if (rpcStateOverride && rpcBlockOverrides)
        return [...base, rpcStateOverride, rpcBlockOverrides];
      if (rpcStateOverride)
        return [...base, rpcStateOverride];
      if (rpcBlockOverrides)
        return [...base, {}, rpcBlockOverrides];
      return base;
    })();
    const response = await client.request({
      method: "eth_call",
      params
    });
    if (response === "0x")
      return { data: void 0 };
    return { data: response };
  } catch (err) {
    const data2 = getRevertErrorData(err);
    const { offchainLookup, offchainLookupSignature } = await __vitePreload(async () => {
      const { offchainLookup: offchainLookup2, offchainLookupSignature: offchainLookupSignature2 } = await import("./ccip-KrcYtDWH.js");
      return { offchainLookup: offchainLookup2, offchainLookupSignature: offchainLookupSignature2 };
    }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]) : void 0);
    if (client.ccipRead !== false && data2?.slice(0, 10) === offchainLookupSignature && to)
      return { data: await offchainLookup(client, { data: data2, to }) };
    if (deploylessCall && data2?.slice(0, 10) === "0x101bb98d")
      throw new CounterfactualDeploymentFailedError({ factory });
    throw getCallError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}
function shouldPerformMulticall({ request }) {
  const { data, to, ...request_ } = request;
  if (!data)
    return false;
  if (data.startsWith(aggregate3Signature))
    return false;
  if (!to)
    return false;
  if (Object.values(request_).filter((x) => typeof x !== "undefined").length > 0)
    return false;
  return true;
}
async function scheduleMulticall(client, args) {
  const { batchSize = 1024, deployless = false, wait: wait2 = 0 } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
  const { blockNumber, blockTag = client.experimental_blockTag ?? "latest", data, to } = args;
  const multicallAddress = (() => {
    if (deployless)
      return null;
    if (args.multicallAddress)
      return args.multicallAddress;
    if (client.chain) {
      return getChainContractAddress({
        blockNumber,
        chain: client.chain,
        contract: "multicall3"
      });
    }
    throw new ClientChainNotConfiguredError();
  })();
  const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
  const block = blockNumberHex || blockTag;
  const { schedule } = createBatchScheduler({
    id: `${client.uid}.${block}`,
    wait: wait2,
    shouldSplitBatch(args2) {
      const size2 = args2.reduce((size3, { data: data2 }) => size3 + (data2.length - 2), 0);
      return size2 > batchSize * 2;
    },
    fn: async (requests) => {
      const calls = requests.map((request) => ({
        allowFailure: true,
        callData: request.data,
        target: request.to
      }));
      const calldata = encodeFunctionData({
        abi: multicall3Abi,
        args: [calls],
        functionName: "aggregate3"
      });
      const data2 = await client.request({
        method: "eth_call",
        params: [
          {
            ...multicallAddress === null ? {
              data: toDeploylessCallViaBytecodeData({
                code: multicall3Bytecode,
                data: calldata
              })
            } : { to: multicallAddress, data: calldata }
          },
          block
        ]
      });
      return decodeFunctionResult({
        abi: multicall3Abi,
        args: [calls],
        functionName: "aggregate3",
        data: data2 || "0x"
      });
    }
  });
  const [{ returnData, success }] = await schedule({ data, to });
  if (!success)
    throw new RawContractError({ data: returnData });
  if (returnData === "0x")
    return { data: void 0 };
  return { data: returnData };
}
function toDeploylessCallViaBytecodeData(parameters) {
  const { code, data } = parameters;
  return encodeDeployData({
    abi: parseAbi(["constructor(bytes, bytes)"]),
    bytecode: deploylessCallViaBytecodeBytecode,
    args: [code, data]
  });
}
function toDeploylessCallViaFactoryData(parameters) {
  const { data, factory, factoryData, to } = parameters;
  return encodeDeployData({
    abi: parseAbi(["constructor(address, bytes, address, bytes)"]),
    bytecode: deploylessCallViaFactoryBytecode,
    args: [to, data, factory, factoryData]
  });
}
function getRevertErrorData(err) {
  if (!(err instanceof BaseError$2))
    return void 0;
  const error = err.walk();
  return typeof error?.data === "object" ? error.data?.data : error.data;
}
async function readContract(client, parameters) {
  const { abi: abi2, address, args, functionName, ...rest } = parameters;
  const calldata = encodeFunctionData({
    abi: abi2,
    args,
    functionName
  });
  try {
    const { data } = await getAction(client, call, "call")({
      ...rest,
      data: calldata,
      to: address
    });
    return decodeFunctionResult({
      abi: abi2,
      args,
      functionName,
      data: data || "0x"
    });
  } catch (error) {
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/readContract",
      functionName
    });
  }
}
async function simulateContract(client, parameters) {
  const { abi: abi2, address, args, dataSuffix, functionName, ...callRequest } = parameters;
  const account = callRequest.account ? parseAccount(callRequest.account) : client.account;
  const calldata = encodeFunctionData({ abi: abi2, args, functionName });
  try {
    const { data } = await getAction(client, call, "call")({
      batch: false,
      data: `${calldata}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
      to: address,
      ...callRequest,
      account
    });
    const result = decodeFunctionResult({
      abi: abi2,
      args,
      functionName,
      data: data || "0x"
    });
    const minimizedAbi = abi2.filter((abiItem) => "name" in abiItem && abiItem.name === parameters.functionName);
    return {
      result,
      request: {
        abi: minimizedAbi,
        address,
        args,
        dataSuffix,
        functionName,
        ...callRequest,
        account
      }
    };
  } catch (error) {
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/simulateContract",
      functionName,
      sender: account?.address
    });
  }
}
const listenersCache = /* @__PURE__ */ new Map();
const cleanupCache = /* @__PURE__ */ new Map();
let callbackCount = 0;
function observe(observerId, callbacks, fn) {
  const callbackId = ++callbackCount;
  const getListeners = () => listenersCache.get(observerId) || [];
  const unsubscribe = () => {
    const listeners2 = getListeners();
    listenersCache.set(observerId, listeners2.filter((cb) => cb.id !== callbackId));
  };
  const unwatch = () => {
    const listeners2 = getListeners();
    if (!listeners2.some((cb) => cb.id === callbackId))
      return;
    const cleanup2 = cleanupCache.get(observerId);
    if (listeners2.length === 1 && cleanup2) {
      const p = cleanup2();
      if (p instanceof Promise)
        p.catch(() => {
        });
    }
    unsubscribe();
  };
  const listeners = getListeners();
  listenersCache.set(observerId, [
    ...listeners,
    { id: callbackId, fns: callbacks }
  ]);
  if (listeners && listeners.length > 0)
    return unwatch;
  const emit = {};
  for (const key in callbacks) {
    emit[key] = (...args) => {
      const listeners2 = getListeners();
      if (listeners2.length === 0)
        return;
      for (const listener of listeners2)
        listener.fns[key]?.(...args);
    };
  }
  const cleanup = fn(emit);
  if (typeof cleanup === "function")
    cleanupCache.set(observerId, cleanup);
  return unwatch;
}
async function wait(time) {
  return new Promise((res) => setTimeout(res, time));
}
function poll(fn, { emitOnBegin, initialWaitTime, interval }) {
  let active = true;
  const unwatch = () => active = false;
  const watch = async () => {
    let data;
    if (emitOnBegin)
      data = await fn({ unpoll: unwatch });
    const initialWait = await initialWaitTime?.(data) ?? interval;
    await wait(initialWait);
    const poll2 = async () => {
      if (!active)
        return;
      await fn({ unpoll: unwatch });
      await wait(interval);
      poll2();
    };
    poll2();
  };
  watch();
  return unwatch;
}
const promiseCache$1 = /* @__PURE__ */ new Map();
const responseCache = /* @__PURE__ */ new Map();
function getCache(cacheKey2) {
  const buildCache = (cacheKey3, cache) => ({
    clear: () => cache.delete(cacheKey3),
    get: () => cache.get(cacheKey3),
    set: (data) => cache.set(cacheKey3, data)
  });
  const promise = buildCache(cacheKey2, promiseCache$1);
  const response = buildCache(cacheKey2, responseCache);
  return {
    clear: () => {
      promise.clear();
      response.clear();
    },
    promise,
    response
  };
}
async function withCache(fn, { cacheKey: cacheKey2, cacheTime = Number.POSITIVE_INFINITY }) {
  const cache = getCache(cacheKey2);
  const response = cache.response.get();
  if (response && cacheTime > 0) {
    const age = Date.now() - response.created.getTime();
    if (age < cacheTime)
      return response.data;
  }
  let promise = cache.promise.get();
  if (!promise) {
    promise = fn();
    cache.promise.set(promise);
  }
  try {
    const data = await promise;
    cache.response.set({ created: /* @__PURE__ */ new Date(), data });
    return data;
  } finally {
    cache.promise.clear();
  }
}
const cacheKey = (id) => `blockNumber.${id}`;
async function getBlockNumber(client, { cacheTime = client.cacheTime } = {}) {
  const blockNumberHex = await withCache(() => client.request({
    method: "eth_blockNumber"
  }), { cacheKey: cacheKey(client.uid), cacheTime });
  return BigInt(blockNumberHex);
}
async function getFilterChanges(_client, { filter }) {
  const strict = "strict" in filter && filter.strict;
  const logs = await filter.request({
    method: "eth_getFilterChanges",
    params: [filter.id]
  });
  if (typeof logs[0] === "string")
    return logs;
  const formattedLogs = logs.map((log) => formatLog(log));
  if (!("abi" in filter) || !filter.abi)
    return formattedLogs;
  return parseEventLogs({
    abi: filter.abi,
    logs: formattedLogs,
    strict
  });
}
async function uninstallFilter(_client, { filter }) {
  return filter.request({
    method: "eth_uninstallFilter",
    params: [filter.id]
  });
}
function watchContractEvent(client, parameters) {
  const { abi: abi2, address, args, batch = true, eventName, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ } = parameters;
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (typeof fromBlock === "bigint")
      return true;
    if (client.transport.type === "webSocket" || client.transport.type === "ipc")
      return false;
    if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
      return false;
    return true;
  })();
  const pollContractEvent = () => {
    const strict = strict_ ?? false;
    const observerId = stringify$1([
      "watchContractEvent",
      address,
      args,
      batch,
      client.uid,
      eventName,
      pollingInterval,
      strict,
      fromBlock
    ]);
    return observe(observerId, { onLogs, onError }, (emit) => {
      let previousBlockNumber;
      if (fromBlock !== void 0)
        previousBlockNumber = fromBlock - 1n;
      let filter;
      let initialized = false;
      const unwatch = poll(async () => {
        if (!initialized) {
          try {
            filter = await getAction(client, createContractEventFilter, "createContractEventFilter")({
              abi: abi2,
              address,
              args,
              eventName,
              strict,
              fromBlock
            });
          } catch {
          }
          initialized = true;
          return;
        }
        try {
          let logs;
          if (filter) {
            logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          } else {
            const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
            if (previousBlockNumber && previousBlockNumber < blockNumber) {
              logs = await getAction(client, getContractEvents, "getContractEvents")({
                abi: abi2,
                address,
                args,
                eventName,
                fromBlock: previousBlockNumber + 1n,
                toBlock: blockNumber,
                strict
              });
            } else {
              logs = [];
            }
            previousBlockNumber = blockNumber;
          }
          if (logs.length === 0)
            return;
          if (batch)
            emit.onLogs(logs);
          else
            for (const log of logs)
              emit.onLogs([log]);
        } catch (err) {
          if (filter && err instanceof InvalidInputRpcError)
            initialized = false;
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribeContractEvent = () => {
    const strict = strict_ ?? false;
    const observerId = stringify$1([
      "watchContractEvent",
      address,
      args,
      batch,
      client.uid,
      eventName,
      pollingInterval,
      strict
    ]);
    let active = true;
    let unsubscribe = () => active = false;
    return observe(observerId, { onLogs, onError }, (emit) => {
      (async () => {
        try {
          const transport = (() => {
            if (client.transport.type === "fallback") {
              const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
              if (!transport2)
                return client.transport;
              return transport2.value;
            }
            return client.transport;
          })();
          const topics = eventName ? encodeEventTopics({
            abi: abi2,
            eventName,
            args
          }) : [];
          const { unsubscribe: unsubscribe_ } = await transport.subscribe({
            params: ["logs", { address, topics }],
            onData(data) {
              if (!active)
                return;
              const log = data.result;
              try {
                const { eventName: eventName2, args: args2 } = decodeEventLog({
                  abi: abi2,
                  data: log.data,
                  topics: log.topics,
                  strict: strict_
                });
                const formatted = formatLog(log, {
                  args: args2,
                  eventName: eventName2
                });
                emit.onLogs([formatted]);
              } catch (err) {
                let eventName2;
                let isUnnamed;
                if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                  if (strict_)
                    return;
                  eventName2 = err.abiItem.name;
                  isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
                }
                const formatted = formatLog(log, {
                  args: isUnnamed ? [] : {},
                  eventName: eventName2
                });
                emit.onLogs([formatted]);
              }
            },
            onError(error) {
              emit.onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    });
  };
  return enablePolling ? pollContractEvent() : subscribeContractEvent();
}
class AccountNotFoundError extends BaseError$2 {
  constructor({ docsPath: docsPath2 } = {}) {
    super([
      "Could not find an Account to execute with this Action.",
      "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the Client."
    ].join("\n"), {
      docsPath: docsPath2,
      docsSlug: "account",
      name: "AccountNotFoundError"
    });
  }
}
class AccountTypeNotSupportedError extends BaseError$2 {
  constructor({ docsPath: docsPath2, metaMessages, type }) {
    super(`Account type "${type}" is not supported.`, {
      docsPath: docsPath2,
      metaMessages,
      name: "AccountTypeNotSupportedError"
    });
  }
}
function assertCurrentChain({ chain, currentChainId }) {
  if (!chain)
    throw new ChainNotFoundError();
  if (currentChainId !== chain.id)
    throw new ChainMismatchError({ chain, currentChainId });
}
function getTransactionError(err, { docsPath: docsPath2, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new TransactionExecutionError(cause, {
    docsPath: docsPath2,
    ...args
  });
}
async function sendRawTransaction(client, { serializedTransaction }) {
  return client.request({
    method: "eth_sendRawTransaction",
    params: [serializedTransaction]
  }, { retryCount: 0 });
}
const supportsWalletNamespace = new LruMap$1(128);
async function sendTransaction(client, parameters) {
  const { account: account_ = client.account, chain = client.chain, accessList, authorizationList, blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, type, value, ...rest } = parameters;
  if (typeof account_ === "undefined")
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/sendTransaction"
    });
  const account = account_ ? parseAccount(account_) : null;
  try {
    assertRequest(parameters);
    const to = await (async () => {
      if (parameters.to)
        return parameters.to;
      if (parameters.to === null)
        return void 0;
      if (authorizationList && authorizationList.length > 0)
        return await recoverAuthorizationAddress({
          authorization: authorizationList[0]
        }).catch(() => {
          throw new BaseError$2("`to` is required. Could not infer from `authorizationList`.");
        });
      return void 0;
    })();
    if (account?.type === "json-rpc" || account === null) {
      let chainId;
      if (chain !== null) {
        chainId = await getAction(client, getChainId, "getChainId")({});
        assertCurrentChain({
          currentChainId: chainId,
          chain
        });
      }
      const chainFormat = client.chain?.formatters?.transactionRequest?.format;
      const format = chainFormat || formatTransactionRequest;
      const request = format({
        // Pick out extra data that might exist on the chain's transaction request type.
        ...extract$1(rest, { format: chainFormat }),
        accessList,
        account,
        authorizationList,
        blobs,
        chainId,
        data,
        gas,
        gasPrice,
        maxFeePerBlobGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        to,
        type,
        value
      }, "sendTransaction");
      const isWalletNamespaceSupported = supportsWalletNamespace.get(client.uid);
      const method = isWalletNamespaceSupported ? "wallet_sendTransaction" : "eth_sendTransaction";
      try {
        return await client.request({
          method,
          params: [request]
        }, { retryCount: 0 });
      } catch (e) {
        if (isWalletNamespaceSupported === false)
          throw e;
        const error = e;
        if (error.name === "InvalidInputRpcError" || error.name === "InvalidParamsRpcError" || error.name === "MethodNotFoundRpcError" || error.name === "MethodNotSupportedRpcError") {
          return await client.request({
            method: "wallet_sendTransaction",
            params: [request]
          }, { retryCount: 0 }).then((hash2) => {
            supportsWalletNamespace.set(client.uid, true);
            return hash2;
          }).catch((e2) => {
            const walletNamespaceError = e2;
            if (walletNamespaceError.name === "MethodNotFoundRpcError" || walletNamespaceError.name === "MethodNotSupportedRpcError") {
              supportsWalletNamespace.set(client.uid, false);
              throw error;
            }
            throw walletNamespaceError;
          });
        }
        throw error;
      }
    }
    if (account?.type === "local") {
      const request = await getAction(client, prepareTransactionRequest, "prepareTransactionRequest")({
        account,
        accessList,
        authorizationList,
        blobs,
        chain,
        data,
        gas,
        gasPrice,
        maxFeePerBlobGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        nonceManager: account.nonceManager,
        parameters: [...defaultParameters, "sidecars"],
        type,
        value,
        ...rest,
        to
      });
      const serializer = chain?.serializers?.transaction;
      const serializedTransaction = await account.signTransaction(request, {
        serializer
      });
      return await getAction(client, sendRawTransaction, "sendRawTransaction")({
        serializedTransaction
      });
    }
    if (account?.type === "smart")
      throw new AccountTypeNotSupportedError({
        metaMessages: [
          "Consider using the `sendUserOperation` Action instead."
        ],
        docsPath: "/docs/actions/bundler/sendUserOperation",
        type: "smart"
      });
    throw new AccountTypeNotSupportedError({
      docsPath: "/docs/actions/wallet/sendTransaction",
      type: account?.type
    });
  } catch (err) {
    if (err instanceof AccountTypeNotSupportedError)
      throw err;
    throw getTransactionError(err, {
      ...parameters,
      account,
      chain: parameters.chain || void 0
    });
  }
}
class BundleFailedError extends BaseError$2 {
  constructor(result) {
    super(`Call bundle failed with status: ${result.statusCode}`, {
      name: "BundleFailedError"
    });
    Object.defineProperty(this, "result", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.result = result;
  }
}
function withRetry(fn, { delay: delay_ = 100, retryCount = 2, shouldRetry: shouldRetry2 = () => true } = {}) {
  return new Promise((resolve, reject) => {
    const attemptRetry = async ({ count = 0 } = {}) => {
      const retry = async ({ error }) => {
        const delay = typeof delay_ === "function" ? delay_({ count, error }) : delay_;
        if (delay)
          await wait(delay);
        attemptRetry({ count: count + 1 });
      };
      try {
        const data = await fn();
        resolve(data);
      } catch (err) {
        if (count < retryCount && await shouldRetry2({ count, error: err }))
          return retry({ error: err });
        reject(err);
      }
    };
    attemptRetry();
  });
}
const fallbackMagicIdentifier = "0x5792579257925792579257925792579257925792579257925792579257925792";
const fallbackTransactionErrorMagicIdentifier = numberToHex(0, {
  size: 32
});
async function sendCalls(client, parameters) {
  const { account: account_ = client.account, capabilities, chain = client.chain, experimental_fallback, experimental_fallbackDelay = 32, forceAtomic = false, id, version: version2 = "2.0.0" } = parameters;
  const account = account_ ? parseAccount(account_) : null;
  const calls = parameters.calls.map((call_) => {
    const call2 = call_;
    const data = call2.abi ? encodeFunctionData({
      abi: call2.abi,
      functionName: call2.functionName,
      args: call2.args
    }) : call2.data;
    return {
      data: call2.dataSuffix && data ? concat$1([data, call2.dataSuffix]) : data,
      to: call2.to,
      value: call2.value ? numberToHex(call2.value) : void 0
    };
  });
  try {
    const response = await client.request({
      method: "wallet_sendCalls",
      params: [
        {
          atomicRequired: forceAtomic,
          calls,
          capabilities,
          chainId: numberToHex(chain.id),
          from: account?.address,
          id,
          version: version2
        }
      ]
    }, { retryCount: 0 });
    if (typeof response === "string")
      return { id: response };
    return response;
  } catch (err) {
    const error = err;
    if (experimental_fallback && (error.name === "MethodNotFoundRpcError" || error.name === "MethodNotSupportedRpcError" || error.name === "UnknownRpcError" || error.details.toLowerCase().includes("does not exist / is not available") || error.details.toLowerCase().includes("missing or invalid. request()") || error.details.toLowerCase().includes("did not match any variant of untagged enum") || error.details.toLowerCase().includes("account upgraded to unsupported contract") || error.details.toLowerCase().includes("eip-7702 not supported") || error.details.toLowerCase().includes("unsupported wc_ method") || // magic.link
    error.details.toLowerCase().includes("feature toggled misconfigured") || // Trust Wallet
    error.details.toLowerCase().includes("jsonrpcengine: response has no error or result for request"))) {
      if (capabilities) {
        const hasNonOptionalCapability = Object.values(capabilities).some((capability) => !capability.optional);
        if (hasNonOptionalCapability) {
          const message = "non-optional `capabilities` are not supported on fallback to `eth_sendTransaction`.";
          throw new UnsupportedNonOptionalCapabilityError(new BaseError$2(message, {
            details: message
          }));
        }
      }
      if (forceAtomic && calls.length > 1) {
        const message = "`forceAtomic` is not supported on fallback to `eth_sendTransaction`.";
        throw new AtomicityNotSupportedError(new BaseError$2(message, {
          details: message
        }));
      }
      const promises = [];
      for (const call2 of calls) {
        const promise = sendTransaction(client, {
          account,
          chain,
          data: call2.data,
          to: call2.to,
          value: call2.value ? hexToBigInt(call2.value) : void 0
        });
        promises.push(promise);
        if (experimental_fallbackDelay > 0)
          await new Promise((resolve) => setTimeout(resolve, experimental_fallbackDelay));
      }
      const results = await Promise.allSettled(promises);
      if (results.every((r) => r.status === "rejected"))
        throw results[0].reason;
      const hashes = results.map((result) => {
        if (result.status === "fulfilled")
          return result.value;
        return fallbackTransactionErrorMagicIdentifier;
      });
      return {
        id: concat$1([
          ...hashes,
          numberToHex(chain.id, { size: 32 }),
          fallbackMagicIdentifier
        ])
      };
    }
    throw getTransactionError(err, {
      ...parameters,
      account,
      chain: parameters.chain
    });
  }
}
async function getCallsStatus(client, parameters) {
  async function getStatus(id) {
    const isTransactions = id.endsWith(fallbackMagicIdentifier.slice(2));
    if (isTransactions) {
      const chainId2 = trim$2(sliceHex(id, -64, -32));
      const hashes = sliceHex(id, 0, -64).slice(2).match(/.{1,64}/g);
      const receipts2 = await Promise.all(hashes.map((hash2) => fallbackTransactionErrorMagicIdentifier.slice(2) !== hash2 ? client.request({
        method: "eth_getTransactionReceipt",
        params: [`0x${hash2}`]
      }, { dedupe: true }) : void 0));
      const status2 = (() => {
        if (receipts2.some((r) => r === null))
          return 100;
        if (receipts2.every((r) => r?.status === "0x1"))
          return 200;
        if (receipts2.every((r) => r?.status === "0x0"))
          return 500;
        return 600;
      })();
      return {
        atomic: false,
        chainId: hexToNumber$1(chainId2),
        receipts: receipts2.filter(Boolean),
        status: status2,
        version: "2.0.0"
      };
    }
    return client.request({
      method: "wallet_getCallsStatus",
      params: [id]
    });
  }
  const { atomic = false, chainId, receipts, version: version2 = "2.0.0", ...response } = await getStatus(parameters.id);
  const [status, statusCode] = (() => {
    const statusCode2 = response.status;
    if (statusCode2 >= 100 && statusCode2 < 200)
      return ["pending", statusCode2];
    if (statusCode2 >= 200 && statusCode2 < 300)
      return ["success", statusCode2];
    if (statusCode2 >= 300 && statusCode2 < 700)
      return ["failure", statusCode2];
    if (statusCode2 === "CONFIRMED")
      return ["success", 200];
    if (statusCode2 === "PENDING")
      return ["pending", 100];
    return [void 0, statusCode2];
  })();
  return {
    ...response,
    atomic,
    // @ts-expect-error: for backwards compatibility
    chainId: chainId ? hexToNumber$1(chainId) : void 0,
    receipts: receipts?.map((receipt) => ({
      ...receipt,
      blockNumber: hexToBigInt(receipt.blockNumber),
      gasUsed: hexToBigInt(receipt.gasUsed),
      status: receiptStatuses[receipt.status]
    })) ?? [],
    statusCode,
    status,
    version: version2
  };
}
async function waitForCallsStatus(client, parameters) {
  const {
    id,
    pollingInterval = client.pollingInterval,
    status = ({ statusCode }) => statusCode === 200 || statusCode >= 300,
    retryCount = 4,
    retryDelay = ({ count }) => ~~(1 << count) * 200,
    // exponential backoff
    timeout = 6e4,
    throwOnFailure = false
  } = parameters;
  const observerId = stringify$1(["waitForCallsStatus", client.uid, id]);
  const { promise, resolve, reject } = withResolvers();
  let timer;
  const unobserve = observe(observerId, { resolve, reject }, (emit) => {
    const unpoll = poll(async () => {
      const done = (fn) => {
        clearTimeout(timer);
        unpoll();
        fn();
        unobserve();
      };
      try {
        const result = await withRetry(async () => {
          const result2 = await getAction(client, getCallsStatus, "getCallsStatus")({ id });
          if (throwOnFailure && result2.status === "failure")
            throw new BundleFailedError(result2);
          return result2;
        }, {
          retryCount,
          delay: retryDelay
        });
        if (!status(result))
          return;
        done(() => emit.resolve(result));
      } catch (error) {
        done(() => emit.reject(error));
      }
    }, {
      interval: pollingInterval,
      emitOnBegin: true
    });
    return unpoll;
  });
  timer = timeout ? setTimeout(() => {
    unobserve();
    clearTimeout(timer);
    reject(new WaitForCallsStatusTimeoutError({ id }));
  }, timeout) : void 0;
  return await promise;
}
class WaitForCallsStatusTimeoutError extends BaseError$2 {
  constructor({ id }) {
    super(`Timed out while waiting for call bundle with id "${id}" to be confirmed.`, { name: "WaitForCallsStatusTimeoutError" });
  }
}
const size = 256;
let index = size;
let buffer;
function uid(length = 11) {
  if (!buffer || index + length > size * 2) {
    buffer = "";
    index = 0;
    for (let i = 0; i < size; i++) {
      buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
    }
  }
  return buffer.substring(index, index++ + length);
}
function createClient(parameters) {
  const { batch, chain, ccipRead, key = "base", name = "Base Client", type = "base" } = parameters;
  const experimental_blockTag = parameters.experimental_blockTag ?? (typeof chain?.experimental_preconfirmationTime === "number" ? "pending" : void 0);
  const blockTime = chain?.blockTime ?? 12e3;
  const defaultPollingInterval = Math.min(Math.max(Math.floor(blockTime / 2), 500), 4e3);
  const pollingInterval = parameters.pollingInterval ?? defaultPollingInterval;
  const cacheTime = parameters.cacheTime ?? pollingInterval;
  const account = parameters.account ? parseAccount(parameters.account) : void 0;
  const { config, request, value } = parameters.transport({
    chain,
    pollingInterval
  });
  const transport = { ...config, ...value };
  const client = {
    account,
    batch,
    cacheTime,
    ccipRead,
    chain,
    key,
    name,
    pollingInterval,
    request,
    transport,
    type,
    uid: uid(),
    ...experimental_blockTag ? { experimental_blockTag } : {}
  };
  function extend(base) {
    return (extendFn) => {
      const extended = extendFn(base);
      for (const key2 in client)
        delete extended[key2];
      const combined = { ...base, ...extended };
      return Object.assign(combined, { extend: extend(combined) });
    };
  }
  return Object.assign(client, { extend: extend(client) });
}
function rpcSchema() {
  return null;
}
function isNullUniversalResolverError(err) {
  if (!(err instanceof BaseError$2))
    return false;
  const cause = err.walk((e) => e instanceof ContractFunctionRevertedError);
  if (!(cause instanceof ContractFunctionRevertedError))
    return false;
  if (cause.data?.errorName === "HttpError")
    return true;
  if (cause.data?.errorName === "ResolverError")
    return true;
  if (cause.data?.errorName === "ResolverNotContract")
    return true;
  if (cause.data?.errorName === "ResolverNotFound")
    return true;
  if (cause.data?.errorName === "ReverseAddressMismatch")
    return true;
  if (cause.data?.errorName === "UnsupportedResolverProfile")
    return true;
  return false;
}
function decodeFunctionData(parameters) {
  const { abi: abi2, data } = parameters;
  const signature = slice$2(data, 0, 4);
  const description = abi2.find((x) => x.type === "function" && signature === toFunctionSelector(formatAbiItem(x)));
  if (!description)
    throw new AbiFunctionSignatureNotFoundError(signature, {
      docsPath: "/docs/contract/decodeFunctionData"
    });
  return {
    functionName: description.name,
    args: "inputs" in description && description.inputs && description.inputs.length > 0 ? decodeAbiParameters(description.inputs, slice$2(data, 4)) : void 0
  };
}
const docsPath$1 = "/docs/contract/encodeErrorResult";
function encodeErrorResult(parameters) {
  const { abi: abi2, errorName, args } = parameters;
  let abiItem = abi2[0];
  if (errorName) {
    const item = getAbiItem({ abi: abi2, args, name: errorName });
    if (!item)
      throw new AbiErrorNotFoundError(errorName, { docsPath: docsPath$1 });
    abiItem = item;
  }
  if (abiItem.type !== "error")
    throw new AbiErrorNotFoundError(void 0, { docsPath: docsPath$1 });
  const definition = formatAbiItem(abiItem);
  const signature = toFunctionSelector(definition);
  let data = "0x";
  if (args && args.length > 0) {
    if (!abiItem.inputs)
      throw new AbiErrorInputsNotFoundError(abiItem.name, { docsPath: docsPath$1 });
    data = encodeAbiParameters(abiItem.inputs, args);
  }
  return concatHex([signature, data]);
}
const docsPath = "/docs/contract/encodeFunctionResult";
function encodeFunctionResult(parameters) {
  const { abi: abi2, functionName, result } = parameters;
  let abiItem = abi2[0];
  if (functionName) {
    const item = getAbiItem({ abi: abi2, name: functionName });
    if (!item)
      throw new AbiFunctionNotFoundError(functionName, { docsPath });
    abiItem = item;
  }
  if (abiItem.type !== "function")
    throw new AbiFunctionNotFoundError(void 0, { docsPath });
  if (!abiItem.outputs)
    throw new AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath });
  const values = (() => {
    if (abiItem.outputs.length === 0)
      return [];
    if (abiItem.outputs.length === 1)
      return [result];
    if (Array.isArray(result))
      return result;
    throw new InvalidArrayError$1(result);
  })();
  return encodeAbiParameters(abiItem.outputs, values);
}
const localBatchGatewayUrl = "x-batch-gateway:true";
async function localBatchGatewayRequest(parameters) {
  const { data, ccipRequest } = parameters;
  const { args: [queries] } = decodeFunctionData({ abi: batchGatewayAbi, data });
  const failures = [];
  const responses = [];
  await Promise.all(queries.map(async (query, i) => {
    try {
      responses[i] = query.urls.includes(localBatchGatewayUrl) ? await localBatchGatewayRequest({ data: query.data, ccipRequest }) : await ccipRequest(query);
      failures[i] = false;
    } catch (err) {
      failures[i] = true;
      responses[i] = encodeError(err);
    }
  }));
  return encodeFunctionResult({
    abi: batchGatewayAbi,
    functionName: "query",
    result: [failures, responses]
  });
}
function encodeError(error) {
  if (error.name === "HttpRequestError" && error.status)
    return encodeErrorResult({
      abi: batchGatewayAbi,
      errorName: "HttpError",
      args: [error.status, error.shortMessage]
    });
  return encodeErrorResult({
    abi: [solidityError],
    errorName: "Error",
    args: ["shortMessage" in error ? error.shortMessage : error.message]
  });
}
function namehash(name) {
  let result = new Uint8Array(32).fill(0);
  if (!name)
    return bytesToHex$1(result);
  const labels = name.split(".");
  for (let i = labels.length - 1; i >= 0; i -= 1) {
    const hashFromEncodedLabel = encodedLabelToLabelhash(labels[i]);
    const hashed = hashFromEncodedLabel ? toBytes(hashFromEncodedLabel) : keccak256$1(stringToBytes(labels[i]), "bytes");
    result = keccak256$1(concat$1([result, hashed]), "bytes");
  }
  return bytesToHex$1(result);
}
function encodeLabelhash(hash2) {
  return `[${hash2.slice(2)}]`;
}
function packetToBytes(packet) {
  const value = packet.replace(/^\.|\.$/gm, "");
  if (value.length === 0)
    return new Uint8Array(1);
  const bytes = new Uint8Array(stringToBytes(value).byteLength + 2);
  let offset = 0;
  const list = value.split(".");
  for (let i = 0; i < list.length; i++) {
    let encoded = stringToBytes(list[i]);
    if (encoded.byteLength > 255)
      encoded = stringToBytes(encodeLabelhash(labelhash(list[i])));
    bytes[offset] = encoded.length;
    bytes.set(encoded, offset + 1);
    offset += encoded.length + 1;
  }
  if (bytes.byteLength !== offset + 1)
    return bytes.slice(0, offset + 1);
  return bytes;
}
async function getEnsAddress(client, parameters) {
  const { blockNumber, blockTag, coinType, name, gatewayUrls, strict } = parameters;
  const { chain } = client;
  const universalResolverAddress = (() => {
    if (parameters.universalResolverAddress)
      return parameters.universalResolverAddress;
    if (!chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    return getChainContractAddress({
      blockNumber,
      chain,
      contract: "ensUniversalResolver"
    });
  })();
  const tlds = chain?.ensTlds;
  if (tlds && !tlds.some((tld) => name.endsWith(tld)))
    return null;
  const args = (() => {
    if (coinType != null)
      return [namehash(name), BigInt(coinType)];
    return [namehash(name)];
  })();
  try {
    const functionData = encodeFunctionData({
      abi: addressResolverAbi,
      functionName: "addr",
      args
    });
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverResolveAbi,
      functionName: "resolveWithGateways",
      args: [
        toHex$1(packetToBytes(name)),
        functionData,
        gatewayUrls ?? [localBatchGatewayUrl]
      ],
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const res = await readContractAction(readContractParameters);
    if (res[0] === "0x")
      return null;
    const address = decodeFunctionResult({
      abi: addressResolverAbi,
      args,
      functionName: "addr",
      data: res[0]
    });
    if (address === "0x")
      return null;
    if (trim$2(address) === "0x00")
      return null;
    return address;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err))
      return null;
    throw err;
  }
}
class EnsAvatarInvalidMetadataError extends BaseError$2 {
  constructor({ data }) {
    super("Unable to extract image from metadata. The metadata may be malformed or invalid.", {
      metaMessages: [
        "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
        "",
        `Provided data: ${JSON.stringify(data)}`
      ],
      name: "EnsAvatarInvalidMetadataError"
    });
  }
}
class EnsAvatarInvalidNftUriError extends BaseError$2 {
  constructor({ reason }) {
    super(`ENS NFT avatar URI is invalid. ${reason}`, {
      name: "EnsAvatarInvalidNftUriError"
    });
  }
}
class EnsAvatarUriResolutionError extends BaseError$2 {
  constructor({ uri }) {
    super(`Unable to resolve ENS avatar URI "${uri}". The URI may be malformed, invalid, or does not respond with a valid image.`, { name: "EnsAvatarUriResolutionError" });
  }
}
class EnsAvatarUnsupportedNamespaceError extends BaseError$2 {
  constructor({ namespace }) {
    super(`ENS NFT avatar namespace "${namespace}" is not supported. Must be "erc721" or "erc1155".`, { name: "EnsAvatarUnsupportedNamespaceError" });
  }
}
class EnsInvalidChainIdError extends BaseError$2 {
  constructor({ chainId }) {
    super(`Invalid ENSIP-11 chainId: ${chainId}. Must be between 0 and 0x7fffffff, or 1.`, {
      name: "EnsInvalidChainIdError"
    });
  }
}
const networkRegex = /(?<protocol>https?:\/\/[^/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/;
const ipfsHashRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/;
const base64Regex = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/;
const dataURIRegex = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
async function isImageUri(uri) {
  try {
    const res = await fetch(uri, { method: "HEAD" });
    if (res.status === 200) {
      const contentType = res.headers.get("content-type");
      return contentType?.startsWith("image/");
    }
    return false;
  } catch (error) {
    if (typeof error === "object" && typeof error.response !== "undefined") {
      return false;
    }
    if (!Object.hasOwn(globalThis, "Image"))
      return false;
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(true);
      };
      img.onerror = () => {
        resolve(false);
      };
      img.src = uri;
    });
  }
}
function getGateway(custom, defaultGateway) {
  if (!custom)
    return defaultGateway;
  if (custom.endsWith("/"))
    return custom.slice(0, -1);
  return custom;
}
function resolveAvatarUri({ uri, gatewayUrls }) {
  const isEncoded = base64Regex.test(uri);
  if (isEncoded)
    return { uri, isOnChain: true, isEncoded };
  const ipfsGateway = getGateway(gatewayUrls?.ipfs, "https://ipfs.io");
  const arweaveGateway = getGateway(gatewayUrls?.arweave, "https://arweave.net");
  const networkRegexMatch = uri.match(networkRegex);
  const { protocol, subpath, target, subtarget = "" } = networkRegexMatch?.groups || {};
  const isIPNS = protocol === "ipns:/" || subpath === "ipns/";
  const isIPFS = protocol === "ipfs:/" || subpath === "ipfs/" || ipfsHashRegex.test(uri);
  if (uri.startsWith("http") && !isIPNS && !isIPFS) {
    let replacedUri = uri;
    if (gatewayUrls?.arweave)
      replacedUri = uri.replace(/https:\/\/arweave.net/g, gatewayUrls?.arweave);
    return { uri: replacedUri, isOnChain: false, isEncoded: false };
  }
  if ((isIPNS || isIPFS) && target) {
    return {
      uri: `${ipfsGateway}/${isIPNS ? "ipns" : "ipfs"}/${target}${subtarget}`,
      isOnChain: false,
      isEncoded: false
    };
  }
  if (protocol === "ar:/" && target) {
    return {
      uri: `${arweaveGateway}/${target}${subtarget || ""}`,
      isOnChain: false,
      isEncoded: false
    };
  }
  let parsedUri = uri.replace(dataURIRegex, "");
  if (parsedUri.startsWith("<svg")) {
    parsedUri = `data:image/svg+xml;base64,${btoa(parsedUri)}`;
  }
  if (parsedUri.startsWith("data:") || parsedUri.startsWith("{")) {
    return {
      uri: parsedUri,
      isOnChain: true,
      isEncoded: false
    };
  }
  throw new EnsAvatarUriResolutionError({ uri });
}
function getJsonImage(data) {
  if (typeof data !== "object" || !("image" in data) && !("image_url" in data) && !("image_data" in data)) {
    throw new EnsAvatarInvalidMetadataError({ data });
  }
  return data.image || data.image_url || data.image_data;
}
async function getMetadataAvatarUri({ gatewayUrls, uri }) {
  try {
    const res = await fetch(uri).then((res2) => res2.json());
    const image = await parseAvatarUri({
      gatewayUrls,
      uri: getJsonImage(res)
    });
    return image;
  } catch {
    throw new EnsAvatarUriResolutionError({ uri });
  }
}
async function parseAvatarUri({ gatewayUrls, uri }) {
  const { uri: resolvedURI, isOnChain } = resolveAvatarUri({ uri, gatewayUrls });
  if (isOnChain)
    return resolvedURI;
  const isImage = await isImageUri(resolvedURI);
  if (isImage)
    return resolvedURI;
  throw new EnsAvatarUriResolutionError({ uri });
}
function parseNftUri(uri_) {
  let uri = uri_;
  if (uri.startsWith("did:nft:")) {
    uri = uri.replace("did:nft:", "").replace(/_/g, "/");
  }
  const [reference, asset_namespace, tokenID] = uri.split("/");
  const [eip_namespace, chainID] = reference.split(":");
  const [erc_namespace, contractAddress] = asset_namespace.split(":");
  if (!eip_namespace || eip_namespace.toLowerCase() !== "eip155")
    throw new EnsAvatarInvalidNftUriError({ reason: "Only EIP-155 supported" });
  if (!chainID)
    throw new EnsAvatarInvalidNftUriError({ reason: "Chain ID not found" });
  if (!contractAddress)
    throw new EnsAvatarInvalidNftUriError({
      reason: "Contract address not found"
    });
  if (!tokenID)
    throw new EnsAvatarInvalidNftUriError({ reason: "Token ID not found" });
  if (!erc_namespace)
    throw new EnsAvatarInvalidNftUriError({ reason: "ERC namespace not found" });
  return {
    chainID: Number.parseInt(chainID, 10),
    namespace: erc_namespace.toLowerCase(),
    contractAddress,
    tokenID
  };
}
async function getNftTokenUri(client, { nft }) {
  if (nft.namespace === "erc721") {
    return readContract(client, {
      address: nft.contractAddress,
      abi: [
        {
          name: "tokenURI",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "tokenId", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "tokenURI",
      args: [BigInt(nft.tokenID)]
    });
  }
  if (nft.namespace === "erc1155") {
    return readContract(client, {
      address: nft.contractAddress,
      abi: [
        {
          name: "uri",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "_id", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "uri",
      args: [BigInt(nft.tokenID)]
    });
  }
  throw new EnsAvatarUnsupportedNamespaceError({ namespace: nft.namespace });
}
async function parseAvatarRecord(client, { gatewayUrls, record }) {
  if (/eip155:/i.test(record))
    return parseNftAvatarUri(client, { gatewayUrls, record });
  return parseAvatarUri({ uri: record, gatewayUrls });
}
async function parseNftAvatarUri(client, { gatewayUrls, record }) {
  const nft = parseNftUri(record);
  const nftUri = await getNftTokenUri(client, { nft });
  const { uri: resolvedNftUri, isOnChain, isEncoded } = resolveAvatarUri({ uri: nftUri, gatewayUrls });
  if (isOnChain && (resolvedNftUri.includes("data:application/json;base64,") || resolvedNftUri.startsWith("{"))) {
    const encodedJson = isEncoded ? (
      // if it is encoded, decode it
      atob(resolvedNftUri.replace("data:application/json;base64,", ""))
    ) : (
      // if it isn't encoded assume it is a JSON string, but it could be anything (it will error if it is)
      resolvedNftUri
    );
    const decoded = JSON.parse(encodedJson);
    return parseAvatarUri({ uri: getJsonImage(decoded), gatewayUrls });
  }
  let uriTokenId = nft.tokenID;
  if (nft.namespace === "erc1155")
    uriTokenId = uriTokenId.replace("0x", "").padStart(64, "0");
  return getMetadataAvatarUri({
    gatewayUrls,
    uri: resolvedNftUri.replace(/(?:0x)?{id}/, uriTokenId)
  });
}
async function getEnsText(client, parameters) {
  const { blockNumber, blockTag, key, name, gatewayUrls, strict } = parameters;
  const { chain } = client;
  const universalResolverAddress = (() => {
    if (parameters.universalResolverAddress)
      return parameters.universalResolverAddress;
    if (!chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    return getChainContractAddress({
      blockNumber,
      chain,
      contract: "ensUniversalResolver"
    });
  })();
  const tlds = chain?.ensTlds;
  if (tlds && !tlds.some((tld) => name.endsWith(tld)))
    return null;
  try {
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverResolveAbi,
      args: [
        toHex$1(packetToBytes(name)),
        encodeFunctionData({
          abi: textResolverAbi,
          functionName: "text",
          args: [namehash(name), key]
        }),
        gatewayUrls ?? [localBatchGatewayUrl]
      ],
      functionName: "resolveWithGateways",
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const res = await readContractAction(readContractParameters);
    if (res[0] === "0x")
      return null;
    const record = decodeFunctionResult({
      abi: textResolverAbi,
      functionName: "text",
      data: res[0]
    });
    return record === "" ? null : record;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err))
      return null;
    throw err;
  }
}
async function getEnsAvatar(client, { blockNumber, blockTag, assetGatewayUrls, name, gatewayUrls, strict, universalResolverAddress }) {
  const record = await getAction(client, getEnsText, "getEnsText")({
    blockNumber,
    blockTag,
    key: "avatar",
    name,
    universalResolverAddress,
    gatewayUrls,
    strict
  });
  if (!record)
    return null;
  try {
    return await parseAvatarRecord(client, {
      record,
      gatewayUrls: assetGatewayUrls
    });
  } catch {
    return null;
  }
}
async function getEnsName(client, parameters) {
  const { address, blockNumber, blockTag, coinType = 60n, gatewayUrls, strict } = parameters;
  const { chain } = client;
  const universalResolverAddress = (() => {
    if (parameters.universalResolverAddress)
      return parameters.universalResolverAddress;
    if (!chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    return getChainContractAddress({
      blockNumber,
      chain,
      contract: "ensUniversalResolver"
    });
  })();
  try {
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverReverseAbi,
      args: [address, coinType, gatewayUrls ?? [localBatchGatewayUrl]],
      functionName: "reverseWithGateways",
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const [name] = await readContractAction(readContractParameters);
    return name || null;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err))
      return null;
    throw err;
  }
}
async function getEnsResolver(client, parameters) {
  const { blockNumber, blockTag, name } = parameters;
  const { chain } = client;
  const universalResolverAddress = (() => {
    if (parameters.universalResolverAddress)
      return parameters.universalResolverAddress;
    if (!chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    return getChainContractAddress({
      blockNumber,
      chain,
      contract: "ensUniversalResolver"
    });
  })();
  const tlds = chain?.ensTlds;
  if (tlds && !tlds.some((tld) => name.endsWith(tld)))
    throw new Error(`${name} is not a valid ENS TLD (${tlds?.join(", ")}) for chain "${chain.name}" (id: ${chain.id}).`);
  const [resolverAddress] = await getAction(client, readContract, "readContract")({
    address: universalResolverAddress,
    abi: [
      {
        inputs: [{ type: "bytes" }],
        name: "findResolver",
        outputs: [
          { type: "address" },
          { type: "bytes32" },
          { type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "findResolver",
    args: [toHex$1(packetToBytes(name))],
    blockNumber,
    blockTag
  });
  return resolverAddress;
}
async function createAccessList(client, args) {
  const { account: account_ = client.account, blockNumber, blockTag = "latest", blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, to, value, ...rest } = args;
  const account = account_ ? parseAccount(account_) : void 0;
  try {
    assertRequest(args);
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request = format({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract$1(rest, { format: chainFormat }),
      account,
      blobs,
      data,
      gas,
      gasPrice,
      maxFeePerBlobGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      to,
      value
    }, "createAccessList");
    const response = await client.request({
      method: "eth_createAccessList",
      params: [request, block]
    });
    return {
      accessList: response.accessList,
      gasUsed: BigInt(response.gasUsed)
    };
  } catch (err) {
    throw getCallError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}
async function createBlockFilter(client) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newBlockFilter"
  });
  const id = await client.request({
    method: "eth_newBlockFilter"
  });
  return { id, request: getRequest(id), type: "block" };
}
async function createEventFilter(client, { address, args, event, events: events_, fromBlock, strict, toBlock } = {}) {
  const events = events_ ?? (event ? [event] : void 0);
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newFilter"
  });
  let topics = [];
  if (events) {
    const encoded = events.flatMap((event2) => encodeEventTopics({
      abi: [event2],
      eventName: event2.name,
      args
    }));
    topics = [encoded];
    if (event)
      topics = topics[0];
  }
  const id = await client.request({
    method: "eth_newFilter",
    params: [
      {
        address,
        fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
        toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
        ...topics.length ? { topics } : {}
      }
    ]
  });
  return {
    abi: events,
    args,
    eventName: event ? event.name : void 0,
    fromBlock,
    id,
    request: getRequest(id),
    strict: Boolean(strict),
    toBlock,
    type: "event"
  };
}
async function createPendingTransactionFilter(client) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newPendingTransactionFilter"
  });
  const id = await client.request({
    method: "eth_newPendingTransactionFilter"
  });
  return { id, request: getRequest(id), type: "transaction" };
}
async function getBalance(client, { address, blockNumber, blockTag = client.experimental_blockTag ?? "latest" }) {
  const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
  const balance = await client.request({
    method: "eth_getBalance",
    params: [address, blockNumberHex || blockTag]
  });
  return BigInt(balance);
}
async function getBlobBaseFee(client) {
  const baseFee = await client.request({
    method: "eth_blobBaseFee"
  });
  return BigInt(baseFee);
}
async function getBlockTransactionCount(client, { blockHash, blockNumber, blockTag = "latest" } = {}) {
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  let count;
  if (blockHash) {
    count = await client.request({
      method: "eth_getBlockTransactionCountByHash",
      params: [blockHash]
    }, { dedupe: true });
  } else {
    count = await client.request({
      method: "eth_getBlockTransactionCountByNumber",
      params: [blockNumberHex || blockTag]
    }, { dedupe: Boolean(blockNumberHex) });
  }
  return hexToNumber$1(count);
}
async function getCode(client, { address, blockNumber, blockTag = "latest" }) {
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  const hex = await client.request({
    method: "eth_getCode",
    params: [address, blockNumberHex || blockTag]
  }, { dedupe: Boolean(blockNumberHex) });
  if (hex === "0x")
    return void 0;
  return hex;
}
class Eip712DomainNotFoundError extends BaseError$2 {
  constructor({ address }) {
    super(`No EIP-712 domain found on contract "${address}".`, {
      metaMessages: [
        "Ensure that:",
        `- The contract is deployed at the address "${address}".`,
        "- `eip712Domain()` function exists on the contract.",
        "- `eip712Domain()` function matches signature to ERC-5267 specification."
      ],
      name: "Eip712DomainNotFoundError"
    });
  }
}
async function getEip712Domain(client, parameters) {
  const { address, factory, factoryData } = parameters;
  try {
    const [fields, name, version2, chainId, verifyingContract, salt, extensions] = await getAction(client, readContract, "readContract")({
      abi,
      address,
      functionName: "eip712Domain",
      factory,
      factoryData
    });
    return {
      domain: {
        name,
        version: version2,
        chainId: Number(chainId),
        verifyingContract,
        salt
      },
      extensions,
      fields
    };
  } catch (e) {
    const error = e;
    if (error.name === "ContractFunctionExecutionError" && error.cause.name === "ContractFunctionZeroDataError") {
      throw new Eip712DomainNotFoundError({ address });
    }
    throw error;
  }
}
const abi = [
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", type: "bytes1" },
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
      { name: "salt", type: "bytes32" },
      { name: "extensions", type: "uint256[]" }
    ],
    stateMutability: "view",
    type: "function"
  }
];
function formatFeeHistory(feeHistory) {
  return {
    baseFeePerGas: feeHistory.baseFeePerGas.map((value) => BigInt(value)),
    gasUsedRatio: feeHistory.gasUsedRatio,
    oldestBlock: BigInt(feeHistory.oldestBlock),
    reward: feeHistory.reward?.map((reward) => reward.map((value) => BigInt(value)))
  };
}
async function getFeeHistory(client, { blockCount, blockNumber, blockTag = "latest", rewardPercentiles }) {
  const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
  const feeHistory = await client.request({
    method: "eth_feeHistory",
    params: [
      numberToHex(blockCount),
      blockNumberHex || blockTag,
      rewardPercentiles
    ]
  }, { dedupe: Boolean(blockNumberHex) });
  return formatFeeHistory(feeHistory);
}
async function getFilterLogs(_client, { filter }) {
  const strict = filter.strict ?? false;
  const logs = await filter.request({
    method: "eth_getFilterLogs",
    params: [filter.id]
  });
  const formattedLogs = logs.map((log) => formatLog(log));
  if (!filter.abi)
    return formattedLogs;
  return parseEventLogs({
    abi: filter.abi,
    logs: formattedLogs,
    strict
  });
}
function encodePacked$1(types, values) {
  if (types.length !== values.length)
    throw new AbiEncodingLengthMismatchError({
      expectedLength: types.length,
      givenLength: values.length
    });
  const data = [];
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    const value = values[i];
    data.push(encode$3(type, value));
  }
  return concatHex(data);
}
function encode$3(type, value, isArray = false) {
  if (type === "address") {
    const address = value;
    if (!isAddress(address))
      throw new InvalidAddressError$1({ address });
    return pad$2(address.toLowerCase(), {
      size: isArray ? 32 : null
    });
  }
  if (type === "string")
    return stringToHex(value);
  if (type === "bytes")
    return value;
  if (type === "bool")
    return pad$2(boolToHex(value), { size: isArray ? 32 : 1 });
  const intMatch = type.match(integerRegex$2);
  if (intMatch) {
    const [_type, baseType, bits = "256"] = intMatch;
    const size2 = Number.parseInt(bits, 10) / 8;
    return numberToHex(value, {
      size: isArray ? 32 : size2,
      signed: baseType === "int"
    });
  }
  const bytesMatch = type.match(bytesRegex$2);
  if (bytesMatch) {
    const [_type, size2] = bytesMatch;
    if (Number.parseInt(size2, 10) !== (value.length - 2) / 2)
      throw new BytesSizeMismatchError$1({
        expectedSize: Number.parseInt(size2, 10),
        givenSize: (value.length - 2) / 2
      });
    return pad$2(value, { dir: "right", size: isArray ? 32 : null });
  }
  const arrayMatch = type.match(arrayRegex$1);
  if (arrayMatch && Array.isArray(value)) {
    const [_type, childType] = arrayMatch;
    const data = [];
    for (let i = 0; i < value.length; i++) {
      data.push(encode$3(childType, value[i], true));
    }
    if (data.length === 0)
      return "0x";
    return concatHex(data);
  }
  throw new UnsupportedPackedAbiType(type);
}
function assertTransactionEIP7702(transaction) {
  const { authorizationList } = transaction;
  if (authorizationList) {
    for (const authorization of authorizationList) {
      const { chainId } = authorization;
      const address = authorization.address;
      if (!isAddress(address))
        throw new InvalidAddressError$1({ address });
      if (chainId < 0)
        throw new InvalidChainIdError({ chainId });
    }
  }
  assertTransactionEIP1559(transaction);
}
function assertTransactionEIP4844(transaction) {
  const { blobVersionedHashes } = transaction;
  if (blobVersionedHashes) {
    if (blobVersionedHashes.length === 0)
      throw new EmptyBlobError();
    for (const hash2 of blobVersionedHashes) {
      const size_ = size$3(hash2);
      const version2 = hexToNumber$1(slice$2(hash2, 0, 1));
      if (size_ !== 32)
        throw new InvalidVersionedHashSizeError({ hash: hash2, size: size_ });
      if (version2 !== versionedHashVersionKzg)
        throw new InvalidVersionedHashVersionError({
          hash: hash2,
          version: version2
        });
    }
  }
  assertTransactionEIP1559(transaction);
}
function assertTransactionEIP1559(transaction) {
  const { chainId, maxPriorityFeePerGas, maxFeePerGas, to } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError$1({ address: to });
  if (maxFeePerGas && maxFeePerGas > maxUint256$1)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
function assertTransactionEIP2930(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError$1({ address: to });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError$2("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");
  if (gasPrice && gasPrice > maxUint256$1)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
function assertTransactionLegacy(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
  if (to && !isAddress(to))
    throw new InvalidAddressError$1({ address: to });
  if (typeof chainId !== "undefined" && chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError$2("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");
  if (gasPrice && gasPrice > maxUint256$1)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
function serializeAccessList(accessList) {
  if (!accessList || accessList.length === 0)
    return [];
  const serializedAccessList = [];
  for (let i = 0; i < accessList.length; i++) {
    const { address, storageKeys } = accessList[i];
    for (let j = 0; j < storageKeys.length; j++) {
      if (storageKeys[j].length - 2 !== 64) {
        throw new InvalidStorageKeySizeError({ storageKey: storageKeys[j] });
      }
    }
    if (!isAddress(address, { strict: false })) {
      throw new InvalidAddressError$1({ address });
    }
    serializedAccessList.push([address, storageKeys]);
  }
  return serializedAccessList;
}
function serializeTransaction(transaction, signature) {
  const type = getTransactionType(transaction);
  if (type === "eip1559")
    return serializeTransactionEIP1559(transaction, signature);
  if (type === "eip2930")
    return serializeTransactionEIP2930(transaction, signature);
  if (type === "eip4844")
    return serializeTransactionEIP4844(transaction, signature);
  if (type === "eip7702")
    return serializeTransactionEIP7702(transaction, signature);
  return serializeTransactionLegacy(transaction, signature);
}
function serializeTransactionEIP7702(transaction, signature) {
  const { authorizationList, chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP7702(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedAuthorizationList = serializeAuthorizationList(authorizationList);
  return concatHex([
    "0x04",
    toRlp([
      numberToHex(chainId),
      nonce ? numberToHex(nonce) : "0x",
      maxPriorityFeePerGas ? numberToHex(maxPriorityFeePerGas) : "0x",
      maxFeePerGas ? numberToHex(maxFeePerGas) : "0x",
      gas ? numberToHex(gas) : "0x",
      to ?? "0x",
      value ? numberToHex(value) : "0x",
      data ?? "0x",
      serializedAccessList,
      serializedAuthorizationList,
      ...toYParitySignatureArray(transaction, signature)
    ])
  ]);
}
function serializeTransactionEIP4844(transaction, signature) {
  const { chainId, gas, nonce, to, value, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP4844(transaction);
  let blobVersionedHashes = transaction.blobVersionedHashes;
  let sidecars = transaction.sidecars;
  if (transaction.blobs && (typeof blobVersionedHashes === "undefined" || typeof sidecars === "undefined")) {
    const blobs2 = typeof transaction.blobs[0] === "string" ? transaction.blobs : transaction.blobs.map((x) => bytesToHex$1(x));
    const kzg = transaction.kzg;
    const commitments2 = blobsToCommitments({
      blobs: blobs2,
      kzg
    });
    if (typeof blobVersionedHashes === "undefined")
      blobVersionedHashes = commitmentsToVersionedHashes({
        commitments: commitments2
      });
    if (typeof sidecars === "undefined") {
      const proofs2 = blobsToProofs({ blobs: blobs2, commitments: commitments2, kzg });
      sidecars = toBlobSidecars({ blobs: blobs2, commitments: commitments2, proofs: proofs2 });
    }
  }
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    numberToHex(chainId),
    nonce ? numberToHex(nonce) : "0x",
    maxPriorityFeePerGas ? numberToHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? numberToHex(maxFeePerGas) : "0x",
    gas ? numberToHex(gas) : "0x",
    to ?? "0x",
    value ? numberToHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    maxFeePerBlobGas ? numberToHex(maxFeePerBlobGas) : "0x",
    blobVersionedHashes ?? [],
    ...toYParitySignatureArray(transaction, signature)
  ];
  const blobs = [];
  const commitments = [];
  const proofs = [];
  if (sidecars)
    for (let i = 0; i < sidecars.length; i++) {
      const { blob, commitment, proof } = sidecars[i];
      blobs.push(blob);
      commitments.push(commitment);
      proofs.push(proof);
    }
  return concatHex([
    "0x03",
    sidecars ? (
      // If sidecars are enabled, envelope turns into a "wrapper":
      toRlp([serializedTransaction, blobs, commitments, proofs])
    ) : (
      // If sidecars are disabled, standard envelope is used:
      toRlp(serializedTransaction)
    )
  ]);
}
function serializeTransactionEIP1559(transaction, signature) {
  const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP1559(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    numberToHex(chainId),
    nonce ? numberToHex(nonce) : "0x",
    maxPriorityFeePerGas ? numberToHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? numberToHex(maxFeePerGas) : "0x",
    gas ? numberToHex(gas) : "0x",
    to ?? "0x",
    value ? numberToHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x02",
    toRlp(serializedTransaction)
  ]);
}
function serializeTransactionEIP2930(transaction, signature) {
  const { chainId, gas, data, nonce, to, value, accessList, gasPrice } = transaction;
  assertTransactionEIP2930(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    numberToHex(chainId),
    nonce ? numberToHex(nonce) : "0x",
    gasPrice ? numberToHex(gasPrice) : "0x",
    gas ? numberToHex(gas) : "0x",
    to ?? "0x",
    value ? numberToHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x01",
    toRlp(serializedTransaction)
  ]);
}
function serializeTransactionLegacy(transaction, signature) {
  const { chainId = 0, gas, data, nonce, to, value, gasPrice } = transaction;
  assertTransactionLegacy(transaction);
  let serializedTransaction = [
    nonce ? numberToHex(nonce) : "0x",
    gasPrice ? numberToHex(gasPrice) : "0x",
    gas ? numberToHex(gas) : "0x",
    to ?? "0x",
    value ? numberToHex(value) : "0x",
    data ?? "0x"
  ];
  if (signature) {
    const v = (() => {
      if (signature.v >= 35n) {
        const inferredChainId = (signature.v - 35n) / 2n;
        if (inferredChainId > 0)
          return signature.v;
        return 27n + (signature.v === 35n ? 0n : 1n);
      }
      if (chainId > 0)
        return BigInt(chainId * 2) + BigInt(35n + signature.v - 27n);
      const v2 = 27n + (signature.v === 27n ? 0n : 1n);
      if (signature.v !== v2)
        throw new InvalidLegacyVError({ v: signature.v });
      return v2;
    })();
    const r = trim$2(signature.r);
    const s = trim$2(signature.s);
    serializedTransaction = [
      ...serializedTransaction,
      numberToHex(v),
      r === "0x00" ? "0x" : r,
      s === "0x00" ? "0x" : s
    ];
  } else if (chainId > 0) {
    serializedTransaction = [
      ...serializedTransaction,
      numberToHex(chainId),
      "0x",
      "0x"
    ];
  }
  return toRlp(serializedTransaction);
}
function toYParitySignatureArray(transaction, signature_) {
  const signature = signature_ ?? transaction;
  const { v, yParity } = signature;
  if (typeof signature.r === "undefined")
    return [];
  if (typeof signature.s === "undefined")
    return [];
  if (typeof v === "undefined" && typeof yParity === "undefined")
    return [];
  const r = trim$2(signature.r);
  const s = trim$2(signature.s);
  const yParity_ = (() => {
    if (typeof yParity === "number")
      return yParity ? numberToHex(1) : "0x";
    if (v === 0n)
      return "0x";
    if (v === 1n)
      return numberToHex(1);
    return v === 27n ? "0x" : numberToHex(1);
  })();
  return [yParity_, r === "0x00" ? "0x" : r, s === "0x00" ? "0x" : s];
}
function serializeAuthorizationList(authorizationList) {
  if (!authorizationList || authorizationList.length === 0)
    return [];
  const serializedAuthorizationList = [];
  for (const authorization of authorizationList) {
    const { chainId, nonce, ...signature } = authorization;
    const contractAddress = authorization.address;
    serializedAuthorizationList.push([
      chainId ? toHex$1(chainId) : "0x",
      contractAddress,
      nonce ? toHex$1(nonce) : "0x",
      ...toYParitySignatureArray({}, signature)
    ]);
  }
  return serializedAuthorizationList;
}
async function verifyAuthorization({ address, authorization, signature }) {
  return isAddressEqual(getAddress(address), await recoverAuthorizationAddress({
    authorization,
    signature
  }));
}
const promiseCache = /* @__PURE__ */ new LruMap$1(8192);
function withDedupe(fn, { enabled = true, id }) {
  if (!enabled || !id)
    return fn();
  if (promiseCache.get(id))
    return promiseCache.get(id);
  const promise = fn().finally(() => promiseCache.delete(id));
  promiseCache.set(id, promise);
  return promise;
}
function buildRequest(request, options = {}) {
  return async (args, overrideOptions = {}) => {
    const { dedupe = false, methods, retryDelay = 150, retryCount = 3, uid: uid2 } = {
      ...options,
      ...overrideOptions
    };
    const { method } = args;
    if (methods?.exclude?.includes(method))
      throw new MethodNotSupportedRpcError(new Error("method not supported"), {
        method
      });
    if (methods?.include && !methods.include.includes(method))
      throw new MethodNotSupportedRpcError(new Error("method not supported"), {
        method
      });
    const requestId = dedupe ? stringToHex(`${uid2}.${stringify$1(args)}`) : void 0;
    return withDedupe(() => withRetry(async () => {
      try {
        return await request(args);
      } catch (err_) {
        const err = err_;
        switch (err.code) {
          case ParseRpcError.code:
            throw new ParseRpcError(err);
          case InvalidRequestRpcError.code:
            throw new InvalidRequestRpcError(err);
          case MethodNotFoundRpcError.code:
            throw new MethodNotFoundRpcError(err, { method: args.method });
          case InvalidParamsRpcError.code:
            throw new InvalidParamsRpcError(err);
          case InternalRpcError.code:
            throw new InternalRpcError(err);
          case InvalidInputRpcError.code:
            throw new InvalidInputRpcError(err);
          case ResourceNotFoundRpcError.code:
            throw new ResourceNotFoundRpcError(err);
          case ResourceUnavailableRpcError.code:
            throw new ResourceUnavailableRpcError(err);
          case TransactionRejectedRpcError.code:
            throw new TransactionRejectedRpcError(err);
          case MethodNotSupportedRpcError.code:
            throw new MethodNotSupportedRpcError(err, {
              method: args.method
            });
          case LimitExceededRpcError.code:
            throw new LimitExceededRpcError(err);
          case JsonRpcVersionUnsupportedError.code:
            throw new JsonRpcVersionUnsupportedError(err);
          case UserRejectedRequestError.code:
            throw new UserRejectedRequestError(err);
          case UnauthorizedProviderError.code:
            throw new UnauthorizedProviderError(err);
          case UnsupportedProviderMethodError.code:
            throw new UnsupportedProviderMethodError(err);
          case ProviderDisconnectedError.code:
            throw new ProviderDisconnectedError(err);
          case ChainDisconnectedError.code:
            throw new ChainDisconnectedError(err);
          case SwitchChainError.code:
            throw new SwitchChainError(err);
          case UnsupportedNonOptionalCapabilityError.code:
            throw new UnsupportedNonOptionalCapabilityError(err);
          case UnsupportedChainIdError.code:
            throw new UnsupportedChainIdError(err);
          case DuplicateIdError.code:
            throw new DuplicateIdError(err);
          case UnknownBundleIdError.code:
            throw new UnknownBundleIdError(err);
          case BundleTooLargeError.code:
            throw new BundleTooLargeError(err);
          case AtomicReadyWalletRejectedUpgradeError.code:
            throw new AtomicReadyWalletRejectedUpgradeError(err);
          case AtomicityNotSupportedError.code:
            throw new AtomicityNotSupportedError(err);
          case 5e3:
            throw new UserRejectedRequestError(err);
          default:
            if (err_ instanceof BaseError$2)
              throw err_;
            throw new UnknownRpcError(err);
        }
      }
    }, {
      delay: ({ count, error }) => {
        if (error && error instanceof HttpRequestError) {
          const retryAfter = error?.headers?.get("Retry-After");
          if (retryAfter?.match(/\d/))
            return Number.parseInt(retryAfter, 10) * 1e3;
        }
        return ~~(1 << count) * retryDelay;
      },
      retryCount,
      shouldRetry: ({ error }) => shouldRetry(error)
    }), { enabled: dedupe, id: requestId });
  };
}
function shouldRetry(error) {
  if ("code" in error && typeof error.code === "number") {
    if (error.code === -1)
      return true;
    if (error.code === LimitExceededRpcError.code)
      return true;
    if (error.code === InternalRpcError.code)
      return true;
    return false;
  }
  if (error instanceof HttpRequestError && error.status) {
    if (error.status === 403)
      return true;
    if (error.status === 408)
      return true;
    if (error.status === 413)
      return true;
    if (error.status === 429)
      return true;
    if (error.status === 500)
      return true;
    if (error.status === 502)
      return true;
    if (error.status === 503)
      return true;
    if (error.status === 504)
      return true;
    return false;
  }
  return true;
}
function createNonceManager(parameters) {
  const { source } = parameters;
  const deltaMap = /* @__PURE__ */ new Map();
  const nonceMap = new LruMap$1(8192);
  const promiseMap = /* @__PURE__ */ new Map();
  const getKey = ({ address, chainId }) => `${address}.${chainId}`;
  return {
    async consume({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      const promise = this.get({ address, chainId, client });
      this.increment({ address, chainId });
      const nonce = await promise;
      await source.set({ address, chainId }, nonce);
      nonceMap.set(key, nonce);
      return nonce;
    },
    async increment({ address, chainId }) {
      const key = getKey({ address, chainId });
      const delta = deltaMap.get(key) ?? 0;
      deltaMap.set(key, delta + 1);
    },
    async get({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      let promise = promiseMap.get(key);
      if (!promise) {
        promise = (async () => {
          try {
            const nonce = await source.get({ address, chainId, client });
            const previousNonce = nonceMap.get(key) ?? 0;
            if (previousNonce > 0 && nonce <= previousNonce)
              return previousNonce + 1;
            nonceMap.delete(key);
            return nonce;
          } finally {
            this.reset({ address, chainId });
          }
        })();
        promiseMap.set(key, promise);
      }
      const delta = deltaMap.get(key) ?? 0;
      return delta + await promise;
    },
    reset({ address, chainId }) {
      const key = getKey({ address, chainId });
      deltaMap.delete(key);
      promiseMap.delete(key);
    }
  };
}
function jsonRpc() {
  return {
    async get(parameters) {
      const { address, client } = parameters;
      return getTransactionCount(client, {
        address,
        blockTag: "pending"
      });
    },
    set() {
    }
  };
}
const nonceManager = /* @__PURE__ */ createNonceManager({
  source: jsonRpc()
});
function createIdStore() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    }
  };
}
const idCache = /* @__PURE__ */ createIdStore();
function getHttpRpcClient(url, options = {}) {
  return {
    async request(params) {
      const { body, fetchFn = options.fetchFn ?? fetch, onRequest = options.onRequest, onResponse = options.onResponse, timeout = options.timeout ?? 1e4 } = params;
      const fetchOptions = {
        ...options.fetchOptions ?? {},
        ...params.fetchOptions ?? {}
      };
      const { headers, method, signal: signal_ } = fetchOptions;
      try {
        const response = await withTimeout(async ({ signal }) => {
          const init = {
            ...fetchOptions,
            body: Array.isArray(body) ? stringify$1(body.map((body2) => ({
              jsonrpc: "2.0",
              id: body2.id ?? idCache.take(),
              ...body2
            }))) : stringify$1({
              jsonrpc: "2.0",
              id: body.id ?? idCache.take(),
              ...body
            }),
            headers: {
              "Content-Type": "application/json",
              ...headers
            },
            method: method || "POST",
            signal: signal_ || (timeout > 0 ? signal : null)
          };
          const request = new Request(url, init);
          const args = await onRequest?.(request, init) ?? { ...init, url };
          const response2 = await fetchFn(args.url ?? url, args);
          return response2;
        }, {
          errorInstance: new TimeoutError({ body, url }),
          timeout,
          signal: true
        });
        if (onResponse)
          await onResponse(response);
        let data;
        if (response.headers.get("Content-Type")?.startsWith("application/json"))
          data = await response.json();
        else {
          data = await response.text();
          try {
            data = JSON.parse(data || "{}");
          } catch (err) {
            if (response.ok)
              throw err;
            data = { error: data };
          }
        }
        if (!response.ok) {
          throw new HttpRequestError({
            body,
            details: stringify$1(data.error) || response.statusText,
            headers: response.headers,
            status: response.status,
            url
          });
        }
        return data;
      } catch (err) {
        if (err instanceof HttpRequestError)
          throw err;
        if (err instanceof TimeoutError)
          throw err;
        throw new HttpRequestError({
          body,
          cause: err,
          url
        });
      }
    }
  };
}
const presignMessagePrefix = "Ethereum Signed Message:\n";
function toPrefixedMessage(message_) {
  const message = (() => {
    if (typeof message_ === "string")
      return stringToHex(message_);
    if (typeof message_.raw === "string")
      return message_.raw;
    return bytesToHex$1(message_.raw);
  })();
  const prefix = stringToHex(`${presignMessagePrefix}${size$3(message)}`);
  return concat$1([prefix, message]);
}
function hashMessage(message, to_) {
  return keccak256$1(toPrefixedMessage(message), to_);
}
const erc6492MagicBytes = "0x6492649264926492649264926492649264926492649264926492649264926492";
const zeroHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
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
const caches = {
  checksum: /* @__PURE__ */ new LruMap(8192)
};
const checksum$1 = caches.checksum;
function keccak256(value, options = {}) {
  const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = keccak_256(from$a(value));
  if (as === "Bytes")
    return bytes;
  return fromBytes$2(bytes);
}
function assert$4(publicKey, options = {}) {
  const { compressed } = options;
  const { prefix, x, y } = publicKey;
  if (compressed === false || typeof x === "bigint" && typeof y === "bigint") {
    if (prefix !== 4)
      throw new InvalidPrefixError({
        prefix,
        cause: new InvalidUncompressedPrefixError()
      });
    return;
  }
  if (compressed === true || typeof x === "bigint" && typeof y === "undefined") {
    if (prefix !== 3 && prefix !== 2)
      throw new InvalidPrefixError({
        prefix,
        cause: new InvalidCompressedPrefixError()
      });
    return;
  }
  throw new InvalidError({ publicKey });
}
function from$8(value) {
  const publicKey = (() => {
    if (validate$3(value))
      return fromHex$2(value);
    if (validate$4(value))
      return fromBytes$1(value);
    const { prefix, x, y } = value;
    if (typeof x === "bigint" && typeof y === "bigint")
      return { prefix: prefix ?? 4, x, y };
    return { prefix, x };
  })();
  assert$4(publicKey);
  return publicKey;
}
function fromBytes$1(publicKey) {
  return fromHex$2(fromBytes$2(publicKey));
}
function fromHex$2(publicKey) {
  if (publicKey.length !== 132 && publicKey.length !== 130 && publicKey.length !== 68)
    throw new InvalidSerializedSizeError$1({ publicKey });
  if (publicKey.length === 130) {
    const x2 = BigInt(slice(publicKey, 0, 32));
    const y = BigInt(slice(publicKey, 32, 64));
    return {
      prefix: 4,
      x: x2,
      y
    };
  }
  if (publicKey.length === 132) {
    const prefix2 = Number(slice(publicKey, 0, 1));
    const x2 = BigInt(slice(publicKey, 1, 33));
    const y = BigInt(slice(publicKey, 33, 65));
    return {
      prefix: prefix2,
      x: x2,
      y
    };
  }
  const prefix = Number(slice(publicKey, 0, 1));
  const x = BigInt(slice(publicKey, 1, 33));
  return {
    prefix,
    x
  };
}
function toHex(publicKey, options = {}) {
  assert$4(publicKey);
  const { prefix, x, y } = publicKey;
  const { includePrefix = true } = options;
  const publicKey_ = concat(
    includePrefix ? fromNumber(prefix, { size: 1 }) : "0x",
    fromNumber(x, { size: 32 }),
    // If the public key is not compressed, add the y coordinate.
    typeof y === "bigint" ? fromNumber(y, { size: 32 }) : "0x"
  );
  return publicKey_;
}
class InvalidError extends BaseError2 {
  constructor({ publicKey }) {
    super(`Value \`${stringify(publicKey)}\` is not a valid public key.`, {
      metaMessages: [
        "Public key must contain:",
        "- an `x` and `prefix` value (compressed)",
        "- an `x`, `y`, and `prefix` value (uncompressed)"
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidError"
    });
  }
}
class InvalidPrefixError extends BaseError2 {
  constructor({ prefix, cause }) {
    super(`Prefix "${prefix}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidPrefixError"
    });
  }
}
class InvalidCompressedPrefixError extends BaseError2 {
  constructor() {
    super("Prefix must be 2 or 3 for compressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidCompressedPrefixError"
    });
  }
}
class InvalidUncompressedPrefixError extends BaseError2 {
  constructor() {
    super("Prefix must be 4 for uncompressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidUncompressedPrefixError"
    });
  }
}
let InvalidSerializedSizeError$1 = class InvalidSerializedSizeError extends BaseError2 {
  constructor({ publicKey }) {
    super(`Value \`${publicKey}\` is an invalid public key size.`, {
      metaMessages: [
        "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
        `Received ${size$1(from$9(publicKey))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidSerializedSizeError"
    });
  }
};
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
function assert$3(value, options = {}) {
  const { strict = true } = options;
  if (!addressRegex.test(value))
    throw new InvalidAddressError({
      address: value,
      cause: new InvalidInputError()
    });
  if (strict) {
    if (value.toLowerCase() === value)
      return;
    if (checksum(value) !== value)
      throw new InvalidAddressError({
        address: value,
        cause: new InvalidChecksumError()
      });
  }
}
function checksum(address) {
  if (checksum$1.has(address))
    return checksum$1.get(address);
  assert$3(address, { strict: false });
  const hexAddress = address.substring(2).toLowerCase();
  const hash2 = keccak256(fromString$1(hexAddress), { as: "Bytes" });
  const characters = hexAddress.split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash2[i >> 1] >> 4 >= 8 && characters[i]) {
      characters[i] = characters[i].toUpperCase();
    }
    if ((hash2[i >> 1] & 15) >= 8 && characters[i + 1]) {
      characters[i + 1] = characters[i + 1].toUpperCase();
    }
  }
  const result = `0x${characters.join("")}`;
  checksum$1.set(address, result);
  return result;
}
function from$7(address, options = {}) {
  const { checksum: checksumVal = false } = options;
  assert$3(address);
  if (checksumVal)
    return checksum(address);
  return address;
}
function fromPublicKey(publicKey, options = {}) {
  const address = keccak256(`0x${toHex(publicKey).slice(4)}`).substring(26);
  return from$7(`0x${address}`, options);
}
function validate$2(address, options = {}) {
  const { strict = true } = options ?? {};
  try {
    assert$3(address, { strict });
    return true;
  } catch {
    return false;
  }
}
class InvalidAddressError extends BaseError2 {
  constructor({ address, cause }) {
    super(`Address "${address}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidAddressError"
    });
  }
}
class InvalidInputError extends BaseError2 {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidInputError"
    });
  }
}
class InvalidChecksumError extends BaseError2 {
  constructor() {
    super("Address does not match its checksum counterpart.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidChecksumError"
    });
  }
}
const arrayRegex = /^(.*)\[([0-9]*)\]$/;
const bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
const integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
const maxUint256 = 2n ** 256n - 1n;
function decodeParameter(cursor, param, options) {
  const { checksumAddress: checksumAddress2, staticPosition } = options;
  const arrayComponents = getArrayComponents(param.type);
  if (arrayComponents) {
    const [length, type] = arrayComponents;
    return decodeArray(cursor, { ...param, type }, { checksumAddress: checksumAddress2, length, staticPosition });
  }
  if (param.type === "tuple")
    return decodeTuple(cursor, param, {
      checksumAddress: checksumAddress2,
      staticPosition
    });
  if (param.type === "address")
    return decodeAddress(cursor, { checksum: checksumAddress2 });
  if (param.type === "bool")
    return decodeBool(cursor);
  if (param.type.startsWith("bytes"))
    return decodeBytes(cursor, param, { staticPosition });
  if (param.type.startsWith("uint") || param.type.startsWith("int"))
    return decodeNumber(cursor, param);
  if (param.type === "string")
    return decodeString(cursor, { staticPosition });
  throw new InvalidTypeError(param.type);
}
const sizeOfLength = 32;
const sizeOfOffset = 32;
function decodeAddress(cursor, options = {}) {
  const { checksum: checksum$12 = false } = options;
  const value = cursor.readBytes(32);
  const wrap2 = (address) => checksum$12 ? checksum(address) : address;
  return [wrap2(fromBytes$2(slice$1(value, -20))), 32];
}
function decodeArray(cursor, param, options) {
  const { checksumAddress: checksumAddress2, length, staticPosition } = options;
  if (!length) {
    const offset = toNumber$1(cursor.readBytes(sizeOfOffset));
    const start = staticPosition + offset;
    const startOfData = start + sizeOfLength;
    cursor.setPosition(start);
    const length2 = toNumber$1(cursor.readBytes(sizeOfLength));
    const dynamicChild = hasDynamicChild(param);
    let consumed2 = 0;
    const value2 = [];
    for (let i = 0; i < length2; ++i) {
      cursor.setPosition(startOfData + (dynamicChild ? i * 32 : consumed2));
      const [data, consumed_] = decodeParameter(cursor, param, {
        checksumAddress: checksumAddress2,
        staticPosition: startOfData
      });
      consumed2 += consumed_;
      value2.push(data);
    }
    cursor.setPosition(staticPosition + 32);
    return [value2, 32];
  }
  if (hasDynamicChild(param)) {
    const offset = toNumber$1(cursor.readBytes(sizeOfOffset));
    const start = staticPosition + offset;
    const value2 = [];
    for (let i = 0; i < length; ++i) {
      cursor.setPosition(start + i * 32);
      const [data] = decodeParameter(cursor, param, {
        checksumAddress: checksumAddress2,
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
      checksumAddress: checksumAddress2,
      staticPosition: staticPosition + consumed
    });
    consumed += consumed_;
    value.push(data);
  }
  return [value, consumed];
}
function decodeBool(cursor) {
  return [toBoolean(cursor.readBytes(32), { size: 32 }), 32];
}
function decodeBytes(cursor, param, { staticPosition }) {
  const [_, size2] = param.type.split("bytes");
  if (!size2) {
    const offset = toNumber$1(cursor.readBytes(32));
    cursor.setPosition(staticPosition + offset);
    const length = toNumber$1(cursor.readBytes(32));
    if (length === 0) {
      cursor.setPosition(staticPosition + 32);
      return ["0x", 32];
    }
    const data = cursor.readBytes(length);
    cursor.setPosition(staticPosition + 32);
    return [fromBytes$2(data), 32];
  }
  const value = fromBytes$2(cursor.readBytes(Number.parseInt(size2, 10), 32));
  return [value, 32];
}
function decodeNumber(cursor, param) {
  const signed = param.type.startsWith("int");
  const size2 = Number.parseInt(param.type.split("int")[1] || "256", 10);
  const value = cursor.readBytes(32);
  return [
    size2 > 48 ? toBigInt$1(value, { signed }) : toNumber$1(value, { signed }),
    32
  ];
}
function decodeTuple(cursor, param, options) {
  const { checksumAddress: checksumAddress2, staticPosition } = options;
  const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
  const value = hasUnnamedChild ? [] : {};
  let consumed = 0;
  if (hasDynamicChild(param)) {
    const offset = toNumber$1(cursor.readBytes(sizeOfOffset));
    const start = staticPosition + offset;
    for (let i = 0; i < param.components.length; ++i) {
      const component = param.components[i];
      cursor.setPosition(start + consumed);
      const [data, consumed_] = decodeParameter(cursor, component, {
        checksumAddress: checksumAddress2,
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
      checksumAddress: checksumAddress2,
      staticPosition
    });
    value[hasUnnamedChild ? i : component?.name] = data;
    consumed += consumed_;
  }
  return [value, consumed];
}
function decodeString(cursor, { staticPosition }) {
  const offset = toNumber$1(cursor.readBytes(32));
  const start = staticPosition + offset;
  cursor.setPosition(start);
  const length = toNumber$1(cursor.readBytes(32));
  if (length === 0) {
    cursor.setPosition(staticPosition + 32);
    return ["", 32];
  }
  const data = cursor.readBytes(length, 32);
  const value = toString(trimLeft$1(data));
  cursor.setPosition(staticPosition + 32);
  return [value, 32];
}
function prepareParameters({ checksumAddress: checksumAddress2, parameters, values }) {
  const preparedParameters = [];
  for (let i = 0; i < parameters.length; i++) {
    preparedParameters.push(prepareParameter({
      checksumAddress: checksumAddress2,
      parameter: parameters[i],
      value: values[i]
    }));
  }
  return preparedParameters;
}
function prepareParameter({ checksumAddress: checksumAddress2 = false, parameter: parameter_, value }) {
  const parameter = parameter_;
  const arrayComponents = getArrayComponents(parameter.type);
  if (arrayComponents) {
    const [length, type] = arrayComponents;
    return encodeArray(value, {
      checksumAddress: checksumAddress2,
      length,
      parameter: {
        ...parameter,
        type
      }
    });
  }
  if (parameter.type === "tuple") {
    return encodeTuple(value, {
      checksumAddress: checksumAddress2,
      parameter
    });
  }
  if (parameter.type === "address") {
    return encodeAddress(value, {
      checksum: checksumAddress2
    });
  }
  if (parameter.type === "bool") {
    return encodeBoolean(value);
  }
  if (parameter.type.startsWith("uint") || parameter.type.startsWith("int")) {
    const signed = parameter.type.startsWith("int");
    const [, , size2 = "256"] = integerRegex.exec(parameter.type) ?? [];
    return encodeNumber(value, {
      signed,
      size: Number(size2)
    });
  }
  if (parameter.type.startsWith("bytes")) {
    return encodeBytes(value, { type: parameter.type });
  }
  if (parameter.type === "string") {
    return encodeString(value);
  }
  throw new InvalidTypeError(parameter.type);
}
function encode$2(preparedParameters) {
  let staticSize = 0;
  for (let i = 0; i < preparedParameters.length; i++) {
    const { dynamic, encoded } = preparedParameters[i];
    if (dynamic)
      staticSize += 32;
    else
      staticSize += size$1(encoded);
  }
  const staticParameters = [];
  const dynamicParameters = [];
  let dynamicSize = 0;
  for (let i = 0; i < preparedParameters.length; i++) {
    const { dynamic, encoded } = preparedParameters[i];
    if (dynamic) {
      staticParameters.push(fromNumber(staticSize + dynamicSize, { size: 32 }));
      dynamicParameters.push(encoded);
      dynamicSize += size$1(encoded);
    } else {
      staticParameters.push(encoded);
    }
  }
  return concat(...staticParameters, ...dynamicParameters);
}
function encodeAddress(value, options) {
  const { checksum: checksum2 = false } = options;
  assert$3(value, { strict: checksum2 });
  return {
    dynamic: false,
    encoded: padLeft(value.toLowerCase())
  };
}
function encodeArray(value, options) {
  const { checksumAddress: checksumAddress2, length, parameter } = options;
  const dynamic = length === null;
  if (!Array.isArray(value))
    throw new InvalidArrayError(value);
  if (!dynamic && value.length !== length)
    throw new ArrayLengthMismatchError({
      expectedLength: length,
      givenLength: value.length,
      type: `${parameter.type}[${length}]`
    });
  let dynamicChild = false;
  const preparedParameters = [];
  for (let i = 0; i < value.length; i++) {
    const preparedParam = prepareParameter({
      checksumAddress: checksumAddress2,
      parameter,
      value: value[i]
    });
    if (preparedParam.dynamic)
      dynamicChild = true;
    preparedParameters.push(preparedParam);
  }
  if (dynamic || dynamicChild) {
    const data = encode$2(preparedParameters);
    if (dynamic) {
      const length2 = fromNumber(preparedParameters.length, { size: 32 });
      return {
        dynamic: true,
        encoded: preparedParameters.length > 0 ? concat(length2, data) : length2
      };
    }
    if (dynamicChild)
      return { dynamic: true, encoded: data };
  }
  return {
    dynamic: false,
    encoded: concat(...preparedParameters.map(({ encoded }) => encoded))
  };
}
function encodeBytes(value, { type }) {
  const [, parametersize] = type.split("bytes");
  const bytesSize = size$1(value);
  if (!parametersize) {
    let value_ = value;
    if (bytesSize % 32 !== 0)
      value_ = padRight(value_, Math.ceil((value.length - 2) / 2 / 32) * 32);
    return {
      dynamic: true,
      encoded: concat(padLeft(fromNumber(bytesSize, { size: 32 })), value_)
    };
  }
  if (bytesSize !== Number.parseInt(parametersize, 10))
    throw new BytesSizeMismatchError({
      expectedSize: Number.parseInt(parametersize, 10),
      value
    });
  return { dynamic: false, encoded: padRight(value) };
}
function encodeBoolean(value) {
  if (typeof value !== "boolean")
    throw new BaseError2(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
  return { dynamic: false, encoded: padLeft(fromBoolean(value)) };
}
function encodeNumber(value, { signed, size: size2 }) {
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
    encoded: fromNumber(value, {
      size: 32,
      signed
    })
  };
}
function encodeString(value) {
  const hexValue = fromString(value);
  const partsLength = Math.ceil(size$1(hexValue) / 32);
  const parts = [];
  for (let i = 0; i < partsLength; i++) {
    parts.push(padRight(slice(hexValue, i * 32, (i + 1) * 32)));
  }
  return {
    dynamic: true,
    encoded: concat(padRight(fromNumber(size$1(hexValue), { size: 32 })), ...parts)
  };
}
function encodeTuple(value, options) {
  const { checksumAddress: checksumAddress2, parameter } = options;
  let dynamic = false;
  const preparedParameters = [];
  for (let i = 0; i < parameter.components.length; i++) {
    const param_ = parameter.components[i];
    const index2 = Array.isArray(value) ? i : param_.name;
    const preparedParam = prepareParameter({
      checksumAddress: checksumAddress2,
      parameter: param_,
      value: value[index2]
    });
    preparedParameters.push(preparedParam);
    if (preparedParam.dynamic)
      dynamic = true;
  }
  return {
    dynamic,
    encoded: dynamic ? encode$2(preparedParameters) : concat(...preparedParameters.map(({ encoded }) => encoded))
  };
}
function getArrayComponents(type) {
  const matches = type.match(/^(.*)\[(\d+)?\]$/);
  return matches ? (
    // Return `null` if the array is dynamic.
    [matches[2] ? Number(matches[2]) : null, matches[1]]
  ) : void 0;
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
  const arrayComponents = getArrayComponents(param.type);
  if (arrayComponents && hasDynamicChild({
    ...param,
    type: arrayComponents[1]
  }))
    return true;
  return false;
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
function create(bytes, { recursiveReadLimit = 8192 } = {}) {
  const cursor = Object.create(staticCursor);
  cursor.bytes = bytes;
  cursor.dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  cursor.positionReadCount = /* @__PURE__ */ new Map();
  cursor.recursiveReadLimit = recursiveReadLimit;
  return cursor;
}
class NegativeOffsetError extends BaseError2 {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.NegativeOffsetError"
    });
  }
}
class PositionOutOfBoundsError extends BaseError2 {
  constructor({ length, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.PositionOutOfBoundsError"
    });
  }
}
class RecursiveReadLimitExceededError extends BaseError2 {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.RecursiveReadLimitExceededError"
    });
  }
}
function decode(parameters, data, options = {}) {
  const { as = "Array", checksumAddress: checksumAddress2 = false } = options;
  const bytes = typeof data === "string" ? fromHex$3(data) : data;
  const cursor = create(bytes);
  if (size$2(bytes) === 0 && parameters.length > 0)
    throw new ZeroDataError();
  if (size$2(bytes) && size$2(bytes) < 32)
    throw new DataSizeTooSmallError({
      data: typeof data === "string" ? data : fromBytes$2(data),
      parameters,
      size: size$2(bytes)
    });
  let consumed = 0;
  const values = as === "Array" ? [] : {};
  for (let i = 0; i < parameters.length; ++i) {
    const param = parameters[i];
    cursor.setPosition(consumed);
    const [data2, consumed_] = decodeParameter(cursor, param, {
      checksumAddress: checksumAddress2,
      staticPosition: 0
    });
    consumed += consumed_;
    if (as === "Array")
      values.push(data2);
    else
      values[param.name ?? i] = data2;
  }
  return values;
}
function encode$1(parameters, values, options) {
  const { checksumAddress: checksumAddress2 = false } = {};
  if (parameters.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: parameters.length,
      givenLength: values.length
    });
  const preparedParameters = prepareParameters({
    checksumAddress: checksumAddress2,
    parameters,
    values
  });
  const data = encode$2(preparedParameters);
  if (data.length === 0)
    return "0x";
  return data;
}
function encodePacked(types, values) {
  if (types.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: types.length,
      givenLength: values.length
    });
  const data = [];
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    const value = values[i];
    data.push(encodePacked.encode(type, value));
  }
  return concat(...data);
}
(function(encodePacked2) {
  function encode2(type, value, isArray = false) {
    if (type === "address") {
      const address = value;
      assert$3(address);
      return padLeft(address.toLowerCase(), isArray ? 32 : 0);
    }
    if (type === "string")
      return fromString(value);
    if (type === "bytes")
      return value;
    if (type === "bool")
      return padLeft(fromBoolean(value), isArray ? 32 : 1);
    const intMatch = type.match(integerRegex);
    if (intMatch) {
      const [_type, baseType, bits = "256"] = intMatch;
      const size2 = Number.parseInt(bits, 10) / 8;
      return fromNumber(value, {
        size: isArray ? 32 : size2,
        signed: baseType === "int"
      });
    }
    const bytesMatch = type.match(bytesRegex);
    if (bytesMatch) {
      const [_type, size2] = bytesMatch;
      if (Number.parseInt(size2, 10) !== (value.length - 2) / 2)
        throw new BytesSizeMismatchError({
          expectedSize: Number.parseInt(size2, 10),
          value
        });
      return padRight(value, isArray ? 32 : 0);
    }
    const arrayMatch = type.match(arrayRegex);
    if (arrayMatch && Array.isArray(value)) {
      const [_type, childType] = arrayMatch;
      const data = [];
      for (let i = 0; i < value.length; i++) {
        data.push(encode2(childType, value[i], true));
      }
      if (data.length === 0)
        return "0x";
      return concat(...data);
    }
    throw new InvalidTypeError(type);
  }
  encodePacked2.encode = encode2;
})(encodePacked || (encodePacked = {}));
function from$6(parameters) {
  if (Array.isArray(parameters) && typeof parameters[0] === "string")
    return parseAbiParameters(parameters);
  if (typeof parameters === "string")
    return parseAbiParameters(parameters);
  return parameters;
}
class DataSizeTooSmallError extends BaseError2 {
  constructor({ data, parameters, size: size2 }) {
    super(`Data size of ${size2} bytes is too small for given parameters.`, {
      metaMessages: [
        `Params: (${formatAbiParameters(parameters)})`,
        `Data:   ${data} (${size2} bytes)`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.DataSizeTooSmallError"
    });
  }
}
class ZeroDataError extends BaseError2 {
  constructor() {
    super('Cannot decode zero data ("0x") with ABI parameters.');
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.ZeroDataError"
    });
  }
}
class ArrayLengthMismatchError extends BaseError2 {
  constructor({ expectedLength, givenLength, type }) {
    super(`Array length mismatch for type \`${type}\`. Expected: \`${expectedLength}\`. Given: \`${givenLength}\`.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.ArrayLengthMismatchError"
    });
  }
}
class BytesSizeMismatchError extends BaseError2 {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size$1(value)}) does not match expected size (bytes${expectedSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.BytesSizeMismatchError"
    });
  }
}
class LengthMismatchError extends BaseError2 {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding parameters/values length mismatch.",
      `Expected length (parameters): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.LengthMismatchError"
    });
  }
}
class InvalidArrayError extends BaseError2 {
  constructor(value) {
    super(`Value \`${value}\` is not a valid array.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidArrayError"
    });
  }
}
class InvalidTypeError extends BaseError2 {
  constructor(type) {
    super(`Type \`${type}\` is not a valid ABI Type.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidTypeError"
    });
  }
}
function from$5(value, options) {
  const { as } = options;
  const encodable = getEncodable(value);
  const cursor = create(new Uint8Array(encodable.length));
  encodable.encode(cursor);
  if (as === "Hex")
    return fromBytes$2(cursor.bytes);
  return cursor.bytes;
}
function fromHex$1(hex, options = {}) {
  const { as = "Hex" } = options;
  return from$5(hex, { as });
}
function getEncodable(bytes) {
  if (Array.isArray(bytes))
    return getEncodableList(bytes.map((x) => getEncodable(x)));
  return getEncodableBytes(bytes);
}
function getEncodableList(list) {
  const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
  const sizeOfBodyLength = getSizeOfLength(bodyLength);
  const length = (() => {
    if (bodyLength <= 55)
      return 1 + bodyLength;
    return 1 + sizeOfBodyLength + bodyLength;
  })();
  return {
    length,
    encode(cursor) {
      if (bodyLength <= 55) {
        cursor.pushByte(192 + bodyLength);
      } else {
        cursor.pushByte(192 + 55 + sizeOfBodyLength);
        if (sizeOfBodyLength === 1)
          cursor.pushUint8(bodyLength);
        else if (sizeOfBodyLength === 2)
          cursor.pushUint16(bodyLength);
        else if (sizeOfBodyLength === 3)
          cursor.pushUint24(bodyLength);
        else
          cursor.pushUint32(bodyLength);
      }
      for (const { encode: encode2 } of list) {
        encode2(cursor);
      }
    }
  };
}
function getEncodableBytes(bytesOrHex) {
  const bytes = typeof bytesOrHex === "string" ? fromHex$3(bytesOrHex) : bytesOrHex;
  const sizeOfBytesLength = getSizeOfLength(bytes.length);
  const length = (() => {
    if (bytes.length === 1 && bytes[0] < 128)
      return 1;
    if (bytes.length <= 55)
      return 1 + bytes.length;
    return 1 + sizeOfBytesLength + bytes.length;
  })();
  return {
    length,
    encode(cursor) {
      if (bytes.length === 1 && bytes[0] < 128) {
        cursor.pushBytes(bytes);
      } else if (bytes.length <= 55) {
        cursor.pushByte(128 + bytes.length);
        cursor.pushBytes(bytes);
      } else {
        cursor.pushByte(128 + 55 + sizeOfBytesLength);
        if (sizeOfBytesLength === 1)
          cursor.pushUint8(bytes.length);
        else if (sizeOfBytesLength === 2)
          cursor.pushUint16(bytes.length);
        else if (sizeOfBytesLength === 3)
          cursor.pushUint24(bytes.length);
        else
          cursor.pushUint32(bytes.length);
        cursor.pushBytes(bytes);
      }
    }
  };
}
function getSizeOfLength(length) {
  if (length < 2 ** 8)
    return 1;
  if (length < 2 ** 16)
    return 2;
  if (length < 2 ** 24)
    return 3;
  if (length < 2 ** 32)
    return 4;
  throw new BaseError2("Length is too large.");
}
class HMAC extends Hash {
  constructor(hash2, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    ahash(hash2);
    const key = toBytes$1(_key);
    this.iHash = hash2.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad2 = new Uint8Array(blockLen);
    pad2.set(key.length > blockLen ? hash2.create().update(key).digest() : key);
    for (let i = 0; i < pad2.length; i++)
      pad2[i] ^= 54;
    this.iHash.update(pad2);
    this.oHash = hash2.create();
    for (let i = 0; i < pad2.length; i++)
      pad2[i] ^= 54 ^ 92;
    this.oHash.update(pad2);
    clean(pad2);
  }
  update(buf) {
    aexists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists(this);
    abytes$1(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
}
const hmac = (hash2, key, message) => new HMAC(hash2, key).update(message).digest();
hmac.create = (hash2, key) => new HMAC(hash2, key);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$3 = BigInt(0), _1n$3 = BigInt(1), _2n$1 = /* @__PURE__ */ BigInt(2), _3n$1 = /* @__PURE__ */ BigInt(3);
const _4n$1 = /* @__PURE__ */ BigInt(4), _5n = /* @__PURE__ */ BigInt(5), _8n = /* @__PURE__ */ BigInt(8);
function mod(a, b) {
  const result = a % b;
  return result >= _0n$3 ? result : b + result;
}
function pow2(x, power, modulo) {
  let res = x;
  while (power-- > _0n$3) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number, modulo) {
  if (number === _0n$3)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n$3)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a = mod(number, modulo);
  let b = modulo;
  let x = _0n$3, u = _1n$3;
  while (a !== _0n$3) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    b = a, a = r, x = u, u = m;
  }
  const gcd = b;
  if (gcd !== _1n$3)
    throw new Error("invert: does not exist");
  return mod(x, modulo);
}
function sqrt3mod4(Fp, n) {
  const p1div4 = (Fp.ORDER + _1n$3) / _4n$1;
  const root = Fp.pow(n, p1div4);
  if (!Fp.eql(Fp.sqr(root), n))
    throw new Error("Cannot find square root");
  return root;
}
function sqrt5mod8(Fp, n) {
  const p5div8 = (Fp.ORDER - _5n) / _8n;
  const n2 = Fp.mul(n, _2n$1);
  const v = Fp.pow(n2, p5div8);
  const nv = Fp.mul(n, v);
  const i = Fp.mul(Fp.mul(nv, _2n$1), v);
  const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
  if (!Fp.eql(Fp.sqr(root), n))
    throw new Error("Cannot find square root");
  return root;
}
function tonelliShanks(P) {
  if (P < BigInt(3))
    throw new Error("sqrt is not defined for small field");
  let Q = P - _1n$3;
  let S = 0;
  while (Q % _2n$1 === _0n$3) {
    Q /= _2n$1;
    S++;
  }
  let Z = _2n$1;
  const _Fp = Field(P);
  while (FpLegendre(_Fp, Z) === 1) {
    if (Z++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S === 1)
    return sqrt3mod4;
  let cc = _Fp.pow(Z, Q);
  const Q1div2 = (Q + _1n$3) / _2n$1;
  return function tonelliSlow(Fp, n) {
    if (Fp.is0(n))
      return n;
    if (FpLegendre(Fp, n) !== 1)
      throw new Error("Cannot find square root");
    let M = S;
    let c = Fp.mul(Fp.ONE, cc);
    let t = Fp.pow(n, Q);
    let R = Fp.pow(n, Q1div2);
    while (!Fp.eql(t, Fp.ONE)) {
      if (Fp.is0(t))
        return Fp.ZERO;
      let i = 1;
      let t_tmp = Fp.sqr(t);
      while (!Fp.eql(t_tmp, Fp.ONE)) {
        i++;
        t_tmp = Fp.sqr(t_tmp);
        if (i === M)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n$3 << BigInt(M - i - 1);
      const b = Fp.pow(c, exponent);
      M = i;
      c = Fp.sqr(b);
      t = Fp.mul(t, c);
      R = Fp.mul(R, b);
    }
    return R;
  };
}
function FpSqrt(P) {
  if (P % _4n$1 === _3n$1)
    return sqrt3mod4;
  if (P % _8n === _5n)
    return sqrt5mod8;
  return tonelliShanks(P);
}
const FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  return validateObject(field, opts);
}
function FpPow(Fp, num, power) {
  if (power < _0n$3)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n$3)
    return Fp.ONE;
  if (power === _1n$3)
    return num;
  let p = Fp.ONE;
  let d = num;
  while (power > _0n$3) {
    if (power & _1n$3)
      p = Fp.mul(p, d);
    d = Fp.sqr(d);
    power >>= _1n$3;
  }
  return p;
}
function FpInvertBatch(Fp, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i) => {
    if (Fp.is0(num))
      return acc;
    inverted[i] = acc;
    return Fp.mul(acc, num);
  }, Fp.ONE);
  const invertedAcc = Fp.inv(multipliedAcc);
  nums.reduceRight((acc, num, i) => {
    if (Fp.is0(num))
      return acc;
    inverted[i] = Fp.mul(acc, inverted[i]);
    return Fp.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp, n) {
  const p1mod2 = (Fp.ORDER - _1n$3) / _2n$1;
  const powered = Fp.pow(n, p1mod2);
  const yes = Fp.eql(powered, Fp.ONE);
  const zero = Fp.eql(powered, Fp.ZERO);
  const no = Fp.eql(powered, Fp.neg(Fp.ONE));
  if (!yes && !zero && !no)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength(n, nBitLength) {
  if (nBitLength !== void 0)
    anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLen2, isLE = false, redef = {}) {
  if (ORDER <= _0n$3)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f = Object.freeze({
    ORDER,
    isLE,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n$3,
    ONE: _1n$3,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n$3 <= num && num < ORDER;
    },
    is0: (num) => num === _0n$3,
    isOdd: (num) => (num & _1n$3) === _1n$3,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: redef.sqrt || ((n) => {
      if (!sqrtP)
        sqrtP = FpSqrt(ORDER);
      return sqrtP(f, n);
    }),
    toBytes: (num) => isLE ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes) => {
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      return isLE ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch(f, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a, b, c) => c ? b : a
  });
  return Object.freeze(f);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length = getFieldBytesLength(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField(key, fieldOrder, isLE = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num, fieldOrder - _1n$3) + _1n$3;
  return isLE ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$2 = BigInt(0);
const _1n$2 = BigInt(1);
function constTimeNegate(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function validateW(W, bits) {
  if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
}
function calcWOpts(W, scalarBits) {
  validateW(W, scalarBits);
  const windows = Math.ceil(scalarBits / W) + 1;
  const windowSize = 2 ** (W - 1);
  const maxNumber = 2 ** W;
  const mask = bitMask(W);
  const shiftBy = BigInt(W);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n, window, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n & mask);
  let nextN = n >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n$2;
  }
  const offsetStart = window * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints(points, c) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p, i) => {
    if (!(p instanceof c))
      throw new Error("invalid point at index " + i);
  });
}
function validateMSMScalars(scalars, field) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s, i) => {
    if (!field.isValid(s))
      throw new Error("invalid scalar at index " + i);
  });
}
const pointPrecomputes = /* @__PURE__ */ new WeakMap();
const pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P) {
  return pointWindowSizes.get(P) || 1;
}
function wNAF(c, bits) {
  return {
    constTimeNegate,
    hasPrecomputes(elm) {
      return getW(elm) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(elm, n, p = c.ZERO) {
      let d = elm;
      while (n > _0n$2) {
        if (n & _1n$2)
          p = p.add(d);
        d = d.double();
        n >>= _1n$2;
      }
      return p;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(elm, W) {
      const { windows, windowSize } = calcWOpts(W, bits);
      const points = [];
      let p = elm;
      let base = p;
      for (let window = 0; window < windows; window++) {
        base = p;
        points.push(base);
        for (let i = 1; i < windowSize; i++) {
          base = base.add(p);
          points.push(base);
        }
        p = base.double();
      }
      return points;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(W, precomputes, n) {
      let p = c.ZERO;
      let f = c.BASE;
      const wo = calcWOpts(W, bits);
      for (let window = 0; window < wo.windows; window++) {
        const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window, wo);
        n = nextN;
        if (isZero) {
          f = f.add(constTimeNegate(isNegF, precomputes[offsetF]));
        } else {
          p = p.add(constTimeNegate(isNeg, precomputes[offset]));
        }
      }
      return { p, f };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(W, precomputes, n, acc = c.ZERO) {
      const wo = calcWOpts(W, bits);
      for (let window = 0; window < wo.windows; window++) {
        if (n === _0n$2)
          break;
        const { nextN, offset, isZero, isNeg } = calcOffsets(n, window, wo);
        n = nextN;
        if (isZero) {
          continue;
        } else {
          const item = precomputes[offset];
          acc = acc.add(isNeg ? item.negate() : item);
        }
      }
      return acc;
    },
    getPrecomputes(W, P, transform) {
      let comp = pointPrecomputes.get(P);
      if (!comp) {
        comp = this.precomputeWindow(P, W);
        if (W !== 1)
          pointPrecomputes.set(P, transform(comp));
      }
      return comp;
    },
    wNAFCached(P, n, transform) {
      const W = getW(P);
      return this.wNAF(W, this.getPrecomputes(W, P, transform), n);
    },
    wNAFCachedUnsafe(P, n, transform, prev) {
      const W = getW(P);
      if (W === 1)
        return this.unsafeLadder(P, n, prev);
      return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n, prev);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(P, W) {
      validateW(W, bits);
      pointWindowSizes.set(P, W);
      pointPrecomputes.delete(P);
    }
  };
}
function pippenger(c, fieldN, points, scalars) {
  validateMSMPoints(points, c);
  validateMSMScalars(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength)
    throw new Error("arrays of points and scalars must have equal length");
  const zero = c.ZERO;
  const wbits = bitLen(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12)
    windowSize = wbits - 3;
  else if (wbits > 4)
    windowSize = wbits - 2;
  else if (wbits > 0)
    windowSize = 2;
  const MASK = bitMask(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i = lastBits; i >= 0; i -= windowSize) {
    buckets.fill(zero);
    for (let j = 0; j < slength; j++) {
      const scalar = scalars[j];
      const wbits2 = Number(scalar >> BigInt(i) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j]);
    }
    let resI = zero;
    for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
      sumI = sumI.add(buckets[j]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i !== 0)
      for (let j = 0; j < windowSize; j++)
        sum = sum.double();
  }
  return sum;
}
function validateBasic(curve) {
  validateField(curve.Fp);
  validateObject(curve, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  });
  return Object.freeze({
    ...nLength(curve.n, curve.nBitLength),
    ...curve,
    ...{ p: curve.Fp.ORDER }
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function validateSigVerOpts(opts) {
  if (opts.lowS !== void 0)
    abool("lowS", opts.lowS);
  if (opts.prehash !== void 0)
    abool("prehash", opts.prehash);
}
function validatePointOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    a: "field",
    b: "field"
  }, {
    allowInfinityPoint: "boolean",
    allowedPrivateKeyLengths: "array",
    clearCofactor: "function",
    fromBytes: "function",
    isTorsionFree: "function",
    toBytes: "function",
    wrapPrivateKey: "boolean"
  });
  const { endo, Fp, a } = opts;
  if (endo) {
    if (!Fp.eql(a, Fp.ZERO)) {
      throw new Error("invalid endo: CURVE.a must be 0");
    }
    if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
      throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
    }
  }
  return Object.freeze({ ...opts });
}
class DERErr extends Error {
  constructor(m = "") {
    super(m);
  }
}
const DER = {
  // asn.1 DER encoding utils
  Err: DERErr,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (tag, data) => {
      const { Err: E } = DER;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length & 1)
        throw new E("tlv.encode: unpadded data");
      const dataLen = data.length / 2;
      const len = numberToHexUnpadded(dataLen);
      if (len.length / 2 & 128)
        throw new E("tlv.encode: long form length too big");
      const lenLen = dataLen > 127 ? numberToHexUnpadded(len.length / 2 | 128) : "";
      const t = numberToHexUnpadded(tag);
      return t + lenLen + len + data;
    },
    // v - value, l - left bytes (unparsed)
    decode(tag, data) {
      const { Err: E } = DER;
      let pos = 0;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length < 2 || data[pos++] !== tag)
        throw new E("tlv.decode: wrong tlv");
      const first = data[pos++];
      const isLong = !!(first & 128);
      let length = 0;
      if (!isLong)
        length = first;
      else {
        const lenLen = first & 127;
        if (!lenLen)
          throw new E("tlv.decode(long): indefinite length not supported");
        if (lenLen > 4)
          throw new E("tlv.decode(long): byte length is too big");
        const lengthBytes = data.subarray(pos, pos + lenLen);
        if (lengthBytes.length !== lenLen)
          throw new E("tlv.decode: length bytes not complete");
        if (lengthBytes[0] === 0)
          throw new E("tlv.decode(long): zero leftmost byte");
        for (const b of lengthBytes)
          length = length << 8 | b;
        pos += lenLen;
        if (length < 128)
          throw new E("tlv.decode(long): not minimal encoding");
      }
      const v = data.subarray(pos, pos + length);
      if (v.length !== length)
        throw new E("tlv.decode: wrong value length");
      return { v, l: data.subarray(pos + length) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(num) {
      const { Err: E } = DER;
      if (num < _0n$1)
        throw new E("integer: negative integers are not allowed");
      let hex = numberToHexUnpadded(num);
      if (Number.parseInt(hex[0], 16) & 8)
        hex = "00" + hex;
      if (hex.length & 1)
        throw new E("unexpected DER parsing assertion: unpadded hex");
      return hex;
    },
    decode(data) {
      const { Err: E } = DER;
      if (data[0] & 128)
        throw new E("invalid signature integer: negative");
      if (data[0] === 0 && !(data[1] & 128))
        throw new E("invalid signature integer: unnecessary leading zero");
      return bytesToNumberBE(data);
    }
  },
  toSig(hex) {
    const { Err: E, _int: int, _tlv: tlv } = DER;
    const data = ensureBytes("signature", hex);
    const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
    if (seqLeftBytes.length)
      throw new E("invalid signature: left bytes after parsing");
    const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
    const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
    if (sLeftBytes.length)
      throw new E("invalid signature: left bytes after parsing");
    return { r: int.decode(rBytes), s: int.decode(sBytes) };
  },
  hexFromSig(sig) {
    const { _tlv: tlv, _int: int } = DER;
    const rs = tlv.encode(2, int.encode(sig.r));
    const ss = tlv.encode(2, int.encode(sig.s));
    const seq = rs + ss;
    return tlv.encode(48, seq);
  }
};
function numToSizedHex(num, size2) {
  return bytesToHex(numberToBytesBE(num, size2));
}
const _0n$1 = BigInt(0), _1n$1 = BigInt(1);
BigInt(2);
const _3n = BigInt(3), _4n = BigInt(4);
function weierstrassPoints(opts) {
  const CURVE = validatePointOpts(opts);
  const { Fp } = CURVE;
  const Fn = Field(CURVE.n, CURVE.nBitLength);
  const toBytes2 = CURVE.toBytes || ((_c, point, _isCompressed) => {
    const a = point.toAffine();
    return concatBytes(Uint8Array.from([4]), Fp.toBytes(a.x), Fp.toBytes(a.y));
  });
  const fromBytes2 = CURVE.fromBytes || ((bytes) => {
    const tail = bytes.subarray(1);
    const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
    const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
    return { x, y };
  });
  function weierstrassEquation(x) {
    const { a, b } = CURVE;
    const x2 = Fp.sqr(x);
    const x3 = Fp.mul(x2, x);
    return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
  }
  function isValidXY(x, y) {
    const left = Fp.sqr(y);
    const right = weierstrassEquation(x);
    return Fp.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp.mul(Fp.pow(CURVE.a, _3n), _4n);
  const _27b2 = Fp.mul(Fp.sqr(CURVE.b), BigInt(27));
  if (Fp.is0(Fp.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function isWithinCurveOrder(num) {
    return inRange(num, _1n$1, CURVE.n);
  }
  function normPrivateKeyToScalar(key) {
    const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N } = CURVE;
    if (lengths && typeof key !== "bigint") {
      if (isBytes(key))
        key = bytesToHex(key);
      if (typeof key !== "string" || !lengths.includes(key.length))
        throw new Error("invalid private key");
      key = key.padStart(nByteLength * 2, "0");
    }
    let num;
    try {
      num = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
    } catch (error) {
      throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
    }
    if (wrapPrivateKey)
      num = mod(num, N);
    aInRange("private key", num, _1n$1, N);
    return num;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ProjectivePoint expected");
  }
  const toAffineMemo = memoized((p, iz) => {
    const { px: x, py: y, pz: z } = p;
    if (Fp.eql(z, Fp.ONE))
      return { x, y };
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? Fp.ONE : Fp.inv(z);
    const ax = Fp.mul(x, iz);
    const ay = Fp.mul(y, iz);
    const zz = Fp.mul(z, iz);
    if (is0)
      return { x: Fp.ZERO, y: Fp.ZERO };
    if (!Fp.eql(zz, Fp.ONE))
      throw new Error("invZ was invalid");
    return { x: ax, y: ay };
  });
  const assertValidMemo = memoized((p) => {
    if (p.is0()) {
      if (CURVE.allowInfinityPoint && !Fp.is0(p.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x, y } = p.toAffine();
    if (!Fp.isValid(x) || !Fp.isValid(y))
      throw new Error("bad point: x or y not FE");
    if (!isValidXY(x, y))
      throw new Error("bad point: equation left != right");
    if (!p.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  class Point {
    constructor(px, py, pz) {
      if (px == null || !Fp.isValid(px))
        throw new Error("x required");
      if (py == null || !Fp.isValid(py) || Fp.is0(py))
        throw new Error("y required");
      if (pz == null || !Fp.isValid(pz))
        throw new Error("z required");
      this.px = px;
      this.py = py;
      this.pz = pz;
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(p) {
      const { x, y } = p || {};
      if (!p || !Fp.isValid(x) || !Fp.isValid(y))
        throw new Error("invalid affine point");
      if (p instanceof Point)
        throw new Error("projective point not allowed");
      const is0 = (i) => Fp.eql(i, Fp.ZERO);
      if (is0(x) && is0(y))
        return Point.ZERO;
      return new Point(x, y, Fp.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(points) {
      const toInv = FpInvertBatch(Fp, points.map((p) => p.pz));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(hex) {
      const P = Point.fromAffine(fromBytes2(ensureBytes("pointHex", hex)));
      P.assertValidity();
      return P;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(privateKey) {
      return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
    }
    // Multiscalar Multiplication
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      wnaf.setWindowSize(this, windowSize);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (Fp.isOdd)
        return !Fp.isOdd(y);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(other) {
      aprjpoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
      const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
      return U1 && U2;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new Point(this.px, Fp.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a, b } = CURVE;
      const b3 = Fp.mul(b, _3n);
      const { px: X1, py: Y1, pz: Z1 } = this;
      let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      let t0 = Fp.mul(X1, X1);
      let t1 = Fp.mul(Y1, Y1);
      let t2 = Fp.mul(Z1, Z1);
      let t3 = Fp.mul(X1, Y1);
      t3 = Fp.add(t3, t3);
      Z3 = Fp.mul(X1, Z1);
      Z3 = Fp.add(Z3, Z3);
      X3 = Fp.mul(a, Z3);
      Y3 = Fp.mul(b3, t2);
      Y3 = Fp.add(X3, Y3);
      X3 = Fp.sub(t1, Y3);
      Y3 = Fp.add(t1, Y3);
      Y3 = Fp.mul(X3, Y3);
      X3 = Fp.mul(t3, X3);
      Z3 = Fp.mul(b3, Z3);
      t2 = Fp.mul(a, t2);
      t3 = Fp.sub(t0, t2);
      t3 = Fp.mul(a, t3);
      t3 = Fp.add(t3, Z3);
      Z3 = Fp.add(t0, t0);
      t0 = Fp.add(Z3, t0);
      t0 = Fp.add(t0, t2);
      t0 = Fp.mul(t0, t3);
      Y3 = Fp.add(Y3, t0);
      t2 = Fp.mul(Y1, Z1);
      t2 = Fp.add(t2, t2);
      t0 = Fp.mul(t2, t3);
      X3 = Fp.sub(X3, t0);
      Z3 = Fp.mul(t2, t1);
      Z3 = Fp.add(Z3, Z3);
      Z3 = Fp.add(Z3, Z3);
      return new Point(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      const a = CURVE.a;
      const b3 = Fp.mul(CURVE.b, _3n);
      let t0 = Fp.mul(X1, X2);
      let t1 = Fp.mul(Y1, Y2);
      let t2 = Fp.mul(Z1, Z2);
      let t3 = Fp.add(X1, Y1);
      let t4 = Fp.add(X2, Y2);
      t3 = Fp.mul(t3, t4);
      t4 = Fp.add(t0, t1);
      t3 = Fp.sub(t3, t4);
      t4 = Fp.add(X1, Z1);
      let t5 = Fp.add(X2, Z2);
      t4 = Fp.mul(t4, t5);
      t5 = Fp.add(t0, t2);
      t4 = Fp.sub(t4, t5);
      t5 = Fp.add(Y1, Z1);
      X3 = Fp.add(Y2, Z2);
      t5 = Fp.mul(t5, X3);
      X3 = Fp.add(t1, t2);
      t5 = Fp.sub(t5, X3);
      Z3 = Fp.mul(a, t4);
      X3 = Fp.mul(b3, t2);
      Z3 = Fp.add(X3, Z3);
      X3 = Fp.sub(t1, Z3);
      Z3 = Fp.add(t1, Z3);
      Y3 = Fp.mul(X3, Z3);
      t1 = Fp.add(t0, t0);
      t1 = Fp.add(t1, t0);
      t2 = Fp.mul(a, t2);
      t4 = Fp.mul(b3, t4);
      t1 = Fp.add(t1, t2);
      t2 = Fp.sub(t0, t2);
      t2 = Fp.mul(a, t2);
      t4 = Fp.add(t4, t2);
      t0 = Fp.mul(t1, t4);
      Y3 = Fp.add(Y3, t0);
      t0 = Fp.mul(t5, t4);
      X3 = Fp.mul(t3, X3);
      X3 = Fp.sub(X3, t0);
      t0 = Fp.mul(t3, t1);
      Z3 = Fp.mul(t5, Z3);
      Z3 = Fp.add(Z3, t0);
      return new Point(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    wNAF(n) {
      return wnaf.wNAFCached(this, n, Point.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2, n: N } = CURVE;
      aInRange("scalar", sc, _0n$1, N);
      const I = Point.ZERO;
      if (sc === _0n$1)
        return I;
      if (this.is0() || sc === _1n$1)
        return this;
      if (!endo2 || wnaf.hasPrecomputes(this))
        return wnaf.wNAFCachedUnsafe(this, sc, Point.normalizeZ);
      let { k1neg, k1, k2neg, k2 } = endo2.splitScalar(sc);
      let k1p = I;
      let k2p = I;
      let d = this;
      while (k1 > _0n$1 || k2 > _0n$1) {
        if (k1 & _1n$1)
          k1p = k1p.add(d);
        if (k2 & _1n$1)
          k2p = k2p.add(d);
        d = d.double();
        k1 >>= _1n$1;
        k2 >>= _1n$1;
      }
      if (k1neg)
        k1p = k1p.negate();
      if (k2neg)
        k2p = k2p.negate();
      k2p = new Point(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
      return k1p.add(k2p);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2, n: N } = CURVE;
      aInRange("scalar", scalar, _1n$1, N);
      let point, fake;
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = endo2.splitScalar(scalar);
        let { p: k1p, f: f1p } = this.wNAF(k1);
        let { p: k2p, f: f2p } = this.wNAF(k2);
        k1p = wnaf.constTimeNegate(k1neg, k1p);
        k2p = wnaf.constTimeNegate(k2neg, k2p);
        k2p = new Point(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
        point = k1p.add(k2p);
        fake = f1p.add(f2p);
      } else {
        const { p, f } = this.wNAF(scalar);
        point = p;
        fake = f;
      }
      return Point.normalizeZ([point, fake])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(Q, a, b) {
      const G = Point.BASE;
      const mul = (P, a2) => a2 === _0n$1 || a2 === _1n$1 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
      const sum = mul(this, a).add(mul(Q, b));
      return sum.is0() ? void 0 : sum;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(iz) {
      return toAffineMemo(this, iz);
    }
    isTorsionFree() {
      const { h: cofactor, isTorsionFree } = CURVE;
      if (cofactor === _1n$1)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: cofactor, clearCofactor } = CURVE;
      if (cofactor === _1n$1)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(CURVE.h);
    }
    toRawBytes(isCompressed = true) {
      abool("isCompressed", isCompressed);
      this.assertValidity();
      return toBytes2(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      abool("isCompressed", isCompressed);
      return bytesToHex(this.toRawBytes(isCompressed));
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
  Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
  const { endo, nBitLength } = CURVE;
  const wnaf = wNAF(Point, endo ? Math.ceil(nBitLength / 2) : nBitLength);
  return {
    CURVE,
    ProjectivePoint: Point,
    normPrivateKeyToScalar,
    weierstrassEquation,
    isWithinCurveOrder
  };
}
function validateOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  });
  return Object.freeze({ lowS: true, ...opts });
}
function weierstrass(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { Fp, n: CURVE_ORDER, nByteLength, nBitLength } = CURVE;
  const compressedLen = Fp.BYTES + 1;
  const uncompressedLen = 2 * Fp.BYTES + 1;
  function modN(a) {
    return mod(a, CURVE_ORDER);
  }
  function invN(a) {
    return invert(a, CURVE_ORDER);
  }
  const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
    ...CURVE,
    toBytes(_c, point, isCompressed) {
      const a = point.toAffine();
      const x = Fp.toBytes(a.x);
      const cat = concatBytes;
      abool("isCompressed", isCompressed);
      if (isCompressed) {
        return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
      } else {
        return cat(Uint8Array.from([4]), x, Fp.toBytes(a.y));
      }
    },
    fromBytes(bytes) {
      const len = bytes.length;
      const head = bytes[0];
      const tail = bytes.subarray(1);
      if (len === compressedLen && (head === 2 || head === 3)) {
        const x = bytesToNumberBE(tail);
        if (!inRange(x, _1n$1, Fp.ORDER))
          throw new Error("Point is not on curve");
        const y2 = weierstrassEquation(x);
        let y;
        try {
          y = Fp.sqrt(y2);
        } catch (sqrtError) {
          const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
          throw new Error("Point is not on curve" + suffix);
        }
        const isYOdd = (y & _1n$1) === _1n$1;
        const isHeadOdd = (head & 1) === 1;
        if (isHeadOdd !== isYOdd)
          y = Fp.neg(y);
        return { x, y };
      } else if (len === uncompressedLen && head === 4) {
        const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
        const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
        return { x, y };
      } else {
        const cl = compressedLen;
        const ul = uncompressedLen;
        throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
      }
    }
  });
  function isBiggerThanHalfOrder(number) {
    const HALF = CURVE_ORDER >> _1n$1;
    return number > HALF;
  }
  function normalizeS(s) {
    return isBiggerThanHalfOrder(s) ? modN(-s) : s;
  }
  const slcNum = (b, from2, to) => bytesToNumberBE(b.slice(from2, to));
  class Signature {
    constructor(r, s, recovery) {
      aInRange("r", r, _1n$1, CURVE_ORDER);
      aInRange("s", s, _1n$1, CURVE_ORDER);
      this.r = r;
      this.s = s;
      if (recovery != null)
        this.recovery = recovery;
      Object.freeze(this);
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(hex) {
      const l = nByteLength;
      hex = ensureBytes("compactSignature", hex, l * 2);
      return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(hex) {
      const { r, s } = DER.toSig(ensureBytes("DER", hex));
      return new Signature(r, s);
    }
    /**
     * @todo remove
     * @deprecated
     */
    assertValidity() {
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(msgHash) {
      const { r, s, recovery: rec } = this;
      const h = bits2int_modN(ensureBytes("msgHash", msgHash));
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
      if (radj >= Fp.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const prefix = (rec & 1) === 0 ? "02" : "03";
      const R = Point.fromHex(prefix + numToSizedHex(radj, Fp.BYTES));
      const ir = invN(radj);
      const u1 = modN(-h * ir);
      const u2 = modN(s * ir);
      const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
      if (!Q)
        throw new Error("point at infinify");
      Q.assertValidity();
      return Q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return hexToBytes(this.toDERHex());
    }
    toDERHex() {
      return DER.hexFromSig(this);
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return hexToBytes(this.toCompactHex());
    }
    toCompactHex() {
      const l = nByteLength;
      return numToSizedHex(this.r, l) + numToSizedHex(this.s, l);
    }
  }
  const utils = {
    isValidPrivateKey(privateKey) {
      try {
        normPrivateKeyToScalar(privateKey);
        return true;
      } catch (error) {
        return false;
      }
    },
    normPrivateKeyToScalar,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const length = getMinHashLength(CURVE.n);
      return mapHashToField(CURVE.randomBytes(length), CURVE.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(windowSize = 8, point = Point.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  function getPublicKey(privateKey, isCompressed = true) {
    return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
  }
  function isProbPub(item) {
    if (typeof item === "bigint")
      return false;
    if (item instanceof Point)
      return true;
    const arr = ensureBytes("key", item);
    const len = arr.length;
    const fpl = Fp.BYTES;
    const compLen = fpl + 1;
    const uncompLen = 2 * fpl + 1;
    if (CURVE.allowedPrivateKeyLengths || nByteLength === compLen) {
      return void 0;
    } else {
      return len === compLen || len === uncompLen;
    }
  }
  function getSharedSecret(privateA, publicB, isCompressed = true) {
    if (isProbPub(privateA) === true)
      throw new Error("first arg must be private key");
    if (isProbPub(publicB) === false)
      throw new Error("second arg must be public key");
    const b = Point.fromHex(publicB);
    return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
  }
  const bits2int = CURVE.bits2int || function(bytes) {
    if (bytes.length > 8192)
      throw new Error("input is too large");
    const num = bytesToNumberBE(bytes);
    const delta = bytes.length * 8 - nBitLength;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
    return modN(bits2int(bytes));
  };
  const ORDER_MASK = bitMask(nBitLength);
  function int2octets(num) {
    aInRange("num < 2^" + nBitLength, num, _0n$1, ORDER_MASK);
    return numberToBytesBE(num, nByteLength);
  }
  function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
    if (["recovered", "canonical"].some((k) => k in opts))
      throw new Error("sign() legacy options not supported");
    const { hash: hash2, randomBytes: randomBytes2 } = CURVE;
    let { lowS, prehash, extraEntropy: ent } = opts;
    if (lowS == null)
      lowS = true;
    msgHash = ensureBytes("msgHash", msgHash);
    validateSigVerOpts(opts);
    if (prehash)
      msgHash = ensureBytes("prehashed msgHash", hash2(msgHash));
    const h1int = bits2int_modN(msgHash);
    const d = normPrivateKeyToScalar(privateKey);
    const seedArgs = [int2octets(d), int2octets(h1int)];
    if (ent != null && ent !== false) {
      const e = ent === true ? randomBytes2(Fp.BYTES) : ent;
      seedArgs.push(ensureBytes("extraEntropy", e));
    }
    const seed = concatBytes(...seedArgs);
    const m = h1int;
    function k2sig(kBytes) {
      const k = bits2int(kBytes);
      if (!isWithinCurveOrder(k))
        return;
      const ik = invN(k);
      const q = Point.BASE.multiply(k).toAffine();
      const r = modN(q.x);
      if (r === _0n$1)
        return;
      const s = modN(ik * modN(m + r * d));
      if (s === _0n$1)
        return;
      let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n$1);
      let normS = s;
      if (lowS && isBiggerThanHalfOrder(s)) {
        normS = normalizeS(s);
        recovery ^= 1;
      }
      return new Signature(r, normS, recovery);
    }
    return { seed, k2sig };
  }
  const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
  const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
  function sign(msgHash, privKey, opts = defaultSigOpts) {
    const { seed, k2sig } = prepSig(msgHash, privKey, opts);
    const C = CURVE;
    const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
    return drbg(seed, k2sig);
  }
  Point.BASE._setWindowSize(8);
  function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
    const sg = signature;
    msgHash = ensureBytes("msgHash", msgHash);
    publicKey = ensureBytes("publicKey", publicKey);
    const { lowS, prehash, format } = opts;
    validateSigVerOpts(opts);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    if (format !== void 0 && format !== "compact" && format !== "der")
      throw new Error("format must be compact or der");
    const isHex2 = typeof sg === "string" || isBytes(sg);
    const isObj = !isHex2 && !format && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
    if (!isHex2 && !isObj)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let _sig = void 0;
    let P;
    try {
      if (isObj)
        _sig = new Signature(sg.r, sg.s);
      if (isHex2) {
        try {
          if (format !== "compact")
            _sig = Signature.fromDER(sg);
        } catch (derError) {
          if (!(derError instanceof DER.Err))
            throw derError;
        }
        if (!_sig && format !== "der")
          _sig = Signature.fromCompact(sg);
      }
      P = Point.fromHex(publicKey);
    } catch (error) {
      return false;
    }
    if (!_sig)
      return false;
    if (lowS && _sig.hasHighS())
      return false;
    if (prehash)
      msgHash = CURVE.hash(msgHash);
    const { r, s } = _sig;
    const h = bits2int_modN(msgHash);
    const is = invN(s);
    const u1 = modN(h * is);
    const u2 = modN(r * is);
    const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
    if (!R)
      return false;
    const v = modN(R.x);
    return v === r;
  }
  return {
    CURVE,
    getPublicKey,
    getSharedSecret,
    sign,
    verify,
    ProjectivePoint: Point,
    Signature,
    utils
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function getHash(hash2) {
  return {
    hash: hash2,
    hmac: (key, ...msgs) => hmac(hash2, key, concatBytes$1(...msgs)),
    randomBytes
  };
}
function createCurve(curveDef, defHash) {
  const create2 = (hash2) => weierstrass({ ...curveDef, ...getHash(hash2) });
  return { ...create2(defHash), create: create2 };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
const secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const divNearest = (a, b) => (a + b / _2n) / b;
function sqrtMod(y) {
  const P = secp256k1P;
  const _3n2 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
  const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
  const b2 = y * y * y % P;
  const b3 = b2 * b2 * y % P;
  const b6 = pow2(b3, _3n2, P) * b3 % P;
  const b9 = pow2(b6, _3n2, P) * b3 % P;
  const b11 = pow2(b9, _2n, P) * b2 % P;
  const b22 = pow2(b11, _11n, P) * b11 % P;
  const b44 = pow2(b22, _22n, P) * b22 % P;
  const b88 = pow2(b44, _44n, P) * b44 % P;
  const b176 = pow2(b88, _88n, P) * b88 % P;
  const b220 = pow2(b176, _44n, P) * b44 % P;
  const b223 = pow2(b220, _3n2, P) * b3 % P;
  const t1 = pow2(b223, _23n, P) * b22 % P;
  const t2 = pow2(t1, _6n, P) * b2 % P;
  const root = pow2(t2, _2n, P);
  if (!Fpk1.eql(Fpk1.sqr(root), y))
    throw new Error("Cannot find square root");
  return root;
}
const Fpk1 = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
const secp256k1 = createCurve({
  a: _0n,
  b: BigInt(7),
  Fp: Fpk1,
  n: secp256k1N,
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  lowS: true,
  // Allow only low-S signatures by default in sign() and verify()
  endo: {
    // Endomorphism, see above
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (k) => {
      const n = secp256k1N;
      const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
      const b1 = -_1n * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
      const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
      const b2 = a1;
      const POW_2_128 = BigInt("0x100000000000000000000000000000000");
      const c1 = divNearest(b2 * k, n);
      const c2 = divNearest(-b1 * k, n);
      let k1 = mod(k - c1 * a1 - c2 * a2, n);
      let k2 = mod(-c1 * b1 - c2 * b2, n);
      const k1neg = k1 > POW_2_128;
      const k2neg = k2 > POW_2_128;
      if (k1neg)
        k1 = n - k1;
      if (k2neg)
        k2 = n - k2;
      if (k1 > POW_2_128 || k2 > POW_2_128) {
        throw new Error("splitScalar: Endomorphism failed, k=" + k);
      }
      return { k1neg, k1, k2neg, k2 };
    }
  }
}, sha256$1);
const secp256k1$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  secp256k1
}, Symbol.toStringTag, { value: "Module" }));
function assert$2(signature, options = {}) {
  const { recovered } = options;
  if (typeof signature.r === "undefined")
    throw new MissingPropertiesError({ signature });
  if (typeof signature.s === "undefined")
    throw new MissingPropertiesError({ signature });
  if (recovered && typeof signature.yParity === "undefined")
    throw new MissingPropertiesError({ signature });
  if (signature.r < 0n || signature.r > maxUint256)
    throw new InvalidRError({ value: signature.r });
  if (signature.s < 0n || signature.s > maxUint256)
    throw new InvalidSError({ value: signature.s });
  if (typeof signature.yParity === "number" && signature.yParity !== 0 && signature.yParity !== 1)
    throw new InvalidYParityError({ value: signature.yParity });
}
function fromBytes(signature) {
  return fromHex(fromBytes$2(signature));
}
function fromHex(signature) {
  if (signature.length !== 130 && signature.length !== 132)
    throw new InvalidSerializedSizeError2({ signature });
  const r = BigInt(slice(signature, 0, 32));
  const s = BigInt(slice(signature, 32, 64));
  const yParity = (() => {
    const yParity2 = Number(`0x${signature.slice(130)}`);
    if (Number.isNaN(yParity2))
      return void 0;
    try {
      return vToYParity(yParity2);
    } catch {
      throw new InvalidYParityError({ value: yParity2 });
    }
  })();
  if (typeof yParity === "undefined")
    return {
      r,
      s
    };
  return {
    r,
    s,
    yParity
  };
}
function extract(value) {
  if (typeof value.r === "undefined")
    return void 0;
  if (typeof value.s === "undefined")
    return void 0;
  return from$4(value);
}
function from$4(signature) {
  const signature_ = (() => {
    if (typeof signature === "string")
      return fromHex(signature);
    if (signature instanceof Uint8Array)
      return fromBytes(signature);
    if (typeof signature.r === "string")
      return fromRpc$1(signature);
    if (signature.v)
      return fromLegacy(signature);
    return {
      r: signature.r,
      s: signature.s,
      ...typeof signature.yParity !== "undefined" ? { yParity: signature.yParity } : {}
    };
  })();
  assert$2(signature_);
  return signature_;
}
function fromLegacy(signature) {
  return {
    r: signature.r,
    s: signature.s,
    yParity: vToYParity(signature.v)
  };
}
function fromRpc$1(signature) {
  const yParity = (() => {
    const v = signature.v ? Number(signature.v) : void 0;
    let yParity2 = signature.yParity ? Number(signature.yParity) : void 0;
    if (typeof v === "number" && typeof yParity2 !== "number")
      yParity2 = vToYParity(v);
    if (typeof yParity2 !== "number")
      throw new InvalidYParityError({ value: signature.yParity });
    return yParity2;
  })();
  return {
    r: BigInt(signature.r),
    s: BigInt(signature.s),
    yParity
  };
}
function toTuple$1(signature) {
  const { r, s, yParity } = signature;
  return [
    yParity ? "0x01" : "0x",
    r === 0n ? "0x" : trimLeft(fromNumber(r)),
    s === 0n ? "0x" : trimLeft(fromNumber(s))
  ];
}
function vToYParity(v) {
  if (v === 0 || v === 27)
    return 0;
  if (v === 1 || v === 28)
    return 1;
  if (v >= 35)
    return v % 2 === 0 ? 1 : 0;
  throw new InvalidVError({ value: v });
}
class InvalidSerializedSizeError2 extends BaseError2 {
  constructor({ signature }) {
    super(`Value \`${signature}\` is an invalid signature size.`, {
      metaMessages: [
        "Expected: 64 bytes or 65 bytes.",
        `Received ${size$1(from$9(signature))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSerializedSizeError"
    });
  }
}
class MissingPropertiesError extends BaseError2 {
  constructor({ signature }) {
    super(`Signature \`${stringify(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.MissingPropertiesError"
    });
  }
}
class InvalidRError extends BaseError2 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidRError"
    });
  }
}
class InvalidSError extends BaseError2 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSError"
    });
  }
}
class InvalidYParityError extends BaseError2 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidYParityError"
    });
  }
}
class InvalidVError extends BaseError2 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidVError"
    });
  }
}
function from$3(authorization, options = {}) {
  if (typeof authorization.chainId === "string")
    return fromRpc(authorization);
  return { ...authorization, ...options.signature };
}
function fromRpc(authorization) {
  const { address, chainId, nonce } = authorization;
  const signature = extract(authorization);
  return {
    address,
    chainId: Number(chainId),
    nonce: BigInt(nonce),
    ...signature
  };
}
function getSignPayload(authorization) {
  return hash(authorization, { presign: true });
}
function hash(authorization, options = {}) {
  const { presign } = options;
  return keccak256(concat("0x05", fromHex$1(toTuple(presign ? {
    address: authorization.address,
    chainId: authorization.chainId,
    nonce: authorization.nonce
  } : authorization))));
}
function toTuple(authorization) {
  const { address, chainId, nonce } = authorization;
  const signature = extract(authorization);
  return [
    chainId ? fromNumber(chainId) : "0x",
    address,
    nonce ? fromNumber(nonce) : "0x",
    ...signature ? toTuple$1(signature) : []
  ];
}
function recoverAddress(options) {
  return fromPublicKey(recoverPublicKey(options));
}
function recoverPublicKey(options) {
  const { payload, signature } = options;
  const { r, s, yParity } = signature;
  const signature_ = new secp256k1.Signature(BigInt(r), BigInt(s)).addRecoveryBit(yParity);
  const point = signature_.recoverPublicKey(from$9(payload).substring(2));
  return from$8(point);
}
const magicBytes$1 = "0x8010801080108010801080108010801080108010801080108010801080108010";
const suffixParameters = from$6("(uint256 chainId, address delegation, uint256 nonce, uint8 yParity, uint256 r, uint256 s), address to, bytes data");
function assert$1(value) {
  if (typeof value === "string") {
    if (slice(value, -32) !== magicBytes$1)
      throw new InvalidWrappedSignatureError$1(value);
  } else
    assert$2(value.authorization);
}
function unwrap(wrapped) {
  assert$1(wrapped);
  const suffixLength = toNumber(slice(wrapped, -64, -32));
  const suffix = slice(wrapped, -suffixLength - 64, -64);
  const signature = slice(wrapped, 0, -suffixLength - 64);
  const [auth, to, data] = decode(suffixParameters, suffix);
  const authorization = from$3({
    address: auth.delegation,
    chainId: Number(auth.chainId),
    nonce: auth.nonce,
    yParity: auth.yParity,
    r: auth.r,
    s: auth.s
  });
  return {
    authorization,
    signature,
    ...data && data !== "0x" ? { data, to } : {}
  };
}
function wrap$1(value) {
  const { data, signature } = value;
  assert$1(value);
  const self = recoverAddress({
    payload: getSignPayload(value.authorization),
    signature: from$4(value.authorization)
  });
  const suffix = encode$1(suffixParameters, [
    {
      ...value.authorization,
      delegation: value.authorization.address,
      chainId: BigInt(value.authorization.chainId)
    },
    value.to ?? self,
    data ?? "0x"
  ]);
  const suffixLength = fromNumber(size$1(suffix), { size: 32 });
  return concat(signature, suffix, suffixLength, magicBytes$1);
}
function validate$1(value) {
  try {
    assert$1(value);
    return true;
  } catch {
    return false;
  }
}
let InvalidWrappedSignatureError$1 = class InvalidWrappedSignatureError extends BaseError2 {
  constructor(wrapped) {
    super(`Value \`${wrapped}\` is an invalid ERC-8010 wrapped signature.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SignatureErc8010.InvalidWrappedSignatureError"
    });
  }
};
function serializeErc6492Signature(parameters) {
  const { address, data, signature, to = "hex" } = parameters;
  const signature_ = concatHex([
    encodeAbiParameters([{ type: "address" }, { type: "bytes" }, { type: "bytes" }], [address, data, signature]),
    erc6492MagicBytes
  ]);
  if (to === "hex")
    return signature_;
  return hexToBytes$1(signature_);
}
function formatStorageProof(storageProof) {
  return storageProof.map((proof) => ({
    ...proof,
    value: BigInt(proof.value)
  }));
}
function formatProof(proof) {
  return {
    ...proof,
    balance: proof.balance ? BigInt(proof.balance) : void 0,
    nonce: proof.nonce ? hexToNumber$1(proof.nonce) : void 0,
    storageProof: proof.storageProof ? formatStorageProof(proof.storageProof) : void 0
  };
}
async function getProof(client, { address, blockNumber, blockTag: blockTag_, storageKeys }) {
  const blockTag = blockTag_ ?? "latest";
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  const proof = await client.request({
    method: "eth_getProof",
    params: [address, storageKeys, blockNumberHex || blockTag]
  });
  return formatProof(proof);
}
async function getStorageAt(client, { address, blockNumber, blockTag = "latest", slot }) {
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  const data = await client.request({
    method: "eth_getStorageAt",
    params: [address, slot, blockNumberHex || blockTag]
  });
  return data;
}
async function getTransaction(client, { blockHash, blockNumber, blockTag: blockTag_, hash: hash2, index: index2, sender, nonce }) {
  const blockTag = blockTag_ || "latest";
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  let transaction = null;
  if (hash2) {
    transaction = await client.request({
      method: "eth_getTransactionByHash",
      params: [hash2]
    }, { dedupe: true });
  } else if (blockHash) {
    transaction = await client.request({
      method: "eth_getTransactionByBlockHashAndIndex",
      params: [blockHash, numberToHex(index2)]
    }, { dedupe: true });
  } else if (typeof index2 === "number") {
    transaction = await client.request({
      method: "eth_getTransactionByBlockNumberAndIndex",
      params: [blockNumberHex || blockTag, numberToHex(index2)]
    }, { dedupe: Boolean(blockNumberHex) });
  } else if (sender && typeof nonce === "number") {
    transaction = await client.request({
      method: "eth_getTransactionBySenderAndNonce",
      params: [sender, numberToHex(nonce)]
    }, { dedupe: true });
  }
  if (!transaction)
    throw new TransactionNotFoundError({
      blockHash,
      blockNumber,
      blockTag,
      hash: hash2,
      index: index2
    });
  const format = client.chain?.formatters?.transaction?.format || formatTransaction;
  return format(transaction, "getTransaction");
}
async function getTransactionConfirmations(client, { hash: hash2, transactionReceipt }) {
  const [blockNumber, transaction] = await Promise.all([
    getAction(client, getBlockNumber, "getBlockNumber")({}),
    hash2 ? getAction(client, getTransaction, "getTransaction")({ hash: hash2 }) : void 0
  ]);
  const transactionBlockNumber = transactionReceipt?.blockNumber || transaction?.blockNumber;
  if (!transactionBlockNumber)
    return 0n;
  return blockNumber - transactionBlockNumber + 1n;
}
async function getTransactionReceipt(client, { hash: hash2 }) {
  const receipt = await client.request({
    method: "eth_getTransactionReceipt",
    params: [hash2]
  }, { dedupe: true });
  if (!receipt)
    throw new TransactionReceiptNotFoundError({ hash: hash2 });
  const format = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
  return format(receipt, "getTransactionReceipt");
}
async function multicall(client, parameters) {
  const { account, authorizationList, allowFailure = true, blockNumber, blockOverrides, blockTag, stateOverride } = parameters;
  const contracts = parameters.contracts;
  const { batchSize = parameters.batchSize ?? 1024, deployless = parameters.deployless ?? false } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
  const multicallAddress = (() => {
    if (parameters.multicallAddress)
      return parameters.multicallAddress;
    if (deployless)
      return null;
    if (client.chain) {
      return getChainContractAddress({
        blockNumber,
        chain: client.chain,
        contract: "multicall3"
      });
    }
    throw new Error("client chain not configured. multicallAddress is required.");
  })();
  const chunkedCalls = [[]];
  let currentChunk = 0;
  let currentChunkSize = 0;
  for (let i = 0; i < contracts.length; i++) {
    const { abi: abi2, address, args, functionName } = contracts[i];
    try {
      const callData = encodeFunctionData({ abi: abi2, args, functionName });
      currentChunkSize += (callData.length - 2) / 2;
      if (
        // Check if batching is enabled.
        batchSize > 0 && // Check if the current size of the batch exceeds the size limit.
        currentChunkSize > batchSize && // Check if the current chunk is not already empty.
        chunkedCalls[currentChunk].length > 0
      ) {
        currentChunk++;
        currentChunkSize = (callData.length - 2) / 2;
        chunkedCalls[currentChunk] = [];
      }
      chunkedCalls[currentChunk] = [
        ...chunkedCalls[currentChunk],
        {
          allowFailure: true,
          callData,
          target: address
        }
      ];
    } catch (err) {
      const error = getContractError(err, {
        abi: abi2,
        address,
        args,
        docsPath: "/docs/contract/multicall",
        functionName,
        sender: account
      });
      if (!allowFailure)
        throw error;
      chunkedCalls[currentChunk] = [
        ...chunkedCalls[currentChunk],
        {
          allowFailure: true,
          callData: "0x",
          target: address
        }
      ];
    }
  }
  const aggregate3Results = await Promise.allSettled(chunkedCalls.map((calls) => getAction(client, readContract, "readContract")({
    ...multicallAddress === null ? { code: multicall3Bytecode } : { address: multicallAddress },
    abi: multicall3Abi,
    account,
    args: [calls],
    authorizationList,
    blockNumber,
    blockOverrides,
    blockTag,
    functionName: "aggregate3",
    stateOverride
  })));
  const results = [];
  for (let i = 0; i < aggregate3Results.length; i++) {
    const result = aggregate3Results[i];
    if (result.status === "rejected") {
      if (!allowFailure)
        throw result.reason;
      for (let j = 0; j < chunkedCalls[i].length; j++) {
        results.push({
          status: "failure",
          error: result.reason,
          result: void 0
        });
      }
      continue;
    }
    const aggregate3Result = result.value;
    for (let j = 0; j < aggregate3Result.length; j++) {
      const { returnData, success } = aggregate3Result[j];
      const { callData } = chunkedCalls[i][j];
      const { abi: abi2, address, functionName, args } = contracts[results.length];
      try {
        if (callData === "0x")
          throw new AbiDecodingZeroDataError();
        if (!success)
          throw new RawContractError({ data: returnData });
        const result2 = decodeFunctionResult({
          abi: abi2,
          args,
          data: returnData,
          functionName
        });
        results.push(allowFailure ? { result: result2, status: "success" } : result2);
      } catch (err) {
        const error = getContractError(err, {
          abi: abi2,
          address,
          args,
          docsPath: "/docs/contract/multicall",
          functionName
        });
        if (!allowFailure)
          throw error;
        results.push({ error, result: void 0, status: "failure" });
      }
    }
  }
  if (results.length !== contracts.length)
    throw new BaseError$2("multicall results mismatch");
  return results;
}
async function simulateBlocks(client, parameters) {
  const { blockNumber, blockTag = client.experimental_blockTag ?? "latest", blocks, returnFullTransactions, traceTransfers, validation } = parameters;
  try {
    const blockStateCalls = [];
    for (const block2 of blocks) {
      const blockOverrides = block2.blockOverrides ? toRpc(block2.blockOverrides) : void 0;
      const calls = block2.calls.map((call_) => {
        const call2 = call_;
        const account = call2.account ? parseAccount(call2.account) : void 0;
        const data = call2.abi ? encodeFunctionData(call2) : call2.data;
        const request = {
          ...call2,
          account,
          data: call2.dataSuffix ? concat$1([data || "0x", call2.dataSuffix]) : data,
          from: call2.from ?? account?.address
        };
        assertRequest(request);
        return formatTransactionRequest(request);
      });
      const stateOverrides = block2.stateOverrides ? serializeStateOverride(block2.stateOverrides) : void 0;
      blockStateCalls.push({
        blockOverrides,
        calls,
        stateOverrides
      });
    }
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const result = await client.request({
      method: "eth_simulateV1",
      params: [
        { blockStateCalls, returnFullTransactions, traceTransfers, validation },
        block
      ]
    });
    return result.map((block2, i) => ({
      ...formatBlock(block2),
      calls: block2.calls.map((call2, j) => {
        const { abi: abi2, args, functionName, to } = blocks[i].calls[j];
        const data = call2.error?.data ?? call2.returnData;
        const gasUsed = BigInt(call2.gasUsed);
        const logs = call2.logs?.map((log) => formatLog(log));
        const status = call2.status === "0x1" ? "success" : "failure";
        const result2 = abi2 && status === "success" && data !== "0x" ? decodeFunctionResult({
          abi: abi2,
          data,
          functionName
        }) : null;
        const error = (() => {
          if (status === "success")
            return void 0;
          let error2;
          if (call2.error?.data === "0x")
            error2 = new AbiDecodingZeroDataError();
          else if (call2.error)
            error2 = new RawContractError(call2.error);
          if (!error2)
            return void 0;
          return getContractError(error2, {
            abi: abi2 ?? [],
            address: to ?? "0x",
            args,
            functionName: functionName ?? "<unknown>"
          });
        })();
        return {
          data,
          gasUsed,
          logs,
          status,
          ...status === "success" ? {
            result: result2
          } : {
            error
          }
        };
      })
    }));
  } catch (e) {
    const cause = e;
    const error = getNodeError(cause, {});
    if (error instanceof UnknownNodeError)
      throw cause;
    throw error;
  }
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
      if (char === " " && ["event", "function", "error", ""].includes(result))
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
    throw new BaseError2("Unable to normalize signature.");
  return result;
}
function isArgOfType(arg, abiParameter) {
  const argType = typeof arg;
  const abiParameterType = abiParameter.type;
  switch (abiParameterType) {
    case "address":
      return validate$2(arg, { strict: false });
    case "bool":
      return argType === "boolean";
    case "function":
      return argType === "string";
    case "string":
      return argType === "string";
    default: {
      if (abiParameterType === "tuple" && "components" in abiParameter)
        return Object.values(abiParameter.components).every((component, index2) => {
          return isArgOfType(Object.values(arg)[index2], component);
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
        return validate$2(args[parameterIndex], {
          strict: false
        });
      if (types.includes("address") && types.includes("bytes"))
        return validate$2(args[parameterIndex], {
          strict: false
        });
      return false;
    })();
    if (ambiguous)
      return types;
  }
  return;
}
function from$2(abiItem, options = {}) {
  const { prepare = true } = options;
  const item = (() => {
    if (Array.isArray(abiItem))
      return parseAbiItem(abiItem);
    if (typeof abiItem === "string")
      return parseAbiItem(abiItem);
    return abiItem;
  })();
  return {
    ...item,
    ...prepare ? { hash: getSignatureHash(item) } : {}
  };
}
function fromAbi$2(abi2, name, options) {
  const { args = [], prepare = true } = options ?? {};
  const isSelector = validate$3(name, { strict: false });
  const abiItems = abi2.filter((abiItem2) => {
    if (isSelector) {
      if (abiItem2.type === "function" || abiItem2.type === "error")
        return getSelector$1(abiItem2) === slice(name, 0, 4);
      if (abiItem2.type === "event")
        return getSignatureHash(abiItem2) === name;
      return false;
    }
    return "name" in abiItem2 && abiItem2.name === name;
  });
  if (abiItems.length === 0)
    throw new NotFoundError({ name });
  if (abiItems.length === 1)
    return {
      ...abiItems[0],
      ...prepare ? { hash: getSignatureHash(abiItems[0]) } : {}
    };
  let matchedAbiItem;
  for (const abiItem2 of abiItems) {
    if (!("inputs" in abiItem2))
      continue;
    if (!args || args.length === 0) {
      if (!abiItem2.inputs || abiItem2.inputs.length === 0)
        return {
          ...abiItem2,
          ...prepare ? { hash: getSignatureHash(abiItem2) } : {}
        };
      continue;
    }
    if (!abiItem2.inputs)
      continue;
    if (abiItem2.inputs.length === 0)
      continue;
    if (abiItem2.inputs.length !== args.length)
      continue;
    const matched = args.every((arg, index2) => {
      const abiParameter = "inputs" in abiItem2 && abiItem2.inputs[index2];
      if (!abiParameter)
        return false;
      return isArgOfType(arg, abiParameter);
    });
    if (matched) {
      if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
        const ambiguousTypes = getAmbiguousTypes(abiItem2.inputs, matchedAbiItem.inputs, args);
        if (ambiguousTypes)
          throw new AmbiguityError({
            abiItem: abiItem2,
            type: ambiguousTypes[0]
          }, {
            abiItem: matchedAbiItem,
            type: ambiguousTypes[1]
          });
      }
      matchedAbiItem = abiItem2;
    }
  }
  const abiItem = (() => {
    if (matchedAbiItem)
      return matchedAbiItem;
    const [abiItem2, ...overloads] = abiItems;
    return { ...abiItem2, overloads };
  })();
  if (!abiItem)
    throw new NotFoundError({ name });
  return {
    ...abiItem,
    ...prepare ? { hash: getSignatureHash(abiItem) } : {}
  };
}
function getSelector$1(...parameters) {
  const abiItem = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name] = parameters;
      return fromAbi$2(abi2, name);
    }
    return parameters[0];
  })();
  return slice(getSignatureHash(abiItem), 0, 4);
}
function getSignature(...parameters) {
  const abiItem = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name] = parameters;
      return fromAbi$2(abi2, name);
    }
    return parameters[0];
  })();
  const signature = (() => {
    if (typeof abiItem === "string")
      return abiItem;
    return formatAbiItem$1(abiItem);
  })();
  return normalizeSignature(signature);
}
function getSignatureHash(...parameters) {
  const abiItem = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name] = parameters;
      return fromAbi$2(abi2, name);
    }
    return parameters[0];
  })();
  if (typeof abiItem !== "string" && "hash" in abiItem && abiItem.hash)
    return abiItem.hash;
  return keccak256(fromString(getSignature(abiItem)));
}
class AmbiguityError extends BaseError2 {
  constructor(x, y) {
    super("Found ambiguous types in overloaded ABI Items.", {
      metaMessages: [
        // TODO: abitype to add support for signature-formatted ABI items.
        `\`${x.type}\` in \`${normalizeSignature(formatAbiItem$1(x.abiItem))}\`, and`,
        `\`${y.type}\` in \`${normalizeSignature(formatAbiItem$1(y.abiItem))}\``,
        "",
        "These types encode differently and cannot be distinguished at runtime.",
        "Remove one of the ambiguous items in the ABI."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiItem.AmbiguityError"
    });
  }
}
class NotFoundError extends BaseError2 {
  constructor({ name, data, type = "item" }) {
    const selector = (() => {
      if (name)
        return ` with name "${name}"`;
      if (data)
        return ` with data "${data}"`;
      return "";
    })();
    super(`ABI ${type}${selector} not found.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiItem.NotFoundError"
    });
  }
}
function encode(...parameters) {
  const [abiConstructor, options] = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, options2] = parameters;
      return [fromAbi$1(abi2), options2];
    }
    return parameters;
  })();
  const { bytecode, args } = options;
  return concat(bytecode, abiConstructor.inputs?.length && args?.length ? encode$1(abiConstructor.inputs, args) : "0x");
}
function from$1(abiConstructor) {
  return from$2(abiConstructor);
}
function fromAbi$1(abi2) {
  const item = abi2.find((item2) => item2.type === "constructor");
  if (!item)
    throw new NotFoundError({ name: "constructor" });
  return item;
}
function encodeData(...parameters) {
  const [abiFunction, args = []] = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name, args3] = parameters;
      return [fromAbi(abi2, name, { args: args3 }), args3];
    }
    const [abiFunction2, args2] = parameters;
    return [abiFunction2, args2];
  })();
  const { overloads } = abiFunction;
  const item = overloads ? fromAbi([abiFunction, ...overloads], abiFunction.name, {
    args
  }) : abiFunction;
  const selector = getSelector(item);
  const data = args.length > 0 ? encode$1(item.inputs, args) : void 0;
  return data ? concat(selector, data) : selector;
}
function from(abiFunction, options = {}) {
  return from$2(abiFunction, options);
}
function fromAbi(abi2, name, options) {
  const item = fromAbi$2(abi2, name, options);
  if (item.type !== "function")
    throw new NotFoundError({ name, type: "function" });
  return item;
}
function getSelector(abiItem) {
  return getSelector$1(abiItem);
}
const ethAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const zeroAddress = "0x0000000000000000000000000000000000000000";
const getBalanceCode = "0x6080604052348015600e575f80fd5b5061016d8061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063f8b2cb4f1461002d575b5f80fd5b610047600480360381019061004291906100db565b61005d565b604051610054919061011e565b60405180910390f35b5f8173ffffffffffffffffffffffffffffffffffffffff16319050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100aa82610081565b9050919050565b6100ba816100a0565b81146100c4575f80fd5b50565b5f813590506100d5816100b1565b92915050565b5f602082840312156100f0576100ef61007d565b5b5f6100fd848285016100c7565b91505092915050565b5f819050919050565b61011881610106565b82525050565b5f6020820190506101315f83018461010f565b9291505056fea26469706673582212203b9fe929fe995c7cf9887f0bdba8a36dd78e8b73f149b17d2d9ad7cd09d2dc6264736f6c634300081a0033";
async function simulateCalls(client, parameters) {
  const { blockNumber, blockTag, calls, stateOverrides, traceAssetChanges, traceTransfers, validation } = parameters;
  const account = parameters.account ? parseAccount(parameters.account) : void 0;
  if (traceAssetChanges && !account)
    throw new BaseError$2("`account` is required when `traceAssetChanges` is true");
  const getBalanceData = account ? encode(from$1("constructor(bytes, bytes)"), {
    bytecode: deploylessCallViaBytecodeBytecode,
    args: [
      getBalanceCode,
      encodeData(from("function getBalance(address)"), [account.address])
    ]
  }) : void 0;
  const assetAddresses = traceAssetChanges ? await Promise.all(parameters.calls.map(async (call2) => {
    if (!call2.data && !call2.abi)
      return;
    const { accessList } = await createAccessList(client, {
      account: account.address,
      ...call2,
      data: call2.abi ? encodeFunctionData(call2) : call2.data
    });
    return accessList.map(({ address, storageKeys }) => storageKeys.length > 0 ? address : null);
  })).then((x) => x.flat().filter(Boolean)) : [];
  const blocks = await simulateBlocks(client, {
    blockNumber,
    blockTag,
    blocks: [
      ...traceAssetChanges ? [
        // ETH pre balances
        {
          calls: [{ data: getBalanceData }],
          stateOverrides
        },
        // Asset pre balances
        {
          calls: assetAddresses.map((address, i) => ({
            abi: [
              from("function balanceOf(address) returns (uint256)")
            ],
            functionName: "balanceOf",
            args: [account.address],
            to: address,
            from: zeroAddress,
            nonce: i
          })),
          stateOverrides: [
            {
              address: zeroAddress,
              nonce: 0
            }
          ]
        }
      ] : [],
      {
        calls: [...calls, {}].map((call2) => ({
          ...call2,
          from: account?.address
        })),
        stateOverrides
      },
      ...traceAssetChanges ? [
        // ETH post balances
        {
          calls: [{ data: getBalanceData }]
        },
        // Asset post balances
        {
          calls: assetAddresses.map((address, i) => ({
            abi: [
              from("function balanceOf(address) returns (uint256)")
            ],
            functionName: "balanceOf",
            args: [account.address],
            to: address,
            from: zeroAddress,
            nonce: i
          })),
          stateOverrides: [
            {
              address: zeroAddress,
              nonce: 0
            }
          ]
        },
        // Decimals
        {
          calls: assetAddresses.map((address, i) => ({
            to: address,
            abi: [
              from("function decimals() returns (uint256)")
            ],
            functionName: "decimals",
            from: zeroAddress,
            nonce: i
          })),
          stateOverrides: [
            {
              address: zeroAddress,
              nonce: 0
            }
          ]
        },
        // Token URI
        {
          calls: assetAddresses.map((address, i) => ({
            to: address,
            abi: [
              from("function tokenURI(uint256) returns (string)")
            ],
            functionName: "tokenURI",
            args: [0n],
            from: zeroAddress,
            nonce: i
          })),
          stateOverrides: [
            {
              address: zeroAddress,
              nonce: 0
            }
          ]
        },
        // Symbols
        {
          calls: assetAddresses.map((address, i) => ({
            to: address,
            abi: [from("function symbol() returns (string)")],
            functionName: "symbol",
            from: zeroAddress,
            nonce: i
          })),
          stateOverrides: [
            {
              address: zeroAddress,
              nonce: 0
            }
          ]
        }
      ] : []
    ],
    traceTransfers,
    validation
  });
  const block_results = traceAssetChanges ? blocks[2] : blocks[0];
  const [block_ethPre, block_assetsPre, , block_ethPost, block_assetsPost, block_decimals, block_tokenURI, block_symbols] = traceAssetChanges ? blocks : [];
  const { calls: block_calls, ...block } = block_results;
  const results = block_calls.slice(0, -1) ?? [];
  const ethPre = block_ethPre?.calls ?? [];
  const assetsPre = block_assetsPre?.calls ?? [];
  const balancesPre = [...ethPre, ...assetsPre].map((call2) => call2.status === "success" ? hexToBigInt(call2.data) : null);
  const ethPost = block_ethPost?.calls ?? [];
  const assetsPost = block_assetsPost?.calls ?? [];
  const balancesPost = [...ethPost, ...assetsPost].map((call2) => call2.status === "success" ? hexToBigInt(call2.data) : null);
  const decimals = (block_decimals?.calls ?? []).map((x) => x.status === "success" ? x.result : null);
  const symbols = (block_symbols?.calls ?? []).map((x) => x.status === "success" ? x.result : null);
  const tokenURI = (block_tokenURI?.calls ?? []).map((x) => x.status === "success" ? x.result : null);
  const changes = [];
  for (const [i, balancePost] of balancesPost.entries()) {
    const balancePre = balancesPre[i];
    if (typeof balancePost !== "bigint")
      continue;
    if (typeof balancePre !== "bigint")
      continue;
    const decimals_ = decimals[i - 1];
    const symbol_ = symbols[i - 1];
    const tokenURI_ = tokenURI[i - 1];
    const token = (() => {
      if (i === 0)
        return {
          address: ethAddress,
          decimals: 18,
          symbol: "ETH"
        };
      return {
        address: assetAddresses[i - 1],
        decimals: tokenURI_ || decimals_ ? Number(decimals_ ?? 1) : void 0,
        symbol: symbol_ ?? void 0
      };
    })();
    if (changes.some((change) => change.token.address === token.address))
      continue;
    changes.push({
      token,
      value: {
        pre: balancePre,
        post: balancePost,
        diff: balancePost - balancePre
      }
    });
  }
  return {
    assetChanges: changes,
    block,
    results
  };
}
const magicBytes = "0x6492649264926492649264926492649264926492649264926492649264926492";
function assert(wrapped) {
  if (slice(wrapped, -32) !== magicBytes)
    throw new InvalidWrappedSignatureError2(wrapped);
}
function wrap(value) {
  const { data, signature, to } = value;
  return concat(encode$1(from$6("address, bytes, bytes"), [
    to,
    data,
    signature
  ]), magicBytes);
}
function validate(wrapped) {
  try {
    assert(wrapped);
    return true;
  } catch {
    return false;
  }
}
class InvalidWrappedSignatureError2 extends BaseError2 {
  constructor(wrapped) {
    super(`Value \`${wrapped}\` is an invalid ERC-6492 wrapped signature.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SignatureErc6492.InvalidWrappedSignatureError"
    });
  }
}
function serializeSignature({ r, s, to = "hex", v, yParity }) {
  const yParity_ = (() => {
    if (yParity === 0 || yParity === 1)
      return yParity;
    if (v && (v === 27n || v === 28n || v >= 35n))
      return v % 2n === 0n ? 1 : 0;
    throw new Error("Invalid `v` or `yParity` value");
  })();
  const signature = `0x${new secp256k1.Signature(hexToBigInt(r), hexToBigInt(s)).toCompactHex()}${yParity_ === 0 ? "1b" : "1c"}`;
  if (to === "hex")
    return signature;
  return hexToBytes$1(signature);
}
async function verifyHash(client, parameters) {
  const { address, hash: hash2, erc6492VerifierAddress: verifierAddress = parameters.universalSignatureVerifierAddress ?? client.chain?.contracts?.erc6492Verifier?.address, multicallAddress = parameters.multicallAddress ?? client.chain?.contracts?.multicall3?.address } = parameters;
  const signature = (() => {
    const signature2 = parameters.signature;
    if (isHex(signature2))
      return signature2;
    if (typeof signature2 === "object" && "r" in signature2 && "s" in signature2)
      return serializeSignature(signature2);
    return bytesToHex$1(signature2);
  })();
  try {
    if (validate$1(signature))
      return await verifyErc8010(client, {
        ...parameters,
        multicallAddress,
        signature
      });
    return await verifyErc6492(client, {
      ...parameters,
      verifierAddress,
      signature
    });
  } catch (error) {
    try {
      const verified = isAddressEqual(getAddress(address), await recoverAddress$1({ hash: hash2, signature }));
      if (verified)
        return true;
    } catch {
    }
    if (error instanceof VerificationError) {
      return false;
    }
    throw error;
  }
}
async function verifyErc8010(client, parameters) {
  const { address, blockNumber, blockTag, hash: hash2, multicallAddress } = parameters;
  const { authorization: authorization_ox, data: initData, signature, to } = unwrap(parameters.signature);
  const code = await getCode(client, {
    address,
    blockNumber,
    blockTag
  });
  if (code === concatHex(["0xef0100", authorization_ox.address]))
    return await verifyErc1271(client, {
      address,
      blockNumber,
      blockTag,
      hash: hash2,
      signature
    });
  const authorization = {
    address: authorization_ox.address,
    chainId: Number(authorization_ox.chainId),
    nonce: Number(authorization_ox.nonce),
    r: numberToHex(authorization_ox.r, { size: 32 }),
    s: numberToHex(authorization_ox.s, { size: 32 }),
    yParity: authorization_ox.yParity
  };
  const valid = await verifyAuthorization({
    address,
    authorization
  });
  if (!valid)
    throw new VerificationError();
  const results = await getAction(client, readContract, "readContract")({
    ...multicallAddress ? { address: multicallAddress } : { code: multicall3Bytecode },
    authorizationList: [authorization],
    abi: multicall3Abi,
    blockNumber,
    blockTag: "pending",
    functionName: "aggregate3",
    args: [
      [
        ...initData ? [
          {
            allowFailure: true,
            target: to ?? address,
            callData: initData
          }
        ] : [],
        {
          allowFailure: true,
          target: address,
          callData: encodeFunctionData({
            abi: erc1271Abi,
            functionName: "isValidSignature",
            args: [hash2, signature]
          })
        }
      ]
    ]
  });
  const data = results[results.length - 1]?.returnData;
  if (data?.startsWith("0x1626ba7e"))
    return true;
  throw new VerificationError();
}
async function verifyErc6492(client, parameters) {
  const { address, factory, factoryData, hash: hash2, signature, verifierAddress, ...rest } = parameters;
  const wrappedSignature = await (async () => {
    if (!factory && !factoryData)
      return signature;
    if (validate(signature))
      return signature;
    return wrap({
      data: factoryData,
      signature,
      to: factory
    });
  })();
  const args = verifierAddress ? {
    to: verifierAddress,
    data: encodeFunctionData({
      abi: erc6492SignatureValidatorAbi,
      functionName: "isValidSig",
      args: [address, hash2, wrappedSignature]
    }),
    ...rest
  } : {
    data: encodeDeployData({
      abi: erc6492SignatureValidatorAbi,
      args: [address, hash2, wrappedSignature],
      bytecode: erc6492SignatureValidatorByteCode
    }),
    ...rest
  };
  const { data } = await getAction(client, call, "call")(args).catch((error) => {
    if (error instanceof CallExecutionError)
      throw new VerificationError();
    throw error;
  });
  if (hexToBool(data ?? "0x0"))
    return true;
  throw new VerificationError();
}
async function verifyErc1271(client, parameters) {
  const { address, blockNumber, blockTag, hash: hash2, signature } = parameters;
  const result = await getAction(client, readContract, "readContract")({
    address,
    abi: erc1271Abi,
    args: [hash2, signature],
    blockNumber,
    blockTag,
    functionName: "isValidSignature"
  }).catch((error) => {
    if (error instanceof ContractFunctionExecutionError)
      throw new VerificationError();
    throw error;
  });
  if (result.startsWith("0x1626ba7e"))
    return true;
  throw new VerificationError();
}
class VerificationError extends Error {
}
async function verifyMessage(client, { address, message, factory, factoryData, signature, ...callRequest }) {
  const hash2 = hashMessage(message);
  return verifyHash(client, {
    address,
    factory,
    factoryData,
    hash: hash2,
    signature,
    ...callRequest
  });
}
async function verifyTypedData(client, parameters) {
  const { address, factory, factoryData, signature, message, primaryType, types, domain, ...callRequest } = parameters;
  const hash2 = hashTypedData({ message, primaryType, types, domain });
  return verifyHash(client, {
    address,
    factory,
    factoryData,
    hash: hash2,
    signature,
    ...callRequest
  });
}
function watchBlockNumber(client, { emitOnBegin = false, emitMissed = false, onBlockNumber, onError, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (client.transport.type === "webSocket" || client.transport.type === "ipc")
      return false;
    if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
      return false;
    return true;
  })();
  let prevBlockNumber;
  const pollBlockNumber = () => {
    const observerId = stringify$1([
      "watchBlockNumber",
      client.uid,
      emitOnBegin,
      emitMissed,
      pollingInterval
    ]);
    return observe(observerId, { onBlockNumber, onError }, (emit) => poll(async () => {
      try {
        const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({ cacheTime: 0 });
        if (prevBlockNumber !== void 0) {
          if (blockNumber === prevBlockNumber)
            return;
          if (blockNumber - prevBlockNumber > 1 && emitMissed) {
            for (let i = prevBlockNumber + 1n; i < blockNumber; i++) {
              emit.onBlockNumber(i, prevBlockNumber);
              prevBlockNumber = i;
            }
          }
        }
        if (prevBlockNumber === void 0 || blockNumber > prevBlockNumber) {
          emit.onBlockNumber(blockNumber, prevBlockNumber);
          prevBlockNumber = blockNumber;
        }
      } catch (err) {
        emit.onError?.(err);
      }
    }, {
      emitOnBegin,
      interval: pollingInterval
    }));
  };
  const subscribeBlockNumber = () => {
    const observerId = stringify$1([
      "watchBlockNumber",
      client.uid,
      emitOnBegin,
      emitMissed
    ]);
    return observe(observerId, { onBlockNumber, onError }, (emit) => {
      let active = true;
      let unsubscribe = () => active = false;
      (async () => {
        try {
          const transport = (() => {
            if (client.transport.type === "fallback") {
              const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
              if (!transport2)
                return client.transport;
              return transport2.value;
            }
            return client.transport;
          })();
          const { unsubscribe: unsubscribe_ } = await transport.subscribe({
            params: ["newHeads"],
            onData(data) {
              if (!active)
                return;
              const blockNumber = hexToBigInt(data.result?.number);
              emit.onBlockNumber(blockNumber, prevBlockNumber);
              prevBlockNumber = blockNumber;
            },
            onError(error) {
              emit.onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    });
  };
  return enablePolling ? pollBlockNumber() : subscribeBlockNumber();
}
async function waitForTransactionReceipt(client, parameters) {
  const {
    checkReplacement = true,
    confirmations = 1,
    hash: hash2,
    onReplaced,
    retryCount = 6,
    retryDelay = ({ count }) => ~~(1 << count) * 200,
    // exponential backoff
    timeout = 18e4
  } = parameters;
  const observerId = stringify$1(["waitForTransactionReceipt", client.uid, hash2]);
  const pollingInterval = (() => {
    if (parameters.pollingInterval)
      return parameters.pollingInterval;
    if (client.chain?.experimental_preconfirmationTime)
      return client.chain.experimental_preconfirmationTime;
    return client.pollingInterval;
  })();
  let transaction;
  let replacedTransaction;
  let receipt;
  let retrying = false;
  let _unobserve;
  let _unwatch;
  const { promise, resolve, reject } = withResolvers();
  const timer = timeout ? setTimeout(() => {
    _unwatch?.();
    _unobserve?.();
    reject(new WaitForTransactionReceiptTimeoutError({ hash: hash2 }));
  }, timeout) : void 0;
  _unobserve = observe(observerId, { onReplaced, resolve, reject }, async (emit) => {
    receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: hash2 }).catch(() => void 0);
    if (receipt && confirmations <= 1) {
      clearTimeout(timer);
      emit.resolve(receipt);
      _unobserve?.();
      return;
    }
    _unwatch = getAction(client, watchBlockNumber, "watchBlockNumber")({
      emitMissed: true,
      emitOnBegin: true,
      poll: true,
      pollingInterval,
      async onBlockNumber(blockNumber_) {
        const done = (fn) => {
          clearTimeout(timer);
          _unwatch?.();
          fn();
          _unobserve?.();
        };
        let blockNumber = blockNumber_;
        if (retrying)
          return;
        try {
          if (receipt) {
            if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
              return;
            done(() => emit.resolve(receipt));
            return;
          }
          if (checkReplacement && !transaction) {
            retrying = true;
            await withRetry(async () => {
              transaction = await getAction(client, getTransaction, "getTransaction")({ hash: hash2 });
              if (transaction.blockNumber)
                blockNumber = transaction.blockNumber;
            }, {
              delay: retryDelay,
              retryCount
            });
            retrying = false;
          }
          receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: hash2 });
          if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
            return;
          done(() => emit.resolve(receipt));
        } catch (err) {
          if (err instanceof TransactionNotFoundError || err instanceof TransactionReceiptNotFoundError) {
            if (!transaction) {
              retrying = false;
              return;
            }
            try {
              replacedTransaction = transaction;
              retrying = true;
              const block = await withRetry(() => getAction(client, getBlock, "getBlock")({
                blockNumber,
                includeTransactions: true
              }), {
                delay: retryDelay,
                retryCount,
                shouldRetry: ({ error }) => error instanceof BlockNotFoundError
              });
              retrying = false;
              const replacementTransaction = block.transactions.find(({ from: from2, nonce }) => from2 === replacedTransaction.from && nonce === replacedTransaction.nonce);
              if (!replacementTransaction)
                return;
              receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({
                hash: replacementTransaction.hash
              });
              if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                return;
              let reason = "replaced";
              if (replacementTransaction.to === replacedTransaction.to && replacementTransaction.value === replacedTransaction.value && replacementTransaction.input === replacedTransaction.input) {
                reason = "repriced";
              } else if (replacementTransaction.from === replacementTransaction.to && replacementTransaction.value === 0n) {
                reason = "cancelled";
              }
              done(() => {
                emit.onReplaced?.({
                  reason,
                  replacedTransaction,
                  transaction: replacementTransaction,
                  transactionReceipt: receipt
                });
                emit.resolve(receipt);
              });
            } catch (err_) {
              done(() => emit.reject(err_));
            }
          } else {
            done(() => emit.reject(err));
          }
        }
      }
    });
  });
  return promise;
}
function watchBlocks(client, { blockTag = client.experimental_blockTag ?? "latest", emitMissed = false, emitOnBegin = false, onBlock, onError, includeTransactions: includeTransactions_, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (client.transport.type === "webSocket" || client.transport.type === "ipc")
      return false;
    if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
      return false;
    return true;
  })();
  const includeTransactions = includeTransactions_ ?? false;
  let prevBlock;
  const pollBlocks = () => {
    const observerId = stringify$1([
      "watchBlocks",
      client.uid,
      blockTag,
      emitMissed,
      emitOnBegin,
      includeTransactions,
      pollingInterval
    ]);
    return observe(observerId, { onBlock, onError }, (emit) => poll(async () => {
      try {
        const block = await getAction(client, getBlock, "getBlock")({
          blockTag,
          includeTransactions
        });
        if (block.number !== null && prevBlock?.number != null) {
          if (block.number === prevBlock.number)
            return;
          if (block.number - prevBlock.number > 1 && emitMissed) {
            for (let i = prevBlock?.number + 1n; i < block.number; i++) {
              const block2 = await getAction(client, getBlock, "getBlock")({
                blockNumber: i,
                includeTransactions
              });
              emit.onBlock(block2, prevBlock);
              prevBlock = block2;
            }
          }
        }
        if (
          // If no previous block exists, emit.
          prevBlock?.number == null || // If the block tag is "pending" with no block number, emit.
          blockTag === "pending" && block?.number == null || // If the next block number is greater than the previous block number, emit.
          // We don't want to emit blocks in the past.
          block.number !== null && block.number > prevBlock.number
        ) {
          emit.onBlock(block, prevBlock);
          prevBlock = block;
        }
      } catch (err) {
        emit.onError?.(err);
      }
    }, {
      emitOnBegin,
      interval: pollingInterval
    }));
  };
  const subscribeBlocks = () => {
    let active = true;
    let emitFetched = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        if (emitOnBegin) {
          getAction(client, getBlock, "getBlock")({
            blockTag,
            includeTransactions
          }).then((block) => {
            if (!active)
              return;
            if (!emitFetched)
              return;
            onBlock(block, void 0);
            emitFetched = false;
          }).catch(onError);
        }
        const transport = (() => {
          if (client.transport.type === "fallback") {
            const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
            if (!transport2)
              return client.transport;
            return transport2.value;
          }
          return client.transport;
        })();
        const { unsubscribe: unsubscribe_ } = await transport.subscribe({
          params: ["newHeads"],
          async onData(data) {
            if (!active)
              return;
            const block = await getAction(client, getBlock, "getBlock")({
              blockNumber: data.result?.number,
              includeTransactions
            }).catch(() => {
            });
            if (!active)
              return;
            onBlock(block, prevBlock);
            emitFetched = false;
            prevBlock = block;
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollBlocks() : subscribeBlocks();
}
function watchEvent(client, { address, args, batch = true, event, events, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ }) {
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (typeof fromBlock === "bigint")
      return true;
    if (client.transport.type === "webSocket" || client.transport.type === "ipc")
      return false;
    if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
      return false;
    return true;
  })();
  const strict = strict_ ?? false;
  const pollEvent = () => {
    const observerId = stringify$1([
      "watchEvent",
      address,
      args,
      batch,
      client.uid,
      event,
      pollingInterval,
      fromBlock
    ]);
    return observe(observerId, { onLogs, onError }, (emit) => {
      let previousBlockNumber;
      if (fromBlock !== void 0)
        previousBlockNumber = fromBlock - 1n;
      let filter;
      let initialized = false;
      const unwatch = poll(async () => {
        if (!initialized) {
          try {
            filter = await getAction(client, createEventFilter, "createEventFilter")({
              address,
              args,
              event,
              events,
              strict,
              fromBlock
            });
          } catch {
          }
          initialized = true;
          return;
        }
        try {
          let logs;
          if (filter) {
            logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          } else {
            const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
            if (previousBlockNumber && previousBlockNumber !== blockNumber) {
              logs = await getAction(client, getLogs, "getLogs")({
                address,
                args,
                event,
                events,
                fromBlock: previousBlockNumber + 1n,
                toBlock: blockNumber
              });
            } else {
              logs = [];
            }
            previousBlockNumber = blockNumber;
          }
          if (logs.length === 0)
            return;
          if (batch)
            emit.onLogs(logs);
          else
            for (const log of logs)
              emit.onLogs([log]);
        } catch (err) {
          if (filter && err instanceof InvalidInputRpcError)
            initialized = false;
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribeEvent = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const transport = (() => {
          if (client.transport.type === "fallback") {
            const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
            if (!transport2)
              return client.transport;
            return transport2.value;
          }
          return client.transport;
        })();
        const events_ = events ?? (event ? [event] : void 0);
        let topics = [];
        if (events_) {
          const encoded = events_.flatMap((event2) => encodeEventTopics({
            abi: [event2],
            eventName: event2.name,
            args
          }));
          topics = [encoded];
          if (event)
            topics = topics[0];
        }
        const { unsubscribe: unsubscribe_ } = await transport.subscribe({
          params: ["logs", { address, topics }],
          onData(data) {
            if (!active)
              return;
            const log = data.result;
            try {
              const { eventName, args: args2 } = decodeEventLog({
                abi: events_ ?? [],
                data: log.data,
                topics: log.topics,
                strict
              });
              const formatted = formatLog(log, { args: args2, eventName });
              onLogs([formatted]);
            } catch (err) {
              let eventName;
              let isUnnamed;
              if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                if (strict_)
                  return;
                eventName = err.abiItem.name;
                isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
              }
              const formatted = formatLog(log, {
                args: isUnnamed ? [] : {},
                eventName
              });
              onLogs([formatted]);
            }
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollEvent() : subscribeEvent();
}
function watchPendingTransactions(client, { batch = true, onError, onTransactions, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket" && client.transport.type !== "ipc";
  const pollPendingTransactions = () => {
    const observerId = stringify$1([
      "watchPendingTransactions",
      client.uid,
      batch,
      pollingInterval
    ]);
    return observe(observerId, { onTransactions, onError }, (emit) => {
      let filter;
      const unwatch = poll(async () => {
        try {
          if (!filter) {
            try {
              filter = await getAction(client, createPendingTransactionFilter, "createPendingTransactionFilter")({});
              return;
            } catch (err) {
              unwatch();
              throw err;
            }
          }
          const hashes = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          if (hashes.length === 0)
            return;
          if (batch)
            emit.onTransactions(hashes);
          else
            for (const hash2 of hashes)
              emit.onTransactions([hash2]);
        } catch (err) {
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribePendingTransactions = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
          params: ["newPendingTransactions"],
          onData(data) {
            if (!active)
              return;
            const transaction = data.result;
            onTransactions([transaction]);
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollPendingTransactions() : subscribePendingTransactions();
}
function parseSiweMessage(message) {
  const { scheme, statement, ...prefix } = message.match(prefixRegex)?.groups ?? {};
  const { chainId, expirationTime, issuedAt, notBefore, requestId, ...suffix } = message.match(suffixRegex)?.groups ?? {};
  const resources = message.split("Resources:")[1]?.split("\n- ").slice(1);
  return {
    ...prefix,
    ...suffix,
    ...chainId ? { chainId: Number(chainId) } : {},
    ...expirationTime ? { expirationTime: new Date(expirationTime) } : {},
    ...issuedAt ? { issuedAt: new Date(issuedAt) } : {},
    ...notBefore ? { notBefore: new Date(notBefore) } : {},
    ...requestId ? { requestId } : {},
    ...resources ? { resources } : {},
    ...scheme ? { scheme } : {},
    ...statement ? { statement } : {}
  };
}
const prefixRegex = /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/;
const suffixRegex = /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;
function validateSiweMessage(parameters) {
  const { address, domain, message, nonce, scheme, time = /* @__PURE__ */ new Date() } = parameters;
  if (domain && message.domain !== domain)
    return false;
  if (nonce && message.nonce !== nonce)
    return false;
  if (scheme && message.scheme !== scheme)
    return false;
  if (message.expirationTime && time >= message.expirationTime)
    return false;
  if (message.notBefore && time < message.notBefore)
    return false;
  try {
    if (!message.address)
      return false;
    if (!isAddress(message.address, { strict: false }))
      return false;
    if (address && !isAddressEqual(message.address, address))
      return false;
  } catch {
    return false;
  }
  return true;
}
async function verifySiweMessage(client, parameters) {
  const { address, domain, message, nonce, scheme, signature, time = /* @__PURE__ */ new Date(), ...callRequest } = parameters;
  const parsed = parseSiweMessage(message);
  if (!parsed.address)
    return false;
  const isValid = validateSiweMessage({
    address,
    domain,
    message: parsed,
    nonce,
    scheme,
    time
  });
  if (!isValid)
    return false;
  const hash2 = hashMessage(message);
  return verifyHash(client, {
    address: parsed.address,
    hash: hash2,
    signature,
    ...callRequest
  });
}
async function sendRawTransactionSync(client, { serializedTransaction, throwOnReceiptRevert, timeout }) {
  const receipt = await client.request({
    method: "eth_sendRawTransactionSync",
    params: timeout ? [serializedTransaction, numberToHex(timeout)] : [serializedTransaction]
  }, { retryCount: 0 });
  const format = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
  const formatted = format(receipt);
  if (formatted.status === "reverted" && throwOnReceiptRevert)
    throw new TransactionReceiptRevertedError({ receipt: formatted });
  return formatted;
}
function publicActions(client) {
  return {
    call: (args) => call(client, args),
    createAccessList: (args) => createAccessList(client, args),
    createBlockFilter: () => createBlockFilter(client),
    createContractEventFilter: (args) => createContractEventFilter(client, args),
    createEventFilter: (args) => createEventFilter(client, args),
    createPendingTransactionFilter: () => createPendingTransactionFilter(client),
    estimateContractGas: (args) => estimateContractGas(client, args),
    estimateGas: (args) => estimateGas(client, args),
    getBalance: (args) => getBalance(client, args),
    getBlobBaseFee: () => getBlobBaseFee(client),
    getBlock: (args) => getBlock(client, args),
    getBlockNumber: (args) => getBlockNumber(client, args),
    getBlockTransactionCount: (args) => getBlockTransactionCount(client, args),
    getBytecode: (args) => getCode(client, args),
    getChainId: () => getChainId(client),
    getCode: (args) => getCode(client, args),
    getContractEvents: (args) => getContractEvents(client, args),
    getEip712Domain: (args) => getEip712Domain(client, args),
    getEnsAddress: (args) => getEnsAddress(client, args),
    getEnsAvatar: (args) => getEnsAvatar(client, args),
    getEnsName: (args) => getEnsName(client, args),
    getEnsResolver: (args) => getEnsResolver(client, args),
    getEnsText: (args) => getEnsText(client, args),
    getFeeHistory: (args) => getFeeHistory(client, args),
    estimateFeesPerGas: (args) => estimateFeesPerGas(client, args),
    getFilterChanges: (args) => getFilterChanges(client, args),
    getFilterLogs: (args) => getFilterLogs(client, args),
    getGasPrice: () => getGasPrice(client),
    getLogs: (args) => getLogs(client, args),
    getProof: (args) => getProof(client, args),
    estimateMaxPriorityFeePerGas: (args) => estimateMaxPriorityFeePerGas(client, args),
    getStorageAt: (args) => getStorageAt(client, args),
    getTransaction: (args) => getTransaction(client, args),
    getTransactionConfirmations: (args) => getTransactionConfirmations(client, args),
    getTransactionCount: (args) => getTransactionCount(client, args),
    getTransactionReceipt: (args) => getTransactionReceipt(client, args),
    multicall: (args) => multicall(client, args),
    prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
    readContract: (args) => readContract(client, args),
    sendRawTransaction: (args) => sendRawTransaction(client, args),
    sendRawTransactionSync: (args) => sendRawTransactionSync(client, args),
    simulate: (args) => simulateBlocks(client, args),
    simulateBlocks: (args) => simulateBlocks(client, args),
    simulateCalls: (args) => simulateCalls(client, args),
    simulateContract: (args) => simulateContract(client, args),
    verifyHash: (args) => verifyHash(client, args),
    verifyMessage: (args) => verifyMessage(client, args),
    verifySiweMessage: (args) => verifySiweMessage(client, args),
    verifyTypedData: (args) => verifyTypedData(client, args),
    uninstallFilter: (args) => uninstallFilter(client, args),
    waitForTransactionReceipt: (args) => waitForTransactionReceipt(client, args),
    watchBlocks: (args) => watchBlocks(client, args),
    watchBlockNumber: (args) => watchBlockNumber(client, args),
    watchContractEvent: (args) => watchContractEvent(client, args),
    watchEvent: (args) => watchEvent(client, args),
    watchPendingTransactions: (args) => watchPendingTransactions(client, args)
  };
}
function createPublicClient(parameters) {
  const { key = "public", name = "Public Client" } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    type: "publicClient"
  });
  return client.extend(publicActions);
}
async function prepareAuthorization(client, parameters) {
  const { account: account_ = client.account, chainId, nonce } = parameters;
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/eip7702/prepareAuthorization"
    });
  const account = parseAccount(account_);
  const executor = (() => {
    if (!parameters.executor)
      return void 0;
    if (parameters.executor === "self")
      return parameters.executor;
    return parseAccount(parameters.executor);
  })();
  const authorization = {
    address: parameters.contractAddress ?? parameters.address,
    chainId,
    nonce
  };
  if (typeof authorization.chainId === "undefined")
    authorization.chainId = client.chain?.id ?? await getAction(client, getChainId, "getChainId")({});
  if (typeof authorization.nonce === "undefined") {
    authorization.nonce = await getAction(client, getTransactionCount, "getTransactionCount")({
      address: account.address,
      blockTag: "pending"
    });
    if (executor === "self" || executor?.address && isAddressEqual(executor.address, account.address))
      authorization.nonce += 1;
  }
  return authorization;
}
function createTransport({ key, methods, name, request, retryCount = 3, retryDelay = 150, timeout, type }, value) {
  const uid$1 = uid();
  return {
    config: {
      key,
      methods,
      name,
      request,
      retryCount,
      retryDelay,
      timeout,
      type
    },
    request: buildRequest(request, { methods, retryCount, retryDelay, uid: uid$1 }),
    value
  };
}
class UrlRequiredError extends BaseError$2 {
  constructor() {
    super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
      docsPath: "/docs/clients/intro",
      name: "UrlRequiredError"
    });
  }
}
function http(url, config = {}) {
  const { batch, fetchFn, fetchOptions, key = "http", methods, name = "HTTP JSON-RPC", onFetchRequest, onFetchResponse, retryDelay, raw } = config;
  return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
    const { batchSize = 1e3, wait: wait2 = 0 } = typeof batch === "object" ? batch : {};
    const retryCount = config.retryCount ?? retryCount_;
    const timeout = timeout_ ?? config.timeout ?? 1e4;
    const url_ = url || chain?.rpcUrls.default.http[0];
    if (!url_)
      throw new UrlRequiredError();
    const rpcClient = getHttpRpcClient(url_, {
      fetchFn,
      fetchOptions,
      onRequest: onFetchRequest,
      onResponse: onFetchResponse,
      timeout
    });
    return createTransport({
      key,
      methods,
      name,
      async request({ method, params }) {
        const body = { method, params };
        const { schedule } = createBatchScheduler({
          id: url_,
          wait: wait2,
          shouldSplitBatch(requests) {
            return requests.length > batchSize;
          },
          fn: (body2) => rpcClient.request({
            body: body2
          }),
          sort: (a, b) => a.id - b.id
        });
        const fn = async (body2) => batch ? schedule(body2) : [
          await rpcClient.request({
            body: body2
          })
        ];
        const [{ error, result }] = await fn(body);
        if (raw)
          return { error, result };
        if (error)
          throw new RpcRequestError({
            body,
            error,
            url: url_
          });
        return result;
      },
      retryCount,
      retryDelay,
      timeout,
      type: "http"
    }, {
      fetchOptions,
      url: url_
    });
  };
}
function parseSignature(signatureHex) {
  const { r, s } = secp256k1.Signature.fromCompact(signatureHex.slice(2, 130));
  const yParityOrV = Number(`0x${signatureHex.slice(130)}`);
  const [v, yParity] = (() => {
    if (yParityOrV === 0 || yParityOrV === 1)
      return [void 0, yParityOrV];
    if (yParityOrV === 27)
      return [BigInt(yParityOrV), 0];
    if (yParityOrV === 28)
      return [BigInt(yParityOrV), 1];
    throw new Error("Invalid yParityOrV value");
  })();
  if (typeof v !== "undefined")
    return {
      r: numberToHex(r, { size: 32 }),
      s: numberToHex(s, { size: 32 }),
      v,
      yParity
    };
  return {
    r: numberToHex(r, { size: 32 }),
    s: numberToHex(s, { size: 32 }),
    yParity
  };
}
export {
  AccountTypeNotSupportedError as $,
  AccountNotFoundError as A,
  InvalidSerializedTransactionTypeError as B,
  InvalidSerializedTransactionError as C,
  assertTransactionEIP1559 as D,
  assertTransactionEIP2930 as E,
  toBlobSidecars as F,
  assertTransactionEIP4844 as G,
  assertTransactionEIP7702 as H,
  InvalidAbiParameterError as I,
  assertTransactionLegacy as J,
  InvalidLegacyVError as K,
  etherUnits as L,
  gweiUnits as M,
  extract$1 as N,
  createClient as O,
  encodeDeployData as P,
  sendCalls as Q,
  waitForCallsStatus as R,
  assertRequest as S,
  recoverAuthorizationAddress as T,
  getChainId as U,
  assertCurrentChain as V,
  waitForTransactionReceipt as W,
  TransactionReceiptRevertedError as X,
  prepareTransactionRequest as Y,
  defaultParameters as Z,
  sendRawTransactionSync as _,
  localBatchGatewayRequest as a,
  UnknownTypeError as a$,
  getTransactionError as a0,
  prepareAuthorization as a1,
  sendRawTransaction as a2,
  getCallsStatus as a3,
  createTransport as a4,
  ExecutionRevertedError as a5,
  wait as a6,
  UrlRequiredError as a7,
  commitmentToVersionedHash as a8,
  EnsInvalidChainIdError as a9,
  IntrinsicGasTooLowError as aA,
  InvalidAbiItemError as aB,
  InvalidAbiParametersError as aC,
  InvalidAbiTypeParameterError as aD,
  InvalidChainIdError as aE,
  InvalidFunctionModifierError as aF,
  InvalidModifierError as aG,
  InvalidParameterError as aH,
  InvalidParenthesisError as aI,
  InvalidSerializableTransactionError as aJ,
  InvalidSignatureError as aK,
  InvalidStorageKeySizeError as aL,
  InvalidStructSignatureError as aM,
  MaxFeePerGasTooLowError as aN,
  NonceMaxValueError as aO,
  NonceTooHighError as aP,
  NonceTooLowError as aQ,
  RawContractError as aR,
  SolidityProtectedKeywordError as aS,
  StateAssignmentConflictError as aT,
  TipAboveFeeCapError as aU,
  TransactionExecutionError as aV,
  TransactionNotFoundError as aW,
  TransactionReceiptNotFoundError as aX,
  TransactionTypeNotSupportedError as aY,
  UnknownNodeError as aZ,
  UnknownSignatureError as a_,
  secp256k1 as aa,
  serializeTransaction as ab,
  AccountStateConflictError as ac,
  BaseFeeScalarError as ad,
  BlockNotFoundError as ae,
  BundleFailedError as af,
  CallExecutionError as ag,
  ChainDoesNotSupportContract as ah,
  ChainMismatchError as ai,
  ChainNotFoundError as aj,
  CircularReferenceError as ak,
  ClientChainNotConfiguredError as al,
  ContractFunctionExecutionError as am,
  ContractFunctionRevertedError as an,
  ContractFunctionZeroDataError as ao,
  CounterfactualDeploymentFailedError as ap,
  Eip1559FeesNotSupportedError as aq,
  EnsAvatarInvalidNftUriError as ar,
  EnsAvatarUnsupportedNamespaceError as as,
  EnsAvatarUriResolutionError as at,
  EstimateGasExecutionError as au,
  FeeCapTooHighError as av,
  FeeCapTooLowError as aw,
  FeeConflictError as ax,
  InsufficientFundsError as ay,
  IntrinsicGasTooHighError as az,
  parseStructs as b,
  WaitForCallsStatusTimeoutError as b0,
  WaitForTransactionReceiptTimeoutError as b1,
  blobsToCommitments as b2,
  blobsToProofs as b3,
  commitmentsToVersionedHashes as b4,
  createNonceManager as b5,
  createPublicClient as b6,
  decodeFunctionData as b7,
  decodeFunctionResult as b8,
  deploylessCallViaBytecodeBytecode as b9,
  presignMessagePrefix as bA,
  publicActions as bB,
  recoverPublicKey$1 as bC,
  rpcSchema as bD,
  serializeAccessList as bE,
  serializeErc6492Signature as bF,
  serializeSignature as bG,
  toBlobs as bH,
  toPrefixedMessage as bI,
  weiUnits as bJ,
  withCache as bK,
  withRetry as bL,
  zeroAddress as bM,
  zeroHash as bN,
  getCode as bO,
  prettyPrint as bP,
  estimateFeesPerGas as bQ,
  serializeStateOverride as bR,
  observe as bS,
  poll as bT,
  deploylessCallViaFactoryBytecode as ba,
  encodeErrorResult as bb,
  encodeFunctionResult as bc,
  encodePacked$1 as bd,
  erc1155Abi as be,
  erc20Abi as bf,
  erc20Abi_bytes32 as bg,
  erc4626Abi as bh,
  erc6492SignatureValidatorAbi as bi,
  erc6492SignatureValidatorByteCode as bj,
  erc721Abi as bk,
  ethAddress as bl,
  formatEther as bm,
  formatGwei as bn,
  formatUnits as bo,
  getChainContractAddress as bp,
  getTransactionType as bq,
  parseSignature as br,
  http as bs,
  multicall3Abi as bt,
  namehash as bu,
  nonceManager as bv,
  parseAbi as bw,
  parseAbiItem as bx,
  parseAbiParameters as by,
  prepareEncodeFunctionData as bz,
  call as c,
  getContractError as d,
  encodeFunctionData as e,
  parseAccount as f,
  getAction as g,
  simulateContract as h,
  isStructSignature as i,
  createContractEventFilter as j,
  getContractEvents as k,
  localBatchGatewayUrl as l,
  modifiers as m,
  estimateContractGas as n,
  createBatchScheduler as o,
  parseAbiParameter as p,
  idCache as q,
  readContract as r,
  sendTransaction as s,
  erc6492MagicBytes as t,
  unwrap as u,
  validate$1 as v,
  watchContractEvent as w,
  recoverAddress$1 as x,
  hashMessage as y,
  wrap$1 as z
};
