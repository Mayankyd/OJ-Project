import React, { useState } from 'react';

const ProblemDescription = ({ problem }) => {
  const [activeTab, setActiveTab] = useState('description');

  const difficultyColors = {
    easy: 'text-green-400 bg-green-400/10 border-green-400/20',
    medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    hard: 'text-red-400 bg-red-400/10 border-red-400/20'
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-1/2 border-r border-slate-700/60 overflow-hidden flex flex-col bg-slate-900/20">
      {/* Header */}
      <div className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/60 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{problem.title}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full border font-medium ${difficultyColors[problem.difficulty?.toLowerCase()] || difficultyColors.medium}`}>
                  {problem.difficulty || 'Medium'}
                </span>
                <span className="text-xs text-gray-400">#{problem.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-700/30 p-1 rounded-lg">
          {['description', 'examples', 'constraints'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-600/30'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {activeTab === 'description' && (
            <div className="space-y-6">
              {/* Problem Statement with distinct styling */}
              <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-xl border-2 border-purple-600 p-6 shadow-2xl transition-all duration-300 hover:shadow-purple-500/40">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-purple-300 uppercase tracking-wider">Problem Statement</h3>
                </div>
                <pre className="whitespace-pre-wrap text-gray-200 leading-relaxed text-base font-medium bg-slate-800/60 rounded-lg p-4 border border-slate-600/40">
{problem.description}
</pre>
              </div>
              
              {problem.tags && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-700/50 text-gray-300 text-sm rounded-full border border-slate-600/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Examples</h3>
                <span className="text-sm text-gray-400">{problem.examples?.length || 0} example(s)</span>
              </div>
              
              {problem.examples?.map((example, index) => (
                <div key={index} className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
                  <div className="bg-slate-800/60 px-4 py-2 border-b border-slate-700/50">
                    <span className="text-sm font-medium text-purple-400">Example {index + 1}</span>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-400">Input:</span>
                        <button 
                          onClick={() => copyToClipboard(example.input)}
                          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-700/30">
                        <code className="text-green-400 font-mono text-sm break-all">{example.input}</code>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-400">Output:</span>
                        <button 
                          onClick={() => copyToClipboard(example.output)}
                          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-700/30">
                        <code className="text-blue-400 font-mono text-sm break-all">{example.output}</code>
                      </div>
                    </div>
                    
                    {example.explanation && (
                      <div>
                        <span className="text-sm font-medium text-gray-400 mb-2 block">Explanation:</span>
                        <div className="bg-slate-700/20 rounded-lg p-3 border-l-4 border-purple-500/50">
                          <p className="text-gray-300 text-sm leading-relaxed">{example.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'constraints' && (
  <div className="space-y-4">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-white">Constraints</h3>
      <span className="text-sm text-gray-400">{problem.constraints?.length || 0} constraint(s)</span>
    </div>

    <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4">
      <div className="space-y-3">
        {problem.constraints?.map((constraint, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <code className="text-gray-300 text-sm font-mono break-all">{constraint.text}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
