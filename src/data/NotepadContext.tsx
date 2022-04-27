import { createContext, Dispatch, useContext, useEffect, useReducer, useState } from 'react';
import { ENoteType, initialState, INote, NotepadReducer } from './NotepadReducer';
import { useLocation } from 'react-router-dom'

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
        if (notes.filter) {
            const check = notes.allNotes.filter(x => !notes.filter.text || x.text.includes(notes.filter.text));
            if (check && notes.filter.text !== '') highlightParent(check[0].id);
        }
    }, [notes.filter]);

    // const location = useLocation();

    // const highlight = location.pathname.substring(location.pathname.lastIndexOf('/') + 1, location.pathname.length);

    const highlightParent = (noteId: number | null) => {
        const note = notes.allNotes.find(x => x.id === noteId);
        dispatch({type: 'highlightNote', payload: {id: noteId!, parentId: null, order: 0, text: ''}});
        if (note && note.parentId != null)  {
            setTimeout(() => {
                highlightParent(note.parentId);
            }, 1000)
        }
    }
    
    return (
        <NotepadContext.Provider value={{notes: notes.allNotes, highlighted: notes.highlighted, filter: notes.filter, dispatchNotes: dispatch}}>
            {{ ...children.children }}
        </NotepadContext.Provider>
    )
}
