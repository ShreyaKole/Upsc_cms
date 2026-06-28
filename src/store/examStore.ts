import type { ExamSession, ExamResult, Paper, AnswerRecord, SubjectStats } from '../types';
import { QUESTIONS_DATABASE } from '../data/papers';

const ACTIVE_SESSION_KEY = 'upsc_active_session';
const RESULTS_KEY = 'upsc_exam_results';

export class ExamManager {
  static getActiveSession(userId: string, paperId: string): ExamSession | null {
    try {
      const stored = localStorage.getItem(`${ACTIVE_SESSION_KEY}_${userId}_${paperId}`);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static startSession(userId: string, paper: Paper): ExamSession {
    const questions = QUESTIONS_DATABASE[paper.id] || [];
    const initialAnswers: Record<number, AnswerRecord> = {};

    questions.forEach((q) => {
      initialAnswers[q.id] = {
        questionId: q.id,
        selectedOption: null,
        isMarkedForReview: false,
        timeSpentSeconds: 0,
        visitCount: 0
      };
    });

    const session: ExamSession = {
      paperId: paper.id,
      year: paper.year,
      startedAt: new Date().toISOString(),
      answers: initialAnswers,
      currentIndex: 0,
      isSubmitted: false,
      timeRemainingSeconds: paper.durationMinutes * 60
    };

    localStorage.setItem(`${ACTIVE_SESSION_KEY}_${userId}_${paper.id}`, JSON.stringify(session));
    return session;
  }

  static updateSession(userId: string, session: ExamSession): void {
    try {
      localStorage.setItem(`${ACTIVE_SESSION_KEY}_${userId}_${session.paperId}`, JSON.stringify(session));
    } catch (e) {
      console.error('Failed to save exam session', e);
    }
  }

  static clearSession(userId: string, paperId: string): void {
    localStorage.removeItem(`${ACTIVE_SESSION_KEY}_${userId}_${paperId}`);
  }

  static submitExam(userId: string, paper: Paper, session: ExamSession): ExamResult {
    const questions = QUESTIONS_DATABASE[paper.id] || [];
    let score = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalUnattempted = 0;
    let totalFlagged = 0;

    const subjectMap: Record<string, { total: number; attempted: number; correct: number; wrong: number; marks: number }> = {};
    const answersArray: AnswerRecord[] = [];

    questions.forEach((q) => {
      const ans = session.answers[q.id] || {
        questionId: q.id,
        selectedOption: null,
        isMarkedForReview: false,
        timeSpentSeconds: 0,
        visitCount: 0
      };

      answersArray.push(ans);

      if (!subjectMap[q.subject]) {
        subjectMap[q.subject] = { total: 0, attempted: 0, correct: 0, wrong: 0, marks: 0 };
      }
      subjectMap[q.subject].total += 1;

      if (ans.isMarkedForReview) {
        totalFlagged += 1;
      }

      if (ans.selectedOption === null) {
        totalUnattempted += 1;
      } else {
        subjectMap[q.subject].attempted += 1;
        if (ans.selectedOption === q.correctOption) {
          totalCorrect += 1;
          score += paper.marksPerQuestion;
          subjectMap[q.subject].correct += 1;
          subjectMap[q.subject].marks += paper.marksPerQuestion;
        } else {
          totalWrong += 1;
          score -= paper.negativeMarking;
          subjectMap[q.subject].wrong += 1;
          subjectMap[q.subject].marks -= paper.negativeMarking;
        }
      }
    });

    const subjectBreakdown: SubjectStats[] = Object.keys(subjectMap).map((subKey) => {
      const data = subjectMap[subKey];
      const acc = data.attempted > 0 ? (data.correct / data.attempted) * 100 : 0;
      return {
        subject: subKey as any,
        totalQuestions: data.total,
        attempted: data.attempted,
        correct: data.correct,
        wrong: data.wrong,
        marksGained: Math.round(data.marks * 100) / 100,
        accuracy: Math.round(acc)
      };
    });

    const attemptedTotal = totalCorrect + totalWrong;
    const accuracy = attemptedTotal > 0 ? Math.round((totalCorrect / attemptedTotal) * 100) : 0;
    const totalTimeSpent = (paper.durationMinutes * 60) - Math.max(0, session.timeRemainingSeconds);

    const result: ExamResult = {
      id: `result_${paper.id}_${Date.now()}`,
      userId,
      paperId: paper.id,
      paperTitle: paper.title,
      year: paper.year,
      submittedAt: new Date().toISOString(),
      totalTimeSeconds: Math.max(1, totalTimeSpent),
      score: Math.round(score * 100) / 100,
      totalMarks: paper.totalMarks,
      totalCorrect,
      totalWrong,
      totalUnattempted,
      totalFlagged,
      accuracy,
      subjectBreakdown,
      answers: answersArray,
      questions
    };

    const existingResults = this.getAllResults(userId);
    existingResults.unshift(result);
    try {
      localStorage.setItem(`${RESULTS_KEY}_${userId}`, JSON.stringify(existingResults));
    } catch (e) {
      console.error('Failed to save exam result history', e);
    }

    this.clearSession(userId, paper.id);

    return result;
  }

  static getAllResults(userId: string): ExamResult[] {
    try {
      const stored = localStorage.getItem(`${RESULTS_KEY}_${userId}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static getResultById(userId: string, resultId: string): ExamResult | null {
    const results = this.getAllResults(userId);
    return results.find((r) => r.id === resultId) || null;
  }
}
