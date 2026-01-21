import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Pokušaj prijave:", { email, password });
    alert("Login kliknut!");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Upravljanje Vremenom
          </h1>
          <p className="text-slate-400">Prijavite se na svoj nalog</p>
        </div>

        {/* Forma */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">E-mail adresa</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white outline-none transition"
              placeholder="ime@primer.com"
              required
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-300">Lozinka</label>
              <a href="#" className="text-sm text-blue-400 hover:underline">Zaboravili ste lozinku?</a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-900/20"
          >
            Prijavi se
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-400 mt-10 text-sm">
          Nemate nalog? <a href="#" className="text-emerald-400 font-semibold hover:underline">Registrujte se</a>
        </p>

      </div>
    </div>
  );
}

export default App;