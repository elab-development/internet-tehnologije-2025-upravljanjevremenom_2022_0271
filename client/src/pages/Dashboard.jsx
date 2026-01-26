import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Simulacija poziva API-ja
    const mockData = [
      { id: 1, title: "Spremanje ITEH projekta", duration: 120, category: "Faks", color: "blue" },
      { id: 2, title: "Trening", duration: 60, category: "Zdravlje", color: "emerald" },
      { id: 3, title: "Pauza za ručak", duration: 45, category: "Odmor", color: "amber" }
    ];
    setTasks(mockData);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10 bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <div>
            <h1 className="text-3xl font-bold text-white">Moj Raspored</h1>
            <p className="text-slate-400">Dobrodošao nazad!</p>
          </div>
          
          <div className="flex gap-4">
            <div className="w-32">
              <Button variant="secondary" onClick={() => navigate('/profile')}>
                Profil
              </Button>
            </div>
            
            <div className="w-32">
              <Button variant="primary" onClick={() => navigate('/')}>
                Odjavi se
              </Button>
            </div>
          </div>
        </header>

        {/* Grid sa karticama */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <Card 
              key={task.id}
              title={task.title}
              duration={task.duration}
              category={task.category}
              color={task.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;