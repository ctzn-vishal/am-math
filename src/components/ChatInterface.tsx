import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Image as ImageIcon,
  Sparkles,
  HelpCircle,
  Layers,
  Lightbulb,
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  UploadCloud,
  ChevronRight,
  BookOpen,
  Award,
  Copy,
  Check
} from 'lucide-react';
import { ChatMessage, CPAMode, ChapterItem } from '../types';
import { MathRenderer } from './MathRenderer';
import { MasteryTracker } from './MasteryTracker';
import confetti from 'canvas-confetti';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, image?: string, mode?: CPAMode) => void;
  isLoading: boolean;
  onClearChat: () => void;
  onOpenSyllabus: () => void;
  onOpenWhiteboard: () => void;
  onSelectChapterForPractice?: (chapter: ChapterItem) => void;
  onOpenRecommendedTool?: (toolName: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
  onClearChat,
  onOpenSyllabus,
  onOpenWhiteboard,
  onSelectChapterForPractice,
  onOpenRecommendedTool
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [isMasteryOpen, setIsMasteryOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Read aloud Sage responses if speech is enabled
  useEffect(() => {
    if (isSpeechEnabled && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === 'sage' && !lastMsg.isThinking && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        // Clean markdown for audio
        const cleanText = lastMsg.text
          .replace(/[$#*_`]/g, '')
          .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 over $2')
          .replace(/\\cdot/g, ' times ');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [messages, isSpeechEnabled]);

  const handleSend = (mode?: CPAMode) => {
    if (!inputText.trim() && !selectedImage) return;
    onSendMessage(inputText.trim(), selectedImage || undefined, mode);
    setInputText('');
    setSelectedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopyTranscript = () => {
    const textTranscript = messages
      .map(m => `[${m.sender === 'user' ? 'Student' : 'Singapore Math Sage'} - ${new Date(m.timestamp).toLocaleTimeString()}]:\n${m.text}\n`)
      .join('\n---\n\n');
    navigator.clipboard.writeText(textTranscript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerSocraticAction = (promptText: string, mode: CPAMode) => {
    onSendMessage(promptText, undefined, mode);
  };

  const quickFollowUps = [
    "What is the next step?",
    "Could you show me a visual model of this?",
    "How does this connect to real-world objects?",
    "Let me try solving it step-by-step!"
  ];

  return (
    <div id="sage-chat-container" className="bg-white rounded-2xl sm:rounded-3xl border border-[#D6D6C2] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Sage Header Banner */}
      <div className="p-4 sm:p-5 border-b border-[#D6D6C2] bg-[#EBEBE0] text-[#434338] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#5A5A40] text-white flex items-center justify-center font-serif italic font-bold text-sm shadow-xs">
            SMS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-serif italic font-bold text-[#5A5A40] tracking-wide">The Singapore Math Sage</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-[#CCD5AE]/60 text-[#5A5A40] border border-[#B5C99A]">
                Socratic CPA
              </span>
            </div>
            <p className="text-xs text-[#73735C] mt-0.5">
              Concrete • Pictorial • Abstract — Guided visual intuition & productive struggle
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mastery Tracker Toggle Button */}
          <button
            id="mastery-tracker-toggle-btn"
            onClick={() => setIsMasteryOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E9EDC9] hover:bg-[#CCD5AE] text-[#5A5A40] border border-[#CCD5AE] font-semibold text-xs transition-all cursor-pointer shadow-2xs hover:scale-102"
            title="Open CPA Curriculum Mastery Tracker"
          >
            <Award className="w-3.5 h-3.5 text-[#D4A373]" />
            <span className="hidden sm:inline">Mastery Tracker</span>
            <span className="sm:hidden font-bold">Progress</span>
          </button>

          {/* Copy Transcript */}
          <button
            onClick={handleCopyTranscript}
            className="p-2 rounded-full bg-white hover:bg-[#D6D6C2] text-[#5A5A40] border border-[#D6D6C2] text-xs transition-colors cursor-pointer"
            title={copied ? "Transcript Copied!" : "Copy Full Chat Notes"}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Read Aloud Toggle */}
          <button
            onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
            className={`p-2 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              isSpeechEnabled
                ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-xs'
                : 'bg-white text-[#5A5A40] border-[#D6D6C2] hover:bg-[#D6D6C2]'
            }`}
            title={isSpeechEnabled ? 'Mute Sage voice' : 'Enable Sage voice'}
          >
            {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset chat */}
          <button
            onClick={onClearChat}
            className="p-2 rounded-full bg-white hover:bg-[#D6D6C2] text-[#5A5A40] border border-[#D6D6C2] text-xs transition-colors cursor-pointer"
            title="Start New Session"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#F5F5F0]">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1 text-[11px] font-semibold text-[#8A8A75] px-1">
              <span>{msg.sender === 'user' ? 'You (Student)' : 'The Singapore Math Sage'}</span>
              <span>•</span>
              <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            <div
              className={`max-w-2xl rounded-2xl p-4 sm:p-5 shadow-xs transition-all ${
                msg.sender === 'user'
                  ? 'bg-[#5A5A40] text-white rounded-tr-none'
                  : 'bg-white text-[#434338] border border-[#E6E6DA] rounded-tl-none'
              }`}
            >
              {/* If message has an uploaded photo/sketch */}
              {msg.imageUrl && (
                <div className="mb-3 rounded-xl overflow-hidden border border-[#D6D6C2] shadow-xs max-w-sm bg-white">
                  <img
                    src={msg.imageUrl}
                    alt="Student work / sketch"
                    className="w-full object-contain max-h-60 bg-[#F9F9F7]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-1.5 bg-[#EBEBE0] text-[10px] text-[#5A5A40] font-mono text-center font-medium border-t border-[#D6D6C2]">
                    Student Handwritten Sketch / Photo Upload
                  </div>
                </div>
              )}

              {/* Message text with KaTeX markdown */}
              {msg.sender === 'user' ? (
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-100">
                  {msg.text}
                </div>
              ) : (
                <MathRenderer content={msg.text} />
              )}
            </div>

            {/* If this is the latest Sage message, show quick follow-up response prompts */}
            {msg.sender === 'sage' && index === messages.length - 1 && !isLoading && (
              <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-xl">
                {quickFollowUps.map((chip, chipIdx) => (
                  <button
                    key={chipIdx}
                    onClick={() => onSendMessage(chip)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-[#E9EDC9] text-[#5A5A40] border border-[#D6D6C2] hover:border-[#CCD5AE] font-medium transition-colors cursor-pointer shadow-2xs"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3 max-w-lg">
            <div className="w-8 h-8 rounded-full bg-[#5A5A40] text-white flex items-center justify-center font-bold text-xs shadow-xs animate-pulse">
              SMS
            </div>
            <div className="bg-white border border-[#E6E6DA] rounded-2xl rounded-tl-none p-4 shadow-xs flex items-center gap-2 text-xs text-[#73735C]">
              <span className="w-2 h-2 rounded-full bg-[#5A5A40] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#5A5A40] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#5A5A40] animate-bounce [animation-delay:0.4s]" />
              <span className="ml-2 font-medium">The Sage is formulating a Socratic leading question...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Socratic Scaffolding Quick Action Bar */}
      <div className="px-4 py-2.5 bg-[#EBEBE0] border-t border-[#D6D6C2] flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[#8A8A75] font-bold uppercase tracking-wider text-[10px] whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#D4A373]" /> Socratic Actions:
        </span>
        <button
          onClick={() => triggerSocraticAction("I'm feeling stuck. Could you give me a gentle Socratic micro-hint without giving away the answer?", 'socratic_hint')}
          className="px-3 py-1 rounded-full bg-white border border-[#D6D6C2] hover:bg-[#F5F5F0] text-[#5A5A40] font-medium whitespace-nowrap shadow-xs transition-colors cursor-pointer flex items-center gap-1"
        >
          <Lightbulb className="w-3 h-3 text-[#D4A373]" /> Micro-Hint
        </button>
        <button
          onClick={() => triggerSocraticAction("How can I build a Visual Bridge or Bar Model to represent this problem clearly?", 'visual_bridge')}
          className="px-3 py-1 rounded-full bg-white border border-[#D6D6C2] hover:bg-[#F5F5F0] text-[#5A5A40] font-medium whitespace-nowrap shadow-xs transition-colors cursor-pointer flex items-center gap-1"
        >
          <Layers className="w-3 h-3 text-[#A3B18A]" /> Visual Bridge
        </button>
        <button
          onClick={() => triggerSocraticAction("Can you explain this concept using a Concrete Manipulative metaphor (like algebra tiles or balance scales)?", 'concrete')}
          className="px-3 py-1 rounded-full bg-white border border-[#D6D6C2] hover:bg-[#F5F5F0] text-[#5A5A40] font-medium whitespace-nowrap shadow-xs transition-colors cursor-pointer flex items-center gap-1"
        >
          <HelpCircle className="w-3 h-3 text-[#5A5A40]" /> Concrete Metaphor
        </button>
        <button
          onClick={onOpenWhiteboard}
          className="px-3 py-1 rounded-full bg-[#E9EDC9] border border-[#CCD5AE] hover:bg-[#CCD5AE] text-[#5A5A40] font-semibold whitespace-nowrap shadow-xs transition-colors cursor-pointer flex items-center gap-1"
        >
          ✏️ Open Sketchpad
        </button>
        <button
          onClick={() => setIsMasteryOpen(true)}
          className="px-3 py-1 rounded-full bg-[#FAEDCD] border border-[#D4A373]/60 hover:bg-[#D4A373]/30 text-[#8A622A] font-semibold whitespace-nowrap shadow-xs transition-colors cursor-pointer flex items-center gap-1"
        >
          <Award className="w-3 h-3 text-[#D4A373]" /> CPA Sequence Progress
        </button>
      </div>

      {/* Selected Image Preview Pill */}
      {selectedImage && (
        <div className="px-4 py-2 bg-[#E9EDC9]/80 border-t border-[#CCD5AE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={selectedImage} alt="Selected" className="w-10 h-10 object-cover rounded-lg border border-[#CCD5AE]" />
            <span className="text-xs font-semibold text-[#5A5A40]">Photo / Sketch attached for Sage review</span>
          </div>
          <button
            onClick={() => setSelectedImage(null)}
            className="text-[#5A5A40] hover:text-rose-700 p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Chat Input Box */}
      <div className="p-4 bg-white border-t border-[#D6D6C2] flex items-end gap-2">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2.5 rounded-full border border-[#D6D6C2] hover:bg-[#EBEBE0] text-[#5A5A40] transition-colors cursor-pointer shrink-0"
          title="Upload photo of your math question or handwritten work"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <textarea
          id="student-math-input"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask the Sage, describe your math problem, or share your thinking..."
          rows={2}
          className="flex-1 resize-none border border-[#E6E6DA] bg-[#F9F9F7] rounded-2xl p-3 text-xs sm:text-sm text-[#434338] placeholder-[#8A8A75] focus:outline-none focus:border-[#5A5A40] focus:ring-1 focus:ring-[#5A5A40]"
        />

        <button
          id="send-chat-btn"
          disabled={isLoading || (!inputText.trim() && !selectedImage)}
          onClick={() => handleSend()}
          className="p-3 rounded-full bg-[#5A5A40] hover:bg-[#474732] disabled:opacity-50 text-white font-semibold transition-all cursor-pointer shadow-xs disabled:cursor-not-allowed shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Slide-over Mastery Tracker Overlay */}
      <MasteryTracker
        isOpen={isMasteryOpen}
        onClose={() => setIsMasteryOpen(false)}
        onSelectChapterForPractice={onSelectChapterForPractice}
        onOpenRecommendedTool={onOpenRecommendedTool}
      />
    </div>
  );
};
