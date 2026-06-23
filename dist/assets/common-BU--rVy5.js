import { x as getInsightEnabledChainIds } from "./index-CXUot43X.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
async function assertInsightEnabled(chains) {
  const chainIds = await getInsightEnabledChainIds();
  const insightEnabled = chains.every((c) => chainIds.includes(c.id));
  if (!insightEnabled) {
    throw new Error(`Insight is not available for chains ${chains.filter((c) => !chainIds.includes(c.id)).map((c) => c.id).join(", ")}`);
  }
}
export {
  assertInsightEnabled
};
