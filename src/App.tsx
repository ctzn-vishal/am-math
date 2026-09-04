import React, { useState } from 'react';
import {
  MessageSquare,
  BookOpen,
  LayoutGrid,
  Layers,
  ArrowDownUp,
  Compass,
  Triangle,
  TrendingUp,
  Circle,
  BarChart2,
  PenTool,
  Maximize2,
  Minimize2,
  Sparkles,
  Award
} from 'lucide-react';
import { ChatMessage, CPAMode, ChapterItem, SampleProblem } from './types';
import { ChatInterface } from './components/ChatInterface';
import { BarModelStudio } from './components/BarModelStudio';
import { AlgebraTilesStudio } from './components/AlgebraTilesStudio';
import { CrossMethodStudio } from './components/CrossMethodStudio';
import { ParallelAnglesStudio } from './components/ParallelAnglesStudio';
import { PythagorasStudio } from './components/PythagorasStudio';
import { MotionGraphsStudio } from './components/MotionGraphsStudio';
import { MensurationStudio } from './components/MensurationStudio';
import { DataBoxPlotStudio } from './components/DataBoxPlotStudio';
import { InteractiveWhiteboard } from './components/InteractiveWhiteboard';
import { SyllabusExplorer } from './components/SyllabusExplorer';
import { MasteryTracker } from './components/MasteryTracker';
import { INITIAL_GREETING_MESSAGE } from './data/curriculumData';

type ActiveStudio =
  | 'chat'
  | 'bar_model'
  | 'algebra_tiles'
  | 'cross_method'
  | 'parallel_angles'
  | 'pythagoras'
  | 'motion_graphs'
  | 'mensuration'
  | 'data_boxplot'
  | 'whiteboard'
  | 'syllabus';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING_MESSAGE]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeStudio, setActiveStudio] = useState<ActiveStudio>('chat');
  const [isSplitView, setIsSplitView] = useState<boolean>(true);
  const [isGlobalMasteryOpen, setIsGlobalMasteryOpen] = useState<boolean>(false);

  // Send message to the backend Gemini Socratic engine
  const handleSendMessage = async (text: string, image?: string, mode?: CPAMode) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      imageUrl: image,
      mode,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Map history for server
      const chatHistory = newMessages.map(m => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          image,
          mode,
          history: chatHistory.slice(-10), // send last 10 messages for context
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const sageMsg: ChatMessage = {
        id: `sage-${Date.now()}`,
        sender: 'sage',
        text: data.reply || 'Let us reflect on the visual model step-by-step.',
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, sageMsg]);
    } catch (err: any) {
      console.error('Failed to contact Singapore Math Sage:', err);
      const fallbackMsg: ChatMessage = {
        id: `sage-err-${Date.now()}`,
        sender: 'sage',
        text: `**A gentle reflective thought:** Let's look at the foundational picture. What quantities do we know from the problem statement, and what unknown quantity are we seeking to uncover?`,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendStudioPrompt = (prompt: string) => {
    // Switch or ensure chat is visible, then send prompt
    handleSendMessage(prompt);
  };

  const handleSendSketch = (imageBase64: string, note: string) => {
    handleSendMessage(note, imageBase64, 'pictorial');
  };

  const handleSelectProblem = (problem: SampleProblem, chapter: ChapterItem) => {
    const prompt = `I would like to explore this problem from **Chapter ${chapter.number}: ${chapter.title}** (${problem.difficulty} level):\n\n**${problem.title}**\n${problem.statement}\n\nCan you guide me through the Concrete or Pictorial representation first?`;
    handleSendMessage(prompt, undefined, 'socratic_hint');
    setActiveStudio('chat');
  };

  const handleSelectChapterForPractice = (chapter: ChapterItem) => {
    const prompt = `I would like to explore **Chapter ${chapter.number}: ${chapter.title}** (${chapter.category}).\n\n**Core Objective:** ${chapter.objectives[0]}\n\nCan you guide me through the Concrete or Pictorial model first, followed by the Abstract algebraic formulation?`;
    handleSendMessage(prompt, undefined, 'socratic_hint');
    setActiveStudio('chat');
  };

  const handleOpenTool = (toolName: string) => {
    const tool = toolName.toLowerCase();
    if (tool.includes('bar')) setActiveStudio('bar_model');
    else if (tool.includes('tile') || tool.includes('algebra')) setActiveStudio('algebra_tiles');
    else if (tool.includes('cross')) setActiveStudio('cross_method');
    else if (tool.includes('parallel') || tool.includes('angle')) setActiveStudio('parallel_angles');
    else if (tool.includes('pythagoras') || tool.includes('triangle')) setActiveStudio('pythagoras');
    else if (tool.includes('motion') || tool.includes('graph')) setActiveStudio('motion_graphs');
    else if (tool.includes('mensuration') || tool.includes('cone') || tool.includes('solid')) setActiveStudio('mensuration');
    else if (tool.includes('boxplot') || tool.includes('box') || tool.includes('data') || tool.includes('mean')) setActiveStudio('data_boxplot');
    else if (tool.includes('whiteboard') || tool.includes('sketch')) setActiveStudio('whiteboard');
    else setActiveStudio('syllabus');
  };

  const handleClearChat = () => {
    setMessages([INITIAL_GREETING_MESSAGE]);
  };

  const renderActiveStudioComponent = () => {
    switch (activeStudio) {
      case 'bar_model':
        return <BarModelStudio onSendToSage={handleSendStudioPrompt} />;
      case 'algebra_tiles':
        return <AlgebraTilesStudio onSendToSage={handleSendStudioPrompt} />;
      case 'cross_method':
        return <CrossMethodStudio onSendToSage={handleSendStudioPrompt} />;
      case 'parallel_angles':
        return <ParallelAnglesStudio onSendToSage={handleSendStudioPrompt} />;
      case 'pythagoras':
        return <PythagorasStudio onSendToSage={handleSendStudioPrompt} />;
      case 'motion_graphs':
        return <MotionGraphsStudio onSendToSage={handleSendStudioPrompt} />;
      case 'mensuration':
        return <MensurationStudio onSendToSage={handleSendStudioPrompt} />;
      case 'data_boxplot':
        return <DataBoxPlotStudio onSendToSage={handleSendStudioPrompt} />;
      case 'whiteboard':
        return <InteractiveWhiteboard onSendSketchToSage={handleSendSketch} />;
      case 'syllabus':
        return <SyllabusExplorer onSelectProblem={handleSelectProblem} onOpenTool={handleOpenTool} />;
      case 'chat':
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#F5F5F0] text-[#434338] font-sans overflow-hidden">
      {/* Top Main Navigation Bar */}
      <header className="bg-[#EBEBE0] text-[#434338] border-b border-[#D6D6C2] px-4 py-2.5 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#5A5A40] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            SMS
          </div>
          <div>
            <h1 className="text-base font-serif italic font-bold tracking-tight text-[#5A5A40] flex items-center gap-2">
              The Singapore Math Sage
              <span className="text-[10px] font-sans not-italic font-semibold uppercase tracking-wider bg-[#CCD5AE]/50 text-[#5A5A40] px-2 py-0.5 rounded-full border border-[#B5C99A]">
                Sec 2 CPA Mentor
              </span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#8A8A75] font-semibold hidden sm:block">
              Secondary 2 Mathematics • Concrete-Pictorial-Abstract
            </p>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2 text-xs">
          <div className="hidden sm:flex items-center space-x-2 mr-2">
            <div className="w-2 h-2 rounded-full bg-[#A3B18A] animate-pulse" />
            <span className="text-[11px] font-medium text-[#73735C]">Socratic Mentor Active</span>
          </div>

          <button
            id="global-mastery-tracker-btn"
            onClick={() => setIsGlobalMasteryOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E9EDC9] hover:bg-[#CCD5AE] text-[#5A5A40] border border-[#CCD5AE] font-semibold text-xs transition-all cursor-pointer shadow-2xs hover:scale-102"
            title="Open 14-Chapter CPA Mastery Tracker"
          >
            <Award className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Mastery Tracker</span>
          </button>

          <button
            onClick={() => setIsSplitView(!isSplitView)}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors cursor-pointer text-xs font-semibold ${
              isSplitView
                ? 'bg-[#5A5A40] border-[#5A5A40] text-white shadow-xs'
                : 'bg-white border-[#D6D6C2] text-[#5A5A40] hover:bg-[#E1E1D1]'
            }`}
          >
            {isSplitView ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isSplitView ? 'Side-by-Side' : 'Single Pane'}</span>
          </button>
        </div>
      </header>

      {/* Visual Studios Sub-Navigation Bar */}
      <nav className="bg-[#F9F9F7] border-b border-[#D6D6C2] px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto shrink-0 text-xs select-none">
        <button
          onClick={() => setActiveStudio('chat')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeStudio === 'chat'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#EBEBE0]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Sage Socratic Chat</span>
        </button>

        <div className="h-4 w-px bg-[#D6D6C2] mx-1" />

        <button
          onClick={() => setActiveStudio('bar_model')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeStudio === 'bar_model'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#EBEBE0]'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Bar Model Studio</span>
        </button>

        <button
          onClick={() => setActiveStudio('algebra_tiles')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeStudio === 'algebra_tiles'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#EBEBE0]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Algebra Tiles & Square</span>
        </button>

        <button
          onClick={() => setActiveStudio('cross_method')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeStudio === 'cross_method'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#EBEBE0]'
          }`}
        >
          <ArrowDownUp className="w-3.5 h-3.5" />
          <span>Cross Method (X-Frame)</span>
        </button>

        <button
          onClick={() => setActiveStudio('parallel_angles')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeStudio === 'parallel_angles'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#EBEBE0]'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Parallel Angles (F, Z, C)</span>
        </button>

        <button
          onClick={() => setActiveStudio('pythagoras')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeStudio === 'pythagoras'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#EBEBE0]'
          }`}
        >
          <Triangle className="w-3.5 h-3.5" />
          <span>Pythagoras & 3D</span>
        </button>

        <button
          onClick={() => setActiveStudio('motion_graphs')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeStudio === 'motion_graphs'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#EBEBE0]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Motion Graphs</span>
        </button>

        <button
          onClick={() => setActiveStudio('mensuration')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeStudio === 'mensuration'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#EBEBE0]'
          }`}
        >
          <Circle className="w-3.5 h-3.5" />
          <span>Cones & Silos</span>
        </button>

        <button
          onClick={() => setActiveStudio('data_boxplot')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeStudio === 'data_boxplot'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#EBEBE0]'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>Data & Box Plots</span>
        </button>

        <button
          onClick={() => setActiveStudio('whiteboard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeStudio === 'whiteboard'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#EBEBE0]'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Sketchpad</span>
        </button>

        <div className="h-4 w-px bg-[#D6D6C2] mx-1" />

        <button
          onClick={() => setActiveStudio('syllabus')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeStudio === 'syllabus'
              ? 'bg-[#434338] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#EBEBE0]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>14-Chapter Syllabus</span>
        </button>
      </nav>

      {/* Main Responsive Body Layout */}
      <main className="flex-1 p-3 sm:p-4 overflow-hidden">
        {activeStudio === 'chat' || !isSplitView ? (
          <div className="h-full w-full max-w-6xl mx-auto">
            {activeStudio === 'chat' ? (
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                onClearChat={handleClearChat}
                onOpenSyllabus={() => setActiveStudio('syllabus')}
                onOpenWhiteboard={() => setActiveStudio('whiteboard')}
                onSelectChapterForPractice={handleSelectChapterForPractice}
                onOpenRecommendedTool={handleOpenTool}
              />
            ) : (
              renderActiveStudioComponent()
            )}
          </div>
        ) : (
          /* Side-by-side Dual View on Desktop */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
            {/* Left/Main interactive studio tool */}
            <div className="lg:col-span-7 h-full overflow-hidden">
              {renderActiveStudioComponent()}
            </div>

            {/* Right persistent Sage Socratic Chat */}
            <div className="lg:col-span-5 h-full overflow-hidden">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                onClearChat={handleClearChat}
                onOpenSyllabus={() => setActiveStudio('syllabus')}
                onOpenWhiteboard={() => setActiveStudio('whiteboard')}
                onSelectChapterForPractice={handleSelectChapterForPractice}
                onOpenRecommendedTool={handleOpenTool}
              />
            </div>
          </div>
        )}
      </main>

      {/* Global Mastery Tracker Overlay */}
      <MasteryTracker
        isOpen={isGlobalMasteryOpen}
        onClose={() => setIsGlobalMasteryOpen(false)}
        onSelectChapterForPractice={handleSelectChapterForPractice}
        onOpenRecommendedTool={handleOpenTool}
      />
    </div>
  );
}
