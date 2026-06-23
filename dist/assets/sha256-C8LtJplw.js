import { ay as bytesToHex, ax as hexToBytes, _ as BaseError, $ as isHex, au as toBytes$1, az as toHex } from "./index-CXUot43X.js";
import { w as createCursor, H as Hash, x as createView, y as aexists, z as toBytes, A as abytes, B as aoutput, C as clean, D as createHasher, E as rotr } from "./bundler-Dmn5v2kr.js";
function toRlp(bytes, to = "hex") {
  const encodable = getEncodable(bytes);
  const cursor = createCursor(new Uint8Array(encodable.length));
  encodable.encode(cursor);
  if (to === "hex")
    return bytesToHex(cursor.bytes);
  return cursor.bytes;
}
function bytesToRlp(bytes, to = "bytes") {
  return toRlp(bytes, to);
}
function hexToRlp(hex, to = "hex") {
  return toRlp(hex, to);
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
      for (const { encode } of list) {
        encode(cursor);
      }
    }
  };
}
function getEncodableBytes(bytesOrHex) {
  const bytes = typeof bytesOrHex === "string" ? hexToBytes(bytesOrHex) : bytesOrHex;
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
  throw new BaseError("Length is too large.");
}
const maxInt8 = 2n ** (8n - 1n) - 1n;
const maxInt16 = 2n ** (16n - 1n) - 1n;
const maxInt24 = 2n ** (24n - 1n) - 1n;
const maxInt32 = 2n ** (32n - 1n) - 1n;
const maxInt40 = 2n ** (40n - 1n) - 1n;
const maxInt48 = 2n ** (48n - 1n) - 1n;
const maxInt56 = 2n ** (56n - 1n) - 1n;
const maxInt64 = 2n ** (64n - 1n) - 1n;
const maxInt72 = 2n ** (72n - 1n) - 1n;
const maxInt80 = 2n ** (80n - 1n) - 1n;
const maxInt88 = 2n ** (88n - 1n) - 1n;
const maxInt96 = 2n ** (96n - 1n) - 1n;
const maxInt104 = 2n ** (104n - 1n) - 1n;
const maxInt112 = 2n ** (112n - 1n) - 1n;
const maxInt120 = 2n ** (120n - 1n) - 1n;
const maxInt128 = 2n ** (128n - 1n) - 1n;
const maxInt136 = 2n ** (136n - 1n) - 1n;
const maxInt144 = 2n ** (144n - 1n) - 1n;
const maxInt152 = 2n ** (152n - 1n) - 1n;
const maxInt160 = 2n ** (160n - 1n) - 1n;
const maxInt168 = 2n ** (168n - 1n) - 1n;
const maxInt176 = 2n ** (176n - 1n) - 1n;
const maxInt184 = 2n ** (184n - 1n) - 1n;
const maxInt192 = 2n ** (192n - 1n) - 1n;
const maxInt200 = 2n ** (200n - 1n) - 1n;
const maxInt208 = 2n ** (208n - 1n) - 1n;
const maxInt216 = 2n ** (216n - 1n) - 1n;
const maxInt224 = 2n ** (224n - 1n) - 1n;
const maxInt232 = 2n ** (232n - 1n) - 1n;
const maxInt240 = 2n ** (240n - 1n) - 1n;
const maxInt248 = 2n ** (248n - 1n) - 1n;
const maxInt256 = 2n ** (256n - 1n) - 1n;
const minInt8 = -(2n ** (8n - 1n));
const minInt16 = -(2n ** (16n - 1n));
const minInt24 = -(2n ** (24n - 1n));
const minInt32 = -(2n ** (32n - 1n));
const minInt40 = -(2n ** (40n - 1n));
const minInt48 = -(2n ** (48n - 1n));
const minInt56 = -(2n ** (56n - 1n));
const minInt64 = -(2n ** (64n - 1n));
const minInt72 = -(2n ** (72n - 1n));
const minInt80 = -(2n ** (80n - 1n));
const minInt88 = -(2n ** (88n - 1n));
const minInt96 = -(2n ** (96n - 1n));
const minInt104 = -(2n ** (104n - 1n));
const minInt112 = -(2n ** (112n - 1n));
const minInt120 = -(2n ** (120n - 1n));
const minInt128 = -(2n ** (128n - 1n));
const minInt136 = -(2n ** (136n - 1n));
const minInt144 = -(2n ** (144n - 1n));
const minInt152 = -(2n ** (152n - 1n));
const minInt160 = -(2n ** (160n - 1n));
const minInt168 = -(2n ** (168n - 1n));
const minInt176 = -(2n ** (176n - 1n));
const minInt184 = -(2n ** (184n - 1n));
const minInt192 = -(2n ** (192n - 1n));
const minInt200 = -(2n ** (200n - 1n));
const minInt208 = -(2n ** (208n - 1n));
const minInt216 = -(2n ** (216n - 1n));
const minInt224 = -(2n ** (224n - 1n));
const minInt232 = -(2n ** (232n - 1n));
const minInt240 = -(2n ** (240n - 1n));
const minInt248 = -(2n ** (248n - 1n));
const minInt256 = -(2n ** (256n - 1n));
const maxUint8 = 2n ** 8n - 1n;
const maxUint16 = 2n ** 16n - 1n;
const maxUint24 = 2n ** 24n - 1n;
const maxUint32 = 2n ** 32n - 1n;
const maxUint40 = 2n ** 40n - 1n;
const maxUint48 = 2n ** 48n - 1n;
const maxUint56 = 2n ** 56n - 1n;
const maxUint64 = 2n ** 64n - 1n;
const maxUint72 = 2n ** 72n - 1n;
const maxUint80 = 2n ** 80n - 1n;
const maxUint88 = 2n ** 88n - 1n;
const maxUint96 = 2n ** 96n - 1n;
const maxUint104 = 2n ** 104n - 1n;
const maxUint112 = 2n ** 112n - 1n;
const maxUint120 = 2n ** 120n - 1n;
const maxUint128 = 2n ** 128n - 1n;
const maxUint136 = 2n ** 136n - 1n;
const maxUint144 = 2n ** 144n - 1n;
const maxUint152 = 2n ** 152n - 1n;
const maxUint160 = 2n ** 160n - 1n;
const maxUint168 = 2n ** 168n - 1n;
const maxUint176 = 2n ** 176n - 1n;
const maxUint184 = 2n ** 184n - 1n;
const maxUint192 = 2n ** 192n - 1n;
const maxUint200 = 2n ** 200n - 1n;
const maxUint208 = 2n ** 208n - 1n;
const maxUint216 = 2n ** 216n - 1n;
const maxUint224 = 2n ** 224n - 1n;
const maxUint232 = 2n ** 232n - 1n;
const maxUint240 = 2n ** 240n - 1n;
const maxUint248 = 2n ** 248n - 1n;
const maxUint256 = 2n ** 256n - 1n;
function setBigUint64(view, byteOffset, value, isLE) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE);
  const _32n = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE ? 4 : 0;
  const l = isLE ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE);
  view.setUint32(byteOffset + l, wl, isLE);
}
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
class HashMD extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
}
const SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
const SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA256 extends HashMD {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
}
const sha256$2 = /* @__PURE__ */ createHasher(() => new SHA256());
const sha256$1 = sha256$2;
function sha256(value, to_) {
  const to = to_ || "hex";
  const bytes = sha256$1(isHex(value, { strict: false }) ? toBytes$1(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}
export {
  maxUint224 as $,
  maxInt256 as A,
  maxInt32 as B,
  maxInt40 as C,
  maxInt48 as D,
  maxInt56 as E,
  maxInt64 as F,
  maxInt72 as G,
  HashMD as H,
  maxInt8 as I,
  maxInt80 as J,
  maxInt88 as K,
  maxInt96 as L,
  maxUint104 as M,
  maxUint112 as N,
  maxUint120 as O,
  maxUint128 as P,
  maxUint136 as Q,
  maxUint144 as R,
  maxUint152 as S,
  maxUint160 as T,
  maxUint168 as U,
  maxUint176 as V,
  maxUint184 as W,
  maxUint192 as X,
  maxUint200 as Y,
  maxUint208 as Z,
  maxUint216 as _,
  maxInt104 as a,
  maxUint232 as a0,
  maxUint24 as a1,
  maxUint240 as a2,
  maxUint248 as a3,
  maxUint256 as a4,
  maxUint32 as a5,
  maxUint40 as a6,
  maxUint48 as a7,
  maxUint56 as a8,
  maxUint64 as a9,
  minInt256 as aA,
  minInt32 as aB,
  minInt40 as aC,
  minInt48 as aD,
  minInt56 as aE,
  minInt64 as aF,
  minInt72 as aG,
  minInt8 as aH,
  minInt80 as aI,
  minInt88 as aJ,
  minInt96 as aK,
  sha256$2 as aL,
  maxUint72 as aa,
  maxUint8 as ab,
  maxUint80 as ac,
  maxUint88 as ad,
  maxUint96 as ae,
  minInt104 as af,
  minInt112 as ag,
  minInt120 as ah,
  minInt128 as ai,
  minInt136 as aj,
  minInt144 as ak,
  minInt152 as al,
  minInt16 as am,
  minInt160 as an,
  minInt168 as ao,
  minInt176 as ap,
  minInt184 as aq,
  minInt192 as ar,
  minInt200 as as,
  minInt208 as at,
  minInt216 as au,
  minInt224 as av,
  minInt232 as aw,
  minInt24 as ax,
  minInt240 as ay,
  minInt248 as az,
  bytesToRlp as b,
  maxInt112 as c,
  maxInt120 as d,
  maxInt128 as e,
  maxInt136 as f,
  maxInt144 as g,
  hexToRlp as h,
  maxInt152 as i,
  maxInt16 as j,
  maxInt160 as k,
  maxInt168 as l,
  maxUint16 as m,
  maxInt176 as n,
  maxInt184 as o,
  maxInt192 as p,
  maxInt200 as q,
  maxInt208 as r,
  sha256 as s,
  toRlp as t,
  maxInt216 as u,
  maxInt224 as v,
  maxInt232 as w,
  maxInt24 as x,
  maxInt240 as y,
  maxInt248 as z
};
