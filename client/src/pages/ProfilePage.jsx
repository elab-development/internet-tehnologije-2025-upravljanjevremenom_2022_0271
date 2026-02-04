import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/'); return; }

        const response = await axios.get('http://127.0.0.1:8000/api/user/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        console.log("Podaci iz baze:", response.data); // Ovo proveri u F12 konzoli!
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Greška pri učitavanju profila:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Učitavanje profila...</div>;

  // Dinamički inicijal: Ako postoji first_name uzmi prvo slovo, inače uzmi iz username
  const initial = user?.first_name 
    ? user.first_name.charAt(0).toUpperCase() 
    : user?.username?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-3xl shadow-2xl p-10 border border-slate-700">
        <div className="flex flex-col items-center">
          {/* Sada će ovde pisati "L" ako je u bazi Luka */}
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-4xl font-black text-white mb-6 shadow-xl shadow-blue-500/20">
            {initial}
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-1">
            {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}
          </h2>
          <p className="text-emerald-400 font-medium text-sm mb-8 tracking-wide uppercase">Aktivan Korisnik</p>
          
          <div className="w-full space-y-4">
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-widest">Korisničko ime</p>
              <p className="text-slate-200 font-medium">{user?.username}</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-widest">E-mail adresa</p>
              <p className="text-slate-200 font-medium">{user?.email || 'Nije podešena'}</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full mt-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            Nazad na Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;