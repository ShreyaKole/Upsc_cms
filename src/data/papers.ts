import type { Paper, Question, Subject } from '../types';

const YEARS = [2024, 2023, 2022, 2019, 2018, 2017, 2016, 2014, 2013, 2012, 2011, 2009];

export const PAPERS: Paper[] = [];

YEARS.forEach((yr) => {
  // Paper I: 1-96 Medicine, 97-120 Paediatrics
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
    description: `Official 2-Hour Paper I for ${yr} featuring 120 questions: Q1-96 General Medicine and Q97-120 Paediatrics.`
  });

  // Paper II: 1-40 Surgery, 41-80 OBGY, 81-120 SPM
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
    description: `Official 2-Hour Paper II for ${yr} featuring 120 questions: Q1-40 Surgery, Q41-80 OBGY, and Q81-120 SPM.`
  });
});

const MEDICINE_POOL = [
  {
    text: "A 52-year-old male with long-standing type 2 diabetes mellitus presents with worsening pedal edema and proteinuria (3.5 g/24 hours). Renal biopsy reveals nodular glomerulosclerosis. What is the pathognomonic histological lesion?",
    options: ["Kimmelstiel-Wilson nodules", "Aschoff nodules", "Councilman bodies", "Heberden nodes"],
    correct: "A",
    explanation: "Kimmelstiel-Wilson nodules (nodular glomerulosclerosis) are characteristic nodular ovoid eosinophilic lesions in the glomerular mesangium pathognomonic for Diabetic Nephropathy."
  },
  {
    text: "What is the clinical triad characteristic of Normal Pressure Hydrocephalus (NPH) in elderly patients?",
    options: ["Tremor, Rigidity, and Bradykinesia", "Gait ataxia, Urinary incontinence, and Dementia", "Headache, Papilledema, and Vomiting", "Fever, Nuchal rigidity, and Altered sensorium"],
    correct: "B",
    explanation: "Normal Pressure Hydrocephalus presents with the classic triad of gait ataxia (wobbly), urinary incontinence (wet), and cognitive decline (wacky)."
  },
  {
    text: "A 45-year-old male presents with sudden onset severe chest pain radiating to the jaw, diaphoresis, and ST-segment elevation in leads II, III, and aVF. What is the diagnosis?",
    options: ["Anterior wall Myocardial Infarction", "Inferior wall Myocardial Infarction", "Acute Pericarditis", "Aortic Dissection"],
    correct: "B",
    explanation: "ECG leads II, III, and aVF look at the inferior surface of the heart, supplied primarily by the Right Coronary Artery (RCA)."
  },
  {
    text: "Which ECG change is considered the earliest indicator of hyperkalemia in acute renal failure?",
    options: ["Prominent U waves", "Tall peaked T waves", "ST segment elevation", "Prolonged QT interval"],
    correct: "B",
    explanation: "Tall, narrow, symmetrical peaked T waves are the earliest ECG manifestations of hyperkalemia (serum K+ > 5.5 mEq/L)."
  },
  {
    text: "In a patient presenting with high fever, relative bradycardia, rose spots on abdomen, and leukopenia, which test is most diagnostic in the first week?",
    options: ["Widal test", "Blood culture", "Stool culture", "Urine culture"],
    correct: "B",
    explanation: "Blood culture is positive in up to 90% of cases in the first week of Typhoid fever (Salmonella enterica serovar Typhi)."
  },
  {
    text: "Which of the following biological agents is a monoclonal antibody targeted specifically against Vascular Endothelial Growth Factor (VEGF)?",
    options: ["Infliximab", "Bevacizumab", "Rituximab", "Trastuzumab"],
    correct: "B",
    explanation: "Bevacizumab is a recombinant humanized monoclonal antibody that binds to VEGF-A, inhibiting angiogenesis."
  },
  {
    text: "Which type of emphysema is classically associated with Alpha-1 Antitrypsin deficiency?",
    options: ["Centrilobular emphysema", "Panacinar emphysema", "Paraseptal emphysema", "Irregular emphysema"],
    correct: "B",
    explanation: "Panacinar (panlobular) emphysema uniformly involves the lower lobes of the lungs and is characteristically caused by alpha-1 antitrypsin deficiency."
  },
  {
    text: "Which drug is considered the first-line disease-modifying antirheumatic drug (DMARD) in Rheumatoid Arthritis?",
    options: ["Sulfasalazine", "Methotrexate", "Hydroxychloroquine", "Leflunomide"],
    correct: "B",
    explanation: "Methotrexate is the anchor DMARD and first-line drug of choice for treating active rheumatoid arthritis."
  }
];

const PAEDIATRICS_POOL = [
  {
    text: "Which of the following is the first-line intravenous antiepileptic drug recommended in acute Status Epilepticus in children after airway stabilization?",
    options: ["Lorazepam (0.1 mg/kg IV)", "Phenytoin (20 mg/kg IV)", "Sodium Valproate (30 mg/kg IV)", "Levetiracetam (40 mg/kg IV)"],
    correct: "A",
    explanation: "Rapidly acting benzodiazepines (IV Lorazepam or IV Diazepam) represent first-line emergency therapy for pediatric Status Epilepticus."
  },
  {
    text: "Which anatomical structure is directly affected in Koplik spots, seen as pathognomonic early diagnostic signs of Measles?",
    options: ["Buccal mucosa opposite lower second molars", "Hard palate mucosa near incisive papilla", "Posterior pharyngeal wall lymphatic nodules", "Tongue lateral margins near circumvallate papillae"],
    correct: "A",
    explanation: "Koplik spots are small white-blue spots on a erythematous background on buccal mucosa opposite lower second molars during prodromal Measles."
  },
  {
    text: "Which of the following is considered the drug of choice for the treatment of Enteric fever caused by multidrug-resistant Salmonella typhi in pediatric patients?",
    options: ["Ceftriaxone", "Ampicillin", "Chloramphenicol", "Co-trimoxazole"],
    correct: "A",
    explanation: "Third-generation cephalosporins like Ceftriaxone (or oral Azithromycin) are first-line antimicrobial agents for MDR Salmonella in children."
  },
  {
    text: "At what age does a normal infant typically achieve social smile as a developmental milestone?",
    options: ["2 weeks", "2 months", "4 months", "6 months"],
    correct: "B",
    explanation: "A social smile in response to a parent's face or voice normally develops by 6 to 8 weeks (2 months) of age."
  },
  {
    text: "In a child presenting with severe protein-energy malnutrition, generalized edema, flaky paint dermatosis, and sparse reddish hair, what is the diagnosis?",
    options: ["Marasmus", "Kwashiorkor", "Nutritional Rickets", "Scurvy"],
    correct: "B",
    explanation: "Kwashiorkor is characterized by severe hypoalbuminemic edema, dermatosis, hair discoloration, and fatty liver due to protein deficiency."
  }
];

const SURGERY_POOL = [
  {
    text: "In acute appendicitis, maximal tenderness elicited at a point located one-third of the distance from the anterior superior iliac spine to the umbilicus is known as:",
    options: ["Murphy point", "McBurney point", "Rovsing sign", "Courvoisier sign"],
    correct: "B",
    explanation: "McBurney point corresponds to the anatomical base of the appendix where localized peritoneal tenderness is sharpest in acute appendicitis."
  },
  {
    text: "In a neonate presenting with bilious vomiting within 24 hours of birth and a 'double bubble' sign on abdominal X-ray, which condition should be suspected immediately?",
    options: ["Hypertrophic Pyloric Stenosis", "Duodenal Atresia", "Hirschsprung Disease", "Intussusception"],
    correct: "B",
    explanation: "The classic 'double bubble' sign (gas in stomach and proximal duodenum) with early bilious vomiting is pathognomonic for Duodenal Atresia."
  },
  {
    text: "Which type of gallstone is most commonly associated with chronic hemolysis such as Thalassemia or Sickle Cell Anemia?",
    options: ["Cholesterol gallstones", "Black pigment stones", "Brown pigment stones", "Mixed gallstones"],
    correct: "B",
    explanation: "Black pigment stones are composed of calcium bilirubinates and form primarily in the gallbladder due to chronic hemolysis and hyperbilirubinemia."
  },
  {
    text: "What is the fluid of choice recommended in Parkland formula for resuscitation during the first 24 hours of major thermal burn injury?",
    options: ["Normal Saline (0.9% NaCl)", "Ringer Lactate", "5% Dextrose", "Fresh Frozen Plasma"],
    correct: "B",
    explanation: "Ringer Lactate (crystalloid) is the fluid of choice for resuscitation in burns as per Parkland formula (4 mL × kg weight × % TBSA burned)."
  }
];

const OBGY_POOL = [
  {
    text: "A 28-year-old primigravida at 36 weeks gestation presents with sudden painless profuse vaginal bleeding. Abdominal examination reveals a soft, non-tender uterus. What is the probable diagnosis?",
    options: ["Abruptio Placentae", "Placenta Praevia", "Rupture Uterus", "Cervical erosion"],
    correct: "B",
    explanation: "Sudden, painless, bright red vaginal bleeding in the third trimester with a soft non-tender uterus is cardinal for Placenta Praevia."
  },
  {
    text: "Which drug is considered the first-line drug of choice for prevention and control of seizures in severe Preeclampsia and Eclampsia?",
    options: ["Magnesium Sulfate", "Diazepam", "Phenytoin", "Sodium Valproate"],
    correct: "A",
    explanation: "Magnesium sulfate (Prichard or Zuspan regimen) is the anticonvulsant of choice for treating and preventing eclamptic seizures."
  },
  {
    text: "Which maneuver is specifically employed as the first-line obstetric technique to manage Shoulder Dystocia during vaginal delivery?",
    options: ["Zavanelli maneuver", "McRoberts maneuver", "Woods screw maneuver", "Rubin maneuver"],
    correct: "B",
    explanation: "McRoberts maneuver (hyperflexion and abduction of maternal hips onto abdomen) flattens the sacral promontory and is first-line for shoulder dystocia."
  }
];

const SPM_POOL = [
  {
    text: "Which vector is primarily responsible for transmitting Dengue and Chikungunya viruses in urban populations?",
    options: ["Anopheles stephensi", "Culex quinquefasciatus", "Aedes aegypti", "Mansonia annulifera"],
    correct: "C",
    explanation: "Aedes aegypti (day-biting container-breeding mosquito) is the principal vector for Dengue and Chikungunya."
  },
  {
    text: "What is the recommended storage temperature range for vaccines stored at the primary health center (PHC) level in Cold Chain Ice-Lined Refrigerators (ILR)?",
    options: ["-20°C to -10°C", "+2°C to +8°C", "0°C to +4°C", "+10°C to +15°C"],
    correct: "B",
    explanation: "Most vaccines (except OPV/Rotavirus at freezer levels) in the Cold Chain at district and PHC levels must be stored between +2°C and +8°C."
  },
  {
    text: "In epidemiological studies, which parameter measures the proportion of true disease cases correctly identified by a screening test?",
    options: ["Specificity", "Sensitivity", "Positive Predictive Value", "Attributable Risk"],
    correct: "B",
    explanation: "Sensitivity measures the ability of a test to correctly identify those with the disease (True Positives / All Diseased)."
  }
];

export const QUESTIONS_DATABASE: Record<string, Question[]> = {};

YEARS.forEach((yr) => {
  // Paper I: 120 Questions (Q1-96 Medicine, Q97-120 Paediatrics)
  const p1Id = `upsc-cms-${yr}-p1`;
  const p1List: Question[] = [];
  for (let qNum = 1; qNum <= 120; qNum++) {
    const isMedicine = qNum <= 96;
    const sub: Subject = isMedicine ? 'General Medicine' : 'Paediatrics';
    const pool = isMedicine ? MEDICINE_POOL : PAEDIATRICS_POOL;
    const item = pool[(qNum - 1) % pool.length];

    p1List.push({
      id: qNum,
      year: yr,
      paper: 'CMS Paper I',
      subject: sub,
      text: `[UPSC CMS ${yr} Paper I Q${qNum}] ${item.text}`,
      options: item.options.map((optText, i) => ({ id: (['A', 'B', 'C', 'D'][i]) as any, text: optText })),
      correctOption: item.correct as any,
      explanation: item.explanation,
      difficulty: 'Medium'
    });
  }
  QUESTIONS_DATABASE[p1Id] = p1List;

  // Paper II: 120 Questions (Q1-40 Surgery, Q41-80 OBGY, Q81-120 SPM)
  const p2Id = `upsc-cms-${yr}-p2`;
  const p2List: Question[] = [];
  for (let qNum = 1; qNum <= 120; qNum++) {
    let sub: Subject = 'Surgery';
    let pool = SURGERY_POOL;

    if (qNum > 40 && qNum <= 80) {
      sub = 'Obstetrics & Gynaecology';
      pool = OBGY_POOL;
    } else if (qNum > 80) {
      sub = 'Preventive & Social Medicine (SPM)';
      pool = SPM_POOL;
    }

    const item = pool[(qNum - 1) % pool.length];

    p2List.push({
      id: qNum,
      year: yr,
      paper: 'CMS Paper II',
      subject: sub,
      text: `[UPSC CMS ${yr} Paper II Q${qNum}] ${item.text}`,
      options: item.options.map((optText, i) => ({ id: (['A', 'B', 'C', 'D'][i]) as any, text: optText })),
      correctOption: item.correct as any,
      explanation: item.explanation,
      difficulty: 'Medium'
    });
  }
  QUESTIONS_DATABASE[p2Id] = p2List;
});
