import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import { RequirementsProvider } from './context/RequirementsContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Profiles from './pages/Profiles';
import Requirements from './pages/Requirements';
import AIAnalysis from './pages/AIAnalysis';
import './App.css';

function App() {
  return (
    <Router>
      <RequirementsProvider>
        <ProfileProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/requirements" element={<Requirements />} />
              <Route path="/analysis" element={<AIAnalysis />} />
            </Routes>
          </Layout>
        </ProfileProvider>
      </RequirementsProvider>
    </Router>
  );
}

export default App;
