import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Uvozimo tvoje reusable komponente
import Button from '../components/Button';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/'); return; }

        // Laravel Sanctum obično koristi /api/user ili ruku koju si definisala
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Greška pri učitavanju profila:", error);
        setLoading(false);
        if (error.response?.status === 401) navigate('/');
      }
    };
    fetchUserData();
  }, [navigate]);

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  console.log("Podaci o korisniku:", user);
  const initial = (user?.username?.charAt(0) || user?.email?.charAt(0) || 'M').toUpperCase();  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-3xl shadow-2xl p-10 border border-slate-700">
        <div className="flex flex-col items-center">
          
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-emerald-400 rounded-full flex items-center justify-center text-4xl font-black text-white mb-6 shadow-xl shadow-blue-500/20">
            {initial}
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-1">
            {user?.username}
          </h2>
          <p className="text-emerald-400 font-medium text-sm mb-8 tracking-wide uppercase">
          {localStorage.getItem('idTip') === '1' ? 'Student' : 
          localStorage.getItem('idTip') === '3' ? 'Premium' : 
          localStorage.getItem('idTip') === '2' ? 'Običan korisnik' : 'Gost'}
          </p>
          
          <div className="w-full space-y-4">
            {/* Ovde simuliramo reusable Card stil za informacije */}
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-widest">E-mail adresa</p>
              <p className="text-slate-200 font-medium">{user?.email}</p>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-widest">Status Naloga</p>
              <p className="text-slate-200 font-medium text-xs">Aktivan</p>
            </div>
          </div>

          {/* Koristimo tvoju REUSABLE Button komponentu */}
          <div className="w-full mt-10">
            <Button 
              children="Nazad na Dashboard" 
              onClick={() => navigate('/dashboard')} 
              varijanta="primarno"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;