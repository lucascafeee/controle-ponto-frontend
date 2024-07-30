import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { loginUser } from '../services/api';
import 'tailwindcss/tailwind.css';

const LoginPage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(code);
      localStorage.setItem('userId', response.data.id); // Salva o userId no localStorage
      setError('');
      navigate('/dashboard');
    } catch (error: any) {
      setError(
        `Erro: ${error.response?.data?.message || 'Erro ao fazer login'}`,
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
      <div className="flex items-center space-x-4 mb-8">
        <FaClock className="text-5xl text-blue-500" />
        <h1 className="text-4xl font-bold">Controle de Horas Trabalhadas</h1>
      </div>
      <input
        type="text"
        placeholder="Código do Usuário"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className={`w-80 p-3 mb-6 text-lg rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} bg-gray-800 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && (
        <div className="flex items-center mb-4 text-red-500">
          <FaExclamationTriangle className="mr-2" />
          <p>{error}</p>
        </div>
      )}
      <button
        onClick={handleLogin}
        className="w-80 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-md shadow-md transition duration-200 transform hover:scale-105"
      >
        Confirmar
      </button>
    </div>
  );
};

export default LoginPage;
