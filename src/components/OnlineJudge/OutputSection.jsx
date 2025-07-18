import React, { useState } from 'react';
import { getCookie } from '../../utils/csrf';

const OutputSection = ({ output, status, userCode, currentProblemId }) => {
  const [loadingHint, setLoadingHint] = useState(false);

  const handleAskAI = async () => {
    setLoadingHint(true);
    const csrftoken = getCookie('csrftoken');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/compiler/ai_hint/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        credentials: 'include',
        body: JSON.stringify({
          code: userCode,
          problem_id: currentProblemId
        })
      });
      const data = await res.json();
      alert(data.hint || "No hint available.");
    } catch (error) {
      alert("Failed to fetch hint. Please try again later.");
    } finally {
      setLoadingHint(false);
    }
  };

  return (
    <div className="h-1/3 border-t border-slate-700 bg-slate-800/30 flex flex-col">
      <div className="p-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <h3 className="text-sm font-semibold text-gray-300 tracking-wide">Output</h3>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {output ? (
          <div className="relative">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed p-3 bg-slate-900/30 rounded-lg border border-slate-700/50 shadow-inner">
              {output}
            </pre>
            {status === 'Wrong Answer' && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-600 rounded-lg text-sm text-red-200">
                <p className="mb-2">Your code is incorrect. Need help?</p>
                <button
                  onClick={handleAskAI}
                  disabled={loadingHint}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded"
                >
                  {loadingHint ? 'Asking AI...' : 'Ask AI for a Hint'}
                </button>
              </div>
            )}
            <div className="absolute top-2 right-2 opacity-30 hover:opacity-100 transition-opacity">
              <button className="p-1 text-xs text-gray-500 hover:text-gray-300">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-12 h-12 mb-4 opacity-20">
              <svg className="w-full h-full text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm mb-2 font-medium">No output yet</p>
            <p className="text-gray-600 text-xs max-w-xs">
              Execute your code to see the results displayed here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputSection;
