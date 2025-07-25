import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const CodeEditor = ({ code, setCode, isRunning, handleRunCode, handleSubmit, language }) => {
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const lastLine = code.trim().split('\n').pop();
      if (lastLine.length > 2 && language) {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/compiler/ai_syntax_suggest/`, {
          code_snippet: lastLine,
          language: language,
        })
        .then((res) => setSuggestion(res.data.suggestion || ''))
        .catch(() => setSuggestion(''));
      }
    }, 700);

    return () => clearTimeout(timeout);
  }, [code, language]);

  const handleEditorDidMount = (editor, monaco) => {
  editor.addCommand(monaco.KeyCode.Tab, () => {
    if (suggestion) {
      const position = editor.getPosition();
      const model = editor.getModel();
      const lineNumber = position.lineNumber;

      // Replace the entire current line with the suggestion
      const range = new monaco.Range(lineNumber, 1, lineNumber, model.getLineMaxColumn(lineNumber));
      const editOperation = {
        range: range,
        text: suggestion,
        forceMoveMarkers: true
      };

      model.pushEditOperations([], [editOperation], () => null);
      setSuggestion('');
    }
  });
};

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-600 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 border-b border-gray-600 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-lg font-bold text-white">Code Editor</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
            <span className="text-sm text-gray-300 uppercase tracking-wider font-semibold">
              {isRunning ? 'Running' : 'Ready'}
            </span>
          </div>
          <div className="h-6 w-px bg-gray-600"></div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="group relative px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-green-500/30 transform hover:scale-105"
            >
              <svg className={`w-4 h-4 ${isRunning ? 'animate-spin' : 'group-hover:scale-110'} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRunning ? "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" : "M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-8V3a1 1 0 011-1h1a1 1 0 011 1v3M8 21l4-7 4 7M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"} />
              </svg>
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              {!isRunning && (
                <kbd className="hidden sm:inline-block ml-2 px-2 py-1 text-xs font-mono bg-green-700/40 rounded border border-green-500/30">
                  Ctrl+R
                </kbd>
              )}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isRunning}
              className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white text-sm font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-purple-500/30 transform hover:scale-105"
            >
              <svg className={`w-4 h-4 ${isRunning ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>{isRunning ? 'Submitting...' : 'Submit'}</span>
              {!isRunning && (
                <kbd className="hidden sm:inline-block ml-2 px-2 py-1 text-xs font-mono bg-purple-700/40 rounded border border-purple-500/30">
                  Ctrl+S
                </kbd>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Monaco Code Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={language || 'cpp'}
          value={code}
          onChange={(value) => setCode(value)}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontSize: 13,
            tabSize: 4,
            fontFamily: 'Fira Code, monospace',
            minimap: { enabled: false },
            automaticLayout: true,
            formatOnType: true,
            formatOnPaste: true,
            wordWrap: 'on'
          }}
        />
        {suggestion && (
          <div className="absolute bottom-3 left-3 bg-black/70 text-green-400 text-xs px-2 py-1 rounded border border-green-700">
            Suggestion: <code>{suggestion}</code> <span className="text-gray-400 ml-2">(Press Tab to accept)</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-3 border-t border-gray-600 flex items-center justify-between text-sm text-gray-300">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold">Lines: <span className="text-white">{code.split('\n').length}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-semibold">Characters: <span className="text-white">{code.length}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5 20h14L17 4M9 9v6m6-6v6" />
            </svg>
            <span className="font-semibold">Words: <span className="text-white">{code.split(/\s+/).filter(w => w).length}</span></span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-bold">Code Editor</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
