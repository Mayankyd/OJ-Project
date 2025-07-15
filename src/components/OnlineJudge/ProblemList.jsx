import React from 'react';
import ProblemRow from './ProblemRow';

const ProblemList = ({ problems, handleProblemSelect, solvedProblems }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Problems
          </h2>
        </div>
        <p className="text-gray-400 text-sm ml-8">
          Choose a problem to start coding
        </p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 px-6 py-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <div className="text-xs text-gray-500 font-mono">
              {problems.length} problem{problems.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-700/50">
          {problems.map((problem, index) => (
            <div
              key={problem.id}
              className="transition-all duration-200 hover:bg-slate-700/30 group"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'fadeInUp 0.5s ease-out forwards'
              }}
            >
              <ProblemRow
                problem={problem}
                handleProblemSelect={handleProblemSelect}
                isSolved={solvedProblems?.includes(problem.id)} // ✅ pass solved flag
              />
            </div>
          ))}
        </div>

        {problems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 mb-4 opacity-20">
              <svg className="w-full h-full text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-400 mb-2">No problems available</h3>
            <p className="text-gray-500 text-sm max-w-sm">
              Problems will appear here once they're loaded
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProblemList;
