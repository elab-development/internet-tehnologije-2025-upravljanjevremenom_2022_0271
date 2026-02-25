import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // DODATO useParams
import axios from 'axios';
import Button from '../components/Button';

const AddTaskPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // DODATO: Uzimamo ID iz URL-a (ako postoji)
    const [tipovi, setTipovi] = useState([]);
    const [formData, setFormData] = useState({
        nazivZadatka: '',
        opis: '',
        datum: '',
        vreme: '',
        idTipZadatka: '',
        prioritet: 'Nizak'
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // 1. Učitavanje tipova zadataka (ostaje isto)
        const fetchTipovi = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tipovi-zadataka', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTipovi(response.data);
            } catch (err) {
                console.error("Greška pri učitavanju tipova:", err);
            }
        };

        // 2. NOVO: Ako postoji ID, učitaj podatke tog zadatka da popuniš formu
        const fetchZadatakZaEdit = async () => {
            if (id) {
                try {
                    // Ovde pretpostavljamo da imaš rutu ili možeš naći zadatak u listi
                    // Najsigurnije je povući sve zadatke pa filtrirati ili imati poseban GET /zadatak/{id}
                    const res = await axios.get('http://127.0.0.1:8000/api/moji-zadaci', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const z = res.data.find(item => item.idZadatak === parseInt(id));
                    
                    if (z) {
                        // Razdvajamo 'vremeObavljanja' (Y-m-d H:i:s) na datum i vreme za input polja
                        const [datum, vreme] = z.vremeObavljanja.split(' ');
                        setFormData({
                            nazivZadatka: z.nazivZadatka,
                            opis: z.opis || '',
                            datum: datum,
                            vreme: vreme.substring(0, 5), // uzimamo samo HH:mm
                            idTipZadatka: z.idTipZadatka,
                            prioritet: z.prioritet
                        });
                    }
                } catch (err) {
                    console.error("Greška pri učitavanju zadatka za izmenu.");
                }
            }
        };

        fetchTipovi();
        fetchZadatakZaEdit();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const vremeObavljanja = `${formData.datum} ${formData.vreme}`;

        try {
            // DINAMIČKA LOGIKA: Ako ima ID ide PUT na izmeni, ako nema ide POST na dodaj
            if (id) {
                await axios.put(`http://127.0.0.1:8000/api/izmeni-zadatak/${id}`, {
                    ...formData,
                    vremeObavljanja: vremeObavljanja
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://127.0.0.1:8000/api/dodaj-zadatak', {
                    ...formData,
                    vremeObavljanja: vremeObavljanja
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            navigate('/dashboard');
        } catch (error) {
            alert("Greška: " + error.response?.data?.poruka);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 p-8 text-white flex justify-center">
            <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-2xl w-full max-w-lg border border-slate-700 space-y-4">
                {/* Dinamički naslov */}
                <h2 className="text-2xl font-bold mb-6">
                    {id ? 'Izmeni Zadatak' : 'Novi Zadatak & Podsetnik'}
                </h2>
                
                <input 
                    type="text" 
                    placeholder="Naziv" 
                    className="w-full p-3 bg-slate-900 rounded" 
                    value={formData.nazivZadatka} // DODATO value da bi polje bilo popunjeno
                    onChange={e => setFormData({...formData, nazivZadatka: e.target.value})} 
                    required 
                />

                <textarea 
                    placeholder="Opis" 
                    className="w-full p-3 bg-slate-900 rounded" 
                    value={formData.opis}
                    onChange={e => setFormData({...formData, opis: e.target.value})} 
                />

                <div className="flex gap-4">
                    <input 
                        type="date" 
                        className="flex-1 p-3 bg-slate-900 rounded text-white" 
                        value={formData.datum}
                        onChange={e => setFormData({...formData, datum: e.target.value})} 
                        required 
                    />
                    <input 
                        type="time" 
                        className="flex-1 p-3 bg-slate-900 rounded text-white" 
                        value={formData.vreme}
                        onChange={e => setFormData({...formData, vreme: e.target.value})} 
                        required 
                    />
                </div>

                <select 
                    className="w-full p-3 bg-slate-900 rounded border border-slate-700 text-white" 
                    value={formData.idTipZadatka}
                    onChange={e => setFormData({...formData, idTipZadatka: e.target.value})} 
                    required
                >
                    <option value="">Izaberi tip zadatka</option>
                    {tipovi.map((t) => (
                        <option key={t.idTipZadatka} value={t.idTipZadatka}> 
                            {t.nazivTipZad} 
                        </option>
                    ))}
                </select>

                <select 
                    className="w-full p-3 bg-slate-900 rounded" 
                    value={formData.prioritet}
                    onChange={e => setFormData({...formData, prioritet: e.target.value})}
                >
                    <option value="Nizak">Nizak</option>
                    <option value="Srednji">Srednji</option>
                    <option value="Visok">Visok</option>
                </select>

                <Button varijanta="primarno" type="submit">
                    {id ? 'Sačuvaj izmene' : 'Sačuvaj i Kreiraj Podsetnik'}
                </Button>
                
                <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="px-6 w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-3 rounded-lg transition-colors"
                >
                    Otkaži
                </button>
            </form>
        </div>
    );
};

export default AddTaskPage;