import React from 'react';
import 'tailwindcss/tailwind.css';

interface Session {
  startTime: string;
  hoursWorked: string;
}

interface PreviousDaysProps {
  previousSessions: Session[];
}

const PreviousDays: React.FC<PreviousDaysProps> = ({ previousSessions }) => {
  return (
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
  );
};

export default PreviousDays;
