import { p as parseAbiParameter$1, m as modifiers, b as parseStructs, i as isStructSignature, I as InvalidAbiParameterError, s as sendTransaction, A as AccountNotFoundError, e as encodeFunctionData, g as getAction, d as getContractError, f as parseAccount, r as readContract, h as simulateContract, j as createContractEventFilter, k as getContractEvents, w as watchContractEvent, n as estimateContractGas, o as createBatchScheduler, q as idCache, t as erc6492MagicBytes, v as validate, u as unwrap, x as recoverAddress, y as hashMessage, z as wrap, B as InvalidSerializedTransactionTypeError, C as InvalidSerializedTransactionError, D as assertTransactionEIP1559, E as assertTransactionEIP2930, F as toBlobSidecars, G as assertTransactionEIP4844, H as assertTransactionEIP7702, J as assertTransactionLegacy, K as InvalidLegacyVError, L as etherUnits, M as gweiUnits, N as extract, O as createClient, P as encodeDeployData, Q as sendCalls, R as waitForCallsStatus, S as assertRequest, T as recoverAuthorizationAddress, U as getChainId, V as assertCurrentChain, W as waitForTransactionReceipt, X as TransactionReceiptRevertedError, Y as prepareTransactionRequest, Z as defaultParameters, _ as sendRawTransactionSync, $ as AccountTypeNotSupportedError, a0 as getTransactionError, a1 as prepareAuthorization, a2 as sendRawTransaction, a3 as getCallsStatus, a4 as createTransport, a5 as ExecutionRevertedError, a6 as wait, a7 as UrlRequiredError, a8 as commitmentToVersionedHash, a9 as EnsInvalidChainIdError, aa as secp256k1, ab as serializeTransaction } from "./parseSignature-Blo-BvRZ.js";
import { ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, an, ao, ap, aq, ar, as, at, au, av, aw, ax, ay, az, aA, aB, aC, aD, aE, aF, aG, aH, aI, aJ, aK, aL, aM, aN, aO, aP, aQ, aR, aS, aT, aU, aV, aW, aX, aY, aZ, a_, a$, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, ba, bb, bc, bd, be, bf, bg, bh, bi, bj, bk, bl, bm, bn, bo, bp, bq, br, bs, bt, bu, bv, bw, bx, by, br as br2, bz, bA, bB, bC, bD, bE, bF, bG, bG as bG2, bH, bI, bi as bi2, bj as bj2, bJ, bK, bL, bM, bN } from "./parseSignature-Blo-BvRZ.js";
import { au as toBytes, av as pad, b2 as InvalidHexValueError, ax as hexToBytes, ay as bytesToHex, _ as BaseError, $ as isHex, b3 as size, az as toHex, b4 as numberToHex, b5 as hexToNumber, b6 as hexToBigInt, b7 as trim, b8 as padHex, b9 as stringToHex } from "./index-CXUot43X.js";
import { ba as ba2, bb as bb2, bc as bc2, bd as bd2, be as be2, bf as bf2, bg as bg2, bh as bh2, bi as bi3, bj as bj3, bk as bk2, bl as bl2, bm as bm2, bn as bn2, bo as bo2, bp as bp2, bq as bq2, br as br3, bs as bs2, bt as bt2, bu as bu2 } from "./index-CXUot43X.js";
import { Y as getAddress, _ as keccak256, $ as slice, k as concat, w as createCursor, D as createHasher, a0 as rotl, C as clean, a1 as sliceHex, d as decodeAbiParameters, j as isAddressEqual, a2 as isAddress, a3 as InvalidAddressError, a4 as formatTransactionRequest, a5 as checksumAddress, a6 as LruMap, a7 as AbiConstructorNotFoundError, a8 as AbiConstructorParamsNotFoundError } from "./bundler-Dmn5v2kr.js";
import { a9, aa, ab, ac as ac2, ad as ad2, ae as ae2, af as af2, ag as ag2, ah as ah2, ai as ai2, aj as aj2, ak as ak2, al as al2, am as am2, an as an2, ao as ao2, ap as ap2, aq as aq2, ar as ar2, as as as2, at as at2, au as au2, av as av2, aw as aw2, ax as ax2, ay as ay2, az as az2, aA as aA2, aB as aB2, aC as aC2, i, aD as aD2, aE as aE2, aF as aF2, aG as aG2, g, aH as aH2, aI as aI2, aJ as aJ2, aK as aK2, aL as aL2, aM as aM2, a, aM as aM3, aN as aN2, aO as aO2, aP as aP2, s, aQ as aQ2, aL as aL3, aM as aM4, aQ as aQ3, a as a2, aM as aM5 } from "./bundler-Dmn5v2kr.js";
import { as as withTimeout, at as hashTypedData, b as getTypesForEIP712Domain, v as validateTypedData, s as serializeTypedData } from "./PassportHome-SJEwmPr3.js";
import { au as au3, av as av3, aw as aw3, ax as ax3, ay as ay3, az as az3, aA as aA3 } from "./PassportHome-SJEwmPr3.js";
import { T as TimeoutError, a as SocketClosedError, W as WebSocketRequestError, b as TransactionRejectedRpcError, U as UserRejectedRequestError, R as RpcRequestError } from "./rpc-BGTULWFS.js";
import { A, c, B, C, D, H, I, d, e, f, J, L, M, h, P, i as i2, j, k, l, m, S, n, o, p, q, r, s as s2 } from "./rpc-BGTULWFS.js";
import { _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { t as toRlp, H as HashMD } from "./sha256-C8LtJplw.js";
import { b, h as h2, a as a3, c as c2, d as d2, e as e2, f as f2, g as g2, i as i3, j as j2, k as k2, l as l2, n as n2, o as o2, p as p2, q as q2, r as r2, u, v, w, x, y, z, A as A2, B as B2, C as C2, D as D2, E, F, G, I as I2, J as J2, K, L as L2, M as M2, N, O, P as P2, Q, R, S as S2, m as m2, T, U, V, W, X, Y, Z, _, $, a0, a1, a2 as a22, a3 as a32, a4, a5, a6, a7, a8, a9 as a92, aa as aa2, ab as ab2, ac as ac3, ad as ad3, ae as ae3, af as af3, ag as ag3, ah as ah3, ai as ai3, aj as aj3, ak as ak3, al as al3, am as am3, an as an3, ao as ao3, ap as ap3, aq as aq3, ar as ar3, as as as3, at as at3, au as au4, av as av4, aw as aw4, ax as ax4, ay as ay4, az as az4, aA as aA4, aB as aB3, aC as aC3, aD as aD3, aE as aE3, aF as aF3, aG as aG3, aH as aH3, aI as aI3, aJ as aJ3, aK as aK3, s as s3 } from "./sha256-C8LtJplw.js";
import { ccipRequest, ccipRequest as ccipRequest2, offchainLookup, offchainLookupAbiItem, offchainLookupSignature } from "./ccip-KrcYtDWH.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
import "./trophy-hLhL8QOQ.js";
import "./alert-circle-lhG861Pl.js";
import "./emotion-unitless.esm-BWDbD2bQ.js";
import "./TypedData-B3RAtJ0b.js";
import "./Address-CuEhN18Y.js";
import "./Authorization-CEwvBCmC.js";
import "./vendor-maps-DCMhh9kT.js";
import "./decimals-RuAU2I0v.js";
import "./arweave-BmejQRVS.js";
import "./gift-Biw2Zx2l.js";
import "./star-CGQXWRD_.js";
import "./award-DJfbIRpy.js";
import "./sparkles-BEe8L_dR.js";
function parseAbiParameter(param) {
  let abiParameter;
  if (typeof param === "string")
    abiParameter = parseAbiParameter$1(param, {
      modifiers
    });
  else {
    const structs = parseStructs(param);
    const length = param.length;
    for (let i4 = 0; i4 < length; i4++) {
      const signature = param[i4];
      if (isStructSignature(signature))
        continue;
      abiParameter = parseAbiParameter$1(signature, { modifiers, structs });
      break;
    }
  }
  if (!abiParameter)
    throw new InvalidAbiParameterError({ param });
  return abiParameter;
}
async function writeContract(client, parameters) {
  return writeContract.internal(client, sendTransaction, "sendTransaction", parameters);
}
(function(writeContract2) {
  async function internal(client, actionFn, name, parameters) {
    const { abi, account: account_ = client.account, address, args, dataSuffix, functionName, ...request } = parameters;
    if (typeof account_ === "undefined")
      throw new AccountNotFoundError({
        docsPath: "/docs/contract/writeContract"
      });
    const account = account_ ? parseAccount(account_) : null;
    const data = encodeFunctionData({
      abi,
      args,
      functionName
    });
    try {
      return await getAction(client, actionFn, name)({
        data: `${data}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
        to: address,
        account,
        ...request
      });
    } catch (error) {
      throw getContractError(error, {
        abi,
        address,
        args,
        docsPath: "/docs/contract/writeContract",
        functionName,
        sender: account?.address
      });
    }
  }
  writeContract2.internal = internal;
})(writeContract || (writeContract = {}));
function getContract({ abi, address, client: client_ }) {
  const client = client_;
  const [publicClient, walletClient] = (() => {
    if (!client)
      return [void 0, void 0];
    if ("public" in client && "wallet" in client)
      return [client.public, client.wallet];
    if ("public" in client)
      return [client.public, void 0];
    if ("wallet" in client)
      return [void 0, client.wallet];
    return [client, client];
  })();
  const hasPublicClient = publicClient !== void 0 && publicClient !== null;
  const hasWalletClient = walletClient !== void 0 && walletClient !== null;
  const contract = {};
  let hasReadFunction = false;
  let hasWriteFunction = false;
  let hasEvent = false;
  for (const item of abi) {
    if (item.type === "function")
      if (item.stateMutability === "view" || item.stateMutability === "pure")
        hasReadFunction = true;
      else
        hasWriteFunction = true;
    else if (item.type === "event")
      hasEvent = true;
    if (hasReadFunction && hasWriteFunction && hasEvent)
      break;
  }
  if (hasPublicClient) {
    if (hasReadFunction)
      contract.read = new Proxy({}, {
        get(_2, functionName) {
          return (...parameters) => {
            const { args, options } = getFunctionParameters(parameters);
            return getAction(publicClient, readContract, "readContract")({
              abi,
              address,
              functionName,
              args,
              ...options
            });
          };
        }
      });
    if (hasWriteFunction)
      contract.simulate = new Proxy({}, {
        get(_2, functionName) {
          return (...parameters) => {
            const { args, options } = getFunctionParameters(parameters);
            return getAction(publicClient, simulateContract, "simulateContract")({
              abi,
              address,
              functionName,
              args,
              ...options
            });
          };
        }
      });
    if (hasEvent) {
      contract.createEventFilter = new Proxy({}, {
        get(_2, eventName) {
          return (...parameters) => {
            const abiEvent = abi.find((x2) => x2.type === "event" && x2.name === eventName);
            const { args, options } = getEventParameters(parameters, abiEvent);
            return getAction(publicClient, createContractEventFilter, "createContractEventFilter")({
              abi,
              address,
              eventName,
              args,
              ...options
            });
          };
        }
      });
      contract.getEvents = new Proxy({}, {
        get(_2, eventName) {
          return (...parameters) => {
            const abiEvent = abi.find((x2) => x2.type === "event" && x2.name === eventName);
            const { args, options } = getEventParameters(parameters, abiEvent);
            return getAction(publicClient, getContractEvents, "getContractEvents")({
              abi,
              address,
              eventName,
              args,
              ...options
            });
          };
        }
      });
      contract.watchEvent = new Proxy({}, {
        get(_2, eventName) {
          return (...parameters) => {
            const abiEvent = abi.find((x2) => x2.type === "event" && x2.name === eventName);
            const { args, options } = getEventParameters(parameters, abiEvent);
            return getAction(publicClient, watchContractEvent, "watchContractEvent")({
              abi,
              address,
              eventName,
              args,
              ...options
            });
          };
        }
      });
    }
  }
  if (hasWalletClient) {
    if (hasWriteFunction)
      contract.write = new Proxy({}, {
        get(_2, functionName) {
          return (...parameters) => {
            const { args, options } = getFunctionParameters(parameters);
            return getAction(walletClient, writeContract, "writeContract")({
              abi,
              address,
              functionName,
              args,
              ...options
            });
          };
        }
      });
  }
  if (hasPublicClient || hasWalletClient) {
    if (hasWriteFunction)
      contract.estimateGas = new Proxy({}, {
        get(_2, functionName) {
          return (...parameters) => {
            const { args, options } = getFunctionParameters(parameters);
            const client2 = publicClient ?? walletClient;
            return getAction(client2, estimateContractGas, "estimateContractGas")({
              abi,
              address,
              functionName,
              args,
              ...options,
              account: options.account ?? walletClient.account
            });
          };
        }
      });
  }
  contract.address = address;
  contract.abi = abi;
  return contract;
}
function getFunctionParameters(values) {
  const hasArgs = values.length && Array.isArray(values[0]);
  const args = hasArgs ? values[0] : [];
  const options = (hasArgs ? values[1] : values[0]) ?? {};
  return { args, options };
}
function getEventParameters(values, abiEvent) {
  let hasArgs = false;
  if (Array.isArray(values[0]))
    hasArgs = true;
  else if (values.length === 1) {
    hasArgs = abiEvent.inputs.some((x2) => x2.indexed);
  } else if (values.length === 2) {
    hasArgs = true;
  }
  const args = hasArgs ? values[0] : void 0;
  const options = (hasArgs ? values[1] : values[0]) ?? {};
  return { args, options };
}
function isBytes(value) {
  if (!value)
    return false;
  if (typeof value !== "object")
    return false;
  if (!("BYTES_PER_ELEMENT" in value))
    return false;
  return value.BYTES_PER_ELEMENT === 1 && value.constructor.name === "Uint8Array";
}
function getContractAddress(opts) {
  if (opts.opcode === "CREATE2")
    return getCreate2Address(opts);
  return getCreateAddress(opts);
}
function getCreateAddress(opts) {
  const from = toBytes(getAddress(opts.from));
  let nonce = toBytes(opts.nonce);
  if (nonce[0] === 0)
    nonce = new Uint8Array([]);
  return getAddress(`0x${keccak256(toRlp([from, nonce], "bytes")).slice(26)}`);
}
function getCreate2Address(opts) {
  const from = toBytes(getAddress(opts.from));
  const salt = pad(isBytes(opts.salt) ? opts.salt : toBytes(opts.salt), {
    size: 32
  });
  const bytecodeHash = (() => {
    if ("bytecodeHash" in opts) {
      if (isBytes(opts.bytecodeHash))
        return opts.bytecodeHash;
      return toBytes(opts.bytecodeHash);
    }
    return keccak256(opts.bytecode, "bytes");
  })();
  return getAddress(slice(keccak256(concat([toBytes("0xff"), from, salt, bytecodeHash])), 12));
}
function extractChain({ chains, id }) {
  return chains.find((chain) => chain.id === id);
}
function fromRlp(value, to = "hex") {
  const bytes = (() => {
    if (typeof value === "string") {
      if (value.length > 3 && value.length % 2 !== 0)
        throw new InvalidHexValueError(value);
      return hexToBytes(value);
    }
    return value;
  })();
  const cursor = createCursor(bytes, {
    recursiveReadLimit: Number.POSITIVE_INFINITY
  });
  const result = fromRlpCursor(cursor, to);
  return result;
}
function fromRlpCursor(cursor, to = "hex") {
  if (cursor.bytes.length === 0)
    return to === "hex" ? bytesToHex(cursor.bytes) : cursor.bytes;
  const prefix = cursor.readByte();
  if (prefix < 128)
    cursor.decrementPosition(1);
  if (prefix < 192) {
    const length2 = readLength(cursor, prefix, 128);
    const bytes = cursor.readBytes(length2);
    return to === "hex" ? bytesToHex(bytes) : bytes;
  }
  const length = readLength(cursor, prefix, 192);
  return readList(cursor, length, to);
}
function readLength(cursor, prefix, offset) {
  if (offset === 128 && prefix < 128)
    return 1;
  if (prefix <= offset + 55)
    return prefix - offset;
  if (prefix === offset + 55 + 1)
    return cursor.readUint8();
  if (prefix === offset + 55 + 2)
    return cursor.readUint16();
  if (prefix === offset + 55 + 3)
    return cursor.readUint24();
  if (prefix === offset + 55 + 4)
    return cursor.readUint32();
  throw new BaseError("Invalid RLP prefix");
}
function readList(cursor, length, to) {
  const position = cursor.position;
  const value = [];
  while (cursor.position - position < length)
    value.push(fromRlpCursor(cursor, to));
  return value;
}
function isHash(hash) {
  return isHex(hash) && size(hash) === 32;
}
const Rho160 = /* @__PURE__ */ Uint8Array.from([
  7,
  4,
  13,
  1,
  10,
  6,
  15,
  3,
  12,
  0,
  9,
  5,
  2,
  14,
  11,
  8
]);
const Id160 = /* @__PURE__ */ (() => Uint8Array.from(new Array(16).fill(0).map((_2, i4) => i4)))();
const Pi160 = /* @__PURE__ */ (() => Id160.map((i4) => (9 * i4 + 5) % 16))();
const idxLR = /* @__PURE__ */ (() => {
  const L3 = [Id160];
  const R2 = [Pi160];
  const res = [L3, R2];
  for (let i4 = 0; i4 < 4; i4++)
    for (let j3 of res)
      j3.push(j3[i4].map((k3) => Rho160[k3]));
  return res;
})();
const idxL = /* @__PURE__ */ (() => idxLR[0])();
const idxR = /* @__PURE__ */ (() => idxLR[1])();
const shifts160 = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((i4) => Uint8Array.from(i4));
const shiftsL160 = /* @__PURE__ */ idxL.map((idx, i4) => idx.map((j3) => shifts160[i4][j3]));
const shiftsR160 = /* @__PURE__ */ idxR.map((idx, i4) => idx.map((j3) => shifts160[i4][j3]));
const Kl160 = /* @__PURE__ */ Uint32Array.from([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]);
const Kr160 = /* @__PURE__ */ Uint32Array.from([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function ripemd_f(group, x2, y2, z2) {
  if (group === 0)
    return x2 ^ y2 ^ z2;
  if (group === 1)
    return x2 & y2 | ~x2 & z2;
  if (group === 2)
    return (x2 | ~y2) ^ z2;
  if (group === 3)
    return x2 & z2 | y2 & ~z2;
  return x2 ^ (y2 | ~z2);
}
const BUF_160 = /* @__PURE__ */ new Uint32Array(16);
class RIPEMD160 extends HashMD {
  constructor() {
    super(64, 20, 8, true);
    this.h0 = 1732584193 | 0;
    this.h1 = 4023233417 | 0;
    this.h2 = 2562383102 | 0;
    this.h3 = 271733878 | 0;
    this.h4 = 3285377520 | 0;
  }
  get() {
    const { h0, h1, h2: h22, h3, h4 } = this;
    return [h0, h1, h22, h3, h4];
  }
  set(h0, h1, h22, h3, h4) {
    this.h0 = h0 | 0;
    this.h1 = h1 | 0;
    this.h2 = h22 | 0;
    this.h3 = h3 | 0;
    this.h4 = h4 | 0;
  }
  process(view, offset) {
    for (let i4 = 0; i4 < 16; i4++, offset += 4)
      BUF_160[i4] = view.getUint32(offset, true);
    let al4 = this.h0 | 0, ar4 = al4, bl3 = this.h1 | 0, br4 = bl3, cl = this.h2 | 0, cr = cl, dl = this.h3 | 0, dr = dl, el = this.h4 | 0, er = el;
    for (let group = 0; group < 5; group++) {
      const rGroup = 4 - group;
      const hbl = Kl160[group], hbr = Kr160[group];
      const rl = idxL[group], rr = idxR[group];
      const sl = shiftsL160[group], sr = shiftsR160[group];
      for (let i4 = 0; i4 < 16; i4++) {
        const tl = rotl(al4 + ripemd_f(group, bl3, cl, dl) + BUF_160[rl[i4]] + hbl, sl[i4]) + el | 0;
        al4 = el, el = dl, dl = rotl(cl, 10) | 0, cl = bl3, bl3 = tl;
      }
      for (let i4 = 0; i4 < 16; i4++) {
        const tr = rotl(ar4 + ripemd_f(rGroup, br4, cr, dr) + BUF_160[rr[i4]] + hbr, sr[i4]) + er | 0;
        ar4 = er, er = dr, dr = rotl(cr, 10) | 0, cr = br4, br4 = tr;
      }
    }
    this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar4 | 0, this.h4 + al4 + br4 | 0, this.h0 + bl3 + cr | 0);
  }
  roundClean() {
    clean(BUF_160);
  }
  destroy() {
    this.destroyed = true;
    clean(this.buffer);
    this.set(0, 0, 0, 0, 0);
  }
}
const ripemd160$2 = /* @__PURE__ */ createHasher(() => new RIPEMD160());
const ripemd160$1 = ripemd160$2;
function ripemd160(value, to_) {
  const to = to_ || "hex";
  const bytes = ripemd160$1(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}
const socketClientCache = /* @__PURE__ */ new Map();
async function getSocketRpcClient(parameters) {
  const { getSocket: getSocket2, keepAlive = true, key = "socket", reconnect = true, url } = parameters;
  const { interval: keepAliveInterval = 3e4 } = typeof keepAlive === "object" ? keepAlive : {};
  const { attempts = 5, delay = 2e3 } = typeof reconnect === "object" ? reconnect : {};
  const id = JSON.stringify({ keepAlive, key, url, reconnect });
  let socketClient = socketClientCache.get(id);
  if (socketClient)
    return socketClient;
  let reconnectCount = 0;
  const { schedule } = createBatchScheduler({
    id,
    fn: async () => {
      const requests = /* @__PURE__ */ new Map();
      const subscriptions = /* @__PURE__ */ new Map();
      let error;
      let socket;
      let keepAliveTimer;
      let reconnectInProgress = false;
      function attemptReconnect() {
        if (reconnect && reconnectCount < attempts) {
          if (reconnectInProgress)
            return;
          reconnectInProgress = true;
          reconnectCount++;
          socket?.close();
          setTimeout(async () => {
            await setup().catch(console.error);
            reconnectInProgress = false;
          }, delay);
        } else {
          requests.clear();
          subscriptions.clear();
        }
      }
      async function setup() {
        const result = await getSocket2({
          onClose() {
            for (const request of requests.values())
              request.onError?.(new SocketClosedError({ url }));
            for (const subscription of subscriptions.values())
              subscription.onError?.(new SocketClosedError({ url }));
            attemptReconnect();
          },
          onError(error_) {
            error = error_;
            for (const request of requests.values())
              request.onError?.(error);
            for (const subscription of subscriptions.values())
              subscription.onError?.(error);
            attemptReconnect();
          },
          onOpen() {
            error = void 0;
            reconnectCount = 0;
          },
          onResponse(data) {
            const isSubscription = data.method === "eth_subscription";
            const id2 = isSubscription ? data.params.subscription : data.id;
            const cache = isSubscription ? subscriptions : requests;
            const callback = cache.get(id2);
            if (callback)
              callback.onResponse(data);
            if (!isSubscription)
              cache.delete(id2);
          }
        });
        socket = result;
        if (keepAlive) {
          if (keepAliveTimer)
            clearInterval(keepAliveTimer);
          keepAliveTimer = setInterval(() => socket.ping?.(), keepAliveInterval);
        }
        if (reconnect && subscriptions.size > 0) {
          const subscriptionEntries = subscriptions.entries();
          for (const [key2, { onResponse, body, onError }] of subscriptionEntries) {
            if (!body)
              continue;
            subscriptions.delete(key2);
            socketClient?.request({ body, onResponse, onError });
          }
        }
        return result;
      }
      await setup();
      error = void 0;
      socketClient = {
        close() {
          keepAliveTimer && clearInterval(keepAliveTimer);
          socket.close();
          socketClientCache.delete(id);
        },
        get socket() {
          return socket;
        },
        request({ body, onError, onResponse }) {
          if (error && onError)
            onError(error);
          const id2 = body.id ?? idCache.take();
          const callback = (response) => {
            if (typeof response.id === "number" && id2 !== response.id)
              return;
            if (body.method === "eth_subscribe" && typeof response.result === "string")
              subscriptions.set(response.result, {
                onResponse: callback,
                onError,
                body
              });
            if (body.method === "eth_unsubscribe")
              subscriptions.delete(body.params?.[0]);
            onResponse(response);
          };
          requests.set(id2, { onResponse: callback, onError });
          try {
            socket.request({
              body: {
                jsonrpc: "2.0",
                id: id2,
                ...body
              }
            });
          } catch (error2) {
            onError?.(error2);
          }
        },
        requestAsync({ body, timeout = 1e4 }) {
          return withTimeout(() => new Promise((onResponse, onError) => this.request({
            body,
            onError,
            onResponse
          })), {
            errorInstance: new TimeoutError({ body, url }),
            timeout
          });
        },
        requests,
        subscriptions,
        url
      };
      socketClientCache.set(id, socketClient);
      return [socketClient];
    }
  });
  const [_2, [socketClient_]] = await schedule();
  return socketClient_;
}
async function getWebSocketRpcClient(url, options = {}) {
  const { keepAlive, reconnect } = options;
  return getSocketRpcClient({
    async getSocket({ onClose, onError, onOpen, onResponse }) {
      const WebSocket = await __vitePreload(() => import("./native-3KyBxzAR.js"), true ? [] : void 0).then((module) => module.WebSocket);
      const socket = new WebSocket(url);
      function onClose_() {
        socket.removeEventListener("close", onClose_);
        socket.removeEventListener("message", onMessage);
        socket.removeEventListener("error", onError);
        socket.removeEventListener("open", onOpen);
        onClose();
      }
      function onMessage({ data }) {
        if (typeof data === "string" && data.trim().length === 0)
          return;
        try {
          const _data = JSON.parse(data);
          onResponse(_data);
        } catch (error) {
          onError(error);
        }
      }
      socket.addEventListener("close", onClose_);
      socket.addEventListener("message", onMessage);
      socket.addEventListener("error", onError);
      socket.addEventListener("open", onOpen);
      if (socket.readyState === WebSocket.CONNECTING) {
        await new Promise((resolve, reject) => {
          if (!socket)
            return;
          socket.onopen = resolve;
          socket.onerror = reject;
        });
      }
      const { close: close_ } = socket;
      return Object.assign(socket, {
        close() {
          close_.bind(socket)();
          onClose_();
        },
        ping() {
          try {
            if (socket.readyState === socket.CLOSED || socket.readyState === socket.CLOSING)
              throw new WebSocketRequestError({
                url: socket.url,
                cause: new SocketClosedError({ url: socket.url })
              });
            const body = {
              jsonrpc: "2.0",
              id: null,
              method: "net_version",
              params: []
            };
            socket.send(JSON.stringify(body));
          } catch (error) {
            onError(error);
          }
        },
        request({ body }) {
          if (socket.readyState === socket.CLOSED || socket.readyState === socket.CLOSING)
            throw new WebSocketRequestError({
              body,
              url: socket.url,
              cause: new SocketClosedError({ url: socket.url })
            });
          return socket.send(JSON.stringify(body));
        }
      });
    },
    keepAlive,
    reconnect,
    url
  });
}
async function getSocket(url) {
  const client = await getWebSocketRpcClient(url);
  return Object.assign(client.socket, {
    requests: client.requests,
    subscriptions: client.subscriptions
  });
}
function isErc6492Signature(signature) {
  return sliceHex(signature, -32) === erc6492MagicBytes;
}
function isErc8010Signature(signature) {
  return validate(signature);
}
function parseErc6492Signature(signature) {
  if (!isErc6492Signature(signature))
    return { signature };
  const [address, data, signature_] = decodeAbiParameters([{ type: "address" }, { type: "bytes" }, { type: "bytes" }], signature);
  return { address, data, signature: signature_ };
}
function parseErc8010Signature(signature) {
  if (!isErc8010Signature(signature))
    return { signature };
  const { authorization: authorization_ox, to, ...rest } = unwrap(signature);
  return {
    authorization: {
      address: authorization_ox.address,
      chainId: authorization_ox.chainId,
      nonce: Number(authorization_ox.nonce),
      r: numberToHex(authorization_ox.r, { size: 32 }),
      s: numberToHex(authorization_ox.s, { size: 32 }),
      yParity: authorization_ox.yParity
    },
    ...to ? { address: to } : {},
    ...rest
  };
}
async function recoverMessageAddress({ message, signature }) {
  return recoverAddress({ hash: hashMessage(message), signature });
}
async function recoverTypedDataAddress(parameters) {
  const { domain, message, primaryType, signature, types } = parameters;
  return recoverAddress({
    hash: hashTypedData({
      domain,
      message,
      primaryType,
      types
    }),
    signature
  });
}
function serializeErc8010Signature(parameters) {
  const { address, data, signature, to = "hex" } = parameters;
  const signature_ = wrap({
    authorization: {
      address: parameters.authorization.address,
      chainId: parameters.authorization.chainId,
      nonce: BigInt(parameters.authorization.nonce),
      r: BigInt(parameters.authorization.r),
      s: BigInt(parameters.authorization.s),
      yParity: parameters.authorization.yParity
    },
    data,
    signature,
    to: address
  });
  if (to === "hex")
    return signature_;
  return hexToBytes(signature_);
}
async function verifyHash({ address, hash, signature }) {
  return isAddressEqual(getAddress(address), await recoverAddress({ hash, signature }));
}
async function verifyMessage({ address, message, signature }) {
  return isAddressEqual(getAddress(address), await recoverMessageAddress({ message, signature }));
}
async function verifyTypedData(parameters) {
  const { address, domain, message, primaryType, signature, types } = parameters;
  return isAddressEqual(getAddress(address), await recoverTypedDataAddress({
    domain,
    message,
    primaryType,
    signature,
    types
  }));
}
function getSerializedTransactionType(serializedTransaction) {
  const serializedType = sliceHex(serializedTransaction, 0, 1);
  if (serializedType === "0x04")
    return "eip7702";
  if (serializedType === "0x03")
    return "eip4844";
  if (serializedType === "0x02")
    return "eip1559";
  if (serializedType === "0x01")
    return "eip2930";
  if (serializedType !== "0x" && hexToNumber(serializedType) >= 192)
    return "legacy";
  throw new InvalidSerializedTransactionTypeError({ serializedType });
}
function parseTransaction(serializedTransaction) {
  const type = getSerializedTransactionType(serializedTransaction);
  if (type === "eip1559")
    return parseTransactionEIP1559(serializedTransaction);
  if (type === "eip2930")
    return parseTransactionEIP2930(serializedTransaction);
  if (type === "eip4844")
    return parseTransactionEIP4844(serializedTransaction);
  if (type === "eip7702")
    return parseTransactionEIP7702(serializedTransaction);
  return parseTransactionLegacy(serializedTransaction);
}
function parseTransactionEIP7702(serializedTransaction) {
  const transactionArray = toTransactionArray(serializedTransaction);
  const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, data, accessList, authorizationList, v2, r3, s4] = transactionArray;
  if (transactionArray.length !== 10 && transactionArray.length !== 13)
    throw new InvalidSerializedTransactionError({
      attributes: {
        chainId,
        nonce,
        maxPriorityFeePerGas,
        maxFeePerGas,
        gas,
        to,
        value,
        data,
        accessList,
        authorizationList,
        ...transactionArray.length > 9 ? {
          v: v2,
          r: r3,
          s: s4
        } : {}
      },
      serializedTransaction,
      type: "eip7702"
    });
  const transaction = {
    chainId: hexToNumber(chainId),
    type: "eip7702"
  };
  if (isHex(to) && to !== "0x")
    transaction.to = to;
  if (isHex(gas) && gas !== "0x")
    transaction.gas = hexToBigInt(gas);
  if (isHex(data) && data !== "0x")
    transaction.data = data;
  if (isHex(nonce))
    transaction.nonce = nonce === "0x" ? 0 : hexToNumber(nonce);
  if (isHex(value) && value !== "0x")
    transaction.value = hexToBigInt(value);
  if (isHex(maxFeePerGas) && maxFeePerGas !== "0x")
    transaction.maxFeePerGas = hexToBigInt(maxFeePerGas);
  if (isHex(maxPriorityFeePerGas) && maxPriorityFeePerGas !== "0x")
    transaction.maxPriorityFeePerGas = hexToBigInt(maxPriorityFeePerGas);
  if (accessList.length !== 0 && accessList !== "0x")
    transaction.accessList = parseAccessList(accessList);
  if (authorizationList.length !== 0 && authorizationList !== "0x")
    transaction.authorizationList = parseAuthorizationList(authorizationList);
  assertTransactionEIP7702(transaction);
  const signature = transactionArray.length === 13 ? parseEIP155Signature(transactionArray) : void 0;
  return { ...signature, ...transaction };
}
function parseTransactionEIP4844(serializedTransaction) {
  const transactionOrWrapperArray = toTransactionArray(serializedTransaction);
  const hasNetworkWrapper = transactionOrWrapperArray.length === 4;
  const transactionArray = hasNetworkWrapper ? transactionOrWrapperArray[0] : transactionOrWrapperArray;
  const wrapperArray = hasNetworkWrapper ? transactionOrWrapperArray.slice(1) : [];
  const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, data, accessList, maxFeePerBlobGas, blobVersionedHashes, v2, r3, s4] = transactionArray;
  const [blobs, commitments, proofs] = wrapperArray;
  if (!(transactionArray.length === 11 || transactionArray.length === 14))
    throw new InvalidSerializedTransactionError({
      attributes: {
        chainId,
        nonce,
        maxPriorityFeePerGas,
        maxFeePerGas,
        gas,
        to,
        value,
        data,
        accessList,
        ...transactionArray.length > 9 ? {
          v: v2,
          r: r3,
          s: s4
        } : {}
      },
      serializedTransaction,
      type: "eip4844"
    });
  const transaction = {
    blobVersionedHashes,
    chainId: hexToNumber(chainId),
    to,
    type: "eip4844"
  };
  if (isHex(gas) && gas !== "0x")
    transaction.gas = hexToBigInt(gas);
  if (isHex(data) && data !== "0x")
    transaction.data = data;
  if (isHex(nonce))
    transaction.nonce = nonce === "0x" ? 0 : hexToNumber(nonce);
  if (isHex(value) && value !== "0x")
    transaction.value = hexToBigInt(value);
  if (isHex(maxFeePerBlobGas) && maxFeePerBlobGas !== "0x")
    transaction.maxFeePerBlobGas = hexToBigInt(maxFeePerBlobGas);
  if (isHex(maxFeePerGas) && maxFeePerGas !== "0x")
    transaction.maxFeePerGas = hexToBigInt(maxFeePerGas);
  if (isHex(maxPriorityFeePerGas) && maxPriorityFeePerGas !== "0x")
    transaction.maxPriorityFeePerGas = hexToBigInt(maxPriorityFeePerGas);
  if (accessList.length !== 0 && accessList !== "0x")
    transaction.accessList = parseAccessList(accessList);
  if (blobs && commitments && proofs)
    transaction.sidecars = toBlobSidecars({
      blobs,
      commitments,
      proofs
    });
  assertTransactionEIP4844(transaction);
  const signature = transactionArray.length === 14 ? parseEIP155Signature(transactionArray) : void 0;
  return { ...signature, ...transaction };
}
function parseTransactionEIP1559(serializedTransaction) {
  const transactionArray = toTransactionArray(serializedTransaction);
  const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, data, accessList, v2, r3, s4] = transactionArray;
  if (!(transactionArray.length === 9 || transactionArray.length === 12))
    throw new InvalidSerializedTransactionError({
      attributes: {
        chainId,
        nonce,
        maxPriorityFeePerGas,
        maxFeePerGas,
        gas,
        to,
        value,
        data,
        accessList,
        ...transactionArray.length > 9 ? {
          v: v2,
          r: r3,
          s: s4
        } : {}
      },
      serializedTransaction,
      type: "eip1559"
    });
  const transaction = {
    chainId: hexToNumber(chainId),
    type: "eip1559"
  };
  if (isHex(to) && to !== "0x")
    transaction.to = to;
  if (isHex(gas) && gas !== "0x")
    transaction.gas = hexToBigInt(gas);
  if (isHex(data) && data !== "0x")
    transaction.data = data;
  if (isHex(nonce))
    transaction.nonce = nonce === "0x" ? 0 : hexToNumber(nonce);
  if (isHex(value) && value !== "0x")
    transaction.value = hexToBigInt(value);
  if (isHex(maxFeePerGas) && maxFeePerGas !== "0x")
    transaction.maxFeePerGas = hexToBigInt(maxFeePerGas);
  if (isHex(maxPriorityFeePerGas) && maxPriorityFeePerGas !== "0x")
    transaction.maxPriorityFeePerGas = hexToBigInt(maxPriorityFeePerGas);
  if (accessList.length !== 0 && accessList !== "0x")
    transaction.accessList = parseAccessList(accessList);
  assertTransactionEIP1559(transaction);
  const signature = transactionArray.length === 12 ? parseEIP155Signature(transactionArray) : void 0;
  return { ...signature, ...transaction };
}
function parseTransactionEIP2930(serializedTransaction) {
  const transactionArray = toTransactionArray(serializedTransaction);
  const [chainId, nonce, gasPrice, gas, to, value, data, accessList, v2, r3, s4] = transactionArray;
  if (!(transactionArray.length === 8 || transactionArray.length === 11))
    throw new InvalidSerializedTransactionError({
      attributes: {
        chainId,
        nonce,
        gasPrice,
        gas,
        to,
        value,
        data,
        accessList,
        ...transactionArray.length > 8 ? {
          v: v2,
          r: r3,
          s: s4
        } : {}
      },
      serializedTransaction,
      type: "eip2930"
    });
  const transaction = {
    chainId: hexToNumber(chainId),
    type: "eip2930"
  };
  if (isHex(to) && to !== "0x")
    transaction.to = to;
  if (isHex(gas) && gas !== "0x")
    transaction.gas = hexToBigInt(gas);
  if (isHex(data) && data !== "0x")
    transaction.data = data;
  if (isHex(nonce))
    transaction.nonce = nonce === "0x" ? 0 : hexToNumber(nonce);
  if (isHex(value) && value !== "0x")
    transaction.value = hexToBigInt(value);
  if (isHex(gasPrice) && gasPrice !== "0x")
    transaction.gasPrice = hexToBigInt(gasPrice);
  if (accessList.length !== 0 && accessList !== "0x")
    transaction.accessList = parseAccessList(accessList);
  assertTransactionEIP2930(transaction);
  const signature = transactionArray.length === 11 ? parseEIP155Signature(transactionArray) : void 0;
  return { ...signature, ...transaction };
}
function parseTransactionLegacy(serializedTransaction) {
  const transactionArray = fromRlp(serializedTransaction, "hex");
  const [nonce, gasPrice, gas, to, value, data, chainIdOrV_, r3, s4] = transactionArray;
  if (!(transactionArray.length === 6 || transactionArray.length === 9))
    throw new InvalidSerializedTransactionError({
      attributes: {
        nonce,
        gasPrice,
        gas,
        to,
        value,
        data,
        ...transactionArray.length > 6 ? {
          v: chainIdOrV_,
          r: r3,
          s: s4
        } : {}
      },
      serializedTransaction,
      type: "legacy"
    });
  const transaction = {
    type: "legacy"
  };
  if (isHex(to) && to !== "0x")
    transaction.to = to;
  if (isHex(gas) && gas !== "0x")
    transaction.gas = hexToBigInt(gas);
  if (isHex(data) && data !== "0x")
    transaction.data = data;
  if (isHex(nonce))
    transaction.nonce = nonce === "0x" ? 0 : hexToNumber(nonce);
  if (isHex(value) && value !== "0x")
    transaction.value = hexToBigInt(value);
  if (isHex(gasPrice) && gasPrice !== "0x")
    transaction.gasPrice = hexToBigInt(gasPrice);
  assertTransactionLegacy(transaction);
  if (transactionArray.length === 6)
    return transaction;
  const chainIdOrV = isHex(chainIdOrV_) && chainIdOrV_ !== "0x" ? hexToBigInt(chainIdOrV_) : 0n;
  if (s4 === "0x" && r3 === "0x") {
    if (chainIdOrV > 0)
      transaction.chainId = Number(chainIdOrV);
    return transaction;
  }
  const v2 = chainIdOrV;
  const chainId = Number((v2 - 35n) / 2n);
  if (chainId > 0)
    transaction.chainId = chainId;
  else if (v2 !== 27n && v2 !== 28n)
    throw new InvalidLegacyVError({ v: v2 });
  transaction.v = v2;
  transaction.s = s4;
  transaction.r = r3;
  transaction.yParity = v2 % 2n === 0n ? 1 : 0;
  return transaction;
}
function toTransactionArray(serializedTransaction) {
  return fromRlp(`0x${serializedTransaction.slice(4)}`, "hex");
}
function parseAccessList(accessList_) {
  const accessList = [];
  for (let i4 = 0; i4 < accessList_.length; i4++) {
    const [address, storageKeys] = accessList_[i4];
    if (!isAddress(address, { strict: false }))
      throw new InvalidAddressError({ address });
    accessList.push({
      address,
      storageKeys: storageKeys.map((key) => isHash(key) ? key : trim(key))
    });
  }
  return accessList;
}
function parseAuthorizationList(serializedAuthorizationList) {
  const authorizationList = [];
  for (let i4 = 0; i4 < serializedAuthorizationList.length; i4++) {
    const [chainId, address, nonce, yParity, r3, s4] = serializedAuthorizationList[i4];
    authorizationList.push({
      address,
      chainId: chainId === "0x" ? 0 : hexToNumber(chainId),
      nonce: nonce === "0x" ? 0 : hexToNumber(nonce),
      ...parseEIP155Signature([yParity, r3, s4])
    });
  }
  return authorizationList;
}
function parseEIP155Signature(transactionArray) {
  const signature = transactionArray.slice(-3);
  const v2 = signature[0] === "0x" || hexToBigInt(signature[0]) === 0n ? 27n : 28n;
  return {
    r: padHex(signature[1], { size: 32 }),
    s: padHex(signature[2], { size: 32 }),
    v: v2,
    yParity: v2 === 27n ? 0 : 1
  };
}
class InvalidDecimalNumberError extends BaseError {
  constructor({ value }) {
    super(`Number \`${value}\` is not a valid decimal number.`, {
      name: "InvalidDecimalNumberError"
    });
  }
}
function parseUnits(value, decimals) {
  if (!/^(-?)([0-9]*)\.?([0-9]*)$/.test(value))
    throw new InvalidDecimalNumberError({ value });
  let [integer, fraction = "0"] = value.split(".");
  const negative = integer.startsWith("-");
  if (negative)
    integer = integer.slice(1);
  fraction = fraction.replace(/(0+)$/, "");
  if (decimals === 0) {
    if (Math.round(Number(`.${fraction}`)) === 1)
      integer = `${BigInt(integer) + 1n}`;
    fraction = "";
  } else if (fraction.length > decimals) {
    const [left, unit, right] = [
      fraction.slice(0, decimals - 1),
      fraction.slice(decimals - 1, decimals),
      fraction.slice(decimals)
    ];
    const rounded = Math.round(Number(`${unit}.${right}`));
    if (rounded > 9)
      fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, "0");
    else
      fraction = `${left}${rounded}`;
    if (fraction.length > decimals) {
      fraction = fraction.slice(1);
      integer = `${BigInt(integer) + 1n}`;
    }
    fraction = fraction.slice(0, decimals);
  } else {
    fraction = fraction.padEnd(decimals, "0");
  }
  return BigInt(`${negative ? "-" : ""}${integer}${fraction}`);
}
function parseEther(ether, unit = "wei") {
  return parseUnits(ether, etherUnits[unit]);
}
function parseGwei(ether, unit = "wei") {
  return parseUnits(ether, gweiUnits[unit]);
}
async function dropTransaction(client, { hash }) {
  await client.request({
    method: `${client.mode}_dropTransaction`,
    params: [hash]
  });
}
async function dumpState(client) {
  return client.request({
    method: `${client.mode}_dumpState`
  });
}
async function getAutomine(client) {
  if (client.mode === "ganache")
    return await client.request({
      method: "eth_mining"
    });
  return await client.request({
    method: `${client.mode}_getAutomine`
  });
}
async function getTxpoolContent(client) {
  return await client.request({
    method: "txpool_content"
  });
}
async function getTxpoolStatus(client) {
  const { pending, queued } = await client.request({
    method: "txpool_status"
  });
  return {
    pending: hexToNumber(pending),
    queued: hexToNumber(queued)
  };
}
async function impersonateAccount(client, { address }) {
  await client.request({
    method: `${client.mode}_impersonateAccount`,
    params: [address]
  });
}
async function increaseTime(client, { seconds }) {
  return await client.request({
    method: "evm_increaseTime",
    params: [numberToHex(seconds)]
  });
}
async function inspectTxpool(client) {
  return await client.request({
    method: "txpool_inspect"
  });
}
async function loadState(client, { state }) {
  await client.request({
    method: `${client.mode}_loadState`,
    params: [state]
  });
}
async function mine(client, { blocks, interval }) {
  if (client.mode === "ganache")
    await client.request({
      method: "evm_mine",
      params: [{ blocks: numberToHex(blocks) }]
    });
  else
    await client.request({
      method: `${client.mode}_mine`,
      params: [numberToHex(blocks), numberToHex(interval || 0)]
    });
}
async function removeBlockTimestampInterval(client) {
  await client.request({
    method: `${client.mode}_removeBlockTimestampInterval`
  });
}
async function reset(client, { blockNumber, jsonRpcUrl } = {}) {
  await client.request({
    method: `${client.mode}_reset`,
    params: [{ forking: { blockNumber: Number(blockNumber), jsonRpcUrl } }]
  });
}
async function revert(client, { id }) {
  await client.request({
    method: "evm_revert",
    params: [id]
  });
}
async function sendUnsignedTransaction(client, args) {
  const { accessList, data, from, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, ...rest } = args;
  const chainFormat = client.chain?.formatters?.transactionRequest?.format;
  const format = chainFormat || formatTransactionRequest;
  const request = format({
    // Pick out extra data that might exist on the chain's transaction request type.
    ...extract(rest, { format: chainFormat }),
    accessList,
    data,
    from,
    gas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    to,
    value
  }, "sendUnsignedTransaction");
  const hash = await client.request({
    method: "eth_sendUnsignedTransaction",
    params: [request]
  });
  return hash;
}
async function setAutomine(client, enabled) {
  if (client.mode === "ganache") {
    if (enabled)
      await client.request({ method: "miner_start" });
    else
      await client.request({ method: "miner_stop" });
  } else
    await client.request({
      method: "evm_setAutomine",
      params: [enabled]
    });
}
async function setBalance(client, { address, value }) {
  if (client.mode === "ganache")
    await client.request({
      method: "evm_setAccountBalance",
      params: [address, numberToHex(value)]
    });
  else
    await client.request({
      method: `${client.mode}_setBalance`,
      params: [address, numberToHex(value)]
    });
}
async function setBlockGasLimit(client, { gasLimit }) {
  await client.request({
    method: "evm_setBlockGasLimit",
    params: [numberToHex(gasLimit)]
  });
}
async function setBlockTimestampInterval(client, { interval }) {
  const interval_ = (() => {
    if (client.mode === "hardhat")
      return interval * 1e3;
    return interval;
  })();
  await client.request({
    method: `${client.mode}_setBlockTimestampInterval`,
    params: [interval_]
  });
}
async function setCode(client, { address, bytecode }) {
  if (client.mode === "ganache")
    await client.request({
      method: "evm_setAccountCode",
      params: [address, bytecode]
    });
  else
    await client.request({
      method: `${client.mode}_setCode`,
      params: [address, bytecode]
    });
}
async function setCoinbase(client, { address }) {
  await client.request({
    method: `${client.mode}_setCoinbase`,
    params: [address]
  });
}
async function setIntervalMining(client, { interval }) {
  const interval_ = (() => {
    if (client.mode === "hardhat")
      return interval * 1e3;
    return interval;
  })();
  await client.request({
    method: "evm_setIntervalMining",
    params: [interval_]
  });
}
async function setLoggingEnabled(client, enabled) {
  await client.request({
    method: `${client.mode}_setLoggingEnabled`,
    params: [enabled]
  });
}
async function setMinGasPrice(client, { gasPrice }) {
  await client.request({
    method: `${client.mode}_setMinGasPrice`,
    params: [numberToHex(gasPrice)]
  });
}
async function setNextBlockBaseFeePerGas(client, { baseFeePerGas }) {
  await client.request({
    method: `${client.mode}_setNextBlockBaseFeePerGas`,
    params: [numberToHex(baseFeePerGas)]
  });
}
async function setNextBlockTimestamp(client, { timestamp }) {
  await client.request({
    method: "evm_setNextBlockTimestamp",
    params: [numberToHex(timestamp)]
  });
}
async function setNonce(client, { address, nonce }) {
  await client.request({
    method: `${client.mode}_setNonce`,
    params: [address, numberToHex(nonce)]
  });
}
async function setRpcUrl(client, jsonRpcUrl) {
  await client.request({
    method: `${client.mode}_setRpcUrl`,
    params: [jsonRpcUrl]
  });
}
async function setStorageAt(client, { address, index, value }) {
  await client.request({
    method: `${client.mode}_setStorageAt`,
    params: [
      address,
      typeof index === "number" ? numberToHex(index) : index,
      value
    ]
  });
}
async function snapshot(client) {
  return await client.request({
    method: "evm_snapshot"
  });
}
async function stopImpersonatingAccount(client, { address }) {
  await client.request({
    method: `${client.mode}_stopImpersonatingAccount`,
    params: [address]
  });
}
function testActions({ mode }) {
  return (client_) => {
    const client = client_.extend(() => ({
      mode
    }));
    return {
      dropTransaction: (args) => dropTransaction(client, args),
      dumpState: () => dumpState(client),
      getAutomine: () => getAutomine(client),
      getTxpoolContent: () => getTxpoolContent(client),
      getTxpoolStatus: () => getTxpoolStatus(client),
      impersonateAccount: (args) => impersonateAccount(client, args),
      increaseTime: (args) => increaseTime(client, args),
      inspectTxpool: () => inspectTxpool(client),
      loadState: (args) => loadState(client, args),
      mine: (args) => mine(client, args),
      removeBlockTimestampInterval: () => removeBlockTimestampInterval(client),
      reset: (args) => reset(client, args),
      revert: (args) => revert(client, args),
      sendUnsignedTransaction: (args) => sendUnsignedTransaction(client, args),
      setAutomine: (args) => setAutomine(client, args),
      setBalance: (args) => setBalance(client, args),
      setBlockGasLimit: (args) => setBlockGasLimit(client, args),
      setBlockTimestampInterval: (args) => setBlockTimestampInterval(client, args),
      setCode: (args) => setCode(client, args),
      setCoinbase: (args) => setCoinbase(client, args),
      setIntervalMining: (args) => setIntervalMining(client, args),
      setLoggingEnabled: (args) => setLoggingEnabled(client, args),
      setMinGasPrice: (args) => setMinGasPrice(client, args),
      setNextBlockBaseFeePerGas: (args) => setNextBlockBaseFeePerGas(client, args),
      setNextBlockTimestamp: (args) => setNextBlockTimestamp(client, args),
      setNonce: (args) => setNonce(client, args),
      setRpcUrl: (args) => setRpcUrl(client, args),
      setStorageAt: (args) => setStorageAt(client, args),
      snapshot: () => snapshot(client),
      stopImpersonatingAccount: (args) => stopImpersonatingAccount(client, args)
    };
  };
}
function createTestClient(parameters) {
  const { key = "test", name = "Test Client", mode } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    type: "testClient"
  });
  return client.extend((config) => ({
    mode,
    ...testActions({ mode })(config)
  }));
}
async function addChain(client, { chain }) {
  const { id, name, nativeCurrency, rpcUrls, blockExplorers } = chain;
  await client.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: numberToHex(id),
        chainName: name,
        nativeCurrency,
        rpcUrls: rpcUrls.default.http,
        blockExplorerUrls: blockExplorers ? Object.values(blockExplorers).map(({ url }) => url) : void 0
      }
    ]
  }, { dedupe: true, retryCount: 0 });
}
function deployContract(walletClient, parameters) {
  const { abi, args, bytecode, ...request } = parameters;
  const calldata = encodeDeployData({ abi, args, bytecode });
  return sendTransaction(walletClient, {
    ...request,
    ...request.authorizationList ? { to: null } : {},
    data: calldata
  });
}
async function getAddresses(client) {
  if (client.account?.type === "local")
    return [client.account.address];
  const addresses = await client.request({ method: "eth_accounts" }, { dedupe: true });
  return addresses.map((address) => checksumAddress(address));
}
async function getCapabilities(client, parameters = {}) {
  const { account = client.account, chainId } = parameters;
  const account_ = account ? parseAccount(account) : void 0;
  const params = chainId ? [account_?.address, [numberToHex(chainId)]] : [account_?.address];
  const capabilities_raw = await client.request({
    method: "wallet_getCapabilities",
    params
  });
  const capabilities = {};
  for (const [chainId2, capabilities_] of Object.entries(capabilities_raw)) {
    capabilities[Number(chainId2)] = {};
    for (let [key, value] of Object.entries(capabilities_)) {
      if (key === "addSubAccount")
        key = "unstable_addSubAccount";
      capabilities[Number(chainId2)][key] = value;
    }
  }
  return typeof chainId === "number" ? capabilities[chainId] : capabilities;
}
async function getPermissions(client) {
  const permissions = await client.request({ method: "wallet_getPermissions" }, { dedupe: true });
  return permissions;
}
async function requestAddresses(client) {
  const addresses = await client.request({ method: "eth_requestAccounts" }, { dedupe: true, retryCount: 0 });
  return addresses.map((address) => getAddress(address));
}
async function requestPermissions(client, permissions) {
  return client.request({
    method: "wallet_requestPermissions",
    params: [permissions]
  }, { retryCount: 0 });
}
async function sendCallsSync(client, parameters) {
  const { chain = client.chain } = parameters;
  const timeout = parameters.timeout ?? Math.max((chain?.blockTime ?? 0) * 3, 5e3);
  const result = await sendCalls(client, parameters);
  const status = await waitForCallsStatus(client, {
    ...parameters,
    id: result.id,
    timeout
  });
  return status;
}
const supportsWalletNamespace = new LruMap(128);
async function sendTransactionSync(client, parameters) {
  const { account: account_ = client.account, chain = client.chain, accessList, authorizationList, blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, pollingInterval, throwOnReceiptRevert, type, value, ...rest } = parameters;
  const timeout = parameters.timeout ?? Math.max((chain?.blockTime ?? 0) * 3, 5e3);
  if (typeof account_ === "undefined")
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/sendTransactionSync"
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
          throw new BaseError("`to` is required. Could not infer from `authorizationList`.");
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
        ...extract(rest, { format: chainFormat }),
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
      const hash = await (async () => {
        try {
          return await client.request({
            method,
            params: [request]
          }, { retryCount: 0 });
        } catch (e3) {
          if (isWalletNamespaceSupported === false)
            throw e3;
          const error = e3;
          if (error.name === "InvalidInputRpcError" || error.name === "InvalidParamsRpcError" || error.name === "MethodNotFoundRpcError" || error.name === "MethodNotSupportedRpcError") {
            return await client.request({
              method: "wallet_sendTransaction",
              params: [request]
            }, { retryCount: 0 }).then((hash2) => {
              supportsWalletNamespace.set(client.uid, true);
              return hash2;
            }).catch((e4) => {
              const walletNamespaceError = e4;
              if (walletNamespaceError.name === "MethodNotFoundRpcError" || walletNamespaceError.name === "MethodNotSupportedRpcError") {
                supportsWalletNamespace.set(client.uid, false);
                throw error;
              }
              throw walletNamespaceError;
            });
          }
          throw error;
        }
      })();
      const receipt = await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({
        checkReplacement: false,
        hash,
        pollingInterval,
        timeout
      });
      if (throwOnReceiptRevert && receipt.status === "reverted")
        throw new TransactionReceiptRevertedError({ receipt });
      return receipt;
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
      return await getAction(client, sendRawTransactionSync, "sendRawTransactionSync")({
        serializedTransaction,
        throwOnReceiptRevert
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
      docsPath: "/docs/actions/wallet/sendTransactionSync",
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
async function showCallsStatus(client, parameters) {
  const { id } = parameters;
  await client.request({
    method: "wallet_showCallsStatus",
    params: [id]
  });
  return;
}
async function signAuthorization(client, parameters) {
  const { account: account_ = client.account } = parameters;
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/eip7702/signAuthorization"
    });
  const account = parseAccount(account_);
  if (!account.signAuthorization)
    throw new AccountTypeNotSupportedError({
      docsPath: "/docs/eip7702/signAuthorization",
      metaMessages: [
        "The `signAuthorization` Action does not support JSON-RPC Accounts."
      ],
      type: account.type
    });
  const authorization = await prepareAuthorization(client, parameters);
  return account.signAuthorization(authorization);
}
async function signMessage(client, { account: account_ = client.account, message }) {
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/signMessage"
    });
  const account = parseAccount(account_);
  if (account.signMessage)
    return account.signMessage({ message });
  const message_ = (() => {
    if (typeof message === "string")
      return stringToHex(message);
    if (message.raw instanceof Uint8Array)
      return toHex(message.raw);
    return message.raw;
  })();
  return client.request({
    method: "personal_sign",
    params: [message_, account.address]
  }, { retryCount: 0 });
}
async function signTransaction(client, parameters) {
  const { account: account_ = client.account, chain = client.chain, ...transaction } = parameters;
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/signTransaction"
    });
  const account = parseAccount(account_);
  assertRequest({
    account,
    ...parameters
  });
  const chainId = await getAction(client, getChainId, "getChainId")({});
  if (chain !== null)
    assertCurrentChain({
      currentChainId: chainId,
      chain
    });
  const formatters = chain?.formatters || client.chain?.formatters;
  const format = formatters?.transactionRequest?.format || formatTransactionRequest;
  if (account.signTransaction)
    return account.signTransaction({
      ...transaction,
      chainId
    }, { serializer: client.chain?.serializers?.transaction });
  return await client.request({
    method: "eth_signTransaction",
    params: [
      {
        ...format({
          ...transaction,
          account
        }, "signTransaction"),
        chainId: numberToHex(chainId),
        from: account.address
      }
    ]
  }, { retryCount: 0 });
}
async function signTypedData(client, parameters) {
  const { account: account_ = client.account, domain, message, primaryType } = parameters;
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/signTypedData"
    });
  const account = parseAccount(account_);
  const types = {
    EIP712Domain: getTypesForEIP712Domain({ domain }),
    ...parameters.types
  };
  validateTypedData({ domain, message, primaryType, types });
  if (account.signTypedData)
    return account.signTypedData({ domain, message, primaryType, types });
  const typedData = serializeTypedData({ domain, message, primaryType, types });
  return client.request({
    method: "eth_signTypedData_v4",
    params: [account.address, typedData]
  }, { retryCount: 0 });
}
async function switchChain(client, { id }) {
  await client.request({
    method: "wallet_switchEthereumChain",
    params: [
      {
        chainId: numberToHex(id)
      }
    ]
  }, { retryCount: 0 });
}
async function watchAsset(client, params) {
  const added = await client.request({
    method: "wallet_watchAsset",
    params
  }, { retryCount: 0 });
  return added;
}
async function writeContractSync(client, parameters) {
  return writeContract.internal(client, sendTransactionSync, "sendTransactionSync", parameters);
}
function walletActions(client) {
  return {
    addChain: (args) => addChain(client, args),
    deployContract: (args) => deployContract(client, args),
    getAddresses: () => getAddresses(client),
    getCallsStatus: (args) => getCallsStatus(client, args),
    getCapabilities: (args) => getCapabilities(client, args),
    getChainId: () => getChainId(client),
    getPermissions: () => getPermissions(client),
    prepareAuthorization: (args) => prepareAuthorization(client, args),
    prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
    requestAddresses: () => requestAddresses(client),
    requestPermissions: (args) => requestPermissions(client, args),
    sendCalls: (args) => sendCalls(client, args),
    sendCallsSync: (args) => sendCallsSync(client, args),
    sendRawTransaction: (args) => sendRawTransaction(client, args),
    sendRawTransactionSync: (args) => sendRawTransactionSync(client, args),
    sendTransaction: (args) => sendTransaction(client, args),
    sendTransactionSync: (args) => sendTransactionSync(client, args),
    showCallsStatus: (args) => showCallsStatus(client, args),
    signAuthorization: (args) => signAuthorization(client, args),
    signMessage: (args) => signMessage(client, args),
    signTransaction: (args) => signTransaction(client, args),
    signTypedData: (args) => signTypedData(client, args),
    switchChain: (args) => switchChain(client, args),
    waitForCallsStatus: (args) => waitForCallsStatus(client, args),
    watchAsset: (args) => watchAsset(client, args),
    writeContract: (args) => writeContract(client, args),
    writeContractSync: (args) => writeContractSync(client, args)
  };
}
function createWalletClient(parameters) {
  const { key = "wallet", name = "Wallet Client", transport } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    transport,
    type: "walletClient"
  });
  return client.extend(walletActions);
}
function custom(provider, config = {}) {
  const { key = "custom", methods, name = "Custom Provider", retryDelay } = config;
  return ({ retryCount: defaultRetryCount }) => createTransport({
    key,
    methods,
    name,
    request: provider.request.bind(provider),
    retryCount: config.retryCount ?? defaultRetryCount,
    retryDelay,
    type: "custom"
  });
}
function fallback(transports_, config = {}) {
  const { key = "fallback", name = "Fallback", rank = false, shouldThrow: shouldThrow_ = shouldThrow, retryCount, retryDelay } = config;
  return ({ chain, pollingInterval = 4e3, timeout, ...rest }) => {
    let transports = transports_;
    let onResponse = () => {
    };
    const transport = createTransport({
      key,
      name,
      async request({ method, params }) {
        let includes;
        const fetch = async (i4 = 0) => {
          const transport2 = transports[i4]({
            ...rest,
            chain,
            retryCount: 0,
            timeout
          });
          try {
            const response = await transport2.request({
              method,
              params
            });
            onResponse({
              method,
              params,
              response,
              transport: transport2,
              status: "success"
            });
            return response;
          } catch (err) {
            onResponse({
              error: err,
              method,
              params,
              transport: transport2,
              status: "error"
            });
            if (shouldThrow_(err))
              throw err;
            if (i4 === transports.length - 1)
              throw err;
            includes ?? (includes = transports.slice(i4 + 1).some((transport3) => {
              const { include, exclude } = transport3({ chain }).config.methods || {};
              if (include)
                return include.includes(method);
              if (exclude)
                return !exclude.includes(method);
              return true;
            }));
            if (!includes)
              throw err;
            return fetch(i4 + 1);
          }
        };
        return fetch();
      },
      retryCount,
      retryDelay,
      type: "fallback"
    }, {
      onResponse: (fn) => onResponse = fn,
      transports: transports.map((fn) => fn({ chain, retryCount: 0 }))
    });
    if (rank) {
      const rankOptions = typeof rank === "object" ? rank : {};
      rankTransports({
        chain,
        interval: rankOptions.interval ?? pollingInterval,
        onTransports: (transports_2) => transports = transports_2,
        ping: rankOptions.ping,
        sampleCount: rankOptions.sampleCount,
        timeout: rankOptions.timeout,
        transports,
        weights: rankOptions.weights
      });
    }
    return transport;
  };
}
function shouldThrow(error) {
  if ("code" in error && typeof error.code === "number") {
    if (error.code === TransactionRejectedRpcError.code || error.code === UserRejectedRequestError.code || ExecutionRevertedError.nodeMessage.test(error.message) || error.code === 5e3)
      return true;
  }
  return false;
}
function rankTransports({ chain, interval = 4e3, onTransports, ping, sampleCount = 10, timeout = 1e3, transports, weights = {} }) {
  const { stability: stabilityWeight = 0.7, latency: latencyWeight = 0.3 } = weights;
  const samples = [];
  const rankTransports_ = async () => {
    const sample = await Promise.all(transports.map(async (transport) => {
      const transport_ = transport({ chain, retryCount: 0, timeout });
      const start = Date.now();
      let end;
      let success;
      try {
        await (ping ? ping({ transport: transport_ }) : transport_.request({ method: "net_listening" }));
        success = 1;
      } catch {
        success = 0;
      } finally {
        end = Date.now();
      }
      const latency = end - start;
      return { latency, success };
    }));
    samples.push(sample);
    if (samples.length > sampleCount)
      samples.shift();
    const maxLatency = Math.max(...samples.map((sample2) => Math.max(...sample2.map(({ latency }) => latency))));
    const scores = transports.map((_2, i4) => {
      const latencies = samples.map((sample2) => sample2[i4].latency);
      const meanLatency = latencies.reduce((acc, latency) => acc + latency, 0) / latencies.length;
      const latencyScore = 1 - meanLatency / maxLatency;
      const successes = samples.map((sample2) => sample2[i4].success);
      const stabilityScore = successes.reduce((acc, success) => acc + success, 0) / successes.length;
      if (stabilityScore === 0)
        return [0, i4];
      return [
        latencyWeight * latencyScore + stabilityWeight * stabilityScore,
        i4
      ];
    }).sort((a10, b10) => b10[0] - a10[0]);
    onTransports(scores.map(([, i4]) => transports[i4]));
    await wait(interval);
    rankTransports_();
  };
  rankTransports_();
}
function webSocket(url, config = {}) {
  const { keepAlive, key = "webSocket", methods, name = "WebSocket JSON-RPC", reconnect, retryDelay } = config;
  return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
    const retryCount = config.retryCount ?? retryCount_;
    const timeout = timeout_ ?? config.timeout ?? 1e4;
    const url_ = url || chain?.rpcUrls.default.webSocket?.[0];
    const wsRpcClientOpts = { keepAlive, reconnect };
    if (!url_)
      throw new UrlRequiredError();
    return createTransport({
      key,
      methods,
      name,
      async request({ method, params }) {
        const body = { method, params };
        const rpcClient = await getWebSocketRpcClient(url_, wsRpcClientOpts);
        const { error, result } = await rpcClient.requestAsync({
          body,
          timeout
        });
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
      type: "webSocket"
    }, {
      getSocket() {
        return getSocket(url_);
      },
      getRpcClient() {
        return getWebSocketRpcClient(url_, wsRpcClientOpts);
      },
      async subscribe({ params, onData, onError }) {
        const rpcClient = await getWebSocketRpcClient(url_, wsRpcClientOpts);
        const { result: subscriptionId } = await new Promise((resolve, reject) => rpcClient.request({
          body: {
            method: "eth_subscribe",
            params
          },
          onError(error) {
            reject(error);
            onError?.(error);
            return;
          },
          onResponse(response) {
            if (response.error) {
              reject(response.error);
              onError?.(response.error);
              return;
            }
            if (typeof response.id === "number") {
              resolve(response);
              return;
            }
            if (response.method !== "eth_subscription")
              return;
            onData(response.params);
          }
        }));
        return {
          subscriptionId,
          async unsubscribe() {
            return new Promise((resolve) => rpcClient.request({
              body: {
                method: "eth_unsubscribe",
                params: [subscriptionId]
              },
              onResponse: resolve
            }));
          }
        };
      }
    });
  };
}
class ProviderRpcError extends Error {
  constructor(code, message) {
    super(message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.code = code;
    this.details = message;
  }
}
const docsPath = "/docs/contract/decodeDeployData";
function decodeDeployData(parameters) {
  const { abi, bytecode, data } = parameters;
  if (data === bytecode)
    return { bytecode };
  const description = abi.find((x2) => "type" in x2 && x2.type === "constructor");
  if (!description)
    throw new AbiConstructorNotFoundError({ docsPath });
  if (!("inputs" in description))
    throw new AbiConstructorParamsNotFoundError({ docsPath });
  if (!description.inputs || description.inputs.length === 0)
    throw new AbiConstructorParamsNotFoundError({ docsPath });
  const args = decodeAbiParameters(description.inputs, `0x${data.replace(bytecode, "")}`);
  return { args, bytecode };
}
function fromBlobs(parameters) {
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x2) => hexToBytes(x2)) : parameters.blobs;
  const length = blobs.reduce((length2, blob) => length2 + blob.length, 0);
  const data = createCursor(new Uint8Array(length));
  let active = true;
  for (const blob of blobs) {
    const cursor = createCursor(blob);
    while (active && cursor.position < blob.length) {
      cursor.incrementPosition(1);
      let consume = 31;
      if (blob.length - cursor.position < 31)
        consume = blob.length - cursor.position;
      for (const _2 in Array.from({ length: consume })) {
        const byte = cursor.readByte();
        const isTerminator = byte === 128 && !cursor.inspectBytes(cursor.remaining).includes(128);
        if (isTerminator) {
          active = false;
          break;
        }
        data.pushByte(byte);
      }
    }
  }
  const trimmedData = data.bytes.slice(0, data.position);
  return to === "hex" ? bytesToHex(trimmedData) : trimmedData;
}
function sidecarsToVersionedHashes(parameters) {
  const { sidecars, version } = parameters;
  const to = parameters.to ?? (typeof sidecars[0].blob === "string" ? "hex" : "bytes");
  const hashes = [];
  for (const { commitment } of sidecars) {
    hashes.push(commitmentToVersionedHash({
      commitment,
      to,
      version
    }));
  }
  return hashes;
}
const SLIP44_MSB = 2147483648;
function toCoinType(chainId) {
  if (chainId === 1)
    return 60n;
  if (chainId >= SLIP44_MSB || chainId < 0)
    throw new EnsInvalidChainIdError({ chainId });
  return BigInt((2147483648 | chainId) >>> 0);
}
function defineKzg({ blobToKzgCommitment, computeBlobKzgProof }) {
  return {
    blobToKzgCommitment,
    computeBlobKzgProof
  };
}
function setupKzg(parameters, path) {
  try {
    parameters.loadTrustedSetup(path);
  } catch (e3) {
    const error = e3;
    if (!error.message.includes("trusted setup is already loaded"))
      throw error;
  }
  return defineKzg(parameters);
}
function compactSignatureToSignature({ r: r3, yParityAndS }) {
  const yParityAndS_bytes = hexToBytes(yParityAndS);
  const yParity = yParityAndS_bytes[0] & 128 ? 1 : 0;
  const s4 = yParityAndS_bytes;
  if (yParity === 1)
    s4[0] &= 127;
  return { r: r3, s: bytesToHex(s4), yParity };
}
function parseCompactSignature(signatureHex) {
  const { r: r3, s: s4 } = secp256k1.Signature.fromCompact(signatureHex.slice(2, 130));
  return {
    r: numberToHex(r3, { size: 32 }),
    yParityAndS: numberToHex(s4, { size: 32 })
  };
}
async function recoverTransactionAddress(parameters) {
  const { serializedTransaction, signature: signature_ } = parameters;
  const transaction = parseTransaction(serializedTransaction);
  const signature = signature_ ?? {
    r: transaction.r,
    s: transaction.s,
    v: transaction.v,
    yParity: transaction.yParity
  };
  const serialized = serializeTransaction({
    ...transaction,
    r: void 0,
    s: void 0,
    v: void 0,
    yParity: void 0,
    sidecars: void 0
  });
  return await recoverAddress({
    hash: keccak256(serialized),
    signature
  });
}
function serializeCompactSignature({ r: r3, yParityAndS }) {
  return `0x${new secp256k1.Signature(hexToBigInt(r3), hexToBigInt(yParityAndS)).toCompactHex()}`;
}
function signatureToCompactSignature(signature) {
  const { r: r3, s: s4, v: v2, yParity } = signature;
  const yParity_ = Number(yParity ?? v2 - 27n);
  let yParityAndS = s4;
  if (yParity_ === 1) {
    const bytes = hexToBytes(s4);
    bytes[0] |= 128;
    yParityAndS = bytesToHex(bytes);
  }
  return { r: r3, yParityAndS };
}
export {
  AbiConstructorNotFoundError,
  AbiConstructorParamsNotFoundError,
  a9 as AbiDecodingDataSizeInvalidError,
  aa as AbiDecodingDataSizeTooSmallError,
  ab as AbiDecodingZeroDataError,
  ac2 as AbiEncodingArrayLengthMismatchError,
  ad2 as AbiEncodingBytesSizeMismatchError,
  ae2 as AbiEncodingLengthMismatchError,
  af2 as AbiErrorInputsNotFoundError,
  ag2 as AbiErrorNotFoundError,
  ah2 as AbiErrorSignatureNotFoundError,
  ai2 as AbiEventNotFoundError,
  aj2 as AbiEventSignatureEmptyTopicsError,
  ak2 as AbiEventSignatureNotFoundError,
  al2 as AbiFunctionNotFoundError,
  am2 as AbiFunctionOutputsNotFoundError,
  an2 as AbiFunctionSignatureNotFoundError,
  ac as AccountStateConflictError,
  A as AtomicReadyWalletRejectedUpgradeError,
  c as AtomicityNotSupportedError,
  BaseError,
  ad as BaseFeeScalarError,
  ae as BlockNotFoundError,
  af as BundleFailedError,
  B as BundleTooLargeError,
  ao2 as BytesSizeMismatchError,
  ag as CallExecutionError,
  C as ChainDisconnectedError,
  ah as ChainDoesNotSupportContract,
  ai as ChainMismatchError,
  aj as ChainNotFoundError,
  ak as CircularReferenceError,
  al as ClientChainNotConfiguredError,
  am as ContractFunctionExecutionError,
  an as ContractFunctionRevertedError,
  ao as ContractFunctionZeroDataError,
  ap as CounterfactualDeploymentFailedError,
  ap2 as DecodeLogDataMismatch,
  aq2 as DecodeLogTopicsMismatch,
  D as DuplicateIdError,
  ProviderRpcError as EIP1193ProviderRpcError,
  aq as Eip1559FeesNotSupportedError,
  ar as EnsAvatarInvalidNftUriError,
  as as EnsAvatarUnsupportedNamespaceError,
  at as EnsAvatarUriResolutionError,
  EnsInvalidChainIdError,
  au as EstimateGasExecutionError,
  ExecutionRevertedError,
  av as FeeCapTooHighError,
  aw as FeeCapTooLowError,
  ax as FeeConflictError,
  ar2 as FilterTypeNotSupportedError,
  H as HttpRequestError,
  ay as InsufficientFundsError,
  ba2 as IntegerOutOfRangeError,
  I as InternalRpcError,
  az as IntrinsicGasTooHighError,
  aA as IntrinsicGasTooLowError,
  as2 as InvalidAbiDecodingTypeError,
  at2 as InvalidAbiEncodingTypeError,
  aB as InvalidAbiItemError,
  InvalidAbiParameterError,
  aC as InvalidAbiParametersError,
  aD as InvalidAbiTypeParameterError,
  InvalidAddressError,
  au2 as InvalidArrayError,
  bb2 as InvalidBytesBooleanError,
  aE as InvalidChainIdError,
  InvalidDecimalNumberError,
  av2 as InvalidDefinitionTypeError,
  au3 as InvalidDomainError,
  aF as InvalidFunctionModifierError,
  bc2 as InvalidHexBooleanError,
  InvalidHexValueError,
  d as InvalidInputRpcError,
  InvalidLegacyVError,
  aG as InvalidModifierError,
  aH as InvalidParameterError,
  e as InvalidParamsRpcError,
  aI as InvalidParenthesisError,
  av3 as InvalidPrimaryTypeError,
  f as InvalidRequestRpcError,
  aJ as InvalidSerializableTransactionError,
  InvalidSerializedTransactionError,
  InvalidSerializedTransactionTypeError,
  aK as InvalidSignatureError,
  aL as InvalidStorageKeySizeError,
  aM as InvalidStructSignatureError,
  aw3 as InvalidStructTypeError,
  J as JsonRpcVersionUnsupportedError,
  L as LimitExceededRpcError,
  aN as MaxFeePerGasTooLowError,
  M as MethodNotFoundRpcError,
  h as MethodNotSupportedRpcError,
  aO as NonceMaxValueError,
  aP as NonceTooHighError,
  aQ as NonceTooLowError,
  P as ParseRpcError,
  i2 as ProviderDisconnectedError,
  j as ProviderRpcError,
  aR as RawContractError,
  k as ResourceNotFoundRpcError,
  l as ResourceUnavailableRpcError,
  m as RpcError,
  RpcRequestError,
  bd2 as SizeExceedsPaddingSizeError,
  be2 as SizeOverflowError,
  bf2 as SliceOffsetOutOfBoundsError,
  SocketClosedError,
  aS as SolidityProtectedKeywordError,
  aT as StateAssignmentConflictError,
  S as SwitchChainError,
  TimeoutError,
  aU as TipAboveFeeCapError,
  aV as TransactionExecutionError,
  aW as TransactionNotFoundError,
  aX as TransactionReceiptNotFoundError,
  TransactionRejectedRpcError,
  aY as TransactionTypeNotSupportedError,
  n as UnauthorizedProviderError,
  o as UnknownBundleIdError,
  aZ as UnknownNodeError,
  p as UnknownRpcError,
  a_ as UnknownSignatureError,
  a$ as UnknownTypeError,
  q as UnsupportedChainIdError,
  r as UnsupportedNonOptionalCapabilityError,
  aw2 as UnsupportedPackedAbiType,
  s2 as UnsupportedProviderMethodError,
  UrlRequiredError,
  UserRejectedRequestError,
  b0 as WaitForCallsStatusTimeoutError,
  b1 as WaitForTransactionReceiptTimeoutError,
  WebSocketRequestError,
  assertCurrentChain,
  assertRequest,
  assertTransactionEIP1559,
  assertTransactionEIP2930,
  assertTransactionLegacy,
  b2 as blobsToCommitments,
  b3 as blobsToProofs,
  bg2 as boolToBytes,
  bh2 as boolToHex,
  ax2 as bytesToBigInt,
  ay2 as bytesToBool,
  bytesToHex,
  az2 as bytesToNumber,
  b as bytesToRlp,
  aA2 as bytesToString,
  ccipRequest as ccipFetch,
  ccipRequest2 as ccipRequest,
  checksumAddress,
  commitmentToVersionedHash,
  b4 as commitmentsToVersionedHashes,
  serializeCompactSignature as compactSignatureToHex,
  compactSignatureToSignature,
  concat,
  aB2 as concatBytes,
  aC2 as concatHex,
  createClient,
  b5 as createNonceManager,
  b6 as createPublicClient,
  createTestClient,
  createTransport,
  createWalletClient,
  custom,
  decodeAbiParameters,
  decodeDeployData,
  i as decodeErrorResult,
  aD2 as decodeEventLog,
  b7 as decodeFunctionData,
  b8 as decodeFunctionResult,
  aE2 as defineBlock,
  aF2 as defineChain,
  defineKzg,
  bi3 as defineTransaction,
  bj3 as defineTransactionReceipt,
  aG2 as defineTransactionRequest,
  b9 as deploylessCallViaBytecodeBytecode,
  ba as deploylessCallViaFactoryBytecode,
  ax3 as domainSeparator,
  g as encodeAbiParameters,
  encodeDeployData,
  bb as encodeErrorResult,
  aH2 as encodeEventTopics,
  encodeFunctionData,
  bc as encodeFunctionResult,
  bd as encodePacked,
  be as erc1155Abi,
  bf as erc20Abi,
  bg as erc20Abi_bytes32,
  bh as erc4626Abi,
  bi as erc6492SignatureValidatorAbi,
  bj as erc6492SignatureValidatorByteCode,
  bk as erc721Abi,
  bl as ethAddress,
  etherUnits,
  extractChain,
  fallback,
  aI2 as formatBlock,
  bm as formatEther,
  bn as formatGwei,
  bk2 as formatLog,
  bl2 as formatTransaction,
  bm2 as formatTransactionReceipt,
  formatTransactionRequest,
  bo as formatUnits,
  fromBlobs,
  aJ2 as fromBytes,
  bn2 as fromHex,
  fromRlp,
  aK2 as getAbiItem,
  getAddress,
  bp as getChainContractAddress,
  getContract,
  getContractAddress,
  getContractError,
  getCreate2Address,
  getCreateAddress,
  aL2 as getEventSelector,
  aM2 as getEventSignature,
  a as getFunctionSelector,
  aM3 as getFunctionSignature,
  getSerializedTransactionType,
  bq as getTransactionType,
  getTypesForEIP712Domain,
  gweiUnits,
  ay3 as hashDomain,
  hashMessage,
  az3 as hashStruct,
  hashTypedData,
  hexToBigInt,
  bo2 as hexToBool,
  hexToBytes,
  parseCompactSignature as hexToCompactSignature,
  hexToNumber,
  h2 as hexToRlp,
  br as hexToSignature,
  bp2 as hexToString,
  bs as http,
  isAddress,
  isAddressEqual,
  isBytes,
  isErc6492Signature,
  isErc8010Signature,
  isHash,
  isHex,
  keccak256,
  aA3 as labelhash,
  a3 as maxInt104,
  c2 as maxInt112,
  d2 as maxInt120,
  e2 as maxInt128,
  f2 as maxInt136,
  g2 as maxInt144,
  i3 as maxInt152,
  j2 as maxInt16,
  k2 as maxInt160,
  l2 as maxInt168,
  n2 as maxInt176,
  o2 as maxInt184,
  p2 as maxInt192,
  q2 as maxInt200,
  r2 as maxInt208,
  u as maxInt216,
  v as maxInt224,
  w as maxInt232,
  x as maxInt24,
  y as maxInt240,
  z as maxInt248,
  A2 as maxInt256,
  B2 as maxInt32,
  C2 as maxInt40,
  D2 as maxInt48,
  E as maxInt56,
  F as maxInt64,
  G as maxInt72,
  I2 as maxInt8,
  J2 as maxInt80,
  K as maxInt88,
  L2 as maxInt96,
  M2 as maxUint104,
  N as maxUint112,
  O as maxUint120,
  P2 as maxUint128,
  Q as maxUint136,
  R as maxUint144,
  S2 as maxUint152,
  m2 as maxUint16,
  T as maxUint160,
  U as maxUint168,
  V as maxUint176,
  W as maxUint184,
  X as maxUint192,
  Y as maxUint200,
  Z as maxUint208,
  _ as maxUint216,
  $ as maxUint224,
  a0 as maxUint232,
  a1 as maxUint24,
  a22 as maxUint240,
  a32 as maxUint248,
  a4 as maxUint256,
  a5 as maxUint32,
  a6 as maxUint40,
  a7 as maxUint48,
  a8 as maxUint56,
  a92 as maxUint64,
  aa2 as maxUint72,
  ab2 as maxUint8,
  ac3 as maxUint80,
  ad3 as maxUint88,
  ae3 as maxUint96,
  af3 as minInt104,
  ag3 as minInt112,
  ah3 as minInt120,
  ai3 as minInt128,
  aj3 as minInt136,
  ak3 as minInt144,
  al3 as minInt152,
  am3 as minInt16,
  an3 as minInt160,
  ao3 as minInt168,
  ap3 as minInt176,
  aq3 as minInt184,
  ar3 as minInt192,
  as3 as minInt200,
  at3 as minInt208,
  au4 as minInt216,
  av4 as minInt224,
  aw4 as minInt232,
  ax4 as minInt24,
  ay4 as minInt240,
  az4 as minInt248,
  aA4 as minInt256,
  aB3 as minInt32,
  aC3 as minInt40,
  aD3 as minInt48,
  aE3 as minInt56,
  aF3 as minInt64,
  aG3 as minInt72,
  aH3 as minInt8,
  aI3 as minInt80,
  aJ3 as minInt88,
  aK3 as minInt96,
  bt as multicall3Abi,
  bu as namehash,
  bv as nonceManager,
  bq2 as numberToBytes,
  numberToHex,
  offchainLookup,
  offchainLookupAbiItem,
  offchainLookupSignature,
  pad,
  br3 as padBytes,
  padHex,
  bw as parseAbi,
  bx as parseAbiItem,
  parseAbiParameter,
  by as parseAbiParameters,
  parseCompactSignature,
  parseErc6492Signature,
  parseErc8010Signature,
  parseEther,
  aN2 as parseEventLogs,
  parseGwei,
  br2 as parseSignature,
  parseTransaction,
  parseUnits,
  bz as prepareEncodeFunctionData,
  bA as presignMessagePrefix,
  bB as publicActions,
  recoverAddress,
  recoverMessageAddress,
  bC as recoverPublicKey,
  recoverTransactionAddress,
  recoverTypedDataAddress,
  ripemd160,
  bD as rpcSchema,
  aO2 as rpcTransactionType,
  bE as serializeAccessList,
  serializeCompactSignature,
  bF as serializeErc6492Signature,
  serializeErc8010Signature,
  bG as serializeSignature,
  serializeTransaction,
  serializeTypedData,
  bs2 as setErrorConfig,
  setupKzg,
  s3 as sha256,
  shouldThrow,
  sidecarsToVersionedHashes,
  signatureToCompactSignature,
  bG2 as signatureToHex,
  size,
  slice,
  aP2 as sliceBytes,
  sliceHex,
  bt2 as stringToBytes,
  stringToHex,
  s as stringify,
  testActions,
  toBlobSidecars,
  bH as toBlobs,
  toBytes,
  toCoinType,
  aQ2 as toEventHash,
  aL3 as toEventSelector,
  aM4 as toEventSignature,
  aQ3 as toFunctionHash,
  a2 as toFunctionSelector,
  aM5 as toFunctionSignature,
  toHex,
  bI as toPrefixedMessage,
  toRlp,
  bu2 as transactionType,
  trim,
  bi2 as universalSignatureValidatorAbi,
  bj2 as universalSignatureValidatorByteCode,
  validateTypedData,
  verifyHash,
  verifyMessage,
  verifyTypedData,
  walletActions,
  webSocket,
  bJ as weiUnits,
  bK as withCache,
  bL as withRetry,
  withTimeout,
  bM as zeroAddress,
  bN as zeroHash
};
