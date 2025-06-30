import React from 'react';

const CodeEditor = ({ code, setCode, isRunning, handleRunCode, handleSubmit }) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800/40 backdrop-blur-sm p-4 border-b border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="h-4 w-px bg-slate-600"></div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-sm font-medium text-gray-300">Code Editor</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-yellow-500 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              {isRunning ? 'Running' : 'Ready'}
            </span>
          </div>
          
          <div className="h-4 w-px bg-slate-600"></div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="group relative px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-green-500/25"
            >
              <svg className={`w-4 h-4 ${isRunning ? 'animate-spin' : 'group-hover:scale-110'} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRunning ? "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" : "M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-8V3a1 1 0 011-1h1a1 1 0 011 1v3M8 21l4-7 4 7M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"} />
              </svg>
              <span>{isRunning ? 'Running...' : 'Run'}</span>
              {!isRunning && (
                <kbd className="hidden sm:inline-block ml-2 px-2 py-1 text-xs font-mono bg-green-800/30 rounded border border-green-600/20">
                  Ctrl+R
                </kbd>
              )}
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isRunning}
              className="group relative px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-purple-500/25"
            >
              <svg className={`w-4 h-4 ${isRunning ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>{isRunning ? 'Submitting...' : 'Submit'}</span>
              {!isRunning && (
                <kbd className="hidden sm:inline-block ml-2 px-2 py-1 text-xs font-mono bg-purple-800/30 rounded border border-purple-600/20">
                  Ctrl+S
                </kbd>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative">
        {/* Line numbers background */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-800/30 border-r border-slate-700/50 flex flex-col text-xs text-gray-500 font-mono">
          {code.split('\n').map((_, index) => (
            <div key={index} className="h-6 flex items-center justify-end pr-2 leading-6">
              {index + 1}
            </div>
          ))}
        </div>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-transparent text-white font-mono text-sm pl-16 pr-4 py-4 resize-none focus:outline-none leading-6 placeholder-gray-500"
          placeholder="// Start coding here...
// Use Ctrl+R to run your code
// Use Ctrl+S to submit your solution"
          spellCheck={false}
          style={{ 
            lineHeight: '1.5rem',
            tabSize: 2
          }}
        />
        
        {/* Code highlighting overlay could be added here */}
        {code.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-gray-600">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <p className="text-sm font-medium">Start writing your solution</p>
              <p className="text-xs mt-1 opacity-75">Use the editor above to write your code</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom status bar */}
      <div className="bg-slate-800/20 px-4 py-2 border-t border-slate-700/50 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <span>Lines: {code.split('\n').length}</span>
          <span>Characters: {code.length}</span>
          <span>Words: {code.split(/\s+/).filter(word => word.length > 0).length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-purple-400">Monaco Editor</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;