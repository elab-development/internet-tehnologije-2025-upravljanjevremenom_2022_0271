import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shownAlerts, setShownAlerts] = useState(new Set());
  const navigate = useNavigate();

  const tipKorisnika = localStorage.getItem('idTip');

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/'); return; }

      const response = await axios.get('http://127.0.0.1:8000/api/moji-zadaci', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      setError("Problem sa povezivanjem na bazu.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  // FUNKCIJA ZA BRISANJE
  const handleDelete = async (id) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete ovaj zadatak?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/obrisi-zadatak/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTasks(tasks.filter(t => t.idZadatak !== id));
    } catch (error) {
      alert("Greška: Nije moguće obrisati zadatak.");
    }
  };

  // LOGIKA ZA PODSETNIK I OSVEŽAVANJE STATUSA
  useEffect(() => {
    const interval = setInterval(() => {
      const sada = new Date();

      tasks.forEach(zadatak => {
        const vremeZadatka = new Date(zadatak.vremeObavljanja);
        const razlika = (vremeZadatka - sada) / 60000;

        if (razlika > 4.5 && razlika <= 5.5 && !shownAlerts.has(zadatak.idZadatak)) {
          alert(`🔔 PODSETNIK: ${zadatak.nazivZadatka} počinje za 5 minuta!`);
          setShownAlerts(prev => new Set(prev).add(zadatak.idZadatak));
        }
      });

      // Triggerujemo re-render da bi se ažurirali "Istekao" statusi na karticama
      setTasks([...tasks]);
    }, 30000);

    return () => clearInterval(interval);
  }, [tasks, shownAlerts]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Upravljanje Vremenom
            </h1>
            <p className="text-slate-400 mt-1">
              Status naloga:
              <span className="font-bold ml-1">
                {tipKorisnika === '1' ? (
                  <span className="text-emerald-400">🎓 Student</span>
                ) : tipKorisnika === '3' ? (
                  <span className="text-amber-400">💎 Premium</span>
                ) : (
                  <span className="text-blue-400">👤 Korisnik</span>
                )}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Dugme vidljivo samo za Studente (1) i Premium (3) */}
            {(tipKorisnika === '1' || tipKorisnika === '2' || tipKorisnika === '3') && (
              <button
                onClick={() => navigate('/add-task')}
                className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg border border-emerald-500/30 text-sm font-bold hover:bg-emerald-500/30 transition-all"
              >
                + Dodaj zadatak
              </button>
            )}

            <div className="w-32">
              <Button variant="secondary" onClick={() => navigate('/profile')}>
                Profil
              </Button>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-bold"
            >
              Odjavi se
            </button>
          </div>
        </div>

        <hr className="border-slate-800 mb-10" />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
            <p>Učitavanje tvojih zadataka...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-20 bg-red-500/5 rounded-2xl border border-red-500/20">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length > 0 ? (
              tasks.map((stavka) => {
                // Provera da li je zadatak istekao
                const jeIstekao = new Date(stavka.vremeObavljanja) < new Date();

                return (
                  <div key={stavka.idZadatak} className="relative group">
                    <Card
                      id={stavka.idZadatak}
                      naslov={stavka.nazivZadatka}
                      opis={stavka.opis}
                      prioritet={stavka.prioritet}
                      vreme={stavka.vremeObavljanja}
                      onDelete={handleDelete}
                      istekao={jeIstekao}
                    />

                    {/* DODATO: Dugme za izmenu koje se pojavljuje iznad kartice */}
                    <button
                      onClick={() => navigate(`/edit-task/${stavka.idZadatak}`)}
                      className="absolute bottom-4 right-4 bg-blue-500/20 text-blue-400 p-2 rounded-md border border-blue-500/30 hover:bg-blue-500/40 transition-all text-xs font-bold z-10"
                    >
                      ✏️ Izmeni
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700 text-slate-500">
                <p className="text-xl mb-2">📭</p>
                Trenutno nemate unetih zadataka u bazi.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;