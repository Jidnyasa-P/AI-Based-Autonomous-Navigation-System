import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Network, Database, Zap, ShieldCheck, Target } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-6">System Architecture</h2>
        <p className="text-slate-600 mb-8">
          The NaviAI Pro system follows a modular robotics pipeline designed for high-performance autonomous navigation. 
          Each module is decoupled to ensure scalability and ease of integration with real-world hardware.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ArchCard 
            icon={<Cpu className="w-6 h-6 text-blue-600" />}
            title="Perception Layer"
            description="Processes raw sensor data (simulated grid/OpenCV) to identify obstacles and environmental constraints."
          />
          <ArchCard 
            icon={<Network className="w-6 h-6 text-purple-600" />}
            title="Planning Engine"
            description="Implements the A* Search Algorithm to calculate the optimal path based on heuristic cost analysis."
          />
          <ArchCard 
            icon={<Zap className="w-6 h-6 text-amber-600" />}
            title="Control Module"
            description="Translates the planned trajectory into discrete movement commands for the robotic agent."
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-500" />
            Data Flow
          </h3>
          <ul className="space-y-4">
            <FlowStep step="1" title="Environment Scanning" description="The perception module scans the 2D grid for occupied nodes." />
            <FlowStep step="2" title="Cost Mapping" description="Nodes are assigned G and H scores for A* evaluation." />
            <FlowStep step="3" title="Path Extraction" description="The engine backtracks from the goal to start to find the optimal route." />
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            Safety Constraints
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-sm font-semibold text-slate-700 mb-1">Collision Buffer</p>
              <p className="text-xs text-slate-500">Maintains a safety radius around detected obstacles to prevent clipping.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-sm font-semibold text-slate-700 mb-1">Dynamic Re-planning</p>
              <p className="text-xs text-slate-500">Instantly triggers path recalculation if a new obstacle appears on the current trajectory.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArchCard = ({ icon, title, description }: any) => (
  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
    <div className="mb-4">{icon}</div>
    <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
  </div>
);

const FlowStep = ({ step, title, description }: any) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
      {step}
    </div>
    <div>
      <p className="text-sm font-bold text-slate-800">{title}</p>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  </div>
);
