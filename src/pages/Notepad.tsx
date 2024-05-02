import { useEffect, useState } from 'react';
import { ReusableObject } from '../components/ReusableObject';
import { INote } from '../data/NotepadReducer';
import { Link } from 'react-router-dom';
import { useNotepadContext } from '../data/NotepadContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchInputWithTypes } from '../components/organisms/SearchInputWithTypes';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { compareLatest, EnumSort } from '../helpers/compareLatest';
import { delay } from '../data/functional';
import scrollToElement from 'scroll-to-element';

export interface INotepadProps {
}

export function Notepad(props: INotepadProps) {
  
  const { notes, found, highlighted, filter, dispatchNotes } = useNotepadContext();
  const [showOptions, setShowOptions] = useState<number>(0);

  const [sortBy, setSortBy] = useState(EnumSort.index);
  console.log('sortBy', sortBy);

  const handleSearch = (text: string) => {
    dispatchNotes({ type: 'applyFilter', payload: {id: 0, parentId: null, order: 0, text: text, dateUpdated: new Date()}});
  }

  const addNote = (newNote: string) => {
    if (!notes.some(x => x.text === newNote)) {
      dispatchNotes({ type: 'addNote', payload: { order: 0, id: 1, parentId: null, text: newNote, dateUpdated: new Date() }});
      handleSearch('');
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
          searchTerm: filter.text, sortBy,
          exact: filter.exact, setSortBy,
          foundNotes: notes.filter(x => found?.includes(x.id)),
          highlighted: highlighted.length>0}} />
        <hr />
        {notes.some(x => x.cut) && <span style={{ textOverflow: 'eclipse', overflow: 'hidden', 
          maxWidth: '200px', textAlign: 'right', position: 'fixed', right: 0, zIndex: '11' }}>
            <FontAwesomeIcon onClick={() => dispatchNotes({ type: 'cancelCut', payload: notes[0] })} title='undo'
               icon={faUndo} style={{ cursor: 'pointer', padding: '0 0.5em', zIndex: 4 }} />
            <div style={{fontSize: '0.6em'}}>{notes.find(x => x.cut)!.text}</div>
        </span>}
          {notes.filter((x: INote) => x.parentId === null).sort(compareLatest).map((x, index) => {
              return (
                  <div style={{ padding: '5px', maxWidth: '20em' }} key={x.id}>
                      <ReusableObject {...{ showOptions, setShowOptions, dispatch: dispatchNotes, sortBy: sortBy }} mainNote={x} size={18}></ReusableObject>
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
