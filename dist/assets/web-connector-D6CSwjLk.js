const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/eth_getTransactionCount-DHChJTEw.js","assets/index-CXUot43X.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css","assets/in-app-wallet-calls-By_6HPT6.js","assets/bundler-Dmn5v2kr.js","assets/send-batch-transaction-B5YWRBly.js","assets/PassportHome-SJEwmPr3.js","assets/trophy-hLhL8QOQ.js","assets/alert-circle-lhG861Pl.js","assets/emotion-unitless.esm-BWDbD2bQ.js","assets/TypedData-B3RAtJ0b.js","assets/Address-CuEhN18Y.js","assets/Authorization-CEwvBCmC.js","assets/decimals-RuAU2I0v.js","assets/arweave-BmejQRVS.js","assets/gift-Biw2Zx2l.js","assets/star-CGQXWRD_.js","assets/award-DJfbIRpy.js","assets/sparkles-BEe8L_dR.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { aZ as getThirdwebBaseUrl, aR as getClientFetch, r as stringify, o as getCachedChain, t as getAddress, ay as bytesToHex, a1 as getRpcClient, aw as toHex, B as isHex, a_ as sleep, a$ as webLocalStorage, b0 as hexToString, b1 as getThirdwebDomains } from "./index-CXUot43X.js";
import { ah as getLoginUrl, ai as getLoginCallbackUrl, aj as ClientScopedStorage, ak as IN_APP_WALLET_PATH, al as loginWithOauthRedirect, am as loginWithOauth, an as socialAuthOptions, ao as linkAccount, ap as unlinkAccount, aq as getLinkedProfilesInternal } from "./PassportHome-SJEwmPr3.js";
import { m as randomBytesHex, p as parseTypedData, t as trackTransaction } from "./bundler-Dmn5v2kr.js";
import { signLoginPayload } from "./sign-login-payload-BiVVY0dP.js";
import { e as eth_sendRawTransaction } from "./eth_sendRawTransaction-CgrUWHw8.js";
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
const store = /* @__PURE__ */ new Map();
const inMemoryStorage = {
  getItem: async (key) => {
    return store.get(key) ?? null;
  },
  removeItem: async (key) => {
    store.delete(key);
  },
  setItem: async (key, value) => {
    store.set(key, value);
  }
};
async function getUserStatus({ authToken, client, ecosystem }) {
  const clientFetch = getClientFetch(client, ecosystem);
  const response = await clientFetch(`${getThirdwebBaseUrl("inAppWallet")}/api/2024-05-05/accounts`, {
    headers: {
      Authorization: `Bearer embedded-wallet-token:${authToken}`,
      "Content-Type": "application/json"
    },
    method: "GET"
  });
  if (!response.ok) {
    const result = await response.text().catch(() => {
      return "Unknown error";
    });
    throw new Error(`Failed to get user info: ${result}`);
  }
  return await response.json();
}
const DOMAIN_URL_2023 = getThirdwebBaseUrl("inAppWallet");
const BASE_URL_2023 = `${DOMAIN_URL_2023}/`;
const ROUTE_2023_10_20_API_BASE_PATH = `${BASE_URL_2023}api/2023-10-20`;
const ROUTE_AUTH_JWT_CALLBACK = `${ROUTE_2023_10_20_API_BASE_PATH}/embedded-wallet/validate-custom-jwt`;
const ROUTE_AUTH_ENDPOINT_CALLBACK = `${ROUTE_2023_10_20_API_BASE_PATH}/embedded-wallet/validate-custom-auth-endpoint`;
const createErrorMessage = (message, error) => {
  if (error instanceof Error) {
    return `${message}: ${error.message}`;
  }
  return `${message}: ${stringify(error)}`;
};
async function authEndpoint(args) {
  const clientFetch = getClientFetch(args.client, args.ecosystem);
  const res = await clientFetch(ROUTE_AUTH_ENDPOINT_CALLBACK, {
    body: stringify({
      developerClientId: args.client.clientId,
      payload: args.payload
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Custom auth endpoint authentication error: ${error.message}`);
  }
  try {
    const { verifiedToken } = await res.json();
    return { storedToken: verifiedToken };
  } catch (e) {
    throw new Error(createErrorMessage("Malformed response from post auth_endpoint authentication", e));
  }
}
async function backendAuthenticate(args) {
  const clientFetch = getClientFetch(args.client, args.ecosystem);
  const path = getLoginUrl({
    authOption: "backend",
    client: args.client,
    ecosystem: args.ecosystem
  });
  const res = await clientFetch(`${path}`, {
    body: stringify({
      walletSecret: args.walletSecret
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to generate backend account: ${error}`);
  }
  return await res.json();
}
async function guestAuthenticate(args) {
  let sessionId = await args.storage.getGuestSessionId();
  if (!sessionId) {
    sessionId = randomBytesHex(32);
    args.storage.saveGuestSessionId(sessionId);
  }
  const clientFetch = getClientFetch(args.client, args.ecosystem);
  const path = getLoginCallbackUrl({
    authOption: "guest",
    client: args.client,
    ecosystem: args.ecosystem
  });
  const res = await clientFetch(`${path}`, {
    body: stringify({
      sessionId
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to generate guest account: ${res.status} ${res.statusText} ${error}`);
  }
  return await res.json();
}
async function customJwt(args) {
  const clientFetch = getClientFetch(args.client, args.ecosystem);
  const res = await clientFetch(ROUTE_AUTH_JWT_CALLBACK, {
    body: stringify({
      developerClientId: args.client.clientId,
      jwt: args.jwt
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(`JWT authentication error: ${error.message}`);
  }
  try {
    const { verifiedToken } = await res.json();
    return { storedToken: verifiedToken };
  } catch (e) {
    throw new Error(createErrorMessage("Malformed response from post jwt authentication", e));
  }
}
function getVerificationPath() {
  return `${getThirdwebBaseUrl("inAppWallet")}/api/2024-05-05/login/passkey/callback`;
}
function getChallengePath(type, username) {
  return `${getThirdwebBaseUrl("inAppWallet")}/api/2024-05-05/login/passkey?type=${type}${username ? `&username=${username}` : ""}`;
}
async function registerPasskey(options) {
  if (!options.passkeyClient.isAvailable()) {
    throw new Error("Passkeys are not available on this device");
  }
  const fetchWithId = getClientFetch(options.client, options.ecosystem);
  const generatedName = options.username ?? generateUsername(options.ecosystem);
  const res = await fetchWithId(getChallengePath("sign-up", generatedName));
  const challengeData = await res.json();
  if (!challengeData.challenge) {
    throw new Error("No challenge received");
  }
  const challenge = challengeData.challenge;
  const registration = await options.passkeyClient.register({
    challenge,
    name: generatedName,
    rp: options.rp
  });
  const customHeaders = {};
  if (options.ecosystem?.partnerId) {
    customHeaders["x-ecosystem-partner-id"] = options.ecosystem.partnerId;
  }
  if (options.ecosystem?.id) {
    customHeaders["x-ecosystem-id"] = options.ecosystem.id;
  }
  const verifRes = await fetchWithId(getVerificationPath(), {
    body: stringify({
      authenticatorData: registration.authenticatorData,
      clientData: registration.clientData,
      credential: {
        algorithm: registration.credential.algorithm,
        publicKey: registration.credential.publicKey
      },
      credentialId: registration.credentialId,
      origin: registration.origin,
      rpId: options.rp.id,
      serverVerificationId: challengeData.serverVerificationId,
      type: "sign-up",
      username: generatedName
    }),
    headers: {
      "Content-Type": "application/json",
      ...customHeaders
    },
    method: "POST"
  });
  const verifData = await verifRes.json();
  if (!verifData || !verifData.storedToken) {
    throw new Error(`Error verifying passkey: ${verifData.message ?? "unknown error"}`);
  }
  await options.storage?.savePasskeyCredentialId(registration.credentialId);
  return verifData;
}
async function loginWithPasskey(options) {
  if (!options.passkeyClient.isAvailable()) {
    throw new Error("Passkeys are not available on this device");
  }
  const fetchWithId = getClientFetch(options.client, options.ecosystem);
  const [challengeData, credentialId] = await Promise.all([
    fetchWithId(getChallengePath("sign-in")).then((r) => r.json()),
    options.storage?.getPasskeyCredentialId()
  ]);
  if (!challengeData.challenge) {
    throw new Error("No challenge received");
  }
  const challenge = challengeData.challenge;
  const authentication = await options.passkeyClient.authenticate({
    challenge,
    credentialId: credentialId ?? void 0,
    rp: options.rp
  });
  const customHeaders = {};
  if (options.ecosystem?.partnerId) {
    customHeaders["x-ecosystem-partner-id"] = options.ecosystem.partnerId;
  }
  if (options.ecosystem?.id) {
    customHeaders["x-ecosystem-id"] = options.ecosystem.id;
  }
  const verifRes = await fetchWithId(getVerificationPath(), {
    body: stringify({
      authenticatorData: authentication.authenticatorData,
      clientData: authentication.clientData,
      credentialId: authentication.credentialId,
      origin: authentication.origin,
      rpId: options.rp.id,
      serverVerificationId: challengeData.serverVerificationId,
      signature: authentication.signature,
      type: "sign-in"
    }),
    headers: {
      "Content-Type": "application/json",
      ...customHeaders
    },
    method: "POST"
  });
  const verifData = await verifRes.json();
  if (!verifData || !verifData.storedToken) {
    throw new Error(`Error verifying passkey: ${verifData.message ?? "unknown error"}`);
  }
  await options.storage?.savePasskeyCredentialId(authentication.credentialId);
  return verifData;
}
function generateUsername(ecosystem) {
  return `${ecosystem?.id ?? "wallet"}-${(/* @__PURE__ */ new Date()).toISOString()}`;
}
const NON_ETHEREUM_WALLETS = ["xyz.abs"];
async function siweAuthenticate(args) {
  const { wallet, client, ecosystem, chain } = args;
  const siweChain = NON_ETHEREUM_WALLETS.includes(wallet.id) ? chain || getCachedChain(1) : getCachedChain(1);
  const account = wallet.getAccount() || await wallet.connect({ chain: siweChain, client });
  const clientFetch = getClientFetch(client, ecosystem);
  const payload = await (async () => {
    const path = getLoginUrl({
      authOption: "wallet",
      client: args.client,
      ecosystem: args.ecosystem
    });
    const res = await clientFetch(`${path}&address=${account.address}&chainId=${siweChain.id}`);
    if (!res.ok)
      throw new Error("Failed to generate SIWE login payload");
    return await res.json();
  })();
  const { signature } = await signLoginPayload({ account, payload });
  const authResult = await (async () => {
    const path = getLoginCallbackUrl({
      authOption: "wallet",
      client: args.client,
      ecosystem: args.ecosystem
    });
    const res = await clientFetch(`${path}&signature=${signature}&payload=${encodeURIComponent(payload)}`, {
      body: stringify({
        payload,
        signature
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    if (!res.ok)
      throw new Error("Failed to verify SIWE signature");
    return await res.json();
  })();
  return authResult;
}
async function signAuthorization({ client, payload, storage }) {
  const authToken = await storage.getAuthCookie();
  const ecosystem = storage.ecosystem;
  const clientFetch = getClientFetch(client, ecosystem);
  if (!authToken) {
    throw new Error("No auth token found when signing message");
  }
  const body = {
    address: payload.address,
    chainId: payload.chainId,
    nonce: Number(payload.nonce)
  };
  const response = await clientFetch(`${getThirdwebBaseUrl("inAppWallet")}/api/v1/enclave-wallet/sign-authorization`, {
    body: stringify(body),
    headers: {
      Authorization: `Bearer embedded-wallet-token:${authToken}`,
      "Content-Type": "application/json",
      "x-thirdweb-client-id": client.clientId
    },
    method: "POST"
  });
  if (!response.ok) {
    throw new Error(`Failed to sign message - ${response.status} ${response.statusText}`);
  }
  const signedAuthorization = await response.json();
  return signedAuthorization;
}
async function signMessage({ client, payload: { message, isRaw, originalMessage, chainId }, storage }) {
  const authToken = await storage.getAuthCookie();
  const ecosystem = storage.ecosystem;
  const clientFetch = getClientFetch(client, ecosystem);
  if (!authToken) {
    throw new Error("No auth token found when signing message");
  }
  const response = await clientFetch(`${getThirdwebBaseUrl("inAppWallet")}/api/v1/enclave-wallet/sign-message`, {
    body: stringify({
      messagePayload: {
        chainId,
        isRaw,
        message,
        originalMessage
      }
    }),
    headers: {
      Authorization: `Bearer embedded-wallet-token:${authToken}`,
      "Content-Type": "application/json",
      "x-thirdweb-client-id": client.clientId
    },
    method: "POST"
  });
  if (!response.ok) {
    throw new Error(`Failed to sign message - ${response.status} ${response.statusText}`);
  }
  const signedMessage = await response.json();
  return signedMessage;
}
async function signTransaction({ client, payload, storage }) {
  const authToken = await storage.getAuthCookie();
  const ecosystem = storage.ecosystem;
  const clientFetch = getClientFetch(client, ecosystem);
  if (!authToken) {
    throw new Error("No auth token found when signing transaction");
  }
  const response = await clientFetch(`${getThirdwebBaseUrl("inAppWallet")}/api/v1/enclave-wallet/sign-transaction`, {
    body: stringify({
      transactionPayload: payload
    }),
    headers: {
      Authorization: `Bearer embedded-wallet-token:${authToken}`,
      "Content-Type": "application/json",
      "x-thirdweb-client-id": client.clientId
    },
    method: "POST"
  });
  if (!response.ok) {
    throw new Error(`Failed to sign transaction - ${response.status} ${response.statusText}`);
  }
  const signedTransaction = await response.json();
  return signedTransaction.signature;
}
async function signTypedData({ client, payload, storage }) {
  const authToken = await storage.getAuthCookie();
  const ecosystem = storage.ecosystem;
  const clientFetch = getClientFetch(client, ecosystem);
  if (!authToken) {
    throw new Error("No auth token found when signing typed data");
  }
  const response = await clientFetch(`${getThirdwebBaseUrl("inAppWallet")}/api/v1/enclave-wallet/sign-typed-data`, {
    body: stringify({
      ...payload
    }),
    headers: {
      Authorization: `Bearer embedded-wallet-token:${authToken}`,
      "Content-Type": "application/json",
      "x-thirdweb-client-id": client.clientId
    },
    method: "POST"
  });
  if (!response.ok) {
    throw new Error(`Failed to sign typed data - ${response.status} ${response.statusText}`);
  }
  const signedTypedData = await response.json();
  return signedTypedData;
}
class EnclaveWallet {
  constructor({ client, ecosystem, address, storage }) {
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "ecosystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "address", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "localStorage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.client = client;
    this.ecosystem = ecosystem;
    this.address = address;
    this.localStorage = storage;
  }
  /**
   * Store the auth token for use
   * @returns `{walletAddress: string }` The user's wallet details
   * @internal
   */
  async postWalletSetUp(authResult) {
    await this.localStorage.saveAuthCookie(authResult.storedToken.cookieString);
  }
  /**
   * Gets the current user's details
   * @internal
   */
  async getUserWalletStatus() {
    const token = await this.localStorage.getAuthCookie();
    if (!token) {
      return { status: "Logged Out" };
    }
    const userStatus = await getUserStatus({
      authToken: token,
      client: this.client,
      ecosystem: this.ecosystem
    });
    if (!userStatus) {
      return { status: "Logged Out" };
    }
    const wallet = userStatus.wallets[0];
    const authDetails = {
      email: userStatus.linkedAccounts.find((account) => account.details.email !== void 0)?.details.email,
      phoneNumber: userStatus.linkedAccounts.find((account) => account.details.phone !== void 0)?.details.phone,
      recoveryShareManagement: "ENCLAVE",
      userWalletId: userStatus.id || ""
    };
    if (!wallet) {
      return {
        authDetails,
        status: "Logged In, Wallet Uninitialized"
      };
    }
    return {
      account: await this.getAccount(),
      authDetails,
      status: "Logged In, Wallet Initialized",
      walletAddress: wallet.address
    };
  }
  /**
   * Returns an account to perform wallet operations
   * @internal
   */
  async getAccount() {
    const client = this.client;
    const storage = this.localStorage;
    const address = this.address;
    const ecosystem = this.ecosystem;
    const _signTransaction = async (tx) => {
      const rpcRequest = getRpcClient({
        chain: getCachedChain(tx.chainId),
        client
      });
      const transaction = {
        chainId: toHex(tx.chainId),
        data: tx.data,
        gas: hexlify(tx.gas),
        nonce: hexlify(tx.nonce) || toHex(await __vitePreload(async () => {
          const { eth_getTransactionCount } = await import("./eth_getTransactionCount-DHChJTEw.js");
          return { eth_getTransactionCount };
        }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0).then(({ eth_getTransactionCount }) => eth_getTransactionCount(rpcRequest, {
          address: getAddress(this.address),
          blockTag: "pending"
        }))),
        to: tx.to ? getAddress(tx.to) : void 0,
        value: hexlify(tx.value)
      };
      if (tx.authorizationList && tx.authorizationList.length > 0) {
        transaction.type = 4;
        transaction.authorizationList = tx.authorizationList;
        transaction.maxFeePerGas = hexlify(tx.maxFeePerGas);
        transaction.maxPriorityFeePerGas = hexlify(tx.maxPriorityFeePerGas);
      } else if (hexlify(tx.maxFeePerGas)) {
        transaction.maxFeePerGas = hexlify(tx.maxFeePerGas);
        transaction.maxPriorityFeePerGas = hexlify(tx.maxPriorityFeePerGas);
        transaction.type = 2;
      } else {
        transaction.gasPrice = hexlify(tx.gasPrice);
        transaction.type = 0;
      }
      return signTransaction({
        client,
        payload: transaction,
        storage
      });
    };
    const account = {
      address: getAddress(address),
      async sendTransaction(tx) {
        const rpcRequest = getRpcClient({
          chain: getCachedChain(tx.chainId),
          client
        });
        const signedTx = await _signTransaction(tx);
        const transactionHash = await eth_sendRawTransaction(rpcRequest, signedTx);
        trackTransaction({
          chainId: tx.chainId,
          client,
          contractAddress: tx.to ?? void 0,
          ecosystem,
          gasPrice: tx.gasPrice,
          transactionHash,
          walletAddress: address,
          walletType: "inApp"
        });
        return { transactionHash };
      },
      async signAuthorization(payload) {
        const authorization = await signAuthorization({
          client,
          payload,
          storage
        });
        return {
          address: getAddress(authorization.address),
          chainId: Number.parseInt(authorization.chainId),
          nonce: BigInt(authorization.nonce),
          r: BigInt(authorization.r),
          s: BigInt(authorization.s),
          yParity: Number.parseInt(authorization.yParity)
        };
      },
      async signMessage({ message, originalMessage, chainId }) {
        const messagePayload = (() => {
          if (typeof message === "string") {
            return { chainId, isRaw: false, message, originalMessage };
          }
          return {
            chainId,
            isRaw: true,
            message: typeof message.raw === "string" ? message.raw : bytesToHex(message.raw),
            originalMessage
          };
        })();
        const { signature } = await signMessage({
          client,
          payload: messagePayload,
          storage
        });
        return signature;
      },
      async signTransaction(tx) {
        if (!tx.chainId) {
          throw new Error("chainId required in tx to sign");
        }
        return _signTransaction({
          chainId: tx.chainId,
          ...tx
        });
      },
      async signTypedData(_typedData) {
        const parsedTypedData = parseTypedData(_typedData);
        const { signature } = await signTypedData({
          client,
          payload: parsedTypedData,
          storage
        });
        return signature;
      },
      sendCalls: async (options) => {
        const { inAppWalletSendCalls } = await __vitePreload(async () => {
          const { inAppWalletSendCalls: inAppWalletSendCalls2 } = await import("./in-app-wallet-calls-By_6HPT6.js");
          return { inAppWalletSendCalls: inAppWalletSendCalls2 };
        }, true ? __vite__mapDeps([8,1,2,3,4,5,6,7,9,10]) : void 0);
        const firstCall = options.calls[0];
        if (!firstCall) {
          throw new Error("No calls to send");
        }
        const client2 = firstCall.client;
        const chain = firstCall.chain || options.chain;
        const id = await inAppWalletSendCalls({
          account,
          calls: options.calls,
          chain
        });
        return { chain, client: client2, id };
      },
      getCallsStatus: async (options) => {
        const { inAppWalletGetCallsStatus } = await __vitePreload(async () => {
          const { inAppWalletGetCallsStatus: inAppWalletGetCallsStatus2 } = await import("./in-app-wallet-calls-By_6HPT6.js");
          return { inAppWalletGetCallsStatus: inAppWalletGetCallsStatus2 };
        }, true ? __vite__mapDeps([8,1,2,3,4,5,6,7,9,10]) : void 0);
        return inAppWalletGetCallsStatus(options);
      },
      getCallsStatusRaw: async (options) => {
        const { inAppWalletGetCallsStatusRaw } = await __vitePreload(async () => {
          const { inAppWalletGetCallsStatusRaw: inAppWalletGetCallsStatusRaw2 } = await import("./in-app-wallet-calls-By_6HPT6.js");
          return { inAppWalletGetCallsStatusRaw: inAppWalletGetCallsStatusRaw2 };
        }, true ? __vite__mapDeps([8,1,2,3,4,5,6,7,9,10]) : void 0);
        return inAppWalletGetCallsStatusRaw(options);
      },
      getCapabilities: async (options) => {
        return {
          [options.chainId ?? 1]: {
            atomic: {
              status: "unsupported"
            },
            paymasterService: {
              supported: false
            }
          }
        };
      }
    };
    return account;
  }
}
function hexlify(value) {
  return value === void 0 || isHex(value) ? value : toHex(value);
}
const iframeBaseStyle = {
  backgroundColor: "transparent",
  border: "none",
  colorScheme: "light",
  display: "none",
  height: "100%",
  pointerEvents: "all",
  position: "fixed",
  right: "0px",
  top: "0px",
  width: "100%",
  zIndex: "2147483646"
};
const isIframeLoaded = /* @__PURE__ */ new Map();
class IframeCommunicator {
  /**
   * @internal
   */
  constructor({ link, baseUrl, iframeId, container, onIframeInitialize, localStorage, clientId, ecosystem }) {
    Object.defineProperty(this, "iframe", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "POLLING_INTERVAL_SECONDS", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1.4
    });
    Object.defineProperty(this, "iframeBaseUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "localStorage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "clientId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "ecosystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.localStorage = localStorage;
    this.clientId = clientId;
    this.ecosystem = ecosystem;
    this.iframeBaseUrl = baseUrl;
    if (typeof document === "undefined") {
      return;
    }
    container = container ?? document.body;
    let iframe = document.getElementById(iframeId);
    const hrefLink = new URL(link);
    if (!iframe || iframe.src !== hrefLink.href) {
      iframe = document.createElement("iframe");
      const mergedIframeStyles = {
        ...iframeBaseStyle
      };
      Object.assign(iframe.style, mergedIframeStyles);
      iframe.setAttribute("id", iframeId);
      iframe.setAttribute("fetchpriority", "high");
      container.appendChild(iframe);
      iframe.src = hrefLink.href;
      const onIframeLoaded = (event) => {
        if (event.data.eventType === "ewsIframeLoaded") {
          window.removeEventListener("message", onIframeLoaded);
          if (!iframe) {
            console.warn("thirdweb iFrame not found");
            return;
          }
          this.onIframeLoadHandler(iframe, onIframeInitialize)();
        }
      };
      window.addEventListener("message", onIframeLoaded);
    }
    this.iframe = iframe;
  }
  // biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
  async onIframeLoadedInitVariables() {
    return {
      authCookie: await this.localStorage.getAuthCookie(),
      clientId: this.clientId,
      deviceShareStored: await this.localStorage.getDeviceShare(),
      ecosystemId: this.ecosystem?.id,
      partnerId: this.ecosystem?.partnerId,
      walletUserId: await this.localStorage.getWalletUserId()
    };
  }
  /**
   * @internal
   */
  onIframeLoadHandler(iframe, onIframeInitialize) {
    return async () => {
      const channel = new MessageChannel();
      const promise = new Promise((res, rej) => {
        channel.port1.onmessage = (event) => {
          const { data } = event;
          channel.port1.close();
          if (!data.success) {
            rej(new Error(data.error));
          }
          isIframeLoaded.set(iframe.src, true);
          if (onIframeInitialize) {
            onIframeInitialize();
          }
          res(true);
        };
      });
      iframe?.contentWindow?.postMessage({
        data: await this.onIframeLoadedInitVariables(),
        eventType: "initIframe"
      }, this.iframeBaseUrl, [channel.port2]);
      await promise;
    };
  }
  /**
   * @internal
   */
  async call({ procedureName, params, showIframe = false }) {
    if (!this.iframe) {
      throw new Error("Iframe not found. You are likely calling this from the backend where the DOM is not available.");
    }
    while (!isIframeLoaded.get(this.iframe.src)) {
      await sleep(this.POLLING_INTERVAL_SECONDS * 1e3);
    }
    if (showIframe) {
      this.iframe.style.display = "block";
      await sleep(5e-3 * 1e3);
    }
    const channel = new MessageChannel();
    const promise = new Promise((res, rej) => {
      channel.port1.onmessage = async (event) => {
        const { data } = event;
        channel.port1.close();
        if (showIframe) {
          await sleep(0.1 * 1e3);
          if (this.iframe) {
            this.iframe.style.display = "none";
          }
        }
        if (!data.success) {
          rej(new Error(data.error));
        } else {
          res(data.data);
        }
      };
    });
    this.iframe.contentWindow?.postMessage({
      // Pass the initialization data on every request in case the iframe storage was reset (can happen in some environments such as iOS PWAs)
      data: {
        ...params,
        ...await this.onIframeLoadedInitVariables()
      },
      eventType: procedureName
    }, this.iframeBaseUrl, [channel.port2]);
    return promise;
  }
  /**
   * This has to be called by any iframe that will be removed from the DOM.
   * Use to make sure that we reset the global loaded state of the particular iframe.src
   * @internal
   */
  destroy() {
    if (this.iframe) {
      isIframeLoaded.delete(this.iframe.src);
    }
  }
}
class InAppWalletIframeCommunicator extends IframeCommunicator {
  /**
   * @internal
   */
  constructor({ clientId, baseUrl, ecosystem }) {
    super({
      baseUrl,
      clientId,
      container: typeof document === "undefined" ? void 0 : document.body,
      ecosystem,
      iframeId: IN_APP_WALLET_IFRAME_ID + (ecosystem?.id || ""),
      link: createInAppWalletIframeLink({
        baseUrl,
        clientId,
        ecosystem,
        path: IN_APP_WALLET_PATH
      }).href,
      localStorage: new ClientScopedStorage({
        clientId,
        ecosystem,
        storage: webLocalStorage
      })
    });
    this.clientId = clientId;
    this.ecosystem = ecosystem;
  }
}
function createInAppWalletIframeLink({ clientId, baseUrl, path, ecosystem, queryParams }) {
  const inAppWalletUrl = new URL(`${path}`, baseUrl);
  if (queryParams) {
    for (const queryKey of Object.keys(queryParams)) {
      inAppWalletUrl.searchParams.set(queryKey, queryParams[queryKey]?.toString() || "");
    }
  }
  inAppWalletUrl.searchParams.set("clientId", clientId);
  if (ecosystem?.partnerId !== void 0) {
    inAppWalletUrl.searchParams.set("partnerId", ecosystem.partnerId);
  }
  if (ecosystem?.id !== void 0) {
    inAppWalletUrl.searchParams.set("ecosystemId", ecosystem.id);
  }
  return inAppWalletUrl;
}
const IN_APP_WALLET_IFRAME_ID = "thirdweb-in-app-wallet-iframe";
async function generateWallet({ client, ecosystem, authToken }) {
  const clientFetch = getClientFetch(client, ecosystem);
  const response = await clientFetch(`${getThirdwebBaseUrl("inAppWallet")}/api/v1/enclave-wallet/generate`, {
    headers: {
      Authorization: `Bearer embedded-wallet-token:${authToken}`,
      "Content-Type": "application/json",
      "x-thirdweb-client-id": client.clientId
    },
    method: "POST"
  });
  if (!response.ok) {
    throw new Error(`Failed to generate wallet - ${response.status} ${response.statusText}`);
  }
  const { wallet } = await response.json();
  return wallet;
}
class AbstractLogin {
  /**
   * Used to manage the user's auth states. This should not be instantiated directly.
   * @internal
   */
  constructor({ baseUrl, querier, preLogin, postLogin, client, ecosystem }) {
    Object.defineProperty(this, "LoginQuerier", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "preLogin", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "postLogin", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "baseUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "ecosystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.baseUrl = baseUrl;
    this.LoginQuerier = querier;
    this.preLogin = preLogin;
    this.postLogin = postLogin;
    this.client = client;
    this.ecosystem = ecosystem;
  }
  /**
   * @internal
   */
  async sendEmailLoginOtp({ email }) {
    const result = await this.LoginQuerier.call({
      params: { email },
      procedureName: "sendThirdwebEmailLoginOtp"
    });
    return result;
  }
  /**
   *
   * @internal
   */
  async sendSmsLoginOtp({ phoneNumber }) {
    const result = await this.LoginQuerier.call({
      params: { phoneNumber },
      procedureName: "sendThirdwebSmsLoginOtp"
    });
    return result;
  }
}
class BaseLogin extends AbstractLogin {
  async authenticateWithModal() {
    return this.LoginQuerier.call({
      params: void 0,
      procedureName: "loginWithThirdwebModal",
      showIframe: true
    });
  }
  /**
   * @internal
   */
  async loginWithModal() {
    await this.preLogin();
    const result = await this.authenticateWithModal();
    return this.postLogin(result);
  }
  async authenticateWithIframe({ email }) {
    return this.LoginQuerier.call({
      params: { email },
      procedureName: "loginWithThirdwebModal",
      showIframe: true
    });
  }
  /**
   * @internal
   */
  async loginWithIframe({ email }) {
    await this.preLogin();
    const result = await this.authenticateWithIframe({ email });
    return this.postLogin(result);
  }
  async authenticateWithCustomJwt({ encryptionKey, jwt }) {
    if (!encryptionKey || encryptionKey.length === 0) {
      throw new Error("Encryption key is required for custom jwt auth");
    }
    return this.LoginQuerier.call({
      params: { encryptionKey, jwt },
      procedureName: "loginWithCustomJwt"
    });
  }
  /**
   * @internal
   */
  async loginWithCustomJwt({ encryptionKey, jwt }) {
    if (!encryptionKey || encryptionKey.length === 0) {
      throw new Error("Encryption key is required for custom jwt auth");
    }
    await this.preLogin();
    const result = await this.authenticateWithCustomJwt({ encryptionKey, jwt });
    return this.postLogin(result);
  }
  async authenticateWithCustomAuthEndpoint({ encryptionKey, payload }) {
    return this.LoginQuerier.call({
      params: { encryptionKey, payload },
      procedureName: "loginWithCustomAuthEndpoint"
    });
  }
  /**
   * @internal
   */
  async loginWithCustomAuthEndpoint({ encryptionKey, payload }) {
    if (!encryptionKey || encryptionKey.length === 0) {
      throw new Error("Encryption key is required for custom auth");
    }
    await this.preLogin();
    const result = await this.authenticateWithCustomAuthEndpoint({
      encryptionKey,
      payload
    });
    return this.postLogin(result);
  }
  async authenticateWithEmailOtp({ email, otp, recoveryCode }) {
    return this.LoginQuerier.call({
      params: { email, otp, recoveryCode },
      procedureName: "verifyThirdwebEmailLoginOtp"
    });
  }
  /**
   * @internal
   */
  async loginWithEmailOtp({ email, otp, recoveryCode }) {
    const result = await this.authenticateWithEmailOtp({
      email,
      otp,
      recoveryCode
    });
    return this.postLogin(result);
  }
  async authenticateWithSmsOtp({ phoneNumber, otp, recoveryCode }) {
    return this.LoginQuerier.call({
      params: { otp, phoneNumber, recoveryCode },
      procedureName: "verifyThirdwebSmsLoginOtp"
    });
  }
  /**
   * @internal
   */
  async loginWithSmsOtp({ phoneNumber, otp, recoveryCode }) {
    const result = await this.authenticateWithSmsOtp({
      otp,
      phoneNumber,
      recoveryCode
    });
    return this.postLogin(result);
  }
}
class Auth {
  /**
   * Used to manage the user's auth states. This should not be instantiated directly.
   * @internal
   */
  constructor({ client, querier, onAuthSuccess, ecosystem, baseUrl, localStorage }) {
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "ecosystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "AuthQuerier", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "localStorage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "onAuthSuccess", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "BaseLogin", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.client = client;
    this.ecosystem = ecosystem;
    this.AuthQuerier = querier;
    this.localStorage = localStorage;
    this.onAuthSuccess = onAuthSuccess;
    this.BaseLogin = new BaseLogin({
      baseUrl,
      client,
      ecosystem,
      postLogin: async (result) => {
        return this.postLogin(result);
      },
      preLogin: async () => {
        await this.preLogin();
      },
      querier
    });
  }
  async preLogin() {
    await this.logout();
  }
  async postLogin({ storedToken, walletDetails }) {
    if (storedToken.shouldStoreCookieString) {
      await this.localStorage.saveAuthCookie(storedToken.cookieString);
    }
    const initializedUser = await this.onAuthSuccess({
      storedToken,
      walletDetails
    });
    return initializedUser;
  }
  async loginWithAuthToken(authToken, recoveryCode) {
    if (authToken.storedToken.authProvider !== "Backend") {
      await this.preLogin();
    }
    const user = await getUserStatus({
      authToken: authToken.storedToken.cookieString,
      client: this.client,
      ecosystem: this.ecosystem
    });
    if (!user) {
      throw new Error("Cannot login, no user found for auth token");
    }
    if (user.wallets.length > 0 && user.wallets[0]?.type === "enclave") {
      return this.postLogin({
        storedToken: authToken.storedToken,
        walletDetails: {
          walletAddress: user.wallets[0].address
        }
      });
    }
    if (user.wallets.length === 0) {
      const result2 = await generateWallet({
        authToken: authToken.storedToken.cookieString,
        client: this.client,
        ecosystem: this.ecosystem
      });
      return this.postLogin({
        storedToken: authToken.storedToken,
        walletDetails: {
          walletAddress: result2.address
        }
      });
    }
    const result = await this.AuthQuerier.call({
      params: {
        recoveryCode,
        storedToken: authToken.storedToken
      },
      procedureName: "loginWithStoredTokenDetails"
    });
    return this.postLogin(result);
  }
  /**
   * Used to log the user into their thirdweb wallet on your platform via a myriad of auth providers
   * @example
   * ```typescript
   * const thirdwebInAppWallet = new InAppWalletSdk({clientId: "YOUR_CLIENT_ID", chain: "Polygon"})
   * try {
   *   const user = await thirdwebInAppWallet.auth.loginWithModal();
   *   // user is now logged in
   * } catch (e) {
   *   // User closed modal or something else went wrong during the authentication process
   *   console.error(e)
   * }
   * ```
   * @returns `{{user: InitializedUser}}` An InitializedUser object.
   */
  async loginWithModal() {
    return this.BaseLogin.loginWithModal();
  }
  async authenticateWithModal() {
    return this.BaseLogin.authenticateWithModal();
  }
  /**
   * Used to log the user into their thirdweb wallet using email OTP
   * @example
   * ```typescript
   *  // Basic Flow
   *  const thirdwebInAppWallet = new InAppWalletSdk({clientId: "", chain: "Polygon"});
   *  try {
   *    // prompts user to enter the code they received
   *    const user = await thirdwebInAppWallet.auth.loginWithThirdwebEmailOtp({ email : "you@example.com" });
   *    // user is now logged in
   *  } catch (e) {
   *    // User closed the OTP modal or something else went wrong during the authentication process
   *    console.error(e)
   *  }
   * ```
   * @param args - args.email: We will send the email an OTP that needs to be entered in order for them to be logged in.
   * @returns `{{user: InitializedUser}}` An InitializedUser object. See {@link InAppWalletSdk.getUser} for more
   */
  async loginWithIframe(args) {
    return this.BaseLogin.loginWithIframe(args);
  }
  async authenticateWithIframe(args) {
    return this.BaseLogin.authenticateWithIframe(args);
  }
  /**
   * @internal
   */
  async loginWithCustomJwt(args) {
    return this.BaseLogin.loginWithCustomJwt(args);
  }
  async authenticateWithCustomJwt(args) {
    return this.BaseLogin.authenticateWithCustomJwt(args);
  }
  /**
   * @internal
   */
  async loginWithCustomAuthEndpoint(args) {
    return this.BaseLogin.loginWithCustomAuthEndpoint(args);
  }
  async authenticateWithCustomAuthEndpoint(args) {
    return this.BaseLogin.authenticateWithCustomAuthEndpoint(args);
  }
  /**
   * A headless way to send the users at the passed email an OTP code.
   * You need to then call {@link Auth.loginWithEmailOtp} in order to complete the login process
   * @example
   * @param param0.email
   * ```typescript
   *  const thirdwebInAppWallet = new InAppWalletSdk({clientId: "", chain: "Polygon"});
   *  // sends user an OTP code
   * try {
   *    await thirdwebInAppWallet.auth.sendEmailLoginOtp({ email : "you@example.com" });
   * } catch(e) {
   *    // Error Sending user's email an OTP code
   *    console.error(e);
   * }
   *
   * // Then when your user is ready to verify their OTP
   * try {
   *    const user = await thirdwebInAppWallet.auth.verifyEmailLoginOtp({ email: "you@example.com", otp: "6-DIGIT_CODE_HERE" });
   * } catch(e) {
   *    // Error verifying the OTP code
   *    console.error(e)
   * }
   * ```
   * @param param0 - param0.email We will send the email an OTP that needs to be entered in order for them to be logged in.
   * @returns `{{ isNewUser: boolean }}` IsNewUser indicates if the user is a new user to your platform
   * @internal
   */
  async sendEmailLoginOtp({ email }) {
    return this.BaseLogin.sendEmailLoginOtp({
      email
    });
  }
  /**
   * @internal
   */
  async sendSmsLoginOtp({ phoneNumber }) {
    return this.BaseLogin.sendSmsLoginOtp({
      phoneNumber
    });
  }
  /**
   * Used to verify the otp that the user receives from thirdweb
   *
   * See {@link Auth.sendEmailLoginOtp} for how the headless call flow looks like. Simply swap out the calls to `loginWithThirdwebEmailOtp` with `verifyThirdwebEmailLoginOtp`
   * @param args - props.email We will send the email an OTP that needs to be entered in order for them to be logged in.
   * props.otp The code that the user received in their email
   * @returns `{{user: InitializedUser}}` An InitializedUser object containing the user's status, wallet, authDetails, and more
   * @internal
   */
  async loginWithEmailOtp(args) {
    await this.preLogin();
    return this.BaseLogin.loginWithEmailOtp(args);
  }
  async authenticateWithEmailOtp(args) {
    return this.BaseLogin.authenticateWithEmailOtp(args);
  }
  /**
   * @internal
   */
  async loginWithSmsOtp(args) {
    await this.preLogin();
    return this.BaseLogin.loginWithSmsOtp(args);
  }
  async authenticateWithSmsOtp(args) {
    return this.BaseLogin.authenticateWithSmsOtp(args);
  }
  /**
   * Logs any existing user out of their wallet.
   * @returns `{{success: boolean}}` true if a user is successfully logged out. false if there's no user currently logged in.
   * @internal
   */
  async logout() {
    const isRemoveAuthCookie = await this.localStorage.removeAuthCookie();
    const isRemoveUserId = await this.localStorage.removeWalletUserId();
    return {
      success: isRemoveAuthCookie || isRemoveUserId
    };
  }
}
const sendOtp = async (args) => {
  const { client, ecosystem } = args;
  const url = getLoginUrl({ authOption: args.strategy, client, ecosystem });
  const headers = {
    "Content-Type": "application/json",
    "x-client-id": client.clientId
  };
  if (ecosystem?.id) {
    headers["x-ecosystem-id"] = ecosystem.id;
  }
  if (ecosystem?.partnerId) {
    headers["x-ecosystem-partner-id"] = ecosystem.partnerId;
  }
  const body = (() => {
    switch (args.strategy) {
      case "email":
        return {
          email: args.email
        };
      case "phone":
        return {
          phone: args.phoneNumber
        };
    }
  })();
  const response = await fetch(url, {
    body: stringify(body),
    headers,
    method: "POST"
  });
  if (!response.ok) {
    const raw = await response.text();
    let message;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.message === "string") {
        message = parsed.message;
      }
    } catch {
    }
    throw new Error(message || "Failed to send verification code");
  }
  return await response.json();
};
const verifyOtp = async (args) => {
  const { client, ecosystem } = args;
  const url = getLoginCallbackUrl({
    authOption: args.strategy,
    client: args.client,
    ecosystem: args.ecosystem
  });
  const headers = {
    "Content-Type": "application/json",
    "x-client-id": client.clientId
  };
  if (ecosystem?.id) {
    headers["x-ecosystem-id"] = ecosystem.id;
  }
  if (ecosystem?.partnerId) {
    headers["x-ecosystem-partner-id"] = ecosystem.partnerId;
  }
  const body = (() => {
    switch (args.strategy) {
      case "email":
        return {
          code: args.verificationCode,
          email: args.email
        };
      case "phone":
        return {
          code: args.verificationCode,
          phone: args.phoneNumber
        };
    }
  })();
  const response = await fetch(url, {
    body: stringify(body),
    headers,
    method: "POST"
  });
  if (!response.ok) {
    throw new Error("Failed to verify verification code");
  }
  return await response.json();
};
class IFrameWallet {
  /**
   * Not meant to be initialized directly. Call {@link initializeUser} to get an instance
   * @internal
   */
  constructor({ client, ecosystem, querier, localStorage }) {
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "ecosystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "walletManagerQuerier", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "localStorage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.client = client;
    this.ecosystem = ecosystem;
    this.walletManagerQuerier = querier;
    this.localStorage = localStorage;
  }
  /**
   * Used to set-up the user device in the case that they are using incognito
   * @returns `{walletAddress : string }` The user's wallet details
   * @internal
   */
  async postWalletSetUp(authResult) {
    if (authResult.deviceShareStored) {
      await this.localStorage.saveDeviceShare(authResult.deviceShareStored, authResult.storedToken.authDetails.userWalletId);
    }
  }
  /**
   * Gets the various status states of the user
   * @example
   * ```typescript
   *  const userStatus = await Paper.getUserWalletStatus();
   *  switch (userStatus.status) {
   *  case UserWalletStatus.LOGGED_OUT: {
   *    // User is logged out, call one of the auth methods on Paper.auth to authenticate the user
   *    break;
   *  }
   *  case UserWalletStatus.LOGGED_IN_WALLET_UNINITIALIZED: {
   *    // User is logged in, but does not have a wallet associated with it
   *    // you also have access to the user's details
   *    userStatus.user.authDetails;
   *    break;
   *  }
   *  case UserWalletStatus.LOGGED_IN_NEW_DEVICE: {
   *    // User is logged in and created a wallet already, but is missing the device shard
   *    // You have access to:
   *    userStatus.user.authDetails;
   *    userStatus.user.walletAddress;
   *    break;
   *  }
   *  case UserWalletStatus.LOGGED_IN_WALLET_INITIALIZED: {
   *    // user is logged in and wallet is all set up.
   *    // You have access to:
   *    userStatus.user.authDetails;
   *    userStatus.user.walletAddress;
   *    userStatus.user.wallet;
   *    break;
   *  }
   *}
   *```
   * @returns `{GetUserWalletStatusFnReturnType}` an object to containing various information on the user statuses
   * @internal
   */
  async getUserWalletStatus() {
    const userStatus = await this.walletManagerQuerier.call({
      params: void 0,
      procedureName: "getUserStatus"
    });
    if (userStatus.status === "Logged In, Wallet Initialized") {
      return {
        status: "Logged In, Wallet Initialized",
        ...userStatus.user,
        account: await this.getAccount()
      };
    }
    if (userStatus.status === "Logged In, New Device") {
      return {
        status: "Logged In, New Device",
        ...userStatus.user
      };
    }
    if (userStatus.status === "Logged In, Wallet Uninitialized") {
      return {
        status: "Logged In, Wallet Uninitialized",
        ...userStatus.user
      };
    }
    return { status: userStatus.status };
  }
  /**
   * Returns an account that communicates with the iFrame for signing operations
   * @internal
   */
  async getAccount() {
    const querier = this.walletManagerQuerier;
    const client = this.client;
    const partnerId = this.ecosystem?.partnerId;
    const { address } = await querier.call({
      params: void 0,
      procedureName: "getAddress"
    });
    const _signTransaction = async (tx) => {
      const transaction = {
        chainId: tx.chainId,
        data: tx.data,
        gasLimit: tx.gas,
        nonce: tx.nonce,
        to: tx.to ?? void 0,
        value: tx.value
      };
      if (tx.maxFeePerGas) {
        transaction.accessList = tx.accessList;
        transaction.maxFeePerGas = tx.maxFeePerGas;
        transaction.maxPriorityFeePerGas = tx.maxPriorityFeePerGas;
        transaction.type = 2;
      } else {
        transaction.gasPrice = tx.gasPrice;
        transaction.type = 0;
      }
      const RPC_URL = getThirdwebDomains().rpc;
      const { signedTransaction } = await querier.call({
        params: {
          chainId: tx.chainId,
          partnerId,
          rpcEndpoint: `https://${tx.chainId}.${RPC_URL}`,
          transaction
          // TODO (ew) shouldnt be needed
        },
        procedureName: "signTransaction"
      });
      return signedTransaction;
    };
    return {
      address: getAddress(address),
      async sendTransaction(tx) {
        const rpcRequest = getRpcClient({
          chain: getCachedChain(tx.chainId),
          client
        });
        const signedTx = await _signTransaction(tx);
        const transactionHash = await eth_sendRawTransaction(rpcRequest, signedTx);
        trackTransaction({
          chainId: tx.chainId,
          client,
          contractAddress: tx.to ?? void 0,
          gasPrice: tx.gasPrice,
          transactionHash,
          walletAddress: address,
          walletType: "inApp"
        });
        return { transactionHash };
      },
      async signMessage({ message }) {
        const messageDecoded = (() => {
          if (typeof message === "string") {
            return message;
          }
          if (message.raw instanceof Uint8Array) {
            return message.raw;
          }
          return hexToString(message.raw);
        })();
        const { signedMessage } = await querier.call({
          params: {
            chainId: 1,
            // needs bytes or string
            // biome-ignore lint/suspicious/noExplicitAny: ethers tx transformation
            message: messageDecoded,
            partnerId
            // TODO check if we need this
          },
          procedureName: "signMessage"
        });
        return signedMessage;
      },
      async signTransaction(tx) {
        if (!tx.chainId) {
          throw new Error("chainId required in tx to sign");
        }
        return _signTransaction({
          ...tx,
          chainId: tx.chainId
        });
      },
      async signTypedData(_typedData) {
        const parsedTypedData = parseTypedData(_typedData);
        if (parsedTypedData.types?.EIP712Domain) {
          parsedTypedData.types.EIP712Domain = void 0;
        }
        const domain = parsedTypedData.domain;
        const chainId = domain?.chainId;
        const verifyingContract = domain?.verifyingContract ? { verifyingContract: domain?.verifyingContract } : {};
        const domainData = {
          ...verifyingContract,
          name: domain?.name,
          version: domain?.version
        };
        if (chainId) {
          domainData.chainId = chainId;
        }
        const RPC_URL = getThirdwebDomains().rpc;
        const { signedTypedData } = await querier.call({
          params: {
            chainId: Number.parseInt(BigInt(chainId || 1).toString()),
            domain: domainData,
            message: parsedTypedData.message,
            partnerId,
            rpcEndpoint: `https://${chainId}.${RPC_URL}`,
            types: parsedTypedData.types
            // TODO (ew) shouldnt be needed
          },
          procedureName: "signTypedDataV4"
        });
        return signedTypedData;
      }
    };
  }
}
class InAppWebConnector {
  isClientIdLegacyPaper(clientId) {
    if (clientId.indexOf("-") > 0 && clientId.length === 36) {
      return true;
    }
    return false;
  }
  /**
   * @example
   * `const thirdwebInAppWallet = new InAppWalletSdk({ clientId: "", chain: "Goerli" });`
   * @internal
   */
  constructor({ client, onAuthSuccess, ecosystem, passkeyDomain, storage }) {
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "ecosystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "querier", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "storage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "wallet", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "auth", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "passkeyDomain", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (this.isClientIdLegacyPaper(client.clientId)) {
      throw new Error("You are using a legacy clientId. Please use the clientId found on the thirdweb dashboard settings page");
    }
    const baseUrl = getThirdwebBaseUrl("inAppWallet");
    this.client = client;
    this.ecosystem = ecosystem;
    this.passkeyDomain = passkeyDomain;
    this.storage = new ClientScopedStorage({
      clientId: client.clientId,
      ecosystem,
      storage: storage ?? getDefaultStorage()
    });
    this.querier = new InAppWalletIframeCommunicator({
      baseUrl,
      clientId: client.clientId,
      ecosystem
    });
    this.auth = new Auth({
      baseUrl,
      client,
      ecosystem,
      localStorage: this.storage,
      onAuthSuccess: async (authResult) => {
        onAuthSuccess?.(authResult);
        if (authResult.storedToken.authDetails.walletType === "sharded") {
          const result = await this.querier.call({
            params: {
              storedToken: authResult.storedToken
            },
            procedureName: "migrateFromShardToEnclave"
          });
          if (!result) {
            console.warn("Failed to migrate from sharded to enclave wallet, continuing with sharded wallet");
          }
        }
        this.wallet = await this.initializeWallet(authResult.storedToken.cookieString);
        if (!this.wallet) {
          throw new Error("Failed to initialize wallet");
        }
        const deviceShareStored = "deviceShareStored" in authResult.walletDetails ? authResult.walletDetails.deviceShareStored : void 0;
        await this.wallet.postWalletSetUp({
          deviceShareStored,
          storedToken: authResult.storedToken
        });
        if (this.wallet instanceof IFrameWallet) {
          await this.querier.call({
            params: {
              authCookie: authResult.storedToken.cookieString,
              clientId: this.client.clientId,
              // For enclave wallets we won't have a device share
              deviceShareStored: "deviceShareStored" in authResult.walletDetails ? authResult.walletDetails.deviceShareStored : null,
              ecosystemId: ecosystem?.id,
              partnerId: ecosystem?.partnerId,
              walletUserId: authResult.storedToken.authDetails.userWalletId
            },
            procedureName: "initIframe"
          });
        }
        return {
          user: {
            account: await this.wallet.getAccount(),
            authDetails: authResult.storedToken.authDetails,
            status: "Logged In, Wallet Initialized",
            walletAddress: authResult.walletDetails.walletAddress
          }
        };
      },
      querier: this.querier
    });
  }
  async initializeWallet(authToken) {
    const storedAuthToken = await this.storage.getAuthCookie();
    if (!authToken && storedAuthToken === null) {
      throw new Error("No auth token provided and no stored auth token found to initialize the wallet");
    }
    const user = await getUserStatus({
      authToken: authToken || storedAuthToken,
      client: this.client,
      ecosystem: this.ecosystem
    });
    if (!user) {
      throw new Error("Cannot initialize wallet, no user logged in");
    }
    if (user.wallets.length === 0) {
      throw new Error("Cannot initialize wallet, this user does not have a wallet generated yet");
    }
    if (user.wallets[0]?.type === "enclave") {
      return new EnclaveWallet({
        address: user.wallets[0].address,
        client: this.client,
        ecosystem: this.ecosystem,
        storage: this.storage
      });
    }
    return new IFrameWallet({
      client: this.client,
      ecosystem: this.ecosystem,
      localStorage: this.storage,
      querier: this.querier
    });
  }
  /**
   * Gets the user if they're logged in
   * @example
   * ```js
   *  const user = await thirdwebInAppWallet.getUser();
   *  switch (user.status) {
   *     case UserWalletStatus.LOGGED_OUT: {
   *       // User is logged out, call one of the auth methods on thirdwebInAppWallet.auth to authenticate the user
   *       break;
   *     }
   *     case UserWalletStatus.LOGGED_IN_WALLET_INITIALIZED: {
   *       // user is logged in and wallet is all set up.
   *       // You have access to:
   *       user.status;
   *       user.authDetails;
   *       user.walletAddress;
   *       user.wallet;
   *       break;
   *     }
   * }
   * ```
   * @returns GetUser - an object to containing various information on the user statuses
   */
  async getUser() {
    if (!this.wallet) {
      const localAuthToken = await this.storage.getAuthCookie();
      if (!localAuthToken) {
        return { status: "Logged Out" };
      }
      this.wallet = await this.initializeWallet(localAuthToken);
    }
    if (!this.wallet) {
      throw new Error("Wallet not initialized");
    }
    return await this.wallet.getUserWalletStatus();
  }
  getAccount() {
    if (!this.wallet) {
      throw new Error("Wallet not initialized");
    }
    return this.wallet.getAccount();
  }
  async preAuthenticate(args) {
    return sendOtp({
      ...args,
      client: this.client,
      ecosystem: this.ecosystem
    });
  }
  async authenticateWithRedirect(strategy, mode, redirectUrl) {
    return loginWithOauthRedirect({
      authOption: strategy,
      client: this.client,
      ecosystem: this.ecosystem,
      mode,
      redirectUrl
    });
  }
  async loginWithAuthToken(authResult, recoveryCode) {
    return this.auth.loginWithAuthToken(authResult, recoveryCode);
  }
  /**
   * Authenticates the user and returns the auth token, but does not instantiate their wallet
   */
  async authenticate(args) {
    const strategy = args.strategy;
    switch (strategy) {
      case "email":
        return verifyOtp({
          ...args,
          client: this.client,
          ecosystem: this.ecosystem
        });
      case "phone":
        return verifyOtp({
          ...args,
          client: this.client,
          ecosystem: this.ecosystem
        });
      case "auth_endpoint": {
        return authEndpoint({
          client: this.client,
          ecosystem: this.ecosystem,
          payload: args.payload
        });
      }
      case "jwt":
        return customJwt({
          client: this.client,
          ecosystem: this.ecosystem,
          jwt: args.jwt
        });
      case "passkey": {
        return this.passkeyAuth(args);
      }
      case "iframe_email_verification": {
        return this.auth.authenticateWithIframe({
          email: args.email
        });
      }
      case "iframe": {
        return this.auth.authenticateWithModal();
      }
      case "apple":
      case "facebook":
      case "google":
      case "telegram":
      case "github":
      case "twitch":
      case "farcaster":
      case "line":
      case "x":
      case "tiktok":
      case "epic":
      case "steam":
      case "coinbase":
      case "discord": {
        return loginWithOauth({
          authOption: strategy,
          client: this.client,
          closeOpenedWindow: args.closeOpenedWindow,
          ecosystem: this.ecosystem,
          openedWindow: args.openedWindow
        });
      }
      case "guest": {
        return guestAuthenticate({
          client: this.client,
          ecosystem: this.ecosystem,
          storage: this.storage
        });
      }
      case "backend": {
        return backendAuthenticate({
          client: this.client,
          ecosystem: this.ecosystem,
          walletSecret: args.walletSecret
        });
      }
      case "wallet": {
        return siweAuthenticate({
          client: this.client,
          ecosystem: this.ecosystem,
          wallet: args.wallet,
          chain: args.chain
        });
      }
    }
  }
  /**
   * Authenticates the user then instantiates their wallet using the resulting auth token
   */
  async connect(args) {
    const strategy = args.strategy;
    switch (strategy) {
      case "auth_endpoint":
      case "jwt": {
        const authToken = await this.authenticate(args);
        return await this.loginWithAuthToken(authToken, args.encryptionKey);
      }
      case "iframe_email_verification": {
        return this.auth.loginWithIframe({
          email: args.email
        });
      }
      case "iframe": {
        return this.auth.loginWithModal();
      }
      case "passkey": {
        const authToken = await this.passkeyAuth(args);
        return this.loginWithAuthToken(authToken);
      }
      case "backend":
      case "phone":
      case "email":
      case "wallet":
      case "apple":
      case "facebook":
      case "google":
      case "farcaster":
      case "telegram":
      case "github":
      case "line":
      case "x":
      case "tiktok":
      case "epic":
      case "guest":
      case "coinbase":
      case "twitch":
      case "steam":
      case "discord": {
        const authToken = await this.authenticate(args);
        return await this.auth.loginWithAuthToken(authToken);
      }
      default:
        assertUnreachable(strategy);
    }
  }
  async logout() {
    return await this.auth.logout();
  }
  async passkeyAuth(args) {
    const { PasskeyWebClient } = await __vitePreload(async () => {
      const { PasskeyWebClient: PasskeyWebClient2 } = await import("./PassportHome-SJEwmPr3.js").then((n) => n.aK);
      return { PasskeyWebClient: PasskeyWebClient2 };
    }, true ? __vite__mapDeps([11,2,3,4,1,5,6,7,12,13,9,14,15,16,17,18,19,20,21,22,23]) : void 0);
    const { passkeyName, storeLastUsedPasskey = true } = args;
    const passkeyClient = new PasskeyWebClient();
    const storage = this.storage;
    if (args.type === "sign-up") {
      return registerPasskey({
        client: this.client,
        ecosystem: this.ecosystem,
        passkeyClient,
        rp: {
          id: this.passkeyDomain ?? window.location.hostname,
          name: this.passkeyDomain ?? window.document.title
        },
        storage: storeLastUsedPasskey ? storage : void 0,
        username: passkeyName
      });
    }
    return loginWithPasskey({
      client: this.client,
      ecosystem: this.ecosystem,
      passkeyClient,
      rp: {
        id: this.passkeyDomain ?? window.location.hostname,
        name: this.passkeyDomain ?? window.document.title
      },
      storage: storeLastUsedPasskey ? storage : void 0
    });
  }
  async linkProfileWithRedirect(strategy, mode, redirectUrl) {
    return loginWithOauthRedirect({
      authOption: strategy,
      client: this.client,
      ecosystem: this.ecosystem,
      mode,
      redirectUrl,
      authFlow: "link"
    });
  }
  async linkProfile(args) {
    if ("strategy" in args && socialAuthOptions.includes(args.strategy) && "mode" in args && args.mode !== "popup" && args.mode !== void 0) {
      await this.linkProfileWithRedirect(args.strategy, args.mode, "redirectUrl" in args ? args.redirectUrl : void 0);
      return [];
    }
    const { storedToken } = await this.authenticate(args);
    return await linkAccount({
      client: args.client,
      ecosystem: args.ecosystem || this.ecosystem,
      storage: this.storage,
      tokenToLink: storedToken.cookieString
    });
  }
  async unlinkProfile(profile, allowAccountDeletion) {
    return await unlinkAccount({
      allowAccountDeletion,
      client: this.client,
      ecosystem: this.ecosystem,
      profileToUnlink: profile,
      storage: this.storage
    });
  }
  async getProfiles() {
    return getLinkedProfilesInternal({
      client: this.client,
      ecosystem: this.ecosystem,
      storage: this.storage
    });
  }
}
function assertUnreachable(x, message) {
  throw new Error(`Invalid param: ${x}`);
}
function getDefaultStorage() {
  if (typeof window !== "undefined" && window.localStorage) {
    return webLocalStorage;
  }
  return inMemoryStorage;
}
export {
  InAppWebConnector
};
