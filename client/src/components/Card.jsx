export const Card = ({ title, duration, category, color = "blue" }) => {
  const colors = {
    blue: "border-l-blue-500",
    emerald: "border-l-emerald-500",
    amber: "border-l-amber-500"
  };

  return (
    <div className={`bg-slate-800 p-6 rounded-xl border-l-4 ${colors[color]} shadow-lg hover:shadow-2xl transition-all cursor-pointer`}>
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{category}</span>
      <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
      <div className="flex items-center mt-4 text-slate-400">
        <span className="text-sm font-medium">Trajanje: {duration} min</span>
      </div>
    </div>
  );
};