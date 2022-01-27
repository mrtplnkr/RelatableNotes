import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Preview } from './pages/Preview';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Notepad } from './pages/Notepad';
// import { NotepadContext } from './data/NotepadContext';

function App() {
  const data: any[] = [{text:'qew'}];

  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        {/* <NotepadContext> */}
          <Router>
            <Routes>
              <Route path="/" element={<Home />}>
              </Route>
              <Route path="notepad" element={<Notepad />}>
              </Route>
              <Route path="preview" element={<Preview data={data} />}>
              </Route>
            </Routes>
          </Router>
        {/* </NotepadContext> */}
      
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
