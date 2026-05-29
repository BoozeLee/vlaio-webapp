# VLAIO Webapp Deployment Guide

## Overview
This guide documents the deployment of the VLAIO Innovation Demo webapp that showcases NeuroForge and TrendForge demos for VLAIO (Flemish Agency for Innovation & Entrepreneurship).

## Repository
- **GitHub**: https://github.com/BoozeLee/vlaio-webapp
- **Framework**: Next.js 16.2.6 (Turbopack)
- **Deployment**: Vercel

## Features Showcased
1. **NeuroForge Demo** - Neuromorphic LIF Spiking Neural Network agent
   - Leaky Integrate-and-Fire neuron simulation
   - Real-time membrane potential tracking
   - Autonomous action triggering based on threshold crossing
   - Biological analogy explanation

2. **TrendForge Demo** - Autonomous Research Agent
   - 5-step research workflow visualization
   - x402 payment flow demonstration
   - Progress tracking per workflow step
   - SAP agent discovery and task execution simulation

## Technical Stack
- **Frontend**: Next.js 16.2.6, React 19.2.4, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks (useState, useEffect)
- **API Communication**: Axios for backend communication
- **Build Tool**: Turbopack (Next.js native)

## Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Access at http://localhost:3000/vlaio
```

## Production Build
```bash
# Create production build
npm run build

# Start production server
npm start
# Access at http://localhost:3000/vlaio
```

## Vercel Deployment
The application is deployed to Vercel at:
- **URL**: https://frontend-6urma296k-boozelees-projects.vercel.app/vlaio

### Deployment Process
1. Code is pushed to GitHub repository
2. Vercel automatically detects changes and triggers deployment
3. Build process runs `next build` to create optimized production bundle
4. Deployment is made available at the Vercel URL

### Environment Variables
- `NEXT_PUBLIC_API_URL`: Base URL for API endpoints (defaults to http://localhost:3001)

## Component Structure
```
app/
├─ vlaio/
│  └─ page.tsx          # Entry point for VLAIO demo route
src/
├─ components/
│  └─ vlaio/
│     └─ VLAIODemo.tsx  # Main demo component
├─ lib/
│  └─ api.ts           # API communication layer
```

## Demo Functionality

### NeuroForge Section
- Simulates LIF neuron with configurable membrane potential and threshold
- Real-time visualization of membrane potential changes
- Demo button triggers simulated API call to execute neuroforge_demo task
- Shows firing/integrating states with visual indicators

### TrendForge Section
- Visualizes 5-step autonomous research workflow:
  1. SAP Discovery
  2. Web Search (x402 paid)
  3. LLM Analysis (x402 paid)
  4. Image Generation (x402 paid)
  5. Report Generation
- Progress bar and step tracking
- Demo button triggers simulated trendforge_research task
- x402 payment flow diagram explanation

### Additional Sections
- Demo Logs: Timestamped activity logging with clear functionality
- Technical Details: Specifications for both agents

## Testing Performed
1. Local development server verification
2. Production build compilation check
3. Component rendering validation
4. Interactive button functionality testing
5. State management verification
6. Responsive design confirmation

## Maintenance Notes
- To update demos: Modify VLAIODemo.tsx component
- To change styling: Update Tailwind classes or globals.css
- To add features: Extend API calls in src/lib/api.ts
- Deployment: Push to main branch triggers automatic Vercel redeployment

## Troubleshooting
1. **Build failures**: Check TypeScript errors and dependency conflicts
2. **Runtime issues**: Verify API endpoint availability and CORS settings
3. **Deployment problems**: Check Vercel build logs and environment variables
4. **Performance concerns**: Analyze bundle size and optimize images/components

## Links
- GitHub Repository: https://github.com/BoozeLee/vlaio-webapp
- Live Demo: https://frontend-6urma296k-boozelees-projects.vercel.app/vlaio
- NeuroForge Agent Repo: https://github.com/BoozeLee/neuroforge-agent
- TrendForge Agent Repo: https://github.com/BoozeLee/trendforge-agent

---
*Deployment completed: May 29, 2026*
*Maintained by: BoozeLee (Kiliaan Vanvoorden)*