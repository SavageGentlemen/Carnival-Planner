import { r as readContract, d as decodeAbiParameters, e as encodeAbiParameters } from "./bundler-Dmn5v2kr.js";
import { d as detectMethod } from "./detectExtension-Bd2ZKTZs.js";
import "./index-CXUot43X.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
const FN_SELECTOR = "0xbd85b039";
const FN_INPUTS = [
  {
    name: "id",
    type: "uint256"
  }
];
const FN_OUTPUTS = [
  {
    type: "uint256"
  }
];
function isTotalSupplySupported(availableSelectors) {
  return detectMethod({
    availableSelectors,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS]
  });
}
function encodeTotalSupplyParams(options) {
  return encodeAbiParameters(FN_INPUTS, [options.id]);
}
function encodeTotalSupply(options) {
  return FN_SELECTOR + encodeTotalSupplyParams(options).slice(2);
}
function decodeTotalSupplyResult(result) {
  return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
async function totalSupply(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: [options.id]
  });
}
export {
  FN_SELECTOR,
  decodeTotalSupplyResult,
  encodeTotalSupply,
  encodeTotalSupplyParams,
  isTotalSupplySupported,
  totalSupply
};
