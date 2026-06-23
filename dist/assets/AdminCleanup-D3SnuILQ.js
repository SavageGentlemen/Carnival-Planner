import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { S as ShieldAlert } from "./shield-alert-IiPvvEM9.js";
import { X, T as Trash2 } from "./index-CXUot43X.js";
import { C as Check } from "./check-LoUvj2UR.js";
import { A as AlertTriangle } from "./alert-triangle-eo7cw2j4.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
function AdminCleanup({ users, onDeleteUser, onDeleteAll, onClose }) {
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [confirmDeleteAll, setConfirmDeleteAll] = reactExports.useState(false);
  const ghostUsers = reactExports.useMemo(() => {
    return users.filter((u) => {
      const hasEmail = u.profile?.email && u.profile.email.trim() !== "";
      const hasName = u.profile?.displayName && u.profile.displayName.trim() !== "" && u.profile.displayName !== "User";
      return !hasEmail && !hasName;
    });
  }, [users]);
  const handleSelect = (id) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };
  const handleSelectAll = () => {
    if (selectedIds.size === ghostUsers.length) {
      setSelectedIds(/* @__PURE__ */ new Set());
    } else {
      setSelectedIds(new Set(ghostUsers.map((u) => u.id)));
    }
  };
  const executeBatchDelete = () => {
    if (confirmDeleteAll) {
      onDeleteAll(Array.from(selectedIds));
      setConfirmDeleteAll(false);
      setSelectedIds(/* @__PURE__ */ new Set());
    } else {
      setConfirmDeleteAll(true);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden animate-fadeIn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-red-50 dark:bg-red-900/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-800 dark:text-gray-100", children: "Database Cleanup" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-600 dark:text-red-400 font-medium", children: [
            "Found ",
            ghostUsers.length,
            " incomplete records"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-gray-500" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: ghostUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-gray-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-12 h-12 mx-auto mb-3 text-green-500 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Database is clean! No incomplete users found." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: selectedIds.size > 0 && selectedIds.size === ghostUsers.length,
              onChange: handleSelectAll,
              className: "rounded border-gray-300 text-red-600 focus:ring-red-500"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
            "Select All (",
            ghostUsers.length,
            ")"
          ] })
        ] }),
        selectedIds.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: executeBatchDelete,
            className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${confirmDeleteAll ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
              confirmDeleteAll ? "CONFIRM DELETION" : `Delete (${selectedIds.size})`
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[300px] overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-500 font-medium sticky top-0 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 w-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "User ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-700", children: ghostUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700/30 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: selectedIds.has(user.id),
              onChange: () => handleSelect(user.id),
              className: "rounded border-gray-300 text-red-600 focus:ring-red-500"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-mono text-xs text-gray-500", children: user.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-gray-600 dark:text-gray-300", children: user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString() : "Unknown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => onDeleteUser(user.id),
              className: "text-gray-400 hover:text-red-500 transition",
              title: "Delete single user",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          ) })
        ] }, user.id)) })
      ] }) })
    ] }) }),
    ghostUsers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-yellow-50 dark:bg-yellow-900/10 border-t border-yellow-100 dark:border-yellow-900/20 flex items-start gap-3 text-xs text-yellow-800 dark:text-yellow-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-4 h-4 shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Warning:" }),
        " Deleting users is permanent. This will remove their record from the 'users' collection. If they sign in again, a new record will be created."
      ] })
    ] })
  ] });
}
export {
  AdminCleanup as default
};
