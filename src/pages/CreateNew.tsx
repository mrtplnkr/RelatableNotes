import * as React from 'react';
import { useState } from 'react';

export interface ICreateNewCollectionProps {
}

export interface RelatableNote{
    id: number;
    text: string;
    children: RelatableNote[]
}

export function CreateNewCollection (props: ICreateNewCollectionProps) {
    const [addedNotes, setAddedNotes] = useState<RelatableNote[]>([]);
    const [newNote, setNewNote] = useState("");
    
    
    return (
    <div>
        <h3>Create New Collection</h3>
        
        <div>
            {addedNotes.length && addedNotes.map((x) => {
                <p>{x.text}</p>
            })}
            <div className='row'>
                <button onClick={() => setAddedNotes([...addedNotes, { id: 1, text: newNote, children: []}])} style={{"marginRight":"10px", fontWeight: "bold"}}>+</button>
                <input type="text" onChange={(e) => setNewNote(e.target.value)}></input>
            </div>
        </div>

    </div>
  );
}
