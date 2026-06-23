import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import "./vendor-firebase-data-O6IN0zfq.js";
import { c as createLucideIcon, i as Ticket, N as Globe, O as Shield, W as Wallet, E as ExternalLink, M as Music, Q as PartyPopper, U as Users, C as Calendar, b as MapPin } from "./index-CXUot43X.js";
import { t as truncateAddress, g as getExplorerUrl, I as Instagram, T as Twitter } from "./web3Service-HPXyfGxN.js";
import { U as User } from "./user-B1jUIL0e.js";
import { P as Pen } from "./pen-BlIHjA5h.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Plane = createLucideIcon("Plane", [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8"
    }
  ]
]);
const COUNTRY_FLAGS = {
  "trinidad": "🇹🇹",
  "jamaica": "🇯🇲",
  "barbados": "🇧🇧",
  "grenada": "🇬🇩",
  "stlucia": "🇱🇨",
  "antigua": "🇦🇬",
  "bahamas": "🇧🇸",
  "bermuda": "🇧🇲",
  "stmaarten": "🇸🇽",
  "stkitts-sugar-mas": "🇰🇳",
  "nevis": "🇰🇳",
  "dominica": "🇩🇲",
  "vincymas": "🇻🇨",
  "stthomas": "🇻🇮",
  "stcroix": "🇻🇮",
  "guyana": "🇬🇾",
  "miami": "🇺🇸",
  "atlanta": "🇺🇸",
  "ny-labor-day": "🇺🇸",
  "hollywood": "🇺🇸",
  "tampa": "🇺🇸",
  "toronto": "🇨🇦",
  "nottinghill": "🇬🇧",
  "japan": "🇯🇵",
  "cayman-batabano": "🇰🇾",
  "tobago": "🇹🇹",
  "caymas": "🇺🇸"
};
const CARNIVAL_NAMES = {
  "trinidad": "Trinidad",
  "jamaica": "Jamaica",
  "barbados": "Crop Over",
  "grenada": "Spicemas",
  "stlucia": "St. Lucia",
  "antigua": "Antigua",
  "miami": "Miami",
  "toronto": "Caribana",
  "nottinghill": "Notting Hill",
  "vincymas": "Vincy Mas",
  "stmaarten": "St. Maarten",
  "atlanta": "Atlanta",
  "ny-labor-day": "NY Labor Day",
  "bahamas": "Bahamas",
  "bermuda": "Bermuda"
};
function MasqueraderProfile({
  profileData,
  isOwnProfile,
  onEdit,
  currentUser
}) {
  const [loading, setLoading] = reactExports.useState(false);
  if (!profileData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] text-gray-500 dark:text-gray-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-16 h-16 mb-4 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: "Profile not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "This masquerader hasn't created a public profile yet." })
    ] });
  }
  const {
    displayName = "Carnival Lover",
    username,
    bio = "",
    profilePhoto,
    coverPhoto,
    isPublic,
    carnivalHistory = [],
    stats = {},
    socialLinks = {},
    walletAddress,
    mintedStampCount = 0,
    mintedAchievementCount = 0
  } = profileData;
  const countriesVisited = [...new Set(carnivalHistory.map((c) => c.carnivalId))];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto animate-fadeIn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 md:h-64 rounded-t-3xl overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400", children: [
      coverPhoto && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: coverPhoto, alt: "Cover", className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }),
      isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 right-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: profileData.onAccessPromoter,
            className: "bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold hover:bg-white/30 transition-colors flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-3.5 h-3.5" }),
              profileData.isPromoter ? "Promoter Dashboard" : "Become a Promoter"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onEdit,
            className: "p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-5 h-5 text-white" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 flex items-center gap-2", children: isPublic ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-full text-green-200 text-xs font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5" }),
        " Public"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 px-3 py-1 bg-gray-500/20 backdrop-blur-md rounded-full text-gray-200 text-xs font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" }),
        " Private"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-6 pb-6 bg-white dark:bg-gray-800 rounded-b-3xl shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-16 left-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500", children: profilePhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profilePhoto, alt: displayName, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-12 h-12 text-white" }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-20 md:pt-6 md:ml-40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2", children: displayName }),
            username && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 dark:text-gray-400", children: [
              "@",
              username
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
            walletAddress ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: getExplorerUrl(walletAddress, "address"),
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3.5 h-3.5" }),
                  truncateAddress(walletAddress),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
                ]
              }
            ) : isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: onEdit,
                className: "flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white text-xs font-bold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg shadow-indigo-500/25 animate-pulse",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3.5 h-3.5" }),
                  "Connect Wallet"
                ]
              }
            ),
            socialLinks.instagram && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://instagram.com/${socialLinks.instagram}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "p-2 bg-pink-100 dark:bg-pink-900/30 rounded-full text-pink-600 dark:text-pink-400 hover:scale-110 transition-transform",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "w-5 h-5" })
              }
            ),
            socialLinks.twitter && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://twitter.com/${socialLinks.twitter}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-500 dark:text-blue-400 hover:scale-110 transition-transform",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "w-5 h-5" })
              }
            ),
            socialLinks.tiktok && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://tiktok.com/@${socialLinks.tiktok}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-5 h-5" })
              }
            )
          ] })
        ] }),
        bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-gray-600 dark:text-gray-300 max-w-2xl", children: bio })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { className: "w-6 h-6 mx-auto mb-2 text-purple-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: carnivalHistory.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Carnivals" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plane, { className: "w-6 h-6 mx-auto mb-2 text-blue-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: countriesVisited.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Countries" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 mx-auto mb-2 text-orange-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: [...new Set(carnivalHistory.map((c) => c.band).filter(Boolean))].length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Bands" })
        ] }),
        walletAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-6 h-6 mx-auto mb-2 text-indigo-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: mintedStampCount + mintedAchievementCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "On-Chain" })
        ] })
      ] })
    ] }),
    carnivalHistory.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-purple-500" }),
        "Carnival History"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: carnivalHistory.sort((a, b) => (b.year || 0) - (a.year || 0)).map((carnival, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: COUNTRY_FLAGS[carnival.carnivalId] || "🎭" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-gray-900 dark:text-white", children: [
                CARNIVAL_NAMES[carnival.carnivalId] || carnival.carnivalId,
                carnival.year && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 font-normal ml-2", children: carnival.year })
              ] }),
              carnival.band && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
                carnival.band,
                carnival.section && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1", children: [
                  "• ",
                  carnival.section
                ] })
              ] })
            ] })
          ]
        },
        idx
      )) })
    ] }),
    countriesVisited.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-pink-500" }),
        "Countries Visited"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: [...new Set(countriesVisited.map((c) => COUNTRY_FLAGS[c] || "🏳️"))].map((flag, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl hover:scale-125 transition-transform cursor-default", children: flag }, idx)) })
    ] })
  ] });
}
export {
  MasqueraderProfile as default
};
