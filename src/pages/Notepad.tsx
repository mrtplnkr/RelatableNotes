import { useEffect, useState } from 'react';
import { ReusableObject } from '../components/ReusableObject';
import { INote } from '../data/NotepadReducer';
import { Link } from 'react-router-dom';
import { useNotepadContext } from '../data/NotepadContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchInputWithTypes } from '../components/organisms/SearchInputWithTypes';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import scrollToElement from 'scroll-to-element';
import { compareLatest } from '../helpers/compareLatest';

export interface INotepadProps {
}

export function Notepad (props: INotepadProps) {
  
  const { notes, found, highlighted, filter, dispatchNotes } = useNotepadContext();

  const [showOptions, setShowOptions] = useState<number>(0);

  const [showAllFound, setShowAllFound] = useState<boolean>(false);

  const handleSearch = (text: string) => {
    dispatchNotes({ type: 'applyFilter', payload: {id: 0, parentId: null, order: 0, text: text}});
  }

  useEffect(() => {
    if (found.length === 1) navigateTo(found[0]);
  }, [found])

  const navigateTo = (noteId: number) => {
    setShowAllFound(false);
    scrollToElement(`#lbl${noteId}`);  
  }

  const addNote = (newNote: string) => {
    if (!notes.some(x => x.text === newNote)) {
      dispatchNotes({ type: 'addNote', payload: { order: 0, id: 1, parentId: null, text: newNote }});
    } else {
      alert("already exists, I'll show ya");
      handleSearch(newNote);
    }
  }

  return (
    <div>
      <div style={{justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <div style={{flex: 1}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <SearchInputWithTypes {...{handleSearch, addNote,
                searchTerm: filter.text,
                exact: filter.exact,
                highlighted: highlighted.length>0}} />
              <span style={{alignSelf: 'end', paddingLeft: '1rem'}}>
                (<u onClick={(e) => setShowAllFound(true)}>{found ? found.length : 0}</u>)
              </span>
            </div>
            {showAllFound && <ul>
              {found && notes.filter(x => found.includes(x.id)).map(x => {
                return (
                  <li style={{ padding: '5px' }} key={x.id}>
                      <button onClick={() => navigateTo(x.id)}>{x.text}</button>
                  </li>
                );
              })}
            </ul>}
            <hr />
          </div>
        </div>
        {notes.some(x => x.cut) && <span style={{ position: 'absolute', right: 0 }}>
            {notes.find(x => x.cut)!.text}
            <FontAwesomeIcon onClick={() => dispatchNotes({ type: 'cancelCut', payload: notes[0] })} title='undo' cursor={'pointer'} icon={faUndo} style={{ padding: '0 0.5em' }} />
        </span>}
          {notes.filter((x: INote) => x.parentId === null).sort(compareLatest).map((x, index) => {
              return (
                  <div style={{ padding: '5px' }} key={x.id}>
                      <ReusableObject {...{ showOptions, setShowOptions, dispatch: dispatchNotes }} mainNote={x} size={18}></ReusableObject>
                  </div>
              );
          })}
      </div>
      <p>
        <Link to="#/dataPreview">get visuals</Link>
      </p>
    </div>
  );
}
