# VLAIO Application Generator Prompt

## Role: Senior Full-Stack Engineer & AI Agent Architect

You are tasked with creating a Next.js demonstration application for autonomous AI agents with blockchain integration. The application must showcase neuromorphic computing and x402 payment protocols.

## Project Structure Requirements

```
frontend/
├── app/
│   ├── vlaio/
│   │   └── page.tsx          # VLAIO demo entry point
│   └── page.tsx              # Main dashboard
├── src/
│   ├── components/
│   │   ├── vlaio/
│   │   │   └── VLAIODemo.tsx # Main demo component
│   │   └── layout/
│   │       └── Header.tsx    # Shared components
│   ├── lib/
│   │   └── api.ts            # API client
│   └── styles/
│       └── globals.css       # Global styles
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Technical Specifications

### Core Dependencies
```json
{
  "next": "16.2.6",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "@solana/web3.js": "^1.98.4",
  "@solana/wallet-adapter-react": "^0.15.39",
  "axios": "^1.16.1"
}
```

### Agent Types to Demonstrate

1. **Neuromorphic Agent (NeuroForge)**
   - Leaky Integrate-and-Fire (LIF) neuron model
   - Membrane potential dynamics: `V(t+1) = V(t) * (1-leak) + input`
   - Threshold-based firing mechanism
   - SNN visualization with real-time updates

2. **Autonomous Research Agent (TrendForge)**
   - Multi-step workflow (5+ steps)
   - x402 payment protocol visualization
   - Progress tracking per step
   - Report generation capability

## Component Architecture

### Main Demo Component Pattern
```tsx
"use client";
import { useState, useEffect } from "react";

export function VLAIODemo() {
  // State for each agent
  const [agentState, setAgentState] = useState({
    status: "idle",
    // ... other fields
  });
  
  // Demo handler
  const handleDemo = async () => {
    // 1. Update loading state
    // 2. Call API or simulate
    // 3. Update state with results
    // 4. Log activity
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      {/* Agent Sections */}
      {/* Logs Panel */}
      {/* Technical Details */}
    </div>
  );
}
```

### State Management Patterns

**For Neuromorphic Agents:**
```typescript
{
  status: "idle" | "integrating" | "firing",
  membranePotential: number,  // 0.0 - 1.0
  threshold: number,
  firing: boolean,
  lastUpdate: string | null
}
```

**For Autonomous Agents:**
```typescript
{
  status: "idle" | "running" | "completed" | "error",
  currentStep: string | null,
  progress: number,  // 0-100
  lastReport: string | null
}
```

## UI/UX Requirements

1. **Layout**: Responsive grid (1 column on mobile, 2 on desktop)
2. **Styling**: Tailwind CSS with dark/light mode
3. **Visualization**: Real-time SVG/Canvas for SNN, progress bars for workflows
4. **Interaction**: Demo buttons, log clearing, status indicators
5. **Accessibility**: Proper ARIA labels, keyboard navigation

## API Integration Pattern

```typescript
// api.ts
export const agentApi = {
  execute: async (task: string, context?: Record<string, unknown>) => {
    const response = await axios.post(`${API_BASE}/execute`, { task, context });
    return response.data;
  },
  
  health: async () => {
    const response = await axios.get(`${API_BASE}/health`);
    return response.data;
  }
};
```

## x402 Payment Flow Diagram

```
Agent Action
    ↓
POST API Request
    ↓
Server Response: 402 Payment Required
    ↓
Generate X-Payment Header
    ↓
Retry with Payment
    ↓
Server Response: 200 OK + Data
```

## Simulation Logic

### NeuroForge (SNN)
```typescript
// Leaky integration
const leak = 0.01;
const input = Math.random() * 0.05;
let newPotential = prev.membranePotential - leak + input;
newPotential = Math.max(0, Math.min(1, newPotential));

// Threshold check
const firing = newPotential >= prev.threshold;
```

### TrendForge (Workflow)
```typescript
const steps = [
  { step: "Discovery", progress: 20 },
  { step: "Analysis", progress: 40 },
  { step: "Synthesis", progress: 60 },
  { step: "Validation", progress: 80 },
  { step: "Report", progress: 100 }
];

// Progress simulation
setInterval(() => {
  if (stepIndex < steps.length) {
    updateProgress(steps[stepIndex]);
    stepIndex++;
  }
}, 1500);
```

## Configuration Files

### tsconfig.json
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### jsconfig.json (for additional path support)
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### next.config.ts
```typescript
const nextConfig = {
  serverExternalPackages: ['@solana'],
};
```

## Error Handling

```typescript
try {
  const response = await apiCall();
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  logActivity(`Error: ${message}`);
}
```

## Testing Checklist

- [ ] TypeScript compilation passes
- [ ] ESLint passes with no warnings
- [ ] Component renders without errors
- [ ] State updates correctly
- [ ] API calls work (or fail gracefully)
- [ ] Dark/light mode toggle works
- [ ] Responsive on mobile/desktop

## Deployment Commands

```bash
# Development
npm run dev

# Production Build
npm run build

# Start Production Server
npm run start

# Lint
npm run lint
```

## Success Criteria

1. Application builds without errors
2. VLAIO route accessible at `/vlaio`
3. Both agent demos functional
4. Logs display correctly
5. Dark/light mode works
6. Mobile responsive