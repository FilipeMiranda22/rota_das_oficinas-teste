import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ConversorNumRomanos from './components/ConversorNumRomanos';
import DivisorContaRestaurante from './components/DivisorContaRestaurante';
import JogoDaVida from './components/JogoDaVida';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
     <NavBar />
      <Routes>
        <Route path='/' element={<ConversorNumRomanos />} />
        <Route path='/jogo' element={<JogoDaVida />} />
        <Route path='/restaurante' element={<DivisorContaRestaurante />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
