import React from 'react';

export const Card = ({ id, naslov, opis, prioritet, color = "blue", onDelete, istekao, vreme }) => {
  const colors = {
    blue: "border-l-blue-500",
    emerald: "border-l-emerald-500",
    amber: "border-l-amber-500",
    red: "border-l-red-500"
  };

  const borderColor = prioritet === 'Visok' ? colors.red : colors[color];

  // Formatiranje datuma za lepši prikaz (npr. 24. Feb u 14:30)
  const formatiranoVreme = (vremeString) => {
    if (!vremeString) return "Nije definisano";
    const d = new Date(vremeString);
    
    const dan = d.getDate().toString().padStart(2, '0');
    const mesec = (d.getMonth() + 1).toString().padStart(2, '0'); // Meseci kreću od 0
    const sati = d.getHours().toString().padStart(2, '0');
    const minuti = d.getMinutes().toString().padStart(2, '0');

    return `${dan}.${mesec}. u ${sati}:${minuti}`;
  };

  return (
    <div className={`bg-slate-800 p-6 rounded-xl border-l-4 ${borderColor} shadow-lg hover:shadow-2xl transition-all relative group h-full flex flex-col justify-between ${istekao ? 'opacity-70 grayscale-[0.3]' : ''}`}>
      
      <button 
        onClick={(e) => {
          e.stopPropagation(); 
          onDelete(id);
        }}
        className="absolute top-3 right-3 text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2"
        title="Obriši zadatak"
      >
        ✕
      </button>

      <div>
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {prioritet || "Normalan"}
          </span>
          {/* PRIKAZ VREMENA U GORNJEM DESNOM UGLU */}
          <span className="text-[10px] font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
             🕒 {formatiranoVreme(vreme)}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mt-2">
          {naslov || "Zadatak bez naslova"}
        </h3>
        <p className="text-slate-400 mt-3 text-sm line-clamp-3 italic">
          "{opis || "Nema opisa za ovaj zadatak."}"
        </p>
      </div>

      <div className="flex items-center mt-6 text-slate-500 border-t border-slate-700/50 pt-4">
        <span className={`text-[10px] font-bold uppercase tracking-widest ${istekao ? 'text-red-400' : 'text-emerald-400'}`}>
            📌 Status: {istekao ? 'Neaktivan (Istekao)' : 'Aktivan'}
        </span>
      </div>
    </div>
  );
};

export default Card;