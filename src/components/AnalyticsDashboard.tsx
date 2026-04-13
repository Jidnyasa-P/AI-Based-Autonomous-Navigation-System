import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar
} from 'recharts';
import { Cpu, Zap, Ruler, Layers } from 'lucide-react';

interface AnalyticsDashboardProps {
  metrics: {
    pathLength: number;
    computeTime: string;
    obstacleDensity: string;
    status: string;
  };
}

const data = [
  { name: 'T-5', time: 1.2 },
  { name: 'T-4', time: 1.5 },
  { name: 'T-3', time: 1.1 },
  { name: 'T-2', time: 1.8 },
  { name: 'T-1', time: 1.4 },
  { name: 'Now', time: 1.6 },
];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Stats Cards */}
      <div className="col-span-1 md:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          icon={<Ruler className="w-4 h-4 text-blue-500" />}
          label="Path Steps"
          value={metrics.pathLength}
          unit="Nodes"
        />
        <MetricCard 
          icon={<Cpu className="w-4 h-4 text-purple-500" />}
          label="Compute Latency"
          value={metrics.computeTime}
          unit="ms"
        />
        <MetricCard 
          icon={<Layers className="w-4 h-4 text-amber-500" />}
          label="Obstacle Density"
          value={metrics.obstacleDensity}
          unit="%"
        />
        <MetricCard 
          icon={<Zap className="w-4 h-4 text-green-500" />}
          label="System Status"
          value={metrics.status}
          unit=""
          isStatus
        />
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-600 mb-4">Computation Efficiency (ms)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="time" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTime)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-600 mb-4">Path Optimization History</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="time" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, unit, isStatus = false }: any) => (
  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-blue-100 transition-colors">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className={`text-xl font-bold ${isStatus ? 'text-green-600' : 'text-slate-900'}`}>{value}</span>
      <span className="text-xs text-slate-400 font-medium">{unit}</span>
    </div>
  </div>
);
