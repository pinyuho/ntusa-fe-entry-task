import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="bg-slate-200 h-screen pt-3">
      <nav className="bg-cyan-700 text-blue-300 p-2 mx-3 mb-3 rounded-md shadow-md">
        Blug
      </nav>
      <main>
        <Routes>
          <Route path="/"></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
