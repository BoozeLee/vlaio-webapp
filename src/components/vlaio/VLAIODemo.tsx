"use client";
import { useState, useEffect } from "react";
import { agentApi } from "@/lib/api";

export function VLAIODemo() {
  const [neuroforgeStatus, setNeuroforgeStatus] = useState({
    status: "idle",
    membranePotential: 0.51,
    threshold: 0.75,
    firing: false,
    lastUpdate: null as string | null,
  });
  
  const [trendforgeStatus, setTrendforgeStatus] = useState({
    status: "idle",
    currentStep: null as string | null,
    lastReport: null,
    progress: 0,
  });
  
  const [demoLogs, setDemoLogs] = useState<{ time: string; message: string }[]>([]);
  const [loading, setLoading] = useState({
    neuroforge: false,
    trendforge: false
  });

  // Simulate neuroforge SNN activity when not actively running a demo
  useEffect(() => {
    // Only run simulation when not actively running a demo
    if (loading.neuroforge || loading.trendforge) return;
    
    const neuroforgeInterval = setInterval(() => {
      setNeuroforgeStatus((prev) => {
        // Simulate membrane potential changes
        const leak = 0.01;
        const input = Math.random() * 0.05; // Random market signals
        let newPotential = prev.membranePotential - leak + input;
        
        // Ensure it stays in reasonable bounds
        newPotential = Math.max(0, Math.min(1, newPotential));
        
        const firing = newPotential >= prev.threshold;
        
        return {
          ...prev,
          membranePotential: newPotential,
          firing,
          lastUpdate: new Date().toISOString(),
          status: firing ? "firing" : "integrating",
        };
      });
    }, 1000);
    
    return () => clearInterval(neuroforgeInterval);
  }, [loading.neuroforge, loading.trendforge]);

  const handleNeuroforgeDemo = async () => {
    setLoading(prev => ({ ...prev, neuroforge: true }));
    setDemoLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), message: "Starting NeuroForge demo..." }]);
    
    try {
      // Call the actual API to trigger a neuroforge demo
      const response = await agentApi.execute("neuroforge_demo", {});
      setDemoLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), message: `NeuroForge demo completed: ${response.message || 'Success'}` }]);
      
      // Reset status after demo
      setNeuroforgeStatus({
        status: "idle",
        membranePotential: 0.51,
        threshold: 0.75,
        firing: false,
        lastUpdate: new Date().toISOString(),
      });
    } catch (error: unknown) {
      console.error("NeuroForge demo error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setDemoLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), message: `NeuroForge demo failed: ${errorMessage}` }]);
    } finally {
      setLoading(prev => ({ ...prev, neuroforge: false }));
    }
  };

  const handleTrendforgeDemo = async () => {
    setLoading(prev => ({ ...prev, trendforge: true }));
    setDemoLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), message: "Starting TrendForge research..." }]);
    setTrendforgeStatus((prev) => ({ ...prev, status: "running", currentStep: "SAP Discovery", progress: 20 }));
    
    try {
      // Call the actual API to trigger trendforge research
      const response = await agentApi.execute("trendforge_research", { query: "Flemish innovation trends" });
      
      // Simulate workflow steps with actual progress from API if available
      const steps = [
        { step: "SAP Discovery", progress: 20 },
        { step: "Web Search", progress: 40 },
        { step: "LLM Analysis", progress: 60 },
        { step: "Image Generation", progress: 80 },
        { step: "Report Generation", progress: 100 }
      ];
      
      let stepIndex = 0;
      const interval = setInterval(() => {
        if (stepIndex < steps.length) {
          setTrendforgeStatus((prev) => ({
            ...prev,
            currentStep: steps[stepIndex].step,
            progress: steps[stepIndex].progress,
            status: steps[stepIndex].progress < 100 ? "running" : "completed"
          }));
          
          if (steps[stepIndex].progress === 100) {
            setDemoLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), message: `TrendForge research completed! Report ID: ${response.reportId || 'N/A'}` }]);
            clearInterval(interval);
          }
          stepIndex++;
        }
      }, 1500);
    } catch (error: unknown) {
      console.error("TrendForge demo error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setDemoLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), message: `TrendForge research failed: ${errorMessage}` }]);
      setTrendforgeStatus((prev) => ({ ...prev, status: "error", currentStep: "Failed" }));
    } finally {
      setLoading(prev => ({ ...prev, trendforge: false }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          VLAIO Innovation Demo: NeuroForge & TrendForge
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Demonstrating the BakerStreet VLAIO Proof-of-Innovation (BVP-1) featuring 
          neuromorphic autonomous agents and x402 payment settlement on Solana.
        </p>
      </header>

      <div className="grid gap-6 mb-8">
        {/* NeuroForge Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <span className="mr-3">🧠</span> NeuroForge: Neuromorphic Autonomous Agent
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium mb-2">SNN State</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Membrane Potential:</span>
                    <span className="font-mono">{neuroforgeStatus.membranePotential.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Firing Threshold:</span>
                    <span className="font-mono">{neuroforgeStatus.threshold.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs 
                      ${neuroforgeStatus.status === "firing" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"}`}>
                      {neuroforgeStatus.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Neuron State:</span>
                    <span className={neuroforgeStatus.firing ? 
                      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 px-2 py-1 rounded-full text-xs" : 
                      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-xs"}>
                      {neuroforgeStatus.firing ? "🔥 FIRING" : "💤 INTEGRATING"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium mb-2">Biological Analogy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Like biological neurons, NeuroForge integrates market signals over time. 
                  When the membrane potential crosses the threshold, it triggers an autonomous 
                  action (SAP escrow creation) and settles payment via x402 USDC on Solana.
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-full">
                <h3 className="font-medium mb-3">Membrane Potential Visualization</h3>
                <div className="relative h-40 w-full bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                  {/* Threshold line */}
                  <div className="absolute left-0 right-0 h-0.5 bg-red-500"
                    style={{ top: `${(1 - neuroforgeStatus.threshold) * 100}%` }}></div>
                  {/* Membrane potential */}
                  <div className="absolute left-0 right-0 h-0.5 bg-blue-500"
                    style={{ top: `${(1 - neuroforgeStatus.membranePotential) * 100}%` }}></div>
                  {/* Firing indicator */}
                  {neuroforgeStatus.firing && (
                    <div className="absolute inset-0 bg-red-500/20 animate-pulse"></div>
                  )}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>0.0</span>
                  <span>0.5</span>
                  <span>1.0</span>
                </div>
              </div>
              
              <button 
                onClick={handleNeuroforgeDemo}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                disabled={loading.neuroforge || loading.trendforge}
              >
                {loading.neuroforge ? "Running Demo..." : "Run NeuroForge Demo"}
              </button>
            </div>
          </div>
        </section>

        {/* TrendForge Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <span className="mr-3">🔍</span> TrendForge: Autonomous Research Agent
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium mb-2">Workflow Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs 
                      ${trendforgeStatus.status === "running" 
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        : trendforgeStatus.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"}`}>
                      {trendforgeStatus.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Current Step:</span>
                    <span className="font-mono">{trendforgeStatus.currentStep || "Idle"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Progress:</span>
                    <span className="font-mono">{trendforgeStatus.progress}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium mb-2">x402 Payment Flow</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Every TrendForge action autonomously settles payments on Solana using 
                  the x402 protocol: HTTP 402 → SPL Transfer → X-Payment header.
                </p>
                <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-xs">
                  <div className="flex space-x-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Agent → POST /serp/google</span>
                  </div>
                  <div className="flex space-x-2 mb-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Server ← 402 Payment Required</span>
                  </div>
                  <div className="flex space-x-2 mb-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Agent → sign & resend with X-Payment</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Server ← 200 OK + results</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-full">
                <h3 className="font-medium mb-3">Autonomous Workflow</h3>
                <div className="space-y-3">
                  {[
                    { step: "1. SAP Discovery", icon: "🔍", description: "Find registered agents on-chain" },
                    { step: "2. Web Search", icon: "🌐", description: "Search via Ace Data Cloud (x402 paid)" },
                    { step: "3. LLM Analysis", icon: "💭", description: "Analyze results with AI (x402 paid)" },
                    { step: "4. Image Generation", icon: "🎨", description: "Generate cover image (x402 paid)" },
                    { step: "5. Report Generation", icon: "📄", description: "Compile research report" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <h4 className="font-medium">{item.step}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={handleTrendforgeDemo}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                disabled={loading.trendforge || loading.neuroforge}
              >
                {loading.trendforge ? "Running Research..." : "Run TrendForge Demo"}
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Demo Logs Section */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
          <span className="mr-3">📋</span> Demo Logs
        </h2>
        <div className="max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          {demoLogs.length > 0 ? (
            <div className="space-y-2">
              {demoLogs.map((log, index) => (
                <div key={index} className="flex justify-between text-sm text-gray-600 dark:text-gray-300 border-b pb-1 last:border-b-0">
                  <span>[{log.time}]</span>
                  <span>{log.message}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No demo activity yet. Click the buttons above to run demonstrations.
            </p>
          )}
        </div>
        <button 
          onClick={() => setDemoLogs([])}
          className="mt-3 w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Clear Logs
        </button>
      </section>

      {/* Technical Details Section */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
          <span className="mr-3">⚙️</span> Technical Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">NeuroForge Specifications</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>Leaky Integrate-and-Fire (LIF) Spiking Neural Network</li>
              <li>Membrane potential dynamics with configurable leak rate</li>
              <li>Threshold-based autonomous action triggering</li>
              <li>SAP (Synapse Agent Protocol) integration for escrow management</li>
              <li>x402 USDC payment settlement on Solana blockchain</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">TrendForge Specifications</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>Autonomous 5-step research workflow</li>
              <li>SAP agent discovery on Solana mainnet</li>
              <li>x402 payments for every API call (SERP, LLM, Image)</li>
              <li>Hourly autonomous operation cycle</li>
              <li>On-chain verifiable payment settlement</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}