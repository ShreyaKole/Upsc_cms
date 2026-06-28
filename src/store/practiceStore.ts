import type { Question, Subject } from '../types';
import { QUESTIONS_DATABASE } from '../data/papers';

const PRACTICE_KEY = 'upsc_practice_progress';

export interface SubjectPracticeProgress {
  subject: Subject;
  totalQuestions: number;
  attempted: number;
  correct: number;
  answers: Record<number, { selectedOption: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean }>;
}

export class PracticeManager {
  static getSubjectQuestions(subject: Subject): Question[] {
    const allQuestions: Question[] = [];
    const seenTexts = new Set<string>();

    Object.values(QUESTIONS_DATABASE).forEach((paperQuestions) => {
      paperQuestions.forEach((q) => {
        if (q.subject === subject) {
          const coreText = q.text.replace(/\[UPSC CMS \d+ Paper (I|II) Q\d+\]\s*/, '');
          if (!seenTexts.has(coreText)) {
            seenTexts.add(coreText);
            allQuestions.push({
              ...q,
              text: coreText
            });
          }
        }
      });
    });

    return allQuestions;
  }

  static getAllSubjectsWithCounts(): Array<{ subject: Subject; totalQuestions: number }> {
    const subjectList: Subject[] = [
      'General Medicine',
      'Paediatrics',
      'Surgery',
      'Obstetrics & Gynaecology',
      'Preventive & Social Medicine (SPM)',
      'General Ability'
    ];

    return subjectList.map((sub) => ({
      subject: sub,
      totalQuestions: this.getSubjectQuestions(sub).length
    }));
  }

  static getProgress(userId: string, subject: Subject): SubjectPracticeProgress {
    const questions = this.getSubjectQuestions(subject);
    try {
      const stored = localStorage.getItem(`${PRACTICE_KEY}_${userId}_${subject}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          totalQuestions: questions.length
        };
      }
    } catch {
      // ignore error
    }

    return {
      subject,
      totalQuestions: questions.length,
      attempted: 0,
      correct: 0,
      answers: {}
    };
  }

  static recordAnswer(
    userId: string,
    subject: Subject,
    questionId: number,
    selectedOption: 'A' | 'B' | 'C' | 'D',
    isCorrect: boolean
  ): SubjectPracticeProgress {
    const progress = this.getProgress(userId, subject);
    const existingAns = progress.answers[questionId];

    if (!existingAns) {
      progress.attempted += 1;
      if (isCorrect) progress.correct += 1;
    } else if (existingAns.isCorrect !== isCorrect) {
      if (isCorrect) progress.correct += 1;
      else progress.correct = Math.max(0, progress.correct - 1);
    }

    progress.answers[questionId] = { selectedOption, isCorrect };

    try {
      localStorage.setItem(`${PRACTICE_KEY}_${userId}_${subject}`, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save practice progress', e);
    }

    return progress;
  }
}
