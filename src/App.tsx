import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConversationPage from './pages/ConversationPage';
import ReportsPage from './pages/ReportsPage';
import ReportDetailPage from './pages/ReportDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/conversation" element={<ConversationPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/report/:id" element={<ReportDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;