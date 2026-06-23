import { d as decodeAbiParameters, e as encodeAbiParameters, r as readContract } from "./bundler-Dmn5v2kr.js";
import { d as detectMethod } from "./detectExtension-Bd2ZKTZs.js";
import "./index-CXUot43X.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
const FN_SELECTOR = "0x6352211e";
const FN_INPUTS = [
  {
    name: "tokenId",
    type: "uint256"
  }
];
const FN_OUTPUTS = [
  {
    type: "address"
  }
];
function isOwnerOfSupported(availableSelectors) {
  return detectMethod({
    availableSelectors,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS]
  });
}
function encodeOwnerOfParams(options) {
  return encodeAbiParameters(FN_INPUTS, [options.tokenId]);
}
function encodeOwnerOf(options) {
  return FN_SELECTOR + encodeOwnerOfParams(options).slice(2);
}
function decodeOwnerOfResult(result) {
  return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
async function ownerOf(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: [options.tokenId]
  });
}
export {
  FN_SELECTOR,
  decodeOwnerOfResult,
  encodeOwnerOf,
  encodeOwnerOfParams,
  isOwnerOfSupported,
  ownerOf
};
