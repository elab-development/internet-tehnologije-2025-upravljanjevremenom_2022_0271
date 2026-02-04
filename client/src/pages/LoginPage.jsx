import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Dodajemo axios
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const LoginPage = () => {
  const [username, setUsername] = useState(''); // Django po defaultu koristi username
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => { // Dodajemo async
    e.preventDefault();
    
    try {
      // Šaljemo zahtev Zlatkovom backendu
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: username,
        password: password
      });

      // Ako backend vrati token, login je uspešan
      if (response.data.access) {
        localStorage.setItem('token', response.data.access); // Čuvamo token
        localStorage.setItem('refresh', response.data.refresh);
        console.log("Uspešan login preko baze!");
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Greška:", error.response?.data);
      alert("Neuspešan login. Proveri kredencijale u bazi.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Upravljanje Vremenom
          </h1>
          <p className="text-slate-400 mt-2">Dobrodošli nazad</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-2">
          <Input 
            label="Korisničko ime" // Django koristi username za login
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Korisničko ime"
            required
          />

          <div className="relative">
            <Input 
              label="Lozinka"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-4">
            <Button type="submit">
              Prijavi se
            </Button>
          </div>
        </form>

        <p className="text-center text-slate-400 mt-8 text-sm">
          Nemate nalog? <a href="#" className="text-emerald-400 font-semibold hover:underline">Registrujte se</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;