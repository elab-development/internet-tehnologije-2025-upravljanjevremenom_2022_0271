import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Dodajemo axios
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const LoginPage = () => {
  const [email, setEmail] = useState(''); // Django po defaultu koristi username
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
            email: email,      // Proveri da li se state zove 'email'
            lozinka: password  // Proveri da li se state zove 'password'
        });

        if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
    
    // Proveravamo gde se tačno nalazi tip korisnika u odgovoru
    // Ako Laravel vraća { user: { idTip: 1 } ... }
    const userTip = response.data.user ? response.data.user.idTip : response.data.idTip;
    
    localStorage.setItem('idTip', userTip); 
    
    console.log("Ulogovan! Tip:", userTip);
    navigate('/dashboard');
}
    } catch (error) {
        // Ovo će sprečiti "undefined" grešku u konzoli
        console.error("Greška pri prijavi:", error.response?.data || error.message);
        alert("Neuspešan login. Proveri podatke ili Laravel server.");
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
            label="Email" 
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          Nemate nalog?
          <span 
          onClick={() => navigate('/register')} 
          className="text-blue-400 cursor-pointer hover:underline ml-1">
          Registruj se
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;