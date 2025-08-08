'use client'

import dynamic from 'next/dynamic'

// Lazy load the flow builder - it's heavy and not needed immediately
// Plus React Flow has issues with SSR
const FlowBuilder = dynamic(
  () => import('./components/FlowBuilder/FlowCanvas'),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-screen">Loading Flow Builder...</div>
  }
)

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <FlowBuilder />
    </main>
  )
}