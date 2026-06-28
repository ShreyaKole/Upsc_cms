import React, { useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { GlobalStats } from './components/home/GlobalStats';
import { PaperCard } from './components/home/PaperCard';
import { TestHeader } from './components/test/TestHeader';
import { QuestionCard } from './components/test/QuestionCard';
import { QuestionPalette } from './components/test/QuestionPalette';
import { SubmitModal } from './components/test/SubmitModal';
import { ScoreCard } from './components/analysis/ScoreCard';
import { SubjectBreakdown } from './components/analysis/SubjectBreakdown';
import { QuestionReview } from './components/analysis/QuestionReview';
import { AuthScreen } from './components/auth/AuthScreen';

import { PAPERS, QUESTIONS_DATABASE } from './data/papers';
import { ExamManager } from './store/examStore';
import { AuthManager } from './store/authStore';
import type { Paper, ExamSession, ExamResult, OptionKey, User } from './types';
import { ArrowLeft, BookOpen } from 'lucide-react';

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<'home' | 'test' | 'analysis'>('home');
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [activeSession, setActiveSession] = useState<ExamSession | null>(null);
  const [activeResult, setActiveResult] = useState<ExamResult | null>(null);
  const [resultsHistory, setResultsHistory] = useState<ExamResult[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Load active logged in user session on mount
  useEffect(() => {
    const user = AuthManager.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setResultsHistory(ExamManager.getAllResults(user.id));
    }
  }, []);

  // Timer interval for active test session
  useEffect(() => {
    if (view !== 'test' || !activeSession || activeSession.isSubmitted || !currentUser) return;

    const timer = setInterval(() => {
      setActiveSession((prev) => {
        if (!prev) return null;
        if (prev.timeRemainingSeconds <= 1) {
          clearInterval(timer);
          handleForceSubmit(prev);
          return { ...prev, timeRemainingSeconds: 0 };
        }

        const updated = {
          ...prev,
          timeRemainingSeconds: prev.timeRemainingSeconds - 1
        };
        ExamManager.updateSession(currentUser.id, updated);
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [view, activeSession?.paperId, currentUser?.id]);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setResultsHistory(ExamManager.getAllResults(user.id));
    setView('home');
  };

  const handleLogout = () => {
    AuthManager.logout();
    setCurrentUser(null);
    setActiveSession(null);
    setActiveResult(null);
    setView('home');
  };

  const handleStartTest = (paper: Paper) => {
    if (!currentUser) return;
    setSelectedPaper(paper);
    let session = ExamManager.getActiveSession(currentUser.id, paper.id);
    if (!session) {
      session = ExamManager.startSession(currentUser.id, paper);
    }
    setActiveSession(session);
    setView('test');
  };

  const handleSelectOption = (option: OptionKey) => {
    if (!activeSession || !selectedPaper || !currentUser) return;
    const questions = QUESTIONS_DATABASE[selectedPaper.id] || [];
    const currentQ = questions[activeSession.currentIndex];
    if (!currentQ) return;

    const currentAns = activeSession.answers[currentQ.id] || {
      questionId: currentQ.id,
      selectedOption: null,
      isMarkedForReview: false,
      timeSpentSeconds: 0,
      visitCount: 0
    };

    const updatedAnswers = {
      ...activeSession.answers,
      [currentQ.id]: {
        ...currentAns,
        selectedOption: option
      }
    };

    const updatedSession = { ...activeSession, answers: updatedAnswers };
    setActiveSession(updatedSession);
    ExamManager.updateSession(currentUser.id, updatedSession);
  };

  const handleToggleReview = () => {
    if (!activeSession || !selectedPaper || !currentUser) return;
    const questions = QUESTIONS_DATABASE[selectedPaper.id] || [];
    const currentQ = questions[activeSession.currentIndex];
    if (!currentQ) return;

    const currentAns = activeSession.answers[currentQ.id] || {
      questionId: currentQ.id,
      selectedOption: null,
      isMarkedForReview: false,
      timeSpentSeconds: 0,
      visitCount: 0
    };

    const updatedAnswers = {
      ...activeSession.answers,
      [currentQ.id]: {
        ...currentAns,
        isMarkedForReview: !currentAns.isMarkedForReview
      }
    };

    const updatedSession = { ...activeSession, answers: updatedAnswers };
    setActiveSession(updatedSession);
    ExamManager.updateSession(currentUser.id, updatedSession);
  };

  const handleClearAnswer = () => {
    if (!activeSession || !selectedPaper || !currentUser) return;
    const questions = QUESTIONS_DATABASE[selectedPaper.id] || [];
    const currentQ = questions[activeSession.currentIndex];
    if (!currentQ) return;

    const currentAns = activeSession.answers[currentQ.id];
    if (!currentAns) return;

    const updatedAnswers = {
      ...activeSession.answers,
      [currentQ.id]: {
        ...currentAns,
        selectedOption: null
      }
    };

    const updatedSession = { ...activeSession, answers: updatedAnswers };
    setActiveSession(updatedSession);
    ExamManager.updateSession(currentUser.id, updatedSession);
  };

  const handleNavigateQuestion = (index: number) => {
    if (!activeSession || !currentUser) return;
    const updatedSession = { ...activeSession, currentIndex: index };
    setActiveSession(updatedSession);
    ExamManager.updateSession(currentUser.id, updatedSession);
  };

  const handleForceSubmit = (sessionToSubmit: ExamSession) => {
    if (!selectedPaper || !currentUser) return;
    const result = ExamManager.submitExam(currentUser.id, selectedPaper, sessionToSubmit);
    setActiveResult(result);
    setResultsHistory(ExamManager.getAllResults(currentUser.id));
    setIsSubmitModalOpen(false);
    setView('analysis');
  };

  const handleConfirmSubmit = () => {
    if (activeSession) {
      handleForceSubmit(activeSession);
    }
  };

  const handleViewAnalysis = (resultId: string) => {
    if (!currentUser) return;
    const result = ExamManager.getResultById(currentUser.id, resultId);
    if (result) {
      setActiveResult(result);
      const matchingPaper = PAPERS.find((p) => p.id === result.paperId);
      if (matchingPaper) setSelectedPaper(matchingPaper);
      setView('analysis');
    }
  };

  // Auth Gate
  if (!currentUser) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar
        activeView={view}
        currentUser={currentUser}
        onGoHome={() => setView('home')}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {view === 'home' && (
          <div>
            <Hero />
            <GlobalStats results={resultsHistory} />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-indigo-400" />
                    <span>UPSC Yearly Question Papers</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">Select any paper below to attempt live simulated exam tests.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PAPERS.map((paper) => {
                  const latestRes = resultsHistory.find((r) => r.paperId === paper.id);
                  return (
                    <PaperCard
                      key={paper.id}
                      paper={paper}
                      latestResult={latestRes}
                      onStartTest={handleStartTest}
                      onViewAnalysis={handleViewAnalysis}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {view === 'test' && selectedPaper && activeSession && (
          <div>
            <TestHeader
              paper={selectedPaper}
              timeRemainingSeconds={activeSession.timeRemainingSeconds}
              onTimeExpired={() => handleForceSubmit(activeSession)}
              onSubmitClick={() => setIsSubmitModalOpen(true)}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  {(() => {
                    const questions = QUESTIONS_DATABASE[selectedPaper.id] || [];
                    const currentQ = questions[activeSession.currentIndex];
                    const currentAns = activeSession.answers[currentQ?.id];

                    if (!currentQ) return null;

                    return (
                      <QuestionCard
                        question={currentQ}
                        currentIndex={activeSession.currentIndex}
                        totalQuestions={questions.length}
                        answerRecord={currentAns}
                        onSelectOption={handleSelectOption}
                        onToggleReview={handleToggleReview}
                        onClearAnswer={handleClearAnswer}
                        onNext={() => handleNavigateQuestion(activeSession.currentIndex + 1)}
                        onPrev={() => handleNavigateQuestion(activeSession.currentIndex - 1)}
                      />
                    );
                  })()}
                </div>

                <div className="lg:col-span-1">
                  <QuestionPalette
                    questions={QUESTIONS_DATABASE[selectedPaper.id] || []}
                    currentIndex={activeSession.currentIndex}
                    answers={activeSession.answers}
                    onSelectQuestion={handleNavigateQuestion}
                  />
                </div>
              </div>
            </div>

            <SubmitModal
              paper={selectedPaper}
              questions={QUESTIONS_DATABASE[selectedPaper.id] || []}
              answers={activeSession.answers}
              isOpen={isSubmitModalOpen}
              onClose={() => setIsSubmitModalOpen(false)}
              onConfirmSubmit={handleConfirmSubmit}
            />
          </div>
        )}

        {view === 'analysis' && activeResult && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
              onClick={() => setView('home')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Papers Dashboard</span>
            </button>

            <ScoreCard
              result={activeResult}
              onRetake={() => {
                const p = PAPERS.find((item) => item.id === activeResult.paperId);
                if (p) handleStartTest(p);
              }}
            />

            <SubjectBreakdown subjects={activeResult.subjectBreakdown} />

            <QuestionReview
              questions={activeResult.questions}
              answers={activeResult.answers}
            />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>© 2026 UPSC PrepLab — Automated UPSC Year-wise Exam Simulator & Performance Analytics.</p>
      </footer>
    </div>
  );
};

export default App;
