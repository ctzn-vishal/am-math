import React, { useState } from 'react';
import { Send, CheckCircle2, XCircle, ArrowDownUp, Sparkles, RefreshCw } from 'lucide-react';

interface CrossMethodStudioProps {
  onSendToSage: (prompt: string) => void;
}

const PRESET_QUADRATICS = [
  { label: 'x² - 7x + 12 = 0 (Chapter 4 Monic)', a: 1, b: -7, c: 12, defaultP: 1, defaultR: 1, defaultQ: -3, defaultS: -4 },
  { label: '2x² - 5x - 12 = 0 (Singapore Sec 2 Standard)', a: 2, b: -5, c: -12, defaultP: 2, defaultR: 1, defaultQ: 3, defaultS: -4 },
  { label: '2w² + 3w - 35 = 0 (Garden Word Problem)', a: 2, b: 3, c: -35, defaultP: 2, defaultR: 1, defaultQ: -7, defaultS: 5 },
  { label: 'x² + 6x + 9 = 0 (Perfect Square)', a: 1, b: 6, c: 9, defaultP: 1, defaultR: 1, defaultQ: 3, defaultS: 3 },
  { label: '3x² - 10x + 8 = 0 (Sec 2 Exam Level)', a: 3, b: -10, c: 8, defaultP: 3, defaultR: 1, defaultQ: -4, defaultS: -2 },
];

export const CrossMethodStudio: React.FC<CrossMethodStudioProps> = ({ onSendToSage }) => {
  const [a, setA] = useState<number>(2);
  const [b, setB] = useState<number>(-5);
  const [c, setC] = useState<number>(-12);

  // Factor trials
  const [p, setP] = useState<number>(2);
  const [r, setR] = useState<number>(1);
  const [q, setQ] = useState<number>(3);
  const [s, setS] = useState<number>(-4);

  // Calculations
  const productA = p * r;
  const productC = q * s;
  const cross1 = p * s; // top left to bottom right
  const cross2 = r * q; // bottom left to top right
  const middleSum = cross1 + cross2;

  const isACorrect = productA === a;
  const isCCorrect = productC === c;
  const isBCorrect = middleSum === b;
  const isAllValid = isACorrect && isCCorrect && isBCorrect;

  const loadPreset = (preset: typeof PRESET_QUADRATICS[0]) => {
    setA(preset.a);
    setB(preset.b);
    setC(preset.c);
    setP(preset.defaultP);
    setR(preset.defaultR);
    setQ(preset.defaultQ);
    setS(preset.defaultS);
  };

  const handleSendToSage = () => {
    const prompt = `I am using the Singapore Cross-Multiplication Method Frame for the quadratic equation $${a}x^2 ${b >= 0 ? `+ ${b}x` : `${b}x`} ${c >= 0 ? `+ ${c}` : `${c}`} = 0$.\n- Left factors of $ax^2$: (${p}x) and (${r}x) (Product = ${productA}x²)\n- Right factors of $c$: (${q}) and (${s}) (Product = ${productC})\n- Cross diagonal terms: (${p}x)·(${s}) = ${cross1}x, and (${r}x)·(${q}) = ${cross2}x\n- Middle term sum: ${cross1}x + (${cross2}x) = ${middleSum}x (Target = ${b}x)\n- Factorization: (${p}x ${q >= 0 ? `+ ${q}` : `${q}`})(${r}x ${s >= 0 ? `+ ${s}` : `${s}`}) = 0\n\nSage, can you guide me on how to think through factor pairs when finding the matching middle term?`;
    onSendToSage(prompt);
  };

  return (
    <div id="cross-method-studio" className="bg-white rounded-2xl sm:rounded-3xl border border-[#D6D6C2] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-[#D6D6C2] bg-[#EBEBE0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#CCD5AE]/60 text-[#5A5A40] border border-[#B5C99A] font-semibold text-xs flex items-center gap-1">
              <ArrowDownUp className="w-3.5 h-3.5" /> Pictorial Stage
            </span>
            <h3 className="text-base font-serif italic font-bold text-[#5A5A40]">Singapore Cross-Multiplication Method (X-Frame)</h3>
          </div>
          <p className="text-xs text-[#73735C] mt-1">
            The standard Singapore Secondary School visual grid for factoring quadratic trinomials.
          </p>
        </div>

        <button
          onClick={handleSendToSage}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40] hover:bg-[#474732] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" /> Send Frame to Sage
        </button>
      </div>

      {/* Presets */}
      <div className="px-4 py-2.5 bg-[#F9F9F7] border-b border-[#D6D6C2] flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[#8A8A75] font-bold uppercase tracking-wider text-[10px] whitespace-nowrap">Presets:</span>
        {PRESET_QUADRATICS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => loadPreset(preset)}
            className="px-3 py-1 rounded-full font-medium whitespace-nowrap bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0] transition-colors cursor-pointer text-xs"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Main Interactive Cross Frame */}
      <div className="p-5 flex-1 overflow-y-auto space-y-6 bg-[#F5F5F0]">
        {/* Target Equation Input */}
        <div className="bg-white rounded-2xl p-4 border border-[#E6E6DA] shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-[#73735C]">
            <span>Target Quadratic:</span>
            <div className="flex items-center gap-1 font-mono text-sm font-bold text-[#5A5A40] bg-[#E9EDC9]/60 px-3 py-1.5 rounded-full border border-[#CCD5AE]">
              <input
                type="number"
                value={a}
                onChange={e => setA(Number(e.target.value) || 1)}
                className="w-10 text-center font-mono border-b border-[#A3B18A] focus:border-[#5A5A40] focus:outline-none bg-transparent"
              />
              <span>x² +</span>
              <input
                type="number"
                value={b}
                onChange={e => setB(Number(e.target.value) || 0)}
                className="w-12 text-center font-mono border-b border-[#A3B18A] focus:border-[#5A5A40] focus:outline-none bg-transparent"
              />
              <span>x +</span>
              <input
                type="number"
                value={c}
                onChange={e => setC(Number(e.target.value) || 0)}
                className="w-12 text-center font-mono border-b border-[#A3B18A] focus:border-[#5A5A40] focus:outline-none bg-transparent"
              />
              <span>= 0</span>
            </div>
          </div>

          <div className="text-xs">
            {isAllValid ? (
              <span className="flex items-center gap-1.5 font-bold text-[#5A5A40] bg-[#CCD5AE]/60 px-3 py-1.5 rounded-full border border-[#B5C99A]">
                <CheckCircle2 className="w-4 h-4 text-[#5A5A40]" /> Perfectly Factored!
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-medium text-[#D4A373] bg-[#FAEDCD]/60 px-3 py-1.5 rounded-full border border-[#D4A373]">
                Adjust factor pairs to match target b = {b}x
              </span>
            )}
          </div>
        </div>

        {/* The Singapore Cross Frame Visual */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6E6DA] shadow-xs space-y-6">
          <div className="max-w-md mx-auto bg-[#434338] text-white rounded-2xl p-6 shadow-md relative">
            <div className="grid grid-cols-5 gap-3 items-center text-center font-mono">
              {/* Row 1 */}
              <div className="col-span-1">
                <label className="text-[10px] text-[#D6D6C2] block mb-1">px</label>
                <input
                  type="number"
                  value={p}
                  onChange={e => setP(Number(e.target.value))}
                  className="w-full bg-[#5A5A40] border border-[#A3B18A] rounded-xl p-2 text-center font-bold text-[#CCD5AE] text-sm focus:ring-2 focus:ring-[#A3B18A] focus:outline-none"
                />
              </div>

              {/* Diagonal 1 cross symbol */}
              <div className="col-span-1 text-[#CCD5AE] text-xl font-bold">
                ↘
              </div>

              {/* Row 1 constant q */}
              <div className="col-span-1">
                <label className="text-[10px] text-[#D6D6C2] block mb-1">q</label>
                <input
                  type="number"
                  value={q}
                  onChange={e => setQ(Number(e.target.value))}
                  className="w-full bg-[#5A5A40] border border-[#A3B18A] rounded-xl p-2 text-center font-bold text-[#FAEDCD] text-sm focus:ring-2 focus:ring-[#FAEDCD] focus:outline-none"
                />
              </div>

              {/* Diagonal 2 cross symbol */}
              <div className="col-span-1 text-[#CCD5AE] text-xl font-bold">
                ↗
              </div>

              {/* Cross Product 1 */}
              <div className="col-span-1 bg-[#5A5A40]/80 rounded-xl p-2 border border-[#A3B18A]/60 text-xs font-bold text-[#FAEDCD]">
                {cross2 >= 0 ? `+${cross2}x` : `${cross2}x`}
              </div>

              {/* Row 2 */}
              <div className="col-span-1">
                <label className="text-[10px] text-[#D6D6C2] block mb-1">rx</label>
                <input
                  type="number"
                  value={r}
                  onChange={e => setR(Number(e.target.value))}
                  className="w-full bg-[#5A5A40] border border-[#A3B18A] rounded-xl p-2 text-center font-bold text-[#CCD5AE] text-sm focus:ring-2 focus:ring-[#A3B18A] focus:outline-none"
                />
              </div>

              {/* Diagonal 2 cross symbol */}
              <div className="col-span-1 text-[#CCD5AE] text-xl font-bold">
                ↗
              </div>

              {/* Row 2 constant s */}
              <div className="col-span-1">
                <label className="text-[10px] text-[#D6D6C2] block mb-1">s</label>
                <input
                  type="number"
                  value={s}
                  onChange={e => setS(Number(e.target.value))}
                  className="w-full bg-[#5A5A40] border border-[#A3B18A] rounded-xl p-2 text-center font-bold text-[#FAEDCD] text-sm focus:ring-2 focus:ring-[#FAEDCD] focus:outline-none"
                />
              </div>

              {/* Diagonal 1 cross symbol */}
              <div className="col-span-1 text-[#CCD5AE] text-xl font-bold">
                ↘
              </div>

              {/* Cross Product 2 */}
              <div className="col-span-1 bg-[#5A5A40]/80 rounded-xl p-2 border border-[#A3B18A]/60 text-xs font-bold text-[#CCD5AE]">
                {cross1 >= 0 ? `+${cross1}x` : `${cross1}x`}
              </div>
            </div>

            {/* Divider Line */}
            <div className="border-t-2 border-[#5A5A40] my-4" />

            {/* Bottom Verification Row */}
            <div className="grid grid-cols-5 gap-3 items-center text-center font-mono text-xs">
              <div className={`col-span-1 font-bold ${isACorrect ? 'text-[#CCD5AE]' : 'text-[#D4A373]'}`}>
                {productA}x² {isACorrect ? '✓' : '✗'}
              </div>
              <div className="col-span-1 text-[#73735C]"></div>
              <div className={`col-span-1 font-bold ${isCCorrect ? 'text-[#FAEDCD]' : 'text-[#D4A373]'}`}>
                {productC >= 0 ? `+${productC}` : productC} {isCCorrect ? '✓' : '✗'}
              </div>
              <div className="col-span-1 text-[#D6D6C2] font-sans text-[11px]">Sum:</div>
              <div className={`col-span-1 font-bold rounded-xl p-1.5 ${isBCorrect ? 'bg-[#5A5A40] text-[#E9EDC9] border border-[#A3B18A]' : 'bg-[#D4A373]/30 text-[#FAEDCD] border border-[#D4A373]'}`}>
                {middleSum >= 0 ? `+${middleSum}x` : `${middleSum}x`} {isBCorrect ? '✓' : '✗'}
              </div>
            </div>
          </div>

          {/* Factored Form Display */}
          <div className="p-4 sm:p-5 bg-[#E9EDC9]/60 rounded-2xl border border-[#CCD5AE] space-y-2 text-xs text-[#434338]">
            <div className="font-serif italic font-bold text-[#5A5A40] text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4A373]" /> Resulting Binomial Factors
            </div>
            <div className="font-mono text-base font-bold text-[#434338] bg-white p-3.5 rounded-xl border border-[#CCD5AE]/60">
              ({p}x {q >= 0 ? `+ ${q}` : `- ${Math.abs(q)}`})({r}x {s >= 0 ? `+ ${s}` : `- ${Math.abs(s)}`}) = 0
            </div>
            <div className="text-[#73735C] text-xs">
              Zero Product Property roots: <strong className="text-[#5A5A40] font-mono">x = {(-q / p).toFixed(2)}</strong> or <strong className="text-[#5A5A40] font-mono">x = {(-s / r).toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
