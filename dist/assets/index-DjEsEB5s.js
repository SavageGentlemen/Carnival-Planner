const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/decimals-RuAU2I0v.js","assets/index-CXUot43X.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css","assets/bundler-Dmn5v2kr.js","assets/signing-Bj5i5pDt.js","assets/concat-hex-Dx-81yeB.js","assets/TypedData-B3RAtJ0b.js","assets/Address-CuEhN18Y.js","assets/send-eip712-transaction-C6N5tL5g.js","assets/eth_sendRawTransaction-CgrUWHw8.js","assets/sha256-C8LtJplw.js","assets/in-app-wallet-calls-By_6HPT6.js","assets/send-batch-transaction-B5YWRBly.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { r as readContract, I as prepareContractCall, J as once, K as toUnits, Z as ZERO_ADDRESS, m as randomBytesHex, L as toWei, k as concat, M as hexlifyUserOp, b as encode, c as resolvePromisedValue, N as getUserOpReceipt, O as getUserOpGasFees, P as getDefaultGasOverrides, Q as generateRandomUint192, e as encodeAbiParameters, R as maxUint96$1, S as estimateUserOpGas, l as sendTransaction, p as parseTypedData, T as getZkPaymasterData, U as broadcastZkTransaction, t as trackTransaction, v as toSerializableTransaction, V as bundleUserOp, W as isInsufficientFundsError, X as trackInsufficientFundsError } from "./bundler-Dmn5v2kr.js";
import { aF as isContractDeployed, V as withCache, B as isHex, u as stringToHex, av as pad, az as toHex, aP as getDefaultBundlerUrl, aQ as ENTRYPOINT_ADDRESS_v0_6, r as stringify, y as hexToBigInt, aR as getClientFetch, aS as getEntryPointVersion, at as hexToBytes, aT as isThirdwebUrl, F as getContract, G as keccak256, aw as toHex$1, aU as DUMMY_SIGNATURE, aV as ENTRYPOINT_ADDRESS_v0_7, aW as isZkSyncChain, aX as getDefaultAccountFactory, t as getAddress, o as getCachedChain, aY as isSmartWallet } from "./index-CXUot43X.js";
import { t as toBigInt, p as populateEip712Transaction, s as signEip712Transaction } from "./send-eip712-transaction-C6N5tL5g.js";
const FN_SELECTOR$6 = "0xdd62ed3e";
const FN_INPUTS$6 = [
  {
    name: "owner",
    type: "address"
  },
  {
    name: "spender",
    type: "address"
  }
];
const FN_OUTPUTS$6 = [
  {
    type: "uint256"
  }
];
async function allowance(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR$6, FN_INPUTS$6, FN_OUTPUTS$6],
    params: [options.owner, options.spender]
  });
}
const FN_SELECTOR$5 = "0x095ea7b3";
const FN_INPUTS$5 = [
  {
    name: "spender",
    type: "address"
  },
  {
    name: "value",
    type: "uint256"
  }
];
const FN_OUTPUTS$5 = [
  {
    type: "bool"
  }
];
function approve$1(options) {
  const asyncOptions = once(async () => {
    return "asyncParams" in options ? await options.asyncParams() : options;
  });
  return prepareContractCall({
    accessList: async () => (await asyncOptions()).overrides?.accessList,
    authorizationList: async () => (await asyncOptions()).overrides?.authorizationList,
    contract: options.contract,
    erc20Value: async () => (await asyncOptions()).overrides?.erc20Value,
    extraGas: async () => (await asyncOptions()).overrides?.extraGas,
    gas: async () => (await asyncOptions()).overrides?.gas,
    gasPrice: async () => (await asyncOptions()).overrides?.gasPrice,
    maxFeePerGas: async () => (await asyncOptions()).overrides?.maxFeePerGas,
    maxPriorityFeePerGas: async () => (await asyncOptions()).overrides?.maxPriorityFeePerGas,
    method: [FN_SELECTOR$5, FN_INPUTS$5, FN_OUTPUTS$5],
    nonce: async () => (await asyncOptions()).overrides?.nonce,
    params: async () => {
      const resolvedOptions = await asyncOptions();
      return [resolvedOptions.spender, resolvedOptions.value];
    },
    value: async () => (await asyncOptions()).overrides?.value
  });
}
function approve(options) {
  return approve$1({
    asyncParams: async () => {
      let amount;
      if ("amount" in options) {
        const { decimals } = await __vitePreload(async () => {
          const { decimals: decimals2 } = await import("./decimals-RuAU2I0v.js").then((n) => n.b);
          return { decimals: decimals2 };
        }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8]) : void 0);
        const d = await decimals(options).catch(() => 18);
        amount = toUnits(options.amount.toString(), d);
      } else {
        amount = options.amountWei;
      }
      return {
        overrides: {
          erc20Value: {
            amountWei: amount,
            tokenAddress: options.contract.address
          },
          ...options.overrides
        },
        spender: options.spender,
        value: amount
      };
    },
    contract: options.contract
  });
}
const FN_SELECTOR$4 = "0xf15d424e";
const FN_INPUTS$4 = [
  {
    name: "signer",
    type: "address"
  }
];
const FN_OUTPUTS$4 = [
  {
    components: [
      {
        name: "signer",
        type: "address"
      },
      {
        name: "approvedTargets",
        type: "address[]"
      },
      {
        name: "nativeTokenLimitPerTransaction",
        type: "uint256"
      },
      {
        name: "startTimestamp",
        type: "uint128"
      },
      {
        name: "endTimestamp",
        type: "uint128"
      }
    ],
    name: "permissions",
    type: "tuple"
  }
];
async function getPermissionsForSigner(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR$4, FN_INPUTS$4, FN_OUTPUTS$4],
    params: [options.signer]
  });
}
const FN_SELECTOR$3 = "0x5892e236";
const FN_INPUTS$3 = [
  {
    components: [
      {
        name: "signer",
        type: "address"
      },
      {
        name: "isAdmin",
        type: "uint8"
      },
      {
        name: "approvedTargets",
        type: "address[]"
      },
      {
        name: "nativeTokenLimitPerTransaction",
        type: "uint256"
      },
      {
        name: "permissionStartTimestamp",
        type: "uint128"
      },
      {
        name: "permissionEndTimestamp",
        type: "uint128"
      },
      {
        name: "reqValidityStartTimestamp",
        type: "uint128"
      },
      {
        name: "reqValidityEndTimestamp",
        type: "uint128"
      },
      {
        name: "uid",
        type: "bytes32"
      }
    ],
    name: "req",
    type: "tuple"
  },
  {
    name: "signature",
    type: "bytes"
  }
];
const FN_OUTPUTS$3 = [];
function setPermissionsForSigner(options) {
  const asyncOptions = once(async () => {
    return "asyncParams" in options ? await options.asyncParams() : options;
  });
  return prepareContractCall({
    accessList: async () => (await asyncOptions()).overrides?.accessList,
    authorizationList: async () => (await asyncOptions()).overrides?.authorizationList,
    contract: options.contract,
    erc20Value: async () => (await asyncOptions()).overrides?.erc20Value,
    extraGas: async () => (await asyncOptions()).overrides?.extraGas,
    gas: async () => (await asyncOptions()).overrides?.gas,
    gasPrice: async () => (await asyncOptions()).overrides?.gasPrice,
    maxFeePerGas: async () => (await asyncOptions()).overrides?.maxFeePerGas,
    maxPriorityFeePerGas: async () => (await asyncOptions()).overrides?.maxPriorityFeePerGas,
    method: [FN_SELECTOR$3, FN_INPUTS$3, FN_OUTPUTS$3],
    nonce: async () => (await asyncOptions()).overrides?.nonce,
    params: async () => {
      const resolvedOptions = await asyncOptions();
      return [resolvedOptions.req, resolvedOptions.signature];
    },
    value: async () => (await asyncOptions()).overrides?.value
  });
}
function tenYearsFromNow() {
  return new Date(Date.now() + 1e3 * 60 * 60 * 24 * 365 * 10);
}
function dateToSeconds(date) {
  return toBigInt(Math.floor(date.getTime() / 1e3));
}
const SignerPermissionRequest = [
  { name: "signer", type: "address" },
  { name: "isAdmin", type: "uint8" },
  { name: "approvedTargets", type: "address[]" },
  { name: "nativeTokenLimitPerTransaction", type: "uint256" },
  { name: "permissionStartTimestamp", type: "uint128" },
  { name: "permissionEndTimestamp", type: "uint128" },
  { name: "reqValidityStartTimestamp", type: "uint128" },
  { name: "reqValidityEndTimestamp", type: "uint128" },
  { name: "uid", type: "bytes32" }
];
async function signPermissionRequest(options) {
  const { account, contract, req } = options;
  const signature = await account.signTypedData({
    domain: {
      chainId: contract.chain.id,
      name: "Account",
      verifyingContract: contract.address,
      version: "1"
    },
    message: req,
    primaryType: "SignerPermissionRequest",
    types: { SignerPermissionRequest }
  });
  return { req, signature };
}
async function toContractPermissions(options) {
  const { target, permissions } = options;
  return {
    approvedTargets: permissions.approvedTargets === "*" ? [ZERO_ADDRESS] : permissions.approvedTargets,
    isAdmin: 0,
    nativeTokenLimitPerTransaction: toWei(permissions.nativeTokenLimitPerTransaction?.toString() || "0"),
    permissionEndTimestamp: dateToSeconds(permissions.permissionEndTimestamp || tenYearsFromNow()),
    permissionStartTimestamp: dateToSeconds(permissions.permissionStartTimestamp || /* @__PURE__ */ new Date(0)),
    reqValidityEndTimestamp: dateToSeconds(tenYearsFromNow()),
    reqValidityStartTimestamp: 0n,
    signer: target,
    // session key flag
    uid: await randomBytesHex()
  };
}
function addSessionKey(options) {
  const { contract, sessionKeyAddress, account, permissions } = options;
  return setPermissionsForSigner({
    async asyncParams() {
      const { req, signature } = await signPermissionRequest({
        account,
        contract,
        req: await toContractPermissions({
          permissions,
          target: sessionKeyAddress
        })
      });
      return { req, signature };
    },
    contract
  });
}
async function shouldUpdateSessionKey(args) {
  const { accountContract, sessionKeyAddress, newPermissions } = args;
  const accountDeployed = await isContractDeployed(accountContract);
  if (!accountDeployed) {
    return true;
  }
  const currentPermissions = await getPermissionsForSigner({
    contract: accountContract,
    signer: sessionKeyAddress
  });
  if (currentPermissions.endTimestamp && currentPermissions.endTimestamp < Math.floor(Date.now() / 1e3)) {
    return true;
  }
  if (!areSessionKeyContractTargetsEqual(currentPermissions.approvedTargets, newPermissions.approvedTargets)) {
    return true;
  }
  if (toWei(newPermissions.nativeTokenLimitPerTransaction?.toString() ?? "0") > currentPermissions.nativeTokenLimitPerTransaction) {
    return true;
  }
  return false;
}
function areSessionKeyContractTargetsEqual(currentTargets, newTargets) {
  if (newTargets === "*" && currentTargets.length === 1 && currentTargets[0] === ZERO_ADDRESS) {
    return true;
  }
  if (newTargets !== "*") {
    return newTargets.map((target) => target.toLowerCase()).every((target) => currentTargets.map((t) => t.toLowerCase()).includes(target));
  }
  return false;
}
const maxUint96 = 2n ** 96n - 1n;
async function predictAddress(args) {
  const { factoryContract, predictAddressOverride: predictAddress2, adminAddress, accountSalt, accountAddress } = args;
  if (predictAddress2) {
    return predictAddress2(factoryContract, adminAddress);
  }
  if (accountAddress) {
    return accountAddress;
  }
  if (!adminAddress) {
    throw new Error("Account address is required to predict the smart wallet address.");
  }
  return withCache(async () => {
    const saltHex = accountSalt && isHex(accountSalt) ? accountSalt : stringToHex(accountSalt ?? "");
    let result;
    let retries = 0;
    const maxRetries = 3;
    while (retries <= maxRetries) {
      try {
        result = await readContract({
          contract: factoryContract,
          method: "function getAddress(address, bytes) returns (address)",
          params: [adminAddress, saltHex]
        });
        break;
      } catch (error) {
        if (retries === maxRetries) {
          throw error;
        }
        const delay = 2 ** (retries + 1) * 200;
        await new Promise((resolve) => setTimeout(resolve, delay));
        retries++;
      }
    }
    if (!result) {
      throw new Error(`No smart account address found for admin address ${adminAddress} and salt ${accountSalt}`);
    }
    return result;
  }, {
    cacheKey: `${args.factoryContract.chain.id}-${args.factoryContract.address}-${args.adminAddress}-${args.accountSalt}`,
    cacheTime: 1e3 * 60 * 60 * 24
    // 1 day
  });
}
function prepareCreateAccount(args) {
  const { adminAddress, factoryContract, createAccountOverride: createAccount, accountSalt } = args;
  if (createAccount) {
    return createAccount(factoryContract, adminAddress);
  }
  const saltHex = accountSalt && isHex(accountSalt) ? accountSalt : stringToHex(accountSalt ?? "");
  return prepareContractCall({
    contract: factoryContract,
    method: "function createAccount(address, bytes) returns (address)",
    params: [adminAddress, saltHex]
  });
}
function prepareExecute(args) {
  const { accountContract, transaction, executeOverride: execute } = args;
  if (execute) {
    return execute(accountContract, transaction);
  }
  let value = transaction.value || 0n;
  if (transaction.chainId === 295 || transaction.chainId === 296) {
    value = BigInt(value) / BigInt(10 ** 10);
  }
  return prepareContractCall({
    contract: accountContract,
    // if gas is specified for the inner tx, use that and add 21k for the execute call on the account contract
    // this avoids another estimateGas call when bundling the userOp
    // and also allows for passing custom gas limits for the inner tx
    gas: transaction.gas ? transaction.gas + 21000n : void 0,
    method: "function execute(address, uint256, bytes)",
    params: [transaction.to || "", value, transaction.data || "0x"]
  });
}
function prepareBatchExecute(args) {
  const { accountContract, transactions, executeBatchOverride: executeBatch } = args;
  if (executeBatch) {
    return executeBatch(accountContract, transactions);
  }
  let values = transactions.map((tx) => tx.value || 0n);
  const chainId = transactions[0]?.chainId;
  if (chainId === 295 || chainId === 296) {
    values = values.map((value) => BigInt(value) / BigInt(10 ** 10));
  }
  return prepareContractCall({
    contract: accountContract,
    method: "function executeBatch(address[], uint256[], bytes[])",
    params: [
      transactions.map((tx) => tx.to || ""),
      values,
      transactions.map((tx) => tx.data || "0x")
    ]
  });
}
const FN_SELECTOR$2 = "0x35567e1a";
const FN_INPUTS$2 = [
  {
    name: "sender",
    type: "address"
  },
  {
    name: "key",
    type: "uint192"
  }
];
const FN_OUTPUTS$2 = [
  {
    name: "nonce",
    type: "uint256"
  }
];
async function getNonce(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR$2, FN_INPUTS$2, FN_OUTPUTS$2],
    params: [options.sender, options.key]
  });
}
const FN_SELECTOR$1 = "0xa6193531";
const FN_INPUTS$1 = [
  {
    components: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "nonce",
        type: "uint256"
      },
      {
        name: "initCode",
        type: "bytes"
      },
      {
        name: "callData",
        type: "bytes"
      },
      {
        name: "callGasLimit",
        type: "uint256"
      },
      {
        name: "verificationGasLimit",
        type: "uint256"
      },
      {
        name: "preVerificationGas",
        type: "uint256"
      },
      {
        name: "maxFeePerGas",
        type: "uint256"
      },
      {
        name: "maxPriorityFeePerGas",
        type: "uint256"
      },
      {
        name: "paymasterAndData",
        type: "bytes"
      },
      {
        name: "signature",
        type: "bytes"
      }
    ],
    name: "userOp",
    type: "tuple"
  }
];
const FN_OUTPUTS$1 = [
  {
    type: "bytes32"
  }
];
async function getUserOpHash$2(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR$1, FN_INPUTS$1, FN_OUTPUTS$1],
    params: [options.userOp]
  });
}
const FN_SELECTOR = "0x22cdde4c";
const FN_INPUTS = [
  {
    components: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "nonce",
        type: "uint256"
      },
      {
        name: "initCode",
        type: "bytes"
      },
      {
        name: "callData",
        type: "bytes"
      },
      {
        name: "accountGasLimits",
        type: "bytes32"
      },
      {
        name: "preVerificationGas",
        type: "uint256"
      },
      {
        name: "gasFees",
        type: "bytes32"
      },
      {
        name: "paymasterAndData",
        type: "bytes"
      },
      {
        name: "signature",
        type: "bytes"
      }
    ],
    name: "userOp",
    type: "tuple"
  }
];
const FN_OUTPUTS = [
  {
    type: "bytes32"
  }
];
async function getUserOpHash$1(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: [options.userOp]
  });
}
function getInitCode(unpackedUserOperation) {
  return unpackedUserOperation.factory ? concat([
    unpackedUserOperation.factory,
    unpackedUserOperation.factoryData || "0x"
  ]) : "0x";
}
function getAccountGasLimits(unpackedUserOperation) {
  return concat([
    pad(toHex(BigInt(unpackedUserOperation.verificationGasLimit)), {
      size: 16
    }),
    pad(toHex(BigInt(unpackedUserOperation.callGasLimit)), { size: 16 })
  ]);
}
function getGasLimits(unpackedUserOperation) {
  return concat([
    pad(toHex(BigInt(unpackedUserOperation.maxPriorityFeePerGas)), {
      size: 16
    }),
    pad(toHex(BigInt(unpackedUserOperation.maxFeePerGas)), { size: 16 })
  ]);
}
function getPaymasterAndData$1(unpackedUserOperation) {
  return unpackedUserOperation.paymaster ? concat([
    unpackedUserOperation.paymaster,
    pad(toHex(BigInt(unpackedUserOperation.paymasterVerificationGasLimit || 0)), {
      size: 16
    }),
    pad(toHex(BigInt(unpackedUserOperation.paymasterPostOpGasLimit || 0)), {
      size: 16
    }),
    unpackedUserOperation.paymasterData || "0x"
  ]) : "0x";
}
const getPackedUserOperation = (userOperation) => {
  return {
    accountGasLimits: getAccountGasLimits(userOperation),
    callData: userOperation.callData,
    gasFees: getGasLimits(userOperation),
    initCode: getInitCode(userOperation),
    nonce: BigInt(userOperation.nonce),
    paymasterAndData: getPaymasterAndData$1(userOperation),
    preVerificationGas: BigInt(userOperation.preVerificationGas),
    sender: userOperation.sender,
    signature: userOperation.signature
  };
};
async function getPaymasterAndData(args) {
  const { userOp, paymasterOverride, client, chain, entrypointAddress } = args;
  if (paymasterOverride) {
    return paymasterOverride(userOp);
  }
  const headers = {
    "Content-Type": "application/json"
  };
  const entrypoint = entrypointAddress ?? ENTRYPOINT_ADDRESS_v0_6;
  const paymasterUrl = getDefaultBundlerUrl(chain);
  const body = {
    id: 1,
    jsonrpc: "2.0",
    method: "pm_sponsorUserOperation",
    params: [hexlifyUserOp(userOp), entrypoint]
  };
  const fetchWithHeaders = getClientFetch(client);
  const response = await fetchWithHeaders(paymasterUrl, {
    body: stringify(body),
    headers,
    method: "POST"
  });
  if (!response.ok) {
    const error2 = await response.text() || response.statusText;
    throw new Error(`Paymaster error: ${response.status} - ${error2}`);
  }
  const res = await response.json();
  if (res.result) {
    if (typeof res.result === "string") {
      return {
        paymasterAndData: res.result
      };
    }
    if (res.result.reason) {
      console.warn(`Paymaster policy rejected this transaction with reason: ${res.result.reason} ${res.result.policyId ? `(policyId: ${res.result.policyId})` : ""}`);
    }
    return {
      callGasLimit: res.result.callGasLimit ? hexToBigInt(res.result.callGasLimit) : void 0,
      paymaster: res.result.paymaster,
      paymasterAndData: res.result.paymasterAndData,
      paymasterData: res.result.paymasterData,
      paymasterPostOpGasLimit: res.result.paymasterPostOpGasLimit ? hexToBigInt(res.result.paymasterPostOpGasLimit) : void 0,
      paymasterVerificationGasLimit: res.result.paymasterVerificationGasLimit ? hexToBigInt(res.result.paymasterVerificationGasLimit) : void 0,
      preVerificationGas: res.result.preVerificationGas ? hexToBigInt(res.result.preVerificationGas) : void 0,
      verificationGasLimit: res.result.verificationGasLimit ? hexToBigInt(res.result.verificationGasLimit) : void 0
    };
  }
  const error = res.error?.message || res.error || response.statusText || "unknown error";
  throw new Error(`Paymaster error from ${paymasterUrl}: ${error}`);
}
const isDeployingSet = /* @__PURE__ */ new Set();
const getKey = (accountContract) => {
  return `${accountContract.chain.id}:${accountContract.address}`;
};
const markAccountDeploying = (accountContract) => {
  isDeployingSet.add(getKey(accountContract));
};
const clearAccountDeploying = (accountContract) => {
  isDeployingSet.delete(getKey(accountContract));
};
const isAccountDeploying = (accountContract) => {
  return isDeployingSet.has(getKey(accountContract));
};
async function waitForUserOpReceipt(args) {
  const timeout = args.timeoutMs || 12e4;
  const interval = args.intervalMs || 1e3;
  const endtime = Date.now() + timeout;
  while (Date.now() < endtime) {
    const userOpReceipt = await getUserOpReceipt(args);
    if (userOpReceipt) {
      return userOpReceipt;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error(`Timeout waiting for userOp to be mined on chain ${args.chain.id} with UserOp hash: ${args.userOpHash}`);
}
async function createUnsignedUserOp(args) {
  const { transaction: executeTx, accountContract, factoryContract, adminAddress, overrides, sponsorGas, waitForDeployment = true, isDeployedOverride } = args;
  const chain = executeTx.chain;
  const client = executeTx.client;
  const bundlerOptions = {
    bundlerUrl: overrides?.bundlerUrl,
    chain,
    client,
    entrypointAddress: overrides?.entrypointAddress
  };
  const entrypointVersion = getEntryPointVersion(args.overrides?.entrypointAddress || ENTRYPOINT_ADDRESS_v0_6);
  const [isDeployed, callData, callGasLimit, gasFees, nonce] = await Promise.all([
    typeof isDeployedOverride === "boolean" ? isDeployedOverride : isContractDeployed(accountContract).then((isDeployed2) => isDeployed2 || isAccountDeploying(accountContract)),
    encode(executeTx),
    resolvePromisedValue(executeTx.gas),
    getGasFees({
      bundlerOptions,
      chain,
      client,
      executeTx
    }),
    getAccountNonce({
      accountContract,
      chain,
      client,
      entrypointAddress: overrides?.entrypointAddress,
      getNonceOverride: overrides?.getAccountNonce
    })
  ]);
  const { maxFeePerGas, maxPriorityFeePerGas } = gasFees;
  if (entrypointVersion === "v0.7") {
    return populateUserOp_v0_7({
      accountContract,
      adminAddress,
      bundlerOptions,
      callData,
      callGasLimit,
      factoryContract,
      isDeployed,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      overrides,
      sponsorGas,
      waitForDeployment
    });
  }
  return populateUserOp_v0_6({
    accountContract,
    adminAddress,
    bundlerOptions,
    callData,
    callGasLimit,
    factoryContract,
    isDeployed,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    overrides,
    sponsorGas,
    waitForDeployment
  });
}
async function getGasFees(args) {
  const { executeTx, bundlerOptions, chain, client } = args;
  let { maxFeePerGas, maxPriorityFeePerGas } = executeTx;
  const bundlerUrl = bundlerOptions?.bundlerUrl ?? getDefaultBundlerUrl(chain);
  if (isThirdwebUrl(bundlerUrl)) {
    const bundlerGasPrice = await getUserOpGasFees({
      options: bundlerOptions
    });
    maxFeePerGas = bundlerGasPrice.maxFeePerGas;
    maxPriorityFeePerGas = bundlerGasPrice.maxPriorityFeePerGas;
  } else {
    const [resolvedMaxFeePerGas, resolvedMaxPriorityFeePerGas] = await Promise.all([
      resolvePromisedValue(maxFeePerGas),
      resolvePromisedValue(maxPriorityFeePerGas)
    ]);
    if (resolvedMaxFeePerGas && resolvedMaxPriorityFeePerGas) {
      maxFeePerGas = resolvedMaxFeePerGas;
      maxPriorityFeePerGas = resolvedMaxPriorityFeePerGas;
    } else {
      const feeData = await getDefaultGasOverrides(client, chain);
      maxPriorityFeePerGas = resolvedMaxPriorityFeePerGas ?? feeData.maxPriorityFeePerGas ?? 0n;
      maxFeePerGas = resolvedMaxFeePerGas ?? feeData.maxFeePerGas ?? 0n;
    }
  }
  return { maxFeePerGas, maxPriorityFeePerGas };
}
async function populateUserOp_v0_7(args) {
  const { bundlerOptions, isDeployed, factoryContract, accountContract, adminAddress, sponsorGas, overrides, nonce, callData, callGasLimit, maxFeePerGas, maxPriorityFeePerGas, waitForDeployment } = args;
  const { chain, client } = bundlerOptions;
  let factory;
  let factoryData;
  if (isDeployed) {
    factoryData = "0x";
    if (waitForDeployment) {
      await waitForAccountDeployed(accountContract);
    }
  } else {
    factory = factoryContract.address;
    factoryData = await encode(prepareCreateAccount({
      accountSalt: overrides?.accountSalt,
      adminAddress,
      createAccountOverride: overrides?.createAccount,
      factoryContract
    }));
    if (waitForDeployment) {
      markAccountDeploying(accountContract);
    }
  }
  const partialOp = {
    callData,
    callGasLimit: callGasLimit ?? 0n,
    factory,
    factoryData,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    paymaster: void 0,
    paymasterData: "0x",
    paymasterPostOpGasLimit: 0n,
    paymasterVerificationGasLimit: 0n,
    preVerificationGas: 0n,
    sender: accountContract.address,
    signature: DUMMY_SIGNATURE,
    verificationGasLimit: 0n
  };
  if (sponsorGas) {
    const paymasterResult = await getPaymasterAndData({
      chain,
      client,
      entrypointAddress: overrides?.entrypointAddress,
      paymasterOverride: overrides?.paymaster,
      userOp: partialOp
    });
    if (paymasterResult.paymaster && paymasterResult.paymasterData) {
      partialOp.paymaster = paymasterResult.paymaster;
      partialOp.paymasterData = paymasterResult.paymasterData;
    }
    if (paymasterResult.callGasLimit && paymasterResult.verificationGasLimit && paymasterResult.preVerificationGas && paymasterResult.paymasterPostOpGasLimit && paymasterResult.paymasterVerificationGasLimit) {
      partialOp.callGasLimit = paymasterResult.callGasLimit;
      partialOp.verificationGasLimit = paymasterResult.verificationGasLimit;
      partialOp.preVerificationGas = paymasterResult.preVerificationGas;
      partialOp.paymasterPostOpGasLimit = paymasterResult.paymasterPostOpGasLimit;
      partialOp.paymasterVerificationGasLimit = paymasterResult.paymasterVerificationGasLimit;
    } else {
      const stateOverrides = overrides?.tokenPaymaster ? {
        [overrides.tokenPaymaster.tokenAddress]: {
          stateDiff: {
            [keccak256(encodeAbiParameters([{ type: "address" }, { type: "uint256" }], [
              accountContract.address,
              overrides.tokenPaymaster.balanceStorageSlot
            ]))]: toHex$1(maxUint96$1, { size: 32 })
          }
        }
      } : void 0;
      const estimates = await estimateUserOpGas({
        options: bundlerOptions,
        userOp: partialOp
      }, stateOverrides);
      partialOp.callGasLimit = estimates.callGasLimit;
      partialOp.verificationGasLimit = estimates.verificationGasLimit;
      partialOp.preVerificationGas = estimates.preVerificationGas;
      partialOp.paymasterPostOpGasLimit = overrides?.tokenPaymaster ? 500000n : estimates.paymasterPostOpGasLimit || 0n;
      partialOp.paymasterVerificationGasLimit = estimates.paymasterVerificationGasLimit || 0n;
      const paymasterResult2 = await getPaymasterAndData({
        chain,
        client,
        entrypointAddress: overrides?.entrypointAddress,
        paymasterOverride: overrides?.paymaster,
        userOp: partialOp
      });
      if (paymasterResult2.paymaster && paymasterResult2.paymasterData) {
        partialOp.paymaster = paymasterResult2.paymaster;
        partialOp.paymasterData = paymasterResult2.paymasterData;
      }
    }
  } else {
    const estimates = await estimateUserOpGas({
      options: bundlerOptions,
      userOp: partialOp
    });
    partialOp.callGasLimit = estimates.callGasLimit;
    partialOp.verificationGasLimit = estimates.verificationGasLimit;
    partialOp.preVerificationGas = estimates.preVerificationGas;
    partialOp.paymasterPostOpGasLimit = estimates.paymasterPostOpGasLimit || 0n;
    partialOp.paymasterVerificationGasLimit = estimates.paymasterVerificationGasLimit || 0n;
  }
  return {
    ...partialOp,
    signature: "0x"
  };
}
async function populateUserOp_v0_6(args) {
  const { bundlerOptions, isDeployed, factoryContract, accountContract, adminAddress, sponsorGas, overrides, nonce, callData, callGasLimit, maxFeePerGas, maxPriorityFeePerGas, waitForDeployment } = args;
  const { chain, client } = bundlerOptions;
  let initCode;
  if (isDeployed) {
    initCode = "0x";
    if (waitForDeployment) {
      await waitForAccountDeployed(accountContract);
    }
  } else {
    initCode = await getAccountInitCode({
      accountSalt: overrides?.accountSalt,
      adminAddress,
      createAccountOverride: overrides?.createAccount,
      factoryContract
    });
    if (waitForDeployment) {
      markAccountDeploying(accountContract);
    }
  }
  const partialOp = {
    callData,
    callGasLimit: callGasLimit ?? 0n,
    initCode,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    paymasterAndData: "0x",
    preVerificationGas: 0n,
    sender: accountContract.address,
    signature: DUMMY_SIGNATURE,
    verificationGasLimit: 0n
  };
  if (sponsorGas) {
    const paymasterResult = await getPaymasterAndData({
      chain,
      client,
      entrypointAddress: overrides?.entrypointAddress,
      paymasterOverride: overrides?.paymaster,
      userOp: partialOp
    });
    const paymasterAndData = "paymasterAndData" in paymasterResult ? paymasterResult.paymasterAndData : "0x";
    if (paymasterAndData && paymasterAndData !== "0x") {
      partialOp.paymasterAndData = paymasterAndData;
    }
    if (paymasterResult.callGasLimit && paymasterResult.verificationGasLimit && paymasterResult.preVerificationGas) {
      partialOp.callGasLimit = paymasterResult.callGasLimit;
      partialOp.verificationGasLimit = paymasterResult.verificationGasLimit;
      partialOp.preVerificationGas = paymasterResult.preVerificationGas;
    } else {
      const estimates = await estimateUserOpGas({
        options: bundlerOptions,
        userOp: partialOp
      });
      partialOp.callGasLimit = estimates.callGasLimit;
      partialOp.verificationGasLimit = estimates.verificationGasLimit;
      partialOp.preVerificationGas = estimates.preVerificationGas;
      if (paymasterAndData && paymasterAndData !== "0x") {
        const paymasterResult2 = await getPaymasterAndData({
          chain,
          client,
          entrypointAddress: overrides?.entrypointAddress,
          paymasterOverride: overrides?.paymaster,
          userOp: partialOp
        });
        const paymasterAndData2 = "paymasterAndData" in paymasterResult2 ? paymasterResult2.paymasterAndData : "0x";
        if (paymasterAndData2 && paymasterAndData2 !== "0x") {
          partialOp.paymasterAndData = paymasterAndData2;
        }
      }
    }
  } else {
    const estimates = await estimateUserOpGas({
      options: bundlerOptions,
      userOp: partialOp
    });
    partialOp.callGasLimit = estimates.callGasLimit;
    partialOp.verificationGasLimit = estimates.verificationGasLimit;
    partialOp.preVerificationGas = estimates.preVerificationGas;
  }
  return {
    ...partialOp,
    signature: "0x"
  };
}
async function signUserOp(args) {
  const { userOp, chain, entrypointAddress, adminAccount } = args;
  const userOpHash = await getUserOpHash({
    chain,
    client: args.client,
    entrypointAddress,
    userOp
  });
  if (adminAccount.signMessage) {
    const signature = await adminAccount.signMessage({
      chainId: chain.id,
      message: {
        raw: hexToBytes(userOpHash)
      },
      originalMessage: stringify(userOp)
    });
    return {
      ...userOp,
      signature
    };
  }
  throw new Error("signMessage not implemented in signingAccount");
}
async function getUserOpHash(args) {
  const { userOp, chain, entrypointAddress } = args;
  const entrypointVersion = getEntryPointVersion(entrypointAddress || ENTRYPOINT_ADDRESS_v0_6);
  let userOpHash;
  if (entrypointVersion === "v0.7") {
    const packedUserOp = getPackedUserOperation(userOp);
    userOpHash = await getUserOpHash$1({
      contract: getContract({
        address: entrypointAddress || ENTRYPOINT_ADDRESS_v0_7,
        chain,
        client: args.client
      }),
      userOp: packedUserOp
    });
  } else {
    userOpHash = await getUserOpHash$2({
      contract: getContract({
        address: entrypointAddress || ENTRYPOINT_ADDRESS_v0_6,
        chain,
        client: args.client
      }),
      userOp
    });
  }
  return userOpHash;
}
async function getAccountInitCode(options) {
  const { factoryContract, adminAddress, accountSalt, createAccountOverride } = options;
  const deployTx = prepareCreateAccount({
    accountSalt,
    adminAddress,
    createAccountOverride,
    factoryContract
  });
  return concat([factoryContract.address, await encode(deployTx)]);
}
async function getAccountNonce(options) {
  const { accountContract, chain, client, entrypointAddress, getNonceOverride } = options;
  if (getNonceOverride) {
    return getNonceOverride(accountContract);
  }
  return await getNonce({
    contract: getContract({
      address: entrypointAddress || ENTRYPOINT_ADDRESS_v0_6,
      chain,
      client
    }),
    key: generateRandomUint192(),
    sender: accountContract.address
  });
}
async function waitForAccountDeployed(accountContract) {
  const startTime = Date.now();
  while (isAccountDeploying(accountContract)) {
    if (Date.now() - startTime > 6e4) {
      clearAccountDeploying(accountContract);
      throw new Error("Account deployment is taking too long (over 1 minute). Please try again.");
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
const adminAccountToSmartAccountMap = /* @__PURE__ */ new WeakMap();
const smartAccountToAdminAccountMap = /* @__PURE__ */ new WeakMap();
async function connectSmartAccount(connectionOptions, creationOptions) {
  const { personalAccount, client } = connectionOptions;
  if (!personalAccount) {
    throw new Error("No personal account provided for smart account connection");
  }
  const options = creationOptions;
  const chain = creationOptions.chain;
  const sponsorGas = "gasless" in options ? options.gasless : options.sponsorGas;
  if (await isZkSyncChain(chain)) {
    return [
      createZkSyncAccount({
        chain,
        connectionOptions,
        creationOptions,
        sponsorGas
      }),
      chain
    ];
  }
  if (options.factoryAddress && !options.overrides?.entrypointAddress) {
    const entrypointAddress = await getEntrypointFromFactory(options.factoryAddress, client, chain);
    if (entrypointAddress) {
      options.overrides = {
        ...options.overrides,
        entrypointAddress
      };
    }
  }
  if (options.overrides?.tokenPaymaster && !options.overrides?.entrypointAddress) {
    options.overrides = {
      ...options.overrides,
      entrypointAddress: ENTRYPOINT_ADDRESS_v0_7
    };
  }
  const factoryAddress = options.factoryAddress ?? getDefaultAccountFactory(options.overrides?.entrypointAddress);
  const factoryContract = getContract({
    address: factoryAddress,
    chain,
    client
  });
  const accountAddress = await predictAddress({
    accountAddress: options.overrides?.accountAddress,
    accountSalt: options.overrides?.accountSalt,
    adminAddress: personalAccount.address,
    factoryContract,
    predictAddressOverride: options.overrides?.predictAddress
  }).then((address) => address).catch((err) => {
    throw new Error(`Failed to get account address with factory contract ${factoryContract.address} on chain ID ${chain.id}: ${err?.message || "unknown error"}`, { cause: err });
  });
  const accountContract = getContract({
    address: accountAddress,
    chain,
    client
  });
  const account = await createSmartAccount({
    ...options,
    accountContract,
    chain,
    client,
    factoryContract,
    personalAccount,
    sponsorGas
  });
  adminAccountToSmartAccountMap.set(personalAccount, account);
  smartAccountToAdminAccountMap.set(account, personalAccount);
  if (options.sessionKey) {
    if (await shouldUpdateSessionKey({
      accountContract,
      newPermissions: options.sessionKey.permissions,
      sessionKeyAddress: options.sessionKey.address
    })) {
      const transaction = addSessionKey({
        account: personalAccount,
        contract: accountContract,
        permissions: options.sessionKey.permissions,
        sessionKeyAddress: options.sessionKey.address
      });
      await sendTransaction({
        account,
        transaction
      });
    }
  }
  return [account, chain];
}
async function disconnectSmartAccount(account) {
  const personalAccount = smartAccountToAdminAccountMap.get(account);
  if (personalAccount) {
    adminAccountToSmartAccountMap.delete(personalAccount);
    smartAccountToAdminAccountMap.delete(account);
  }
}
async function createSmartAccount(options) {
  const erc20Paymaster = options.overrides?.tokenPaymaster;
  if (erc20Paymaster) {
    if (getEntryPointVersion(options.overrides?.entrypointAddress || ENTRYPOINT_ADDRESS_v0_6) !== "v0.7") {
      throw new Error("Token paymaster is only supported for entrypoint version v0.7");
    }
  }
  const sponsorGas = options.sponsorGas;
  let accountContract = options.accountContract;
  const account = {
    address: getAddress(accountContract.address),
    async onTransactionRequested(transaction) {
      return options.personalAccount.onTransactionRequested?.(transaction);
    },
    async sendBatchTransaction(transactions) {
      const executeTx = prepareBatchExecute({
        accountContract,
        executeBatchOverride: options.overrides?.executeBatch,
        transactions
      });
      if (transactions.length === 0) {
        throw new Error("No transactions to send");
      }
      const firstTx = transactions[0];
      if (!firstTx) {
        throw new Error("No transactions to send");
      }
      const chain = getCachedChain(firstTx.chainId);
      const result = await _sendUserOp({
        executeTx,
        options: {
          ...options,
          accountContract,
          chain
        }
      });
      trackTransaction({
        chainId: chain.id,
        client: options.client,
        contractAddress: transactions[0]?.to ?? void 0,
        transactionHash: result.transactionHash,
        walletAddress: options.accountContract.address,
        walletType: "smart"
      });
      return result;
    },
    async sendTransaction(transaction) {
      let paymasterOverride;
      if (erc20Paymaster) {
        await approveERC20({
          accountContract,
          erc20Paymaster,
          options
        });
        const paymasterCallback = async () => {
          return {
            paymaster: erc20Paymaster.paymasterAddress,
            paymasterData: "0x"
          };
        };
        paymasterOverride = options.overrides?.paymaster || paymasterCallback;
      } else {
        paymasterOverride = options.overrides?.paymaster;
      }
      if (transaction.chainId !== accountContract.chain.id) {
        accountContract = getContract({
          address: account.address,
          chain: getCachedChain(transaction.chainId),
          client: options.client
        });
      }
      const executeTx = prepareExecute({
        accountContract,
        executeOverride: options.overrides?.execute,
        transaction
      });
      const chain = getCachedChain(transaction.chainId);
      const result = await _sendUserOp({
        executeTx,
        options: {
          ...options,
          accountContract,
          chain,
          overrides: {
            ...options.overrides,
            paymaster: paymasterOverride
          }
        }
      });
      trackTransaction({
        chainId: chain.id,
        client: options.client,
        contractAddress: transaction.to ?? void 0,
        transactionHash: result.transactionHash,
        walletAddress: options.accountContract.address,
        walletType: "smart"
      });
      return result;
    },
    async signMessage({ message }) {
      if (options.overrides?.signMessage) {
        return options.overrides.signMessage({
          accountContract,
          adminAccount: options.personalAccount,
          factoryContract: options.factoryContract,
          message
        });
      }
      const { smartAccountSignMessage } = await __vitePreload(async () => {
        const { smartAccountSignMessage: smartAccountSignMessage2 } = await import("./signing-Bj5i5pDt.js");
        return { smartAccountSignMessage: smartAccountSignMessage2 };
      }, true ? __vite__mapDeps([9,8,1,2,3,4,5,6,7,10,11,12,13,14,15]) : void 0);
      return smartAccountSignMessage({
        accountContract,
        factoryContract: options.factoryContract,
        message,
        options
      });
    },
    async signTypedData(typedData) {
      if (options.overrides?.signTypedData) {
        return options.overrides.signTypedData({
          accountContract,
          adminAccount: options.personalAccount,
          factoryContract: options.factoryContract,
          typedData
        });
      }
      const { smartAccountSignTypedData } = await __vitePreload(async () => {
        const { smartAccountSignTypedData: smartAccountSignTypedData2 } = await import("./signing-Bj5i5pDt.js");
        return { smartAccountSignTypedData: smartAccountSignTypedData2 };
      }, true ? __vite__mapDeps([9,8,1,2,3,4,5,6,7,10,11,12,13,14,15]) : void 0);
      return smartAccountSignTypedData({
        accountContract,
        factoryContract: options.factoryContract,
        options,
        typedData
      });
    },
    sendCalls: async (options2) => {
      const { inAppWalletSendCalls } = await __vitePreload(async () => {
        const { inAppWalletSendCalls: inAppWalletSendCalls2 } = await import("./in-app-wallet-calls-By_6HPT6.js");
        return { inAppWalletSendCalls: inAppWalletSendCalls2 };
      }, true ? __vite__mapDeps([16,1,2,3,4,5,6,7,8,17]) : void 0);
      const firstCall = options2.calls[0];
      if (!firstCall) {
        throw new Error("No calls to send");
      }
      const client = firstCall.client;
      const chain = firstCall.chain || options2.chain;
      const id = await inAppWalletSendCalls({
        account,
        calls: options2.calls,
        chain
      });
      return { chain, client, id };
    },
    getCallsStatus: async (options2) => {
      const { inAppWalletGetCallsStatus } = await __vitePreload(async () => {
        const { inAppWalletGetCallsStatus: inAppWalletGetCallsStatus2 } = await import("./in-app-wallet-calls-By_6HPT6.js");
        return { inAppWalletGetCallsStatus: inAppWalletGetCallsStatus2 };
      }, true ? __vite__mapDeps([16,1,2,3,4,5,6,7,8,17]) : void 0);
      return inAppWalletGetCallsStatus(options2);
    },
    getCallsStatusRaw: async (options2) => {
      const { inAppWalletGetCallsStatusRaw } = await __vitePreload(async () => {
        const { inAppWalletGetCallsStatusRaw: inAppWalletGetCallsStatusRaw2 } = await import("./in-app-wallet-calls-By_6HPT6.js");
        return { inAppWalletGetCallsStatusRaw: inAppWalletGetCallsStatusRaw2 };
      }, true ? __vite__mapDeps([16,1,2,3,4,5,6,7,8,17]) : void 0);
      return inAppWalletGetCallsStatusRaw(options2);
    },
    getCapabilities: async (options2) => {
      return {
        [options2.chainId ?? 1]: {
          atomic: {
            status: "supported"
          },
          paymasterService: {
            supported: sponsorGas ?? false
          }
        }
      };
    }
  };
  return account;
}
async function approveERC20(args) {
  const { accountContract, erc20Paymaster, options } = args;
  const tokenAddress = erc20Paymaster.tokenAddress;
  const tokenContract = getContract({
    address: tokenAddress,
    chain: accountContract.chain,
    client: accountContract.client
  });
  const accountAllowance = await allowance({
    contract: tokenContract,
    owner: accountContract.address,
    spender: erc20Paymaster.paymasterAddress
  });
  if (accountAllowance > 0n) {
    return;
  }
  const approveTx = approve({
    amountWei: maxUint96 - 1n,
    contract: tokenContract,
    spender: erc20Paymaster.paymasterAddress
  });
  const transaction = await toSerializableTransaction({
    from: accountContract.address,
    transaction: approveTx
  });
  const executeTx = prepareExecute({
    accountContract,
    executeOverride: options.overrides?.execute,
    transaction
  });
  await _sendUserOp({
    executeTx,
    options: {
      ...options,
      overrides: {
        ...options.overrides,
        tokenPaymaster: void 0
      }
    }
  });
}
function createZkSyncAccount(args) {
  const { creationOptions, connectionOptions, chain } = args;
  const account = {
    address: getAddress(connectionOptions.personalAccount.address),
    async onTransactionRequested(transaction) {
      return connectionOptions.personalAccount.onTransactionRequested?.(transaction);
    },
    async sendTransaction(transaction) {
      const prepTx = {
        chain: getCachedChain(transaction.chainId),
        client: connectionOptions.client,
        data: transaction.data,
        eip712: transaction.eip712,
        to: transaction.to ?? void 0,
        value: transaction.value ?? 0n
      };
      let serializableTransaction = await populateEip712Transaction({
        account,
        transaction: prepTx
      });
      if (args.sponsorGas && !serializableTransaction.paymaster) {
        const pmData = await getZkPaymasterData({
          options: {
            bundlerUrl: creationOptions.overrides?.bundlerUrl,
            chain,
            client: connectionOptions.client,
            entrypointAddress: creationOptions.overrides?.entrypointAddress
          },
          transaction: serializableTransaction
        });
        serializableTransaction = {
          ...serializableTransaction,
          ...pmData
        };
      }
      const signedTransaction = await signEip712Transaction({
        account,
        chainId: chain.id,
        eip712Transaction: serializableTransaction
      });
      const txHash = await broadcastZkTransaction({
        options: {
          bundlerUrl: creationOptions.overrides?.bundlerUrl,
          chain,
          client: connectionOptions.client,
          entrypointAddress: creationOptions.overrides?.entrypointAddress
        },
        signedTransaction,
        transaction: serializableTransaction
      });
      trackTransaction({
        chainId: chain.id,
        client: connectionOptions.client,
        contractAddress: transaction.to ?? void 0,
        transactionHash: txHash.transactionHash,
        walletAddress: account.address,
        walletType: "smart"
      });
      return {
        chain,
        client: connectionOptions.client,
        transactionHash: txHash.transactionHash
      };
    },
    async signMessage({ message }) {
      return connectionOptions.personalAccount.signMessage({ message });
    },
    async signTypedData(_typedData) {
      const typedData = parseTypedData(_typedData);
      return connectionOptions.personalAccount.signTypedData(typedData);
    },
    sendCalls: async (options) => {
      const { inAppWalletSendCalls } = await __vitePreload(async () => {
        const { inAppWalletSendCalls: inAppWalletSendCalls2 } = await import("./in-app-wallet-calls-By_6HPT6.js");
        return { inAppWalletSendCalls: inAppWalletSendCalls2 };
      }, true ? __vite__mapDeps([16,1,2,3,4,5,6,7,8,17]) : void 0);
      const firstCall = options.calls[0];
      if (!firstCall) {
        throw new Error("No calls to send");
      }
      const client = firstCall.client;
      const chain2 = firstCall.chain || options.chain;
      const id = await inAppWalletSendCalls({
        account,
        calls: options.calls,
        chain: chain2
      });
      return { chain: chain2, client, id };
    },
    getCallsStatus: async (options) => {
      const { inAppWalletGetCallsStatus } = await __vitePreload(async () => {
        const { inAppWalletGetCallsStatus: inAppWalletGetCallsStatus2 } = await import("./in-app-wallet-calls-By_6HPT6.js");
        return { inAppWalletGetCallsStatus: inAppWalletGetCallsStatus2 };
      }, true ? __vite__mapDeps([16,1,2,3,4,5,6,7,8,17]) : void 0);
      return inAppWalletGetCallsStatus(options);
    },
    getCallsStatusRaw: async (options) => {
      const { inAppWalletGetCallsStatusRaw } = await __vitePreload(async () => {
        const { inAppWalletGetCallsStatusRaw: inAppWalletGetCallsStatusRaw2 } = await import("./in-app-wallet-calls-By_6HPT6.js");
        return { inAppWalletGetCallsStatusRaw: inAppWalletGetCallsStatusRaw2 };
      }, true ? __vite__mapDeps([16,1,2,3,4,5,6,7,8,17]) : void 0);
      return inAppWalletGetCallsStatusRaw(options);
    },
    getCapabilities: async (options) => {
      return {
        [options.chainId ?? 1]: {
          atomic: {
            status: "unsupported"
          },
          paymasterService: {
            supported: args.sponsorGas ?? false
          }
        }
      };
    }
  };
  return account;
}
async function _sendUserOp(args) {
  const { executeTx, options } = args;
  try {
    const unsignedUserOp = await createUnsignedUserOp({
      accountContract: options.accountContract,
      adminAddress: options.personalAccount.address,
      factoryContract: options.factoryContract,
      overrides: options.overrides,
      sponsorGas: options.sponsorGas,
      transaction: executeTx
    });
    const signedUserOp = await signUserOp({
      adminAccount: options.personalAccount,
      chain: options.chain,
      client: options.client,
      entrypointAddress: options.overrides?.entrypointAddress,
      userOp: unsignedUserOp
    });
    const bundlerOptions = {
      bundlerUrl: options.overrides?.bundlerUrl,
      chain: options.chain,
      client: options.client,
      entrypointAddress: options.overrides?.entrypointAddress
    };
    const userOpHash = await bundleUserOp({
      options: bundlerOptions,
      userOp: signedUserOp
    });
    const receipt = await waitForUserOpReceipt({
      ...bundlerOptions,
      userOpHash
    });
    trackTransaction({
      chainId: options.chain.id,
      client: options.client,
      contractAddress: await resolvePromisedValue(executeTx.to ?? void 0),
      transactionHash: receipt.transactionHash,
      walletAddress: options.accountContract.address,
      walletType: "smart"
    });
    return {
      chain: options.chain,
      client: options.client,
      transactionHash: receipt.transactionHash
    };
  } catch (error) {
    if (isInsufficientFundsError(error)) {
      trackInsufficientFundsError({
        chainId: options.chain.id,
        client: options.client,
        contractAddress: await resolvePromisedValue(executeTx.to ?? void 0),
        error,
        transactionValue: await resolvePromisedValue(executeTx.value),
        walletAddress: options.accountContract.address
      });
    }
    throw error;
  } finally {
    clearAccountDeploying(options.accountContract);
  }
}
async function getEntrypointFromFactory(factoryAddress, client, chain) {
  const factoryContract = getContract({
    address: factoryAddress,
    chain,
    client
  });
  try {
    const entrypointAddress = await readContract({
      contract: factoryContract,
      method: "function entrypoint() public view returns (address)"
    });
    return entrypointAddress;
  } catch {
    return void 0;
  }
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  connectSmartAccount,
  disconnectSmartAccount,
  getEntrypointFromFactory,
  isSmartWallet
}, Symbol.toStringTag, { value: "Module" }));
export {
  index as i,
  prepareCreateAccount as p
};
