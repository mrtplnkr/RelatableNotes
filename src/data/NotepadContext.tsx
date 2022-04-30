import { createContext, Dispatch, useContext, useEffect, useReducer } from 'react';
import { ENoteType, initialState, INote, NotepadReducer } from './NotepadReducer';

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
                delay(arr.reverse());
            }
        }
    }, [notes.filter]);

    const delay = async (arr: number[]) => {
        for await (let id of arr) {
            await sleep(2000);
            dispatch({type: 'highlightNote', payload: {id: id, parentId: null, order: 0, text: ''}});
        }
        return sleep(2000);
    };

    const sleep = (delay: number) => {
        return new Promise(resolve => {
            setTimeout(resolve, delay)
        });
    }

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
