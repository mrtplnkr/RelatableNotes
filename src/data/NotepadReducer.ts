
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
        { parentId: null, id: 4, text: "shopping list" },
        { parentId: 4, id: 41, text: "milk" },
        { parentId: 4, id: 42, text: "bread" },
        { parentId: 42, id: 412, text: 'white' },
        { parentId: 42, id: 413, text: 'dark' },
        { parentId: 4, id: 43, text: "tea" },
        { parentId: null, id: 2, text: "app dev features" },
        { parentId: 2, id: 21, text: "creating new note with children" },
        { parentId: 2, id: 21, text: "update, edit, delete" },
        { parentId: 2, id: 21, text: "provide visualisation" },
        { parentId: null, id: 3, text: "life priorities" },
        { parentId: 3, id: 31, text: "money?" },
        { parentId: 3, id: 32, text: "love" },
        { parentId: 3, id: 33, text: "health" },
        { parentId: 3, id: 34, text: "peace" },
        { parentId: null, id: 1, text: "plandemic stages"},
        { parentId: 1, id: 11, text: "spread lies" },
        { parentId: 1, id: 12, text: "rush vaccination"},
        { parentId: 1, id: 13, text: "discredit resistance"},
        {"id":414,"parentId":null,"text":"car"},
        {"id":415,"parentId":414,"text":"wheels"},
        {"id":416,"parentId":414,"text":"steering"},
        {"id":417,"parentId":414,"text":"engine"},
        {"id":418,"parentId":414,"text":"headlights"},
        {"id":419,"parentId":417,"text":"cylinders"},
        {"id":420,"parentId":417,"text":"ignition"},
        {"id":421,"parentId":417,"text":"fuel pump"}
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
                {...content, text: action.payload.text} : content )};
        default:
            return state;
    }
}