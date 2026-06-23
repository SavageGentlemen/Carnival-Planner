import { t as getNFT$1, w as parseNFT } from "./PassportHome-SJEwmPr3.js";
import { f as fetchTokenMetadata } from "./fetchTokenMetadata-BpgVS7uO.js";
import { totalSupply } from "./totalSupply-Bdy-5owg.js";
import { r as readContract } from "./bundler-Dmn5v2kr.js";
import "./vendor-3d-C6aqP7jv.js";
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
import "./detectExtension-Bd2ZKTZs.js";
const FN_SELECTOR = "0x0e89341c";
const FN_INPUTS = [
  {
    name: "tokenId",
    type: "uint256"
  }
];
const FN_OUTPUTS = [
  {
    type: "string"
  }
];
async function uri(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: [options.tokenId]
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
    tokenId: options.tokenId
  });
  if (!nft) {
    return getNFTFromRPC(options);
  }
  return nft;
}
async function getNFTFromRPC(options) {
  const [tokenUri, supply] = await Promise.all([
    uri({
      contract: options.contract,
      tokenId: options.tokenId
    }),
    totalSupply({
      contract: options.contract,
      id: options.tokenId
      // in cases where the supply is not available -> fall back to 0
    }).catch(() => 0n)
  ]);
  return parseNFT(await fetchTokenMetadata({
    client: options.contract.client,
    tokenId: options.tokenId,
    tokenUri
  }).then((metadata) => {
    if (!metadata) {
      return {
        id: options.tokenId,
        type: "ERC1155",
        uri: tokenUri
      };
    }
    return metadata;
  }).catch(() => ({
    id: options.tokenId,
    type: "ERC1155",
    uri: tokenUri
  })), {
    chainId: options.contract.chain.id,
    owner: null,
    supply,
    tokenAddress: options.contract.address,
    tokenId: options.tokenId,
    tokenUri,
    type: "ERC1155"
  });
}
export {
  getNFT
};
