import { ReusableType } from "../components/ReusableObject";

export interface INote {
    parentId: number | null,
    id: number,
    text: string
}

export interface INotepadState {
    allNotes: INote[],
}

export const initialState: INotepadState = {
    allNotes: [
        { parentId: null, id: 1, text: "shopping list" },
        { parentId: 1, id: 11, text: "milk" },
        { parentId: 1, id: 12, text: "bread" },
        { parentId: 12, id: 112, text: 'white' },
        { parentId: 12, id: 113, text: 'dark' },
        { parentId: 1, id: 13, text: "tea" },
        { parentId: null, id: 2, text: "app dev features" },
        { parentId: 2, id: 21, text: "creating new note with children" },
        { parentId: null, id: 3, text: "life priorities" },
        { parentId: 3, id: 31, text: "health" },
        { parentId: 3, id: 32, text: "love" },
        { parentId: 3, id: 33, text: "peace" },
        { parentId: 3, id: 34, text: "money?" },
        { parentId: null, id: 4, text: "plandemic stages"},
        { parentId: 4, id: 41, text: "spread lies" },
        { parentId: 4, id: 42, text: "rush vaccination"},
        { parentId: 4, id: 43, text: "discredit resistance"}
    ],
}

export const NotepadReducer = (state: INotepadState, action: { type: string, payload: INote; }): INotepadState => {
    console.log(action.type, action.payload);
    
    switch(action.type) {
        case 'loadChains': //or initial state
            return state;
        case 'addNote': //load parent notes
            console.log('newNote', {...action.payload, id: state.allNotes.length});
            console.log('allNotes', [...state.allNotes, {...action.payload, id: state.allNotes.length}]);
        
            return { ...state, allNotes: [...state.allNotes, {...action.payload, id: state.allNotes.length}] };
        case 'removeNote': //load parent notes
            return { ...state, allNotes: state.allNotes.filter(x => x.id !== action.payload.id) };

        default:
            return state;
    }
}