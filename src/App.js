import React from 'react';
import './App.css';
//import HangmanGame from './components/HangmanGame';
//import EnterGame from './components/EnterGame';
import { Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Rules from './pages/Rules';
import Game from './pages/Game';


const App = () => {
  // React bileşenini render et
  return (
    <Routes>
      <Route path='/' element={<StartPage />} />
      <Route path='/rules' element={<Rules />} />
      <Route path='/game' element={<Game />} />
    </Routes>
  );
};

export default App;

