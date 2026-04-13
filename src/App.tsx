import { useState } from 'react';
import { NavigationSim } from './components/NavigationSim';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ArchitectureView } from './components/ArchitectureView';
import { DocumentationView } from './components/DocumentationView';
import { 
  Bot, 
  Settings, 
  Github, 
  ExternalLink, 
  Info, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'simulation' | 'architecture' | 'documentation';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('simulation');
  const [metrics, setMetrics] = useState({
    pathLength: 0,
    computeTime: '0.00',
    obstacleDensity: '0.0',
    status: 'Initializing...'
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">NaviAI <span className="text-blue-600">Pro</span></h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Autonomous Navigation System</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-4 text-sm font-medium">
              <button 
                onClick={() => setActiveTab('simulation')}
                className={`transition-colors ${activeTab === 'simulation' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Simulation
              </button>
              <button 
                onClick={() => setActiveTab('architecture')}
                className={`transition-colors ${activeTab === 'architecture' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Architecture
              </button>
              <button 
                onClick={() => setActiveTab('documentation')}
                className={`transition-colors ${activeTab === 'documentation' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Documentation
              </button>
            </nav>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <a 
                href="https://github.com" 
                target="_blank" 
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
                GitHub 
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'simulation' && (
            <motion.div 
              key="simulation"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Simulation & Analytics */}
              <div className="lg:col-span-8 space-y-8">
                <NavigationSim onMetricsUpdate={setMetrics} />
                <AnalyticsDashboard metrics={metrics} />
              </div>

              {/* Right Column: Project Info & Guide */}
              <div className="lg:col-span-4 space-y-6">
                <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5 text-blue-500" />
                    <h2 className="font-bold text-slate-800">Project Overview</h2>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    This industry-grade simulation demonstrates autonomous robot navigation using the 
                    <span className="font-semibold text-slate-900"> A* Search Algorithm</span>. 
                    It mimics real-world warehouse automation and smart mobility logic.
                  </p>
                  <div className="space-y-3">
                    <FeatureItem icon={<ShieldCheck className="text-green-500" />} text="Dynamic Obstacle Avoidance" />
                    <FeatureItem icon={<Zap className="text-amber-500" />} text="Real-time Path Optimization" />
                    <FeatureItem icon={<Target className="text-red-500" />} text="Precision Goal Targeting" />
                  </div>
                </section>

                <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
                  <h3 className="font-bold text-lg mb-2">Student Portfolio Guide</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Recruiters look for "Proof of Work". Use this simulation to showcase your skills in 
                    Algorithms, Robotics, and Frontend Engineering.
                  </p>
                  <button className="w-full bg-white text-blue-700 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                    View GitHub Strategy
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </section>

                <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge text="TypeScript" color="blue" />
                    <Badge text="React 19" color="indigo" />
                    <Badge text="Tailwind CSS" color="cyan" />
                    <Badge text="Recharts" color="purple" />
                    <Badge text="A* Algorithm" color="orange" />
                    <Badge text="Canvas API" color="pink" />
                  </div>
                </section>
              </div>
            </motion.div>
          )}

          {activeTab === 'architecture' && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ArchitectureView />
            </motion.div>
          )}

          {activeTab === 'documentation' && (
            <motion.div
              key="documentation"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DocumentationView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2026 AI-Based Autonomous Navigation System Project</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-400 hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-600">Terms of Service</a>
            <a href="#" className="flex items-center gap-1 text-sm text-blue-600 font-medium">
              Open Full Simulation <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureItem({ icon, text }: any) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
      <div className="p-1 bg-slate-50 rounded-md">{icon}</div>
      {text}
    </div>
  );
}

function Badge({ text, color }: { text: string; color: string }) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
    pink: 'bg-pink-50 text-pink-700 border-pink-100',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[color]}`}>
      {text}
    </span>
  );
}


