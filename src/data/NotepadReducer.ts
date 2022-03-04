import { compareLatest } from "../pages/Notepad";

export interface INote {
    parentId: number | null,
    id: number,
    text: string,
    url?: string,
    order: number
}

export interface INotepadState {
    allNotes: INote[],
}

export const initialState: INotepadState = {
    allNotes: [
        { parentId: null, id: 4, text: "shopping list", order: 0 },
        { parentId: 4, id: 41, text: "milk", order: 1 },
        { parentId: 4, id: 42, text: "bread", order: 2 },
        { parentId: 42, id: 412, text: 'white', order: 0 },
        { parentId: 42, id: 413, text: 'dark', order: 1 },
        { parentId: 4, id: 43, text: "tea", order: 3 },
        { parentId: null, id: 2, text: "app dev features", order: 0 },
        { parentId: 2, id: 21, text: "creating new note with children", order: 1 },
        { parentId: 2, id: 22, text: "update, edit, delete", order: 2 },
        { parentId: 2, id: 23, text: "provide visualisation", order: 3 },
        { parentId: null, id: 3, text: "life priorities", order: 0 },
        { parentId: 3, id: 31, text: "money?", order: 1 },
        { parentId: 3, id: 32, text: "love", order: 2 },
        { parentId: 3, id: 33, text: "health", order: 3 },
        { parentId: 3, id: 34, text: "peace", order: 4 },
        { parentId: null, id: 1, text: "plandemic stages", order: 0},
        { parentId: 1, id: 11, text: "spread lies", order: 1 },
        { parentId: 1, id: 12, text: "rush vaccination", order: 2},
        { parentId: 1, id: 13, text: "discredit resistance", order: 3},
        {"id":414,"parentId":null,"text":"Car", order: 0},
        {"id":415,"parentId":414,"text":"wheels", order: 1},
        {"id":416,"parentId":414,"text":"steering", order: 2},
        {"id":417,"parentId":414,"text":"engine", order: 3},
        {"id":418,"parentId":414,"text":"headlights", order: 4},
        {"id":419,"parentId":417,"text":"cylinders", order: 0},
        {"id":420,"parentId":417,"text":"ignition", order: 1},
        {"id":421,"parentId":417,"text":"fuel pump", order: 2}
    ],
}

export const NotepadReducer = (state: INotepadState, action: { type: string, payload: INote; }): INotepadState => {
    switch(action.type) {
        case 'loadChains': //or initial state
            return state;
        case 'addNote': //load parent notes
            const ids = state.allNotes.map(object => {
                return object.id;
            });
            return { ...state, allNotes: [...state.allNotes, {...action.payload, id: Math.max(...ids) + 1}] };
        case 'removeNote': //load parent notes
            return { ...state, allNotes: state.allNotes.filter(x => x.id !== action.payload.id) };
        case 'updateNote':
            return {...state, allNotes: state.allNotes.map((content) => content.id === action.payload.id ?
                {...action.payload} : content )};
        case 'moveUp':
            return {...state, allNotes: state.allNotes.sort(compareLatest).map((content) => 
                content.id === action.payload.id ? {...content, order: content.order+1} : 
                (action.payload.parentId === content.parentId && (action.payload.order+1) === content.order) ? {...content, order: content.order-1} : content )};
        case 'moveDown':
            return {...state, allNotes: state.allNotes.sort(compareLatest).map((content) => 
                content.id === action.payload.id ? {...content, order: content.order-1} :
                (action.payload.parentId === content.parentId && (action.payload.order-1)) === content.order ? {...content, order: content.order+1} : content )};
        default:
            return state;
    }
}