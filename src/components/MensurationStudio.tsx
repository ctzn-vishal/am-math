import React, { useState } from 'react';
import { Send, Circle, Sparkles } from 'lucide-react';

interface MensurationStudioProps {
  onSendToSage: (prompt: string) => void;
}

export const MensurationStudio: React.FC<MensurationStudioProps> = ({ onSendToSage }) => {
  const [solidType, setSolidType] = useState<'cone' | 'cylinder' | 'silo'>('cone');

  // Cone dimensions
  const [radiusR, setRadiusR] = useState<number>(5);
  const [heightH, setHeightH] = useState<number>(12);

  // Slant height l = sqrt(r^2 + h^2)
  const slantL = Math.sqrt(radiusR * radiusR + heightH * heightH);
  const coneVol = (1 / 3) * Math.PI * radiusR * radiusR * heightH;
  const coneCSA = Math.PI * radiusR * slantL;
  const coneTSA = coneCSA + Math.PI * radiusR * radiusR;

  // Composite Silo (Cylinder r=3, h=8 + Hemisphere r=3)
  const siloR = 3;
  const siloH = 8;
  const siloVol = Math.PI * siloR * siloR * siloH + (2 / 3) * Math.PI * Math.pow(siloR, 3);
  const siloArea = Math.PI * siloR * siloR + 2 * Math.PI * siloR * siloH + 2 * Math.PI * siloR * siloR;

  const handleSendToSage = () => {
    let prompt = '';
    if (solidType === 'cone') {
      prompt = `I am calculating the Mensuration of a Right Circular Cone with base radius $r = ${radiusR}\\text{ cm}$ and vertical height $h = ${heightH}\\text{ cm}$:\n- Slant height $l = \\sqrt{${radiusR}^2 + ${heightH}^2} = ${slantL.toFixed(2)}\\text{ cm}$\n- Volume $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi(${radiusR}^2)(${heightH}) = ${(coneVol / Math.PI).toFixed(1)}\\pi\\text{ cm}^3 \\approx ${coneVol.toFixed(1)}\\text{ cm}^3$\n- Curved Surface Area $\\text{CSA} = \\pi r l = ${(coneCSA / Math.PI).toFixed(1)}\\pi\\text{ cm}^2$\n- Total Surface Area $\\text{TSA} = \\pi r l + \\pi r^2 = ${(coneTSA / Math.PI).toFixed(1)}\\pi\\text{ cm}^2$\n\nSage, why must we use the slant height $l$ instead of vertical height $h$ for the curved surface area net?`;
    } else if (solidType === 'silo') {
      prompt = `I am analyzing a composite storage silo (Cylinder of $r=3, h=8$ topped by a Hemisphere of $r=3$):\n- Total Volume: $\\pi r^2 h + \\frac{2}{3}\\pi r^3 = 72\\pi + 18\\pi = 90\\pi \\approx ${siloVol.toFixed(1)}\\text{ m}^3$\n- Total Exterior Surface Area: Flat base + Cylinder curved wall + Hemisphere dome $= \\pi r^2 + 2\\pi rh + 2\\pi r^2 = 75\\pi \\approx ${siloArea.toFixed(1)}\\text{ m}^2$\n\nSage, why is the circular interface between the cylinder and hemisphere omitted from surface area?`;
    } else {
      prompt = `I am exploring Cylinders ($V = \\pi r^2 h$, $\\text{CSA} = 2\\pi rh$). How does unrolling the curved surface into a flat rectangle of dimension $2\\pi r$ by $h$ help explain the formula?`;
    }
    onSendToSage(prompt);
  };

  return (
    <div id="mensuration-studio" className="bg-white rounded-2xl sm:rounded-3xl border border-[#D6D6C2] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-[#D6D6C2] bg-[#EBEBE0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#CCD5AE]/60 text-[#5A5A40] border border-[#B5C99A] font-semibold text-xs flex items-center gap-1">
              <Circle className="w-3.5 h-3.5" /> 3D Spatial Mensuration
            </span>
            <h3 className="text-base font-serif italic font-bold text-[#5A5A40]">Pyramids, Cones, Cylinders & Spheres</h3>
          </div>
          <p className="text-xs text-[#73735C] mt-1">
            2D unrolled surface nets, slant height vs vertical height, and composite solids.
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
          onClick={() => setSolidType('cone')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            solidType === 'cone' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          Right Circular Cone (Slant Height l)
        </button>
        <button
          onClick={() => setSolidType('silo')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            solidType === 'silo' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          Composite Silo (Cylinder + Hemisphere)
        </button>
      </div>

      {/* Main Content */}
      <div className="p-5 flex-1 overflow-y-auto space-y-6 bg-[#F5F5F0]">
        {solidType === 'cone' ? (
          <div className="space-y-5">
            {/* Input sliders */}
            <div className="bg-white rounded-2xl p-4 border border-[#E6E6DA] shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <label className="flex items-center justify-between">
                <span className="font-sans font-medium text-[#73735C]">Base Radius (r):</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={radiusR}
                    onChange={e => setRadiusR(Number(e.target.value))}
                    className="accent-[#5A5A40] cursor-pointer"
                  />
                  <span className="w-12 text-right font-bold text-[#5A5A40] bg-[#E9EDC9]/70 px-2 py-0.5 rounded-full border border-[#CCD5AE]">{radiusR} cm</span>
                </div>
              </label>

              <label className="flex items-center justify-between">
                <span className="font-sans font-medium text-[#73735C]">Vertical Height (h):</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={1}
                    max={25}
                    value={heightH}
                    onChange={e => setHeightH(Number(e.target.value))}
                    className="accent-[#5A5A40] cursor-pointer"
                  />
                  <span className="w-12 text-right font-bold text-[#5A5A40] bg-[#E9EDC9]/70 px-2 py-0.5 rounded-full border border-[#CCD5AE]">{heightH} cm</span>
                </div>
              </label>
            </div>

            {/* Calculations Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-[#E6E6DA] shadow-xs space-y-1">
                <span className="text-[#8A8A75] font-bold uppercase tracking-wider text-[10px] font-sans block">Slant Height (l):</span>
                <div className="text-base font-bold font-mono text-[#5A5A40]">
                  l = √(r² + h²) = {slantL.toFixed(2)} cm
                </div>
                <p className="text-[11px] text-[#73735C] font-sans">Used for curved surface net</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E6E6DA] shadow-xs space-y-1">
                <span className="text-[#8A8A75] font-bold uppercase tracking-wider text-[10px] font-sans block">Volume (V):</span>
                <div className="text-base font-bold font-mono text-[#5A5A40]">
                  {(coneVol / Math.PI).toFixed(1)}π ≈ {coneVol.toFixed(1)} cm³
                </div>
                <p className="text-[11px] text-[#73735C] font-sans">V = 1/3 × πr²h</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E6E6DA] shadow-xs space-y-1">
                <span className="text-[#8A8A75] font-bold uppercase tracking-wider text-[10px] font-sans block">Total Surface Area (TSA):</span>
                <div className="text-base font-bold font-mono text-[#D4A373]">
                  {(coneTSA / Math.PI).toFixed(1)}π ≈ {coneTSA.toFixed(1)} cm²
                </div>
                <p className="text-[11px] text-[#73735C] font-sans">TSA = πrl + πr²</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E6E6DA] shadow-xs space-y-3 text-xs">
              <h4 className="font-serif italic font-bold text-[#5A5A40] text-sm">Composite Silo Solid (Chapter 12)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 bg-[#F9F9F7] rounded-xl border border-[#E6E6DA] space-y-1 text-[#434338]">
                  <strong className="text-[#5A5A40] font-sans block">Total Volume:</strong>
                  <div>V_cylinder = π(3²)(8) = 72π m³</div>
                  <div>V_hemisphere = (2/3)π(3³) = 18π m³</div>
                  <div className="text-[#5A5A40] font-bold pt-1 border-t border-[#E6E6DA]">
                    Total V = 90π ≈ 283 m³
                  </div>
                </div>

                <div className="p-3 bg-[#FAEDCD]/50 rounded-xl border border-[#D4A373]/50 space-y-1 text-[#434338]">
                  <strong className="text-[#D4A373] font-sans block">Total Exterior Area:</strong>
                  <div>Flat Base = π(3²) = 9π m²</div>
                  <div>Cylinder Wall = 2π(3)(8) = 48π m²</div>
                  <div>Hemisphere Dome = 2π(3²) = 18π m²</div>
                  <div className="text-[#D4A373] font-bold pt-1 border-t border-[#D4A373]/50">
                    Total Area = 75π ≈ 236 m²
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
