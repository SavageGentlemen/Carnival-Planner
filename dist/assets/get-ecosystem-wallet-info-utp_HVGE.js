import { c as getEcosystemInfo } from "./PassportHome-SJEwmPr3.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./index-CXUot43X.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
import "./trophy-hLhL8QOQ.js";
import "./alert-circle-lhG861Pl.js";
import "./bundler-Dmn5v2kr.js";
import "./emotion-unitless.esm-BWDbD2bQ.js";
import "./TypedData-B3RAtJ0b.js";
import "./Address-CuEhN18Y.js";
import "./Authorization-CEwvBCmC.js";
import "./decimals-RuAU2I0v.js";
import "./arweave-BmejQRVS.js";
import "./gift-Biw2Zx2l.js";
import "./star-CGQXWRD_.js";
import "./award-DJfbIRpy.js";
import "./sparkles-BEe8L_dR.js";
async function getEcosystemWalletInfo(walletId) {
  const data = await getEcosystemInfo(walletId);
  return {
    app: {
      android: null,
      browser: null,
      chrome: null,
      edge: null,
      firefox: null,
      ios: null,
      linux: null,
      mac: null,
      opera: null,
      safari: null,
      windows: null
    },
    desktop: {
      native: null,
      universal: null
    },
    homepage: data.homepage || "",
    id: walletId,
    image_id: data.imageUrl || "",
    mobile: {
      native: null,
      universal: null
    },
    name: data.name,
    rdns: null
  };
}
export {
  getEcosystemWalletInfo
};
