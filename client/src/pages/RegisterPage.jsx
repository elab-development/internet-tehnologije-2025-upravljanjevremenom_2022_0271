import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); // Sprečava osvežavanje stranice
        console.log("Dugme radi, šaljem podatke Laravelu..."); 
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/registracija', {
                username: username,
                email: email,
                lozinka: password // Laravel očekuje 'lozinka'
            });

            console.log("Uspešna registracija:", response.data);
            alert("Uspešno ste se registrovali!");
            navigate('/'); // Vraća te na Login
        } catch (error) {
            console.error("Greška:", error.response?.data);
            alert("Greška pri registraciji. Proveri konzolu.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <form onSubmit={handleRegister} className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Registracija</h2>
                
                <Input 
                    label="Korisničko ime" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <Input 
                    label="Email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <Input 
                    label="Lozinka" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <div className="mt-6">
                    <Button type="submit">Registruj se</Button>
                </div>
                
                <p className="mt-4 text-slate-400 text-center text-sm">
                    Već imate nalog? <span onClick={() => navigate('/')} className="text-blue-400 cursor-pointer">Prijavite se</span>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;