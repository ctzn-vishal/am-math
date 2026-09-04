import { ChapterItem } from '../types';

export const SINGAPORE_MATH_CHAPTERS: ChapterItem[] = [
  {
    id: 1,
    number: 1,
    title: "Exponents and Scientific Notation",
    category: "Algebra",
    objectives: [
      "Apply index laws for positive, zero, negative, and fractional exponents",
      "Compare orders of magnitude",
      "Express numbers in standard scientific notation A × 10^n (1 ≤ |A| < 10)",
      "Perform operations with scientific notation and round to specified significant figures"
    ],
    concreteNotes: "Base-10 blocks and physical place-value disks. Repeatedly grouping/ungrouping stacks of 10 demonstrates positive power growth (10¹, 10², 10³) and division partitioning (10⁻¹, 10⁻², 10⁻³).",
    pictorialNotes: "Exponential number lines and shifting place-value charts. Show multiplication by 10ⁿ as shifting the decimal place or digit positions on a visual grid.",
    abstractNotes: "Index rules: $a^m \\cdot a^n = a^{m+n}$, $\\frac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$, $a^0 = 1$, $a^{-n} = \\frac{1}{a^n}$, $a^{1/n} = \\sqrt[n]{a}$. Scientific notation $A \\times 10^n$.",
    coreFormulas: [
      "a^m \\cdot a^n = a^{m+n}",
      "\\frac{a^m}{a^n} = a^{m-n}",
      "(a^m)^n = a^{mn}",
      "a^{-n} = \\frac{1}{a^n}",
      "a^{m/n} = \\sqrt[n]{a^m}",
      "A \\times 10^n \\quad (1 \\le |A| < 10)"
    ],
    recommendedTool: "bar-model",
    sampleProblems: [
      {
        id: "p1-1",
        title: "Simplifying Numerical Index Expressions",
        difficulty: "Basic",
        statement: "Simplify $\\frac{2^5 \\cdot 2^{-2}}{2^7}$, expressing your answer in positive index form.",
        concretePrompt: "Imagine 5 positive charge tokens of 2, combined with 2 inverse tokens. How many factors of 2 remain before dividing by 7 factors?",
        pictorialPrompt: "Draw a fraction with 5 factors of 2 on top, 2 cancelled factors, and 7 factors on the bottom. What simplifies?",
        abstractPrompt: "Apply the product rule $2^{5+(-2)} = 2^3$, then apply quotient rule $2^{3-7} = 2^{-4} = \\frac{1}{2^4} = \\frac{1}{16}$.",
        solutionSummary: "$2^{-4} = \\frac{1}{2^4} = \\frac{1}{16}$",
        scaffoldingHints: [
          "Look at the numerator first: what index law applies when multiplying identical bases ($2^5 \\cdot 2^{-2}$)?",
          "Use $a^m \\cdot a^n = a^{m+n}$ for the top, then use $\\frac{a^p}{a^q} = a^{p-q}$ to combine with the denominator.",
          "Subtract denominator exponent from numerator: $3 - 7 = -4$, then rewrite $2^{-4}$ as $\\frac{1}{2^4}$."
        ],
        commonMisconception: "Student multiplies bases together ($2^5 \\cdot 2^{-2} = 4^3$) instead of keeping base 2."
      },
      {
        id: "p1-2",
        title: "Operations in Scientific Notation",
        difficulty: "Advanced",
        statement: "Evaluate $(4.8 \\times 10^5) + (7.6 \\times 10^4)$, giving your final answer in standard scientific notation.",
        concretePrompt: "Think of money place values: you have 4.8 hundred-thousands ($480,000) and 7.6 ten-thousands ($76,000). Convert them to matching place units before adding.",
        pictorialPrompt: "On a place value grid, shift $7.6 \\times 10^4$ by one column to write it as $0.76 \\times 10^5$.",
        abstractPrompt: "Factor out $10^5$: $(4.8 + 0.76) \\times 10^5 = 5.56 \\times 10^5$.",
        solutionSummary: "$5.56 \\times 10^5$",
        scaffoldingHints: [
          "Can you add numbers directly when their powers of 10 differ? Think of adding 480,000 + 76,000.",
          "Express both numbers with the same power of 10, preferably the higher power ($10^5$).",
          "Rewrite $7.6 \\times 10^4 = 0.76 \\times 10^5$, then factor out $10^5$ to calculate $(4.8 + 0.76) \\times 10^5$."
        ],
        commonMisconception: "Adding coefficients directly without matching powers ($4.8 + 7.6 = 12.4 \\times 10^9$)."
      }
    ]
  },
  {
    id: 2,
    number: 2,
    title: "Linear Equations in Two Variables",
    category: "Algebra",
    objectives: [
      "Model real-world relationships with two linear variables",
      "Solve simultaneous linear equations using graphical, substitution, and elimination methods",
      "Formulate and solve applied word problems"
    ],
    concreteNotes: "Two-pan balance scales with labeled cups (variables x and y) and unit gram weights. Physically replacing one cup with equivalent cups/weights demonstrates substitution.",
    pictorialNotes: "Singapore comparison bar models. Draw proportional rectangular bars representing x and y to show how totals compare and reveal the replacement value of a variable block.",
    abstractNotes: "Simultaneous systems $ax + by = c$, substitution method, elimination method, and graphical intersection point $(x, y)$.",
    coreFormulas: [
      "ax + by = c",
      "\\text{Substitution: } y = f(x) \\implies ax + b(f(x)) = c",
      "\\text{Elimination: Multiply by factors to align coefficients}"
    ],
    recommendedTool: "bar-model",
    sampleProblems: [
      {
        id: "p2-1",
        title: "Solving Simultaneous Equations via Substitution",
        difficulty: "Basic",
        statement: "Solve the simultaneous equations:\n$$y = 2x + 1$$\n$$3x + 2y = 16$$",
        concretePrompt: "Imagine a scale balance: one y-cup can be perfectly replaced by 2 x-blocks plus 1 unit weight.",
        pictorialPrompt: "Draw a bar for y made of two x-bars and a 1-unit block. Substitute this into the total bar of $3x + 2y = 16$.",
        abstractPrompt: "Substitute $y = 2x+1$ into $3x + 2(2x+1) = 16 \\implies 7x + 2 = 16 \\implies x = 2, y = 5$.",
        solutionSummary: "$(x, y) = (2, 5)$",
        scaffoldingHints: [
          "Equation (1) tells you exactly what $y$ equals in terms of $x$. Where can you place that in the second equation?",
          "Replace $y$ in $3x + 2y = 16$ with $(2x + 1)$ and solve the single-variable equation for $x$.",
          "Expand $2(2x + 1)$ to get $4x + 2$. Solve $7x + 2 = 16$, then plug $x$ into $y = 2x + 1$."
        ],
        commonMisconception: "Forgetting to distribute the factor of 2 to all terms: writing $3x + 4x + 1 = 16$ instead of $3x + 4x + 2 = 16$."
      },
      {
        id: "p2-2",
        title: "Word Problems via Elimination",
        difficulty: "Advanced",
        statement: "3 adult tickets and 4 child tickets cost $48. 5 adult tickets and 2 child tickets cost $52. Find the cost of one adult ticket and one child ticket.",
        concretePrompt: "Think of two ticket receipts. If we double the second purchase to 10 adult and 4 child tickets for $104, notice child tickets match!",
        pictorialPrompt: "Draw comparison bars for Group A ($3a + 4c = 48$) and double Group B ($10a + 4c = 104$). The extra $56 is due solely to the extra 7 adult tickets.",
        abstractPrompt: "Multiply eq (2) by 2: $10a + 4c = 104$. Subtract eq (1): $7a = 56 \\implies a = 8$. Back-substitute: $c = 6$.",
        solutionSummary: "Adult ticket = $8, Child ticket = $6",
        scaffoldingHints: [
          "Assign variables to unknown quantities: $a =$ adult cost, $c =$ child cost.",
          "Notice coefficients of $c$ are 4 and 2. How can you multiply equation (2) so subtracting eliminates $c$?",
          "Multiply equation (2) by 2 to get $10a + 4c = 104$. Subtract $(3a + 4c = 48)$ to get $7a = 56$."
        ],
        commonMisconception: "Subtracting only the left sides and forgetting to subtract constants on the right (104 - 48)."
      }
    ]
  },
  {
    id: 3,
    number: 3,
    title: "Expansion and Factorization of Algebraic Expressions",
    category: "Algebra",
    objectives: [
      "Expand products of algebraic expressions using Distributive Law",
      "Apply special algebraic identities (perfect squares and difference of squares)",
      "Factorize expressions by grouping and using special products"
    ],
    concreteNotes: "Physical algebra tiles ($x^2$ squares, $x$ rectangles, and 1-unit tiles) to build rectangular composite arrays. The dimensions represent factors; the total surface area represents the expanded polynomial.",
    pictorialNotes: "Geometric Area Models / 2x2 Grid Boxes showing $(a+b)(c+d) = ac + ad + bc + bd$.",
    abstractNotes: "$(a+b)^2 = a^2 + 2ab + b^2$, $(a-b)^2 = a^2 - 2ab + b^2$, $(a+b)(a-b) = a^2 - b^2$.",
    coreFormulas: [
      "(a + b)^2 = a^2 + 2ab + b^2",
      "(a - b)^2 = a^2 - 2ab + b^2",
      "(a + b)(a - b) = a^2 - b^2",
      "a(b + c) = ab + ac"
    ],
    recommendedTool: "algebra-tiles",
    sampleProblems: [
      {
        id: "p3-1",
        title: "Difference of Squares Expansion",
        difficulty: "Basic",
        statement: "Expand and simplify $(3x + 4)(3x - 4)$.",
        concretePrompt: "Build a large square of dimension $3x$ by $3x$, remove a corner square of $4$ by $4$.",
        pictorialPrompt: "Draw a 2x2 area grid with $3x, +4$ across the top and $3x, -4$ down the side. Notice $+12x$ and $-12x$ cancel out.",
        abstractPrompt: "Recognize form $(a+b)(a-b) = a^2 - b^2$ where $a = 3x, b = 4$. $(3x)^2 - 4^2 = 9x^2 - 16$.",
        solutionSummary: "$9x^2 - 16$",
        scaffoldingHints: [
          "Look at the two sets of parentheses: identical terms with alternating signs (+ and -).",
          "Use the identity $(a+b)(a-b) = a^2 - b^2$ with $a = 3x$ and $b = 4$.",
          "Square $3x$ (squaring both 3 and $x$) to get $9x^2$, then subtract $4^2 = 16$."
        ],
        commonMisconception: "Writing $(3x)^2$ as $3x^2$ by forgetting to square the coefficient 3."
      },
      {
        id: "p3-2",
        title: "Factorization by Grouping and Special Products",
        difficulty: "Advanced",
        statement: "Factorize completely: $x^2 - y^2 + 6x + 9$.",
        concretePrompt: "Arrange tiles: group the terms related to $x$ ($x^2, 6x, 9$) to form a complete square.",
        pictorialPrompt: "Group as $(x^2 + 6x + 9) - y^2 = (x+3)^2 - y^2$. This is a difference of two large squares.",
        abstractPrompt: "$A^2 - B^2 = (A+B)(A-B)$ where $A = (x+3)$ and $B = y$. Gives $(x + y + 3)(x - y + 3)$.",
        solutionSummary: "$(x + y + 3)(x - y + 3)$",
        scaffoldingHints: [
          "Can you group three terms together that form a perfect square trinomial?",
          "Group $(x^2 + 6x + 9)$ and factor it into $(x + 3)^2$.",
          "Now you have $(x + 3)^2 - y^2$. Apply $A^2 - B^2 = (A + B)(A - B)$."
        ],
        commonMisconception: "Attempting to factor $x^2 - y^2$ first as $(x-y)(x+y)$ and getting stuck with remaining $+6x+9$."
      }
    ]
  },
  {
    id: 4,
    number: 4,
    title: "Quadratic Factorization and Equations",
    category: "Algebra",
    objectives: [
      "Factorize quadratic trinomials $ax^2 + bx + c$ using cross-multiplication and area methods",
      "Solve quadratic equations using the Zero Product Property",
      "Model real-world scenarios with quadratic equations"
    ],
    concreteNotes: "Use algebra tiles with positive and negative representations. Students arrange $x^2$ tiles, $x$ bars, and unit squares into complete rectangles. If a gap remains, zero pairs are introduced.",
    pictorialNotes: "Singapore Cross-Multiplication Frame (X-Method / Grid Box): diagonal multiplication and vertical sum check.",
    abstractNotes: "Standard form $ax^2 + bx + c = 0$. Zero Product Property: if $A \\cdot B = 0$, then $A = 0$ or $B = 0$.",
    coreFormulas: [
      "ax^2 + bx + c = (px + q)(rx + s)",
      "\\text{Zero Product Property: } AB = 0 \\implies A = 0 \\text{ or } B = 0"
    ],
    recommendedTool: "cross-method",
    sampleProblems: [
      {
        id: "p4-1",
        title: "Factoring Monic Quadratic",
        difficulty: "Basic",
        statement: "Solve the equation $x^2 - 7x + 12 = 0$.",
        concretePrompt: "Take one $x^2$ square and 12 unit tiles. How can you split $-7x$ into two groups to form a rectangle?",
        pictorialPrompt: "In the cross frame, test factors of 12: $(-3) \\times (-4) = +12$, and $(-3x) + (-4x) = -7x$.",
        abstractPrompt: "$(x - 3)(x - 4) = 0 \\implies x = 3$ or $x = 4$.",
        solutionSummary: "$x = 3$ or $x = 4$",
        scaffoldingHints: [
          "What two numbers multiply to $+12$ and add up to $-7$?",
          "Since the product is positive and the sum is negative, both factors must be negative ($-3$ and $-4$).",
          "Set each factor equal to zero: $x - 3 = 0$ and $x - 4 = 0$."
        ],
        commonMisconception: "Stopping at $(x - 3)(x - 4)$ without solving for the actual root values of $x$."
      },
      {
        id: "p4-2",
        title: "Non-Monic Quadratic Word Problem",
        difficulty: "Advanced",
        statement: "The length of a rectangular garden is $3\\text{ m}$ longer than twice its width. The area of the garden is $35\\text{ m}^2$. Find the dimensions of the garden.",
        concretePrompt: "Imagine a rectangular flowerbed with width $w$ and length $2w + 3$. The grid area inside contains 35 square meters.",
        pictorialPrompt: "Draw the rectangle partitioned into $2w^2 + 3w = 35$. Rearrange to $2w^2 + 3w - 35 = 0$.",
        abstractPrompt: "Factors of $2 \\times (-35) = -70$ adding to $+3$ are $+10, -7$. $(2w - 7)(w + 5) = 0 \\implies w = 3.5\\text{ m}, \\text{Length} = 10\\text{ m}$. Reject $w = -5$.",
        solutionSummary: "Width = $3.5\\text{ m}$, Length = $10\\text{ m}$",
        scaffoldingHints: [
          "Write an expression for length in terms of $w$: $\\text{Length} = 2w + 3$.",
          "Set up $\\text{Area} = w(2w + 3) = 35 \\implies 2w^2 + 3w - 35 = 0$.",
          "Factor using cross method: $(2w - 7)(w + 5) = 0$. Discard negative width since dimensions must be positive."
        ],
        commonMisconception: "Keeping $w = -5$ as a valid dimension in a physical real-world problem."
      }
    ]
  },
  {
    id: 5,
    number: 5,
    title: "Simple Algebraic Fractions",
    category: "Algebra",
    objectives: [
      "Simplify algebraic fractions with polynomial numerators and denominators",
      "Perform four operations (+, -, ×, ÷) on rational expressions",
      "Solve fractional equations reducible to linear or quadratic form",
      "Identify restrictions and extraneous roots"
    ],
    concreteNotes: "Fraction equivalence strips and segmented rods to demonstrate why fractions cannot be combined without a shared denominator.",
    pictorialNotes: "Partitioned Area / Tape Diagrams. Visually partition fractional blocks into smaller identical grid units to model finding the Lowest Common Denominator (LCD).",
    abstractNotes: "Rational simplification $\\frac{A \\cdot C}{B \\cdot C} = \\frac{A}{B}$, common denominator $\\frac{A}{B} \\pm \\frac{C}{D} = \\frac{AD \\pm BC}{BD}$, and checking undefined denominator values.",
    coreFormulas: [
      "\\frac{A \\cdot C}{B \\cdot C} = \\frac{A}{B} \\quad (B, C \\ne 0)",
      "\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}",
      "\\text{LCD: Common denominator to combine fractions}"
    ],
    recommendedTool: "bar-model",
    sampleProblems: [
      {
        id: "p5-1",
        title: "Simplifying Rational Expressions",
        difficulty: "Basic",
        statement: "Simplify $\\frac{x^2 - 9}{2x^2 + 6x}$.",
        concretePrompt: "Factor both the top numerator tiles and bottom denominator tiles into dimension groups before looking for matching factor lengths.",
        pictorialPrompt: "Write top as $(x-3)(x+3)$ and bottom as $2x(x+3)$. Cross out the identical $(x+3)$ factor block.",
        abstractPrompt: "$\\frac{(x-3)(x+3)}{2x(x+3)} = \\frac{x-3}{2x}$ where $x \\ne 0, -3$.",
        solutionSummary: "$\\frac{x - 3}{2x} \\quad (x \\ne 0, -3)$",
        scaffoldingHints: [
          "Do not cancel individual terms like $x^2$ directly! Always factorize completely first.",
          "Factor the top using difference of squares $a^2 - b^2$, and factor out greatest common factor $2x$ from denominator.",
          "Divide out the matching binomial $(x + 3)$."
        ],
        commonMisconception: "Cancelling individual terms like $x^2$ across addition/subtraction signs."
      },
      {
        id: "p5-2",
        title: "Solving a Fractional Equation",
        difficulty: "Advanced",
        statement: "Solve the equation: $\\frac{3}{x - 2} - \\frac{2}{x + 1} = \\frac{5}{x^2 - x - 2}$.",
        concretePrompt: "Notice $x^2 - x - 2$ is built from the product of the two other denominators $(x-2)(x+1)$.",
        pictorialPrompt: "Multiply all terms by the full common denominator $(x-2)(x+1)$ to clear fractions across the balance scale.",
        abstractPrompt: "$3(x+1) - 2(x-2) = 5 \\implies 3x + 3 - 2x + 4 = 5 \\implies x + 7 = 5 \\implies x = -2$. Check validity: valid.",
        solutionSummary: "$x = -2$",
        scaffoldingHints: [
          "Factor the denominator on the right-hand side first: $x^2 - x - 2 = (x - 2)(x + 1)$.",
          "Multiply the entire equation by $(x - 2)(x + 1)$ to clear all fractions.",
          "Expand $3(x+1) - 2(x-2) = 5$ carefully (watch the sign on $-2 \\times -2 = +4$)."
        ],
        commonMisconception: "Distributing $-2(x-2)$ as $-2x - 4$ instead of $-2x + 4$."
      }
    ]
  },
  {
    id: 6,
    number: 6,
    title: "Congruence and Reflections",
    category: "Geometry",
    objectives: [
      "Identify and establish congruence in triangles using formal tests (SSS, SAS, AAS/ASA, RHS)",
      "Apply reflection transformations across coordinate axes and arbitrary lines",
      "Understand similarity and coordinate reflection mappings"
    ],
    concreteNotes: "Use Miras (reflective transparent panels), tracing paper (patty paper), and geoboards. Physically flipping tracing paper over a mirror line demonstrates congruence and line-of-reflection invariance.",
    pictorialNotes: "Coordinate Grid Ray Mappings. Draw perpendicular dashed guide lines from pre-image vertices to the mirror line and extend them an equal distance to plot the image points.",
    abstractNotes: "Congruence criteria: SSS, SAS, AAS/ASA, RHS. Reflection rules: over x-axis $(x, -y)$, y-axis $(-x, y)$, line $y = x \\implies (y, x)$.",
    coreFormulas: [
      "\\triangle ABC \\cong \\triangle PQR \\iff \\text{All corresponding sides & angles equal}",
      "\\text{Across } x\\text{-axis: } (x, y) \\to (x, -y)",
      "\\text{Across } y\\text{-axis: } (x, y) \\to (-x, y)",
      "\\text{Across } y = x: (x, y) \\to (y, x)"
    ],
    recommendedTool: "parallel-angles",
    sampleProblems: [
      {
        id: "p6-1",
        title: "Determining Triangle Congruence",
        difficulty: "Basic",
        statement: "In $\\triangle ABC$ and $\\triangle PQR$, $AB = PQ = 6\\text{ cm}$, $\\angle B = \\angle Q = 45^\\circ$, and $BC = QR = 8\\text{ cm}$. State whether the two triangles are congruent, giving reasons.",
        concretePrompt: "Use two fixed sticks of length 6 and 8 joined at a fixed 45° angle. Can you form any other triangle shape?",
        pictorialPrompt: "Sketch both triangles and highlight the two sides and the included angle sitting snugly between them.",
        abstractPrompt: "Side $AB = PQ = 6$, Included $\\angle B = \\angle Q = 45^\\circ$, Side $BC = QR = 8$. Conclude $\\triangle ABC \\cong \\triangle PQR$ by SAS.",
        solutionSummary: "Congruent by SAS (Side-Angle-Side)",
        scaffoldingHints: [
          "List out the three pairs of equal parts given in the problem statement.",
          "Check the position of the $45^\\circ$ angle: is it positioned directly between the two given sides?",
          "Since two sides and the included angle match, state congruence using the SAS test."
        ],
        commonMisconception: "Claiming congruence by ASS or SSA when the angle is not between the two known sides."
      },
      {
        id: "p6-2",
        title: "Coordinate Reflection & Distance Properties",
        difficulty: "Advanced",
        statement: "A triangle has vertices $A(1, 4)$, $B(4, 5)$, and $C(3, 1)$. The triangle is reflected across the line $y = x$ to form $\\triangle A'B'C'$. Find coordinates of $A', B', C'$ and length $A'C'$.",
        concretePrompt: "Fold your coordinate grid paper along the diagonal $y = x$ line to see coordinates flip.",
        pictorialPrompt: "Plot $(1, 4)$ and draw a perpendicular line to $y = x$. It reflects across to $(4, 1)$.",
        abstractPrompt: "Rule $(x, y) \\to (y, x)$. $A'(4, 1), B'(5, 4), C'(1, 3)$. Distance $A'C' = \\sqrt{(1-4)^2 + (3-1)^2} = \\sqrt{13} \\approx 3.61$.",
        solutionSummary: "$A'(4, 1), B'(5, 4), C'(1, 3); \\quad A'C' = \\sqrt{13} \\approx 3.61\\text{ units}$",
        scaffoldingHints: [
          "When a point reflects over the diagonal line $y = x$, what happens to $x$ and $y$?",
          "Swap the coordinates: $(x, y)$ becomes $(y, x)$.",
          "Use the distance formula $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ to compute the segment length."
        ],
        commonMisconception: "Negating coordinates instead of swapping them (confusing reflection across $y = x$ with axes)."
      }
    ]
  },
  {
    id: 7,
    number: 7,
    title: "Parallel Lines and Angles in Triangles and Polygons",
    category: "Geometry",
    objectives: [
      "Apply angle properties of parallel lines intersected by transversals (F, Z, C angles)",
      "Calculate interior and exterior angles of triangles and regular/irregular polygons",
      "Solve multi-step geometric deductive problems"
    ],
    concreteNotes: "Dynamic angle rotators and paper polygon cutouts. Tearing the three vertices off a paper triangle and lining them up on a straight edge proves the 180° interior sum tangibly.",
    pictorialNotes: "Geometric Transversal Highlight Diagrams. Highlight F, Z, and C shapes over complex figures to isolate parallel relationships.",
    abstractNotes: "Corresponding angles (equal, F), Alternate interior angles (equal, Z), Interior angles (supplementary, C, sum to 180°). Polygon interior sum $S_n = (n-2) \\times 180^\\circ$, exterior sum $= 360^\\circ$.",
    coreFormulas: [
      "\\text{Corresponding } \\angle\\text{s (F-shape): } \\angle 1 = \\angle 2",
      "\\text{Alternate Interior } \\angle\\text{s (Z-shape): } \\angle 1 = \\angle 2",
      "\\text{Interior/Consecutive } \\angle\\text{s (C-shape): } \\angle 1 + \\angle 2 = 180^\\circ",
      "S_n = (n - 2) \\times 180^\\circ",
      "\\text{Exterior Sum} = 360^\\circ",
      "\\text{Regular } n\\text{-gon Exterior Angle} = \\frac{360^\\circ}{n}"
    ],
    recommendedTool: "parallel-angles",
    sampleProblems: [
      {
        id: "p7-1",
        title: "Angles on Parallel Lines",
        difficulty: "Basic",
        statement: "In the figure, $AB \\parallel CD$. A transversal line intersects $AB$ at $P$ and $CD$ at $Q$. If $\\angle APQ = (3x + 20)^\\circ$ and $\\angle PQD = (5x - 40)^\\circ$, find the value of $x$ and the size of $\\angle APQ$.",
        concretePrompt: "Trace the transversal from $P$ to $Q$ with your finger: feel the zig-zag corner forming a Z-shape.",
        pictorialPrompt: "Highlight the Z-shape between parallel lines $AB$ and $CD$. The corners inside the Z are equal alternate angles.",
        abstractPrompt: "$3x + 20 = 5x - 40 \\implies 2x = 60 \\implies x = 30$. $\\angle APQ = 3(30) + 20 = 110^\\circ$.",
        solutionSummary: "$x = 30, \\quad \\angle APQ = 110^\\circ$",
        scaffoldingHints: [
          "Look at the positions of $\\angle APQ$ and $\\angle PQD$. Do they form a Z-shape between the parallel lines?",
          "Because they are alternate angles, set the two algebraic expressions equal to each other.",
          "Solve $3x + 20 = 5x - 40$ for $x$, then evaluate $3x + 20$."
        ],
        commonMisconception: "Adding the expressions to equal $180^\\circ$ by confusing alternate angles with consecutive interior angles."
      },
      {
        id: "p7-2",
        title: "Interior and Exterior Angles of a Regular Polygon",
        difficulty: "Advanced",
        statement: "The interior angle of a regular polygon is five times its exterior angle. Find the number of sides of the polygon.",
        concretePrompt: "At any corner of a tile, walking around the corner completes a straight line: $\\text{Interior} + \\text{Exterior} = 180^\\circ$.",
        pictorialPrompt: "Draw a straight line at a vertex: partition $180^\\circ$ into 1 part exterior ($e$) and 5 parts interior ($5e$). Total 6 equal parts.",
        abstractPrompt: "$5e + e = 180^\\circ \\implies 6e = 180^\\circ \\implies e = 30^\\circ$. Number of sides $n = \\frac{360^\\circ}{30^\\circ} = 12\\text{ sides}$.",
        solutionSummary: "$n = 12\\text{ sides}$",
        scaffoldingHints: [
          "What is the sum of an interior angle and its adjacent exterior angle at any vertex?",
          "Set up $e + 5e = 180^\\circ$ to find the measure of one exterior angle $e$.",
          "Divide $360^\\circ$ by your exterior angle value to find the total number of sides $n$."
        ],
        commonMisconception: "Setting up a complex equation using the interior sum formula $\\frac{(n-2)180}{n} = 5 \\times 360$ and making algebraic mistakes."
      }
    ]
  },
  {
    id: 8,
    number: 8,
    title: "Graphs of Linear and Quadratic Functions",
    category: "Graphs",
    objectives: [
      "Graph linear functions using gradient-intercept methods ($y = mx + c$)",
      "Interpret rate of change",
      "Graph quadratic functions $y = ax^2 + bx + c$",
      "Identify vertices, axes of symmetry, and intercepts of parabolas"
    ],
    concreteNotes: "Coordinate dry-erase grid mats and pegboards with color-coded rubber bands. Stretch bands to construct right-angled slope triangles along plotted lines.",
    pictorialNotes: "Value Tables & Step-Wise Rate-of-Change Diagrams. Draw step ladders on cartesian graphs to visually map unit horizontal steps against vertical increments (Δy).",
    abstractNotes: "Gradient $m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{Rise}}{\\text{Run}}$, $y = mx + c$. Parabola $a > 0$ opens upward (min), $a < 0$ opens downward (max). Axis of symmetry $x = -\\frac{b}{2a}$.",
    coreFormulas: [
      "m = \\frac{y_2 - y_1}{x_2 - x_1}",
      "y = mx + c",
      "x = -\\frac{b}{2a} \\quad (\\text{Axis of symmetry})",
      "\\text{Vertex: } \\left(-\\frac{b}{2a}, f\\left(-\\frac{b}{2a}\\right)\\right)"
    ],
    recommendedTool: "motion-graphs",
    sampleProblems: [
      {
        id: "p8-1",
        title: "Graphing a Linear Function",
        difficulty: "Basic",
        statement: "Find the gradient and $y$-intercept of the straight line $3x + 2y = 8$, and determine if the point $(4, -2)$ lies on this line.",
        concretePrompt: "Rearrange the equation so $y$ is alone in the spotlight, like finding the unit rate.",
        pictorialPrompt: "Plot the $y$-intercept $(0, 4)$, then draw a slope triangle stepping 2 units right and 3 units down.",
        abstractPrompt: "$2y = -3x + 8 \\implies y = -\\frac{3}{2}x + 4$. Gradient $m = -\\frac{3}{2}$, $c = 4$. Plug in $(4, -2)$: $3(4) + 2(-2) = 12 - 4 = 8$ (LHS=RHS, yes).",
        solutionSummary: "$m = -\\frac{3}{2}, c = 4$; Point $(4, -2)$ lies on the line.",
        scaffoldingHints: [
          "Isolate $y$ on one side of the equation to put it in $y = mx + c$ form.",
          "The coefficient in front of $x$ is the gradient; the constant is the $y$-intercept.",
          "Substitute $x = 4$ and $y = -2$ into $3x + 2y = 8$ to see if the equation holds true."
        ],
        commonMisconception: "Stating the gradient is $-3$ directly from $3x + 2y = 8$ without dividing by the coefficient 2."
      },
      {
        id: "p8-2",
        title: "Analyzing Quadratic Parabolas",
        difficulty: "Advanced",
        statement: "For the quadratic function $y = -x^2 + 4x + 5$:\na) Determine if the graph has a max or min turning point.\nb) Find the coordinates of the turning point (vertex).\nc) Find the $x$-intercepts of the graph.",
        concretePrompt: "Since the leading coefficient is negative, imagine throwing a ball in an arc (an upside-down hill with a highest peak).",
        pictorialPrompt: "Sketch the downward curve $\\cap$. The peak line of symmetry cuts through $x = 2$.",
        abstractPrompt: "a) Max point since $a = -1 < 0$.\nb) Axis $x = -\\frac{4}{2(-1)} = 2$. $y = -(2)^2 + 4(2) + 5 = 9$. Vertex $(2, 9)$.\nc) Set $y=0$: $-(x-5)(x+1) = 0 \\implies x = 5, -1$.",
        solutionSummary: "a) Maximum turning point; b) Vertex $(2, 9)$; c) $x$-intercepts $(5, 0)$ and $(-1, 0)$",
        scaffoldingHints: [
          "Look at the sign of the $x^2$ term ($a = -1$). Does it open up or down?",
          "Use $x = -\\frac{b}{2a}$ to find the $x$-coordinate of the vertex, then substitute it back to get $y$.",
          "Set $y = 0$ and factor the quadratic equation to find where it crosses the $x$-axis."
        ],
        commonMisconception: "Calculating $-(2)^2$ as $(-2)^2 = +4$ leading to $y = 17$ instead of $-4 + 8 + 5 = 9$."
      }
    ]
  },
  {
    id: 9,
    number: 9,
    title: "Graphs in Practical Situations",
    category: "Graphs",
    objectives: [
      "Construct and interpret distance-time and speed-time graphs",
      "Calculate speed, average speed, and acceleration from graphical gradients",
      "Interpret conversion and practical rate graphs, and compute area under speed-time graphs"
    ],
    concreteNotes: "Stopwatches, rolling toys, and measuring tape along a track. Students record distances at 2-second intervals to link physical movement directly with data tables.",
    pictorialNotes: "Segmented Line Profiles with slope annotations. Color code sections (e.g., steep red = fast, shallow blue = slow, flat green = stopped). Trapezoid area shading under speed curves.",
    abstractNotes: "Distance-Time gradient = Speed. Speed-Time gradient = Acceleration. Area under speed-time graph = Total distance traveled.",
    coreFormulas: [
      "\\text{Speed} = \\frac{\\Delta \\text{Distance}}{\\Delta \\text{Time}}",
      "\\text{Average Speed} = \\frac{\\text{Total Distance}}{\\text{Total Time Taken}}",
      "\\text{Acceleration} = \\frac{\\Delta \\text{Speed}}{\\Delta \\text{Time}}",
      "\\text{Distance Traveled} = \\text{Area Under Speed-Time Graph}"
    ],
    recommendedTool: "motion-graphs",
    sampleProblems: [
      {
        id: "p9-1",
        title: "Distance-Time Travel Graph",
        difficulty: "Basic",
        statement: "A cyclist travels from Town A to Town B. She rides $30\\text{ km}$ in $1.5\\text{ hours}$, rests for $30\\text{ minutes}$, and then rides another $20\\text{ km}$ in $1\\text{ hour}$.\na) Find her speed during the first stage.\nb) Calculate her average speed for the entire journey.",
        concretePrompt: "Think of her journey in 3 distinct blocks of time and distance: leg 1, picnic rest, leg 2.",
        pictorialPrompt: "Draw the 3-segment graph: steep rise to 30km, flat horizontal plateau for 0.5h, second rise to 50km at 3h.",
        abstractPrompt: "a) $\\text{Speed}_1 = \\frac{30}{1.5} = 20\\text{ km/h}$.\nb) $\\text{Total Distance} = 50\\text{ km}$, $\\text{Total Time} = 1.5 + 0.5 + 1.0 = 3.0\\text{ h}$. $\\text{Avg Speed} = \\frac{50}{3} = 16\\frac{2}{3}\\text{ km/h}$.",
        solutionSummary: "a) $20\\text{ km/h}$; b) $16\\frac{2}{3}\\text{ km/h} \\approx 16.67\\text{ km/h}$",
        scaffoldingHints: [
          "For stage 1, use $\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}$.",
          "For average speed, do NOT average the individual speeds together! Find total distance and divide by total elapsed time.",
          "Total distance = 50 km; total time includes the 30-min rest ($0.5\\text{ h}$), giving 3.0 hours."
        ],
        commonMisconception: "Forgetting to include the 30-minute rest period in the total elapsed time."
      },
      {
        id: "p9-2",
        title: "Area Under a Speed-Time Graph",
        difficulty: "Advanced",
        statement: "A car accelerates uniformly from rest to $24\\text{ m/s}$ in $8\\text{ s}$, travels at this constant speed for $12\\text{ s}$, and decelerates uniformly to a stop in $4\\text{ s}$.\na) Find initial acceleration.\nb) Find total distance traveled during the 24-second trip.",
        concretePrompt: "Picture a trapezoidal roof shape: triangular ramp up, flat roof, triangular ramp down.",
        pictorialPrompt: "Shade the trapezoid under the speed line: bottom base $= 24\\text{ s}$, top base $= 12\\text{ s}$, height $= 24\\text{ m/s}$.",
        abstractPrompt: "a) $a = \\frac{24 - 0}{8} = 3\\text{ m/s}^2$.\nb) $\\text{Area} = \\frac{1}{2}(b_1 + b_2)h = \\frac{1}{2}(24 + 12)(24) = 432\\text{ m}$.",
        solutionSummary: "a) $3\\text{ m/s}^2$; b) $432\\text{ meters}$",
        scaffoldingHints: [
          "Acceleration is the gradient of the speed-time graph during the first 8 seconds: $\\frac{v-u}{t}$.",
          "Distance from a speed-time graph is the geometric area under the line.",
          "The shape is a trapezoid with parallel sides 24 and 12, and height 24: $\\text{Area} = \\frac{1}{2}(a+b)h$."
        ],
        commonMisconception: "Using $d = s \\times t = 24 \\times 24 = 576\\text{ m}$ assuming speed was constant throughout the whole trip."
      }
    ]
  },
  {
    id: 10,
    number: 10,
    title: "Pythagorean Theorem",
    category: "Geometry",
    objectives: [
      "State and prove the Pythagorean Theorem ($a^2 + b^2 = c^2$)",
      "Calculate unknown side lengths in right-angled triangles",
      "Apply the Converse of the Pythagorean Theorem",
      "Solve 2D and 3D applied spatial problems (space diagonals)"
    ],
    concreteNotes: "Unit Square Grid Tile Puzzles. Arrange square sets of tiles (3×3=9 and 4×4=16) along the legs of a right triangle, then rearrange all 25 tiles to build a single 5×5=25 square along the hypotenuse.",
    pictorialNotes: "Geometric Proof Squares attached to triangle borders. 3D cuboid box diagonals broken into base right triangle + vertical height triangle.",
    abstractNotes: "In right triangle with hypotenuse $c$: $a^2 + b^2 = c^2$. 3D space diagonal $D = \\sqrt{l^2 + w^2 + h^2}$. Triples: (3,4,5), (5,12,13), (8,15,17), (7,24,25).",
    coreFormulas: [
      "a^2 + b^2 = c^2",
      "c = \\sqrt{a^2 + b^2}, \\quad a = \\sqrt{c^2 - b^2}",
      "D = \\sqrt{l^2 + w^2 + h^2} \\quad (\\text{3D Space Diagonal})"
    ],
    recommendedTool: "pythagoras",
    sampleProblems: [
      {
        id: "p10-1",
        title: "Finding a Missing Leg",
        difficulty: "Basic",
        statement: "A right-angled triangle has a hypotenuse of length $13\\text{ cm}$ and one leg of length $5\\text{ cm}$. Find the length of the remaining leg.",
        concretePrompt: "You have a 169-tile square on the hypotenuse and a 25-tile square on one leg. Subtract tiles to find the remaining square.",
        pictorialPrompt: "Draw the right triangle: hypotenuse 13 is opposite the 90° box. Set up $5^2 + b^2 = 13^2$.",
        abstractPrompt: "$b^2 = 13^2 - 5^2 = 169 - 25 = 144 \\implies b = \\sqrt{144} = 12\\text{ cm}$.",
        solutionSummary: "$12\\text{ cm}$",
        scaffoldingHints: [
          "Which side is the hypotenuse? Make sure 13 is isolated on the $c^2$ side of the equation.",
          "Substitute: $5^2 + b^2 = 13^2 \\implies 25 + b^2 = 169$.",
          "Subtract 25 from 169 to find $b^2 = 144$, then take the square root."
        ],
        commonMisconception: "Adding squares instead of subtracting ($13^2 + 5^2 = 194$), making the leg longer than the hypotenuse."
      },
      {
        id: "p10-2",
        title: "3D Space Diagonal of a Cuboid",
        difficulty: "Advanced",
        statement: "A rectangular box (cuboid) has a length of $8\\text{ cm}$, a width of $6\\text{ cm}$, and a height of $24\\text{ cm}$. Find the length of the internal space diagonal connecting two opposite corners.",
        concretePrompt: "Hold a box: imagine a laser beam shooting from the bottom-left-front corner to the top-right-back corner.",
        pictorialPrompt: "Draw the base diagonal $d_{\\text{base}} = \\sqrt{8^2 + 6^2} = 10\\text{ cm}$. Now form a vertical upright right triangle with height 24.",
        abstractPrompt: "$D = \\sqrt{d_{\\text{base}}^2 + h^2} = \\sqrt{10^2 + 24^2} = \\sqrt{100 + 576} = \\sqrt{676} = 26\\text{ cm}$.",
        solutionSummary: "$26\\text{ cm}$",
        scaffoldingHints: [
          "Break this into two steps: first find the diagonal across the bottom floor of the box.",
          "Use the floor diagonal and vertical height as the two legs of a new right triangle.",
          "Compute $\\sqrt{8^2 + 6^2 + 24^2} = \\sqrt{676} = 26$."
        ],
        commonMisconception: "Attempting to find the diagonal using only two dimensions ($8\\text{ cm}$ and $24\\text{ cm}$) without the width."
      }
    ]
  },
  {
    id: 11,
    number: 11,
    title: "Coordinate Geometry",
    category: "Geometry",
    objectives: [
      "Calculate the length and midpoint of a line segment using coordinates",
      "Find the gradient of a line segment and derive straight line equations",
      "Apply parallel ($m_1 = m_2$) and perpendicular ($m_1 m_2 = -1$) line conditions",
      "Find equations of perpendicular bisectors"
    ],
    concreteNotes: "Pegboards and coordinate grid boards with rubber bands. Students build right-angled slope triangles on the grid to see horizontal distance Δx and vertical distance Δy as triangle legs.",
    pictorialNotes: "Coordinate plane slope diagrams with labeled horizontal (Δx) and vertical (Δy) steps.",
    abstractNotes: "Distance $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$, Midpoint $M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$, Gradient $m = \\frac{y_2 - y_1}{x_2 - x_1}$, Perpendicular $m_2 = -\\frac{1}{m_1}$.",
    coreFormulas: [
      "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
      "M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)",
      "m = \\frac{y_2 - y_1}{x_2 - x_1}",
      "m_1 \\cdot m_2 = -1 \\iff m_2 = -\\frac{1}{m_1}",
      "y - y_1 = m(x - x_1)"
    ],
    recommendedTool: "parallel-angles",
    sampleProblems: [
      {
        id: "p11-1",
        title: "Distance and Midpoint",
        difficulty: "Basic",
        statement: "Given two points $P(-2, 5)$ and $Q(4, -3)$, find:\na) The coordinates of the midpoint of $PQ$.\nb) The exact length of segment $PQ$.",
        concretePrompt: "Find the average position along the horizontal street (x) and vertical avenue (y).",
        pictorialPrompt: "Draw the right triangle under $PQ$: base $\\Delta x = 4 - (-2) = 6$, height $\\Delta y = -3 - 5 = -8$.",
        abstractPrompt: "a) $M = \\left(\\frac{-2+4}{2}, \\frac{5+(-3)}{2}\\right) = (1, 1)$.\nb) $d = \\sqrt{6^2 + (-8)^2} = \\sqrt{36+64} = \\sqrt{100} = 10\\text{ units}$.",
        solutionSummary: "a) Midpoint $(1, 1)$; b) Length $= 10\\text{ units}$",
        scaffoldingHints: [
          "For midpoint, take the average of the $x$-coordinates and average of the $y$-coordinates.",
          "For distance, find $\\Delta x = 4 - (-2) = 6$ and $\\Delta y = -3 - 5 = -8$.",
          "Evaluate $\\sqrt{6^2 + (-8)^2} = \\sqrt{100} = 10$."
        ],
        commonMisconception: "Calculating $4 - (-2)$ as 2 due to mishandling double negatives."
      },
      {
        id: "p11-2",
        title: "Equation of a Perpendicular Bisector",
        difficulty: "Advanced",
        statement: "Find the equation of the perpendicular bisector of the line segment joining $A(2, -1)$ and $B(6, 7)$.",
        concretePrompt: "Fold a segment in half: the crease cuts through the exact middle at a sharp 90° angle.",
        pictorialPrompt: "Plot $A$ and $B$, mark midpoint $M(4, 3)$, and draw the perpendicular line crossing at $90^\\circ$.",
        abstractPrompt: "Midpoint $M = (4, 3)$. Slope $m_{AB} = \\frac{7 - (-1)}{6 - 2} = \\frac{8}{4} = 2$. Perpendicular slope $m_\\perp = -\\frac{1}{2}$. Line: $y - 3 = -\\frac{1}{2}(x - 4) \\implies y = -\\frac{1}{2}x + 5$.",
        solutionSummary: "$y = -\\frac{1}{2}x + 5 \\quad (\\text{or } x + 2y - 10 = 0)$",
        scaffoldingHints: [
          "A perpendicular bisector does two things: passes through the midpoint and meets at $90^\\circ$.",
          "Find midpoint of $AB$ and slope of $AB$. What is the negative reciprocal of that slope?",
          "Use point $(4, 3)$ and slope $m = -\\frac{1}{2}$ in $y - y_1 = m(x - x_1)$."
        ],
        commonMisconception: "Using the original slope $m = 2$ instead of the negative reciprocal $m_\\perp = -\\frac{1}{2}$."
      }
    ]
  },
  {
    id: 12,
    number: 12,
    title: "Mensuration of Pyramids, Cylinders, Cones and Spheres",
    category: "Mensuration",
    objectives: [
      "Calculate surface areas and volumes of right pyramids, cylinders, cones, and spheres",
      "Solve problems involving composite 3D solids and hollow containers",
      "Distinguish between vertical height and slant height"
    ],
    concreteNotes: "Hollow geometric solids and water/sand pouring. Pouring 3 full cones of sand into an identical-radius cylinder confirms the 1/3 volume factor tangibly.",
    pictorialNotes: "Unfolded 2D Surface Nets. Draw the unrolled sector net of a cone and rectangular curved-face net of a cylinder to connect surface area formulas directly to 2D shapes.",
    abstractNotes: "Cylinder: $V = \\pi r^2 h, TSA = 2\\pi rh + 2\\pi r^2$. Cone: $V = \\frac{1}{3}\\pi r^2 h, CSA = \\pi rl, l = \\sqrt{r^2 + h^2}$. Sphere: $V = \\frac{4}{3}\\pi r^3, SA = 4\\pi r^2$. Solid hemisphere $TSA = 3\\pi r^2$.",
    coreFormulas: [
      "\\text{Cylinder } V = \\pi r^2 h, \\quad \\text{CSA} = 2\\pi rh",
      "\\text{Cone } V = \\frac{1}{3}\\pi r^2 h, \\quad \\text{CSA} = \\pi rl \\quad (l = \\sqrt{r^2 + h^2})",
      "\\text{Pyramid } V = \\frac{1}{3} \\times \\text{Base Area} \\times h",
      "\\text{Sphere } V = \\frac{4}{3}\\pi r^3, \\quad \\text{Area} = 4\\pi r^2",
      "\\text{Solid Hemisphere Total Area} = 3\\pi r^2"
    ],
    recommendedTool: "mensuration",
    sampleProblems: [
      {
        id: "p12-1",
        title: "Surface Area and Volume of a Cone",
        difficulty: "Basic",
        statement: "A right cone has a base radius of $5\\text{ cm}$ and a vertical height of $12\\text{ cm}$. Leaving your answer in terms of $\\pi$:\na) Find its volume.\nb) Find its total surface area.",
        concretePrompt: "Fill the cone with 3 batches of liquid to see it fills a cylinder of height 12.",
        pictorialPrompt: "Unroll the cone into a flat sector of radius $l$ plus a circular base of radius $r = 5$.",
        abstractPrompt: "a) $V = \\frac{1}{3}\\pi (5^2)(12) = 100\\pi\\text{ cm}^3$.\nb) Slant height $l = \\sqrt{5^2 + 12^2} = 13\\text{ cm}$. $\\text{TSA} = \\pi rl + \\pi r^2 = \\pi(5)(13) + \\pi(5^2) = 65\\pi + 25\\pi = 90\\pi\\text{ cm}^2$.",
        solutionSummary: "a) $100\\pi\\text{ cm}^3$; b) $90\\pi\\text{ cm}^2$",
        scaffoldingHints: [
          "For volume, use $V = \\frac{1}{3}\\pi r^2 h$ with $r = 5$ and $h = 12$.",
          "For surface area, you need the slant height $l$. Use Pythagoras with radius and vertical height.",
          "Compute $l = \\sqrt{5^2 + 12^2} = 13$, then calculate $\\text{TSA} = \\pi(5)(13) + \\pi(5^2)$."
        ],
        commonMisconception: "Using vertical height ($12\\text{ cm}$) instead of slant height ($13\\text{ cm}$) in the curved surface area formula."
      },
      {
        id: "p12-2",
        title: "Composite Solid (Hemisphere + Cylinder)",
        difficulty: "Advanced",
        statement: "A storage silo consists of a cylinder of radius $3\\text{ m}$ and height $8\\text{ m}$, topped by a solid hemisphere of radius $3\\text{ m}$. Find total volume and total exterior surface area (including flat circular base). Express to 3 sig figs.",
        concretePrompt: "Think of an ice cream cone or grain silo: the flat seam where hemisphere meets cylinder is hidden inside!",
        pictorialPrompt: "Draw the cross-section: flat bottom circle + cylinder curved barrel + hemisphere dome.",
        abstractPrompt: "Volume $= \\pi(3^2)(8) + \\frac{2}{3}\\pi(3^3) = 72\\pi + 18\\pi = 90\\pi \\approx 283\\text{ m}^3$.\nArea $= \\pi r^2 + 2\\pi rh + 2\\pi r^2 = 3\\pi(3^2) + 2\\pi(3)(8) = 27\\pi + 48\\pi = 75\\pi \\approx 236\\text{ m}^2$.",
        solutionSummary: "Volume $\\approx 283\\text{ m}^3$; Exterior Area $\\approx 236\\text{ m}^2$",
        scaffoldingHints: [
          "Break the solid into its two components: bottom cylinder and top hemisphere.",
          "For volume, add cylinder volume $\\pi r^2 h$ to half a sphere $\\frac{2}{3}\\pi r^3$.",
          "For exterior surface area, DO NOT include the circular boundary where hemisphere touches cylinder."
        ],
        commonMisconception: "Adding the flat top circle of the cylinder and base of the hemisphere into the exterior surface area."
      }
    ]
  },
  {
    id: 13,
    number: 13,
    title: "Data Analysis",
    category: "Statistics",
    objectives: [
      "Calculate and interpret measures of central tendency (mean, median, mode) and spread (range, IQR)",
      "Construct and interpret five-number summaries and box-and-whisker plots",
      "Calculate estimated mean for grouped frequency data (\\bar{x} = \\frac{\\sum fx}{\\sum f})",
      "Identify scatter plot correlation patterns"
    ],
    concreteNotes: "Physical counting cubes, sorted length strips, and tactile interval sorting trays. Lining up data strips by length and folding them into quarters introduces medians and quartiles tangibly.",
    pictorialNotes: "Dot plots, frequency histograms, box-and-whisker diagrams, and scatter plots with visual trend corridors.",
    abstractNotes: "Five-number summary: Min, $Q_1$, $Q_2$ (Median), $Q_3$, Max. $\\text{IQR} = Q_3 - Q_1$. Grouped mean $\\bar{x} = \\frac{\\sum fx}{\\sum f}$ with class midpoints $x$.",
    coreFormulas: [
      "\\text{Median } (Q_2) = \\text{Middle value in ordered dataset}",
      "\\text{IQR} = Q_3 - Q_1",
      "\\bar{x} = \\frac{\\sum fx}{\\sum f} \\quad (\\text{Grouped Mean Estimate})"
    ],
    recommendedTool: "box-plot",
    sampleProblems: [
      {
        id: "p13-1",
        title: "Five-Number Summary and Box Plot",
        difficulty: "Basic",
        statement: "Find the median and interquartile range for the following dataset:\n$3, 7, 8, 5, 12, 14, 21, 13, 18$.",
        concretePrompt: "Order 9 number cards from smallest to largest. Fold the line in half to find the median, then fold each half again.",
        pictorialPrompt: "Draw the ordered list: $3, 5, 7, 8, [12], 13, 14, 18, 21$. Box the middle 50% between $Q_1$ and $Q_3$.",
        abstractPrompt: "Ordered ($n=9$): $3, 5, 7, 8, 12, 13, 14, 18, 21$. Median $Q_2 = 12$. Lower half $(3,5,7,8) \\implies Q_1 = \\frac{5+7}{2} = 6$. Upper half $(13,14,18,21) \\implies Q_3 = \\frac{14+18}{2} = 16$. $\\text{IQR} = 16 - 6 = 10$.",
        solutionSummary: "Median $= 12, \\quad \\text{IQR} = 10$",
        scaffoldingHints: [
          "Always sort the dataset from least to greatest before finding quartiles.",
          "Find the middle number (median), then split remaining data into lower and upper halves.",
          "Find the median of each half to get $Q_1 = 6$ and $Q_3 = 16$, then subtract: $16 - 6 = 10$."
        ],
        commonMisconception: "Calculating median directly from unsorted list without ordering."
      },
      {
        id: "p13-2",
        title: "Mean of Grouped Frequency Distribution",
        difficulty: "Advanced",
        statement: "Test score distribution for 40 students: [50, 60): 6 students; [60, 70): 14 students; [70, 80): 12 students; [80, 90): 8 students. Calculate an estimate of the mean score.",
        concretePrompt: "Since we do not know every student's exact mark, represent each classroom group by its middle benchmark mark.",
        pictorialPrompt: "Construct table with midpoints: 55, 65, 75, 85. Weight each midpoint by its student count.",
        abstractPrompt: "Midpoints $\\times f$: $55(6) + 65(14) + 75(12) + 85(8) = 330 + 910 + 900 + 680 = 2820$. $\\bar{x} = \\frac{2820}{40} = 70.5$.",
        solutionSummary: "$\\bar{x} = 70.5$",
        scaffoldingHints: [
          "Find the midpoint ($x$) of each interval: $[50,60) \\to 55$, etc.",
          "Multiply each midpoint by frequency: $f \\cdot x$, then sum products ($2820$).",
          "Divide by total frequency ($40$ students)."
        ],
        commonMisconception: "Dividing sum of the 4 midpoints by 4 without weighting by frequency counts."
      }
    ]
  },
  {
    id: 14,
    number: 14,
    title: "More About Quadratic Equations",
    category: "Algebra",
    objectives: [
      "Solve quadratic equations by completing the square",
      "Derive and apply the Quadratic Formula: x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      "Determine number of real roots using the discriminant (\\Delta = b^2 - 4ac)",
      "Solve fractional and geometric equations reducible to quadratic form"
    ],
    concreteNotes: "Algebra tiles to model completing the square. Split the x bars equally into two sets, place them on adjacent sides of an x² square, and note the missing corner to see why we add (b/2)² unit tiles.",
    pictorialNotes: "Split-Coefficient Area Grid Boxes: square with dimension $(x + b/2)$ missing a small corner square of area $(b/2)^2$.",
    abstractNotes: "Completing the square: $x^2 + bx = \\left(x + \\frac{b}{2}\\right)^2 - \\left(\\frac{b}{2}\\right)^2$. Formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$. Discriminant $\\Delta > 0$ (2 real roots), $\\Delta = 0$ (1 repeated root), $\\Delta < 0$ (no real roots).",
    coreFormulas: [
      "x^2 + bx + c = 0 \\implies \\left(x + \\frac{b}{2}\\right)^2 = \\left(\\frac{b}{2}\\right)^2 - c",
      "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      "\\Delta = b^2 - 4ac \\quad (\\text{Discriminant})"
    ],
    recommendedTool: "algebra-tiles",
    sampleProblems: [
      {
        id: "p14-1",
        title: "Completing the Square",
        difficulty: "Basic",
        statement: "Solve $x^2 - 6x - 2 = 0$ by completing the square. Give answers in exact surd form.",
        concretePrompt: "Take an $x^2$ square tile and split $-6x$ into two groups of $-3x$ along top and side. What square tile completes the corner?",
        pictorialPrompt: "Draw the $(x - 3)$ by $(x - 3)$ box. The missing corner is $(-3)^2 = 9$. Add 9 to both sides.",
        abstractPrompt: "$x^2 - 6x = 2 \\implies x^2 - 6x + 9 = 2 + 9 \\implies (x - 3)^2 = 11 \\implies x - 3 = \\pm\\sqrt{11} \\implies x = 3 \\pm \\sqrt{11}$.",
        solutionSummary: "$x = 3 \\pm \\sqrt{11}$",
        scaffoldingHints: [
          "Move $-2$ to the other side: $x^2 - 6x = 2$.",
          "Take half of $-6$ (which is $-3$) and square it ($+9$). Add 9 to both sides.",
          "Rewrite as $(x - 3)^2 = 11$, take square root $(\\pm\\sqrt{11})$, and add 3."
        ],
        commonMisconception: "Forgetting the $\\pm$ sign when taking the square root, losing the second solution."
      },
      {
        id: "p14-2",
        title: "Quadratic Formula on Fractional Terms",
        difficulty: "Advanced",
        statement: "Solve the equation $\\frac{2}{x+1} + \\frac{3}{x} = 2$. Express answers correct to 2 decimal places.",
        concretePrompt: "Multiply all terms by $x(x+1)$ to clear the fractions into a standard quadratic scale balance.",
        pictorialPrompt: "Expand $2x + 3(x+1) = 2x(x+1) \\implies 5x + 3 = 2x^2 + 2x \\implies 2x^2 - 3x - 3 = 0$.",
        abstractPrompt: "$a = 2, b = -3, c = -3$. $x = \\frac{-(-3) \\pm \\sqrt{(-3)^2 - 4(2)(-3)}}{2(2)} = \\frac{3 \\pm \\sqrt{9 + 24}}{4} = \\frac{3 \\pm \\sqrt{33}}{4}$. $x \\approx 2.19$ or $-0.69$.",
        solutionSummary: "$x \\approx 2.19 \\quad \\text{or} \\quad x \\approx -0.69$",
        scaffoldingHints: [
          "Clear fractions by multiplying every term by the common denominator $x(x + 1)$.",
          "Rearrange to standard form: $2x^2 - 3x - 3 = 0$.",
          "Substitute $a = 2, b = -3, c = -3$ into $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$."
        ],
        commonMisconception: "Evaluating $-(-3)$ as $-3$ or calculating $(-3)^2$ as $-9$ under the radical."
      }
    ]
  }
];

export const INITIAL_GREETING_MESSAGE: import('../types').ChatMessage = {
  id: 'sage-initial-greeting',
  sender: 'sage',
  text: `### Welcome! I am The Singapore Math Sage 🇸🇬📐

I am your personal Class 8 / Secondary 2 mathematics mentor, dedicated to helping you develop **deep visual intuition** and true mathematical mastery through the **Concrete-Pictorial-Abstract (CPA)** approach.

---

### How We Learn Together:
1. **Concrete First:** We ground new ideas in physical manipulatives, real-world objects, and tangible intuition.
2. **Pictorial Bridges:** We sketch **Singapore Bar Models**, **Algebra Area Frames**, and **Geometric Transversals** before jumping into formulas.
3. **Abstract Power:** Once the visual picture is crystal clear, we translate our insight into algebra symbols and exact proofs.
4. **Socratic Partnership:** I will never simply give you a cold numeric answer. Instead, I'll provide **micro-hints**, **visual bridges**, and leading questions so that the "Aha!" moment belongs entirely to you!

---

**What topic or problem would you like to explore today?**
- You can type a question or word problem from any of our 14 Secondary 2 chapters.
- Click **14-Chapter Syllabus** to pick a worked Socratic problem.
- Open our **Bar Model Studio**, **Algebra Tiles**, or **Cross Method Frame** to build models alongside me.
- Or upload a **photo / sketchpad drawing** of your math work!`,
  timestamp: Date.now(),
};
