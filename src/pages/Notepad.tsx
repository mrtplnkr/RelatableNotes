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

// const starterPackData: ReusableType[] = [{id: 1, text: "shopping list", children: [{id: 11, text: "milk"}, 
//   {id: 12, text: "bread", children: [{id:112, text: 'white'}, {id: 113, text: 'dark'}]}, {id: 13, text: "tea"}]},
//   {id: 2, text: "app dev features", children: [{id: 21, text: "creating new note with children"}]},
//   {id: 3, text: "life priorities", children: [{id: 31, text: "health"}, {id: 32, text: "love"}, {id: 33, text: "peace"}, {id: 34, text: "money?"}]},
//   {id: 4, text: "plandemic stages", children: [{id: 41, text: "spread lies"}, {id: 42, text: "rush vaccination"}, {id: 43, text: "discredit resistance"}]}]

export function Notepad (props: INotepadProps) {
  
  const { notes, dispatchNotes} = useNotepadContext();
  const [toggleNew, setToggleNew] = useState<boolean>(true);

  useEffect(() => {
    // setData(starterPackData);
  }, [notes]);

  const saveState = () => {
    console.log('can do saving?', dispatchNotes);
  }

  const compareLatest = (a: INote, b: INote) => {
    if (a.id < b.id) {
        return 1;
    } else {
        return -1;
    }
  };

  return (
    <div>
      <h3>your collections {version}</h3>
        <>
          <input placeholder={'add new top level note'} style={{fontWeight:'bold'}} type="text" autoFocus onKeyDown={(e: any) => {
              if (e.keyCode === 13) {
                  dispatchNotes({type: 'addNote', payload: {id: 1, parentId: null, text: e.target.value }})
                  setToggleNew(false);
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
