import React, { useRef, useState, useEffect } from 'react';
import { Send, Eraser, Pen, Square, Trash2, Grid, Sparkles, Triangle, Plus } from 'lucide-react';

interface InteractiveWhiteboardProps {
  onSendSketchToSage: (imageBase64: string, promptNote: string) => void;
}

export const InteractiveWhiteboard: React.FC<InteractiveWhiteboardProps> = ({ onSendSketchToSage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'rect' | 'line'>('pen');
  const [color, setColor] = useState('#5A5A40');
  const [lineWidth, setLineWidth] = useState(3);
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [promptNote, setPromptNote] = useState('');
  const [gridStyle, setGridStyle] = useState<'none' | 'cartesian' | 'dots'>('dots');

  const redrawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number, style: 'none' | 'cartesian' | 'dots') => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (style === 'cartesian') {
      ctx.strokeStyle = '#EBEBE0';
      ctx.lineWidth = 1;
      // 20px grid
      for (let x = 0; x < width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      // Center Axes
      ctx.strokeStyle = '#D6D6C2';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    } else if (style === 'dots') {
      ctx.fillStyle = '#D6D6C2';
      for (let x = 15; x < width; x += 25) {
        for (let y = 15; y < height; y += 25) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    redrawBackground(ctx, canvas.width, canvas.height, gridStyle);
  }, []);

  const changeGrid = (newStyle: 'none' | 'cartesian' | 'dots') => {
    setGridStyle(newStyle);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    redrawBackground(ctx, canvas.width, canvas.height, newStyle);
  };

  const stampTemplate = (template: 'bar_model' | 'triangle' | 'axes') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;

    if (template === 'bar_model') {
      // Draw 2 comparison bars
      ctx.strokeRect(60, 60, 240, 45);
      ctx.strokeRect(60, 130, 360, 45);
      // Dotted partition
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(300, 130, 120, 45);
      ctx.setLineDash([]);
      // Labels
      ctx.font = '12px serif';
      ctx.fillStyle = color;
      ctx.fillText('Bar A (1 unit)', 65, 50);
      ctx.fillText('Bar B (1 unit + difference)', 65, 120);
    } else if (template === 'triangle') {
      // Right-angled triangle
      ctx.beginPath();
      ctx.moveTo(100, 240);
      ctx.lineTo(340, 240);
      ctx.lineTo(100, 80);
      ctx.closePath();
      ctx.stroke();
      // Right angle square
      ctx.strokeRect(100, 220, 20, 20);
      ctx.font = '12px serif';
      ctx.fillStyle = color;
      ctx.fillText('a', 85, 160);
      ctx.fillText('b', 215, 255);
      ctx.fillText('c = √(a² + b²)', 220, 150);
    } else if (template === 'axes') {
      // Coordinate System
      ctx.beginPath();
      ctx.moveTo(80, 260);
      ctx.lineTo(520, 260); // X axis
      ctx.moveTo(120, 300);
      ctx.lineTo(120, 40); // Y axis
      ctx.stroke();
      ctx.font = '12px serif';
      ctx.fillStyle = color;
      ctx.fillText('x', 510, 275);
      ctx.fillText('y', 105, 50);
    }
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setIsDrawing(true);
    setStartPos({ x, y });
    setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));

    if (tool === 'pen' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
      ctx.lineWidth = tool === 'eraser' ? lineWidth * 6 : lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (tool === 'pen' || tool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (snapshot) {
      ctx.putImageData(snapshot, 0, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';

      if (tool === 'rect') {
        ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      } else if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    redrawBackground(ctx, canvas.width, canvas.height, gridStyle);
  };

  const handleSendToSage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageBase64 = canvas.toDataURL('image/png');
    const note = promptNote.trim() || 'Here is my handwritten sketch/diagram of my math work. Please review my visual model and guide me Socraticly!';
    onSendSketchToSage(imageBase64, note);
  };

  return (
    <div id="interactive-whiteboard" className="bg-white rounded-2xl sm:rounded-3xl border border-[#D6D6C2] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#D6D6C2] bg-[#EBEBE0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#CCD5AE]/60 text-[#5A5A40] border border-[#B5C99A] font-semibold text-xs flex items-center gap-1">
              <Pen className="w-3.5 h-3.5" /> Pictorial Whiteboard
            </span>
            <h3 className="text-base font-serif italic font-bold text-[#5A5A40]">Student Model Sketchpad</h3>
          </div>
          <p className="text-xs text-[#73735C] mt-1">
            Sketch your bar models, triangles, or algebra arrays and share them with the Sage for visual feedback.
          </p>
        </div>

        <button
          onClick={handleSendToSage}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40] hover:bg-[#474732] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" /> Send Sketch to Sage
        </button>
      </div>

      {/* Toolbar */}
      <div className="px-4 py-2.5 bg-[#F9F9F7] border-b border-[#D6D6C2] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setTool('pen')}
            className={`p-1.5 rounded-full cursor-pointer transition-colors ${tool === 'pen' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'}`}
            title="Pen"
          >
            <Pen className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setTool('rect')}
            className={`p-1.5 rounded-full cursor-pointer transition-colors ${tool === 'rect' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'}`}
            title="Rectangle / Bar"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setTool('line')}
            className={`px-2 py-1 rounded-full cursor-pointer transition-colors text-[11px] font-mono ${tool === 'line' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'}`}
            title="Straight Line"
          >
            Line
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`p-1.5 rounded-full cursor-pointer transition-colors ${tool === 'eraser' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'}`}
            title="Eraser"
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-[#D6D6C2] mx-1" />

          {/* Color palette */}
          {['#5A5A40', '#3D5A80', '#BC6C25', '#A3B18A', '#434338'].map(c => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                if (tool === 'eraser') setTool('pen');
              }}
              style={{ backgroundColor: c }}
              className={`w-5 h-5 rounded-full border border-white shadow-xs cursor-pointer transition-transform ${color === c && tool !== 'eraser' ? 'scale-125 ring-2 ring-[#5A5A40]' : ''}`}
            />
          ))}

          <div className="h-4 w-px bg-[#D6D6C2] mx-1" />

          {/* Grid Background Switcher */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[#8A8A75] uppercase font-bold">Grid:</span>
            <button
              onClick={() => changeGrid('dots')}
              className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${gridStyle === 'dots' ? 'bg-[#5A5A40] text-white' : 'bg-white text-[#5A5A40] border border-[#D6D6C2]'}`}
            >
              Dots
            </button>
            <button
              onClick={() => changeGrid('cartesian')}
              className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${gridStyle === 'cartesian' ? 'bg-[#5A5A40] text-white' : 'bg-white text-[#5A5A40] border border-[#D6D6C2]'}`}
            >
              Axes
            </button>
            <button
              onClick={() => changeGrid('none')}
              className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${gridStyle === 'none' ? 'bg-[#5A5A40] text-white' : 'bg-white text-[#5A5A40] border border-[#D6D6C2]'}`}
            >
              Plain
            </button>
          </div>
        </div>

        {/* Stamps & Clear */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#8A8A75] uppercase font-bold">Stamp:</span>
          <button
            onClick={() => stampTemplate('bar_model')}
            className="px-2 py-0.5 bg-[#E9EDC9] hover:bg-[#CCD5AE] text-[#5A5A40] border border-[#CCD5AE] rounded-full text-[10px] font-semibold cursor-pointer"
            title="Stamp comparison bar template"
          >
            Bar Model
          </button>
          <button
            onClick={() => stampTemplate('triangle')}
            className="px-2 py-0.5 bg-[#FAEDCD] hover:bg-[#D4A373]/40 text-[#8A622A] border border-[#D4A373] rounded-full text-[10px] font-semibold cursor-pointer"
            title="Stamp right triangle template"
          >
            Right △
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 px-2.5 py-1 text-[#73735C] hover:text-[#BC6C25] border border-[#D6D6C2] bg-white rounded-full transition-colors cursor-pointer ml-1"
          >
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="p-4 flex-1 flex flex-col items-center justify-center bg-[#F5F5F0] overflow-hidden">
        <div className="bg-white rounded-2xl shadow-xs border border-[#D6D6C2] overflow-hidden w-full max-w-2xl flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={640}
            height={360}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            className="cursor-crosshair block touch-none w-full h-auto"
          />
        </div>

        {/* Note input */}
        <div className="w-full max-w-2xl mt-3 flex items-center gap-2">
          <input
            type="text"
            value={promptNote}
            onChange={e => setPromptNote(e.target.value)}
            placeholder="Add an optional question or note about your sketch..."
            className="flex-1 text-xs border border-[#D6D6C2] rounded-xl px-3 py-2 bg-white text-[#434338] focus:outline-none focus:ring-2 focus:ring-[#A3B18A]"
          />
        </div>
      </div>
    </div>
  );
};
