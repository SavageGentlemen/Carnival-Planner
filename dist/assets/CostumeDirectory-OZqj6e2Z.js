const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ModelViewer-DUgCla6_.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/ray-grab-BRAacQ8J.js","assets/box-Bcz_qeOs.js","assets/index-CXUot43X.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css","assets/minimize-2-BEh34R84.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports, R as React } from "./vendor-swr-BEHUV5vo.js";
import { c as createLucideIcon, b as MapPin, E as ExternalLink } from "./index-CXUot43X.js";
import { S as Search } from "./search-DRRdb94Y.js";
import { B as Box } from "./box-Bcz_qeOs.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Feather = createLucideIcon("Feather", [
  ["path", { d: "M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z", key: "u4sw5n" }],
  ["line", { x1: "16", x2: "2", y1: "8", y2: "22", key: "1c47m2" }],
  ["line", { x1: "17.5", x2: "9", y1: "15", y2: "15", key: "2fj3pr" }]
]);
const bandDirectory = [
  // --- TRINIDAD CARNIVAL ---
  { name: "TRIBE Carnival", carnivalId: "trinidad", type: "mas", website: "https://tribecarnival.com", tags: ["Premium", "High Energy", "Popular"] },
  { name: "The Lost Tribe", carnivalId: "trinidad", type: "mas", website: "https://losttribecarnival.com", tags: ["Creative", "Thematic", "Premium"] },
  { name: "Bliss Carnival", carnivalId: "trinidad", type: "mas", website: "https://blisscarnival.com", tags: ["Premium", "Exclusive"] },
  { name: "YUMA Vibe", carnivalId: "trinidad", type: "mas", website: "https://yumavibe.com", tags: ["Young", "Energetic", "Party"] },
  { name: "Harts Carnival", carnivalId: "trinidad", type: "mas", website: "https://hartscarnival.com", tags: ["Traditional", "Family", "Fun"] },
  { name: "Pure Carnival", carnivalId: "trinidad", type: "mas", website: "https://pure.carnival-tribe.com", tags: ["Fun", "All Inclusive"] },
  { name: "Paparazzi Carnival", carnivalId: "trinidad", type: "mas", website: "https://paparazzicarnival.com", tags: ["Thematic", "Design"] },
  { name: "Ronnie and Caro", carnivalId: "trinidad", type: "mas", website: "https://ronnieandcaro.com", tags: ["Big Band", "Winner"] },
  { name: "K2K Alliance", carnivalId: "trinidad", type: "mas", website: "https://k2k-alliance.com", tags: ["Artistic", "Couture"] },
  { name: "Resonate Carnival", carnivalId: "trinidad", type: "mas", tags: ["New", "Vibes"] },
  { name: "Showtime Carnival", carnivalId: "trinidad", type: "mas", tags: ["Affordable", "Fun"] },
  { name: "Spirit Mas", carnivalId: "trinidad", type: "mas", tags: ["Inaugural", "Exciting"] },
  { name: "Exousia Mas", carnivalId: "trinidad", type: "mas", tags: ["Small Band", "Detailed"] },
  { name: "Just Wee and Friends", carnivalId: "trinidad", type: "mas", tags: ["J'ouvert", "Fun"] },
  // --- JAMAICA CARNIVAL ---
  { name: "Xodus Carnival", carnivalId: "jamaica", type: "mas", website: "https://xoduscarnival.com", tags: ["Premium", "Big Band"] },
  { name: "Bacchanal Jamaica", carnivalId: "jamaica", type: "mas", website: "https://bacchanaljamaica.com", tags: ["Legacy", "Big Band"] },
  { name: "Xaymaca International", carnivalId: "jamaica", type: "mas", website: "https://yardmascarnival.com", tags: ["Premium", "Vibes", "YardMas Section"] },
  { name: "Yardmas Carnival", carnivalId: "jamaica", type: "mas", website: "https://yardmascarnival.com", tags: ["Big Band", "Local"] },
  { name: "GenX Jamaica", carnivalId: "jamaica", type: "mas", website: "https://genxsjamaica.com", tags: ["Miami Link", "Fun"] },
  { name: "Ocho Rios Carnival", carnivalId: "jamaica", type: "mas", website: "https://jamaica-carnival.com", tags: ["North Coast", "Holiday"] },
  // --- MIAMI CARNIVAL ---
  { name: "GenX Carnival", carnivalId: "miami", type: "mas", website: "https://genx.carnival-tribe.com", tags: ["Big Band", "Winner"] },
  { name: "Ramajay Mas", carnivalId: "miami", type: "mas", website: "https://ramajaymas.com", tags: ["Vibes", "Party"] },
  { name: "Revel Nation", carnivalId: "miami", type: "mas", tags: ["Premium", "Service"] },
  { name: "One Island Band", carnivalId: "miami", type: "mas", website: "https://oneislandband.com", tags: ["Big Band", "Fun"] },
  { name: "Freaks Mas", carnivalId: "miami", type: "mas", website: "https://freaksmas.com", tags: ["Energy", "New York Link"] },
  { name: "Dingolay Mas", carnivalId: "miami", type: "mas", tags: ["Vibrant", "Fun"] },
  { name: "K-Paya", carnivalId: "miami", type: "mas", tags: ["Party", "Vibes"] },
  { name: "Savage Mas", carnivalId: "miami", type: "mas", tags: ["Sexy", "Fun"] },
  { name: "Euphoria Mas", carnivalId: "miami", type: "mas", tags: ["Service", "Quality"] },
  // --- NOTTING HILL ---
  { name: "UCOM (United Colours of Mas)", carnivalId: "nottinghill", type: "mas", website: "https://unitedcoloursofmas.com", tags: ["Modern", "Premium"] },
  { name: "Chocolate Nation", carnivalId: "nottinghill", type: "mas", website: "https://chocolatenationmas.com", tags: ["Vibes", "Service"] },
  { name: "Mangrove Carnival", carnivalId: "nottinghill", type: "mas", tags: ["Traditional", "Community"] },
  { name: "Gemz Mas", carnivalId: "nottinghill", type: "mas", tags: ["Sexy", "Fun"] },
  { name: "Caribbean Sessions", carnivalId: "nottinghill", type: "mas", tags: ["Party", "Inclusive"] },
  { name: "Colours Carnival", carnivalId: "nottinghill", type: "mas", tags: ["Colourful", "Fun"] },
  // --- TORONTO (CARIBANA) ---
  { name: "Saldenah Carnival", carnivalId: "toronto", type: "mas", website: "https://saldenahcarnival.com", tags: ["Legendary", "Big Band", "Winner"] },
  { name: "Carnival Nationz", carnivalId: "toronto", type: "mas", website: "https://carnivalnationz.com", tags: ["Big Band", "Vibes"] },
  { name: "Toronto Revellers", carnivalId: "toronto", type: "mas", website: "https://torontorevellers.com", tags: ["Community", "Fun"] },
  { name: "Tribal Carnival", carnivalId: "toronto", type: "mas", tags: ["Culture", "Mas"] },
  { name: "Venom Mas", carnivalId: "toronto", type: "mas", tags: ["Sexy", "Party"] },
  { name: "Fantazia", carnivalId: "toronto", type: "mas", tags: ["Fun", "Service"] },
  // --- BARBADOS (CROP OVER) ---
  { name: "Krave The Band", carnivalId: "barbados", type: "mas", website: "https://kravetheband.com", tags: ["Premium", "Luxury"] },
  { name: "Aura Experience", carnivalId: "barbados", type: "mas", website: "https://auraexperience.com", tags: ["Rihanna", "Vibes"] },
  { name: "Zulu International", carnivalId: "barbados", type: "mas", tags: ["Fun", "Party"] },
  { name: "Baje International", carnivalId: "barbados", type: "mas", tags: ["Legacy", "Service"] },
  { name: "Erup The Band", carnivalId: "barbados", type: "mas", tags: ["Energy", "Soca"] },
  // --- GRENADA (SPICEMAS) ---
  { name: "Oro Luxury Carnival", carnivalId: "grenada", type: "mas", tags: ["Premium", "Luxury"] },
  { name: "Xtravo", carnivalId: "grenada", type: "mas", tags: ["Party", "Vibes"] },
  { name: "Lavish The Band", carnivalId: "grenada", type: "mas", tags: ["Service", "Costumes"] },
  // --- ST. LUCIA ---
  { name: "Legends Carnival", carnivalId: "stlucia", type: "mas", tags: ["Big Band", "Fun"] },
  { name: "Xuovo", carnivalId: "stlucia", type: "mas", tags: ["Vibes", "Party"] },
  { name: "Fuzion Mas", carnivalId: "stlucia", type: "mas", tags: ["Premium", "Service"] },
  // --- ANTIGUA ---
  { name: "Insane Carnival", carnivalId: "antigua", type: "mas", tags: ["Fun", "Party"] },
  { name: "Myst Carnival", carnivalId: "antigua", type: "mas", tags: ["Sexy", "Vibes"] },
  { name: "Seaduced", carnivalId: "antigua", type: "mas", tags: ["Luxury", "Premium"] },
  // --- ATLANTA ---
  { name: "Madd Colors Carnival", carnivalId: "atlanta", type: "mas", website: "https://maddcolorscarnival.com/", tags: ["Premium", "#1 Band"] },
  { name: "We Kinda Ting", carnivalId: "atlanta", type: "mas", tags: ["Fun", "Local"] },
  { name: "Savage Mas", carnivalId: "atlanta", type: "mas", tags: ["Sexy", "Vibes"] },
  { name: "Panache", carnivalId: "atlanta", type: "mas", tags: ["Service", "Costumes"] }
];
const ModelViewer = React.lazy(() => __vitePreload(() => import("./ModelViewer-DUgCla6_.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]) : void 0));
function CostumeDirectory({ carnivalId, isPremium = false }) {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [selectedType, setSelectedType] = reactExports.useState("all");
  const [view3dModel, setView3dModel] = reactExports.useState(null);
  const filteredBands = reactExports.useMemo(() => {
    return bandDirectory.filter((band) => {
      if (carnivalId && band.carnivalId !== carnivalId) return false;
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = band.name.toLowerCase().includes(searchLower) || band.tags.some((tag) => tag.toLowerCase().includes(searchLower));
      const matchesType = selectedType === "all" || band.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [carnivalId, searchTerm, selectedType]);
  const carnivalName = (id) => {
    switch (id) {
      case "trinidad":
        return "Trinidad";
      case "jamaica":
        return "Jamaica";
      case "miami":
        return "Miami";
      case "nottinghill":
        return "London";
      case "toronto":
        return "Toronto";
      case "barbados":
        return "Barbados";
      case "grenada":
        return "Grenada";
      case "antigua":
        return "Antigua";
      case "stlucia":
        return "St. Lucia";
      case "atlanta":
        return "Atlanta";
      default:
        return id;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4 justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feather, { className: "w-5 h-5 text-purple-500" }),
          "Costume Bands"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
          "Find your perfect fit for ",
          carnivalId ? carnivalName(carnivalId) : "Carnival"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-64", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search bands...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 transition"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredBands.map((band, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors", children: band.name }),
              !carnivalId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-gray-500 flex items-center gap-1 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                carnivalName(band.carnivalId)
              ] })
            ] }),
            band.website && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: band.website,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "p-2 bg-gray-50 dark:bg-gray-700 rounded-full hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/40 dark:hover:text-purple-400 transition",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: band.tags.map((tag, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2 py-1 text-xs font-medium bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300 rounded-md",
              children: tag
            },
            i
          )) }),
          isPremium && band.modelUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setView3dModel({ url: band.modelUrl, usdzUrl: band.usdzUrl, title: band.name }),
              className: "mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "w-3.5 h-3.5" }),
                "Try in 3D"
              ]
            }
          )
        ]
      },
      idx
    )) }),
    filteredBands.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-gray-500 dark:text-gray-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Feather, { className: "w-12 h-12 mx-auto mb-3 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No bands found matching your search." })
    ] }),
    view3dModel && /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ModelViewer,
      {
        modelUrl: view3dModel.url,
        usdzUrl: view3dModel.usdzUrl,
        title: view3dModel.title,
        onClose: () => setView3dModel(null),
        isPremium
      }
    ) })
  ] });
}
export {
  CostumeDirectory as default
};
