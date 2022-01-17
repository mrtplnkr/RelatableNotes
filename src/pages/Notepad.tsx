import { useState } from 'react';
import { ReusableObject, ReusableType } from '../components/ReusableObject';
import { CreateNewCollection } from './CreateNew';

export interface INotepadProps {
}

const testData = {id:  2, text: "parent is displayed ok", 
      children: [{id:  22, text: "must display this too"}]};

const existingData: ReusableType[] = [{id: 1, text: "shopping list", children: [{id: 11, text: "milk"}, 
  {id: 12, text: "bread", children: [{id:112, text: 'white'}, {id: 113, text: 'dark'}]}, {id: 13, text: "tea"}]},
  {id: 2, text: "app dev features", children: [{id: 21, text: "creating new note with children"}]},
  {id: 3, text: "life priorities", children: [{id: 31, text: "health"}, {id: 32, text: "love"}, {id: 33, text: "peace"}, {id: 34, text: "money?"}]},
  {id: 4, text: "plandemic stages", children: [{id: 41, text: "spread lies"}, {id: 42, text: "rush vaccination"}, {id: 43, text: "discredit resistance"}]}]

export function Notepad (props: INotepadProps) {
  
  const [toggleNew, setToggleNew] = useState<boolean>(true);

  return (
    <div>
      <h3>your collections</h3>
      {toggleNew ? <button onClick={() => setToggleNew(!toggleNew)}>Create new</button> : <button onClick={() => setToggleNew(!toggleNew)}>Show my collections</button>}
      {!toggleNew ? 
        <CreateNewCollection />
      : 
      <ul>
        {existingData.map(x => {
          <div key={x.id}>
            <ReusableObject data={x}></ReusableObject>
          </div>
        })}
      </ul>}
      <ReusableObject data={existingData[0]}></ReusableObject>
    </div>
  );
}
