import React, { useEffect, useRef, useState } from 'react';
import { aStar, Point } from '../lib/algorithms';
import { Play, RotateCcw, Target, ShieldAlert, Activity } from 'lucide-react';

interface NavigationSimProps {
  onMetricsUpdate: (metrics: any) => void;
}

const GRID_SIZE = 25;

export const NavigationSim: React.FC<NavigationSimProps> = ({ onMetricsUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState<number[][]>([]);
  const [start, setStart] = useState<Point>({ x: 2, y: 2 });
  const [goal, setGoal] = useState<Point>({ x: 15, y: 10 });
  const [path, setPath] = useState<Point[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [robotPos, setRobotPos] = useState<Point>({ x: 2, y: 2 });
  const [obstacleDensity, setObstacleDensity] = useState(0);

  // Initialize grid
  useEffect(() => {
    const rows = 20;
    const cols = 30;
    const newGrid = Array(rows).fill(0).map(() => Array(cols).fill(0));
    
    // Add some random obstacles
    let obsCount = 0;
    for (let i = 0; i < 40; i++) {
      const rx = Math.floor(Math.random() * cols);
      const ry = Math.floor(Math.random() * rows);
      if ((rx !== start.x || ry !== start.y) && (rx !== goal.x || ry !== goal.y)) {
        newGrid[ry][rx] = 1;
        obsCount++;
      }
    }
    setGrid(newGrid);
    setObstacleDensity((obsCount / (rows * cols)) * 100);
  }, []);

  // Recalculate path when grid, start, or goal changes
  useEffect(() => {
    if (grid.length === 0) return;
    const startTime = performance.now();
    const newPath = aStar(robotPos, goal, grid, grid.length, grid[0].length);
    const endTime = performance.now();
    
    setPath(newPath);
    
    onMetricsUpdate({
      pathLength: newPath.length,
      computeTime: (endTime - startTime).toFixed(2),
      obstacleDensity: obstacleDensity.toFixed(1),
      status: newPath.length > 0 ? 'Path Found' : 'No Path'
    });
  }, [grid, goal, robotPos]);

  // Animation Loop
  useEffect(() => {
    if (!isNavigating || path.length <= 1) {
      if (isNavigating && path.length <= 1) setIsNavigating(false);
      return;
    }

    const timer = setInterval(() => {
      setRobotPos(prev => {
        const nextIdx = 1; // Always take the next step in path
        if (path.length > 1) {
          return path[1];
        }
        return prev;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [isNavigating, path]);

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || grid.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rows = grid.length;
    const cols = grid[0].length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * GRID_SIZE, 0);
      ctx.lineTo(i * GRID_SIZE, rows * GRID_SIZE);
      ctx.stroke();
    }
    for (let j = 0; j <= rows; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * GRID_SIZE);
      ctx.lineTo(cols * GRID_SIZE, j * GRID_SIZE);
      ctx.stroke();
    }

    // Draw Obstacles
    ctx.fillStyle = '#1f2937';
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          ctx.fillRect(x * GRID_SIZE + 1, y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2);
        }
      });
    });

    // Draw Path
    if (path.length > 0) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(path[0].x * GRID_SIZE + GRID_SIZE / 2, path[0].y * GRID_SIZE + GRID_SIZE / 2);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x * GRID_SIZE + GRID_SIZE / 2, path[i].y * GRID_SIZE + GRID_SIZE / 2);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Goal
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(goal.x * GRID_SIZE + GRID_SIZE / 2, goal.y * GRID_SIZE + GRID_SIZE / 2, GRID_SIZE / 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw Robot
    ctx.fillStyle = '#ef4444';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
    ctx.beginPath();
    ctx.arc(robotPos.x * GRID_SIZE + GRID_SIZE / 2, robotPos.y * GRID_SIZE + GRID_SIZE / 2, GRID_SIZE / 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

  }, [grid, path, robotPos, goal]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.floor((e.clientX - rect.left) / GRID_SIZE);
    const y = Math.floor((e.clientY - rect.top) / GRID_SIZE);

    if (x >= 0 && x < 30 && y >= 0 && y < 20) {
      const newGrid = [...grid];
      newGrid[y][x] = newGrid[y][x] === 1 ? 0 : 1;
      setGrid(newGrid);
      
      const obsCount = newGrid.flat().filter(c => c === 1).length;
      setObstacleDensity((obsCount / (20 * 30)) * 100);
    }
  };

  const resetSim = () => {
    setRobotPos(start);
    setIsNavigating(false);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-800">Navigation Stage</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsNavigating(!isNavigating)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isNavigating ? 'bg-amber-100 text-amber-700' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Play className={`w-4 h-4 ${isNavigating ? 'fill-amber-700' : 'fill-white'}`} />
            {isNavigating ? 'Pause' : 'Start Mission'}
          </button>
          <button 
            onClick={resetSim}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <canvas 
          ref={canvasRef}
          width={750}
          height={500}
          onClick={handleCanvasClick}
          className="cursor-crosshair w-full h-auto"
        />
        <div className="absolute bottom-4 left-4 flex gap-4">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-red-500" /> Robot
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500" /> Goal
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-slate-800" /> Obstacle
          </div>
        </div>
      </div>
      
      <p className="text-xs text-slate-400 italic">
        * Click on the grid to add/remove obstacles. Right-click to set goal (coming soon).
      </p>
    </div>
  );
};
