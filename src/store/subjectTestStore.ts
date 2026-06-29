import type { Paper, Question, Subject } from '../types';
import { PracticeManager } from './practiceStore';
import { QUESTIONS_DATABASE } from '../data/papers';

export interface SubjectTestPaper extends Paper {
  subject: Subject;
  testNumber: number;
}

let cachedSubjectTestPapers: SubjectTestPaper[] | null = null;

export class SubjectTestManager {
  static getSubjectTestPapers(): SubjectTestPaper[] {
    if (cachedSubjectTestPapers) {
      return cachedSubjectTestPapers;
    }

    const subjects: Subject[] = [
      'General Medicine',
      'Paediatrics',
      'Surgery',
      'Obstetrics & Gynaecology',
      'Preventive & Social Medicine (SPM)'
    ];

    const generatedPapers: SubjectTestPaper[] = [];

    subjects.forEach((sub) => {
      const allQuestions = PracticeManager.getSubjectQuestions(sub);
      const chunkSize = 120;
      const totalChunks = Math.ceil(allQuestions.length / chunkSize);

      for (let i = 0; i < totalChunks; i++) {
        const startIdx = i * chunkSize;
        const chunk = allQuestions.slice(startIdx, startIdx + chunkSize);
        const testNum = i + 1;
        const subSlug = sub.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        const paperId = `upsc-subjtest-${subSlug}-t${testNum}`;

        const reindexedQuestions: Question[] = chunk.map((q, idx) => ({
          ...q,
          id: idx + 1,
          paper: 'CMS Paper I'
        }));

        QUESTIONS_DATABASE[paperId] = reindexedQuestions;

        const marks = Math.round(chunk.length * 2.0833 * 100) / 100;
        const duration = chunk.length === 120 ? 120 : Math.max(20, Math.round((chunk.length / 120) * 120));

        generatedPapers.push({
          id: paperId,
          year: 2026,
          title: `${sub} Timed Test ${testNum}`,
          category: 'CMS Paper I',
          subject: sub,
          testNumber: testNum,
          totalQuestions: chunk.length,
          totalMarks: marks,
          marksPerQuestion: 2.083,
          negativeMarking: 0.69,
          durationMinutes: duration,
          description: `Official 2-Hour Subject Test ${testNum} for ${sub} containing ${chunk.length} sequential PYQ questions (Questions ${startIdx + 1} to ${startIdx + chunk.length}).`
        });
      }
    });

    cachedSubjectTestPapers = generatedPapers;
    return generatedPapers;
  }
}
