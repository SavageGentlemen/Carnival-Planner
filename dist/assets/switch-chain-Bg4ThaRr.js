import { z as hexToNumber, A as defineChain } from "./index-CXUot43X.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
async function handleSwitchChain(options) {
  const { wallet, params } = options;
  if (wallet.getChain()?.id === hexToNumber(params[0].chainId)) {
    return "0x1";
  }
  await wallet.switchChain(defineChain(hexToNumber(params[0].chainId)));
  return "0x1";
}
export {
  handleSwitchChain
};
