import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListView from './components/ListView';
import InspectionDetailView from './components/InspectionDetailView';
import { VehicleDetailView } from './components/VehicleDetailView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/vehicles/:id" element={<VehicleDetailView />} /> 
        <Route path="/inspections/:id" element={<InspectionDetailView />} /> 
        <Route path="/" element={<ListView />} /> 
      </Routes>
    </Router>
  );
}

export default App;
