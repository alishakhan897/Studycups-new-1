import React, { useState, useEffect } from 'react';
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

import { COLLEGES_DATA } from './constants';
import type { View, College } from './types';

function App() {
  const [view, setView] = useState<View>({ page: 'home' });
  const [compareList, setCompareList] = useState<number[]>([]);
  const [isApplyNowOpen, setIsApplyNowOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Ensure every page navigation starts at the top of the viewport
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view.page]);

  // Auto-open Apply form 2 seconds after site loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsApplyNowOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCompareToggle = (id: number) => {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectedCollegeForDetail = React.useMemo(() => {
    if (view.page === 'detail') {
      return COLLEGES_DATA.find(c => c.id === view.collegeId) || null;
    }
    return null;
  }, [view]);

  const selectedCollegesForCompare = React.useMemo((): College[] => {
      return COLLEGES_DATA.filter(c => compareList.includes(c.id));
  }, [compareList]);

  const renderContent = () => {
    switch (view.page) {
      case 'home':
        return <HomePage setView={setView} colleges={COLLEGES_DATA} onOpenApplyNow={() => setIsApplyNowOpen(true)} />;
      case 'listing':
        return <ListingPage 
                    setView={setView} 
                    colleges={COLLEGES_DATA} 
                    compareList={compareList} 
                    onCompareToggle={handleCompareToggle} 
                    onOpenApplyNow={() => setIsApplyNowOpen(true)}
                    onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
                    initialFilters={view.page === 'listing' ? view.filters : undefined}
                />;
      case 'detail':
        return selectedCollegeForDetail ? <DetailPage college={selectedCollegeForDetail} setView={setView} /> : <div>College not found</div>;
      case 'compare':
        return <ComparePage colleges={selectedCollegesForCompare} allColleges={COLLEGES_DATA} setView={setView}/>;
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
        {renderContent()}
      </main>
      <Footer />
      <ApplyNowModal
        isOpen={isApplyNowOpen}
        onClose={() => setIsApplyNowOpen(false)}
      />
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
