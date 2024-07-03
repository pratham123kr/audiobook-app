import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Audiobook from './pages/Audiobook';

function App() {
  return (
    <Container>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audiobooks/:id" element={<Audiobook />} />
      </Routes>
    </Container>
  );
}

export default App;
