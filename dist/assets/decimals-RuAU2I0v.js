import { V as withCache } from "./index-CXUot43X.js";
import { r as readContract } from "./bundler-Dmn5v2kr.js";
const FN_SELECTOR = "0x313ce567";
const FN_INPUTS = [];
const FN_OUTPUTS = [
  {
    type: "uint8"
  }
];
async function decimals$2(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: []
  });
}
async function decimals(options) {
  return withCache(() => decimals$2(options), {
    cacheKey: `${options.contract.chain.id}:${options.contract.address}:decimals`,
    // can never change, so cache forever
    cacheTime: Number.POSITIVE_INFINITY
  });
}
const decimals$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decimals
}, Symbol.toStringTag, { value: "Module" }));
export {
  decimals as a,
  decimals$1 as b,
  decimals$2 as d
};
