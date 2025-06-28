import React, { useState } from 'react';

const OnlineJudge = ({ onBackToHome }) => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        }
      ],
      constraints: [
        "2 ≤ nums.length ≤ 10⁴",
        "-10⁹ ≤ nums[i] ≤ 10⁹",
        "-10⁹ ≤ target ≤ 10⁹"
      ],
      defaultCode: {
        python: `def twoSum(nums, target):
    # Write your code here
    pass`,
        javascript: `function twoSum(nums, target) {
    // Write your code here
}`,
        java: `public int[] twoSum(int[] nums, int target) {
    // Write your code here
    return new int[0];
}`,
        cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    return {};
}`
      }
    },
    {
      id: 2,
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Strings",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      examples: [
        {
          input: "s = \"()\"",
          output: "true",
          explanation: "The string contains valid parentheses."
        }
      ],
      constraints: [
        "1 ≤ s.length ≤ 10⁴",
        "s consists of parentheses only '()[]{}'."
      ],
      defaultCode: {
        python: `def isValid(s):
    # Write your code here
    pass`,
        javascript: `function isValid(s) {
    // Write your code here
}`,
        java: `public boolean isValid(String s) {
    // Write your code here
    return false;
}`,
        cpp: `bool isValid(string s) {
    // Write your code here
    return false;
}`
      }
    },
    {
      id: 3,
      title: "Maximum Subarray",
      difficulty: "Medium",
      category: "Dynamic Programming",
      description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
      examples: [
        {
          input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
          output: "6",
          explanation: "[4,-1,2,1] has the largest sum = 6."
        }
      ],
      constraints: [
        "1 ≤ nums.length ≤ 10⁵",
        "-10⁴ ≤ nums[i] ≤ 10⁴"
      ],
      defaultCode: {
        python: `def maxSubArray(nums):
    # Write your code here
    pass`,
        javascript: `function maxSubArray(nums) {
    // Write your code here
}`,
        java: `public int maxSubArray(int[] nums) {
    // Write your code here
    return 0;
}`,
        cpp: `int maxSubArray(vector<int>& nums) {
    // Write your code here
    return 0;
}`
      }
    },
    {
      id: 4,
      title: "Binary Tree Inorder Traversal",
      difficulty: "Easy",
      category: "Trees",
      description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
      examples: [
        {
          input: "root = [1,null,2,3]",
          output: "[1,3,2]",
          explanation: "Inorder traversal gives [1,3,2]."
        }
      ],
      constraints: [
        "The number of nodes in the tree is in the range [0, 100].",
        "-100 ≤ Node.val ≤ 100"
      ],
      defaultCode: {
        python: `def inorderTraversal(root):
    # Write your code here
    pass`,
        javascript: `function inorderTraversal(root) {
    // Write your code here
}`,
        java: `public List<Integer> inorderTraversal(TreeNode root) {
    // Write your code here
    return new ArrayList<>();
}`,
        cpp: `vector<int> inorderTraversal(TreeNode* root) {
    // Write your code here
    return {};
}`
      }
    },
    {
      id: 5,
      title: "Climbing Stairs",
      difficulty: "Easy",
      category: "Dynamic Programming",
      description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      examples: [
        {
          input: "n = 2",
          output: "2",
          explanation: "There are two ways to climb to the top: 1+1 or 2."
        }
      ],
      constraints: [
        "1 ≤ n ≤ 45"
      ],
      defaultCode: {
        python: `def climbStairs(n):
    # Write your code here
    pass`,
        javascript: `function climbStairs(n) {
    // Write your code here
}`,
        java: `public int climbStairs(int n) {
    // Write your code here
    return 0;
}`,
        cpp: `int climbStairs(int n) {
    // Write your code here
    return 0;
}`
      }
    }
  ];

  const languages = [
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'javascript', label: 'JavaScript', icon: '🟨' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚡' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

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
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Code executed successfully!
Language: ${languages.find(l => l.value === language)?.label}
Status: Accepted
Runtime: ${Math.floor(Math.random() * 100)}ms
Memory: ${Math.floor(Math.random() * 50)}MB

Sample Output:
${selectedProblem?.examples[0]?.output || 'Output will appear here'}`);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput(`Submission Result:
✅ All test cases passed!
Runtime: ${Math.floor(Math.random() * 100)}ms (Beats ${Math.floor(Math.random() * 30) + 70}% of submissions)
Memory: ${Math.floor(Math.random() * 50)}MB (Beats ${Math.floor(Math.random() * 30) + 70}% of submissions)

Test Cases: 15/15 passed`);
      setIsRunning(false);
    }, 3000);
  };

  if (!selectedProblem) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Header */}
        <header className="bg-slate-800/50 border-b border-slate-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBackToHome}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back to Home</span>
                </button>
                <div className="h-6 w-px bg-slate-600"></div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  CodeJudge Problems
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">{problems.length} Problems</span>
              </div>
            </div>
          </div>
        </header>

        {/* Problem List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Practice Problems</h2>
            <p className="text-gray-400">Choose a problem to start coding and improve your skills.</p>
          </div>

          <div className="grid gap-6">
            {problems.map((problem) => (
              <div
                key={problem.id}
                onClick={() => handleProblemSelect(problem)}
                className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.02] group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {problem.id}. {problem.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                        {problem.category}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{problem.description}</p>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Click to solve</span>
                  <div className="flex items-center space-x-4">
                    <span>💡 {Math.floor(Math.random() * 1000) + 100} solutions</span>
                    <span>👥 {Math.floor(Math.random() * 500) + 50} discussions</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedProblem(null)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Problems</span>
              </button>
              <div className="h-6 w-px bg-slate-600"></div>
              <h1 className="text-lg font-semibold text-white">
                {selectedProblem.id}. {selectedProblem.title}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(selectedProblem.difficulty)}`}>
                {selectedProblem.difficulty}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.icon} {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Problem Description */}
        <div className="w-1/2 border-r border-slate-700 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">{selectedProblem.title}</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{selectedProblem.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
              {selectedProblem.examples.map((example, index) => (
                <div key={index} className="bg-slate-800/50 rounded-lg p-4 mb-4">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-400">Input:</span>
                    <code className="block bg-slate-900 p-2 rounded mt-1 text-green-400 font-mono text-sm">
                      {example.input}
                    </code>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-400">Output:</span>
                    <code className="block bg-slate-900 p-2 rounded mt-1 text-blue-400 font-mono text-sm">
                      {example.output}
                    </code>
                  </div>
                  {example.explanation && (
                    <div>
                      <span className="text-sm font-medium text-gray-400">Explanation:</span>
                      <p className="text-gray-300 text-sm mt-1">{example.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
              <ul className="space-y-1">
                {selectedProblem.constraints.map((constraint, index) => (
                  <li key={index} className="text-gray-300 text-sm">• {constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-800/30 p-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Code Editor</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isRunning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Running...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 010 5H9m4.5-5H15a2.5 2.5 0 010 5h-1.5m-4-5h4" />
                        </svg>
                        <span>Run</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isRunning}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isRunning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>Submit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-slate-900 text-white font-mono text-sm p-4 resize-none focus:outline-none"
                placeholder="Write your code here..."
                spellCheck={false}
              />
            </div>
          </div>

          {/* Output Section */}
          <div className="h-1/3 border-t border-slate-700 bg-slate-800/30">
            <div className="p-4 border-b border-slate-700">
              <h3 className="text-sm font-medium text-gray-400">Output</h3>
            </div>
            <div className="p-4 h-full overflow-y-auto">
              {output ? (
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">{output}</pre>
              ) : (
                <p className="text-gray-500 text-sm">Run your code to see the output here.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineJudge;