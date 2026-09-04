import React, { useState } from 'react';
import { Send, Eye, Compass, Sparkles } from 'lucide-react';

interface ParallelAnglesStudioProps {
  onSendToSage: (prompt: string) => void;
}

export const ParallelAnglesStudio: React.FC<ParallelAnglesStudioProps> = ({ onSendToSage }) => {
  const [angleX, setAngleX] = useState<number>(65);
  const [activeShape, setActiveShape] = useState<'F' | 'Z' | 'C' | 'polygon'>('Z');
  const [polygonSides, setPolygonSides] = useState<number>(5);

  const supplementaryAngle = 180 - angleX;
  const interiorPolygonSum = (polygonSides - 2) * 180;
  const regularInteriorAngle = interiorPolygonSum / polygonSides;
  const regularExteriorAngle = 360 / polygonSides;

  const handleSendToSage = () => {
    let prompt = '';
    if (activeShape === 'Z') {
      prompt = `I am exploring Alternate Interior Angles (Z-shape) along parallel lines AB // CD. When one angle is $${angleX}^\\circ$, the alternate angle on the opposite side of the transversal is also $${angleX}^\\circ$. Can you give me a Socratic problem to test this?`;
    } else if (activeShape === 'F') {
      prompt = `I am exploring Corresponding Angles (F-shape) along parallel lines. Why are corresponding angles on the same side and tier equal to $${angleX}^\\circ$?`;
    } else if (activeShape === 'C') {
      prompt = `I am exploring Consecutive Interior Angles (C-shape / U-shape) along parallel lines. Why do interior angles sum to $180^\\circ$ ($${angleX}^\\circ + ${supplementaryAngle}^\\circ = 180^\\circ$)?`;
    } else {
      prompt = `I am exploring an $n = ${polygonSides}$-sided regular polygon in the Geometry visualizer:\n- Interior angle sum: $(n - 2) \\times 180^\\circ = ${interiorPolygonSum}^\\circ$\n- Each interior angle: ${regularInteriorAngle.toFixed(1)}°\n- Each exterior angle: ${regularExteriorAngle.toFixed(1)}°\n\nSage, how do interior and exterior angles relate at each vertex?`;
    }
    onSendToSage(prompt);
  };

  return (
    <div id="parallel-angles-studio" className="bg-white rounded-2xl sm:rounded-3xl border border-[#D6D6C2] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-[#D6D6C2] bg-[#EBEBE0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#CCD5AE]/60 text-[#5A5A40] border border-[#B5C99A] font-semibold text-xs flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Pictorial Geometry
            </span>
            <h3 className="text-base font-serif italic font-bold text-[#5A5A40]">Parallel Lines & Polygon Angle Explorer</h3>
          </div>
          <p className="text-xs text-[#73735C] mt-1">
            Singapore Math letter shapes (F, Z, C) for parallel transversals and polygon angle sums.
          </p>
        </div>

        <button
          onClick={handleSendToSage}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40] hover:bg-[#474732] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" /> Send to Sage
        </button>
      </div>

      {/* Mode navigation */}
      <div className="px-4 py-2.5 bg-[#F9F9F7] border-b border-[#D6D6C2] flex items-center gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveShape('Z')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            activeShape === 'Z' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          Z-Shape (Alternate Interior: Equal)
        </button>
        <button
          onClick={() => setActiveShape('F')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            activeShape === 'F' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          F-Shape (Corresponding: Equal)
        </button>
        <button
          onClick={() => setActiveShape('C')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            activeShape === 'C' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          C-Shape (Interior: Sum = 180°)
        </button>
        <button
          onClick={() => setActiveShape('polygon')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            activeShape === 'polygon' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          Regular n-gon Angles
        </button>
      </div>

      {/* Interactive Display */}
      <div className="p-5 flex-1 overflow-y-auto space-y-6 bg-[#F5F5F0]">
        {activeShape !== 'polygon' ? (
          <div className="space-y-4">
            {/* Angle Slider */}
            <div className="bg-white rounded-2xl p-4 border border-[#E6E6DA] shadow-xs flex items-center justify-between gap-4">
              <label className="text-xs font-semibold text-[#73735C] flex items-center gap-2">
                <span>Angle θ:</span>
                <span className="font-mono text-sm text-[#5A5A40] font-bold bg-[#E9EDC9]/70 px-3 py-0.5 rounded-full border border-[#CCD5AE]">
                  {angleX}°
                </span>
              </label>
              <input
                type="range"
                min="25"
                max="155"
                value={angleX}
                onChange={e => setAngleX(Number(e.target.value))}
                className="flex-1 max-w-xs accent-[#5A5A40] cursor-pointer"
              />
              <span className="text-xs text-[#73735C] font-mono">
                Supplementary: {supplementaryAngle}°
              </span>
            </div>

            {/* SVG Visual Canvas */}
            <div className="bg-[#434338] rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-md">
              <svg viewBox="0 0 400 240" className="w-full max-w-md h-52">
                {/* Parallel Line 1 */}
                <line x1="30" y1="60" x2="370" y2="60" stroke="#D6D6C2" strokeWidth="3" />
                <polygon points="200,55 215,60 200,65" fill="#CCD5AE" />
                <text x="35" y="50" fill="#D6D6C2" fontSize="12" fontFamily="monospace">Line AB</text>

                {/* Parallel Line 2 */}
                <line x1="30" y1="180" x2="370" y2="180" stroke="#D6D6C2" strokeWidth="3" />
                <polygon points="200,175 215,180 200,185" fill="#CCD5AE" />
                <text x="35" y="200" fill="#D6D6C2" fontSize="12" fontFamily="monospace">Line CD (AB // CD)</text>

                {/* Transversal Line */}
                <line x1="100" y1="20" x2="300" y2="220" stroke="#D4A373" strokeWidth="3" />

                {/* Z-Shape Highlight */}
                {activeShape === 'Z' && (
                  <>
                    <polyline points="70,60 140,60 260,180 330,180" fill="none" stroke="#A3B18A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                    <circle cx="140" cy="60" r="14" fill="none" stroke="#CCD5AE" strokeWidth="3" />
                    <circle cx="260" cy="180" r="14" fill="none" stroke="#CCD5AE" strokeWidth="3" />
                    <text x="155" y="85" fill="#E9EDC9" fontWeight="bold" fontSize="13">{angleX}°</text>
                    <text x="220" y="165" fill="#E9EDC9" fontWeight="bold" fontSize="13">{angleX}°</text>
                  </>
                )}

                {/* F-Shape Highlight */}
                {activeShape === 'F' && (
                  <>
                    <polyline points="140,20 140,60 220,60" fill="none" stroke="#CCD5AE" strokeWidth="6" opacity="0.9" />
                    <polyline points="260,140 260,180 340,180" fill="none" stroke="#CCD5AE" strokeWidth="6" opacity="0.9" />
                    <text x="155" y="50" fill="#E9EDC9" fontWeight="bold" fontSize="13">{angleX}°</text>
                    <text x="275" y="170" fill="#E9EDC9" fontWeight="bold" fontSize="13">{angleX}°</text>
                  </>
                )}

                {/* C-Shape Highlight */}
                {activeShape === 'C' && (
                  <>
                    <polyline points="70,60 140,60 260,180 190,180" fill="none" stroke="#D4A373" strokeWidth="6" opacity="0.9" />
                    <text x="155" y="85" fill="#FAEDCD" fontWeight="bold" fontSize="13">{angleX}°</text>
                    <text x="210" y="165" fill="#FAEDCD" fontWeight="bold" fontSize="13">{supplementaryAngle}°</text>
                  </>
                )}
              </svg>

              <div className="mt-2 text-xs font-mono text-[#D6D6C2]">
                {activeShape === 'Z' && `Alternate Interior: Angle 1 = Angle 2 = ${angleX}°`}
                {activeShape === 'F' && `Corresponding: Angle 1 = Angle 2 = ${angleX}°`}
                {activeShape === 'C' && `Consecutive Interior: ${angleX}° + ${supplementaryAngle}° = 180°`}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-[#E6E6DA] shadow-xs flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-[#73735C]">Number of Sides (n):</span>
              <div className="flex items-center gap-1.5">
                {[3, 4, 5, 6, 8, 10, 12].map(n => (
                  <button
                    key={n}
                    onClick={() => setPolygonSides(n)}
                    className={`px-3 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
                      polygonSides === n ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-[#EBEBE0] text-[#5A5A40] hover:bg-[#D6D6C2]'
                    }`}
                  >
                    n={n}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-[#E6E6DA] shadow-xs text-center">
                <span className="text-[11px] text-[#8A8A75] font-bold uppercase tracking-wider">Interior Angle Sum</span>
                <div className="text-lg font-bold font-mono text-[#5A5A40] mt-1">
                  ({polygonSides} - 2) × 180° = {interiorPolygonSum}°
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E6E6DA] shadow-xs text-center">
                <span className="text-[11px] text-[#8A8A75] font-bold uppercase tracking-wider">Each Interior Angle</span>
                <div className="text-lg font-bold font-mono text-[#5A5A40] mt-1">
                  {regularInteriorAngle.toFixed(1)}°
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E6E6DA] shadow-xs text-center">
                <span className="text-[11px] text-[#8A8A75] font-bold uppercase tracking-wider">Each Exterior Angle</span>
                <div className="text-lg font-bold font-mono text-[#D4A373] mt-1">
                  360° / {polygonSides} = {regularExteriorAngle.toFixed(1)}°
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
