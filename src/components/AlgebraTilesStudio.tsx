import React, { useState } from 'react';
import { Layers, Send, Sparkles, Plus, Minus, RotateCcw, Info } from 'lucide-react';

interface AlgebraTilesStudioProps {
  onSendToSage: (prompt: string) => void;
}

export const AlgebraTilesStudio: React.FC<AlgebraTilesStudioProps> = ({ onSendToSage }) => {
  const [activeMode, setActiveMode] = useState<'completing_square' | 'area_expansion' | 'free_tiles'>('completing_square');

  // Completing the square state
  const [bCoeff, setBCoeff] = useState<number>(-6);

  // Area expansion state (a*x + p)(c*x + q)
  const [factorP, setFactorP] = useState<number>(3);
  const [factorQ, setFactorQ] = useState<number>(-4);

  // Completing the square calculations
  const halfB = bCoeff / 2;
  const missingCorner = Math.pow(halfB, 2);

  // Free Tiles Workbench State
  interface FreeTile {
    id: string;
    type: 'pos_x2' | 'neg_x2' | 'pos_x' | 'neg_x' | 'pos_unit' | 'neg_unit';
  }

  const [tiles, setTiles] = useState<FreeTile[]>([
    { id: '1', type: 'pos_x2' },
    { id: '2', type: 'pos_x' },
    { id: '3', type: 'pos_x' },
    { id: '4', type: 'pos_x' },
    { id: '5', type: 'neg_x' },
    { id: '6', type: 'pos_unit' },
    { id: '7', type: 'pos_unit' },
    { id: '8', type: 'neg_unit' },
  ]);

  const addTile = (type: FreeTile['type']) => {
    setTiles(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, type }]);
  };

  const removeTile = (id: string) => {
    setTiles(prev => prev.filter(t => t.id !== id));
  };

  const flipTile = (id: string) => {
    setTiles(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        const flipMap: Record<FreeTile['type'], FreeTile['type']> = {
          pos_x2: 'neg_x2',
          neg_x2: 'pos_x2',
          pos_x: 'neg_x',
          neg_x: 'pos_x',
          pos_unit: 'neg_unit',
          neg_unit: 'pos_unit',
        };
        return { ...t, type: flipMap[t.type] };
      })
    );
  };

  // Count tiles
  const countPosX2 = tiles.filter(t => t.type === 'pos_x2').length;
  const countNegX2 = tiles.filter(t => t.type === 'neg_x2').length;
  const countPosX = tiles.filter(t => t.type === 'pos_x').length;
  const countNegX = tiles.filter(t => t.type === 'neg_x').length;
  const countPosUnit = tiles.filter(t => t.type === 'pos_unit').length;
  const countNegUnit = tiles.filter(t => t.type === 'neg_unit').length;

  const netX2 = countPosX2 - countNegX2;
  const netX = countPosX - countNegX;
  const netUnit = countPosUnit - countNegUnit;

  const cancelZeroPairs = () => {
    let current = [...tiles];

    // Cancel x2 zero pairs
    while (current.some(t => t.type === 'pos_x2') && current.some(t => t.type === 'neg_x2')) {
      const pIdx = current.findIndex(t => t.type === 'pos_x2');
      current.splice(pIdx, 1);
      const nIdx = current.findIndex(t => t.type === 'neg_x2');
      current.splice(nIdx, 1);
    }

    // Cancel x zero pairs
    while (current.some(t => t.type === 'pos_x') && current.some(t => t.type === 'neg_x')) {
      const pIdx = current.findIndex(t => t.type === 'pos_x');
      current.splice(pIdx, 1);
      const nIdx = current.findIndex(t => t.type === 'neg_x');
      current.splice(nIdx, 1);
    }

    // Cancel unit zero pairs
    while (current.some(t => t.type === 'pos_unit') && current.some(t => t.type === 'neg_unit')) {
      const pIdx = current.findIndex(t => t.type === 'pos_unit');
      current.splice(pIdx, 1);
      const nIdx = current.findIndex(t => t.type === 'neg_unit');
      current.splice(nIdx, 1);
    }

    setTiles(current);
  };

  const loadPreset = (preset: 'quadratic' | 'difference_of_squares' | 'perfect_square') => {
    if (preset === 'quadratic') {
      // 2x^2 + 3x - 2
      setTiles([
        { id: '1', type: 'pos_x2' },
        { id: '2', type: 'pos_x2' },
        { id: '3', type: 'pos_x' },
        { id: '4', type: 'pos_x' },
        { id: '5', type: 'pos_x' },
        { id: '6', type: 'neg_unit' },
        { id: '7', type: 'neg_unit' },
      ]);
    } else if (preset === 'difference_of_squares') {
      // x^2 - 4 (with +2x and -2x zero pair)
      setTiles([
        { id: '1', type: 'pos_x2' },
        { id: '2', type: 'pos_x' },
        { id: '3', type: 'pos_x' },
        { id: '4', type: 'neg_x' },
        { id: '5', type: 'neg_x' },
        { id: '6', type: 'neg_unit' },
        { id: '7', type: 'neg_unit' },
        { id: '8', type: 'neg_unit' },
        { id: '9', type: 'neg_unit' },
      ]);
    } else {
      // (x+2)^2 = x^2 + 4x + 4
      setTiles([
        { id: '1', type: 'pos_x2' },
        { id: '2', type: 'pos_x' },
        { id: '3', type: 'pos_x' },
        { id: '4', type: 'pos_x' },
        { id: '5', type: 'pos_x' },
        { id: '6', type: 'pos_unit' },
        { id: '7', type: 'pos_unit' },
        { id: '8', type: 'pos_unit' },
        { id: '9', type: 'pos_unit' },
      ]);
    }
  };

  const handleSendToSage = () => {
    let prompt = '';
    if (activeMode === 'completing_square') {
      prompt = `I am visualizing Completing the Square for $x^2 + (${bCoeff})x = 0$ in the Algebra Tiles Studio.\n- Half of the linear coefficient is $b/2 = ${halfB}$.\n- The missing corner area needed to complete the geometric square is $(b/2)^2 = (${halfB})^2 = ${missingCorner}$.\n\nSage, can you guide me through how this physical visual array transforms into the algebraic identity $(x + (${halfB}))^2 - ${missingCorner}$?`;
    } else if (activeMode === 'area_expansion') {
      prompt = `I am visualizing the 2x2 Geometric Area Model for $(x + (${factorP}))(x + (${factorQ}))$.\n- The 4 sub-rectangles are $x^2$, $(${factorP})x$, $(${factorQ})x$, and $(${factorP * factorQ})$.\n- Combined expression: $x^2 + (${factorP + factorQ})x + (${factorP * factorQ})$.\n\nSage, how do the geometric tile dimensions help me see why the middle terms add up?`;
    } else {
      prompt = `I am working with Concrete Algebra Tiles in the Workbench:\n- Current Tiles: ${countPosX2} (+x²), ${countNegX2} (-x²), ${countPosX} (+x), ${countNegX} (-x), ${countPosUnit} (+1), ${countNegUnit} (-1).\n- Net Algebraic Expression: $${netX2}x^2 ${netX >= 0 ? `+ ${netX}x` : `- ${Math.abs(netX)}x`} ${netUnit >= 0 ? `+ ${netUnit}` : `- ${Math.abs(netUnit)}`}$.\n\nSage, how do zero pairs (+x and -x) allow us to complete rectangles for factorization without changing the net value?`;
    }
    onSendToSage(prompt);
  };

  return (
    <div id="algebra-tiles-studio" className="bg-white rounded-2xl sm:rounded-3xl border border-[#D6D6C2] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Top Bar */}
      <div className="p-4 sm:p-5 border-b border-[#D6D6C2] bg-[#EBEBE0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#CCD5AE]/60 text-[#5A5A40] border border-[#B5C99A] font-semibold text-xs flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Concrete & Pictorial
            </span>
            <h3 className="text-base font-serif italic font-bold text-[#5A5A40]">Algebra Tiles & Area Models</h3>
          </div>
          <p className="text-xs text-[#73735C] mt-1">
            Transform abstract polynomial identities into tangible geometric surface areas.
          </p>
        </div>

        <button
          onClick={handleSendToSage}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40] hover:bg-[#474732] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" /> Send to Sage
        </button>
      </div>

      {/* Mode Navigation */}
      <div className="px-4 py-2.5 bg-[#F9F9F7] border-b border-[#D6D6C2] flex items-center gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveMode('completing_square')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            activeMode === 'completing_square'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          Completing the Square Visualizer
        </button>
        <button
          onClick={() => setActiveMode('area_expansion')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            activeMode === 'area_expansion'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          2×2 Area Expansion Grid
        </button>
        <button
          onClick={() => setActiveMode('free_tiles')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            activeMode === 'free_tiles'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          Concrete Free Tile Workbench & Zero Pairs
        </button>
      </div>

      {/* Main Interactive Workspace */}
      <div className="p-5 flex-1 overflow-y-auto space-y-6 bg-[#F5F5F0]">
        {activeMode === 'completing_square' && (
          <div className="space-y-6">
            {/* Control Strip */}
            <div className="bg-white rounded-2xl p-4 border border-[#E6E6DA] shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#73735C]">Expression:</span>
                <span className="font-mono text-sm font-bold text-[#5A5A40] bg-[#E9EDC9]/70 px-3 py-1 rounded-full border border-[#CCD5AE]">
                  x² {bCoeff >= 0 ? `+ ${bCoeff}x` : `- ${Math.abs(bCoeff)}x`}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#73735C] font-medium">Coefficient b:</span>
                <div className="flex items-center gap-1.5">
                  {[-8, -6, -4, -2, 2, 4, 6, 8].map(val => (
                    <button
                      key={val}
                      onClick={() => setBCoeff(val)}
                      className={`w-7 h-7 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                        bCoeff === val
                          ? 'bg-[#5A5A40] text-white shadow-xs scale-105'
                          : 'bg-[#EBEBE0] text-[#5A5A40] hover:bg-[#D6D6C2]'
                      }`}
                    >
                      {val > 0 ? `+${val}` : val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* The Visual Completing The Square Tile Layout */}
            <div className="bg-white rounded-2xl p-6 border border-[#E6E6DA] shadow-xs space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A75]">
                Geometric Tile Array Layout
              </h4>

              <div className="flex flex-col items-center justify-center p-6 bg-[#434338] rounded-2xl text-white">
                <div className="grid grid-cols-2 gap-2 max-w-sm w-full">
                  {/* Top-Left: x² Tile */}
                  <div className="aspect-square bg-[#5A5A40] rounded-xl flex flex-col items-center justify-center border-2 border-[#A3B18A] p-4 shadow-md">
                    <span className="text-xl font-bold font-mono">x²</span>
                    <span className="text-[10px] text-[#CCD5AE] font-mono mt-1">x × x</span>
                  </div>

                  {/* Top-Right: Half b * x Strip */}
                  <div className="aspect-square bg-[#A3B18A] rounded-xl flex flex-col items-center justify-center border-2 border-[#CCD5AE] p-4 shadow-md text-white">
                    <span className="text-base font-bold font-mono">
                      {halfB}x
                    </span>
                    <span className="text-[10px] text-white/80 font-mono mt-1">
                      x × ({halfB})
                    </span>
                  </div>

                  {/* Bottom-Left: Half b * x Strip */}
                  <div className="aspect-square bg-[#A3B18A] rounded-xl flex flex-col items-center justify-center border-2 border-[#CCD5AE] p-4 shadow-md text-white">
                    <span className="text-base font-bold font-mono">
                      {halfB}x
                    </span>
                    <span className="text-[10px] text-white/80 font-mono mt-1">
                      ({halfB}) × x
                    </span>
                  </div>

                  {/* Bottom-Right: THE MISSING CORNER */}
                  <div className="aspect-square bg-[#D4A373]/20 border-2 border-dashed border-[#D4A373] rounded-xl flex flex-col items-center justify-center p-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#D4A373]/10 animate-pulse" />
                    <Sparkles className="w-5 h-5 text-[#D4A373] mb-1" />
                    <span className="text-sm font-bold font-mono text-[#D4A373]">
                      + {missingCorner}
                    </span>
                    <span className="text-[10px] text-[#FAEDCD] font-mono text-center mt-0.5">
                      Missing Corner: ({halfB})²
                    </span>
                  </div>
                </div>

                {/* Overall Dimension Indicators */}
                <div className="mt-6 flex items-center justify-between w-full max-w-sm text-xs font-mono text-[#D6D6C2] border-t border-[#5A5A40] pt-3">
                  <div>Full Width: <span className="text-[#CCD5AE] font-bold">x {halfB >= 0 ? `+ ${halfB}` : `- ${Math.abs(halfB)}`}</span></div>
                  <div>Full Height: <span className="text-[#CCD5AE] font-bold">x {halfB >= 0 ? `+ ${halfB}` : `- ${Math.abs(halfB)}`}</span></div>
                </div>
              </div>

              {/* Algebraic Transformation Card */}
              <div className="bg-[#E9EDC9]/60 border border-[#CCD5AE] rounded-2xl p-4 sm:p-5 text-xs text-[#434338] space-y-2">
                <div className="font-serif italic font-bold flex items-center gap-1.5 text-[#5A5A40] text-sm">
                  <Sparkles className="w-4 h-4 text-[#D4A373]" />
                  Algebraic Derivation from the Visual Array
                </div>
                <div className="font-mono text-sm font-semibold text-[#434338] bg-white p-3 rounded-xl border border-[#CCD5AE]/60 space-y-1">
                  <div>x² {bCoeff >= 0 ? `+ ${bCoeff}x` : `- ${Math.abs(bCoeff)}x`}</div>
                  <div className="text-[#5A5A40] font-bold">
                    = (x {halfB >= 0 ? `+ ${halfB}` : `- ${Math.abs(halfB)}`})² - ({missingCorner})
                  </div>
                </div>
                <p className="text-[#73735C] text-xs">
                  We create a complete square of size <strong>(x {halfB >= 0 ? `+ ${halfB}` : `- ${Math.abs(halfB)}`})</strong>, and subtract the missing corner area <strong>{missingCorner}</strong> that had to be added.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'area_expansion' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 border border-[#E6E6DA] shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#73735C]">Expression:</span>
                <span className="font-mono text-sm font-bold text-[#5A5A40] bg-[#E9EDC9]/70 px-3 py-1 rounded-full border border-[#CCD5AE]">
                  (x {factorP >= 0 ? `+ ${factorP}` : `- ${Math.abs(factorP)}`})(x {factorQ >= 0 ? `+ ${factorQ}` : `- ${Math.abs(factorQ)}`})
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#73735C] font-medium">p:</span>
                  {[-4, -3, 2, 3, 4, 5].map(v => (
                    <button
                      key={v}
                      onClick={() => setFactorP(v)}
                      className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${factorP === v ? 'bg-[#5A5A40] text-white' : 'bg-[#EBEBE0] text-[#5A5A40]'}`}
                    >
                      {v > 0 ? `+${v}` : v}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[#73735C] font-medium">q:</span>
                  {[-4, -3, 2, 3, 4, 5].map(v => (
                    <button
                      key={v}
                      onClick={() => setFactorQ(v)}
                      className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${factorQ === v ? 'bg-[#5A5A40] text-white' : 'bg-[#EBEBE0] text-[#5A5A40]'}`}
                    >
                      {v > 0 ? `+${v}` : v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2x2 Grid Visualization */}
            <div className="bg-white rounded-2xl p-6 border border-[#E6E6DA] shadow-xs space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A75]">
                2×2 Area Expansion Grid
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full max-w-md mx-auto border-collapse font-mono text-center text-sm rounded-xl overflow-hidden">
                  <thead>
                    <tr>
                      <th className="p-3 bg-[#EBEBE0] border border-[#D6D6C2] font-bold text-[#5A5A40]">×</th>
                      <th className="p-3 bg-[#CCD5AE]/60 border border-[#D6D6C2] font-bold text-[#5A5A40]">x</th>
                      <th className="p-3 bg-[#D4A373]/30 border border-[#D6D6C2] font-bold text-[#5A5A40]">
                        {factorP >= 0 ? `+${factorP}` : factorP}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="p-3 bg-[#CCD5AE]/60 border border-[#D6D6C2] font-bold text-[#5A5A40]">x</th>
                      <td className="p-4 bg-[#E9EDC9]/40 border border-[#D6D6C2] font-bold text-[#5A5A40] text-base">
                        x²
                      </td>
                      <td className="p-4 bg-[#F9F9F7] border border-[#D6D6C2] font-semibold text-[#5A5A40]">
                        {factorP}x
                      </td>
                    </tr>
                    <tr>
                      <th className="p-3 bg-[#D4A373]/30 border border-[#D6D6C2] font-bold text-[#5A5A40]">
                        {factorQ >= 0 ? `+${factorQ}` : factorQ}
                      </th>
                      <td className="p-4 bg-[#F9F9F7] border border-[#D6D6C2] font-semibold text-[#5A5A40]">
                        {factorQ}x
                      </td>
                      <td className="p-4 bg-[#D4A373]/20 border border-[#D6D6C2] font-bold text-[#5A5A40]">
                        {factorP * factorQ}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Sum of 4 regions */}
              <div className="bg-[#434338] text-white rounded-2xl p-5 font-mono text-xs space-y-2">
                <div className="text-[#CCD5AE]">Sum of the 4 partial areas:</div>
                <div className="text-sm font-bold text-[#E9EDC9]">
                  x² + ({factorP}x + {factorQ}x) + ({factorP * factorQ})
                </div>
                <div className="text-base font-bold text-white pt-2 border-t border-[#5A5A40]">
                  = x² {factorP + factorQ >= 0 ? `+ ${factorP + factorQ}x` : `- ${Math.abs(factorP + factorQ)}x`} {factorP * factorQ >= 0 ? `+ ${factorP * factorQ}` : `- ${Math.abs(factorP * factorQ)}`}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'free_tiles' && (
          <div className="space-y-6">
            {/* Tile Tool Palette & Presets */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6E6DA] shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wide">
                    Add Concrete Tile:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => addTile('pos_x2')}
                      className="px-2.5 py-1 rounded-lg bg-[#588157] text-white font-mono text-xs font-bold hover:bg-[#3a5a40] transition-colors cursor-pointer"
                      title="Add positive x² tile"
                    >
                      +x²
                    </button>
                    <button
                      onClick={() => addTile('neg_x2')}
                      className="px-2.5 py-1 rounded-lg bg-[#BC4749] text-white font-mono text-xs font-bold hover:bg-[#9B2226] transition-colors cursor-pointer"
                      title="Add negative -x² tile"
                    >
                      -x²
                    </button>
                    <button
                      onClick={() => addTile('pos_x')}
                      className="px-2.5 py-1 rounded-lg bg-[#A3B18A] text-[#344E41] font-mono text-xs font-bold hover:bg-[#588157] hover:text-white transition-colors cursor-pointer"
                      title="Add positive +x rod"
                    >
                      +x
                    </button>
                    <button
                      onClick={() => addTile('neg_x')}
                      className="px-2.5 py-1 rounded-lg bg-[#E07A5F] text-white font-mono text-xs font-bold hover:bg-[#BC4749] transition-colors cursor-pointer"
                      title="Add negative -x rod"
                    >
                      -x
                    </button>
                    <button
                      onClick={() => addTile('pos_unit')}
                      className="px-2.5 py-1 rounded-lg bg-[#CCD5AE] text-[#5A5A40] font-mono text-xs font-bold hover:bg-[#B5C99A] transition-colors cursor-pointer"
                      title="Add positive +1 unit"
                    >
                      +1
                    </button>
                    <button
                      onClick={() => addTile('neg_unit')}
                      className="px-2.5 py-1 rounded-lg bg-[#F4A261] text-[#78290F] font-mono text-xs font-bold hover:bg-[#E76F51] hover:text-white transition-colors cursor-pointer"
                      title="Add negative -1 unit"
                    >
                      -1
                    </button>
                  </div>
                </div>

                {/* Zero Pair and Reset Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={cancelZeroPairs}
                    className="px-3 py-1.5 rounded-full bg-[#FAEDCD] text-[#8A622A] border border-[#D4A373] hover:bg-[#D4A373]/30 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                    title="Annihilate matching positive and negative tiles"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" /> Cancel Zero Pairs
                  </button>
                  <button
                    onClick={() => setTiles([])}
                    className="p-1.5 rounded-full bg-white text-[#8A8A75] border border-[#D6D6C2] hover:bg-[#EBEBE0] transition-colors cursor-pointer"
                    title="Clear All Tiles"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-2 text-xs border-t border-[#E6E6DA] pt-3 overflow-x-auto">
                <span className="text-[#8A8A75] font-medium whitespace-nowrap">Load Preset:</span>
                <button
                  onClick={() => loadPreset('quadratic')}
                  className="px-2.5 py-1 rounded-full bg-[#F5F5F0] hover:bg-[#EBEBE0] text-[#5A5A40] font-mono text-[11px] border border-[#D6D6C2] whitespace-nowrap cursor-pointer"
                >
                  2x² + 3x - 2
                </button>
                <button
                  onClick={() => loadPreset('difference_of_squares')}
                  className="px-2.5 py-1 rounded-full bg-[#F5F5F0] hover:bg-[#EBEBE0] text-[#5A5A40] font-mono text-[11px] border border-[#D6D6C2] whitespace-nowrap cursor-pointer"
                >
                  x² - 4 (with Zero Pairs)
                </button>
                <button
                  onClick={() => loadPreset('perfect_square')}
                  className="px-2.5 py-1 rounded-full bg-[#F5F5F0] hover:bg-[#EBEBE0] text-[#5A5A40] font-mono text-[11px] border border-[#D6D6C2] whitespace-nowrap cursor-pointer"
                >
                  (x + 2)² = x² + 4x + 4
                </button>
              </div>
            </div>

            {/* Tile Canvas Workspace */}
            <div className="bg-[#434338] rounded-2xl p-5 sm:p-6 shadow-md text-white space-y-4">
              <div className="flex items-center justify-between border-b border-[#5A5A40] pb-3 text-xs">
                <span className="text-[#D6D6C2] font-semibold flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#CCD5AE]" /> Manipulative Mat ({tiles.length} Tiles)
                </span>
                <span className="text-[11px] text-[#A3B18A]">
                  Click tile to flip sign (+ / -), or double-click to remove
                </span>
              </div>

              {/* Grid of tiles */}
              <div className="min-h-48 p-4 bg-[#38382E] rounded-xl border border-[#5A5A40] flex flex-wrap gap-2.5 items-center justify-center">
                {tiles.length === 0 ? (
                  <div className="text-center text-[#8A8A75] text-xs py-8">
                    Mat is empty. Use the palette buttons above to add tiles!
                  </div>
                ) : (
                  tiles.map(tile => {
                    if (tile.type === 'pos_x2') {
                      return (
                        <div
                          key={tile.id}
                          onClick={() => flipTile(tile.id)}
                          onDoubleClick={() => removeTile(tile.id)}
                          className="w-16 h-16 bg-[#588157] text-white border-2 border-[#A3B18A] rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm shadow-md cursor-pointer hover:scale-105 transition-transform select-none"
                          title="Click to flip to -x², Double-click to remove"
                        >
                          <span>+x²</span>
                          <span className="text-[9px] text-[#CCD5AE] font-sans font-normal">x × x</span>
                        </div>
                      );
                    }
                    if (tile.type === 'neg_x2') {
                      return (
                        <div
                          key={tile.id}
                          onClick={() => flipTile(tile.id)}
                          onDoubleClick={() => removeTile(tile.id)}
                          className="w-16 h-16 bg-[#BC4749] text-white border-2 border-[#E07A5F] rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm shadow-md cursor-pointer hover:scale-105 transition-transform select-none"
                          title="Click to flip to +x², Double-click to remove"
                        >
                          <span>-x²</span>
                          <span className="text-[9px] text-rose-200 font-sans font-normal">-(x × x)</span>
                        </div>
                      );
                    }
                    if (tile.type === 'pos_x') {
                      return (
                        <div
                          key={tile.id}
                          onClick={() => flipTile(tile.id)}
                          onDoubleClick={() => removeTile(tile.id)}
                          className="w-8 h-16 bg-[#A3B18A] text-[#344E41] border-2 border-[#CCD5AE] rounded-lg flex flex-col items-center justify-center font-mono font-bold text-xs shadow-xs cursor-pointer hover:scale-105 transition-transform select-none"
                          title="Click to flip to -x, Double-click to remove"
                        >
                          <span>+x</span>
                          <span className="text-[8px] text-[#5A5A40]">1×x</span>
                        </div>
                      );
                    }
                    if (tile.type === 'neg_x') {
                      return (
                        <div
                          key={tile.id}
                          onClick={() => flipTile(tile.id)}
                          onDoubleClick={() => removeTile(tile.id)}
                          className="w-8 h-16 bg-[#E07A5F] text-white border-2 border-[#F4A261] rounded-lg flex flex-col items-center justify-center font-mono font-bold text-xs shadow-xs cursor-pointer hover:scale-105 transition-transform select-none"
                          title="Click to flip to +x, Double-click to remove"
                        >
                          <span>-x</span>
                          <span className="text-[8px] text-orange-200">-(1×x)</span>
                        </div>
                      );
                    }
                    if (tile.type === 'pos_unit') {
                      return (
                        <div
                          key={tile.id}
                          onClick={() => flipTile(tile.id)}
                          onDoubleClick={() => removeTile(tile.id)}
                          className="w-7 h-7 bg-[#CCD5AE] text-[#5A5A40] border-2 border-[#FAEDCD] rounded-md flex items-center justify-center font-mono font-bold text-xs shadow-xs cursor-pointer hover:scale-110 transition-transform select-none"
                          title="Click to flip to -1, Double-click to remove"
                        >
                          +1
                        </div>
                      );
                    }
                    return (
                      <div
                        key={tile.id}
                        onClick={() => flipTile(tile.id)}
                        onDoubleClick={() => removeTile(tile.id)}
                        className="w-7 h-7 bg-[#F4A261] text-[#78290F] border-2 border-[#E76F51] rounded-md flex items-center justify-center font-mono font-bold text-xs shadow-xs cursor-pointer hover:scale-110 transition-transform select-none"
                        title="Click to flip to +1, Double-click to remove"
                      >
                        -1
                      </div>
                    );
                  })
                )}
              </div>

              {/* Real-time expression evaluation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-[#4A4A3E] rounded-xl border border-[#5A5A40] text-xs font-mono">
                  <span className="text-[#CCD5AE] font-sans font-semibold block text-[11px] mb-1">
                    Raw Tile Tally:
                  </span>
                  <div>x² terms: <span className="text-emerald-400">+{countPosX2}</span> / <span className="text-rose-400">-{countNegX2}</span></div>
                  <div>x rods: <span className="text-emerald-400">+{countPosX}</span> / <span className="text-rose-400">-{countNegX}</span></div>
                  <div>Unit squares: <span className="text-emerald-400">+{countPosUnit}</span> / <span className="text-rose-400">-{countNegUnit}</span></div>
                </div>

                <div className="p-3.5 bg-[#4A4A3E] rounded-xl border border-[#CCD5AE]/40 text-xs font-mono flex flex-col justify-center">
                  <span className="text-[#FAEDCD] font-sans font-semibold block text-[11px] mb-1">
                    Net Simplified Polynomial:
                  </span>
                  <div className="text-base font-bold text-[#E9EDC9]">
                    {netX2 !== 0 && `${netX2 === 1 ? '' : netX2 === -1 ? '-' : netX2}x² `}
                    {netX !== 0 && `${netX > 0 && netX2 !== 0 ? '+ ' : ''}${netX === 1 ? '' : netX === -1 ? '-' : netX}x `}
                    {netUnit !== 0 && `${netUnit > 0 && (netX2 !== 0 || netX !== 0) ? '+ ' : ''}${netUnit}`}
                    {netX2 === 0 && netX === 0 && netUnit === 0 && '0 (Complete Balance)'}
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
