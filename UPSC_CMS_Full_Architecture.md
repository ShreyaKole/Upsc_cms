# UPSC CMS Prep Platform — Complete Architecture & Tech Stack

> Based on analysis of the actual PDF: `UPSC_CMS_2009-2019_.pdf` (519 pages, scanned, EduMedWeb watermarked)

---

## PDF Analysis (What You Have)

| Property | Detail |
|---|---|
| File | UPSC_CMS_2009-2019_.pdf |
| Pages | 519 total |
| Format | Scanned images (not text-extractable via pdftotext) |
| Layout | Two-column MCQ layout per page |
| Structure | Each year = Paper I + Paper II, each 120 questions |
| Extras | Answer key page per booklet, rough work pages |
| Watermark | www.EduMedWeb.com overlaid on all pages |
| Negative marking | 1/3 mark deducted per wrong answer |
| Marks | 250 total per paper (120 questions, unequal weights) |

### Approximate Page Map

| Year | Paper | Approx. Pages |
|---|---|---|
| 2009 | Paper I (General Ability, Medicine, Paediatrics) | 1–43 |
| 2009 | Paper II (Surgery, OBG, PSM) | 44–90 |
| 2011 | Paper I | 91–140 |
| 2011 | Paper II | 141–188 |
| 2012 | Paper I | ~189–232 |
| 2012 | Paper II | ~233–277 |
| 2013 | Paper I | ~278–322 |
| 2013 | Paper II | ~323–367 |
| 2014 | Paper I | ~368–412 |
| 2014 | Paper II | ~413–457 |
| 2015–2019 | Various | ~458–519 |

> **Note:** The PDF jumps from 2009 → 2011 (no 2010 Paper I found in this compilation). Verify exact boundaries by checking cover pages — each booklet starts with a "TEST BOOKLET" title page marked C.M.S-XX.

### Key Finding: OCR Required
The PDF is fully scanned (raster images). Standard text extraction returns only watermark text. All question data must be extracted via **OCR** (Tesseract or Google Vision API) before building the website.

---

## Tech Stack

### Frontend

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14** (App Router) | File-based routing, SSR, no separate backend needed |
| Language | **TypeScript** | Type safety across question data, exam state, results |
| Styling | **Tailwind CSS** | Utility-first, no stylesheet bloat, easy dark mode |
| Components | **shadcn/ui** | Accessible unstyled primitives (Dialog, Badge, Progress) |
| State | **Zustand** | Lightweight; perfect for exam session (answers, timer, navigation) |
| Charts | **Recharts** | React-native charts for post-exam analysis dashboard |
| Fonts | `DM Serif Display` + `Inter` + `JetBrains Mono` | Authority (serif), clarity (sans), precision (mono for timer) |

### Backend / Data

| Layer | Choice | Reason |
|---|---|---|
| API | **Next.js Route Handlers** | `/api/*` built-in, zero extra server |
| Database | **SQLite via Turso** (or local file) | Free, zero-latency for single user, hosted on edge |
| ORM | **Drizzle ORM** | TypeScript-first, works perfectly with Turso/SQLite |
| Questions | **Static JSON files** in `/data/papers/` | No DB needed for read-only question data; versioned, editable |
| Auth | Optional — skip for single-user | Add NextAuth later if multi-user needed |

### OCR Pipeline (One-Time PDF Processing)

| Step | Tool | Notes |
|---|---|---|
| 1. Rasterize PDF pages | `pdftoppm` (poppler) | 200 DPI for clean OCR input |
| 2. OCR each page image | **Tesseract v5** (local) or **Google Cloud Vision API** | Vision API recommended — handles two-column layout and medical terminology far better |
| 3. Parse OCR output | Custom Python script | Regex + heuristics to split questions, options, question numbers |
| 4. Structure into JSON | Python → JSON | One file per year per paper |
| 5. Manual verification | Human review in editor | Critical — OCR errors on medical terms must be corrected |
| 6. Merge Paper I + II | Script | Combine into single `YEAR.json` with 240 questions per year |

### Hosting

| Service | Use | Cost |
|---|---|---|
| **Vercel** | Next.js hosting | Free tier |
| **Turso** | SQLite edge DB for results | Free tier (500MB, 1B row reads/month) |
| **GitHub** | Version control + deploy trigger | Free |

---

## Project File Structure

```
upsc-cms/
│
├── app/
│   ├── layout.tsx                     # Root layout: fonts, nav bar, dark mode
│   ├── page.tsx                       # Home — all year papers grid with attempt history
│   │
│   ├── exam/
│   │   └── [year]/
│   │       ├── page.tsx               # Live exam: timer, questions, palette
│   │       └── review/
│   │           └── page.tsx           # Post-exam analysis dashboard
│   │
│   └── api/
│       ├── results/
│       │   └── route.ts               # POST: save result | GET: fetch history
│       └── papers/
│           └── [year]/
│               └── route.ts           # GET: serve question paper JSON
│
├── components/
│   ├── exam/
│   │   ├── ExamShell.tsx              # Full-screen wrapper, keyboard shortcuts
│   │   ├── QuestionCard.tsx           # Single question + options display
│   │   ├── OptionButton.tsx           # MCQ option with selected/unselected states
│   │   ├── Timer.tsx                  # Countdown + per-question time tracker
│   │   ├── QuestionPalette.tsx        # OMR-style grid: blank/visited/answered/review
│   │   └── SubmitModal.tsx            # Confirm submit with unanswered count
│   │
│   ├── analysis/
│   │   ├── ScoreSummary.tsx           # Score card: marks, correct, wrong, skipped
│   │   ├── AccuracyRing.tsx           # Donut chart: correct/wrong/unattempted
│   │   ├── TimeBarChart.tsx           # Bar: time spent per question (colour-coded)
│   │   ├── SubjectBreakdown.tsx       # Per-subject accuracy bars
│   │   ├── SpeedAccuracyChart.tsx     # Scatter: time vs. correct/wrong
│   │   ├── QuestionReview.tsx         # Every Q with your answer + correct + time
│   │   └── ExportButton.tsx           # Download PDF report of results
│   │
│   ├── home/
│   │   ├── YearCard.tsx               # Paper card: year, status, last score
│   │   └── StatsBar.tsx               # Overall stats across all attempts
│   │
│   └── ui/                            # shadcn/ui components (auto-generated)
│
├── data/
│   └── papers/
│       ├── 2009.json                  # 240 questions (Paper I + II combined)
│       ├── 2011.json
│       ├── 2012.json
│       ├── 2013.json
│       ├── 2014.json
│       ├── 2015.json
│       ├── 2016.json
│       ├── 2017.json
│       ├── 2018.json
│       └── 2019.json
│
├── lib/
│   ├── types.ts                       # All TypeScript interfaces
│   ├── store.ts                       # Zustand: exam session state
│   ├── utils.ts                       # Score calc, time formatting, analysis
│   └── db/
│       ├── schema.ts                  # Drizzle schema: results table
│       └── index.ts                   # Turso client connection
│
├── hooks/
│   ├── useExamTimer.ts                # Global countdown + per-question clock
│   ├── useExamSession.ts              # Answer tracking, question navigation
│   └── useResults.ts                  # Save/load exam results from DB
│
├── scripts/
│   ├── 1_rasterize_pdf.sh             # pdftoppm: PDF → JPG images at 200 DPI
│   ├── 2_ocr_pages.py                 # Tesseract/Vision API: images → raw text
│   ├── 3_parse_questions.py           # Raw text → structured Question objects
│   ├── 4_merge_papers.py              # Merge Paper I + Paper II JSONs per year
│   └── 5_validate_json.py             # Check all questions have 4 options + answer
│
├── public/
│   └── og-image.png                   # Social preview image
│
├── tailwind.config.ts
├── drizzle.config.ts
├── next.config.ts
└── package.json
```

---

## Core TypeScript Types (`lib/types.ts`)

```typescript
export type OptionKey = 'a' | 'b' | 'c' | 'd';

export interface Option {
  id: OptionKey;
  text: string;
}

export type Subject =
  | 'General Ability'
  | 'General Medicine'
  | 'Paediatrics'
  | 'Surgery'
  | 'Obstetrics & Gynaecology'
  | 'Preventive & Social Medicine';

export interface Question {
  id: number;                    // 1-indexed within the year paper
  paper: 'I' | 'II';            // Which booklet
  text: string;                  // Full question text
  options: Option[];             // Always 4 options
  correctOption: OptionKey;      // Sourced from answer key page in PDF
  subject?: Subject;             // Manually tagged or inferred
  explanation?: string;          // Added manually post-OCR (optional)
}

export interface Paper {
  year: number;                  // 2009, 2011–2019
  totalQuestions: number;        // 240 (120 per paper)
  marksPerQuestion: number;      // ~2.08 (250 marks / 120 questions)
  negativeMarking: number;       // 0.33 (one-third)
  durationMinutes: number;       // 120 per paper (run as one 2-hour session)
  papers: {
    I: { subject: string; questions: Question[] };
    II: { subject: string; questions: Question[] };
  };
}

export interface AnswerRecord {
  questionId: number;
  selectedOption: OptionKey | null;
  isMarkedForReview: boolean;
  timeSpentSeconds: number;      // Time on this question across all visits
  visitCount: number;            // Number of times user opened this question
}

export interface ExamSession {
  year: number;
  startedAt: string;             // ISO timestamp
  answers: Record<number, AnswerRecord>;
  currentIndex: number;
  isSubmitted: boolean;
}

export interface ExamResult {
  id: string;                    // UUID
  year: number;
  submittedAt: string;
  totalTimeSeconds: number;
  answers: AnswerRecord[];
  score: number;                 // Net score after negative marking
  totalCorrect: number;
  totalWrong: number;
  totalUnattempted: number;
  accuracy: number;              // correct / attempted * 100
  subjectBreakdown: SubjectStats[];
}

export interface SubjectStats {
  subject: Subject;
  total: number;
  attempted: number;
  correct: number;
  wrong: number;
  accuracy: number;
}
```

---

## Question JSON Format (`data/papers/2009.json`)

```json
{
  "year": 2009,
  "totalQuestions": 240,
  "marksPerQuestion": 2.083,
  "negativeMarking": 0.33,
  "durationMinutes": 120,
  "papers": {
    "I": {
      "subjects": "General Ability, General Medicine, Paediatrics",
      "questions": [
        {
          "id": 1,
          "paper": "I",
          "text": "To whom does the President of India address his resignation letter?",
          "options": [
            { "id": "a", "text": "The Prime Minister of India" },
            { "id": "b", "text": "The Chief Justice of the Supreme Court of India" },
            { "id": "c", "text": "The Speaker of the Lok Sabha" },
            { "id": "d", "text": "The Vice-President of India" }
          ],
          "correctOption": "d",
          "subject": "General Ability"
        }
      ]
    },
    "II": {
      "subjects": "Surgery, Obstetrics & Gynaecology, Preventive & Social Medicine",
      "questions": []
    }
  }
}
```

---

## Database Schema (`lib/db/schema.ts`)

```typescript
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const results = sqliteTable('results', {
  id:                 text('id').primaryKey(),          // UUID
  year:               integer('year').notNull(),
  submittedAt:        text('submitted_at').notNull(),
  totalTimeSeconds:   integer('total_time_seconds').notNull(),
  score:              real('score').notNull(),
  totalCorrect:       integer('total_correct').notNull(),
  totalWrong:         integer('total_wrong').notNull(),
  totalUnattempted:   integer('total_unattempted').notNull(),
  accuracy:           real('accuracy').notNull(),
  answersJson:        text('answers_json').notNull(),   // JSON: AnswerRecord[]
  subjectJson:        text('subject_json').notNull(),   // JSON: SubjectStats[]
});
```

---

## Zustand Store (`lib/store.ts`)

```typescript
import { create } from 'zustand';
import { AnswerRecord, OptionKey } from './types';

interface ExamStore {
  // State
  year: number | null;
  answers: Record<number, AnswerRecord>;
  currentIndex: number;
  startedAt: string | null;
  isSubmitted: boolean;

  // Actions
  startExam: (year: number, totalQuestions: number) => void;
  selectOption: (questionId: number, option: OptionKey) => void;
  clearOption: (questionId: number) => void;
  toggleMarkForReview: (questionId: number) => void;
  navigateTo: (index: number) => void;
  recordTimeSpent: (questionId: number, seconds: number) => void;
  submitExam: () => void;
  resetExam: () => void;
}
```

---

## Key Pages

### Home (`app/page.tsx`)
- Grid of year cards (2009, 2011–2019)
- Each card shows: year, attempt status, last score, accuracy badge
- "Start Exam" → `/exam/[year]`
- "View Analysis" → `/exam/[year]/review` (if attempted)
- Top stats bar: total attempts, average accuracy across all years

### Exam (`app/exam/[year]/page.tsx`)
- Full-screen layout: question area (left) + sidebar (right)
- Sidebar: countdown timer, question palette grid, submit button
- Question palette: colour-coded squares (grey=unseen, yellow=visited, blue=answered, purple=marked for review)
- Keyboard shortcuts: `←`/`→` navigate, `M` mark for review, `C` clear answer
- Auto-submits when timer hits 00:00
- Warns if unanswered questions > 0 on manual submit

### Analysis (`app/exam/[year]/review/page.tsx`)
Sections:
1. **Score card** — net score, correct, wrong, skipped, accuracy %
2. **Accuracy ring** — donut chart (correct / wrong / unattempted)
3. **Time distribution** — bar chart, one bar per question coloured by outcome
4. **Subject breakdown** — per-subject accuracy bars
5. **Speed vs accuracy** — were fast answers more reliable?
6. **Full question review** — every question: your answer, correct answer, time spent, explanation if available
7. **Marked for review** — all flagged questions highlighted

---

## OCR Pipeline Detail (`scripts/`)

### Step 1 — Rasterize (`1_rasterize_pdf.sh`)
```bash
#!/bin/bash
mkdir -p /tmp/cms_pages
pdftoppm -jpeg -r 200 UPSC_CMS_2009-2019_.pdf /tmp/cms_pages/page
echo "Done. $(ls /tmp/cms_pages/*.jpg | wc -l) pages rasterized."
```

### Step 2 — OCR (`2_ocr_pages.py`)
```python
# Option A: Tesseract (free, local)
import pytesseract
from PIL import Image

def ocr_page(image_path):
    img = Image.open(image_path)
    return pytesseract.image_to_string(img, lang='eng', config='--psm 1')

# Option B: Google Cloud Vision (recommended for accuracy)
from google.cloud import vision

def ocr_page_vision(image_path):
    client = vision.ImageAnnotatorClient()
    with open(image_path, 'rb') as f:
        content = f.read()
    image = vision.Image(content=content)
    response = client.document_text_detection(image=image)
    return response.full_text_annotation.text
```

### Step 3 — Parse Questions (`3_parse_questions.py`)
```python
import re

def parse_questions(raw_text):
    """
    Splits OCR output into individual questions.
    Handles two-column layout by merging and re-splitting on question numbers.
    """
    # Normalize whitespace
    text = re.sub(r'\n{3,}', '\n\n', raw_text)
    
    # Split on question number pattern: "1." or "1 ." at start of line
    pattern = r'(?m)^(\d{1,3})[\.\s]'
    questions_raw = re.split(pattern, text)
    
    questions = []
    for i in range(1, len(questions_raw), 2):
        q_num = int(questions_raw[i])
        q_body = questions_raw[i+1].strip() if i+1 < len(questions_raw) else ''
        
        # Split off options (a), (b), (c), (d)
        opt_pattern = r'\(([a-d])\)\s*(.+?)(?=\([a-d]\)|$)'
        opts = re.findall(opt_pattern, q_body, re.DOTALL)
        
        # Everything before first option is the question text
        q_text_end = q_body.find('(a)') if '(a)' in q_body else len(q_body)
        q_text = q_body[:q_text_end].strip()
        
        if len(opts) == 4 and q_text:
            questions.append({
                'id': q_num,
                'text': q_text,
                'options': [{'id': o[0], 'text': o[1].strip()} for o in opts],
                'correctOption': None  # filled from answer key
            })
    
    return questions
```

### Step 4 — Merge Answer Keys (`4_merge_papers.py`)
```python
# Answer key pages are already visible in the PDF (e.g. page 90 = CMSE 2010 Paper II key)
# Parse the answer key table and merge correct answers into question JSON

def parse_answer_key(key_text):
    """Extract Q number → answer letter mapping from answer key OCR text."""
    pattern = r'(\d+)\s+([a-d])'
    matches = re.findall(pattern, key_text.lower())
    return {int(q): ans for q, ans in matches}
```

---

## Analysis Metrics Calculated

```typescript
// lib/utils.ts

export function calculateScore(answers: AnswerRecord[], paper: Paper) {
  const mpq = paper.marksPerQuestion;
  const neg = paper.negativeMarking;
  
  let correct = 0, wrong = 0, skipped = 0;
  for (const a of answers) {
    const q = getQuestion(paper, a.questionId);
    if (!a.selectedOption) { skipped++; continue; }
    if (a.selectedOption === q.correctOption) correct++;
    else wrong++;
  }
  
  const score = (correct * mpq) - (wrong * mpq * neg);
  const accuracy = correct / (correct + wrong) * 100;
  return { score, correct, wrong, skipped, accuracy };
}

export function getSubjectBreakdown(answers: AnswerRecord[], paper: Paper): SubjectStats[] {
  // Groups by subject → calculates per-subject accuracy
}

export function getSpeedAccuracy(answers: AnswerRecord[], paper: Paper) {
  // Returns array of { time, isCorrect } for scatter plot
  // Insight: were quick answers more or less accurate?
}

export function getTimePerQuestion(answers: AnswerRecord[]) {
  // Returns sorted array for bar chart: { questionId, seconds, outcome }
}
```

---

## Design System

### Palette
```
Background:   #0F1117   (deep ink — exam focus mode)
Surface:      #1A1D27   (card background)
Accent:       #4F8EF7   (civil service blue)
Success:      #34D399   (correct answers)
Error:        #F87171   (wrong answers)
Warning:      #FBBF24   (marked for review)
Text:         #E8EAF0   (primary)
Muted:        #8B90A0   (secondary)
```

### Typography
```
Display:  DM Serif Display   — authority, print-quality headings
Body:     Inter              — clean readability under exam conditions  
Mono:     JetBrains Mono     — timer digits, question numbers
```

### Signature UI: The Question Palette
The right-hand sidebar shows a grid of numbered squares that shift colour as the user progresses — grey (unseen) → amber (visited, no answer) → blue (answered) → purple (marked for review). This mirrors a physical OMR sheet and is the visual anchor of the exam experience.

---

## Setup & Commands

```bash
# 1. Scaffold project
npx create-next-app@latest upsc-cms --typescript --tailwind --app
cd upsc-cms

# 2. Install dependencies
npm install zustand recharts drizzle-orm @libsql/client uuid
npm install -D drizzle-kit @types/uuid

# 3. Install shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button dialog badge progress tooltip sheet

# 4. Add Google Fonts to layout.tsx
# DM Serif Display, Inter, JetBrains Mono (via next/font/google)

# 5. Set up Turso DB
npx turso db create upsc-cms
npx turso db tokens create upsc-cms
# Add TURSO_DATABASE_URL and TURSO_AUTH_TOKEN to .env.local

# 6. Push DB schema
npx drizzle-kit push

# 7. OCR pipeline (Python, run once)
pip install pytesseract pillow google-cloud-vision
pip install poppler-utils  # or install via apt/brew

bash scripts/1_rasterize_pdf.sh
python scripts/2_ocr_pages.py
python scripts/3_parse_questions.py
python scripts/4_merge_papers.py
python scripts/5_validate_json.py

# 8. Start dev server
npm run dev
```

---

## `package.json` Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "zustand": "^4.5.0",
    "recharts": "^2.12.0",
    "drizzle-orm": "^0.30.0",
    "@libsql/client": "^0.6.0",
    "uuid": "^9.0.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-progress": "^1.0.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.378.0"
  },
  "devDependencies": {
    "drizzle-kit": "^0.20.0",
    "@types/uuid": "^9.0.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

---

## Execution Order (Build Sequence)

```
Phase 1 — Data (do this first, everything else depends on it)
  1. Run OCR pipeline on all PDF pages
  2. Parse and structure all year JSONs
  3. Manual review + corrections (especially medical terms)
  4. Validate all 10 JSON files with the validator script

Phase 2 — Core Exam
  5. Set up Next.js project with Tailwind + shadcn/ui
  6. Build home page with year cards
  7. Build exam page: question display, options, navigation
  8. Build timer hook (global countdown + per-question tracker)
  9. Build question palette sidebar
  10. Wire Zustand store to exam components
  11. Implement submit + save to Turso DB

Phase 3 — Analysis
  12. Build score summary cards
  13. Build accuracy donut chart
  14. Build time-per-question bar chart
  15. Build subject breakdown bars
  16. Build full question review list
  17. Add export to PDF feature (jsPDF or @react-pdf/renderer)

Phase 4 — Polish
  18. Keyboard shortcuts (arrow keys, M for mark, C for clear)
  19. Mobile responsiveness
  20. Deploy to Vercel + connect Turso
```

---

## Notes on the PDF

- **No 2010 paper found** — the PDF goes 2009 → 2011. Either 2010 was not included in this compilation or it's the Paper II labelled "CMSE 2010" on the answer key around page 90 (which may be an old reprint). Verify by checking the cover pages.
- **Two papers per year** — Paper I (General Ability + Medicine + Paediatrics) and Paper II (Surgery + OBG + PSM). Each is a separate 2-hour exam with 120 questions. You can either run them as two separate sessions or combine into one 240-question, 4-hour sitting — your choice.
- **Answer key pages are in the PDF** — each booklet ends with a printed answer key table, which is the authoritative source for correct answers. These must be OCR'd carefully.
- **Medical diagrams** — a small number of questions reference diagrams. These will need to be manually screenshotted from the PDF and saved as images referenced in the JSON.

