import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MathRendererProps {
  content: string;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  // Pre-process content to ensure single $ equations and LaTeX arrays render reliably
  const formattedContent = content
    // Clean up LaTeX array escapes if needed
    .replace(/\\begin\{array\}/g, '\\begin{array}')
    .replace(/\\end\{array\}/g, '\\end{array}');

  return (
    <div className={`prose max-w-none text-[#434338] leading-relaxed math-rendered ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-[#5A5A40] bg-[#E9EDC9]/70 px-1 py-0.5 rounded-md">{children}</strong>,
          ul: ({ children }) => <ul className="my-2 space-y-1 list-disc pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="my-2 space-y-1 list-decimal pl-5">{children}</ol>,
          li: ({ children }) => <li className="text-[#434338]">{children}</li>,
          h1: ({ children }) => <h3 className="text-lg font-serif italic font-bold text-[#5A5A40] mt-4 mb-2">{children}</h3>,
          h2: ({ children }) => <h4 className="text-base font-serif italic font-bold text-[#5A5A40] mt-3 mb-1.5">{children}</h4>,
          h3: ({ children }) => <h5 className="text-sm font-serif font-bold text-[#5A5A40] mt-2 mb-1">{children}</h5>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#A3B18A] pl-3.5 py-1.5 my-2.5 bg-[#E9EDC9]/30 rounded-r-xl text-[#434338] italic">
              {children}
            </blockquote>
          ),
          code: ({ children, className: codeClass }) => {
            const isInline = !codeClass;
            return isInline ? (
              <code className="bg-[#EBEBE0] text-[#5A5A40] font-mono text-xs px-1.5 py-0.5 rounded-md border border-[#D6D6C2]">
                {children}
              </code>
            ) : (
              <code className="block bg-[#434338] text-[#F5F5F0] font-mono text-xs p-3 rounded-2xl overflow-x-auto my-2">
                {children}
              </code>
            );
          },
        }}
      >
        {formattedContent}
      </ReactMarkdown>
    </div>
  );
};
