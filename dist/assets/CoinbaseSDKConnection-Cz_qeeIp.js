import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { C as ConnectingScreen } from "./PassportHome-SJEwmPr3.js";
import "./vendor-maps-DCMhh9kT.js";
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
function ExternalWalletConnectUI(props) {
  const { onBack, done, wallet, walletInfo, onGetStarted, locale } = props;
  const [errorConnecting, setErrorConnecting] = reactExports.useState(false);
  const connect = reactExports.useCallback(() => {
    setErrorConnecting(false);
    wallet.connect({
      chain: props.chain,
      client: props.client
    }).then(() => {
      done();
    }).catch((e) => {
      console.error(e);
      setErrorConnecting(true);
    });
  }, [props.client, wallet, props.chain, done]);
  const scanStarted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (scanStarted.current) {
      return;
    }
    scanStarted.current = true;
    connect();
  }, [connect]);
  return jsxRuntimeExports.jsx(ConnectingScreen, { client: props.client, errorConnecting, locale: {
    failed: locale.connectionScreen.failed,
    getStartedLink: locale.getStartedLink,
    inProgress: locale.connectionScreen.inProgress,
    instruction: locale.connectionScreen.instruction,
    tryAgain: locale.connectionScreen.retry
  }, onBack, onGetStarted, onRetry: connect, size: props.size, walletId: wallet.id, walletName: walletInfo.name });
}
export {
  ExternalWalletConnectUI as default
};
