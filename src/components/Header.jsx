import React, { useEffect, useState } from 'react';

const Header = ({ navigate, selectedProblem, setSelectedProblem, problems, language, handleLanguageChange }) => {
  const [solvedCount, setSolvedCount] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/compiler/api/solved-count/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.solved_count !== undefined) {
            setSolvedCount(data.solved_count);
          }
        })
        .catch(err => {
          console.error("Failed to fetch solved count:", err);
        });
    }
  }, []);

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/60 flex-shrink-0 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => selectedProblem ? setSelectedProblem(null) : navigate('/')}
              className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-200 hover:bg-slate-700/30 px-3 py-2 rounded-lg"
            >
              <svg 
                className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">
                {selectedProblem ? 'Back to Problems' : 'Back to Home'}
              </span>
            </button>
            
            <div className="h-6 w-px bg-gradient-to-b from-transparent via-slate-500 to-transparent"></div>
            
            <div className="flex items-center space-x-3">
              {selectedProblem && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">
                    Problem
                  </span>
                </div>
              )}
              <h1 className="text-lg font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                {selectedProblem 
                  ? (
                    <span className="flex items-center space-x-2">
                      <span className="text-purple-400 font-mono">#{selectedProblem.id}</span>
                      <span>{selectedProblem.title}</span>
                    </span>
                  ) 
                  : 'CodeJudge Problems'
                }
              </h1>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {!selectedProblem && (
              <div className="flex items-center space-x-2 bg-slate-700/30 px-3 py-2 rounded-lg border border-slate-600/30">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-300">
                  {problems.length} Problem{problems.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}

            {selectedProblem && (
              <div className="flex items-center space-x-3">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Language
                </span>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="appearance-none bg-slate-700/80 border border-slate-600/60 rounded-lg px-4 py-2.5 pr-10 text-white font-medium focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 hover:bg-slate-700 cursor-pointer"
                  >
                    <option value="python">🐍 Python</option>
                    <option value="java">☕ Java</option>
                    <option value="cpp">⚡ C++</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* ✅ Solved count badge */}
                {solvedCount !== null && (
                  <div className="flex items-center space-x-2 bg-purple-600/30 px-3 py-2 rounded-lg border border-purple-400/30 text-sm text-purple-200">
                    <span className="font-medium">Solved:</span>
                    <span className="font-mono">{solvedCount}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
    </header>
  );
};

export default Header;
