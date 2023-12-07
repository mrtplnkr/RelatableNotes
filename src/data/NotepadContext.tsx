import { createContext, Dispatch, useContext, useEffect, useReducer, useState } from 'react';
import { initialState, INote, NotepadReducer } from './NotepadReducer';

interface INotepadContext {
    notes: INote[];
    highlighted: number[];
    filter: { text: string, exact: boolean };
    found: number[];
    dispatchNotes: Dispatch<{ type: string; payload: INote; }>;
    forceUpdate?: () => void;
}

const NotepadContext = createContext<INotepadContext>({notes: [], found: [], highlighted: [], filter: {text:'', exact: false}, 
                        dispatchNotes: () => console.log('unknown trigger...')});

export function useNotepadContext() {
    return useContext(NotepadContext);
}

export const NotepadProvider = (children: any) => {
    const [notes, dispatch] = useReducer(NotepadReducer, [], () => {
        const localData = localStorage.getItem("Notes");
        return localData && localData.length > 0 ? JSON.parse(localData) : initialState
    });

    const [update, setUpdate] = useState(false);
    const forceUpdate = () => {
        setUpdate(a => !a);
    }

    useEffect(() => {
        console.log('storing data run', notes);
        if (notes)
            localStorage.setItem("Notes", JSON.stringify(notes));
    }, [notes.allNotes.length, update])
    
    return (
        <NotepadContext.Provider value={{notes: notes.allNotes, forceUpdate: forceUpdate, found: notes.found, highlighted: notes.highlighted, filter: notes.filter, dispatchNotes: dispatch}}>
            {{ ...children.children }}
        </NotepadContext.Provider>
    )
}
