import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import ProblemList from './ProblemList';
import ProblemDescription from './ProblemDescription';
import CodeEditor from '../CodeEditor';
import OutputSection from './OutputSection';

const OnlineJudge = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem('token');

  axios
    .get(`${baseURL}/compiler/api/problems/`, {
      headers: {
        Authorization: token ? `Token ${token}` : undefined,
      },
    })
    .then((res) => {
      setProblems(res.data);
    })
    .catch((err) => {
      console.error('Failed to fetch problems:', err);
    });

  if (!token) {
    // ✅ Not logged in, skip fetching solved problems
    setSolvedProblems([]);  // Clear just in case
    return;
  }

  axios
    .get(`${baseURL}/compiler/api/solved/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      setSolvedProblems(res.data.solved_ids);
    })
    .catch((err) => {
      console.error("❌ Could not fetch solved problems", err.response);
    });
}, []);


  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setCode((problem.defaultCode && problem.defaultCode[language]) || '');
    setOutput('');
    setStatus('');
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (selectedProblem) {
      setCode((selectedProblem.defaultCode && selectedProblem.defaultCode[newLanguage]) || '');
    }
  };

  const handleRunCode = async () => {
    if (!selectedProblem) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to run code.');
      return;
    }

    setIsRunning(true);
    try {
      const response = await axios.post(
         `${baseURL}/compiler/submit/`,
        {
          language: language === 'python' ? 'py' : 'cpp',
          problem_id: selectedProblem.id,
          code,
          mode: 'run',
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const detail = response.data.details?.[0];
      setOutput(
        `Sample Test Case ${detail.status === 'Passed' ? 'Passed' : 'Failed'}\n` +
        `Expected Output: ${detail.expected}\n` +
        `Your Output: ${detail.actual}`
      );
      setStatus(detail.status);
    } catch (error) {
      setOutput(`Runtime Error\n${error.response?.data?.error || error.message}`);
      setStatus('Runtime Error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedProblem) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to submit solutions.');
      return;
    }

    setIsRunning(true);
    try {
      const response = await axios.post(
         `${baseURL}/compiler/submit/`,
        {
          language: language === 'python' ? 'py' : 'cpp',
          problem_id: selectedProblem.id,
          code,
          mode: 'submit',
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const allPassed = response.data.details.every((test) => test.status === 'Passed');
      const statusText = response.data.status;

      setOutput(
        `Submission Result:\nStatus: ${statusText}\n` +
        (allPassed
          ? `All test cases passed!`
          : response.data.details
              .map(
                (test, idx) =>
                  `Test Case ${idx + 1}: ${test.status}\nExpected: ${test.expected}\nYour Output: ${test.actual}`
              )
              .join('\n\n'))
      );

      setStatus(statusText);

      // ✅ Re-fetch solved problems after successful submission
      const solvedRes = await axios.get( `${import.meta.env.VITE_API_BASE_URL}/compiler/api/solved/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSolvedProblems(solvedRes.data.solved_ids);

    } catch (error) {
      setOutput(`Error\n${error.response?.data?.error || error.message}`);
      setStatus('Error');
    } finally {
      setIsRunning(false);
    }
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
        <ProblemList
          problems={problems}
          handleProblemSelect={handleProblemSelect}
          solvedProblems={solvedProblems}
        />
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
              language={language}
            />
            <OutputSection
              output={output}
              status={status}
              userCode={code}
              currentProblemId={selectedProblem?.id || ''}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineJudge;
