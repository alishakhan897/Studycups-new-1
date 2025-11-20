import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import DetailPage from './pages/DetailPage';
import ComparePage from './pages/ComparePage';
import CoursesPage from './pages/CoursesPage';
import ExamsPage from './pages/ExamsPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ApplyNowModal from './components/ApplyNowModal';
import AIAssistant from './components/AIAssistant';
import CourseDetailPage from './pages/CourseDetailPage';
import ExamDetailPage from './pages/ExamDetailPage';
import EventsPage from './pages/EventsPage';

import EventPass from './components/EventPass'; 
import RegistrationForm from './components/RegestrationForm';

import { COLLEGES_DATA } from './constants';
import type { View } from './types';

function App() {
  const [view, setView] = useState<View>({ page: 'home' });
  const [compareList] = useState<number[]>([]);
  const [isApplyNowOpen, setIsApplyNowOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [selectedEvent, setSelectedEvent] =
    useState<"kanpur" | "lucknow">("kanpur");

  // 🔥 Final working function (Name + Event receive)
  const handleFormSubmit = (name: string, event: string) => {
    setStudentName(name);
    setSelectedEvent(event === "kanpur" ? "kanpur" : "lucknow");
    setIsSubmitted(true);     // <- SHOW EVENT PASS PAGE
  };

  const renderContent = () => {
    switch (view.page) {
      case 'home':
        return <HomePage setView={setView} colleges={COLLEGES_DATA} onOpenApplyNow={() => setIsApplyNowOpen(true)} />;

      case 'listing':
        return (
          <ListingPage 
            setView={setView} 
            colleges={COLLEGES_DATA} 
            compareList={compareList} 
            onCompareToggle={() => {}} 
            onOpenApplyNow={() => setIsApplyNowOpen(true)}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
          />
        );

      case 'detail':
        return <DetailPage college={COLLEGES_DATA[0]} setView={setView} />;

      case 'compare':
        return <ComparePage colleges={[]} allColleges={COLLEGES_DATA} setView={setView} />;

      case 'courses':
        return <CoursesPage setView={setView} />;

      case 'exams':
        return <ExamsPage setView={setView} />;

      case 'events':
        return <EventsPage setView={setView} />;

      case 'blog':
        return <BlogPage setView={setView} />;

      case 'blog-detail':
        return <BlogDetailPage postId={view.postId} setView={setView} />;

      case 'course-detail':
        return <CourseDetailPage courseName={view.courseName} allColleges={COLLEGES_DATA} setView={setView} />;

      case 'exam-detail':
        return <ExamDetailPage examId={view.examId} setView={setView} />;

      default:
        return <HomePage setView={setView} colleges={COLLEGES_DATA} onOpenApplyNow={() => setIsApplyNowOpen(true)} />;
    }
  };

  return (
    <div className="bg-[--background] text-[--text-primary] min-h-screen flex flex-col font-sans">
      
      <Header setView={setView} onOpenApplyNow={() => setIsApplyNowOpen(true)} colleges={COLLEGES_DATA} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={renderContent()} />

          {/* 🔥 FINAL REGISTRATION + EVENT PASS ROUTE */}
          <Route
            path="/register"
            element={
              <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-4xl">

                  {isSubmitted ? (
                    <EventPass 
                      name={studentName} 
                      selectedEvent={selectedEvent} 
                    />
                  ) : (
                    <RegistrationForm onSubmit={handleFormSubmit} />
                  )}

                </div>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />

      <ApplyNowModal isOpen={isApplyNowOpen} onClose={() => setIsApplyNowOpen(false)} />

      <AIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        colleges={COLLEGES_DATA}
        setView={setView}
      />
    </div>
  );
}

export default App;
