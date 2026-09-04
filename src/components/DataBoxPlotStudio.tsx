import React, { useState } from 'react';
import { Send, BarChart2, Calculator } from 'lucide-react';

interface DataBoxPlotStudioProps {
  onSendToSage: (prompt: string) => void;
}

export const DataBoxPlotStudio: React.FC<DataBoxPlotStudioProps> = ({ onSendToSage }) => {
  const [dataMode, setDataMode] = useState<'five_number' | 'grouped_mean'>('five_number');

  // Five number data string
  const [rawNumbers, setRawNumbers] = useState<string>('3, 7, 8, 5, 12, 14, 21, 13, 18');

  // Compute 5-number summary
  const parsedNumbers = rawNumbers
    .split(',')
    .map(s => Number(s.trim()))
    .filter(n => !isNaN(n))
    .sort((a, b) => a - b);

  const n = parsedNumbers.length;
  const minVal = n > 0 ? parsedNumbers[0] : 0;
  const maxVal = n > 0 ? parsedNumbers[n - 1] : 0;

  const getMedian = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    const mid = Math.floor(arr.length / 2);
    if (arr.length % 2 === 1) return arr[mid];
    return (arr[mid - 1] + arr[mid]) / 2;
  };

  const medianQ2 = getMedian(parsedNumbers);
  const midIndex = Math.floor(n / 2);
  const lowerHalf = n % 2 === 1 ? parsedNumbers.slice(0, midIndex) : parsedNumbers.slice(0, midIndex);
  const upperHalf = n % 2 === 1 ? parsedNumbers.slice(midIndex + 1) : parsedNumbers.slice(midIndex);

  const q1 = getMedian(lowerHalf);
  const q3 = getMedian(upperHalf);
  const iqr = q3 - q1;

  // Grouped frequency table state (Chapter 13 Example 2)
  const groupedData = [
    { range: '50 ≤ x < 60', midpoint: 55, f: 6 },
    { range: '60 ≤ x < 70', midpoint: 65, f: 14 },
    { range: '70 ≤ x < 80', midpoint: 75, f: 12 },
    { range: '80 ≤ x < 90', midpoint: 85, f: 8 },
  ];

  const totalF = groupedData.reduce((acc, row) => acc + row.f, 0);
  const totalFX = groupedData.reduce((acc, row) => acc + row.f * row.midpoint, 0);
  const estimatedMean = totalF > 0 ? totalFX / totalF : 0;

  const handleSendToSage = () => {
    let prompt = '';
    if (dataMode === 'five_number') {
      prompt = `I am analyzing the Five-Number Summary for the dataset [${rawNumbers}] in the Data Studio:\n- Ascending Order ($n = ${n}$): [${parsedNumbers.join(', ')}]\n- Minimum = ${minVal}\n- Lower Quartile ($Q_1$) = ${q1}\n- Median ($Q_2$) = ${medianQ2}\n- Upper Quartile ($Q_3$) = ${q3}\n- Maximum = ${maxVal}\n- Interquartile Range (IQR) = $Q_3 - Q_1 = ${q3} - ${q1} = ${iqr}$\n\nSage, can you guide me on how the box plot visually communicates the spread and middle 50% of the data?`;
    } else {
      prompt = `I am calculating the Estimated Mean for a Grouped Frequency Distribution:\n- Class Intervals & Midpoints ($x$): 55 (f=6), 65 (f=14), 75 (f=12), 85 (f=8)\n- Sum of Products $\\sum fx = 330 + 910 + 900 + 680 = 2820$\n- Total Frequency $\\sum f = 40$\n- Estimated Mean $\\bar{x} = \\frac{\\sum fx}{\\sum f} = \\frac{2820}{40} = ${estimatedMean.toFixed(1)}$\n\nSage, why is this called an 'estimate' rather than the exact mean?`;
    }
    onSendToSage(prompt);
  };

  return (
    <div id="data-box-plot-studio" className="bg-white rounded-2xl sm:rounded-3xl border border-[#D6D6C2] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-[#D6D6C2] bg-[#EBEBE0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#CCD5AE]/60 text-[#5A5A40] border border-[#B5C99A] font-semibold text-xs flex items-center gap-1">
              <BarChart2 className="w-3.5 h-3.5" /> Statistics & Data
            </span>
            <h3 className="text-base font-serif italic font-bold text-[#5A5A40]">Five-Number Summary & Grouped Data Mean</h3>
          </div>
          <p className="text-xs text-[#73735C] mt-1">
            Singapore Math medians, quartiles, IQR box-and-whisker plots, and grouped distributions.
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
          onClick={() => setDataMode('five_number')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            dataMode === 'five_number' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          Five-Number Summary & Box Plot
        </button>
        <button
          onClick={() => setDataMode('grouped_mean')}
          className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
            dataMode === 'grouped_mean' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
          }`}
        >
          Grouped Frequency Mean (Σfx / Σf)
        </button>
      </div>

      {/* Main Workspace */}
      <div className="p-5 flex-1 overflow-y-auto space-y-6 bg-[#F5F5F0]">
        {dataMode === 'five_number' ? (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-4 border border-[#E6E6DA] shadow-xs space-y-2">
              <label className="text-xs font-semibold text-[#73735C] block">
                Comma-separated dataset:
              </label>
              <input
                type="text"
                value={rawNumbers}
                onChange={e => setRawNumbers(e.target.value)}
                className="w-full font-mono text-sm border border-[#D6D6C2] rounded-xl p-2.5 bg-[#F9F9F7] text-[#434338] focus:ring-2 focus:ring-[#A3B18A] focus:outline-none"
              />
              <span className="text-[11px] text-[#8A8A75] block font-mono">
                Sorted ({n} items): [{parsedNumbers.join(', ')}]
              </span>
            </div>

            {/* Visual Box Plot */}
            <div className="bg-[#434338] rounded-2xl p-6 shadow-md text-white space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#D6D6C2]">
                Box-and-Whisker Plot Representation
              </h4>

              <div className="p-4 bg-[#5A5A40] rounded-2xl border border-[#A3B18A]/50 flex items-center justify-between font-mono text-xs text-center">
                <div className="space-y-1">
                  <span className="text-[#D6D6C2] text-[10px] block">Min</span>
                  <div className="text-base font-bold text-white">{minVal}</div>
                </div>
                <div className="border-t border-dashed border-[#A3B18A] flex-1 mx-2" />
                <div className="p-2 bg-[#434338] border border-[#CCD5AE] rounded-xl space-y-1">
                  <span className="text-[#CCD5AE] text-[10px] block">Q₁ (Lower)</span>
                  <div className="text-base font-bold text-[#E9EDC9]">{q1}</div>
                </div>
                <div className="p-2.5 bg-[#434338] border-2 border-[#D4A373] rounded-xl space-y-1 mx-1">
                  <span className="text-[#FAEDCD] text-[10px] block font-bold">Median (Q₂)</span>
                  <div className="text-lg font-bold text-[#FAEDCD]">{medianQ2}</div>
                </div>
                <div className="p-2 bg-[#434338] border border-[#CCD5AE] rounded-xl space-y-1">
                  <span className="text-[#CCD5AE] text-[10px] block">Q₃ (Upper)</span>
                  <div className="text-base font-bold text-[#E9EDC9]">{q3}</div>
                </div>
                <div className="border-t border-dashed border-[#A3B18A] flex-1 mx-2" />
                <div className="space-y-1">
                  <span className="text-[#D6D6C2] text-[10px] block">Max</span>
                  <div className="text-base font-bold text-white">{maxVal}</div>
                </div>
              </div>

              <div className="text-center font-mono text-xs text-[#CCD5AE]">
                Interquartile Range (IQR) = Q₃ - Q₁ = {q3} - {q1} = <strong className="text-[#FAEDCD] text-sm">{iqr}</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[#E6E6DA] shadow-xs space-y-4">
              <h4 className="font-serif italic font-bold text-[#5A5A40] text-sm">Grouped Frequency Distribution Table</h4>
              <table className="w-full border-collapse font-mono text-xs text-center">
                <thead>
                  <tr className="bg-[#EBEBE0] border-b border-[#D6D6C2]">
                    <th className="p-2.5 text-left font-sans text-[#5A5A40]">Score Interval</th>
                    <th className="p-2.5 font-bold text-[#5A5A40]">Midpoint (x)</th>
                    <th className="p-2.5 font-bold text-[#5A5A40]">Frequency (f)</th>
                    <th className="p-2.5 font-bold text-[#D4A373]">f · x</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedData.map((row, i) => (
                    <tr key={i} className="border-b border-[#E6E6DA]">
                      <td className="p-2.5 text-left font-sans text-[#434338]">{row.range}</td>
                      <td className="p-2.5 text-[#5A5A40] font-bold">{row.midpoint}</td>
                      <td className="p-2.5 font-bold text-[#434338]">{row.f}</td>
                      <td className="p-2.5 text-[#D4A373] font-bold">{row.f * row.midpoint}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#F9F9F7] font-bold">
                    <td className="p-2.5 text-left font-sans text-[#5A5A40]">Total</td>
                    <td className="p-2.5 text-[#8A8A75]">-</td>
                    <td className="p-2.5 text-[#5A5A40]">Σf = {totalF}</td>
                    <td className="p-2.5 text-[#D4A373]">Σfx = {totalFX}</td>
                  </tr>
                </tbody>
              </table>

              <div className="p-4 bg-[#E9EDC9]/50 rounded-2xl border border-[#CCD5AE] font-mono text-xs text-[#434338] space-y-1">
                <div>Estimated Mean (x̄) = Σfx / Σf = {totalFX} / {totalF}</div>
                <div className="text-base font-bold text-[#5A5A40]">
                  x̄ = {estimatedMean.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
