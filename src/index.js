import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "./hover-effect.sass"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./responsive.sass"
const App= lazy(()=> import("./App"))
const Admin= lazy(()=> import("./Admin/Admin"))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<Suspense fallback={<div></div>}><App /></Suspense>} />
        <Route path="/admin/*" element={<Suspense fallback={<div></div>}><Admin /></Suspense>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
