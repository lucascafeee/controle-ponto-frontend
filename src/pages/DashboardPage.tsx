import React, { useState, useEffect } from 'react';
import { FaRegClock } from 'react-icons/fa';
import {
  startWorkSession,
  endWorkSession,
  getWorkSessions,
} from '../services/api';
import 'tailwindcss/tailwind.css';

const DashboardPage = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [previousSessions, setPreviousSessions] = useState<any[]>([]);
  const userId = localStorage.getItem('userId'); // Recupera o userId do localStorage

  useEffect(() => {
    if (userId) {
      fetchPreviousSessions();
    }
  }, [userId]);

  const handleStartSession = async () => {
    try {
      // @ts-ignore
      const response = await startWorkSession(userId);
      setCurrentSession(response.data);
      setIsWorking(true);
    } catch (error) {
      console.error('Erro ao iniciar turno:', error);
    }
  };

  const handleEndSession = async () => {
    try {
      if (currentSession) {
        const response = await endWorkSession(currentSession.id);
        setCurrentSession(response.data);
        setIsWorking(false);
        fetchPreviousSessions();
      }
    } catch (error) {
      console.error('Erro ao finalizar turno:', error);
    }
  };

  const fetchPreviousSessions = async () => {
    try {
      // @ts-ignore
      const response = await getWorkSessions(userId);
      setPreviousSessions(response.data);
    } catch (error) {
      console.error('Erro ao obter sessões anteriores:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white p-4">
      <div className="flex items-center space-x-4 mb-8">
        <FaRegClock className="text-5xl text-blue-500" />
        <h1 className="text-4xl font-bold">Controle de Horas Trabalhadas</h1>
      </div>
      <div className="text-lg mb-6">
        Horas Trabalhadas Hoje: <span className="font-semibold">8h 30m</span>
      </div>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleStartSession}
          className={`py-3 px-6 ${isWorking ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'} text-white text-lg rounded-md shadow-md transition duration-200 transform hover:scale-105`}
          disabled={isWorking}
        >
          Iniciar Turno
        </button>
        <button
          onClick={handleEndSession}
          className={`py-3 px-6 ${!isWorking ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-700'} text-white text-lg rounded-md shadow-md transition duration-200 transform hover:scale-105`}
          disabled={!isWorking}
        >
          Finalizar Turno
        </button>
      </div>
      <div className="w-full max-w-lg bg-white text-gray-800 rounded-md shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Dias Anteriores
        </h2>
        <ul className="divide-y divide-gray-300">
          {previousSessions.map((session, index) => (
            <li key={index} className="flex justify-between py-2">
              <span>{new Date(session.startTime).toLocaleDateString()}</span>
              <span>{session.hoursWorked}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
