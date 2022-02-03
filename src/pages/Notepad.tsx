import { useContext, useEffect, useState } from 'react';
import { NotepadContext } from '../App';
import { ReusableObject, ReusableType } from '../components/ReusableObject';
import { useNotepadContext } from '../data/NotepadContext';
import { initialState, INote, NotepadReducer } from '../data/NotepadReducer';
import { version } from '../../package.json';
import { dispatch } from 'd3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

export interface INotepadProps {
}

export const compareLatest = (a: INote, b: INote) => {
  if (a.id < b.id) {
      return 1;
  } else {
      return -1;
  }
};

export function Notepad (props: INotepadProps) {
  
  const { notes, dispatchNotes} = useNotepadContext();

  useEffect(() => {
    // setData(starterPackData);
  }, [notes]);

  const saveState = () => {
    console.log('can do saving?', dispatchNotes);
  }

  return (
    <div>
      <h3>your collections {version}</h3>
        <>
          <input placeholder={'add new top level note'} style={{fontWeight:'bold'}} type="text" onKeyDown={(e: any) => {
              if (e.keyCode === 13) {
                  dispatchNotes({type: 'addNote', payload: {id: 1, parentId: null, text: e.target.value }})
              }
          }} />
      </>
      
      <ul>
        {notes.filter(x => x.parentId === null).sort(compareLatest).map((x: INote) => {
          return <div key={x.id}>
            <ReusableObject reloadChildren={() => saveState()} dispatch={dispatchNotes} mainNote={x} size={18}></ReusableObject>
          </div>
        })}
      </ul>
    </div>
  );
}
