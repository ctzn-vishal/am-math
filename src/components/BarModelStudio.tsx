import React, { useState } from 'react';
import { Plus, Trash2, Send, RefreshCw, HelpCircle, Layers, ArrowRight } from 'lucide-react';
import { BarRow, BarUnit } from '../types';

interface BarModelStudioProps {
  onSendToSage: (prompt: string) => void;
}

const PRESET_MODELS: { id?: string; title: string; description: string; rows: BarRow[] }[] = [
  {
    title: 'Simultaneous Equations (Substitution)',
    description: 'Model $y = 2x + 1$ and $3x + 2y = 16$. Replacing $y$ with two $x$ blocks and one $1$ block.',
    rows: [
      {
        id: 'r1',
        name: 'Row y',
        totalValue: 'y',
        units: [
          { id: 'u1', label: 'x', isUnknown: true, widthUnits: 2, color: 'bg-[#A3B18A] text-white' },
          { id: 'u2', label: 'x', isUnknown: true, widthUnits: 2, color: 'bg-[#A3B18A] text-white' },
          { id: 'u3', label: '1', isUnknown: false, widthUnits: 1, color: 'bg-[#D4A373] text-white' }
        ]
      },
      {
        id: 'r2',
        name: '3x + 2y = 16 (Expanded)',
        totalValue: 16,
        units: [
          { id: 'u4', label: 'x', isUnknown: true, widthUnits: 2, color: 'bg-[#A3B18A] text-white' },
          { id: 'u5', label: 'x', isUnknown: true, widthUnits: 2, color: 'bg-[#A3B18A] text-white' },
          { id: 'u6', label: 'x', isUnknown: true, widthUnits: 2, color: 'bg-[#A3B18A] text-white' },
          { id: 'u7', label: 'x (from y)', isUnknown: true, widthUnits: 2, color: 'bg-[#5A5A40] text-white' },
          { id: 'u8', label: 'x (from y)', isUnknown: true, widthUnits: 2, color: 'bg-[#5A5A40] text-white' },
          { id: 'u9', label: '1', isUnknown: false, widthUnits: 1, color: 'bg-[#D4A373] text-white' },
          { id: 'u10', label: 'x (from y)', isUnknown: true, widthUnits: 2, color: 'bg-[#5A5A40] text-white' },
          { id: 'u11', label: 'x (from y)', isUnknown: true, widthUnits: 2, color: 'bg-[#5A5A40] text-white' },
          { id: 'u12', label: '1', isUnknown: false, widthUnits: 1, color: 'bg-[#D4A373] text-white' }
        ]
      }
    ]
  },
  {
    title: 'Ticket Problem (Elimination & Comparison)',
    description: 'Group A: $3a + 4c = 48$, Doubled Group B: $10a + 4c = 104$. Visual difference isolates $7a = 56$.',
    rows: [
      {
        id: 'r1',
        name: 'Group A (3a + 4c)',
        totalValue: 48,
        units: [
          { id: 'u1', label: '3 Adult (3a)', isUnknown: true, widthUnits: 3, color: 'bg-[#5A5A40] text-white' },
          { id: 'u2', label: '4 Child (4c)', isUnknown: true, widthUnits: 4, color: 'bg-[#D4A373] text-white' }
        ]
      },
      {
        id: 'r2',
        name: '2 × Group B (10a + 4c)',
        totalValue: 104,
        units: [
          { id: 'u3', label: '3 Adult (3a)', isUnknown: true, widthUnits: 3, color: 'bg-[#5A5A40] text-white' },
          { id: 'u4', label: 'Extra 7 Adult (7a)', isUnknown: true, widthUnits: 7, color: 'bg-[#434338] text-white' },
          { id: 'u5', label: '4 Child (4c)', isUnknown: true, widthUnits: 4, color: 'bg-[#D4A373] text-white' }
        ]
      }
    ]
  },
  {
    id: 'custom',
    title: 'Part-Whole Ratio & Algebraic Units',
    description: 'Unknown units comparison with constant offset ($2u + 15 = 3u + 5$).',
    rows: [
      {
        id: 'r1',
        name: 'Model A',
        totalValue: 'Total A',
        units: [
          { id: 'u1', label: '1 Unit [u]', isUnknown: true, widthUnits: 3, color: 'bg-[#5A5A40] text-white' },
          { id: 'u2', label: '1 Unit [u]', isUnknown: true, widthUnits: 3, color: 'bg-[#5A5A40] text-white' },
          { id: 'u3', label: '+ 15', isUnknown: false, widthUnits: 4, color: 'bg-[#D4A373] text-white' }
        ]
      },
      {
        id: 'r2',
        name: 'Model B',
        totalValue: 'Total B',
        units: [
          { id: 'u4', label: '1 Unit [u]', isUnknown: true, widthUnits: 3, color: 'bg-[#5A5A40] text-white' },
          { id: 'u5', label: '1 Unit [u]', isUnknown: true, widthUnits: 3, color: 'bg-[#5A5A40] text-white' },
          { id: 'u6', label: '1 Unit [u]', isUnknown: true, widthUnits: 3, color: 'bg-[#5A5A40] text-white' },
          { id: 'u7', label: '+ 5', isUnknown: false, widthUnits: 2, color: 'bg-[#D4A373] text-white' }
        ]
      }
    ]
  },
  {
    id: 'before_after',
    title: 'Before & After Transfer (Constant Sum)',
    description: 'John gives $24 to Mary. John had 3 units, Mary had 1 unit. Total money remains constant.',
    rows: [
      {
        id: 'r1',
        name: 'Before: John (3u) & Mary (1u)',
        totalValue: 'Total = 4 units',
        units: [
          { id: 'u1', label: '1 Unit [u]', isUnknown: true, widthUnits: 3, color: 'bg-[#5A5A40] text-white' },
          { id: 'u2', label: '1 Unit [u]', isUnknown: true, widthUnits: 3, color: 'bg-[#5A5A40] text-white' },
          { id: 'u3', label: 'Transferred $24', isUnknown: false, widthUnits: 3, color: 'bg-[#BC4749] text-white' },
          { id: 'u4', label: 'Mary (1u)', isUnknown: true, widthUnits: 3, color: 'bg-[#A3B18A] text-white' }
        ]
      },
      {
        id: 'r2',
        name: 'After Transfer: Equal Shares (2u each)',
        totalValue: 'Total = 4 units',
        units: [
          { id: 'u5', label: 'John (2 units)', isUnknown: true, widthUnits: 6, color: 'bg-[#5A5A40] text-white' },
          { id: 'u6', label: 'Mary (2 units = 1u + $24)', isUnknown: true, widthUnits: 6, color: 'bg-[#A3B18A] text-white' }
        ]
      }
    ]
  }
];

export const BarModelStudio: React.FC<BarModelStudioProps> = ({ onSendToSage }) => {
  const [rows, setRows] = useState<BarRow[]>(PRESET_MODELS[0].rows);
  const [activePreset, setActivePreset] = useState<number>(0);
  const [newUnitLabel, setNewUnitLabel] = useState('x');
  const [newUnitWidth, setNewUnitWidth] = useState(2);
  const [selectedRowId, setSelectedRowId] = useState<string>(rows[0]?.id || 'r1');

  const handleAddUnit = () => {
    if (!newUnitLabel.trim()) return;
    setRows(prev =>
      prev.map(row => {
        if (row.id === selectedRowId) {
          const newUnit: BarUnit = {
            id: 'u_' + Date.now(),
            label: newUnitLabel,
            widthUnits: Math.max(1, Math.min(10, newUnitWidth)),
            isUnknown: isNaN(Number(newUnitLabel)),
            color: isNaN(Number(newUnitLabel)) ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-slate-900',
          };
          return { ...row, units: [...row.units, newUnit] };
        }
        return row;
      })
    );
  };

  const handleRemoveUnit = (rowId: string, unitId: string) => {
    setRows(prev =>
      prev.map(row => {
        if (row.id === rowId) {
          return { ...row, units: row.units.filter(u => u.id !== unitId) };
        }
        return row;
      })
    );
  };

  const handleDuplicateUnit = (rowId: string, unit: BarUnit) => {
    setRows(prev =>
      prev.map(row => {
        if (row.id === rowId) {
          const cloned: BarUnit = {
            ...unit,
            id: 'u_' + Date.now() + Math.random().toString(36).substr(2, 4),
          };
          return { ...row, units: [...row.units, cloned] };
        }
        return row;
      })
    );
  };

  const handleAddRow = () => {
    const newId = 'r_' + Date.now();
    const newRow: BarRow = {
      id: newId,
      name: `Row ${rows.length + 1}`,
      totalValue: '?',
      units: [
        { id: 'u_' + Date.now(), label: 'x', isUnknown: true, widthUnits: 3, color: 'bg-emerald-600 text-white' }
      ]
    };
    setRows(prev => [...prev, newRow]);
    setSelectedRowId(newId);
  };

  const handleRemoveRow = (rowId: string) => {
    if (rows.length <= 1) return;
    setRows(prev => prev.filter(r => r.id !== rowId));
    if (selectedRowId === rowId) {
      setSelectedRowId(rows.find(r => r.id !== rowId)?.id || '');
    }
  };

  const handleLoadPreset = (index: number) => {
    setActivePreset(index);
    setRows(PRESET_MODELS[index].rows);
    setSelectedRowId(PRESET_MODELS[index].rows[0]?.id || '');
  };

  const sendModelToSage = () => {
    const modelDescription = rows
      .map(r => `${r.name} (Total: ${r.totalValue ?? 'unknown'}): [${r.units.map(u => u.label).join('][')}]`)
      .join('\n');

    const prompt = `I built a Singapore Bar Model to visualize my math problem:\n\n${modelDescription}\n\nSage, can you guide me through analyzing this visual model step-by-step using the CPA approach? What Socratic question should I ask myself first?`;
    onSendToSage(prompt);
  };

  return (
    <div id="bar-model-studio" className="bg-white rounded-2xl sm:rounded-3xl border border-[#D6D6C2] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-[#D6D6C2] bg-[#EBEBE0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#CCD5AE]/60 text-[#5A5A40] border border-[#B5C99A] font-semibold text-xs flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Pictorial Stage
            </span>
            <h3 className="text-base font-serif italic font-bold text-[#5A5A40]">Singapore Bar Model Studio</h3>
          </div>
          <p className="text-xs text-[#73735C] mt-1">
            Build rectangular tape diagrams to reveal unknown units and algebraic balances visually.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="send-bar-model-btn"
            onClick={sendModelToSage}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40] hover:bg-[#474732] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" /> Send Model to Sage
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="px-4 py-2.5 bg-[#F9F9F7] border-b border-[#D6D6C2] flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[#8A8A75] font-bold uppercase tracking-wider text-[10px] whitespace-nowrap">Pedagogical Presets:</span>
        {PRESET_MODELS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleLoadPreset(idx)}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
              activePreset === idx
                ? 'bg-[#5A5A40] text-white shadow-xs'
                : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
            }`}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Visual Canvas Area */}
      <div className="p-5 flex-1 overflow-y-auto space-y-6 bg-[#F5F5F0]">
        <div className="bg-white rounded-2xl p-5 border border-[#E6E6DA] shadow-xs space-y-5">
          {rows.map((row, rIdx) => {
            const totalWidth = row.units.reduce((acc, u) => acc + u.widthUnits, 0) || 1;
            return (
              <div key={row.id} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#434338]">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={row.name}
                      onChange={e => {
                        const val = e.target.value;
                        setRows(prev => prev.map(r => (r.id === row.id ? { ...r, name: val } : r)));
                      }}
                      className="font-serif italic font-bold text-[#5A5A40] bg-transparent border-b border-dashed border-[#D6D6C2] focus:border-[#5A5A40] focus:outline-none px-1"
                    />
                    <span className="text-[#8A8A75]">Total:</span>
                    <input
                      type="text"
                      value={String(row.totalValue ?? '')}
                      onChange={e => {
                        const val = e.target.value;
                        setRows(prev => prev.map(r => (r.id === row.id ? { ...r, totalValue: val } : r)));
                      }}
                      placeholder="Total"
                      className="w-20 font-mono text-[#5A5A40] font-bold bg-[#E9EDC9]/70 rounded-full px-2.5 py-0.5 border border-[#CCD5AE] focus:outline-none text-xs text-center"
                    />
                  </div>

                  {rows.length > 1 && (
                    <button
                      onClick={() => handleRemoveRow(row.id)}
                      className="text-[#8A8A75] hover:text-rose-700 p-1 transition-colors"
                      title="Remove Row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* The Bar Representation */}
                <div className="relative pt-1 pb-4">
                  <div className="flex items-center h-12 w-full rounded-xl overflow-hidden border-2 border-[#5A5A40] shadow-xs bg-[#EBEBE0]">
                    {row.units.map(unit => (
                      <div
                        key={unit.id}
                        style={{ flexGrow: unit.widthUnits, flexBasis: `${(unit.widthUnits / totalWidth) * 100}%` }}
                        className={`h-full ${unit.color || 'bg-[#A3B18A] text-white'} border-r border-[#434338]/20 flex items-center justify-between px-2 relative group select-none`}
                      >
                        <span className="font-semibold text-xs truncate drop-shadow-xs">{unit.label}</span>
                        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                          <button
                            onClick={() => handleDuplicateUnit(row.id, unit)}
                            className="bg-black/40 hover:bg-[#5A5A40] text-white rounded p-0.5 text-[10px] cursor-pointer"
                            title="Duplicate block"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleRemoveUnit(row.id, unit.id)}
                            className="bg-black/40 hover:bg-rose-600 text-white rounded p-0.5 cursor-pointer"
                            title="Delete block"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {row.units.length === 0 && (
                      <div className="w-full text-center text-xs text-[#8A8A75] italic">No units in this bar yet.</div>
                    )}
                  </div>

                  {/* Curly Brace / Total Indicator */}
                  <div className="flex items-center justify-between mt-1 text-[11px] text-[#73735C] font-mono">
                    <span className="text-[#8A8A75]">0</span>
                    <span className="px-2.5 py-0.5 bg-[#EBEBE0] rounded-full text-[#5A5A40] font-bold border border-[#D6D6C2]">
                      {row.totalValue ? `= ${row.totalValue}` : `${totalWidth} units`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Balance Analysis Box & Unit Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#E9EDC9]/60 rounded-2xl p-4 sm:p-5 border border-[#CCD5AE] text-xs text-[#434338] space-y-2">
            <div className="flex items-center gap-1.5 font-serif italic font-bold text-sm text-[#5A5A40]">
              <HelpCircle className="w-4 h-4 text-[#5A5A40]" /> Socratic Visual Insight
            </div>
            <p className="text-[#434338] leading-relaxed">
              In Singapore Model Drawing, identical blocks represent identical quantities (e.g. $[x]$ or $[u]$). By aligning Row 1 and Row 2, observe the difference in total length to directly determine the unknown unit value!
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6E6DA] shadow-xs text-xs text-[#434338] space-y-2 font-mono">
            <div className="flex items-center gap-1.5 font-sans font-bold text-xs text-[#5A5A40]">
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" /> Unit Difference Solver
            </div>
            <div className="space-y-1 text-[11px] text-[#5A5A40]">
              {rows.map((r, i) => (
                <div key={r.id} className="flex justify-between border-b border-[#F5F5F0] py-0.5">
                  <span className="font-sans text-[#73735C]">{r.name}:</span>
                  <span>{r.units.length} blocks ({r.units.reduce((s, u) => s + u.widthUnits, 0)}w) = {r.totalValue ?? '?'}</span>
                </div>
              ))}
            </div>
            <div className="pt-1 text-[10px] text-[#8A8A75] font-sans">
              Equalizing units across rows eliminates unknown variables without algebraic confusion.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-[#D6D6C2] bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-[#73735C]">Add to:</span>
          <select
            value={selectedRowId}
            onChange={e => setSelectedRowId(e.target.value)}
            className="border border-[#D6D6C2] rounded-lg px-2 py-1 bg-[#F9F9F7] text-[#434338] focus:outline-none focus:border-[#5A5A40]"
          >
            {rows.map((r, i) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newUnitLabel}
            onChange={e => setNewUnitLabel(e.target.value)}
            placeholder="Label (e.g. x, 5, 2u)"
            className="w-24 border border-[#D6D6C2] rounded-lg px-2 py-1 bg-[#F9F9F7] text-[#434338] focus:outline-none focus:border-[#5A5A40]"
          />

          <label className="flex items-center gap-1 text-[#73735C]">
            <span>Width:</span>
            <input
              type="number"
              min={1}
              max={10}
              value={newUnitWidth}
              onChange={e => setNewUnitWidth(Number(e.target.value))}
              className="w-12 border border-[#D6D6C2] rounded-lg px-1.5 py-1 text-center bg-[#F9F9F7] text-[#434338]"
            />
          </label>

          <button
            id="add-unit-block-btn"
            onClick={handleAddUnit}
            className="flex items-center gap-1 px-3 py-1 bg-[#5A5A40] hover:bg-[#474732] text-white rounded-lg font-medium cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Block
          </button>
        </div>

        <button
          onClick={handleAddRow}
          className="flex items-center gap-1 px-3 py-1 border border-[#D6D6C2] hover:bg-[#EBEBE0] text-[#5A5A40] rounded-lg font-medium cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add New Row
        </button>
      </div>
    </div>
  );
};
