import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [podaci, setPodaci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        // Koristimo /api/zadaci/ jer si potvrdio da ta putanja radi
        const response = await axios.get('http://127.0.0.1:8000/api/zadaci/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = Array.isArray(response.data) ? response.data : [];
        setPodaci(data);
        setLoading(false);
      } catch (err) {
        console.error("Greška pri povlačenju podataka:", err);
        setError("Problem sa povezivanjem na bazu.");
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Moji Zadaci
            </h1>
            <p className="text-slate-400">Podaci iz MySQL baze (api_zadatak)</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate('/profile')} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700">
              Profil
            </button>
            <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }} className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20">
              Odjavi se
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500">Učitavanje podataka...</div>
        ) : error ? (
          <div className="text-center text-red-400 py-20">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podaci.length > 0 ? (
              podaci.map((stavka) => (
                <div key={stavka.id} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-emerald-500/50 transition-all shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 rounded">Zadatak</span>
                    <span className="text-xs text-slate-500">#{stavka.id}</span>
                  </div>
                  {/* Prikazuje 'naziv' ili 'naslov' u zavisnosti šta Zlatko ima u bazi */}
                  <h3 className="text-xl font-bold mb-2">{stavka.naziv || stavka.naslov || "Bez naslova"}</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {stavka.opis || "Nema dodatnog opisa."}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700 text-slate-500">
                Baza je trenutno prazna.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;