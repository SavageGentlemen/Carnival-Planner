const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/bundler-Dmn5v2kr.js","assets/index-CXUot43X.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { x as base64ToString } from "./PassportHome-SJEwmPr3.js";
import { w as numberToHex } from "./index-CXUot43X.js";
const Base64Prefix = "data:application/json;base64";
function isBase64JSON(input) {
  if (input.toLowerCase().startsWith(Base64Prefix)) {
    return true;
  }
  return false;
}
function parseBase64String(input) {
  const commaIndex = input.indexOf(",");
  const base64 = input.slice(commaIndex + 1);
  return base64ToString(base64);
}
const UTF8Prefix = "data:application/json;utf-8";
function isUTF8JSONString(input) {
  if (input.toLowerCase().startsWith(UTF8Prefix)) {
    return true;
  }
  return false;
}
function parseUTF8String(input) {
  const commaIndex = input.indexOf(",");
  const utf8 = input.slice(commaIndex + 1);
  try {
    return decodeURIComponent(utf8);
  } catch {
    return utf8;
  }
}
async function fetchTokenMetadata(options) {
  const { client, tokenId, tokenUri } = options;
  if (isBase64JSON(tokenUri)) {
    try {
      return JSON.parse(parseBase64String(tokenUri));
    } catch (e) {
      console.error("Failed to fetch base64 encoded NFT", { tokenId, tokenUri }, e);
      throw e;
    }
  }
  if (isUTF8JSONString(tokenUri)) {
    try {
      return JSON.parse(parseUTF8String(tokenUri));
    } catch (e) {
      console.error("Failed to fetch utf8 encoded NFT", { tokenId, tokenUri }, e);
      throw e;
    }
  }
  const { download } = await __vitePreload(async () => {
    const { download: download2 } = await import("./bundler-Dmn5v2kr.js").then((n) => n.bf);
    return { download: download2 };
  }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0);
  try {
    if (!tokenUri.includes("{id}")) {
      return await (await download({ client, uri: tokenUri })).json();
    }
  } catch (e) {
    console.error("Failed to fetch non-dynamic NFT", { tokenId, tokenUri }, e);
    throw e;
  }
  try {
    try {
      return await (await download({
        client,
        uri: tokenUri.replace("{id}", numberToHex(tokenId, { size: 32 }).slice(2))
      })).json();
    } catch {
      return await (await download({
        client,
        uri: tokenUri.replace("{id}", tokenId.toString())
      })).json();
    }
  } catch (e) {
    console.error("Failed to fetch dynamic NFT", { tokenId, tokenUri }, e);
    throw e;
  }
}
export {
  fetchTokenMetadata as f
};
