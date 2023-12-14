import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home/Homepage';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import Sports from './sports/Sports';
import Poker from './poker/Poker';
import PokerCalculator from './poker/PokerCalculator/PokerCalculator';
import Racing from './racing/Racing';
import Casino from './casino/Casino';


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
        <Route path="/poker/pokercalculator" element={<PokerCalculator />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
