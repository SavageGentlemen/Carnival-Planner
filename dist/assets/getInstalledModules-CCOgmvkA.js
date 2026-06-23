import { d as decodeAbiParameters, r as readContract } from "./bundler-Dmn5v2kr.js";
import { d as detectMethod } from "./detectExtension-Bd2ZKTZs.js";
import "./index-CXUot43X.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
const FN_SELECTOR = "0x3e429396";
const FN_INPUTS = [];
const FN_OUTPUTS = [
  {
    components: [
      {
        name: "implementation",
        type: "address"
      },
      {
        components: [
          {
            name: "registerInstallationCallback",
            type: "bool"
          },
          {
            name: "requiredInterfaces",
            type: "bytes4[]"
          },
          {
            name: "supportedInterfaces",
            type: "bytes4[]"
          },
          {
            components: [
              {
                name: "selector",
                type: "bytes4"
              }
            ],
            name: "callbackFunctions",
            type: "tuple[]"
          },
          {
            components: [
              {
                name: "selector",
                type: "bytes4"
              },
              {
                name: "permissionBits",
                type: "uint256"
              }
            ],
            name: "fallbackFunctions",
            type: "tuple[]"
          }
        ],
        name: "config",
        type: "tuple"
      }
    ],
    type: "tuple[]"
  }
];
function isGetInstalledModulesSupported(availableSelectors) {
  return detectMethod({
    availableSelectors,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS]
  });
}
function decodeGetInstalledModulesResult(result) {
  return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
async function getInstalledModules(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: []
  });
}
export {
  FN_SELECTOR,
  decodeGetInstalledModulesResult,
  getInstalledModules,
  isGetInstalledModulesSupported
};
