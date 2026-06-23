const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ownerOf--hxhe6iT.js","assets/bundler-Dmn5v2kr.js","assets/index-CXUot43X.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css","assets/detectExtension-Bd2ZKTZs.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { f as fetchTokenMetadata } from "./fetchTokenMetadata-BpgVS7uO.js";
import { t as getNFT$1, w as parseNFT } from "./PassportHome-SJEwmPr3.js";
import { r as readContract } from "./bundler-Dmn5v2kr.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./index-CXUot43X.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
import "./trophy-hLhL8QOQ.js";
import "./alert-circle-lhG861Pl.js";
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
const FN_SELECTOR$1 = "0xc87b56dd";
const FN_INPUTS$1 = [
  {
    name: "_tokenId",
    type: "uint256"
  }
];
const FN_OUTPUTS$1 = [
  {
    type: "string"
  }
];
async function tokenURI(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR$1, FN_INPUTS$1, FN_OUTPUTS$1],
    params: [options.tokenId]
  });
}
const FN_SELECTOR = "0x4f6ccce7";
const FN_INPUTS = [
  {
    name: "_index",
    type: "uint256"
  }
];
const FN_OUTPUTS = [
  {
    type: "uint256"
  }
];
async function tokenByIndex(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: [options.index]
  });
}
async function getNFT(options) {
  const { useIndexer = true } = options;
  if (useIndexer) {
    try {
      return await getNFTFromInsight(options);
    } catch {
      return await getNFTFromRPC(options);
    }
  }
  return await getNFTFromRPC(options);
}
async function getNFTFromInsight(options) {
  const nft = await getNFT$1({
    chain: options.contract.chain,
    client: options.contract.client,
    contractAddress: options.contract.address,
    includeOwners: options.includeOwner,
    tokenId: options.tokenId
  });
  if (!nft) {
    return getNFTFromRPC(options);
  }
  return nft;
}
async function getNFTFromRPC(options) {
  let tokenId = options.tokenId;
  if (options.tokenByIndex) {
    try {
      tokenId = await tokenByIndex({
        contract: options.contract,
        index: options.tokenId
      });
    } catch {
    }
  }
  const [uri, owner] = await Promise.all([
    tokenURI({ contract: options.contract, tokenId }).catch(() => null),
    options.includeOwner ? __vitePreload(() => import("./ownerOf--hxhe6iT.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]) : void 0).then((m) => m.ownerOf({ contract: options.contract, tokenId })).catch(() => null) : null
  ]);
  if (!uri?.trim()) {
    return parseNFT({
      id: tokenId,
      type: "ERC721",
      uri: ""
    }, {
      chainId: options.contract.chain.id,
      owner,
      tokenAddress: options.contract.address,
      tokenId,
      tokenUri: "",
      type: "ERC721"
    });
  }
  return parseNFT(await fetchTokenMetadata({
    client: options.contract.client,
    tokenId,
    tokenUri: uri
  }).then((metadata) => {
    if (!metadata) {
      return {
        id: tokenId,
        type: "ERC721",
        uri
      };
    }
    return metadata;
  }).catch(() => ({
    id: tokenId,
    type: "ERC721",
    uri
  })), {
    chainId: options.contract.chain.id,
    owner,
    tokenAddress: options.contract.address,
    tokenId,
    tokenUri: uri,
    type: "ERC721"
  });
}
export {
  getNFT
};
