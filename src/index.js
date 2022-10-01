import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./hover-effect.sass"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./responsive.sass"
import { HelmetProvider } from 'react-helmet-async'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import nProgress from 'nprogress';
const App= lazy(()=> import("./App"))
const Admin= lazy(()=> import("./Admin/Admin"))
nProgress.configure({
  easing: "ease-in-out", speed: 500, trickleSpeed: 200, parent: '#root',
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <Router>
      <Routes>
        <Route path="/*" element={<Suspense fallback={<Box sx={{ width: '100%' }}><LinearProgress /></Box>}><App /></Suspense>} />
        <Route path="/theta18/*" element={<Suspense fallback={<Box sx={{ width: '100%' }}><LinearProgress /></Box>}><Admin /></Suspense>} />
      </Routes>
    </Router>
  </HelmetProvider>
);

