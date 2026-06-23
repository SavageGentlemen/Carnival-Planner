import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { c as createLucideIcon, g as getFunctions, e as app, h as httpsCallable, L as Loader2, i as Ticket, C as Calendar, U as Users, b as MapPin, D as Download } from "./index-CXUot43X.js";
import { L as LayoutDashboard, B as BarChart3 } from "./layout-dashboard-PsRkJ6OY.js";
import { P as Plus } from "./plus-BHAJcjwt.js";
import { G as Gift } from "./gift-Biw2Zx2l.js";
import { I as Image } from "./image-Br-Gm6dl.js";
import { S as Sparkles } from "./sparkles-BEe8L_dR.js";
import { D as DollarSign } from "./dollar-sign-Dk8Yf5wG.js";
import { A as AlertCircle } from "./alert-circle-lhG861Pl.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowUpRight = createLucideIcon("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MoreVertical = createLucideIcon("MoreVertical", [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
]);
const PROMOTER_PRO_PRICE_ID = "price_1SsDVdJR9xpdRiXiMw7dGtpC";
function PromoterDashboard({ user, isPremium, onExit }) {
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [stats, setStats] = reactExports.useState(null);
  const [events, setEvents] = reactExports.useState([]);
  const [rewards, setRewards] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [isPromoterPro, setIsPromoterPro] = reactExports.useState(false);
  const [isUpgrading, setIsUpgrading] = reactExports.useState(false);
  const [newEvent, setNewEvent] = reactExports.useState({
    title: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    type: "fete",
    description: ""
  });
  const [creating, setCreating] = reactExports.useState(false);
  const [createError, setCreateError] = reactExports.useState("");
  const [newReward, setNewReward] = reactExports.useState({ title: "", cost: "", description: "", quantity: "" });
  const [creatingReward, setCreatingReward] = reactExports.useState(false);
  reactExports.useEffect(() => {
    loadDashboardData();
  }, [user]);
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const functions = getFunctions(app);
      const getStats = httpsCallable(functions, "getPromoterStats");
      const result = await getStats();
      setStats(result.data.stats);
      setEvents(result.data.events);
      setIsPromoterPro(result.data.isPro || false);
      try {
        const getRewards = httpsCallable(functions, "getPromoterRewards");
        const rewardsResult = await getRewards();
        setRewards(rewardsResult.data.rewards || []);
      } catch (e) {
        console.warn("Failed to fetch rewards", e);
        setRewards([]);
      }
    } catch (err) {
      console.error("Failed to load promoter data:", err);
      setStats({
        totalCheckins: 142,
        activeEvents: 2,
        totalRevenue: 0,
        // Placeholder
        todayCheckins: 12
      });
      setEvents([
        {
          id: "evt-1",
          title: "Soca Sunset",
          date: "2026-02-14",
          checkins: 85,
          capacity: 200,
          status: "active",
          accessCode: "SUNSET-14"
        },
        {
          id: "evt-2",
          title: "Cooler Fete",
          date: "2026-02-20",
          checkins: 57,
          capacity: 500,
          status: "active",
          accessCode: "COOLER-20"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateError("");
    const activeEventsCount = events.filter((e2) => e2.status === "active").length;
    if (!isPromoterPro && activeEventsCount >= 3) {
      setCreateError("Free limit reached (3 events). Upgrade to Pro to create more.");
      setCreating(false);
      return;
    }
    try {
      const functions = getFunctions(app);
      const createEvent = httpsCallable(functions, "createPromoterEvent");
      await createEvent(newEvent);
      setActiveTab("events");
      loadDashboardData();
      setNewEvent({ title: "", date: "", time: "", location: "", capacity: "", type: "fete", description: "" });
    } catch (err) {
      console.error("Create event error:", err);
      setCreateError(err.message || "Failed to create event");
    } finally {
      setCreating(false);
    }
  };
  const handleCreateReward = async (e) => {
    e.preventDefault();
    setCreatingReward(true);
    try {
      const functions = getFunctions(app);
      const createReward = httpsCallable(functions, "createPromoterReward");
      await createReward(newReward);
      const getRewards = httpsCallable(functions, "getPromoterRewards");
      const rewardsResult = await getRewards();
      setRewards(rewardsResult.data.rewards || []);
      setNewReward({ title: "", cost: "", description: "", quantity: "" });
    } catch (err) {
      console.warn("Failed to create reward (backend may be offline), using mock:", err);
      setRewards([...rewards, { ...newReward, id: `mock-${Date.now()}` }]);
      setNewReward({ title: "", cost: "", description: "", quantity: "" });
    } finally {
      setCreatingReward(false);
    }
  };
  const handleUpgrade = async () => {
    if (!user) {
      alert("You must be signed in to upgrade.");
      return;
    }
    setIsUpgrading(true);
    try {
      const functions = getFunctions(app);
      const createCheckoutSession = httpsCallable(functions, "createCheckoutSession");
      const result = await createCheckoutSession({
        priceId: PROMOTER_PRO_PRICE_ID,
        success_url: window.location.origin,
        cancel_url: window.location.origin
      });
      const { data } = result || {};
      if (data && (data.url || data.checkoutUrl)) {
        window.location.href = data.url || data.checkoutUrl;
      } else {
        alert("Unable to start checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error starting checkout:", error);
      alert("There was a problem starting your checkout: " + error.message);
    } finally {
      setIsUpgrading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-8 h-8 text-teal-500 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8 px-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-6 h-6 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-gray-900 dark:text-white", children: "Promoter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-uppercase bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-500 font-medium", children: isPromoterPro ? "PRO" : "FREE" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          NavButton,
          {
            active: activeTab === "overview",
            label: "Overview",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-5 h-5" }),
            onClick: () => setActiveTab("overview")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          NavButton,
          {
            active: activeTab === "events",
            label: "My Events",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5" }),
            onClick: () => setActiveTab("events")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          NavButton,
          {
            active: activeTab === "create",
            label: "Create Event",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }),
            onClick: () => setActiveTab("create")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          NavButton,
          {
            active: activeTab === "rewards",
            label: "Rewards",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-5 h-5" }),
            onClick: () => setActiveTab("rewards")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          NavButton,
          {
            active: activeTab === "resources",
            label: "Resources",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5" }),
            onClick: () => setActiveTab("resources")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          NavButton,
          {
            active: activeTab === "analytics",
            label: "Analytics",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart3, { className: "w-5 h-5" }),
            onClick: () => setActiveTab("analytics"),
            pro: !isPromoterPro
          }
        )
      ] }),
      !isPromoterPro && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 p-4 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold mb-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-yellow-300" }),
          "Go Pro"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90 mb-3", children: "Unlimited events & custom codes." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleUpgrade,
            disabled: isUpgrading,
            className: "w-full py-2 bg-white text-purple-600 font-bold rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2",
            children: isUpgrading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
              "Loading..."
            ] }) : "Upgrade $9.99/mo"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 md:p-8 overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white capitalize", children: activeTab }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onExit, className: "text-sm text-gray-500 hover:text-gray-700", children: " Back to Profile" })
      ] }),
      activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Check-ins", value: stats?.totalCheckins, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "text-blue-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Active Events", value: stats?.activeEvents, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "text-teal-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Today's Activity", value: `+${stats?.todayCheckins || 0}`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "text-green-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Revenue Est.", value: "-", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "text-gray-400" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-gray-900 dark:text-white mb-4", children: "Recent Events" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EventsList, { events: events.slice(0, 3) })
        ] })
      ] }),
      activeTab === "events" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(EventsList, { events, full: true }) }),
      activeTab === "create" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold mb-4", children: "Create New Event" }),
        !isPromoterPro && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-5 h-5 text-blue-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-blue-700 dark:text-blue-300", children: "Free Tier Status:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-600 dark:text-blue-400 ml-1", children: [
              events.filter((e) => e.status === "active").length,
              " / 3 active events used."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateEvent, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Event Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                required: true,
                className: "w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700",
                placeholder: "e.g. Soca Brainwash",
                value: newEvent.title,
                onChange: (e) => setNewEvent({ ...newEvent, title: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "date",
                  required: true,
                  className: "w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700",
                  value: newEvent.date,
                  onChange: (e) => setNewEvent({ ...newEvent, date: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "time",
                  required: true,
                  className: "w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700",
                  value: newEvent.time,
                  onChange: (e) => setNewEvent({ ...newEvent, time: e.target.value })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Location / Venue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-3.5 w-5 h-5 text-gray-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  className: "w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700",
                  placeholder: "e.g. O2 Park",
                  value: newEvent.location,
                  onChange: (e) => setNewEvent({ ...newEvent, location: e.target.value })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Capacity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  className: "w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700",
                  placeholder: "e.g. 500",
                  value: newEvent.capacity,
                  onChange: (e) => setNewEvent({ ...newEvent, capacity: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  className: "w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700",
                  value: newEvent.type,
                  onChange: (e) => setNewEvent({ ...newEvent, type: e.target.value }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "fete", children: "Fete / Party" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "jouvert", children: "J'ouvert" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "boat_ride", children: "Boat Ride" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "concert", children: "Concert" })
                  ]
                }
              )
            ] })
          ] }),
          createError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-sm", children: createError }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              disabled: creating,
              className: "w-full py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-colors flex items-center justify-center gap-2",
              children: [
                creating ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }),
                "Create Event"
              ]
            }
          )
        ] })
      ] }),
      activeTab === "rewards" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-5 h-5 text-pink-500" }),
            " Create Reward"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateReward, className: "grid md:grid-cols-2 gap-4 items-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Reward Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  className: "w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700",
                  placeholder: "e.g. Free Rum & Coke",
                  value: newReward.title,
                  onChange: (e) => setNewReward({ ...newReward, title: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Cost (Credits)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  required: true,
                  className: "w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700",
                  placeholder: "e.g. 500",
                  value: newReward.cost,
                  onChange: (e) => setNewReward({ ...newReward, cost: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Description (Optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  className: "w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700",
                  placeholder: "Details for redemption...",
                  value: newReward.description,
                  onChange: (e) => setNewReward({ ...newReward, description: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "submit",
                disabled: creatingReward,
                className: "w-full py-2.5 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center gap-2",
                children: [
                  creatingReward ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  "Add Reward"
                ]
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-gray-900 dark:text-white mb-4", children: "Active Rewards" }),
          rewards.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-10 h-10 text-gray-300 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "No rewards created yet." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: rewards.map((reward) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 dark:text-white", children: reward.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: reward.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-pink-600 bg-pink-50 dark:bg-pink-900/20 px-2 py-0.5 rounded-full", children: [
                  reward.cost,
                  " Credits"
                ] }),
                reward.quantity && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-500", children: [
                  "Limit: ",
                  reward.quantity
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-2 text-gray-400 hover:text-red-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MoreVertical, { className: "w-5 h-5" }) })
          ] }, reward.id)) })
        ] })
      ] }),
      activeTab === "resources" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl p-8 text-white mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "Promoter Toolkit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-90 max-w-xl", children: "High-quality visual assets to help you promote your events and the Caribbean Carnival Planner app. Download and share on your social media channels." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResourceCard,
            {
              title: "Instagram Post",
              description: "Square format (1:1) perfect for Feed posts.",
              image: "/assets/promoter-ads/ad-social-square.png",
              type: "Social Media"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResourceCard,
            {
              title: "Story / Reel",
              description: "Portrait format (9:16) for Stories and TikTok.",
              image: "/assets/promoter-ads/ad-story-portrait.png",
              type: "Social Media",
              portrait: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResourceCard,
            {
              title: "Web Banner",
              description: "Landscape format for banners and headers.",
              image: "/assets/promoter-ads/ad-banner-landscape.png",
              type: "Web Asset",
              className: "lg:col-span-2"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function ResourceCard({ title, description, image, type, portrait, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative bg-gray-100 dark:bg-gray-900 group ${portrait ? "aspect-[9/16]" : "aspect-video"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: image,
          alt: title,
          className: "w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: image,
          download: true,
          className: "px-4 py-2 bg-white text-gray-900 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
            " Download"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 flex-1 flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 dark:text-white", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded", children: type })
    ] }) })
  ] });
}
function NavButton({ active, label, icon, onClick, pro }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick,
      className: `w-full flex items-center justify-between p-3 rounded-lg transition-colors ${active ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
        ] }),
        pro && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded uppercase font-bold", children: "PRO" })
      ]
    }
  );
}
function StatCard({ label, value, icon }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg", children: icon }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: label })
  ] });
}
function EventsList({ events, full }) {
  if (!events?.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 text-gray-300 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "No events found." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: events.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-purple-600 dark:text-purple-400 uppercase", children: new Date(event.date).toLocaleString("default", { month: "short" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black text-purple-800 dark:text-purple-200 leading-none", children: new Date(event.date).getDate() })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 dark:text-white", children: event.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-gray-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
            " ",
            event.checkins,
            " checked-in"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium", children: "Active" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-gray-600 dark:text-gray-300", children: event.accessCode }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MoreVertical, { className: "w-5 h-5" }) })
    ] })
  ] }, event.id)) });
}
export {
  PromoterDashboard as default
};
