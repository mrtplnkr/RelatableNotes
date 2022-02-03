import { useContext, useEffect, useState } from 'react';
import { NotepadContext } from '../App';
import { ReusableObject, ReusableType } from '../components/ReusableObject';
import { useNotepadContext } from '../data/NotepadContext';
import { initialState, INote, NotepadReducer } from '../data/NotepadReducer';
import { CreateNewCollection } from './CreateNew';
import { version } from '../../package.json';

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

  return (
    <div>
      <h3>your collections {version}</h3>
      {toggleNew ? <button onClick={() => setToggleNew(!toggleNew)}>Create new</button> : <button onClick={() => setToggleNew(!toggleNew)}>Show my collections</button>}
      {!toggleNew ? 
        <CreateNewCollection />
      : 
      <ul>
        {notes.filter(x => x.parentId === null)?.map((x: INote) => {
          return <div key={x.id}>
            <ReusableObject reloadChildren={() => saveState()} dispatch={dispatchNotes} mainNote={x} size={18}></ReusableObject>
          </div>
        })}
      </ul>}
    </div>
  );
}
