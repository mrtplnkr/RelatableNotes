import { createContext, Dispatch, useContext, useReducer } from 'react';
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
    const [notes, dispatch] = useReducer(NotepadReducer, initialState);
    
    return (
        <NotepadContext.Provider value={{notes: notes.allNotes, dispatchNotes: dispatch}}>
            {{ ...children.children }}
        </NotepadContext.Provider>
    )
}
