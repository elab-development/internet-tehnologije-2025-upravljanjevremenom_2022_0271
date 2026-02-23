import React from 'react';

export const Card = ({ id, naslov, opis, prioritet, color = "blue", onDelete }) => {
  const colors = {
    blue: "border-l-blue-500",
    emerald: "border-l-emerald-500",
    amber: "border-l-amber-500",
    red: "border-l-red-500"
  };

  // Dinamički biramo boju: Visok prioritet je uvek crven, ostalo po izboru
  const borderColor = prioritet === 'Visok' ? colors.red : colors[color];

  return (
    <div className={`bg-slate-800 p-6 rounded-xl border-l-4 ${borderColor} shadow-lg hover:shadow-2xl transition-all relative group h-full flex flex-col justify-between`}>
      
      {/* Dugme za brisanje - pojavljuje se na hover kartice */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Sprečava otvaranje kartice ako kasnije dodaš tu opciju
          onDelete(id);
        }}
        className="absolute top-3 right-3 text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2"
        title="Obriši zadatak"
      >
        ✕
      </button>

      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {prioritet || "Normalan"}
        </span>
        <h3 className="text-xl font-bold text-white mt-1">
          {naslov || "Zadatak bez naslova"}
        </h3>
        <p className="text-slate-400 mt-3 text-sm line-clamp-3 italic">
          "{opis || "Nema opisa za ovaj zadatak."}"
        </p>
      </div>

      <div className="flex items-center mt-6 text-slate-500 border-t border-slate-700/50 pt-4">
        <span className="text-[10px] font-medium uppercase tracking-widest">
           📌 Status: Aktivan
        </span>
      </div>
    </div>
  );
};

export default Card;