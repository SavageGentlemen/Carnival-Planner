const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.es-0KIiZ4OA.js","assets/PassportHome-SJEwmPr3.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/index-CXUot43X.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css","assets/trophy-hLhL8QOQ.js","assets/alert-circle-lhG861Pl.js","assets/bundler-Dmn5v2kr.js","assets/emotion-unitless.esm-BWDbD2bQ.js","assets/TypedData-B3RAtJ0b.js","assets/Address-CuEhN18Y.js","assets/Authorization-CEwvBCmC.js","assets/decimals-RuAU2I0v.js","assets/arweave-BmejQRVS.js","assets/gift-Biw2Zx2l.js","assets/star-CGQXWRD_.js","assets/award-DJfbIRpy.js","assets/sparkles-BEe8L_dR.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { p as parseTypedData, t as trackTransaction } from "./bundler-Dmn5v2kr.js";
import { n as getSavedConnectParamsFromStorage, o as getCachedChain, p as saveConnectParamsToStorage, q as getRpcUrlForChain, r as stringify, t as getAddress, u as stringToHex, v as uint8ArrayToHex, w as numberToHex } from "./index-CXUot43X.js";
import { g as getWalletInfo, N as NAMESPACE, n as normalizeChainId, D as DEFAULT_PROJECT_ID, a as getDefaultAppMetadata, f as formatWalletConnectUrl, b as getTypesForEIP712Domain, v as validateTypedData, s as serializeTypedData } from "./PassportHome-SJEwmPr3.js";
import { U as UserRejectedRequestError, S as SwitchChainError } from "./rpc-BGTULWFS.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
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
let cachedProvider = null;
const storageKeys = {
  lastUsedChainId: "tw.wc.lastUsedChainId",
  requestedChains: "tw.wc.requestedChains"
};
async function connectWC(options, emitter, walletId, storage, sessionHandler) {
  const provider = await initProvider(options, walletId, sessionHandler);
  const wcOptions = options.walletConnect;
  let { onDisplayUri } = wcOptions || {};
  const walletInfo = await getWalletInfo(walletId);
  if (!onDisplayUri && sessionHandler) {
    const deeplinkHandler = (uri) => {
      const appUrl = walletInfo.mobile.native || walletInfo.mobile.universal;
      if (!appUrl) {
        sessionHandler(uri);
        return;
      }
      const fullUrl = formatWalletConnectUrl(appUrl, uri).redirect;
      sessionHandler(fullUrl);
    };
    onDisplayUri = deeplinkHandler;
  }
  if (onDisplayUri) {
    provider.events.addListener("display_uri", onDisplayUri);
  }
  let optionalChains = wcOptions?.optionalChains;
  const chainToRequest = options.chain;
  if (walletId === "global.safe") {
    optionalChains = chainsToRequestForSafe.map(getCachedChain);
  }
  const { chains: chainsToRequest, rpcMap } = getChainsToRequest({
    chain: chainToRequest,
    client: options.client,
    optionalChains
  });
  await provider.connect({
    ...wcOptions?.pairingTopic ? { pairingTopic: wcOptions?.pairingTopic } : {},
    optionalNamespaces: {
      [NAMESPACE]: {
        chains: chainsToRequest,
        events: ["chainChanged", "accountsChanged"],
        methods: [
          "eth_sendTransaction",
          "eth_signTransaction",
          "eth_sign",
          "personal_sign",
          "eth_signTypedData",
          "eth_signTypedData_v4",
          "wallet_switchEthereumChain",
          "wallet_addEthereumChain"
        ],
        rpcMap
      }
    }
  });
  setRequestedChainsIds(chainsToRequest.map((x) => Number(x.split(":")[1])), storage);
  const currentChainId = chainsToRequest[0]?.split(":")[1] || 1;
  const providerChainId = normalizeChainId(currentChainId);
  const account = firstAccountOn(provider.session, `eip155:1`);
  const address = account;
  if (!address) {
    throw new Error("No accounts found on provider.");
  }
  const chain = options.chain && options.chain.id === providerChainId ? options.chain : getCachedChain(providerChainId);
  if (options) {
    const savedParams = {
      chain: options.chain,
      optionalChains: options.walletConnect?.optionalChains,
      pairingTopic: options.walletConnect?.pairingTopic
    };
    if (storage) {
      saveConnectParamsToStorage(storage, walletId, savedParams);
    }
  }
  if (onDisplayUri) {
    provider.events.removeListener("display_uri", onDisplayUri);
  }
  return onConnect(address, chain, provider, emitter, storage, options.client, walletInfo, sessionHandler);
}
async function ensureTargetChain(provider, chain, walletInfo) {
  if (!provider.session) {
    throw new Error("No session found on provider.");
  }
  const TARGET_CAIP = `eip155:${chain.id}`;
  const TARGET_HEX = numberToHex(chain.id);
  if (hasChainEnabled(provider.session, TARGET_CAIP)) {
    provider.setDefaultChain(TARGET_CAIP);
    return;
  }
  try {
    await requestAndOpenWallet({
      provider,
      payload: {
        method: "wallet_switchEthereumChain",
        params: [{ chainId: TARGET_HEX }]
      },
      chain: TARGET_CAIP,
      // route to target
      walletInfo
    });
    provider.setDefaultChain(TARGET_CAIP);
    return;
  } catch (err) {
    const code = err?.code ?? err?.data?.originalError?.code;
    if (code === 4001)
      throw new Error("User rejected chain switch");
  }
  const routeChain = anyRoutableChain(provider.session);
  if (!routeChain)
    throw new Error("No routable chain to send wallet_addEthereumChain");
  try {
    await requestAndOpenWallet({
      provider,
      payload: {
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: TARGET_HEX,
            chainName: chain.name,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: [chain.rpc],
            blockExplorerUrls: [chain.blockExplorers?.[0]?.url ?? ""]
          }
        ]
      },
      chain: routeChain,
      // route via known-good chain, not the target
      walletInfo
    });
  } catch (err) {
    const code = err?.code ?? err?.data?.originalError?.code;
    if (code === 4001)
      throw new Error("User rejected add chain");
    throw new Error(`Add chain failed: ${err?.message || String(err)}`);
  }
  await requestAndOpenWallet({
    provider,
    payload: {
      method: "wallet_switchEthereumChain",
      params: [{ chainId: TARGET_HEX }]
    },
    chain: TARGET_CAIP,
    walletInfo
  });
  provider.setDefaultChain(TARGET_CAIP);
  if (!hasChainEnabled(provider.session, TARGET_CAIP)) {
    throw new Error("Target chain still not enabled by wallet");
  }
}
function getNS(session) {
  return session?.namespaces?.eip155;
}
function hasChainEnabled(session, caip) {
  const ns = getNS(session);
  return !!ns?.accounts?.some((a) => a.startsWith(`${caip}:`));
}
function firstAccountOn(session, caip) {
  const ns = getNS(session);
  const hit = ns?.accounts?.find((a) => a.startsWith(`${caip}:`)) || ns?.accounts[0];
  return hit ? hit.split(":")[2] ?? null : null;
}
function anyRoutableChain(session) {
  const ns = getNS(session);
  return ns?.accounts?.[0]?.split(":")?.slice(0, 2)?.join(":") ?? null;
}
async function autoConnectWC(options, emitter, walletId, storage, sessionHandler) {
  const savedConnectParams = storage ? await getSavedConnectParamsFromStorage(storage, walletId) : null;
  const walletInfo = await getWalletInfo(walletId);
  const provider = await initProvider(savedConnectParams ? {
    chain: savedConnectParams.chain,
    client: options.client,
    walletConnect: {
      optionalChains: savedConnectParams.optionalChains,
      pairingTopic: savedConnectParams.pairingTopic
    }
  } : {
    client: options.client,
    walletConnect: {}
  }, walletId, sessionHandler);
  if (!provider.session) {
    await provider.disconnect();
    throw new Error("No wallet connect session found on provider.");
  }
  const namespaceAccounts = provider.session?.namespaces?.[NAMESPACE]?.accounts;
  const address = namespaceAccounts?.[0]?.split(":")[2];
  if (!address) {
    throw new Error("No accounts found on provider.");
  }
  const currentChainId = options.chain?.id || 1;
  const providerChainId = normalizeChainId(currentChainId);
  const chain = options.chain && options.chain.id === providerChainId ? options.chain : getCachedChain(providerChainId);
  return onConnect(address, chain, provider, emitter, storage, options.client, walletInfo, sessionHandler);
}
async function initProvider(options, walletId, sessionRequestHandler) {
  if (cachedProvider) {
    return cachedProvider;
  }
  const walletInfo = await getWalletInfo(walletId);
  const wcOptions = options.walletConnect;
  const { UniversalProvider } = await __vitePreload(async () => {
    const { UniversalProvider: UniversalProvider2 } = await import("./index.es-0KIiZ4OA.js");
    return { UniversalProvider: UniversalProvider2 };
  }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]) : void 0);
  const provider = await UniversalProvider.init({
    metadata: {
      description: wcOptions?.appMetadata?.description || getDefaultAppMetadata().description,
      icons: [
        wcOptions?.appMetadata?.logoUrl || getDefaultAppMetadata().logoUrl
      ],
      name: wcOptions?.appMetadata?.name || getDefaultAppMetadata().name,
      url: wcOptions?.appMetadata?.url || getDefaultAppMetadata().url,
      redirect: {
        native: walletInfo.mobile.native || void 0,
        universal: walletInfo.mobile.universal || void 0
      }
    },
    projectId: wcOptions?.projectId || DEFAULT_PROJECT_ID
  });
  provider.events.setMaxListeners(Number.POSITIVE_INFINITY);
  if (walletId !== "walletConnect") {
    async function handleSessionRequest() {
      const walletLinkToOpen = provider.session?.peer?.metadata?.redirect?.native || walletInfo.mobile.native || walletInfo.mobile.universal;
      if (sessionRequestHandler && walletLinkToOpen) {
        await sessionRequestHandler(walletLinkToOpen);
      }
    }
    provider.on("session_request_sent", handleSessionRequest);
    provider.events.addListener("disconnect", () => {
      provider.off("session_request_sent", handleSessionRequest);
      cachedProvider = null;
    });
  }
  cachedProvider = provider;
  return provider;
}
function createAccount({ provider, address, client, chain, sessionRequestHandler, walletInfo }) {
  const account = {
    address: getAddress(address),
    async sendTransaction(tx) {
      const transactionHash = await requestAndOpenWallet({
        provider,
        payload: {
          method: "eth_sendTransaction",
          params: [
            {
              data: tx.data,
              from: getAddress(address),
              gas: tx.gas ? numberToHex(tx.gas) : void 0,
              to: tx.to,
              value: tx.value ? numberToHex(tx.value) : void 0
            }
          ]
        },
        chain: `eip155:${tx.chainId}`,
        walletInfo,
        sessionRequestHandler
      });
      trackTransaction({
        chainId: tx.chainId,
        client,
        contractAddress: tx.to ?? void 0,
        gasPrice: tx.gasPrice,
        transactionHash,
        walletAddress: getAddress(address),
        walletType: "walletConnect"
      });
      return {
        transactionHash
      };
    },
    async signMessage({ message }) {
      const messageToSign = (() => {
        if (typeof message === "string") {
          return stringToHex(message);
        }
        if (message.raw instanceof Uint8Array) {
          return uint8ArrayToHex(message.raw);
        }
        return message.raw;
      })();
      return requestAndOpenWallet({
        provider,
        payload: {
          method: "personal_sign",
          params: [messageToSign, this.address]
        },
        chain: `eip155:${chain.id}`,
        walletInfo,
        sessionRequestHandler
      });
    },
    async signTypedData(_data) {
      const data = parseTypedData(_data);
      const { domain, message, primaryType } = data;
      const types = {
        EIP712Domain: getTypesForEIP712Domain({ domain }),
        ...data.types
      };
      validateTypedData({ domain, message, primaryType, types });
      const typedData = serializeTypedData({
        domain: domain ?? {},
        message,
        primaryType,
        types
      });
      return await requestAndOpenWallet({
        provider,
        payload: {
          method: "eth_signTypedData_v4",
          params: [this.address, typedData]
        },
        chain: `eip155:${chain.id}`,
        walletInfo,
        sessionRequestHandler
      });
    }
  };
  return account;
}
async function requestAndOpenWallet(args) {
  const { provider, payload, chain, walletInfo, sessionRequestHandler } = args;
  const resultPromise = provider.request(payload, chain);
  const walletLinkToOpen = provider.session?.peer?.metadata?.redirect?.native || walletInfo.mobile.native || walletInfo.mobile.universal;
  if (sessionRequestHandler && walletLinkToOpen) {
    await sessionRequestHandler(walletLinkToOpen);
  }
  return resultPromise;
}
function onConnect(address, chain, provider, emitter, storage, client, walletInfo, sessionRequestHandler) {
  const account = createAccount({
    address,
    chain,
    client,
    provider,
    sessionRequestHandler,
    walletInfo
  });
  async function disconnect() {
    provider.removeListener("accountsChanged", onAccountsChanged);
    provider.removeListener("chainChanged", onChainChanged);
    provider.removeListener("disconnect", onDisconnect);
    await provider.disconnect();
    cachedProvider = null;
  }
  function onDisconnect() {
    setRequestedChainsIds([], storage);
    storage?.removeItem(storageKeys.lastUsedChainId);
    disconnect();
    emitter.emit("disconnect", void 0);
  }
  function onAccountsChanged(accounts) {
    if (accounts[0]) {
      const newAccount = createAccount({
        address: getAddress(accounts[0]),
        chain,
        client,
        provider,
        sessionRequestHandler,
        walletInfo
      });
      emitter.emit("accountChanged", newAccount);
      emitter.emit("accountsChanged", accounts);
    } else {
      onDisconnect();
    }
  }
  function onChainChanged(newChainId) {
    const newChain = getCachedChain(normalizeChainId(newChainId));
    emitter.emit("chainChanged", newChain);
    storage?.setItem(storageKeys.lastUsedChainId, String(newChainId));
  }
  provider.on("accountsChanged", onAccountsChanged);
  provider.on("chainChanged", onChainChanged);
  provider.on("disconnect", onDisconnect);
  provider.on("session_delete", onDisconnect);
  return [
    account,
    chain,
    disconnect,
    (newChain) => switchChainWC(provider, newChain, walletInfo)
  ];
}
async function switchChainWC(provider, chain, walletInfo) {
  try {
    await ensureTargetChain(provider, chain, walletInfo);
  } catch (error) {
    const message = typeof error === "string" ? error : error?.message;
    if (/user rejected request/i.test(message)) {
      throw new UserRejectedRequestError(error);
    }
    throw new SwitchChainError(error);
  }
}
function setRequestedChainsIds(chains, storage) {
  storage?.setItem(storageKeys.requestedChains, stringify(chains));
}
function getChainsToRequest(options) {
  const rpcMap = {};
  const chainIds = [];
  if (options.chain) {
    rpcMap[options.chain.id] = getRpcUrlForChain({
      chain: options.chain,
      client: options.client
    });
    chainIds.push(options.chain.id);
  }
  const optionalChains = (options?.optionalChains || []).slice(0, 10);
  for (const chain of optionalChains) {
    rpcMap[chain.id] = getRpcUrlForChain({
      chain,
      client: options.client
    });
    chainIds.push(chain.id);
  }
  if (!chainIds.includes(1)) {
    rpcMap[1] = getCachedChain(1).rpc;
    chainIds.push(1);
  }
  return {
    chains: chainIds.map((x) => `eip155:${x}`),
    rpcMap
  };
}
const chainsToRequestForSafe = [
  1,
  // Ethereum Mainnet
  11155111,
  // Sepolia Testnet
  42161,
  // Arbitrum One Mainnet
  43114,
  // Avalanche Mainnet
  8453,
  // Base Mainnet
  1313161554,
  // Aurora Mainnet
  84532,
  // Base Sepolia Testnet
  56,
  // Binance Smart Chain Mainnet
  42220,
  // Celo Mainnet
  100,
  // Gnosis Mainnet
  10,
  // Optimism Mainnet
  137,
  // Polygon Mainnet
  1101,
  // Polygon zkEVM Mainnet
  324,
  // zkSync Era mainnet
  534352,
  // Scroll mainnet
  80094
  // Berachain mainnet
];
export {
  autoConnectWC,
  connectWC
};
