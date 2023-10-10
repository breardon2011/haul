import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from './components/Table';
import ListView from './components/ListView';
import DetailView from './components/DetailView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListView />} /> 
        <Route path="/inspections/:id" element={<DetailView />} /> 
      </Routes>
    </Router>
  );
}

export default App;
