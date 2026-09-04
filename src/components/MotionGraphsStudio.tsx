import React, { useState } from 'react';
import { Send, Activity, TrendingUp, Sparkles } from 'lucide-react';

interface MotionGraphsStudioProps {
  onSendToSage: (prompt: string) => void;
}

export const MotionGraphsStudio: React.FC<MotionGraphsStudioProps> = ({ onSendToSage }) => {
  const [graphType, setGraphType] = useState<'distance_time' | 'speed_time'>('speed_time');

  // Speed-Time trapezoid profile:
  // Stage 1: Accelerate from 0 to vMax in t1 seconds
  // Stage 2: Constant speed vMax for t2 seconds
  // Stage 3: Decelerate from vMax to 0 in t3 seconds
  const [t1, setT1] = useState<number>(8);
  const [t2, setT2] = useState<number>(12);
  const [t3, setT3] = useState<number>(4);
  const [vMax, setVMax] = useState<number>(24);

  const totalTime = t1 + t2 + t3;
  const accel = vMax / t1;
  const decel = -vMax / t3;

  // Trapezoid area: 1/2 * (b1 + b2) * h
  const areaTrapezoid = 0.5 * (totalTime + t2) * vMax;

  const handleSendToSage = () => {
    let prompt = '';
    if (graphType === 'speed_time') {
      prompt = `I am analyzing a Speed-Time Graph in the Practical Graphs Studio:\n- Stage 1 (Acceleration): 0 to ${vMax} m/s in ${t1}s ⇒ Acceleration $a = \\frac{${vMax} - 0}{${t1}} = ${accel.toFixed(2)}\\text{ m/s}^2$\n- Stage 2 (Constant Speed): travels at ${vMax} m/s for ${t2}s\n- Stage 3 (Deceleration): slows from ${vMax} to 0 m/s in ${t3}s ⇒ Deceleration $a = ${decel.toFixed(2)}\\text{ m/s}^2$\n- Total Distance = Trapezoid Area $= \\frac{1}{2}(${totalTime} + ${t2})(${vMax}) = ${areaTrapezoid}\\text{ meters}$\n\nSage, how do we visually distinguish the meaning of gradient (acceleration) versus area under the curve (distance)?`;
    } else {
      prompt = `I am analyzing a Distance-Time Graph where a cyclist travels 30 km in 1.5 h, rests for 30 minutes (0.5 h), and travels 20 km in 1.0 h.\n- Stage 1 Speed: $30 / 1.5 = 20\\text{ km/h}$\n- Flat Section: Speed = 0 km/h (at rest)\n- Average Speed: $\\frac{30 + 20}{1.5 + 0.5 + 1.0} = \\frac{50}{3} = 16.67\\text{ km/h}$\n\nSage, why must the rest period be included when calculating average speed?`;
    }
    onSendToSage(prompt);
  };

  return (
    <div id="motion-graphs-studio" className="bg-white rounded-2xl sm:rounded-3xl border border-[#D6D6C2] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-[#D6D6C2] bg-[#EBEBE0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#CCD5AE]/60 text-[#5A5A40] border border-[#B5C99A] font-semibold text-xs flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Rate & Motion Graphs
            </span>
            <h3 className="text-base font-serif italic font-bold text-[#5A5A40]">Practical Motion Graphs (Distance & Speed)</h3>
          </div>
          <p className="text-xs text-[#73735C] mt-1">
            Gradients (speed & acceleration) and area under curves (distance traveled).
          </p>
        </div>

        <button
          onClick={handleSendToSage}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40] hover:bg-[#474732] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" /> Send to Sage
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 py-2.5 bg-[#F9F9F7] border-b border-[#D6D6C2] flex items-center gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => setGraphType('speed_time')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            graphType === 'speed_time' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          Speed-Time Profile (Area = Distance)
        </button>
        <button
          onClick={() => setGraphType('distance_time')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            graphType === 'distance_time' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          Distance-Time (Gradient = Speed)
        </button>
      </div>

      {/* Main Workspace */}
      <div className="p-5 flex-1 overflow-y-auto space-y-6 bg-[#F5F5F0]">
        {graphType === 'speed_time' ? (
          <div className="space-y-5">
            {/* Parameters */}
            <div className="bg-white rounded-2xl p-4 border border-[#E6E6DA] shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-[#73735C] font-medium block mb-1">Accel Time (t₁):</label>
                <input
                  type="number"
                  min={2}
                  max={20}
                  value={t1}
                  onChange={e => setT1(Number(e.target.value) || 2)}
                  className="w-full border border-[#D6D6C2] rounded-lg px-2 py-1 font-mono font-bold bg-[#F9F9F7] text-[#434338]"
                />
              </div>

              <div>
                <label className="text-[#73735C] font-medium block mb-1">Cruising Time (t₂):</label>
                <input
                  type="number"
                  min={2}
                  max={30}
                  value={t2}
                  onChange={e => setT2(Number(e.target.value) || 2)}
                  className="w-full border border-[#D6D6C2] rounded-lg px-2 py-1 font-mono font-bold bg-[#F9F9F7] text-[#434338]"
                />
              </div>

              <div>
                <label className="text-[#73735C] font-medium block mb-1">Braking Time (t₃):</label>
                <input
                  type="number"
                  min={2}
                  max={20}
                  value={t3}
                  onChange={e => setT3(Number(e.target.value) || 2)}
                  className="w-full border border-[#D6D6C2] rounded-lg px-2 py-1 font-mono font-bold bg-[#F9F9F7] text-[#434338]"
                />
              </div>

              <div>
                <label className="text-[#73735C] font-medium block mb-1">Peak Speed (v):</label>
                <input
                  type="number"
                  min={5}
                  max={60}
                  value={vMax}
                  onChange={e => setVMax(Number(e.target.value) || 5)}
                  className="w-full border border-[#D6D6C2] rounded-lg px-2 py-1 font-mono font-bold bg-[#F9F9F7] text-[#434338]"
                />
              </div>
            </div>

            {/* SVG Visual Graph */}
            <div className="bg-[#434338] rounded-2xl p-6 shadow-md flex flex-col items-center justify-center">
              <svg viewBox="0 0 400 200" className="w-full max-w-md h-48">
                {/* Grid & Axes */}
                <line x1="40" y1="20" x2="40" y2="170" stroke="#8A8A75" strokeWidth="2" />
                <line x1="40" y1="170" x2="380" y2="170" stroke="#8A8A75" strokeWidth="2" />

                {/* Shaded Trapezoid */}
                <polygon
                  points={`40,170 ${40 + (t1 / totalTime) * 320},40 ${40 + ((t1 + t2) / totalTime) * 320},40 360,170`}
                  fill="#A3B18A"
                  opacity="0.45"
                />

                {/* Speed-Time Line */}
                <polyline
                  points={`40,170 ${40 + (t1 / totalTime) * 320},40 ${40 + ((t1 + t2) / totalTime) * 320},40 360,170`}
                  fill="none"
                  stroke="#CCD5AE"
                  strokeWidth="3.5"
                />

                {/* Labels */}
                <text x="10" y="30" fill="#CCD5AE" fontSize="11" fontFamily="monospace">{vMax}m/s</text>
                <text x="350" y="190" fill="#D6D6C2" fontSize="11" fontFamily="monospace">{totalTime}s</text>
                <text x="160" y="110" fill="#FAEDCD" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  Area = {areaTrapezoid} m
                </text>
              </svg>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-[#E6E6DA] shadow-xs">
                <span className="text-[#8A8A75] font-bold uppercase tracking-wider text-[10px] block">Initial Acceleration:</span>
                <span className="text-base font-bold font-mono text-[#5A5A40] mt-1 block">
                  a = {accel.toFixed(2)} m/s²
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E6E6DA] shadow-xs">
                <span className="text-[#8A8A75] font-bold uppercase tracking-wider text-[10px] block">Cruising Speed:</span>
                <span className="text-base font-bold font-mono text-[#5A5A40] mt-1 block">
                  v = {vMax} m/s (a = 0)
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E6E6DA] shadow-xs">
                <span className="text-[#8A8A75] font-bold uppercase tracking-wider text-[10px] block">Total Distance Traveled (Area):</span>
                <span className="text-base font-bold font-mono text-[#D4A373] mt-1 block">
                  d = {areaTrapezoid} meters
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[#E6E6DA] shadow-xs space-y-3 text-xs">
              <h4 className="font-serif italic font-bold text-[#5A5A40] text-sm">Distance-Time Cyclist Profile (Chapter 9)</h4>
              <ul className="space-y-2 text-[#434338]">
                <li className="flex items-center justify-between p-2.5 bg-[#F9F9F7] rounded-xl border border-[#E6E6DA]">
                  <span>Stage 1: Rides 30 km in 1.5 h</span>
                  <span className="font-mono font-bold text-[#5A5A40]">Speed = 30 / 1.5 = 20 km/h</span>
                </li>
                <li className="flex items-center justify-between p-2.5 bg-[#FAEDCD]/50 rounded-xl border border-[#D4A373]/50">
                  <span>Stage 2: Rests for 30 minutes (0.5 h)</span>
                  <span className="font-mono font-bold text-[#D4A373]">Speed = 0 km/h (Flat Plateau)</span>
                </li>
                <li className="flex items-center justify-between p-2.5 bg-[#F9F9F7] rounded-xl border border-[#E6E6DA]">
                  <span>Stage 3: Rides 20 km in 1.0 h</span>
                  <span className="font-mono font-bold text-[#5A5A40]">Speed = 20 / 1.0 = 20 km/h</span>
                </li>
              </ul>

              <div className="p-4 bg-[#E9EDC9]/50 rounded-2xl border border-[#CCD5AE] mt-3 text-[#434338] font-mono text-xs">
                <div>Total Distance = 30 + 0 + 20 = 50 km</div>
                <div>Total Elapsed Time = 1.5 + 0.5 + 1.0 = 3.0 h</div>
                <div className="text-base font-bold text-[#5A5A40] mt-1">
                  Average Speed = 50 / 3.0 = 16.67 km/h
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
