// Small pill used in the header to show "Days: 76"
const StatPill = ({ label, value, color }) => {
  const colors = {
    teal: "bg-teal-50 text-teal-700 border-teal-100",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    red: "bg-red-50 text-red-700 border-red-100",
    green: "bg-green-50 text-green-700 border-green-100",
    slate: "bg-slate-50 text-slate-700 border-slate-100",
  };

  const style = colors[color] || colors.teal;

  return (
    <div
      className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${style}`}
    >
      <span className="uppercase tracking-wide mr-1 opacity-70">
        {label}:
      </span>
      <span>{value}</span>
    </div>
  );
};
