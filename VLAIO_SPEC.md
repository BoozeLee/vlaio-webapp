# VLAIO Innovation Demo - Technical Specification

## Overview

VLAIO (Value Layer Autonomous Innovation Operations) is a demonstration application showcasing neuromorphic autonomous agents and x402 payment settlement on Solana. This frontend serves as the BVP-1 (Proof-of-Innovation) demonstration for the BakerStreet ecosystem.

## Architecture

### Frontend Stack
- **Framework**: Next.js 16.2.6 (Turbopack)
- **React**: 19.2.4
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Path Aliases**: `@/*` → `./src/*`

### Components

#### 1. `/app/vlaio/page.tsx`
- Entry point for VLAIO demo route
- Wraps `VLAIODemo` component with gradient background

#### 2. `/src/components/vlaio/VLAIODemo.tsx` (376 lines)
Main demo component featuring:

**NeuroForge Section** (SNN Visualization)
- Leaky Integrate-and-Fire neuron simulation
- Real-time membrane potential tracking
- Threshold crossing detection
- Biological analogy explanation

**TrendForge Section** (Research Workflow)
- 5-step autonomous research visualization
- x402 payment flow diagram
- Progress tracking per workflow step

**Demo Logs**
- Activity logging with timestamps
- Error handling display
- Clear log functionality

**Technical Details**
- NeuroForge specifications
- TrendForge specifications

### API Layer
- **Location**: `/src/lib/api.ts`
- **Base URL**: `http://localhost:3001` (configurable via `NEXT_PUBLIC_API_URL`)
- **Endpoints**:
  - `execute(task, context)` - POST /execute
  - `getStats()` - GET /stats
  - `health()` - GET /health

## Agent Specifications

### NeuroForge (Neuromorphic Agent)
- **Type**: Leaky Integrate-and-Fire (LIF) Spiking Neural Network
- **Parameters**:
  - Membrane potential: 0.51 (initial)
  - Firing threshold: 0.75
  - Leak rate: 0.01 per second
- **Integration**: SAP (Synapse Agent Protocol) for escrow management
- **Payment**: x402 USDC settlement on Solana

### TrendForge (Research Agent)
- **Workflow Steps**:
  1. SAP Discovery - Find registered agents on-chain
  2. Web Search - Via Ace Data Cloud (x402 paid)
  3. LLM Analysis - AI analysis (x402 paid)
  4. Image Generation - Cover image creation (x402 paid)
  5. Report Generation - Compile final report
- **Payment**: x402 protocol for all API calls
- **Cycle**: Hourly autonomous operation

## x402 Payment Flow

```
Agent → POST /serp/google
Server ← 402 Payment Required
Agent → sign & resend with X-Payment
Server ← 200 OK + results
```

## State Management

### NeuroForge State
```typescript
{
  status: "idle" | "integrating" | "firing",
  membranePotential: number,
  threshold: number,
  firing: boolean,
  lastUpdate: string | null
}
```

### TrendForge State
```typescript
{
  status: "idle" | "running" | "completed" | "error",
  currentStep: string | null,
  lastReport: string | null,
  progress: number
}
```

## UI/UX Features

- Dark/light mode support
- Responsive grid layout
- Real-time visualization updates
- Interactive demo buttons
- Activity logging panel
- Technical specifications section

## Deployment

### Development
```bash
npm run dev
# Access at http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
# Access at http://localhost:3000
```

### Configuration
- `next.config.ts`: Server external packages for @solana
- `tsconfig.json`: Path aliases for @/* imports
- `jsconfig.json`: Additional path resolution

## Future Enhancements

1. **Backend Integration**
   - Implement API server on port 3001
   - Connect to actual NeuroForge agent
   - Connect to actual TrendForge agent
   - Enable real x402 payment processing

2. **Advanced Features**
   - Wallet connection (Solana Wallet Adapter)
   - Transaction history
   - Agent performance metrics
   - Configuration panel for SNN parameters

3. **Production Readiness**
   - Error boundaries
   - Loading states
   - Toast notifications
   - Analytics integration