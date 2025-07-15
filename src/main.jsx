import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OnlineJudgePage from './pages/OnlineJudgePage';
import LoginPage from './pages/LoginPage';
import './index.css';
import LeaderboardPage from './pages/LeaderboardPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/judge" element={<OnlineJudgePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
