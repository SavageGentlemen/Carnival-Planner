import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { u as useScreenContext, i as Container, M as ModalHeader, I as Img, j as iconSize, k as ModalTitle, S as Spacer, l as ConnectWalletSocialOptions, T as TOS, P as PoweredByThirdweb, m as useSelectionData, o as useSetSelectionData, p as useInAppWalletLocale, L as LoadingScreen, O as OTPLoginUI, q as PassKeyLogin, W as WalletAuth, r as SocialLogin, G as GuestLogin } from "./PassportHome-SJEwmPr3.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
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
function InAppWalletFormUIScreen(props) {
  const isCompact = props.size === "compact";
  const { initialScreen, screen } = useScreenContext();
  const [isApproved, setIsApproved] = reactExports.useState(false);
  const isInitialScreen = screen === props.wallet && initialScreen === props.wallet;
  const onBack = isInitialScreen && !props.isLinking ? void 0 : props.goBack;
  return jsxRuntimeExports.jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, p: "lg", style: {
    minHeight: "250px"
  }, children: [isCompact && (isInitialScreen ? jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(ModalHeader, { leftAligned: !props.isLinking, onBack, title: jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [!props.meta?.titleIconUrl ? null : jsxRuntimeExports.jsx(Img, { client: props.client, height: iconSize.md, src: props.meta?.titleIconUrl, width: iconSize.md }), jsxRuntimeExports.jsx(ModalTitle, { children: props.meta?.title ?? props.inAppWalletLocale.emailLoginScreen.title })] }) }), jsxRuntimeExports.jsx(Spacer, { y: "lg" })] }) : jsxRuntimeExports.jsx(ModalHeader, { onBack, title: props.inAppWalletLocale.signIn })), jsxRuntimeExports.jsx(Container, { center: "y", expand: true, flex: "column", p: isCompact ? void 0 : "lg", children: jsxRuntimeExports.jsx(ConnectWalletSocialOptions, { ...props, disabled: props.meta?.requireApproval && !isApproved, locale: props.inAppWalletLocale }) }), isCompact && (props.meta?.showThirdwebBranding !== false || props.meta?.termsOfServiceUrl || props.meta?.privacyPolicyUrl) && jsxRuntimeExports.jsx(Spacer, { y: "xl" }), jsxRuntimeExports.jsxs(Container, { flex: "column", gap: "lg", children: [jsxRuntimeExports.jsx(TOS, { isApproved, locale: props.connectLocale.agreement, onApprove: () => {
    setIsApproved(!isApproved);
  }, privacyPolicyUrl: props.meta?.privacyPolicyUrl, requireApproval: props.meta?.requireApproval, termsOfServiceUrl: props.meta?.termsOfServiceUrl }), props.meta?.showThirdwebBranding !== false && jsxRuntimeExports.jsx(PoweredByThirdweb, {})] })] });
}
function InAppWalletConnectUI(props) {
  const data = useSelectionData();
  const setSelectionData = useSetSelectionData();
  const state = data;
  const localeId = props.connectLocale.id;
  const locale = useInAppWalletLocale(localeId);
  const { initialScreen } = useScreenContext();
  if (!locale) {
    return jsxRuntimeExports.jsx(LoadingScreen, {});
  }
  const goBackToMain = () => {
    if (initialScreen === props.wallet) {
      setSelectionData({});
    } else {
      props.goBack?.();
      setSelectionData({});
    }
  };
  const done = () => {
    props.done();
    setSelectionData({});
  };
  const otpUserInfo = state?.emailLogin ? { email: state.emailLogin } : state?.phoneLogin ? { phone: state.phoneLogin } : void 0;
  if (otpUserInfo) {
    return jsxRuntimeExports.jsx(OTPLoginUI, { chain: props.chain, client: props.client, done, goBack: goBackToMain, isLinking: props.isLinking, locale, size: props.size, userInfo: otpUserInfo, wallet: props.wallet });
  }
  if (state?.passkeyLogin) {
    return jsxRuntimeExports.jsx(PassKeyLogin, { chain: props.chain, client: props.client, done, isLinking: props.isLinking, locale: props.connectLocale, onBack: goBackToMain, size: props.size, wallet: props.wallet });
  }
  if (state?.walletLogin) {
    return jsxRuntimeExports.jsx(WalletAuth, { chain: props.chain, client: props.client, done, inAppLocale: locale, isLinking: state.walletLogin.linking, locale: props.connectLocale, meta: props.meta, onBack: goBackToMain || (() => setSelectionData({})), size: props.size, wallet: props.wallet, walletConnect: props.walletConnect });
  }
  if (state?.socialLogin) {
    return jsxRuntimeExports.jsx(SocialLogin, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, done, goBack: goBackToMain, isLinking: props.isLinking, locale, size: props.size, socialAuth: state.socialLogin.type, state, wallet: props.wallet });
  }
  if (state?.guestLogin) {
    return jsxRuntimeExports.jsx(GuestLogin, { client: props.client, connectLocale: props.connectLocale, done, goBack: goBackToMain, locale, size: props.size, state, wallet: props.wallet });
  }
  return jsxRuntimeExports.jsx(InAppWalletFormUIScreen, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, done, goBack: props.goBack, inAppWalletLocale: locale, isLinking: props.isLinking, meta: props.meta, select: () => {
  }, size: props.size, wallet: props.wallet });
}
export {
  InAppWalletConnectUI as default
};
