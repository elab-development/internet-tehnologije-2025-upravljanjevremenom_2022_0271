import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook za navigaciju

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Ovde ispunjavamo zahtev za korišćenje JavaScript-a (logika)
    if (email === "admin@fon.bg.ac.rs" && password === "iteh2025") {
        console.log("Uspešan login!");
        navigate('/dashboard'); // Prebacuje nas na drugu stranicu
    } else {
        alert("Pogrešni podaci. Probaj admin@fon.bg.ac.rs / iteh2025");
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
            label="E-mail adresa"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ime@primer.com"
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
            <a href="#" className="absolute top-0 right-0 text-xs text-blue-400 hover:underline">
                Zaboravili ste lozinku?
            </a>
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