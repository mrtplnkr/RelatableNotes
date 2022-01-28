import React, { Dispatch, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import { Preview } from './pages/Preview';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Notepad } from './pages/Notepad';
import { initialState, INote, INotepadState, NotepadReducer } from './data/NotepadReducer';
// import { NotepadContext } from './data/NotepadContext';

interface INotepadContext {
  notepadState: INotepadState;
  notepadDispatch: Dispatch<{ type: string; payload: INote }>;
}

export const NotepadContext = React.createContext<INotepadContext | null>(null);

function App() {
  const [state, dispatch] = useReducer(NotepadReducer, initialState);
  const data: any[] = [{text:'qew'}];

  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <NotepadContext.Provider value={{notepadState: state, notepadDispatch: dispatch}}>
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
        </NotepadContext.Provider>
      
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
