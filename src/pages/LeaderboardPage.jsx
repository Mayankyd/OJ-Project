import React, { useEffect, useState } from 'react';

const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/compiler/api/leaderboard/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
        setLoading(false);
      });
  }, []);

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankClass = (rank) => {
    switch(rank) {
      case 1: return 'text-yellow-400 font-bold';
      case 2: return 'text-gray-300 font-bold';
      case 3: return 'text-amber-600 font-bold';
      default: return 'text-slate-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section - Matching homepage style */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            🏆 <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Leaderboard</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Top performers in algorithmic challenges, improving their coding skills, and preparing for technical interviews.
          </p>
        </div>

        {/* Top 3 Podium - Redesigned to match homepage */}
        {users.length >= 3 && (
          <div className="mb-16">
            <div className="flex justify-center items-end gap-8 mb-8">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg">
                  2
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  {users[1]?.first_name || users[1]?.username}
                </h3>
                <div className="text-slate-400 text-sm mb-2">@{users[1]?.username}</div>
                <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
                  <span className="text-slate-300 font-medium">{users[1]?.solved_count}</span>
                  <div className="text-slate-500 text-xs">solved</div>
                </div>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-xl">
                  1
                </div>
                <h3 className="text-white font-bold text-xl mb-1">
                  {users[0]?.first_name || users[0]?.username}
                </h3>
                <div className="text-slate-400 text-sm mb-2">@{users[0]?.username}</div>
                <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg px-4 py-2 border border-yellow-500/30">
                  <span className="text-yellow-400 font-bold">{users[0]?.solved_count}</span>
                  <div className="text-yellow-500 text-xs">solved</div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg">
                  3
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  {users[2]?.first_name || users[2]?.username}
                </h3>
                <div className="text-slate-400 text-sm mb-2">@{users[2]?.username}</div>
                <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
                  <span className="text-amber-400 font-medium">{users[2]?.solved_count}</span>
                  <div className="text-amber-500 text-xs">solved</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table - Clean design matching homepage */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/20 border-b border-slate-600/50">
                <tr>
                  <th className="py-6 px-8 text-left text-slate-300 font-semibold text-lg">Rank</th>
                  <th className="py-6 px-8 text-left text-slate-300 font-semibold text-lg">Developer</th>
                  <th className="py-6 px-8 text-center text-slate-300 font-semibold text-lg">Problems Solved</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => {
                  const rank = idx + 1;
                  return (
                    <tr 
                      key={user.id} 
                      className="hover:bg-slate-700/20 transition-all duration-200 border-b border-slate-700/30"
                    >
                      <td className="py-6 px-8">
                        <span className={`text-xl ${getRankClass(rank)}`}>
                          {getRankIcon(rank)}
                        </span>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {(user.first_name || user.username).charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-white font-semibold text-lg">
                              {user.first_name || user.username}
                            </div>
                            <div className="text-slate-400 text-sm">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/30">
                          <span className="text-purple-300 font-bold text-lg">
                            {user.solved_count}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🏆</div>
              <h3 className="text-2xl font-bold text-white mb-3">No rankings yet</h3>
              <p className="text-slate-400 text-lg">Start solving problems to appear on the leaderboard!</p>
            </div>
          )}
        </div>

        {/* Stats Section - Matching homepage bottom stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-4xl font-bold text-purple-400 mb-2">
              {users.length}+
            </div>
            <div className="text-slate-400 text-lg">Participants</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-cyan-400 mb-2">
              {users.reduce((sum, user) => sum + user.solved_count, 0)}+
            </div>
            <div className="text-slate-400 text-lg">Problems Solved</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-purple-400 mb-2">
              {users.length > 0 ? Math.round(users.reduce((sum, user) => sum + user.solved_count, 0) / users.length) : 0}+
            </div>
            <div className="text-slate-400 text-lg">Average Score</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
            <div className="text-slate-400 text-lg">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;