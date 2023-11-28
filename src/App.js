import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home/Homepage';
import Header from './common/header/Header';
import Sports from './sports/Sports';
import Poker from './poker/Poker';
import Racing from './racing/Racing';
import Casino from './casino/Casino';
import Misc from './misc/Misc';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/poker" element={<Poker />} />
        <Route path="/racing" element={<Racing />} />
        <Route path="/casino" element={<Casino />} />
        <Route path="/misc" element={<Misc />} />
      </Routes>
    </Router>
  );
}

export default App;
