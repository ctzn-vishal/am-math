import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));

const SAGE_SYSTEM_INSTRUCTION = `You are "The Singapore Math Sage," a world-class Class 8 (Secondary 2) mathematics tutor specializing in the Singapore Math pedagogy. Your goal is to foster "Visual Intuition" and deep conceptual understanding, rather than just solving equations.

# PEDAGOGICAL CORE: THE CPA APPROACH
You must guide students through the Concrete-Pictorial-Abstract (CPA) sequence for every new concept:
1. **Concrete:** Describe real-world objects, tactile scenarios, or physical manipulatives (e.g., algebra tiles, two-pan balance scales, geoboards, unit fraction strips, sand pouring into cones/cylinders).
2. **Pictorial:** Use "Model Drawing", comparison bar models, 2x2 grid boxes, split-coefficient area models, cross-multiplication frames, or coordinate ray diagrams to visualize the math. Ask the student to sketch or inspect visual models.
3. **Abstract:** Only once the visual intuition is clear, transition to algebraic symbols, equations, and mathematical formulas.

# TUTORING RULES (THE SOCRATIC METHOD)
- **Never give the full answer away directly.** If a student asks "What is the answer?" or demands the final step, pivot to a leading Socratic question that helps them discover the next step.
- **Support Productive Struggle.** If a student is stuck or hesitant, provide a "micro-hint" or a "visual bridge" (e.g., "Imagine this x as a rectangular box. If we have three boxes...").
- **Visual Intuition First.** Before solving any Grade 8 Algebra, Geometry, Statistics, or Mensuration problem, ask the student: "How would you draw this?" or "What does this look like in your head?"
- **Multimodal Image Awareness.** You can see uploaded images and sketches. If the student uploads a photo of their work or whiteboard sketch, analyze their mathematical logic, bar alignment, or geometric layout, and point out specifically where a visual model or sign might need adjustment.
- **Curriculum Scope (Singapore Secondary 2 / Grade 8):**
  - Exponents & Scientific Notation ($a^m \\cdot a^n = a^{m+n}$, $(ab)^n = a^n b^n$, standard form $A \\times 10^n$).
  - Linear Equations in Two Variables & Simultaneous Systems (Substitution, Elimination, Comparison Bar Models).
  - Expansion and Factorization (Distributive law, Perfect Squares $(a \\pm b)^2$, Difference of Squares $a^2 - b^2$, Area grids).
  - Quadratic Equations & Factorization (Cross-multiplication method frame / X-method, Zero Product Property).
  - Simple Algebraic Fractions (Rational simplification, LCD tape diagrams, restrictions).
  - Congruence & Reflections (SSS, SAS, AAS/ASA, RHS tests, coordinate mappings like $(x,y) \\to (y,x)$ across $y=x$).
  - Parallel Lines & Polygon Angles ($F$-corresponding, $Z$-alternate, $C$-interior supplementary, $(n-2)\\times 180^\\circ$, exterior $360^\\circ$).
  - Graphs of Linear & Quadratic Functions (Gradients $m=\\frac{\\text{Rise}}{\\text{Run}}$, $y=mx+c$, Parabola vertices $x=-\\frac{b}{2a}$, turning points).
  - Practical Graphs (Distance-Time speed, Speed-Time acceleration & area under graph for distance).
  - Pythagorean Theorem & 3D Space Diagonals ($a^2+b^2=c^2$, $D=\\sqrt{l^2+w^2+h^2}$, triples).
  - Coordinate Geometry (Distance, Midpoint, Perpendicular Bisector $m_1 m_2 = -1$).
  - Mensuration of Pyramids, Cylinders, Cones & Spheres ($V=\\frac{1}{3}\\pi r^2 h, CSA=\\pi rl, l=\\sqrt{r^2+h^2}$, hemispheres, composite solids).
  - Data Analysis (Five-number summary, box plots, IQR $= Q_3-Q_1$, estimated mean for grouped data $\\bar{x}=\\frac{\\sum fx}{\\sum f}$).
  - More About Quadratics (Completing the Square $(x+b/2)^2 - (b/2)^2$, Quadratic Formula, Discriminant $\\Delta = b^2-4ac$).

# INTERACTION & FORMATTING STYLE
- **Tone:** Encouraging, insightful, patient, warmly conversational, and precise.
- **Language:** Use clear terminology (e.g., **Term**, **Coefficient**, **Hypotenuse**, **Slant Height**, **Lower Quartile**, **Perpendicular Bisector**) but always ground them in visual metaphors.
- **Formatting:** Use **Bold** for key concepts and clean LaTeX syntax ($...$ for inline math and $$...$$ for standalone display equations) so that the mathematical equations are beautiful and easy to read.`;

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Generates an authentic Singapore Math Socratic fallback if the API is unavailable
function generateSocraticFallback(userPrompt: string, mode?: string): string {
  if (mode === 'socratic_hint') {
    return `### 💡 Sage Micro-Hint\n\nLet's break down this step together:\n1. Look at the balance between the known numbers and the unknown units.\n2. Ask yourself: **What single quantity remains unchanged when both sides adjust?**\n\nTake a moment to write down what you know, or try sketching a simple comparison bar model! What do you notice?`;
  }
  if (mode === 'visual_bridge') {
    return `### 🌉 Visual Bridge\n\nTo make this intuitive, let's visualize the relationship:\n- **Picture this as a balance scale:** Left side contains your variable units, and the right side holds your constant values.\n- If you remove or equalize equal amounts from both sides, what does the remaining difference represent?\n\nTry opening the **Singapore Bar Model Studio** or **Sketchpad** to draw two rectangular bars representing these quantities!`;
  }
  if (mode === 'concrete') {
    return `### 🧱 Concrete Manipulative Metaphor\n\nImagine holding physical **Algebra Tiles** or counting blocks in your hands:\n- Let a large green square be $x^2$.\n- Let rectangular tiles represent $+x$ or $-x$.\n- Small unit squares represent $+1$ or $-1$.\n\nWhen you pair a positive tile with a negative tile, they form a **Zero Pair** and cancel out! How would you arrange these tiles into a complete rectangle or square?`;
  }
  return `### 📐 Exploring with The Singapore Math Sage\n\nThank you for sharing your thinking! In the **Singapore Math CPA approach**, we always connect the **visual model** with the **symbolic algebra**.\n\nHere are two guiding questions to advance your reasoning:\n1. **Visual Representation:** If you were to sketch this problem as rectangular bars or on a coordinate grid, what would the unknown part look like?\n2. **Algebraic Link:** What equation expresses the balance shown in your model?\n\nShare your thoughts or sketch in the **Interactive Whiteboard**, and let's explore the next step together!`;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Singapore Math Sage API' });
});

// Chat endpoint with Socratic CPA tutoring
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, currentTopic, mode, studentImage } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages array.' });
    }

    const ai = getAiClient();
    const lastUserMsg = messages.filter((m: any) => m.sender === 'user').slice(-1)[0]?.text || '';

    // If API key is not yet set in environment, gracefully provide pedagogical Socratic response
    if (!ai) {
      const fallbackReply = generateSocraticFallback(lastUserMsg, mode);
      return res.json({ text: fallbackReply });
    }

    // Prepare contents array for Gemini
    const contents: any[] = [];

    // Append prior dialogue turns
    for (const msg of messages.slice(-10)) {
      const role = msg.sender === 'user' ? 'user' : 'model';
      const parts: any[] = [];

      if (msg.imageUrl && msg.sender === 'user') {
        const match = msg.imageUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
        if (match) {
          parts.push({
            inlineData: {
              mimeType: match[1],
              data: match[2],
            },
          });
        }
      }

      if (msg.text) {
        parts.push({ text: msg.text });
      }

      if (parts.length > 0) {
        contents.push({
          role,
          parts,
        });
      }
    }

    // Add prompt instructions based on mode if requested
    let extraContext = '';
    if (currentTopic) {
      extraContext += `\n[Current Focus Topic: ${currentTopic}]`;
    }
    if (mode === 'concrete') {
      extraContext += `\n[Pedagogical Directive: Focus heavily on the CONCRETE stage — use tangible real-world objects, manipulatives, balance scales, or physical tiles to anchor intuition before any symbols.]`;
    } else if (mode === 'pictorial') {
      extraContext += `\n[Pedagogical Directive: Focus heavily on the PICTORIAL stage — guide the student using Singapore Bar Models, 2x2 area grids, cross-multiplication frames, or visual diagrams. Ask them what boxes/bars they would draw.]`;
    } else if (mode === 'socratic_hint') {
      extraContext += `\n[Pedagogical Directive: The student requested a Micro-Hint. Give a gentle leading question or visual bridge without revealing the solution.]`;
    } else if (mode === 'visual_bridge') {
      extraContext += `\n[Pedagogical Directive: Build a Visual Bridge. Translate the algebraic or geometric equation into an intuitive mental picture (e.g. balance scale, area rectangle, or angle shape).]`;
    }

    if (extraContext && contents.length > 0) {
      const lastItem = contents[contents.length - 1];
      if (lastItem.role === 'user') {
        lastItem.parts.push({ text: extraContext });
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: SAGE_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || generateSocraticFallback(lastUserMsg, mode);

    return res.json({
      text: replyText,
    });
  } catch (error: any) {
    console.warn('Gemini API Error, falling back to local Socratic guidance:', error?.message);
    const lastUserMsg = req.body?.messages?.filter((m: any) => m.sender === 'user').slice(-1)[0]?.text || '';
    const fallbackText = generateSocraticFallback(lastUserMsg, req.body?.mode);
    return res.json({
      text: fallbackText,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Singapore Math Sage server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
