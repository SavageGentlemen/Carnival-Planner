import { w as numberToHex, z as hexToNumber } from "./index-CXUot43X.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
async function eth_getTransactionCount(request, params) {
  const count = await request({
    method: "eth_getTransactionCount",
    params: [
      params.address,
      // makes sense to default to `pending` here, since we're asking for a transaction count (nonce)
      params.blockNumber ? numberToHex(params.blockNumber) : params.blockTag || "pending"
    ]
  });
  return hexToNumber(count);
}
export {
  eth_getTransactionCount
};
