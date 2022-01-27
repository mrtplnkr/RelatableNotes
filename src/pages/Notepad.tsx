import { useEffect, useReducer, useState } from 'react';
import { ReusableObject, ReusableType } from '../components/ReusableObject';
import { initialState, NotepadReducer } from '../data/NotepadReducer';
import { CreateNewCollection } from './CreateNew';

export interface INotepadProps {
}

// const starterPackData: ReusableType[] = [{id: 1, text: "shopping list", children: [{id: 11, text: "milk"}, 
//   {id: 12, text: "bread", children: [{id:112, text: 'white'}, {id: 113, text: 'dark'}]}, {id: 13, text: "tea"}]},
//   {id: 2, text: "app dev features", children: [{id: 21, text: "creating new note with children"}]},
//   {id: 3, text: "life priorities", children: [{id: 31, text: "health"}, {id: 32, text: "love"}, {id: 33, text: "peace"}, {id: 34, text: "money?"}]},
//   {id: 4, text: "plandemic stages", children: [{id: 41, text: "spread lies"}, {id: 42, text: "rush vaccination"}, {id: 43, text: "discredit resistance"}]}]

export function Notepad (props: INotepadProps) {
  
  const [toggleNew, setToggleNew] = useState<boolean>(true);

  const [state, dispatch] = useReducer(NotepadReducer, initialState);

  useEffect(() => {
    // setData(starterPackData);
  }, []);

  // const addNote = (id: number, newNote: string) => {
  //   console.log("looking for " + id);
  //   var node = findNode(data!, id);
  //   console.log(node);
  // }

  // const findNode = (d: ReusableType[], id: number) => {
  //   var search = d?.filter(x => x.id === id);
  //   if (!search) {
  //     findNode(d.filter(x => x.children), id);
  //   }
  // }

  return (
    <div>
      <h3>your collections</h3>
      {toggleNew ? <button onClick={() => setToggleNew(!toggleNew)}>Create new</button> : <button onClick={() => setToggleNew(!toggleNew)}>Show my collections</button>}
      {!toggleNew ? 
        <CreateNewCollection />
      : 
      <ul>
        {state.allNotes.filter(x => x.parentId === null)?.map(x => {
          return <div key={x.id}>
            <ReusableObject dispatch={dispatch} mainNote={x} size={15}></ReusableObject>
          </div>
        })}
      </ul>}
    </div>
  );
}
