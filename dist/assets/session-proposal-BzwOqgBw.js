import { d as saveSession, e as disconnectWalletConnectSession, h as getSessions } from "./PassportHome-SJEwmPr3.js";
import "./vendor-3d-C6aqP7jv.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-swr-BEHUV5vo.js";
import "./index-CXUot43X.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
import "./trophy-hLhL8QOQ.js";
import "./alert-circle-lhG861Pl.js";
import "./bundler-Dmn5v2kr.js";
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
async function onSessionProposal(options) {
  const { wallet, walletConnectClient, event, chains, onConnect } = options;
  const account = wallet.getAccount();
  if (!account) {
    throw new Error("No account connected to provided wallet");
  }
  const origin = event.verifyContext?.verified?.origin;
  if (origin) {
    await disconnectExistingSessions({ origin, walletConnectClient });
  }
  const session = await acceptSessionProposal({
    account,
    chains,
    sessionProposal: event,
    walletConnectClient
  });
  await saveSession(session);
  wallet.subscribe("disconnect", () => {
    disconnectWalletConnectSession({ session, walletConnectClient });
  });
  onConnect?.(session);
}
async function disconnectExistingSessions({ walletConnectClient, origin }) {
  const sessions = await getSessions();
  for (const session of sessions) {
    if (session.origin === origin) {
      await disconnectWalletConnectSession({ session, walletConnectClient });
    }
  }
}
async function acceptSessionProposal({ account, walletConnectClient, sessionProposal, chains }) {
  if (!sessionProposal.params.requiredNamespaces?.eip155 && !sessionProposal.params.optionalNamespaces?.eip155) {
    throw new Error("No EIP155 namespace found in Wallet Connect session proposal");
  }
  const namespaces = {
    chains: [
      ...Array.from(/* @__PURE__ */ new Set([
        ...sessionProposal.params.requiredNamespaces?.eip155?.chains?.map((chain) => `${chain}:${account.address}`) ?? [],
        ...sessionProposal.params.optionalNamespaces?.eip155?.chains?.map((chain) => `${chain}:${account.address}`) ?? [],
        ...chains?.map((chain) => `eip155:${chain.id}:${account.address}`) ?? []
      ]))
    ],
    events: [
      ...sessionProposal.params.requiredNamespaces?.eip155?.events ?? [],
      ...sessionProposal.params.optionalNamespaces?.eip155?.events ?? []
    ],
    methods: [
      ...sessionProposal.params.requiredNamespaces?.eip155?.methods ?? [],
      ...sessionProposal.params.optionalNamespaces?.eip155?.methods ?? []
    ]
  };
  const approval = await walletConnectClient.approve({
    id: sessionProposal.id,
    namespaces: {
      eip155: {
        accounts: namespaces.chains,
        events: namespaces.events,
        methods: namespaces.methods
      }
    }
  });
  const session = await approval.acknowledged();
  return {
    origin: sessionProposal.verifyContext?.verified?.origin || "Unknown origin",
    topic: session.topic
  };
}
export {
  acceptSessionProposal,
  disconnectExistingSessions,
  onSessionProposal
};
