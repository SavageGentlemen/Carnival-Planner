import { r as readContract, h as toTokens } from "./bundler-Dmn5v2kr.js";
import { getCurrencyMetadata } from "./getCurrencyMetadata-BZc9If4u.js";
import "./index-CXUot43X.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
import "./decimals-RuAU2I0v.js";
const FN_SELECTOR = "0x70a08231";
const FN_INPUTS = [
  {
    name: "_address",
    type: "address"
  }
];
const FN_OUTPUTS = [
  {
    type: "uint256"
  }
];
async function balanceOf(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: [options.address]
  });
}
async function getBalance(options) {
  const [balanceWei, currencyMetadata] = await Promise.all([
    balanceOf(options),
    getCurrencyMetadata(options)
  ]);
  return {
    ...currencyMetadata,
    chainId: options.contract.chain.id,
    displayValue: toTokens(balanceWei, currencyMetadata.decimals),
    tokenAddress: options.contract.address,
    value: balanceWei
  };
}
export {
  getBalance
};
