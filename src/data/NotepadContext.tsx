import { createContext, Dispatch, useContext, useEffect, useReducer, useState } from 'react';
import { ENoteType, initialState, INote, NotepadReducer } from './NotepadReducer';
import { useLocation } from 'react-router-dom'

interface INotepadContext {
    notes: INote[];
    highlighted: number[];
    filter: {text: string, type?: ENoteType};
    dispatchNotes: Dispatch<{ type: string; payload: INote; }>;
}

const NotepadContext = createContext<INotepadContext>({notes: [], highlighted: [], filter: {text:''}, 
                        dispatchNotes: () => console.log('silly code...')});

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
    
    const arr: number[] = [];

    useEffect(() => {
        if (notes.filter) {
            const check = notes.allNotes.filter(x => !notes.filter.text || x.text.includes(notes.filter.text));
            if (check && check.length && notes.filter.text !== '') {
                getParents(check[0].id);
                arr.reverse().forEach(id => {
                    setTimeout(async () => {
                        dispatch({type: 'highlightNote', payload: {id: id, parentId: null, order: 0, text: ''}});
                    }, 3000);
                }); 
            }
        }
    }, [notes.filter]);

    const getParents = async (id: number) => {
        await getParentList(id);
    }

    const getParentList = async (noteId: number) => {
        arr.push(noteId);
        const note = notes.allNotes.find(x => x.id === noteId);
        if (note?.parentId) {
            await getParentList(note.parentId);
        } else {
            return arr;
        }
    }
    
    return (
        <NotepadContext.Provider value={{notes: notes.allNotes, highlighted: notes.highlighted, filter: notes.filter, dispatchNotes: dispatch}}>
            {{ ...children.children }}
        </NotepadContext.Provider>
    )
}
