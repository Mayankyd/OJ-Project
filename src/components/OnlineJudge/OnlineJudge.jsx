import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import ProblemList from './ProblemList';
import ProblemDescription from './ProblemDescription';
import CodeEditor from '../CodeEditor';
import OutputSection from './OutputSection';

const OnlineJudge = () => {
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem('token');
    return stored && stored !== 'null' && stored !== 'undefined' ? stored : null;
  });

  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  // ✅ Sync token on login/signup/logout
  useEffect(() => {
    const handleStorageChange = () => {
      const latest = localStorage.getItem('token');
      setToken(latest && latest !== 'null' && latest !== 'undefined' ? latest : null);
    };
    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ✅ Fetch problems and solved state
  useEffect(() => {
    if (!token) {
      setProblems([]);
      setSolvedProblems([]);
      setSelectedProblem(null);
      setOutput('');
      setStatus('');
      setCode('');
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/compiler/api/problems/`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const fetchedProblems = Array.isArray(res.data.results) ? res.data.results : res.data;
        setProblems(fetchedProblems);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch problems:', err.message || err);
        setProblems([]);
      });

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/compiler/api/solved/`, {
        headers: {
          Authorization: `Token ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        if (res.data && Array.isArray(res.data.solved_ids)) {
          setSolvedProblems(res.data.solved_ids);
        } else {
          setSolvedProblems([]);
        }
      })
      .catch((err) => {
        console.error('❌ Could not fetch solved problems:', err.message || err);
        setSolvedProblems([]);
      });
  }, [token]);

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
    if (!token) {
      alert('Please log in to run code.');
      return;
    }

    setIsRunning(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/compiler/submit/`,
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
    if (!token) {
      alert('Please log in to submit solutions.');
      return;
    }

    setIsRunning(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/compiler/submit/`,
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

      const solvedRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/compiler/api/solved/`, {
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

      {!token ? (
        <div className="text-center text-gray-400 text-lg py-8">Please log in to view problems.</div>
      ) : !selectedProblem ? (
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
