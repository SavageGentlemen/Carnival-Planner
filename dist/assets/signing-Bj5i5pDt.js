import { r as readContract, e as encodeAbiParameters, b as encode } from "./bundler-Dmn5v2kr.js";
import { concatHex } from "./concat-hex-Dx-81yeB.js";
import { aC as stringToBytes, aD as toBytes, G as keccak256, aE as concat, aq as fromHex, aw as toHex, aF as isContractDeployed } from "./index-CXUot43X.js";
import { e as extractEip712DomainTypes, v as validate, h as hashDomain } from "./TypedData-B3RAtJ0b.js";
import { p as prepareCreateAccount } from "./index-DjEsEB5s.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
import "./Address-CuEhN18Y.js";
import "./send-eip712-transaction-C6N5tL5g.js";
import "./eth_sendRawTransaction-CgrUWHw8.js";
import "./sha256-C8LtJplw.js";
const FN_SELECTOR = "0x1626ba7e";
const FN_INPUTS = [
  {
    name: "hash",
    type: "bytes32"
  },
  {
    name: "signature",
    type: "bytes"
  }
];
const FN_OUTPUTS = [
  {
    type: "bytes4"
  }
];
async function isValidSignature(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: [options.hash, options.signature]
  });
}
const ERC_6492_MAGIC_VALUE = "0x6492649264926492649264926492649264926492649264926492649264926492";
function serializeErc6492Signature({ address, data, signature }) {
  return concatHex([
    encodeAbiParameters([{ type: "address" }, { type: "bytes" }, { type: "bytes" }], [address, data, signature]),
    ERC_6492_MAGIC_VALUE
  ]);
}
const EIP_1271_MAGIC_VALUE = "0x1626ba7e";
async function verifyEip1271Signature({ hash, signature, contract }) {
  try {
    const result = await isValidSignature({
      contract,
      hash,
      signature
    });
    return result === EIP_1271_MAGIC_VALUE;
  } catch (err) {
    console.error("Error verifying EIP-1271 signature", err);
    return false;
  }
}
const presignMessagePrefix = "Ethereum Signed Message:\n";
function hashMessage(message, to_) {
  const messageBytes = (() => {
    if (typeof message === "string") {
      return stringToBytes(message);
    }
    if (message.raw instanceof Uint8Array) {
      return message.raw;
    }
    return toBytes(message.raw);
  })();
  const prefixBytes = stringToBytes(`${presignMessagePrefix}${messageBytes.length}`);
  return keccak256(concat(prefixBytes, messageBytes), to_);
}
function hashTypedData(parameters) {
  const { domain = {}, message, primaryType } = parameters;
  const types = {
    EIP712Domain: extractEip712DomainTypes(domain),
    ...parameters.types
  };
  validate({
    domain,
    message,
    primaryType,
    types
  });
  const parts = ["0x1901"];
  if (domain)
    parts.push(hashDomain({
      domain,
      types
    }));
  if (primaryType !== "EIP712Domain") {
    const hashedStruct = (() => {
      const encoded = encodeData({
        data: message,
        primaryType,
        types
      });
      return keccak256(encoded);
    })();
    parts.push(hashedStruct);
  }
  return keccak256(concat(...parts.map((p) => fromHex(p))));
}
function encodeData({ data, primaryType, types }) {
  const encodedTypes = [{ type: "bytes32" }];
  const encodedValues = [hashType({ primaryType, types })];
  if (!types[primaryType])
    throw new Error("Invalid types");
  for (const field of types[primaryType]) {
    const [type, value] = encodeField({
      name: field.name,
      type: field.type,
      types,
      value: data[field.name]
    });
    encodedTypes.push(type);
    encodedValues.push(value);
  }
  return encodeAbiParameters(encodedTypes, encodedValues);
}
function hashType({ primaryType, types }) {
  const encodedHashType = toHex(encodeType({ primaryType, types }));
  return keccak256(encodedHashType);
}
function encodeType({ primaryType, types }) {
  let result = "";
  const unsortedDeps = findTypeDependencies({ primaryType, types });
  unsortedDeps.delete(primaryType);
  const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
  for (const type of deps) {
    if (!types[type])
      throw new Error("Invalid types");
    result += `${type}(${types[type].map(({ name, type: t }) => `${t} ${name}`).join(",")})`;
  }
  return result;
}
function findTypeDependencies({ primaryType: primaryType_, types }, results = /* @__PURE__ */ new Set()) {
  const match = primaryType_.match(/^\w*/u);
  const primaryType = match?.[0];
  if (results.has(primaryType) || types[primaryType] === void 0) {
    return results;
  }
  results.add(primaryType);
  for (const field of types[primaryType]) {
    findTypeDependencies({ primaryType: field.type, types }, results);
  }
  return results;
}
function encodeField({ types, name, type, value }) {
  if (types[type] !== void 0) {
    return [
      { type: "bytes32" },
      keccak256(encodeData({ data: value, primaryType: type, types }))
    ];
  }
  if (type === "bytes") {
    const prepend = value.length % 2 ? "0" : "";
    value = `0x${prepend + value.slice(2)}`;
    return [{ type: "bytes32" }, keccak256(value)];
  }
  if (type === "string")
    return [{ type: "bytes32" }, keccak256(toHex(value))];
  if (type.lastIndexOf("]") === type.length - 1) {
    const parsedType = type.slice(0, type.lastIndexOf("["));
    const typeValuePairs = (
      // biome-ignore lint/suspicious/noExplicitAny: Can't anticipate types of nested values
      value.map((item) => encodeField({
        name,
        type: parsedType,
        types,
        value: item
      }))
    );
    return [
      { type: "bytes32" },
      keccak256(encodeAbiParameters(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v)))
    ];
  }
  return [{ type }, value];
}
async function smartAccountSignMessage({ accountContract, factoryContract, options, message }) {
  const originalMsgHash = hashMessage(message);
  let sig;
  const wrappedMessageHash = encodeAbiParameters([{ type: "bytes32" }], [originalMsgHash]);
  sig = await options.personalAccount.signTypedData({
    domain: {
      chainId: options.chain.id,
      name: "Account",
      verifyingContract: accountContract.address,
      version: "1"
    },
    message: { message: wrappedMessageHash },
    primaryType: "AccountMessage",
    types: { AccountMessage: [{ name: "message", type: "bytes" }] }
  });
  const isDeployed = await isContractDeployed(accountContract);
  if (isDeployed) {
    const isValid = await verifyEip1271Signature({
      contract: accountContract,
      hash: originalMsgHash,
      signature: sig
    });
    if (isValid) {
      return sig;
    }
    throw new Error("Failed to verify signature");
  } else {
    const deployTx = prepareCreateAccount({
      accountSalt: options.overrides?.accountSalt,
      adminAddress: options.personalAccount.address,
      createAccountOverride: options.overrides?.createAccount,
      factoryContract
    });
    if (!deployTx) {
      throw new Error("Create account override not provided");
    }
    const initCode = await encode(deployTx);
    const erc6492Sig = serializeErc6492Signature({
      address: factoryContract.address,
      data: initCode,
      signature: sig
    });
    return erc6492Sig;
  }
}
async function smartAccountSignTypedData({ accountContract, factoryContract, options, typedData }) {
  const isSelfVerifyingContract = typedData.domain?.verifyingContract?.toLowerCase() === accountContract.address?.toLowerCase();
  if (isSelfVerifyingContract) {
    return options.personalAccount.signTypedData(typedData);
  }
  const originalMsgHash = hashTypedData(typedData);
  let sig;
  const wrappedMessageHash = encodeAbiParameters([{ type: "bytes32" }], [originalMsgHash]);
  sig = await options.personalAccount.signTypedData({
    domain: {
      chainId: options.chain.id,
      name: "Account",
      verifyingContract: accountContract.address,
      version: "1"
    },
    message: { message: wrappedMessageHash },
    primaryType: "AccountMessage",
    types: { AccountMessage: [{ name: "message", type: "bytes" }] }
  });
  const isDeployed = await isContractDeployed(accountContract);
  if (isDeployed) {
    const isValid = await verifyEip1271Signature({
      contract: accountContract,
      hash: originalMsgHash,
      signature: sig
    });
    if (isValid) {
      return sig;
    }
    throw new Error("Failed to verify signature");
  } else {
    const deployTx = prepareCreateAccount({
      accountSalt: options.overrides?.accountSalt,
      adminAddress: options.personalAccount.address,
      createAccountOverride: options.overrides?.createAccount,
      factoryContract
    });
    if (!deployTx) {
      throw new Error("Create account override not provided");
    }
    const initCode = await encode(deployTx);
    const erc6492Sig = serializeErc6492Signature({
      address: factoryContract.address,
      data: initCode,
      signature: sig
    });
    return erc6492Sig;
  }
}
export {
  smartAccountSignMessage,
  smartAccountSignTypedData
};
