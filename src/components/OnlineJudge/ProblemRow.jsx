import React, { useState } from 'react';

const ProblemRow = ({ problem, handleProblemSelect, isSolved }) => {
  const [isStarred, setIsStarred] = useState(false);

  const defaultProblem = {
    id: 1,
    title: 'Sample Problem',
    acceptance: 85,
    difficulty: 'Easy'
  };

  const currentProblem = problem || defaultProblem;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-emerald-400';
      case 'Medium': return 'text-amber-400';
      case 'Hard': return 'text-rose-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyBadgeStyle = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
      case 'Medium': return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      case 'Hard': return 'bg-rose-500/10 border-rose-500/20 text-rose-400';
      default: return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
    }
  };

  const handleStarClick = (e) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
  };

  return (
    <div
      onClick={() => handleProblemSelect && handleProblemSelect(currentProblem)}
      className="w-full flex items-center justify-between p-6 hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group border-l-4 border-transparent hover:border-l-blue-500/60 bg-slate-800/20"
    >
      {/* Left Section - Status & Problem Info */}
      <div className="flex items-center space-x-4 flex-1 min-w-0">
  {/* Status Icon */}
  <div className="flex-shrink-0">
  <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${isSolved ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-gray-600/10 border-gray-500/20'}`}>
    {isSolved ? (
      <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
      </svg>
    )}
  </div>
</div>


  {/* Problem ID */}
  <div className="flex-shrink-0">
    <span className="text-gray-400 font-mono text-sm font-medium">#{currentProblem.id}</span>
  </div>

  {/* Problem Title */}
  <div className="flex-1 min-w-0">
    <h3 className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors truncate">
      {currentProblem.title}
    </h3>
  </div>
</div>

      {/* Center Section - Metadata */}
      <div className="hidden md:flex items-center space-x-8 flex-shrink-0">
        <div className="text-center">
          <div className="text-gray-300 font-medium">{currentProblem.acceptance}%</div>
          <div className="text-xs text-gray-500">Acceptance</div>
        </div>

        <div className="text-center">
          <div className={`text-xs px-3 py-1.5 rounded-full border font-medium ${getDifficultyBadgeStyle(currentProblem.difficulty)}`}>
            {currentProblem.difficulty === 'Medium' ? 'Med.' : currentProblem.difficulty}
          </div>
        </div>

        <div className="flex items-center space-x-1 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-gray-500 rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="md:hidden flex items-center space-x-4">
        <span className="text-gray-400 text-sm">{currentProblem.acceptance}%</span>
        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getDifficultyBadgeStyle(currentProblem.difficulty)}`}>
          {currentProblem.difficulty === 'Medium' ? 'Med.' : currentProblem.difficulty}
        </span>
      </div>

      <div className="flex items-center space-x-4 flex-shrink-0 ml-6">
        <button className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-600/50 transition-all opacity-0 group-hover:opacity-100">
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>

        <button
          onClick={handleStarClick}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-600/50 transition-all duration-200 group/star"
        >
          {isStarred ? (
            <svg className="w-5 h-5 text-yellow-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-500 group-hover/star:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )}
        </button>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProblemRow;
