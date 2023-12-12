import React, { Dispatch, lazy, Suspense } from 'react';
import logo from './logo192.png';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Notepad } from './pages/Notepad';
import { INote, INotepadState } from './data/NotepadReducer';
import { NotepadProvider } from './data/NotepadContext';
import Export from './pages/Export';
import Settings from './pages/Settings';
import Loading from './components/atoms/Loading';

interface INotepadContext {
  notepadState: INotepadState;
  notepadDispatch: Dispatch<{ type: string; payload: INote }>;
}

export const NotepadContext = React.createContext<INotepadContext | null>(null);

const Preview = lazy(() =>
  import('./pages/Preview'),
);

function App() {

  return (
    <div className="App">
      
      <header className="App-header">
        <a href="/">
          <img src={logo} alt="logo" className={'spin'} style={{width:'4em'}} />
        </a>
      
        <Suspense fallback={<Loading />}>

        <HashRouter>
          <NotepadProvider>
            <Routes>
              <Route path="/" element={<Home />}>
              </Route>
              <Route path="notepad" element={<Notepad />}>
              </Route>
              <Route path="notepad/:id" element={<Notepad />}>
              </Route>
              <Route path="preview" element={<Preview />}>
              </Route>
              <Route path="export" element={<Export />}>
              </Route>
              <Route path="settings" element={<Settings />}>
              </Route>
            </Routes>
            </NotepadProvider>
        </HashRouter>

        </Suspense>

      </header>

    </div>
  );
}

export default App;
