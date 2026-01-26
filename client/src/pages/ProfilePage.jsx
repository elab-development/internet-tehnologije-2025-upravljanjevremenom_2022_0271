import React from 'react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10 flex flex-col items-center">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-700">
        <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
          PP
        </div>
        <h2 className="text-2xl font-bold">Pera Peric</h2>
        <p className="text-slate-400 mb-6">Student na FON-u</p>
        
        <div className="space-y-4">
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>Nazad na Dashboard</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;