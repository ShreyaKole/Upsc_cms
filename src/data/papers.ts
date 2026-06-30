import type { Paper, Question } from '../types';

const YEARS = [2025, 2024, 2023, 2022, 2021, 2019, 2018, 2017, 2016, 2014, 2013, 2012, 2011, 2009];

export const PAPERS: Paper[] = [];

YEARS.forEach((yr) => {
  PAPERS.push({
    id: `upsc-cms-${yr}-p1`,
    year: yr,
    title: `UPSC CMS ${yr} Paper I (General Medicine & Paediatrics)`,
    category: 'CMS Paper I',
    totalQuestions: 0,
    totalMarks: 250,
    marksPerQuestion: 2.083,
    negativeMarking: 0.69,
    durationMinutes: 120,
    description: `Official 2-Hour Paper I for ${yr} (Awaiting new question upload).`
  });

  PAPERS.push({
    id: `upsc-cms-${yr}-p2`,
    year: yr,
    title: `UPSC CMS ${yr} Paper II (Surgery, OBGY & SPM)`,
    category: 'CMS Paper II',
    totalQuestions: 0,
    totalMarks: 250,
    marksPerQuestion: 2.083,
    negativeMarking: 0.69,
    durationMinutes: 120,
    description: `Official 2-Hour Paper II for ${yr} (Awaiting new question upload).`
  });
});

export const QUESTIONS_DATABASE: Record<string, Question[]> = {};

YEARS.forEach((yr) => {
  QUESTIONS_DATABASE[`upsc-cms-${yr}-p1`] = [];
  QUESTIONS_DATABASE[`upsc-cms-${yr}-p2`] = [];
});
