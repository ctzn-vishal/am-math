import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  Circle,
  Sparkles,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  X,
  Layers,
  BookOpen,
  Filter,
  Search,
  ExternalLink,
  Flame,
  Trophy
} from 'lucide-react';
import { SINGAPORE_MATH_CHAPTERS } from '../data/curriculumData';
import { ChapterItem, MasteryMap } from '../types';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'singapore_math_sage_mastery_v1';

const DEFAULT_MASTERY_STATE: MasteryMap = {
  1: { concrete: true, pictorial: true, abstract: true }, // Chapter 1: Fully mastered
  2: { concrete: true, pictorial: true, abstract: true }, // Chapter 2: Fully mastered
  3: { concrete: true, pictorial: true, abstract: false }, // Chapter 3: In progress
  4: { concrete: true, pictorial: true, abstract: true }, // Chapter 4: Fully mastered
  5: { concrete: true, pictorial: false, abstract: false }, // Chapter 5: In progress
  6: { concrete: false, pictorial: false, abstract: false },
  7: { concrete: true, pictorial: true, abstract: false },
  8: { concrete: false, pictorial: false, abstract: false },
  9: { concrete: true, pictorial: true, abstract: true }, // Chapter 9: Fully mastered
  10: { concrete: true, pictorial: true, abstract: false },
  11: { concrete: false, pictorial: false, abstract: false },
  12: { concrete: true, pictorial: false, abstract: false },
  13: { concrete: true, pictorial: true, abstract: false },
  14: { concrete: false, pictorial: false, abstract: false },
};

interface MasteryTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapterForPractice?: (chapter: ChapterItem) => void;
  onOpenRecommendedTool?: (toolName: string) => void;
}

export const MasteryTracker: React.FC<MasteryTrackerProps> = ({
  isOpen,
  onClose,
  onSelectChapterForPractice,
  onOpenRecommendedTool,
}) => {
  const [mastery, setMastery] = useState<MasteryMap>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load mastery data from localStorage:', e);
    }
    return DEFAULT_MASTERY_STATE;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'mastered' | 'in_progress' | 'unstarted'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedChapterId, setExpandedChapterId] = useState<number | null>(null);

  // Save to localStorage whenever mastery state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mastery));
    } catch (e) {
      console.warn('Failed to save mastery data to localStorage:', e);
    }
  }, [mastery]);

  if (!isOpen) return null;

  // Toggle single CPA stage
  const toggleStage = (chapterId: number, stage: 'concrete' | 'pictorial' | 'abstract', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMastery(prev => {
      const current = prev[chapterId] || { concrete: false, pictorial: false, abstract: false };
      const nextStageVal = !current[stage];
      const updatedChapter = { ...current, [stage]: nextStageVal };

      // If completing all 3 stages, trigger celebratory confetti!
      if (
        updatedChapter.concrete &&
        updatedChapter.pictorial &&
        updatedChapter.abstract &&
        !(current.concrete && current.pictorial && current.abstract)
      ) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#5A5A40', '#A3B18A', '#D4A373', '#CCD5AE'],
        });
      }

      return {
        ...prev,
        [chapterId]: updatedChapter,
      };
    });
  };

  // Toggle all 3 stages for a chapter
  const toggleEntireChapter = (chapterId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMastery(prev => {
      const current = prev[chapterId] || { concrete: false, pictorial: false, abstract: false };
      const allDone = current.concrete && current.pictorial && current.abstract;
      const nextVal = !allDone;

      if (nextVal) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#5A5A40', '#A3B18A', '#D4A373', '#CCD5AE'],
        });
      }

      return {
        ...prev,
        [chapterId]: {
          concrete: nextVal,
          pictorial: nextVal,
          abstract: nextVal,
        },
      };
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all chapter progress to default demonstration state?')) {
      setMastery(DEFAULT_MASTERY_STATE);
    }
  };

  const handleMarkAllMastered = () => {
    const allMastered: MasteryMap = {};
    SINGAPORE_MATH_CHAPTERS.forEach(c => {
      allMastered[c.id] = { concrete: true, pictorial: true, abstract: true };
    });
    setMastery(allMastered);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#5A5A40', '#A3B18A', '#D4A373', '#CCD5AE', '#FAEDCD'],
    });
  };

  // Statistical calculations
  const totalChapters = SINGAPORE_MATH_CHAPTERS.length;
  let masteredCount = 0;
  let inProgressCount = 0;
  let concreteCount = 0;
  let pictorialCount = 0;
  let abstractCount = 0;

  SINGAPORE_MATH_CHAPTERS.forEach(c => {
    const st = mastery[c.id] || { concrete: false, pictorial: false, abstract: false };
    if (st.concrete) concreteCount++;
    if (st.pictorial) pictorialCount++;
    if (st.abstract) abstractCount++;

    const count = (st.concrete ? 1 : 0) + (st.pictorial ? 1 : 0) + (st.abstract ? 1 : 0);
    if (count === 3) {
      masteredCount++;
    } else if (count > 0) {
      inProgressCount++;
    }
  });

  const totalCPASteps = totalChapters * 3;
  const completedCPASteps = concreteCount + pictorialCount + abstractCount;
  const overallPercentage = Math.round((completedCPASteps / totalCPASteps) * 100);

  const categories = ['All', 'Algebra', 'Geometry', 'Statistics', 'Mensuration', 'Graphs'];

  // Filtered chapters
  const filteredChapters = SINGAPORE_MATH_CHAPTERS.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.objectives.some(o => o.toLowerCase().includes(searchQuery.toLowerCase()));

    const st = mastery[c.id] || { concrete: false, pictorial: false, abstract: false };
    const stepCount = (st.concrete ? 1 : 0) + (st.pictorial ? 1 : 0) + (st.abstract ? 1 : 0);

    let matchesStatus = true;
    if (statusFilter === 'mastered') matchesStatus = stepCount === 3;
    if (statusFilter === 'in_progress') matchesStatus = stepCount > 0 && stepCount < 3;
    if (statusFilter === 'unstarted') matchesStatus = stepCount === 0;

    return matchesCategory && matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-[2px] transition-opacity">
      {/* Slide-in Overlay Panel */}
      <div
        id="mastery-tracker-overlay"
        className="w-full max-w-xl sm:max-w-2xl bg-[#F5F5F0] h-full shadow-2xl flex flex-col border-l border-[#D6D6C2] animate-in slide-in-from-right duration-300 overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#EBEBE0] border-b border-[#D6D6C2] shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5A5A40] text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5 text-[#FAEDCD]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif italic font-bold text-[#5A5A40]">
                  CPA Curriculum Mastery Tracker
                </h3>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-[#CCD5AE]/60 text-[#5A5A40] px-2 py-0.5 rounded-full border border-[#B5C99A]">
                  Sec 2 (14 Ch)
                </span>
              </div>
              <p className="text-xs text-[#73735C] mt-0.5">
                Track your Concrete, Pictorial & Abstract progression across all topics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#D6D6C2] text-[#5A5A40] transition-colors cursor-pointer"
            title="Close Mastery Tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Progress Dashboard Banner */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#D6D6C2] shrink-0 space-y-4 shadow-xs">
          {/* Top Metric Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif font-bold text-[#5A5A40]">
                  {overallPercentage}%
                </span>
                <span className="text-xs font-semibold text-[#73735C]">
                  Curriculum Mastery ({masteredCount}/{totalChapters} Chapters Completed)
                </span>
              </div>
              <p className="text-[11px] text-[#8A8A75]">
                {completedCPASteps} of {totalCPASteps} total CPA sequence milestones achieved
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkAllMastered}
                className="px-3 py-1.5 rounded-full bg-[#E9EDC9] hover:bg-[#CCD5AE] text-[#5A5A40] text-xs font-semibold border border-[#CCD5AE] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="Mark all 14 chapters as mastered"
              >
                <Trophy className="w-3.5 h-3.5 text-[#D4A373]" /> Complete All
              </button>
              <button
                onClick={handleResetProgress}
                className="p-1.5 rounded-full bg-[#F5F5F0] hover:bg-[#EBEBE0] text-[#73735C] border border-[#D6D6C2] transition-colors cursor-pointer"
                title="Reset to default demo data"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#EBEBE0] h-2.5 rounded-full overflow-hidden flex border border-[#D6D6C2]/60">
            <div
              className="bg-[#5A5A40] h-full transition-all duration-500 rounded-full"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>

          {/* 3 CPA Pillar Milestone Badges */}
          <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs">
            {/* Concrete */}
            <div className="p-2.5 rounded-2xl bg-[#FAEDCD]/40 border border-[#D4A373]/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D4A373] text-white flex items-center justify-center font-bold text-xs">
                  C
                </span>
                <div>
                  <div className="font-bold text-[#8A622A] text-[11px] leading-tight">Concrete</div>
                  <div className="text-[10px] text-[#8A8A75]">Manipulatives</div>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-[#5A5A40]">
                {concreteCount}/{totalChapters}
              </span>
            </div>

            {/* Pictorial */}
            <div className="p-2.5 rounded-2xl bg-[#E9EDC9]/50 border border-[#CCD5AE] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#A3B18A] text-white flex items-center justify-center font-bold text-xs">
                  P
                </span>
                <div>
                  <div className="font-bold text-[#5A5A40] text-[11px] leading-tight">Pictorial</div>
                  <div className="text-[10px] text-[#8A8A75]">Models & Nets</div>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-[#5A5A40]">
                {pictorialCount}/{totalChapters}
              </span>
            </div>

            {/* Abstract */}
            <div className="p-2.5 rounded-2xl bg-white border border-[#D6D6C2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#5A5A40] text-white flex items-center justify-center font-bold text-xs">
                  A
                </span>
                <div>
                  <div className="font-bold text-[#5A5A40] text-[11px] leading-tight">Abstract</div>
                  <div className="text-[10px] text-[#8A8A75]">Symbolic Proof</div>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-[#5A5A40]">
                {abstractCount}/{totalChapters}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-3 bg-[#F9F9F7] border-b border-[#D6D6C2] shrink-0 space-y-2 text-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
                  selectedCategory === cat
                    ? 'bg-[#5A5A40] text-white shadow-2xs'
                    : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Status Filters */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8A75] mr-1">Status:</span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-[#5A5A40] text-white'
                    : 'bg-white text-[#73735C] border border-[#D6D6C2]'
                }`}
              >
                All ({filteredChapters.length})
              </button>
              <button
                onClick={() => setStatusFilter('mastered')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                  statusFilter === 'mastered'
                    ? 'bg-[#5A5A40] text-white'
                    : 'bg-white text-[#73735C] border border-[#D6D6C2]'
                }`}
              >
                Mastered ({masteredCount})
              </button>
              <button
                onClick={() => setStatusFilter('in_progress')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                  statusFilter === 'in_progress'
                    ? 'bg-[#5A5A40] text-white'
                    : 'bg-white text-[#73735C] border border-[#D6D6C2]'
                }`}
              >
                In Progress ({inProgressCount})
              </button>
            </div>

            {/* Search Box */}
            <div className="relative flex-1 sm:max-w-48">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A8A75]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search chapter..."
                className="w-full pl-8 pr-2.5 py-1 text-xs bg-white border border-[#D6D6C2] rounded-full text-[#434338] placeholder-[#8A8A75] focus:outline-none focus:ring-1 focus:ring-[#5A5A40]"
              />
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-[#F5F5F0]">
          {filteredChapters.map(chapter => {
            const st = mastery[chapter.id] || { concrete: false, pictorial: false, abstract: false };
            const completedCount = (st.concrete ? 1 : 0) + (st.pictorial ? 1 : 0) + (st.abstract ? 1 : 0);
            const isFullMastery = completedCount === 3;
            const isExpanded = expandedChapterId === chapter.id;

            return (
              <div
                key={chapter.id}
                className={`bg-white rounded-2xl border transition-all shadow-xs overflow-hidden ${
                  isFullMastery
                    ? 'border-[#B5C99A] ring-1 ring-[#B5C99A]/40'
                    : completedCount > 0
                    ? 'border-[#D6D6C2]'
                    : 'border-[#E6E6DA] opacity-90'
                }`}
              >
                {/* Main Card Row */}
                <div
                  onClick={() => setExpandedChapterId(isExpanded ? null : chapter.id)}
                  className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#F9F9F7] select-none"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    {/* Chapter Number Badge with Check or Number */}
                    <button
                      onClick={e => toggleEntireChapter(chapter.id, e)}
                      className={`w-8 h-8 rounded-full font-mono text-xs font-bold shrink-0 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-2xs ${
                        isFullMastery
                          ? 'bg-[#5A5A40] text-white ring-2 ring-[#CCD5AE]'
                          : completedCount > 0
                          ? 'bg-[#FAEDCD] text-[#8A622A] border border-[#D4A373]'
                          : 'bg-[#EBEBE0] text-[#73735C] border border-[#D6D6C2]'
                      }`}
                      title="Click to toggle entire chapter mastery"
                    >
                      {isFullMastery ? <CheckCircle2 className="w-4 h-4 text-[#E9EDC9]" /> : chapter.number}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-serif font-bold text-[#434338] leading-tight">
                          {chapter.title}
                        </h4>
                        <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-[#EBEBE0] text-[#5A5A40] border border-[#D6D6C2]">
                          {chapter.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#73735C] line-clamp-1 mt-0.5">
                        {chapter.objectives[0]}
                      </p>
                    </div>
                  </div>

                  {/* CPA Sequence Toggle Indicators */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E6E6DA]">
                    <div className="flex items-center gap-1.5">
                      {/* Concrete Pill */}
                      <button
                        onClick={e => toggleStage(chapter.id, 'concrete', e)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-mono transition-all cursor-pointer shadow-2xs ${
                          st.concrete
                            ? 'bg-[#D4A373] text-white ring-1 ring-[#BC6C25]'
                            : 'bg-[#F5F5F0] text-[#8A8A75] hover:bg-[#EBEBE0] border border-[#D6D6C2]'
                        }`}
                        title="Concrete Stage: Physical manipulatives & balance models (Click to toggle)"
                      >
                        <span>C</span>
                        {st.concrete && <CheckCircle2 className="w-3 h-3" />}
                      </button>

                      {/* Pictorial Pill */}
                      <button
                        onClick={e => toggleStage(chapter.id, 'pictorial', e)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-mono transition-all cursor-pointer shadow-2xs ${
                          st.pictorial
                            ? 'bg-[#A3B18A] text-white ring-1 ring-[#5A5A40]'
                            : 'bg-[#F5F5F0] text-[#8A8A75] hover:bg-[#EBEBE0] border border-[#D6D6C2]'
                        }`}
                        title="Pictorial Stage: Bar models, geometric nets & charts (Click to toggle)"
                      >
                        <span>P</span>
                        {st.pictorial && <CheckCircle2 className="w-3 h-3" />}
                      </button>

                      {/* Abstract Pill */}
                      <button
                        onClick={e => toggleStage(chapter.id, 'abstract', e)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-mono transition-all cursor-pointer shadow-2xs ${
                          st.abstract
                            ? 'bg-[#5A5A40] text-white ring-1 ring-[#434338]'
                            : 'bg-[#F5F5F0] text-[#8A8A75] hover:bg-[#EBEBE0] border border-[#D6D6C2]'
                        }`}
                        title="Abstract Stage: Symbolic proofs & algebraic formulas (Click to toggle)"
                      >
                        <span>A</span>
                        {st.abstract && <CheckCircle2 className="w-3 h-3" />}
                      </button>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-[#8A8A75] transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Details / Objectives & Practice Actions */}
                {isExpanded && (
                  <div className="p-4 border-t border-[#E6E6DA] bg-[#F9F9F7] space-y-3 text-xs">
                    {/* Objectives list */}
                    <div className="space-y-1.5">
                      <span className="font-bold text-[#5A5A40] uppercase tracking-wider text-[10px] block">
                        Core Learning Goals:
                      </span>
                      <ul className="space-y-1 text-[#434338] pl-3 list-disc">
                        {chapter.objectives.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>

                    {/* CPA Guidance mini notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <div className="p-2 rounded-xl bg-[#FAEDCD]/40 border border-[#D4A373]/40">
                        <span className="font-bold text-[#8A622A] block text-[10px]">Concrete</span>
                        <p className="text-[11px] text-[#434338] mt-0.5 line-clamp-3">{chapter.concreteNotes}</p>
                      </div>
                      <div className="p-2 rounded-xl bg-[#E9EDC9]/50 border border-[#CCD5AE]">
                        <span className="font-bold text-[#5A5A40] block text-[10px]">Pictorial</span>
                        <p className="text-[11px] text-[#434338] mt-0.5 line-clamp-3">{chapter.pictorialNotes}</p>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-[#D6D6C2]">
                        <span className="font-bold text-[#5A5A40] block text-[10px]">Abstract</span>
                        <p className="text-[11px] text-[#434338] mt-0.5 line-clamp-3">{chapter.abstractNotes}</p>
                      </div>
                    </div>

                    {/* Practice with Sage button */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E6E6DA]">
                      <span className="text-[11px] text-[#73735C]">
                        Status: <strong className="text-[#5A5A40]">{completedCount}/3 CPA Steps</strong>
                      </span>

                      <div className="flex items-center gap-2">
                        {chapter.recommendedTool && onOpenRecommendedTool && (
                          <button
                            onClick={() => {
                              onOpenRecommendedTool(chapter.recommendedTool!);
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#EBEBE0] text-[#5A5A40] font-semibold text-xs border border-[#D6D6C2] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" /> Launch Studio
                          </button>
                        )}

                        {onSelectChapterForPractice && (
                          <button
                            onClick={() => {
                              onSelectChapterForPractice(chapter);
                              onClose();
                            }}
                            className="px-3.5 py-1.5 rounded-full bg-[#5A5A40] hover:bg-[#474732] text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#FAEDCD]" /> Practice with Sage
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredChapters.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#D6D6C2] space-y-2">
              <p className="text-sm font-semibold text-[#5A5A40]">No chapters match your search or filter</p>
              <p className="text-xs text-[#8A8A75]">Try resetting your filter or search query.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#EBEBE0] border-t border-[#D6D6C2] shrink-0 flex items-center justify-between text-xs text-[#73735C]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#A3B18A]" />
            Changes saved locally to your device
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1 rounded-full bg-[#5A5A40] hover:bg-[#474732] text-white font-semibold cursor-pointer transition-colors shadow-2xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
