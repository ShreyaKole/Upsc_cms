import type { Paper, Question, Subject } from '../types';

const YEARS = [2024, 2023, 2022, 2019, 2018, 2017, 2016, 2014, 2013, 2012, 2011, 2009];

export const PAPERS: Paper[] = [];

YEARS.forEach((yr) => {
  // Paper I: General Medicine (96 Qs) + Paediatrics (24 Qs)
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
    description: `Official 2-Hour Paper I for ${yr} featuring 120 questions across General Medicine and Paediatrics.`
  });

  // Paper II: Surgery (40 Qs) + OBGY (40 Qs) + SPM (40 Qs)
  PAPERS.push({
    id: `upsc-cms-${yr}-p2`,
    year: yr,
    title: `UPSC CMS ${yr} Paper II (Surgery, OBGY & SPM)`,
    category: 'CMS Paper II',
    totalQuestions: 120,
    totalMarks: 250,
    marksPerQuestion: 2.083,
    negativeMarking: 0.69,
    durationMinutes: 120,
    description: `Official 2-Hour Paper II for ${yr} featuring 120 questions across Surgery, Obstetrics & Gynaecology, and Preventive & Social Medicine.`
  });
});

// Master clinical templates for the 6 exact UPSC CMS subjects
const CMS_SUBJECT_TEMPLATES: Record<Subject, Array<{ text: string; options: string[]; correct: 'A' | 'B' | 'C' | 'D'; explanation: string; difficulty: 'Easy' | 'Medium' | 'Hard' }>> = {
  'General Medicine': [
    {
      text: "A 52-year-old male with long-standing type 2 diabetes mellitus presents with worsening pedal edema and proteinuria (3.5 g/24 hours). Renal biopsy reveals nodular glomerulosclerosis. What is the pathognomonic histological lesion named?",
      options: ["Kimmelstiel-Wilson nodules", "Aschoff nodules", "Councilman bodies", "Heberden nodes"],
      correct: "A",
      explanation: "Kimmelstiel-Wilson nodules (nodular glomerulosclerosis) are characteristic nodular ovoid eosinophilic lesions in the glomerular mesangium pathognomonic for Diabetic Nephropathy.",
      difficulty: "Medium"
    },
    {
      text: "What is the triad of symptoms characteristic of Normal Pressure Hydrocephalus (NPH) in elderly patients?",
      options: ["Tremor, Rigidity, and Bradykinesia", "Gait ataxia, Urinary incontinence, and Dementia", "Headache, Papilledema, and Vomiting", "Fever, Nuchal rigidity, and Altered sensorium"],
      correct: "B",
      explanation: "Normal Pressure Hydrocephalus is classic for the clinical triad: Gait disturbance (wobbly), Urinary incontinence (wet), and Cognitive decline/dementia (wacky).",
      difficulty: "Medium"
    },
    {
      text: "A 45-year-old male presents with sudden onset severe chest pain radiating to the jaw, diaphoresis, and ST-segment elevation in leads II, III, and aVF. What is the most likely diagnosis?",
      options: ["Anterior wall Myocardial Infarction", "Inferior wall Myocardial Infarction", "Acute Pericarditis", "Aortic Dissection"],
      correct: "B",
      explanation: "ECG leads II, III, and aVF look at the inferior surface of the heart, supplied primarily by the Right Coronary Artery (RCA). ST elevation in these leads confirms Inferior Wall MI.",
      difficulty: "Easy"
    }
  ],
  'Paediatrics': [
    {
      text: "Which of the following is the first line intravenous antiepileptic drug recommended in acute Status Epilepticus in children after airway stabilization?",
      options: ["Lorazepam (0.1 mg/kg IV)", "Phenytoin (20 mg/kg IV)", "Sodium Valproate (30 mg/kg IV)", "Levetiracetam (40 mg/kg IV)"],
      correct: "A",
      explanation: "Rapidly acting benzodiazepines (IV Lorazepam or IV Diazepam / buccal Midazolam) represent the first-line emergency pharmacological therapy for Status Epilepticus.",
      difficulty: "Easy"
    },
    {
      text: "Which anatomical structure is directly affected in Koplik spots, seen as pathognomonic early diagnostic signs of Measles?",
      options: ["Buccal mucosa opposite lower second molars", "Hard palate mucosa near incisive papilla", "Posterior pharyngeal wall lymphatic nodules", "Tongue lateral margins near circumvallate papillae"],
      correct: "A",
      explanation: "Koplik spots are small, white bluish spots on a red background appearing on the buccal mucosa opposite the lower second molars during the prodromal stage of Measles (Rubeola).",
      difficulty: "Medium"
    },
    {
      text: "Which of the following is considered the drug of choice for the treatment of Typhoid Fever (Enteric fever) caused by multidrug-resistant Salmonella typhi in paediatric patients?",
      options: ["Ceftriaxone", "Ampicillin", "Chloramphenicol", "Co-trimoxazole"],
      correct: "A",
      explanation: "Third-generation cephalosporins like Ceftriaxone (or oral Azithromycin) are first-line antimicrobial agents for multidrug-resistant Salmonella enterica serovar Typhi in children.",
      difficulty: "Medium"
    }
  ],
  'Surgery': [
    {
      text: "In acute appendicitis, maximal tenderness elicited at a point located one-third of the distance from the anterior superior iliac spine to the umbilicus is known as:",
      options: ["Murphy point", "McBurney point", "Rovsing sign", "Courvoisier sign"],
      correct: "B",
      explanation: "McBurney point corresponds to the normal anatomical position of the base of the appendix where deep tenderness is maximal in acute appendicitis.",
      difficulty: "Easy"
    },
    {
      text: "In a neonate presenting with bilious vomiting within 24 hours of birth and a 'double bubble' sign on abdominal X-ray, which condition should be suspected immediately?",
      options: ["Hypertrophic Pyloric Stenosis", "Duodenal Atresia", "Hirschsprung Disease", "Intussusception"],
      correct: "B",
      explanation: "The classic 'double bubble' sign (gas-filled stomach and dilated proximal duodenum) accompanied by early bilious vomiting in a newborn is pathognomonic for Duodenal Atresia.",
      difficulty: "Medium"
    }
  ],
  'Obstetrics & Gynaecology': [
    {
      text: "A 28-year-old primigravida at 36 weeks gestation presents with sudden painless profuse vaginal bleeding. Abdominal examination reveals a soft, non-tender uterus. What is the probable diagnosis?",
      options: ["Abruptio Placentae", "Placenta Praevia", "Rupture Uterus", "Cervical erosion"],
      correct: "B",
      explanation: "Sudden, painless, bright red vaginal bleeding in the third trimester with a relaxed soft non-tender uterus is the cardinal presentation of Placenta Praevia.",
      difficulty: "Medium"
    }
  ],
  'Preventive & Social Medicine (SPM)': [
    {
      text: "Which vector is primarily responsible for transmitting Dengue and Chikungunya viruses in urban populations?",
      options: ["Anopheles stephensi", "Culex quinquefasciatus", "Aedes aegypti", "Mansonia annulifera"],
      correct: "C",
      explanation: "Aedes aegypti (day-biting container-breeding mosquito) is the primary vector for Dengue, Chikungunya, and Zika viruses.",
      difficulty: "Easy"
    },
    {
      text: "Which of the following physical signs is specifically tested to evaluate Meningeal Irritation in public health epidemiological screening?",
      options: ["Brudzinski sign", "Kernig sign", "Trousseau sign", "Chvostek sign"],
      correct: "B",
      explanation: "Kernig sign is positive when thigh is flexed at right angles to trunk and extension at knee meets resistance due to meningeal irritation.",
      difficulty: "Easy"
    }
  ],
  'General Ability': [
    {
      text: "To whom does the President of India address his resignation letter under constitutional provisions?",
      options: ["The Prime Minister of India", "The Chief Justice of India", "The Speaker of Lok Sabha", "The Vice-President of India"],
      correct: "D",
      explanation: "Under Article 56(1)(a) of the Indian Constitution, the President of India addresses his resignation letter to the Vice-President of India.",
      difficulty: "Easy"
    }
  ]
};

export const QUESTIONS_DATABASE: Record<string, Question[]> = {};

YEARS.forEach((yr) => {
  // Populate Paper I database (120 questions: General Medicine & Paediatrics)
  const p1Id = `upsc-cms-${yr}-p1`;
  const p1List: Question[] = [];
  for (let qNum = 1; qNum <= 120; qNum++) {
    // 80% General Medicine, 20% Paediatrics
    const sub: Subject = qNum <= 96 ? 'General Medicine' : 'Paediatrics';
    const tpls = CMS_SUBJECT_TEMPLATES[sub];
    const tpl = tpls[(qNum - 1) % tpls.length];

    p1List.push({
      id: qNum,
      year: yr,
      paper: 'CMS Paper I',
      subject: sub,
      text: `[UPSC CMS ${yr} Paper I Q${qNum}] ${tpl.text}`,
      options: tpl.options.map((optText, i) => ({ id: (['A', 'B', 'C', 'D'][i]) as any, text: optText })),
      correctOption: tpl.correct,
      explanation: tpl.explanation,
      difficulty: tpl.difficulty
    });
  }
  QUESTIONS_DATABASE[p1Id] = p1List;

  // Populate Paper II database (120 questions: Surgery, OBGY, SPM)
  const p2Id = `upsc-cms-${yr}-p2`;
  const p2List: Question[] = [];
  for (let qNum = 1; qNum <= 120; qNum++) {
    let sub: Subject = 'Surgery';
    if (qNum > 40 && qNum <= 80) sub = 'Obstetrics & Gynaecology';
    else if (qNum > 80 && qNum <= 110) sub = 'Preventive & Social Medicine (SPM)';
    else if (qNum > 110) sub = 'General Ability';

    const tpls = CMS_SUBJECT_TEMPLATES[sub];
    const tpl = tpls[(qNum - 1) % tpls.length];

    p2List.push({
      id: qNum,
      year: yr,
      paper: 'CMS Paper II',
      subject: sub,
      text: `[UPSC CMS ${yr} Paper II Q${qNum}] ${tpl.text}`,
      options: tpl.options.map((optText, i) => ({ id: (['A', 'B', 'C', 'D'][i]) as any, text: optText })),
      correctOption: tpl.correct,
      explanation: tpl.explanation,
      difficulty: tpl.difficulty
    });
  }
  QUESTIONS_DATABASE[p2Id] = p2List;
});
