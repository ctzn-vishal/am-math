import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Layers, ChevronRight, Search, PlayCircle, Wrench, CheckCircle2, Award } from 'lucide-react';
import { SINGAPORE_MATH_CHAPTERS } from '../data/curriculumData';
import { ChapterItem, SampleProblem, MasteryMap } from '../types';
import { MathRenderer } from './MathRenderer';

const STORAGE_KEY = 'singapore_math_sage_mastery_v1';

interface SyllabusExplorerProps {
  onSelectProblem: (problem: SampleProblem, chapter: ChapterItem) => void;
  onOpenTool: (toolName: string) => void;
}

export const SyllabusExplorer: React.FC<SyllabusExplorerProps> = ({ onSelectProblem, onOpenTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedChapterId, setExpandedChapterId] = useState<number | null>(1);
  const [mastery, setMastery] = useState<MasteryMap>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setMastery(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load mastery data in syllabus explorer:', e);
    }
  }, []);

  const categories = ['All', 'Algebra', 'Geometry', 'Graphs', 'Mensuration', 'Statistics'];

  const filteredChapters = SINGAPORE_MATH_CHAPTERS.filter(ch => {
    const matchesCat = selectedCategory === 'All' || ch.category === selectedCategory;
    const matchesSearch =
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.objectives.some(o => o.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div id="syllabus-explorer" className="bg-white rounded-2xl sm:rounded-3xl border border-[#D6D6C2] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-[#D6D6C2] bg-[#EBEBE0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#CCD5AE]/60 text-[#5A5A40] border border-[#B5C99A] font-semibold text-xs flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Singapore Secondary 2
            </span>
            <h3 className="text-base font-serif italic font-bold text-[#5A5A40]">Grade 8 Mathematics Syllabus & CPA Guides</h3>
          </div>
          <p className="text-xs text-[#73735C] mt-1">
            Complete 14-chapter curriculum mapping with Concrete manipulatives, Pictorial models, and Socratic challenge problems.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A75]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search syllabus topic..."
            className="pl-8 pr-3 py-1.5 text-xs bg-white border border-[#D6D6C2] rounded-full focus:outline-none focus:ring-2 focus:ring-[#A3B18A] text-[#434338] w-48 sm:w-56"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-4 py-2.5 bg-[#F9F9F7] border-b border-[#D6D6C2] flex items-center gap-1.5 overflow-x-auto text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap text-xs ${
              selectedCategory === cat
                ? 'bg-[#5A5A40] text-white shadow-xs'
                : 'bg-white text-[#5A5A40] border border-[#D6D6C2] hover:bg-[#EBEBE0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Chapter List */}
      <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-[#F5F5F0]">
        {filteredChapters.map(chapter => {
          const isExpanded = expandedChapterId === chapter.id;
          return (
            <div
              key={chapter.id}
              className="bg-white rounded-2xl border border-[#E6E6DA] shadow-xs overflow-hidden transition-all"
            >
              {/* Card Header Accordion */}
              <div
                onClick={() => setExpandedChapterId(isExpanded ? null : chapter.id)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#F9F9F7] transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#E9EDC9]/70 border border-[#CCD5AE] text-[#5A5A40] font-bold font-mono text-xs flex items-center justify-center">
                    {chapter.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-serif font-bold text-[#434338]">{chapter.title}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#EBEBE0] text-[#5A5A40] border border-[#D6D6C2]">
                        {chapter.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#73735C] line-clamp-1 mt-0.5">
                      {chapter.objectives[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Small Visual CPA Indicators */}
                  {(() => {
                    const st = mastery[chapter.id] || { concrete: false, pictorial: false, abstract: false };
                    return (
                      <div className="flex items-center gap-1 mr-1">
                        <span
                          className={`w-5 h-5 rounded-full text-[10px] font-bold font-mono flex items-center justify-center ${
                            st.concrete
                              ? 'bg-[#D4A373] text-white'
                              : 'bg-[#EBEBE0] text-[#8A8A75] border border-[#D6D6C2]'
                          }`}
                          title={st.concrete ? 'Concrete sequence completed' : 'Concrete sequence pending'}
                        >
                          C
                        </span>
                        <span
                          className={`w-5 h-5 rounded-full text-[10px] font-bold font-mono flex items-center justify-center ${
                            st.pictorial
                              ? 'bg-[#A3B18A] text-white'
                              : 'bg-[#EBEBE0] text-[#8A8A75] border border-[#D6D6C2]'
                          }`}
                          title={st.pictorial ? 'Pictorial sequence completed' : 'Pictorial sequence pending'}
                        >
                          P
                        </span>
                        <span
                          className={`w-5 h-5 rounded-full text-[10px] font-bold font-mono flex items-center justify-center ${
                            st.abstract
                              ? 'bg-[#5A5A40] text-white'
                              : 'bg-[#EBEBE0] text-[#8A8A75] border border-[#D6D6C2]'
                          }`}
                          title={st.abstract ? 'Abstract sequence completed' : 'Abstract sequence pending'}
                        >
                          A
                        </span>
                      </div>
                    );
                  })()}

                  {chapter.recommendedTool && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onOpenTool(chapter.recommendedTool!);
                      }}
                      className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-[#E9EDC9] text-[#5A5A40] hover:bg-[#CCD5AE] text-[11px] font-semibold border border-[#CCD5AE] transition-colors cursor-pointer"
                    >
                      Open Tool
                    </button>
                  )}
                  <ChevronRight
                    className={`w-4 h-4 text-[#8A8A75] transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  />
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="p-5 border-t border-[#E6E6DA] bg-[#F9F9F7] space-y-5 text-xs">
                  {/* CPA Breakdown Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-[#FAEDCD]/60 rounded-2xl border border-[#D4A373]/50 space-y-1.5">
                      <div className="font-bold text-[#8A622A] flex items-center gap-1.5 font-serif">
                        <span className="w-4 h-4 rounded-full bg-[#D4A373] text-white flex items-center justify-center font-bold text-[10px]">C</span>
                        Concrete Stage
                      </div>
                      <p className="text-[#434338] leading-relaxed">{chapter.concreteNotes}</p>
                    </div>

                    <div className="p-3.5 bg-[#E9EDC9]/60 rounded-2xl border border-[#CCD5AE] space-y-1.5">
                      <div className="font-bold text-[#5A5A40] flex items-center gap-1.5 font-serif">
                        <span className="w-4 h-4 rounded-full bg-[#A3B18A] text-white flex items-center justify-center font-bold text-[10px]">P</span>
                        Pictorial Stage
                      </div>
                      <p className="text-[#434338] leading-relaxed">{chapter.pictorialNotes}</p>
                    </div>

                    <div className="p-3.5 bg-white rounded-2xl border border-[#D6D6C2] space-y-1.5">
                      <div className="font-bold text-[#5A5A40] flex items-center gap-1.5 font-serif">
                        <span className="w-4 h-4 rounded-full bg-[#5A5A40] text-white flex items-center justify-center font-bold text-[10px]">A</span>
                        Abstract Formulas
                      </div>
                      <MathRenderer content={chapter.abstractNotes} className="text-xs text-[#434338]" />
                    </div>
                  </div>

                  {/* Sample Socratic Practice Problems */}
                  <div className="space-y-3 pt-2">
                    <h5 className="font-serif italic font-bold text-[#5A5A40] text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#5A5A40]" /> Worked Socratic Problem Scaffolds
                    </h5>

                    <div className="grid grid-cols-1 gap-3">
                      {chapter.sampleProblems.map(prob => (
                        <div
                          key={prob.id}
                          className="bg-white p-4 rounded-2xl border border-[#D6D6C2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBEBE0] text-[#5A5A40] border border-[#D6D6C2]">
                                {prob.difficulty}
                              </span>
                              <span className="font-bold text-[#434338] text-xs">{prob.title}</span>
                            </div>
                            <div className="text-xs text-[#73735C]">
                              <MathRenderer content={prob.statement} />
                            </div>
                          </div>

                          <button
                            onClick={() => onSelectProblem(prob, chapter)}
                            className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5A5A40] hover:bg-[#474732] text-white font-semibold text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
                          >
                            <PlayCircle className="w-3.5 h-3.5" /> Practice with Sage
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
