import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

const AddTaskPage = () => {
    const navigate = useNavigate();
    const [tipovi, setTipovi] = useState([]);
    const [formData, setFormData] = useState({
        nazivZadatka: '',
        opis: '',
        datum: '',
        vreme: '',
        idTipZadatka: '',
        prioritet: 'Srednji'
    });

    useEffect(() => {
    const fetchTipovi = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/tipovi-zadataka', {
                headers: {
                    Authorization: `Bearer ${token}` // OVO JE KLJUČNO
                }
            });
            setTipovi(response.data);
        } catch (err) {
            console.error("Greška pri učitavanju tipova:", err);
        }
    };
    fetchTipovi();
}, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            // Spajamo datum i vreme u format koji Laravel razume (Y-m-d H:i)
            const vremeObavljanja = `${formData.datum} ${formData.vreme}`;
            
            await axios.post('http://127.0.0.1:8000/api/dodaj-zadatak', {
                ...formData,
                vremeObavljanja: vremeObavljanja
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate('/dashboard');
        } catch (error) {
            alert("Greška: " + error.response?.data?.poruka);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 p-8 text-white flex justify-center">
            <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-2xl w-full max-w-lg border border-slate-700 space-y-4">
                <h2 className="text-2xl font-bold mb-6">Novi Zadatak & Podsetnik</h2>
                
                <input type="text" placeholder="Naziv" className="w-full p-3 bg-slate-900 rounded" 
                    onChange={e => setFormData({...formData, nazivZadatka: e.target.value})} required />

                <textarea placeholder="Opis" className="w-full p-3 bg-slate-900 rounded" 
                    onChange={e => setFormData({...formData, opis: e.target.value})} />

                <div className="flex gap-4">
                    <input type="date" className="flex-1 p-3 bg-slate-900 rounded text-white" 
                        onChange={e => setFormData({...formData, datum: e.target.value})} required />
                    <input type="time" className="flex-1 p-3 bg-slate-900 rounded text-white" 
                        onChange={e => setFormData({...formData, vreme: e.target.value})} required />
                </div>

                <select 
                className="w-full p-3 bg-slate-900 rounded border border-slate-700 text-white" 
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

                <select className="w-full p-3 bg-slate-900 rounded" 
                    onChange={e => setFormData({...formData, prioritet: e.target.value})}>
                    <option value="Nizak">Nizak</option>
                    <option value="Srednji">Srednji</option>
                    <option value="Visok">Visok</option>
                </select>

                <Button varijanta="primarno" type="submit">Sačuvaj i Kreiraj Podsetnik</Button>
            </form>
        </div>
    );
};

export default AddTaskPage;