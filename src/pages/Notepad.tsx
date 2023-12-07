import { useEffect, useState } from 'react';
import { ReusableObject } from '../components/ReusableObject';
import { INote } from '../data/NotepadReducer';
import { Link } from 'react-router-dom';
import { useNotepadContext } from '../data/NotepadContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchInputWithTypes } from '../components/organisms/SearchInputWithTypes';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { compareLatest } from '../helpers/compareLatest';
import { delay } from '../data/functional';
import scrollToElement from 'scroll-to-element';

export interface INotepadProps {
}

export function Notepad(props: INotepadProps) {
  
  const { notes, found, highlighted, filter, dispatchNotes } = useNotepadContext();
  const [showOptions, setShowOptions] = useState<number>(0);

  const handleSearch = (text: string) => {
    dispatchNotes({ type: 'applyFilter', payload: {id: 0, parentId: null, order: 0, text: text}});
  }

  const addNote = (newNote: string) => {
    if (!notes.some(x => x.text === newNote)) {
      dispatchNotes({ type: 'addNote', payload: { order: 0, id: 1, parentId: null, text: newNote }});
    } else {
      alert("already exists, I'll show ya");
      handleSearch(newNote);
    }
  }
  
  useEffect(() => {
    const arr: number[] = []; //TODO: hack
    if (filter && filter.text.length > 1) {
        const notesFound = notes.filter(x => !filter.text || x.text.toLowerCase().includes(filter.text.toLowerCase()));
        if (notesFound && notesFound.length && filter.text !== '') {
            getParents(notesFound[0].id, arr);
            delay(dispatchNotes, arr.reverse());
            // if (exact)
            if (notesFound.length === 1) {
              setTimeout(() => {
                scrollToElement(`#lbl${notesFound[0].id}`, { offset: 20 });  
              }, 1000);
              console.log('do you even run2');
            }
        }
    }
  }, [filter.text]);

  const getParents = async (id: number, arr: number[]) => {
      await getParentList(id, arr);
  }

  const getParentList = async (noteId: number, arr: number[]) => {
      arr.push(noteId);
      const note = notes.find(x => x.id === noteId);
      if (note?.parentId) {
          await getParentList(note.parentId, arr);
      } else {
          return arr;
      }
  }

  return (
    <div>
      <div>
        <SearchInputWithTypes {...{handleSearch, addNote,
          searchTerm: filter.text,
          exact: filter.exact,
          foundNotes: notes.filter(x => found?.includes(x.id)),
          highlighted: highlighted.length>0}} />
        <hr />
        {notes.some(x => x.cut) && <span style={{ position: 'absolute', right: 0 }}>
            {notes.find(x => x.cut)!.text}
            <FontAwesomeIcon onClick={() => dispatchNotes({ type: 'cancelCut', payload: notes[0] })} title='undo' cursor={'pointer'} icon={faUndo} style={{ padding: '0 0.5em', zIndex: 4 }} />
        </span>}
          {notes.filter((x: INote) => x.parentId === null).sort(compareLatest).map((x, index) => {
              return (
                  <div style={{ padding: '5px', maxWidth: '20em' }} key={x.id}>
                      <ReusableObject {...{ showOptions, setShowOptions, dispatch: dispatchNotes }} mainNote={x} size={18}></ReusableObject>
                  </div>
              );
          })}
      </div>
      <p>
        <Link to="/preview">get visuals</Link>
      </p>
    </div>
  );
}
