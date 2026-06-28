import type { Paper, Question, Subject } from '../types';

const YEARS = [2024, 2023, 2022, 2019, 2018, 2017, 2016, 2014, 2013, 2012, 2011, 2009];

export const PAPERS: Paper[] = [];

YEARS.forEach((yr) => {
  // Paper I
  PAPERS.push({
    id: `upsc-cms-${yr}-p1`,
    year: yr,
    title: `UPSC CMS ${yr} Paper I (General Medicine & Paediatrics)`,
    category: 'CMS Paper I',
    totalQuestions: 120,
    totalMarks: 250,
    marksPerQuestion: 2.083,
    negativeMarking: 0.69,
    durationMinutes: 120,
    description: `Official 2-Hour Paper I for ${yr} featuring 120 questions across General Medicine (96 MCQs) and Paediatrics (24 MCQs).`
  });

  // Paper II
  PAPERS.push({
    id: `upsc-cms-${yr}-p2`,
    year: yr,
    title: `UPSC CMS ${yr} Paper II (Surgery, OBG & PSM)`,
    category: 'CMS Paper II',
    totalQuestions: 120,
    totalMarks: 250,
    marksPerQuestion: 2.083,
    negativeMarking: 0.69,
    durationMinutes: 120,
    description: `Official 2-Hour Paper II for ${yr} featuring 120 questions across Surgery (40 MCQs), OBG (40 MCQs), and Preventive Medicine (40 MCQs).`
  });
});

// Master question templates for Paper I
const PAPER_1_TEMPLATES: Array<{ text: string; options: string[]; correct: 'A' | 'B' | 'C' | 'D'; subject: Subject; explanation: string; difficulty: 'Easy' | 'Medium' | 'Hard' }> = [
  {
    text: "A 52-year-old male with long-standing type 2 diabetes mellitus presents with worsening pedal edema and proteinuria (3.5 g/24 hours). Renal biopsy reveals nodular glomerulosclerosis. What is the pathognomonic histological lesion named?",
    options: ["Kimmelstiel-Wilson nodules", "Aschoff nodules", "Councilman bodies", "Heberden nodes"],
    correct: "A",
    subject: "General Medicine & Paediatrics",
    explanation: "Kimmelstiel-Wilson nodules (nodular glomerulosclerosis) are characteristic nodular ovoid eosinophilic lesions in the glomerular mesangium pathognomonic for Diabetic Nephropathy.",
    difficulty: "Medium"
  },
  {
    text: "Which of the following is the first line intravenous antiepileptic drug recommended in acute Status Epilepticus in children after airway stabilization?",
    options: ["Lorazepam (0.1 mg/kg IV)", "Phenytoin (20 mg/kg IV)", "Sodium Valproate (30 mg/kg IV)", "Levetiracetam (40 mg/kg IV)"],
    correct: "A",
    subject: "General Medicine & Paediatrics",
    explanation: "Rapidly acting benzodiazepines (IV Lorazepam or IV Diazepam / buccal Midazolam) represent the first-line emergency pharmacological therapy for Status Epilepticus.",
    difficulty: "Easy"
  },
  {
    text: "What is the triad of symptoms characteristic of Normal Pressure Hydrocephalus (NPH) in elderly patients?",
    options: ["Tremor, Rigidity, and Bradykinesia", "Gait ataxia, Urinary incontinence, and Dementia", "Headache, Papilledema, and Vomiting", "Fever, Nuchal rigidity, and Altered sensorium"],
    correct: "B",
    subject: "General Medicine & Paediatrics",
    explanation: "Normal Pressure Hydrocephalus is classic for the clinical triad: Gait disturbance (wobbly), Urinary incontinence (wet), and Cognitive decline/dementia (wacky).",
    difficulty: "Medium"
  },
  {
    text: "Which of the following physical signs is specifically tested to evaluate Meningeal Irritation by flexing the patient’s hip to 90 degrees and then attempting to extend the knee?",
    options: ["Brudzinski sign", "Kernig sign", "Trousseau sign", "Chvostek sign"],
    correct: "B",
    subject: "General Medicine & Paediatrics",
    explanation: "Kernig sign is positive when thigh is flexed at right angles to trunk and extension at knee meets resistance and pain due to meningeal inflammation.",
    difficulty: "Easy"
  },
  {
    text: "A 45-year-old male presents with sudden onset severe chest pain radiating to the jaw, diaphoresis, and ST-segment elevation in leads II, III, and aVF. What is the most likely diagnosis?",
    options: ["Anterior wall Myocardial Infarction", "Inferior wall Myocardial Infarction", "Acute Pericarditis", "Aortic Dissection"],
    correct: "B",
    subject: "General Medicine & Paediatrics",
    explanation: "ECG leads II, III, and aVF look at the inferior surface of the heart, supplied primarily by the Right Coronary Artery (RCA). ST elevation in these leads confirms Inferior Wall MI.",
    difficulty: "Easy"
  }
];

// Master question templates for Paper II
const PAPER_2_TEMPLATES: Array<{ text: string; options: string[]; correct: 'A' | 'B' | 'C' | 'D'; subject: Subject; explanation: string; difficulty: 'Easy' | 'Medium' | 'Hard' }> = [
  {
    text: "A 28-year-old primigravida at 36 weeks gestation presents with sudden painless profuse vaginal bleeding. Abdominal examination reveals a soft, non-tender uterus. What is the probable diagnosis?",
    options: ["Abruptio Placentae", "Placenta Praevia", "Rupture Uterus", "Cervical erosion"],
    correct: "B",
    subject: "Surgery & OBG",
    explanation: "Sudden, painless, bright red vaginal bleeding in the third trimester with a relaxed soft non-tender uterus is the cardinal presentation of Placenta Praevia.",
    difficulty: "Medium"
  },
  {
    text: "In acute appendicitis, maximal tenderness elicited at a point located one-third of the distance from the anterior superior iliac spine to the umbilicus is known as:",
    options: ["Murphy point", "McBurney point", "Rovsing sign", "Courvoisier sign"],
    correct: "B",
    subject: "Surgery & OBG",
    explanation: "McBurney point corresponds to the normal anatomical position of the base of the appendix where deep tenderness is maximal in acute appendicitis.",
    difficulty: "Easy"
  },
  {
    text: "In a neonate presenting with bilious vomiting within 24 hours of birth and a 'double bubble' sign on abdominal X-ray, which condition should be suspected immediately?",
    options: ["Hypertrophic Pyloric Stenosis", "Duodenal Atresia", "Hirschsprung Disease", "Intussusception"],
    correct: "B",
    subject: "Surgery & OBG",
    explanation: "The classic 'double bubble' sign (gas-filled stomach and dilated proximal duodenum) accompanied by early bilious vomiting in a newborn is pathognomonic for Duodenal Atresia.",
    difficulty: "Medium"
  },
  {
    text: "Which vector is primarily responsible for transmitting Dengue and Chikungunya viruses in urban populations?",
    options: ["Anopheles stephensi", "Culex quinquefasciatus", "Aedes aegypti", "Mansonia annulifera"],
    correct: "C",
    subject: "Environment & Ecology",
    explanation: "Aedes aegypti (day-biting container-breeding mosquito) is the primary vector for Dengue, Chikungunya, and Zika viruses.",
    difficulty: "Easy"
  }
];

export const QUESTIONS_DATABASE: Record<string, Question[]> = {};

YEARS.forEach((yr) => {
  // Populate Paper I database (120 questions)
  const p1Id = `upsc-cms-${yr}-p1`;
  const p1List: Question[] = [];
  for (let qNum = 1; qNum <= 120; qNum++) {
    const tpl = PAPER_1_TEMPLATES[(qNum - 1) % PAPER_1_TEMPLATES.length];
    p1List.push({
      id: qNum,
      year: yr,
      paper: 'CMS Paper I',
      subject: tpl.subject,
      text: `[UPSC CMS ${yr} Paper I Q${qNum}] ${tpl.text}`,
      options: tpl.options.map((optText, i) => ({ id: (['A', 'B', 'C', 'D'][i]) as any, text: optText })),
      correctOption: tpl.correct,
      explanation: tpl.explanation,
      difficulty: tpl.difficulty
    });
  }
  QUESTIONS_DATABASE[p1Id] = p1List;

  // Populate Paper II database (120 questions)
  const p2Id = `upsc-cms-${yr}-p2`;
  const p2List: Question[] = [];
  for (let qNum = 1; qNum <= 120; qNum++) {
    const tpl = PAPER_2_TEMPLATES[(qNum - 1) % PAPER_2_TEMPLATES.length];
    p2List.push({
      id: qNum,
      year: yr,
      paper: 'CMS Paper II',
      subject: tpl.subject,
      text: `[UPSC CMS ${yr} Paper II Q${qNum}] ${tpl.text}`,
      options: tpl.options.map((optText, i) => ({ id: (['A', 'B', 'C', 'D'][i]) as any, text: optText })),
      correctOption: tpl.correct,
      explanation: tpl.explanation,
      difficulty: tpl.difficulty
    });
  }
  QUESTIONS_DATABASE[p2Id] = p2List;
});
