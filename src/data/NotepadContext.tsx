import { createContext, Dispatch, useContext, useEffect, useReducer } from 'react';
import { initialState, INote, NotepadReducer } from './NotepadReducer';

interface INotepadContext {
    notes: INote[];
    dispatchNotes: Dispatch<{ type: string; payload: INote; }>;
}

const NotepadContext = createContext<INotepadContext>({notes: [], dispatchNotes: () => console.log('silly code...')});

export function useNotepadContext() {
    return useContext(NotepadContext);
}

export const NotepadProvider = (children: any) => {
    const [notes, dispatch] = useReducer(NotepadReducer, [], () => {
        const localData = localStorage.getItem("Notes");
        return localData && localData.length > 0 ? JSON.parse(localData) : initialState
    });

    useEffect(() => {
        if (notes)
            localStorage.setItem("Notes", JSON.stringify(notes));
    }, [notes])
    
    return (
        <NotepadContext.Provider value={{notes: notes.allNotes, dispatchNotes: dispatch}}>
            {{ ...children.children }}
        </NotepadContext.Provider>
    )
}
