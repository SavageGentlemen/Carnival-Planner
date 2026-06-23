const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/switch-chain-Bg4ThaRr.js","assets/index-CXUot43X.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { aB as checksumAddress, y as hexToBigInt, o as getCachedChain, z as hexToNumber } from "./index-CXUot43X.js";
import { F as prepareTransaction, l as sendTransaction } from "./bundler-Dmn5v2kr.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
async function handleSendRawTransactionRequest(options) {
  const { account, chainId, params: [rawTransaction] } = options;
  if (!account.sendRawTransaction) {
    throw new Error("The current account does not support sending raw transactions");
  }
  const txResult = await account.sendRawTransaction({
    chainId,
    rawTransaction
  });
  return txResult.transactionHash;
}
function validateAccountAddress(account, address) {
  if (checksumAddress(account.address) !== checksumAddress(address)) {
    throw new Error(`Failed to validate account address (${account.address}), differs from ${address}`);
  }
}
function parseEip155ChainId(chainId) {
  const chainIdParts = chainId.split(":");
  const chainIdAsNumber = Number.parseInt(chainIdParts[1] ?? "0");
  if (chainIdParts.length !== 2 || chainIdParts[0] !== "eip155" || chainIdAsNumber === 0 || !chainIdAsNumber) {
    throw new Error(`Invalid chainId ${chainId}, should have the format 'eip155:1'`);
  }
  return chainIdAsNumber;
}
async function handleSendTransactionRequest(options) {
  const { account, chainId, thirdwebClient, params: [transaction] } = options;
  if (transaction.from !== void 0) {
    validateAccountAddress(account, transaction.from);
  }
  const preparedTransaction = prepareTransaction({
    chain: getCachedChain(chainId),
    client: thirdwebClient,
    data: transaction.data,
    gas: transaction.gas ? hexToBigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? hexToBigInt(transaction.gasPrice) : void 0,
    to: transaction.to,
    value: transaction.value ? hexToBigInt(transaction.value) : void 0
  });
  const txResult = await sendTransaction({
    account,
    transaction: preparedTransaction
  });
  return txResult.transactionHash;
}
async function handleSignRequest(options) {
  const { account, params } = options;
  validateAccountAddress(account, params[1]);
  return account.signMessage({ message: { raw: params[0] } });
}
async function handleSignTransactionRequest(options) {
  const { account, params: [transaction] } = options;
  if (!account.signTransaction) {
    throw new Error("The current account does not support signing transactions");
  }
  if (transaction.from !== void 0) {
    validateAccountAddress(account, transaction.from);
  }
  return account.signTransaction({
    data: transaction.data,
    gas: transaction.gas ? hexToBigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? hexToBigInt(transaction.gasPrice) : void 0,
    nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
    to: transaction.to,
    value: transaction.value ? hexToBigInt(transaction.value) : void 0
  });
}
async function handleSignTypedDataRequest(options) {
  const { account, params } = options;
  validateAccountAddress(account, params[0]);
  return account.signTypedData(
    // The data could be sent to us as a string or object, depending on the level of parsing on the client side
    typeof params[1] === "string" ? JSON.parse(params[1]) : params[1]
  );
}
async function fulfillRequest(options) {
  const { wallet, walletConnectClient, thirdwebClient, event: { topic, id, params: { chainId: rawChainId, request } }, handlers } = options;
  const account = wallet.getAccount();
  if (!account) {
    throw new Error("No account connected to provided wallet");
  }
  let result;
  try {
    switch (request.method) {
      case "personal_sign": {
        if (handlers?.personal_sign) {
          result = await handlers.personal_sign({
            account,
            params: request.params
          });
        } else {
          result = await handleSignRequest({
            account,
            params: request.params
          });
        }
        break;
      }
      case "eth_sign": {
        if (handlers?.eth_sign) {
          result = await handlers.eth_sign({
            account,
            params: request.params
          });
        } else {
          result = await handleSignRequest({
            account,
            params: request.params
          });
        }
        break;
      }
      case "eth_signTypedData": {
        if (handlers?.eth_signTypedData) {
          result = await handlers.eth_signTypedData({
            account,
            params: request.params
          });
        } else {
          result = await handleSignTypedDataRequest({
            account,
            params: request.params
          });
        }
        break;
      }
      case "eth_signTypedData_v4": {
        if (handlers?.eth_signTypedData_v4) {
          result = await handlers.eth_signTypedData_v4({
            account,
            params: request.params
          });
        } else {
          result = await handleSignTypedDataRequest({
            account,
            params: request.params
          });
        }
        break;
      }
      case "eth_signTransaction": {
        if (handlers?.eth_signTransaction) {
          result = await handlers.eth_signTransaction({
            account,
            params: request.params
          });
        } else {
          result = await handleSignTransactionRequest({
            account,
            params: request.params
          });
        }
        break;
      }
      case "eth_sendTransaction": {
        const chainId = parseEip155ChainId(rawChainId);
        if (handlers?.eth_sendTransaction) {
          result = await handlers.eth_sendTransaction({
            account,
            chainId,
            params: request.params
          });
        } else {
          result = await handleSendTransactionRequest({
            account,
            chainId,
            params: request.params,
            thirdwebClient
          });
        }
        break;
      }
      case "eth_sendRawTransaction": {
        const chainId = parseEip155ChainId(rawChainId);
        if (handlers?.eth_sendRawTransaction) {
          result = await handlers.eth_sendRawTransaction({
            account,
            chainId,
            params: request.params
          });
        } else {
          result = await handleSendRawTransactionRequest({
            account,
            chainId,
            params: request.params
          });
        }
        break;
      }
      case "wallet_addEthereumChain": {
        if (handlers?.wallet_addEthereumChain) {
          result = await handlers.wallet_addEthereumChain({
            params: request.params,
            wallet
          });
        } else {
          throw new Error("Unsupported request method: wallet_addEthereumChain");
        }
        break;
      }
      case "wallet_switchEthereumChain": {
        if (handlers?.wallet_switchEthereumChain) {
          result = await handlers.wallet_switchEthereumChain({
            params: request.params,
            wallet
          });
        } else {
          const { handleSwitchChain } = await __vitePreload(async () => {
            const { handleSwitchChain: handleSwitchChain2 } = await import("./switch-chain-Bg4ThaRr.js");
            return { handleSwitchChain: handleSwitchChain2 };
          }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0);
          result = await handleSwitchChain({
            params: request.params,
            wallet
          });
        }
        break;
      }
      default: {
        const potentialHandler = handlers?.[request.method];
        if (potentialHandler) {
          result = await potentialHandler({
            account,
            chainId: parseEip155ChainId(rawChainId),
            params: request.params
          });
        } else {
          throw new Error(`Unsupported request method: ${request.method}`);
        }
      }
    }
  } catch (error) {
    result = {
      code: typeof error === "object" && error !== null && "code" in error ? error.code : 500,
      message: typeof error === "object" && error !== null && "message" in error ? error.message : "Unknown error"
    };
  }
  walletConnectClient.respond({
    response: {
      id,
      jsonrpc: "2.0",
      result
    },
    topic
  });
}
export {
  fulfillRequest
};
