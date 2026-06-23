const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ARWaypoint-NPcZeQcn.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/index-CXUot43X.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css","assets/plus-BHAJcjwt.js","assets/shirt-z6cB87UO.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports, R as React } from "./vendor-swr-BEHUV5vo.js";
import { M as MapContainer, T as TileLayer, a as Marker, P as Popup, u as useMap, L } from "./vendor-maps-DCMhh9kT.js";
import { c as createLucideIcon, b as MapPin, m as Eye, U as Users, Q as PartyPopper, T as Trash2 } from "./index-CXUot43X.js";
import { P as Plus } from "./plus-BHAJcjwt.js";
import { S as Shirt } from "./shirt-z6cB87UO.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Compass = createLucideIcon("Compass", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76", key: "m9r19z" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Home = createLucideIcon("Home", [
  ["path", { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "y5dka4" }],
  ["polyline", { points: "9 22 9 12 15 12 15 22", key: "e2us08" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Navigation = createLucideIcon("Navigation", [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
]);
const ARWaypoint = React.lazy(() => __vitePreload(() => import("./ARWaypoint-NPcZeQcn.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]) : void 0));
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
});
const createColoredIcon = (color) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};
const PIN_TYPES = {
  accommodation: { label: "Accommodation", color: "#3B82F6", icon: Home },
  costume: { label: "Costume Pickup", color: "#F59E0B", icon: Shirt },
  fete: { label: "Fete Location", color: "#EC4899", icon: PartyPopper },
  meetup: { label: "Meetup Spot", color: "#10B981", icon: Users },
  scraped: { label: "Live Events", color: "#8B5CF6", icon: MapPin }
};
function MapUpdater({ center, zoom }) {
  const map = useMap();
  reactExports.useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, map]);
  return null;
}
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
const CARNIVAL_CENTERS = {
  "trinidad": { center: [10.6918, -61.2225], zoom: 11, country: "Trinidad & Tobago" },
  "stkitts-sugar-mas": { center: [17.3026, -62.7177], zoom: 12, country: "St. Kitts" },
  "stcroix": { center: [17.7246, -64.8348], zoom: 11, country: "St. Croix, USVI" },
  "dominica": { center: [15.415, -61.371], zoom: 11, country: "Dominica" },
  "aruba": { center: [12.5211, -69.9683], zoom: 12, country: "Aruba" },
  "guyana-mashramani": { center: [6.8013, -58.1551], zoom: 12, country: "Guyana" },
  "guyana": { center: [6.8013, -58.1551], zoom: 12, country: "Guyana" },
  // Guyana Independence
  "guyana-independence": { center: [6.8013, -58.1551], zoom: 12, country: "Guyana" },
  "jamaica": { center: [18.0179, -76.8099], zoom: 11, country: "Jamaica" },
  "stmaarten": { center: [18.0425, -63.0548], zoom: 12, country: "St. Maarten" },
  "bahamas": { center: [25.0343, -77.3963], zoom: 12, country: "Bahamas" },
  "bermuda": { center: [32.3078, -64.7505], zoom: 13, country: "Bermuda" },
  "vincymas": { center: [13.1587, -61.2248], zoom: 12, country: "St. Vincent" },
  "antigua": { center: [17.1274, -61.8468], zoom: 12, country: "Antigua" },
  "stlucia": { center: [14.0101, -60.987], zoom: 11, country: "St. Lucia" },
  "tobago": { center: [11.1889, -60.732], zoom: 11, country: "Tobago" },
  "nottinghill": { center: [51.5156, -0.205], zoom: 14, country: "London, UK" },
  "miami": { center: [25.7617, -80.1918], zoom: 11, country: "Miami, FL" },
  "tampa": { center: [27.9506, -82.4572], zoom: 12, country: "Tampa, FL" },
  "cayman-batabano": { center: [19.2869, -81.3674], zoom: 13, country: "Cayman Islands" },
  "stthomas": { center: [18.3358, -64.8963], zoom: 13, country: "St. Thomas, USVI" },
  "atlanta": { center: [33.749, -84.388], zoom: 12, country: "Atlanta, GA" },
  "hollywood": { center: [34.0928, -118.3287], zoom: 13, country: "Hollywood, CA" },
  "caymas": { center: [19.2869, -81.3674], zoom: 13, country: "Cayman Islands" },
  "toronto": { center: [43.65107, -79.347015], zoom: 12, country: "Toronto, Canada" },
  "barbados": { center: [13.1939, -59.5432], zoom: 12, country: "Barbados" },
  "nevis": { center: [17.15, -62.58], zoom: 12, country: "Nevis" },
  "grenada": { center: [12.0529, -61.7523], zoom: 12, country: "Grenada" },
  "ny-labor-day": { center: [40.6782, -73.9442], zoom: 13, country: "Brooklyn, NY" },
  "japan": { center: [35.6762, 139.6503], zoom: 10, country: "Tokyo, Japan" }
};
function FeteMap({ locations = [], scrapedEvents = [], onLocationsChange, carnivalName, carnivalId, isPremium = false }) {
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const [newPin, setNewPin] = reactExports.useState({ name: "", type: "fete", lat: "", lng: "" });
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [searchResults, setSearchResults] = reactExports.useState([]);
  const [isSearching, setIsSearching] = reactExports.useState(false);
  const [arTarget, setArTarget] = reactExports.useState(null);
  const [arRoadMode, setArRoadMode] = reactExports.useState(false);
  const accommodation = locations.find((loc) => loc.type === "accommodation");
  const carnivalConfig = CARNIVAL_CENTERS[carnivalId] || CARNIVAL_CENTERS["trinidad"];
  const defaultCenter = reactExports.useMemo(() => {
    if (accommodation) return [accommodation.lat, accommodation.lng];
    if (locations.length > 0) return [locations[0].lat, locations[0].lng];
    const eventWithCoord = scrapedEvents.find((e) => e.lat && e.lng);
    if (eventWithCoord) return [eventWithCoord.lat, eventWithCoord.lng];
    return carnivalConfig.center;
  }, [locations, accommodation, carnivalConfig, scrapedEvents]);
  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setSearchResults(data.slice(0, 5));
    } catch (error) {
      console.error("Search error:", error);
    }
    setIsSearching(false);
  };
  const selectSearchResult = (result) => {
    setNewPin({
      ...newPin,
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      name: newPin.name || result.display_name.split(",")[0]
    });
    setSearchResults([]);
    setSearchQuery("");
  };
  const addLocation = () => {
    if (!newPin.name || !newPin.lat || !newPin.lng) return;
    const newLocation = {
      id: Date.now().toString(),
      name: newPin.name,
      type: newPin.type,
      lat: parseFloat(newPin.lat),
      lng: parseFloat(newPin.lng)
    };
    onLocationsChange([...locations, newLocation]);
    setNewPin({ name: "", type: "fete", lat: "", lng: "" });
    setShowAddForm(false);
  };
  const removeLocation = (id) => {
    onLocationsChange(locations.filter((loc) => loc.id !== id));
  };
  const getDistanceFromAccommodation = (loc) => {
    if (!accommodation || loc.type === "accommodation") return null;
    const dist = calculateDistance(accommodation.lat, accommodation.lng, loc.lat, loc.lng);
    if (dist < 1) return `${Math.round(dist * 1e3)}m`;
    return `${dist.toFixed(1)}km`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-purple-500" }),
          "Fete Map - ",
          carnivalName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400 ml-7", children: [
          "📍 ",
          carnivalConfig.country
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        isPremium && (locations.length > 0 || scrapedEvents.some((e) => e.lat && e.lng)) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setArRoadMode(true),
            className: "flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm rounded-lg hover:from-indigo-500 hover:to-purple-500 transition shadow-lg shadow-indigo-500/25",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
              "AR Road Mode"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setShowAddForm(!showAddForm),
            className: "flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Add Pin"
            ]
          }
        )
      ] })
    ] }),
    showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Location name",
            value: newPin.name,
            onChange: (e) => setNewPin({ ...newPin, name: e.target.value }),
            className: "px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: newPin.type,
            onChange: (e) => setNewPin({ ...newPin, type: e.target.value }),
            className: "px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white",
            children: Object.entries(PIN_TYPES).map(([key, { label }]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: key, children: label }, key))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search for a place...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            onKeyPress: (e) => e.key === "Enter" && searchLocation(),
            className: "flex-1 px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: searchLocation,
            disabled: isSearching,
            className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50",
            children: isSearching ? "..." : "Search"
          }
        )
      ] }),
      searchResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "bg-white dark:bg-gray-600 border dark:border-gray-500 rounded-lg max-h-40 overflow-y-auto", children: searchResults.map((result, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "li",
        {
          onClick: () => selectSearchResult(result),
          className: "px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer text-sm truncate dark:text-white",
          children: result.display_name
        },
        idx
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            step: "any",
            placeholder: "Latitude",
            value: newPin.lat,
            onChange: (e) => setNewPin({ ...newPin, lat: e.target.value }),
            className: "px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            step: "any",
            placeholder: "Longitude",
            value: newPin.lng,
            onChange: (e) => setNewPin({ ...newPin, lng: e.target.value }),
            className: "px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: addLocation,
            disabled: !newPin.name || !newPin.lat || !newPin.lng,
            className: "flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed",
            children: "Add Location"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowAddForm(false),
            className: "px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400",
            children: "Cancel"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[400px] rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      MapContainer,
      {
        center: defaultCenter,
        zoom: carnivalConfig.zoom,
        style: { height: "100%", width: "100%" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TileLayer,
            {
              attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapUpdater, { center: defaultCenter, zoom: carnivalConfig.zoom }),
          locations.map((loc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Marker,
            {
              position: [loc.lat, loc.lng],
              icon: createColoredIcon(PIN_TYPES[loc.type]?.color || "#6B7280"),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Popup, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: loc.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500", children: PIN_TYPES[loc.type]?.label }),
                getDistanceFromAccommodation(loc) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-blue-600 flex items-center gap-1 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-3 h-3" }),
                  getDistanceFromAccommodation(loc),
                  " from accommodation"
                ] }),
                isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => setArTarget({ lat: loc.lat, lng: loc.lng, name: loc.name }),
                    className: "mt-2 w-full flex items-center justify-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded uppercase hover:bg-indigo-200 transition",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-3 h-3" }),
                      " AR Navigate"
                    ]
                  }
                )
              ] })
            },
            loc.id
          )),
          scrapedEvents.filter((e) => e.lat && e.lng).map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Marker,
            {
              position: [event.lat, event.lng],
              icon: createColoredIcon(PIN_TYPES.scraped.color),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Popup, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: event.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-purple-600 font-bold mb-1", children: "Live Event" }),
                event.venue && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mb-2", children: event.venue }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: event.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "block text-center px-2 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold rounded uppercase hover:bg-purple-200 transition",
                    children: "Find Tickets"
                  }
                ),
                isPremium && event.lat && event.lng && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => setArTarget({ lat: event.lat, lng: event.lng, name: event.title, venue: event.venue }),
                    className: "mt-1 w-full flex items-center justify-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded uppercase hover:bg-indigo-200 transition",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-3 h-3" }),
                      " AR Navigate"
                    ]
                  }
                )
              ] })
            },
            event.id
          ))
        ]
      }
    ) }),
    locations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-600 dark:text-gray-300", children: "Saved Locations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: locations.map((loc) => {
        const pinType = PIN_TYPES[loc.type];
        const IconComponent = pinType?.icon || MapPin;
        const distance = getDistanceFromAccommodation(loc);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-8 h-8 rounded-full flex items-center justify-center",
                    style: { backgroundColor: pinType?.color || "#6B7280" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-4 h-4 text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-800 dark:text-white", children: loc.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
                    pinType?.label,
                    distance && ` • ${distance} from stay`
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => removeLocation(loc.id),
                  className: "p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ]
          },
          loc.id
        );
      }) })
    ] }),
    !accommodation && locations.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6 text-gray-500 dark:text-gray-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Home, { className: "w-12 h-12 mx-auto mb-2 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Start by adding your accommodation location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Then add fetes, costume pickup, and meetup spots" })
    ] }),
    arTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ARWaypoint,
      {
        target: arTarget,
        onClose: () => setArTarget(null),
        isPremium
      }
    ) }),
    arRoadMode && /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ARWaypoint,
      {
        targets: [
          ...locations.map((loc) => ({ ...loc, type: loc.type })),
          ...scrapedEvents.filter((e) => e.lat && e.lng).map((e) => ({
            id: e.id,
            lat: e.lat,
            lng: e.lng,
            name: e.title,
            venue: e.venue,
            type: "scraped"
          }))
        ],
        onClose: () => setArRoadMode(false),
        isPremium
      }
    ) })
  ] });
}
const FeteMap$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FeteMap
}, Symbol.toStringTag, { value: "Module" }));
export {
  Compass as C,
  FeteMap$1 as F,
  Navigation as N
};
