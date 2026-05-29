'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { agentApi } from '@/lib/api';

interface Stats {
  sessionId: string;
  budgetSpent: number;
  callsCount: number;
  status: string;
}

export default function AgentDashboard() {
  const [task, setTask] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isAgentReady, setIsAgentReady] = useState(false);

  const checkHealth = async () => {
    try {
      const health = await agentApi.health();
      setIsAgentReady(health.agentReady);
      if (health.agentReady) {
        fetchStats();
      }
    } catch {
      setIsAgentReady(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await agentApi.getStats();
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    // Defer the initial check to avoid synchronous setState in effect
    Promise.resolve().then(() => {
      checkHealth();
    });

    // Set up interval
    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, []); // checkHealth is stable as it's defined inside the component

  const executeTask = async () => {
    if (!task.trim() || !isAgentReady) return;
    setLoading(true);
    setResult('');

    try {
      const data = await agentApi.execute(task);
      if (data.success) {
        setResult(data.result);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setResult(`Network error: ${error instanceof Error ? error.message : 'Unknown'}`);
    } finally {
      setLoading(false);
    }
  };

  const suggestedTasks = [
    'Generate an image of a cyberpunk city at sunset using Midjourney',
    'Search for latest Solana DeFi news',
    'Create a 30-second tech beats track with Suno',
    'Generate a video of aurora borealis with Luma',
    'Chat with GPT-4o about blockchain development',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Head>
        <title>OOBE × AceDataCloud Autonomous Agent</title>
        <meta name="description" content="Autonomous AI Agent with 30+ AI Capabilities on Solana" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            OOBE × AceDataCloud Autonomous Agent
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            AI-powered autonomous agent on Solana with 30+ integrations via MCP
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm ${isAgentReady ? 'bg-green-500/20 text-green-300 border border-green-500/50' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50'}`}>
              {isAgentReady ? '● Agent Ready' : '○ Agent Starting...'}
            </span>
            <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-sm">
              x402 Payments
            </span>
            <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm">
              SAP Registered
            </span>
          </div>

          <div className="flex justify-center gap-3 flex-wrap mt-6">
            {['Midjourney', 'Suno', 'Sora', 'Luma', 'Flux', 'Veo', 'Serp', 'OpenAI'].map((tool) => (
              <span key={tool} className="px-3 py-1 bg-slate-800/50 border border-slate-600 rounded-full text-xs">
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>📝</span> Task Input
            </h2>

            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Suggested tasks:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTasks.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setTask(suggestion)}
                    className="text-xs px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-full transition-all border border-slate-600"
                  >
                    {suggestion.length > 40 ? suggestion.substring(0, 37) + '...' : suggestion}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Describe what you want the agent to do..."
              className="w-full h-40 p-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={executeTask}
                disabled={loading || !isAgentReady}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 px-6 rounded-xl font-semibold transition-all shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Executing...
                  </span>
                ) : (
                  'Execute Task'
                )}
              </button>
              <button
                onClick={fetchStats}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-all border border-slate-600"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>📊</span> Result & Stats
            </h2>

            <div className="h-40 p-4 bg-slate-900/50 border border-slate-600 rounded-xl overflow-auto mb-6">
              {result ? (
                <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">{result}</pre>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Agent response will appear here...
                </div>
              )}
            </div>

            {stats && (
              <div className="pt-6 border-t border-slate-700">
                <h3 className="text-lg font-semibold mb-4">Session Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <span className="text-gray-400 text-sm block">Budget Spent</span>
                    <p className="text-2xl font-bold text-green-400">{stats.budgetSpent.toFixed(6)} SOL</p>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <span className="text-gray-400 text-sm block">API Calls</span>
                    <p className="text-2xl font-bold text-blue-400">{stats.callsCount}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Architecture</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
              <h3 className="font-bold text-blue-400 mb-2">OOBE Synapse</h3>
              <p className="text-sm text-gray-400">Solana RPC gateway, agent SDK, x402 payment protocol integration</p>
            </div>
            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
              <h3 className="font-bold text-purple-400 mb-2">AceDataCloud MCP</h3>
              <p className="text-sm text-gray-400">30+ AI APIs (Midjourney, Suno, Sora, Luma, Flux, Veo, Serp, OpenAI)</p>
            </div>
            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
              <h3 className="font-bold text-green-400 mb-2">SAP Registration</h3>
              <p className="text-sm text-gray-400">On-chain agent identity via Solana Agent Protocol</p>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Built for the OOBE × AceDataCloud Autonomous Agent Bounty</p>
          <p className="mt-2">
            <a
              href="https://superteam.fun/earn/listing/autonomous-agent-bounty-oobe-ace-data-cloud/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              View Bounty Details
            </a>
            <span className="mx-3">•</span>
            <a href="https://t.me/+ndz4wdTyPOE4Y2U0" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Telegram Support
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
