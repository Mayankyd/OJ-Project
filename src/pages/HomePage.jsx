import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const phrases = [
    'Algorithms & Data Structures',
    'Dynamic Programming',
    'Graph Theory',
    'System Design',
    'Competitive Programming'
  ];

  // Check login status
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const storedUserName = localStorage.getItem('userName');
    const storedUserEmail = localStorage.getItem('userEmail');
    
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
      setUserName(storedUserName || 'User');
      setUserEmail(storedUserEmail || '');
    }
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let currentIndex = 0;
    let isDeleting = false;

    const typeInterval = setInterval(() => {
      if (!isDeleting && currentIndex < currentPhrase.length) {
        setTypedText(currentPhrase.substring(0, currentIndex + 1));
        currentIndex++;
      } else if (isDeleting && currentIndex > 0) {
        setTypedText(currentPhrase.substring(0, currentIndex - 1));
        currentIndex--;
      } else if (!isDeleting && currentIndex === currentPhrase.length) {
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      } else if (isDeleting && currentIndex === 0) {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        isDeleting = false;
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(typeInterval);
  }, [currentPhraseIndex]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setShowProfileMenu(false);
    window.location.href = '/';
  };

  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Generate a consistent color based on the user's name
  const getAvatarColor = (name) => {
    if (!name) return 'from-purple-500 to-cyan-500';
    
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-pink-500 to-rose-500',
      'from-cyan-500 to-blue-500',
      'from-teal-500 to-green-500'
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                CodeJudge
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#popular" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105">Problems</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105">Practice</a>
              <a href="#stats" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105">Leaderboard</a>

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none"
                  >
                    {/* Profile Avatar */}
                    <div className={`w-10 h-10 bg-gradient-to-r ${getAvatarColor(userName)} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                      <span className="text-white font-semibold text-sm">
                        {getInitials(userName)}
                      </span>
                    </div>
                    <span className="hidden lg:block font-medium">{userName}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-fadeIn z-50">
                      <div className="px-4 py-3 border-b border-slate-700">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-r ${getAvatarColor(userName)} rounded-full flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-semibold">
                              {getInitials(userName)}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{userName}</p>
                            <p className="text-gray-400 text-sm">{userEmail}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-1">
                        <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Profile</span>
                        </button>
                        
                        <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Settings</span>
                        </button>
                        
                        <div className="border-t border-slate-700 my-1"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Sign In
                </Link>
              )}

              <Link to="/judge" className="relative bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-2 rounded-lg overflow-hidden group">
                <span className="relative z-10">Start Coding</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-slate-800/95 backdrop-blur-lg rounded-lg mt-2 p-4 animate-fadeIn">
              <div className="flex flex-col space-y-3">
                {isLoggedIn && (
                  <div className="flex items-center space-x-3 pb-3 border-b border-slate-700">
                    <div className={`w-10 h-10 bg-gradient-to-r ${getAvatarColor(userName)} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-semibold text-sm">
                        {getInitials(userName)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{userName}</p>
                      <p className="text-gray-400 text-sm">{userEmail}</p>
                    </div>
                  </div>
                )}
                
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Problems</a>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">Practice</a>
                <a href="#stats" className="text-gray-300 hover:text-white transition-colors">Leaderboard</a>
                
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors text-left">
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                    Sign In
                  </Link>
                )}
                
                <Link to="/judge" className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-2 rounded-lg text-center">
                  Start Coding
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-32 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
          
          {/* Floating Code Elements */}
          <div className="absolute top-32 right-40 text-purple-400/30 text-6xl font-mono animate-bounce delay-500">{'<}'}</div>
          <div className="absolute bottom-40 left-20 text-cyan-400/30 text-4xl font-mono animate-bounce delay-1000">{'[]'}</div>
          <div className="absolute top-60 left-60 text-pink-400/30 text-5xl font-mono animate-bounce delay-1500">{'()'}</div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full text-sm font-medium text-purple-300 border border-purple-500/30 animate-fadeIn">
                🚀 Master Problem Solving
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeIn">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Code. Solve. 
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Excel.
              </span>
            </h1>

            <div className="text-xl md:text-2xl text-gray-300 mb-4 h-8">
              Practice <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-semibold">
                {typedText}
              </span>
              <span className="animate-blink">|</span>
            </div>
            
            <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join thousands of developers solving algorithmic challenges, improving their coding skills, and preparing for technical interviews.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
             <Link 
    to="/judge" 
    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
    <span className="relative z-10">Start Solving</span>
  </Link>
              
              <Link 
    to="/judge" 
    className="group px-8 py-4 border-2 border-purple-500/50 text-purple-400 font-semibold rounded-2xl hover:bg-purple-500/10 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 010 5H9m4.5-5H15a2.5 2.5 0 010 5h-1.5m-4-5h4" />
    </svg>
    <span>View Problems</span>
  </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: '10+', label: 'Problems' },
                { number: 'XX+', label: 'Solved Daily' },
                { number: '10+', label: 'Topics' },
                { number: '24/7', label: 'Available' }
              ].map((stat, index) => (
                <div key={index} className="text-center animate-fadeIn" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">CodeJudge?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to master problem-solving and ace your coding interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: "⚡", 
                title: "Instant Feedback", 
                description: "Get immediate results with detailed test case analysis and performance metrics.",
                gradient: "from-yellow-400 to-orange-500"
              },
              { 
                icon: "🎯", 
                title: "Curated Problems", 
                description: "Handpicked problems from easy to expert level, covering all major algorithmic concepts.",
                gradient: "from-green-400 to-blue-500"
              },
              { 
                icon: "🌐", 
                title: "Multi-Language", 
                description: "Code in Python, Java, C++, JavaScript, Go, and 10+ other programming languages.",
                gradient: "from-purple-400 to-pink-500"
              },
              { 
                icon: "📊", 
                title: "Progress Tracking", 
                description: "Visualize your improvement with detailed analytics and submission history.",
                gradient: "from-cyan-400 to-teal-500"
              },
              { 
                icon: "🏆", 
                title: "Competitions", 
                description: "Join weekly contests and compete with developers from around the world.",
                gradient: "from-red-400 to-pink-500"
              },
              { 
                icon: "💡", 
                title: "Smart Hints", 
                description: "Stuck? Get progressive hints that guide you without giving away the solution.",
                gradient: "from-indigo-400 to-purple-500"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group bg-slate-900/50 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
                <div className={`w-0 group-hover:w-full h-1 bg-gradient-to-r ${feature.gradient} transition-all duration-500 mt-4 rounded`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics Section */}
      <section id="popular" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Popular Topics</h2>
            <p className="text-xl text-gray-400">Master the most in-demand algorithmic concepts</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Arrays', count: '120+', color: 'from-red-500 to-pink-500' },
              { name: 'Dynamic Programming', count: '80+', color: 'from-blue-500 to-cyan-500' },
              { name: 'Trees & Graphs', count: '90+', color: 'from-green-500 to-teal-500' },
              { name: 'Strings', count: '70+', color: 'from-purple-500 to-indigo-500' },
              { name: 'Sorting', count: '50+', color: 'from-yellow-500 to-orange-500' },
              { name: 'Binary Search', count: '40+', color: 'from-pink-500 to-rose-500' },
              { name: 'Backtracking', count: '35+', color: 'from-indigo-500 to-purple-500' },
              { name: 'Math', count: '45+', color: 'from-cyan-500 to-blue-500' }
            ].map((topic, index) => (
              <div 
                key={index}
                className="group bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${topic.color} rounded-lg mb-4 group-hover:animate-pulse`}></div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors">{topic.name}</h3>
                <p className="text-gray-400 text-sm">{topic.count} problems</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of developers who are already improving their skills every day.
          </p>
          <Link
      to="/login" // This will navigate to your LoginPage.jsx
      className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 group"
    >
      <span>Start Your Journey</span>
      <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Problems</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contests</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discuss</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CodeJudge. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;