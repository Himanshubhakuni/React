import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import FirstPage from './component/FirstPage';
import SecondPage from './component/SecondPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/first" element={<FirstPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/" element={<Navigate to="/first" />} />

      </Routes>
    </Router>
  );
};

export default App;
