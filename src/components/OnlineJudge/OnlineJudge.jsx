import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import ProblemList from './ProblemList';
import ProblemDescription from './ProblemDescription';
import CodeEditor from '../CodeEditor';
import OutputSection from './OutputSection';
import { problems } from '../../data/problems';

const OnlineJudge = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setCode(problem.defaultCode[language]);
    setOutput('');
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (selectedProblem) {
      setCode(selectedProblem.defaultCode[newLanguage]);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput(`Code executed successfully!
Language: ${language}
Status: Accepted`);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput(`Submission Result:
✅ All test cases passed!`);
      setIsRunning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <Header
        navigate={navigate}
        selectedProblem={selectedProblem}
        setSelectedProblem={setSelectedProblem}
        problems={problems}
        language={language}
        handleLanguageChange={handleLanguageChange}
      />

      {!selectedProblem ? (
        <ProblemList problems={problems} handleProblemSelect={handleProblemSelect} />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          <ProblemDescription problem={selectedProblem} />
          <div className="w-1/2 flex flex-col">
            <CodeEditor
              code={code}
              setCode={setCode}
              isRunning={isRunning}
              handleRunCode={handleRunCode}
              handleSubmit={handleSubmit}
            />
            <OutputSection output={output} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineJudge;
