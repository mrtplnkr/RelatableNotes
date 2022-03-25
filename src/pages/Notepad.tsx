import { useEffect, useState } from 'react';
import { ReusableObject } from '../components/ReusableObject';
import { useNotepadContext } from '../data/NotepadContext';
import { INote } from '../data/NotepadReducer';
import { Link } from 'react-router-dom';

export interface INotepadProps {
}

export const compareLatest = (a: INote, b: INote) => {
  if (a.order < b.order) {
      return 1;
  } else {
      return -1;
  }
};

export function Notepad (props: INotepadProps) {
  
  const { notes, dispatchNotes} = useNotepadContext();
  const [showOptions, setShowOptions] = useState<number>(0);

  useEffect(() => {
    // setData(starterPackData);
  }, [notes]);

  const saveState = () => {
    console.log('can do saving?', dispatchNotes);
  }

  return (
    <div>
      <h3>Your Collections</h3>
        <>
          <input placeholder={'add new top level note'} style={{fontWeight:'bold'}} type="text" onKeyDown={(e: any) => {
              if (e.keyCode === 13) {
                  dispatchNotes({type: 'addNote', payload: {id: 1, parentId: null, text: e.target.value, order: 0 }})
              }
          }} />
      </>
      
      <ul>
        {notes.filter(x => x.parentId === null).sort(compareLatest).map((x: INote) => {
          return <div key={x.id}>
            <ReusableObject {...{showOptions, setShowOptions}} reloadChildren={() => saveState()} dispatch={dispatchNotes} mainNote={x} size={18}></ReusableObject>
          </div>
        })}
      </ul>

      <p>
        <Link to="/preview">get visuals</Link>
      </p>
    </div>
  );
}
