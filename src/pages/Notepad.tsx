import { useState } from 'react';
import { ReusableObject } from '../components/ReusableObject';
import { CreateNewCollection } from './CreateNew';

export interface INotepadProps {
}

const testData = {id:  2, text: "parent is displayed ok", 
      children: [{id:  22, text: "must display this too"}]};

const existingData = [{id: 1, text: "shopping list", children: [{id: 11, text: "milk"}, {id: 12, text: "bread"}, {id: 13, text: "tea"}]},
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
        <li>shopping list</li>
        <li>app dev features</li>
        <li>life priorities</li>
        <li>plandemic stages</li>
      </ul>}
      <ReusableObject data={testData}></ReusableObject>
    </div>
  );
}
