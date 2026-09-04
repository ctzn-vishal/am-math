import React, { useState } from 'react';
import { Send, Box, Triangle, Sparkles, Check } from 'lucide-react';

interface PythagorasStudioProps {
  onSendToSage: (prompt: string) => void;
}

const TRIPLES = [
  { a: 3, b: 4, c: 5, label: '(3, 4, 5)' },
  { a: 5, b: 12, c: 13, label: '(5, 12, 13)' },
  { a: 8, b: 15, c: 17, label: '(8, 15, 17)' },
  { a: 7, b: 24, c: 25, label: '(7, 24, 25)' },
];

export const PythagorasStudio: React.FC<PythagorasStudioProps> = ({ onSendToSage }) => {
  const [activeTab, setActiveTab] = useState<'2D_triangle' | '3D_cuboid'>('2D_triangle');

  // 2D state
  const [legA, setLegA] = useState<number>(3);
  const [legB, setLegB] = useState<number>(4);

  // 3D Cuboid state
  const [lengthL, setLengthL] = useState<number>(8);
  const [widthW, setWidthW] = useState<number>(6);
  const [heightH, setHeightH] = useState<number>(24);

  const hypC = Math.sqrt(legA * legA + legB * legB);
  const areaA = legA * legA;
  const areaB = legB * legB;
  const areaC = hypC * hypC;

  // 3D calculations
  const baseDiag = Math.sqrt(lengthL * lengthL + widthW * widthW);
  const spaceDiag = Math.sqrt(lengthL * lengthL + widthW * widthW + heightH * heightH);

  const handleSendToSage = () => {
    let prompt = '';
    if (activeTab === '2D_triangle') {
      prompt = `I am exploring the Pythagorean Theorem ($a^2 + b^2 = c^2$) in the visual studio:\n- Leg a = ${legA} (Square Area = ${areaA})\n- Leg b = ${legB} (Square Area = ${areaB})\n- Hypotenuse c = ${hypC.toFixed(2)} (Hypotenuse Square Area = ${areaA} + ${areaB} = ${areaC.toFixed(2)})\n\nSage, how do the geometric square tile attachments visually prove the Pythagorean theorem?`;
    } else {
      prompt = `I am calculating the 3D Space Diagonal of a rectangular cuboid with length $l = ${lengthL}\\text{ cm}$, width $w = ${widthW}\\text{ cm}$, and height $h = ${heightH}\\text{ cm}$.\n- Step 1 (Base floor diagonal): $d_{\\text{base}} = \\sqrt{${lengthL}^2 + ${widthW}^2} = ${baseDiag}\\text{ cm}$\n- Step 2 (Space diagonal): $D = \\sqrt{d_{\\text{base}}^2 + h^2} = \\sqrt{${baseDiag}^2 + ${heightH}^2} = ${spaceDiag}\\text{ cm}$\n\nSage, how do the two right triangles connect spatially in 3D?`;
    }
    onSendToSage(prompt);
  };

  return (
    <div id="pythagoras-studio" className="bg-white rounded-2xl sm:rounded-3xl border border-[#D6D6C2] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-[#D6D6C2] bg-[#EBEBE0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#CCD5AE]/60 text-[#5A5A40] border border-[#B5C99A] font-semibold text-xs flex items-center gap-1">
              <Triangle className="w-3.5 h-3.5" /> Concrete & Geometric
            </span>
            <h3 className="text-base font-serif italic font-bold text-[#5A5A40]">Pythagorean Theorem & 3D Space Diagonals</h3>
          </div>
          <p className="text-xs text-[#73735C] mt-1">
            Square tile geometric proofs (a² + b² = c²) and 3D cuboid space diagonals.
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
          onClick={() => setActiveTab('2D_triangle')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            activeTab === '2D_triangle' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          2D Right Triangle & Square Proof
        </button>
        <button
          onClick={() => setActiveTab('3D_cuboid')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            activeTab === '3D_cuboid' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          3D Space Diagonal (Cuboid)
        </button>
      </div>

      {/* Main Interactive Content */}
      <div className="p-5 flex-1 overflow-y-auto space-y-6 bg-[#F5F5F0]">
        {activeTab === '2D_triangle' ? (
          <div className="space-y-5">
            {/* Triples Quick Selector */}
            <div className="bg-white rounded-2xl p-4 border border-[#E6E6DA] shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#73735C]">Pythagorean Triples:</span>
                {TRIPLES.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setLegA(t.a);
                      setLegB(t.b);
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold cursor-pointer transition-colors ${
                      legA === t.a && legB === t.b
                        ? 'bg-[#5A5A40] text-white shadow-xs'
                        : 'bg-[#EBEBE0] text-[#5A5A40] hover:bg-[#D6D6C2]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs">
                <label className="flex items-center gap-1 font-mono text-[#73735C]">
                  <span>Leg a:</span>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={legA}
                    onChange={e => setLegA(Number(e.target.value) || 1)}
                    className="w-12 border border-[#D6D6C2] rounded-lg px-1 text-center bg-[#F9F9F7] text-[#434338]"
                  />
                </label>
                <label className="flex items-center gap-1 font-mono text-[#73735C]">
                  <span>Leg b:</span>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={legB}
                    onChange={e => setLegB(Number(e.target.value) || 1)}
                    className="w-12 border border-[#D6D6C2] rounded-lg px-1 text-center bg-[#F9F9F7] text-[#434338]"
                  />
                </label>
              </div>
            </div>

            {/* Geometric Square Tile Display */}
            <div className="bg-[#434338] rounded-2xl p-6 text-white flex flex-col items-center justify-center relative shadow-md">
              <div className="flex flex-wrap items-center justify-center gap-6 text-center font-mono">
                <div className="p-4 bg-[#5A5A40] rounded-2xl border border-[#A3B18A]">
                  <span className="text-[11px] text-[#CCD5AE] font-sans block">Leg a Square (a²)</span>
                  <div className="text-xl font-bold text-[#E9EDC9] mt-1">
                    {legA}² = {areaA}
                  </div>
                </div>

                <div className="text-2xl font-bold text-[#A3B18A]">+</div>

                <div className="p-4 bg-[#5A5A40] rounded-2xl border border-[#A3B18A]">
                  <span className="text-[11px] text-[#CCD5AE] font-sans block">Leg b Square (b²)</span>
                  <div className="text-xl font-bold text-[#E9EDC9] mt-1">
                    {legB}² = {areaB}
                  </div>
                </div>

                <div className="text-2xl font-bold text-[#A3B18A]">=</div>

                <div className="p-4 bg-[#5A5A40] rounded-2xl border border-[#D4A373]">
                  <span className="text-[11px] text-[#FAEDCD] font-sans block">Hypotenuse c² (a² + b²)</span>
                  <div className="text-xl font-bold text-[#D4A373] mt-1">
                    {areaA + areaB} ⇒ c = {hypC % 1 === 0 ? hypC : hypC.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="mt-6 text-xs font-mono text-[#D6D6C2] text-center">
                Hypotenuse c = √(a² + b²) = √({areaA} + {areaB}) = √({areaA + areaB}) = <span className="text-[#FAEDCD] font-bold">{hypC % 1 === 0 ? hypC : hypC.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Cuboid Inputs */}
            <div className="bg-white rounded-2xl p-4 border border-[#E6E6DA] shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <label className="flex items-center gap-1.5">
                <span className="font-sans font-medium text-[#73735C]">Length (l):</span>
                <input
                  type="number"
                  min={1}
                  value={lengthL}
                  onChange={e => setLengthL(Number(e.target.value) || 1)}
                  className="w-14 border border-[#D6D6C2] rounded-lg px-1 text-center bg-[#F9F9F7] text-[#434338]"
                />
                <span className="text-[#8A8A75]">cm</span>
              </label>

              <label className="flex items-center gap-1.5">
                <span className="font-sans font-medium text-[#73735C]">Width (w):</span>
                <input
                  type="number"
                  min={1}
                  value={widthW}
                  onChange={e => setWidthW(Number(e.target.value) || 1)}
                  className="w-14 border border-[#D6D6C2] rounded-lg px-1 text-center bg-[#F9F9F7] text-[#434338]"
                />
                <span className="text-[#8A8A75]">cm</span>
              </label>

              <label className="flex items-center gap-1.5">
                <span className="font-sans font-medium text-[#73735C]">Height (h):</span>
                <input
                  type="number"
                  min={1}
                  value={heightH}
                  onChange={e => setHeightH(Number(e.target.value) || 1)}
                  className="w-14 border border-[#D6D6C2] rounded-lg px-1 text-center bg-[#F9F9F7] text-[#434338]"
                />
                <span className="text-[#8A8A75]">cm</span>
              </label>
            </div>

            {/* Step-by-step 3D Calculation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E6E6DA] shadow-xs space-y-2 text-xs">
                <div className="font-serif italic font-bold text-[#5A5A40] text-sm flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#CCD5AE]/60 text-[#5A5A40] border border-[#B5C99A] flex items-center justify-center font-bold text-[11px]">1</span>
                  Base Floor Diagonal (d_base)
                </div>
                <p className="text-[#73735C]">Right triangle on the bottom rectangular floor:</p>
                <div className="p-3 bg-[#F9F9F7] rounded-xl font-mono text-[#434338] border border-[#E6E6DA]">
                  d_base² = l² + w² = {lengthL}² + {widthW}²<br />
                  d_base² = {lengthL * lengthL} + {widthW * widthW} = {lengthL * lengthL + widthW * widthW}<br />
                  <strong className="text-[#5A5A40] font-bold">d_base = {baseDiag.toFixed(2)} cm</strong>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E6E6DA] shadow-xs space-y-2 text-xs">
                <div className="font-serif italic font-bold text-[#5A5A40] text-sm flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#FAEDCD] text-[#D4A373] border border-[#D4A373] flex items-center justify-center font-bold text-[11px]">2</span>
                  3D Internal Space Diagonal (D)
                </div>
                <p className="text-[#73735C]">Vertical right triangle with d_base and height h:</p>
                <div className="p-3 bg-[#E9EDC9]/50 rounded-xl font-mono text-[#434338] border border-[#CCD5AE]">
                  D² = d_base² + h² = {lengthL * lengthL + widthW * widthW} + {heightH}²<br />
                  D² = {lengthL * lengthL + widthW * widthW + heightH * heightH}<br />
                  <strong className="text-[#5A5A40] font-bold text-sm">D = {spaceDiag.toFixed(2)} cm</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
