import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulacija poziva API-ja (Zahtev: React Hooks)
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
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Moj Raspored</h1>
            <p className="text-slate-400">Dobrodošao nazad, Luka!</p>
          </div>
          <div className="w-48">
             <Button variant="secondary" onClick={() => alert("Odjava...")}>Odjavi se</Button>
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