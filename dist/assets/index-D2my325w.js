import { aG as ApiError, aH as Onramp, aI as chains, aJ as tokens } from "./PassportHome-SJEwmPr3.js";
import { aZ as getThirdwebBaseUrl, aR as getClientFetch } from "./index-CXUot43X.js";
async function status(options) {
  const { transactionHash, client, transactionId } = options;
  const chainId = "chainId" in options ? options.chainId : options.chain.id;
  const clientFetch = getClientFetch(client);
  const url = new URL(`${getThirdwebBaseUrl("bridge")}/v1/status`);
  url.searchParams.set("transactionHash", transactionHash);
  url.searchParams.set("chainId", chainId.toString());
  if (transactionId) {
    url.searchParams.set("transactionId", transactionId);
  }
  const response = await clientFetch(url.toString());
  if (!response.ok) {
    const errorJson = await response.json();
    throw new ApiError({
      code: errorJson.code || "UNKNOWN_ERROR",
      correlationId: errorJson.correlationId || void 0,
      message: errorJson.message || response.statusText,
      statusCode: response.status
    });
  }
  const { data } = await response.json();
  if (data.status === "FAILED") {
    return {
      paymentId: data.paymentId,
      status: "FAILED",
      transactions: data.transactions
    };
  }
  if (data.status === "PENDING") {
    return {
      destinationChainId: data.destinationChainId,
      destinationToken: data.destinationToken,
      destinationTokenAddress: data.destinationTokenAddress,
      originAmount: BigInt(data.originAmount),
      originChainId: data.originChainId,
      originToken: data.originToken,
      originTokenAddress: data.originTokenAddress,
      paymentId: data.paymentId,
      purchaseData: data.purchaseData,
      receiver: data.receiver,
      sender: data.sender,
      status: "PENDING",
      transactions: data.transactions
    };
  }
  if (data.status === "NOT_FOUND") {
    return {
      paymentId: data.paymentId,
      status: "NOT_FOUND",
      transactions: []
    };
  }
  return {
    destinationAmount: BigInt(data.destinationAmount),
    destinationChainId: data.destinationChainId,
    destinationToken: data.destinationToken,
    destinationTokenAddress: data.destinationTokenAddress,
    originAmount: BigInt(data.originAmount),
    originChainId: data.originChainId,
    originToken: data.originToken,
    originTokenAddress: data.originTokenAddress,
    paymentId: data.paymentId,
    purchaseData: data.purchaseData,
    receiver: data.receiver,
    sender: data.sender,
    status: "COMPLETED",
    transactions: data.transactions
  };
}
const Status = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  status
}, Symbol.toStringTag, { value: "Module" }));
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Onramp,
  chains,
  status,
  tokens
}, Symbol.toStringTag, { value: "Module" }));
export {
  Status as S,
  index as i
};
