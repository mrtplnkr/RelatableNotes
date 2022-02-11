import React, { Dispatch } from 'react';
import logo from './logo.svg';
import './App.css';
import { Preview } from './pages/Preview';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Notepad } from './pages/Notepad';
import { INote, INotepadState } from './data/NotepadReducer';
import { NotepadProvider } from './data/NotepadContext';
import { Link } from 'react-router-dom';

interface INotepadContext {
  notepadState: INotepadState;
  notepadDispatch: Dispatch<{ type: string; payload: INote }>;
}

export const NotepadContext = React.createContext<INotepadContext | null>(null);

function App() {
  const data: any[] = [{text:'qew'}];

  return (
    <div className="App">
      
      <header className="App-header">
        <a href="/">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
      
      <NotepadProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />}>
            </Route>
            <Route path="notepad" element={<Notepad />}>
            </Route>
            <Route path="preview" element={<Preview data={data} />}>
            </Route>
          </Routes>
        </HashRouter>
      </NotepadProvider>
      
      </header>

    </div>
  );
}

export default App;
