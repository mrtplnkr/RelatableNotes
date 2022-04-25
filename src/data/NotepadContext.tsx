import { createContext, Dispatch, useContext, useEffect, useReducer, useState } from 'react';
import { ENoteType, initialState, INote, NotepadReducer } from './NotepadReducer';

interface INotepadContext {
    notes: INote[];
    highlighted: number[];
    filter: {text: string, type?: ENoteType};
    dispatchNotes: Dispatch<{ type: string; payload: INote; }>;
}

const NotepadContext = createContext<INotepadContext>({notes: [], highlighted: [], filter: {text:''}, dispatchNotes: () => console.log('silly code...')});

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
    
    useEffect(() => {
        const check = notes.allNotes.filter(x => 
            (!notes.filter.type || x.type === notes.filter.type) && 
            (!notes.filter.text || x.text.includes(notes.filter.text)));
        if (check.length > 0 && (notes.filter.text !== '' || notes.filter.type)) highlightParent(check[0].id);
    }, [notes.filter]);

    const highlightParent = (noteId: number | null) => {
        const note = notes.allNotes.find(x => x.id === noteId);
        dispatch({type: 'highlightNote', payload: {id: noteId!, parentId: null, order: 0, text: ''}});
        if (note && note.parentId != null)  {
            highlightParent(note.parentId);
        }
    }
    
    return (
        <NotepadContext.Provider value={{notes: notes.allNotes, highlighted: notes.highlighted, filter: notes.filter, dispatchNotes: dispatch}}>
            {{ ...children.children }}
        </NotepadContext.Provider>
    )
}
