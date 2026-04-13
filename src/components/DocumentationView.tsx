import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Code, Terminal, FileText, CheckCircle2 } from 'lucide-react';

export const DocumentationView: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">Developer Documentation</h2>
        </div>

        <div className="prose prose-slate max-w-none">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Getting Started</h3>
          <p className="text-slate-600 mb-6">
            Follow these steps to set up the NaviAI Pro simulation environment on your local machine.
          </p>

          <div className="bg-slate-900 rounded-xl p-6 mb-8 overflow-x-auto">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-mono text-slate-400">Terminal</span>
            </div>
            <code className="text-sm font-mono text-blue-400 block">
              git clone https://github.com/your-username/naviai-pro.git<br/>
              cd naviai-pro<br/>
              npm install<br/>
              npm run dev
            </code>
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-4">Core API Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-purple-600" />
                <span className="font-bold text-slate-800 text-sm">aStar(start, goal, grid)</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Primary pathfinding function. Returns an array of Points representing the optimal route.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-slate-800 text-sm">NavigationSim Props</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Accepts an onMetricsUpdate callback to stream real-time performance data to parent components.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-4">Implementation Checklist</h3>
          <div className="space-y-3">
            <CheckItem text="Initialize 2D grid with collision nodes" />
            <CheckItem text="Implement Manhattan distance heuristic" />
            <CheckItem text="Handle edge cases (blocked goals, no path)" />
            <CheckItem text="Optimize render loop for 60FPS simulation" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
    <CheckCircle2 className="w-5 h-5 text-green-500" />
    <span className="text-sm font-medium text-slate-700">{text}</span>
  </div>
);
