import { compareLatest } from "../pages/Notepad";

export interface INote {
    parentId: number | null,
    id: number,
    text: string,
    order: number,
    url?: string,
    cut?: boolean,
    done?: boolean,
}

// export enum ENoteType {
//     todo, hierarchic = 1, timeline, event
// }

export interface INotepadState {
    allNotes: INote[],
    highlighted: number[],
    filter: {
        text: string,
    }
}

export const initialState: INotepadState = {
    allNotes: [
        { parentId: null, id: 4, text: "shopping list", order: 0 },
        { parentId: 4, id: 41, text: "milk", order: 1 },
        { parentId: 4, id: 42, text: "bread", order: 2 },
        { parentId: 42, id: 412, text: 'white', order: 0 },
        { parentId: 412, id: 4120, text: 'bagels', order: 0 },
        { parentId: 42, id: 413, text: 'dark', order: 1 },
        { parentId: 4, id: 43, text: "tea", order: 3 },
        { parentId: null, id: 2, text: "app dev features", order: 1 },
        { parentId: 2, id: 21, text: "creating new note with children", order: 1 },
        { parentId: 2, id: 22, text: "update, edit, delete", order: 2 },
        { parentId: 2, id: 23, text: "provide visualisation", order: 3 },
        { parentId: null, id: 3, text: "life priorities", order: 2 },
        { parentId: 3, id: 31, text: "money?", order: 1 },
        { parentId: 3, id: 32, text: "love", order: 2 },
        { parentId: 3, id: 33, text: "health", order: 3 },
        { parentId: 3, id: 34, text: "peace", order: 4 },
        { parentId: null, id: 5, text: "Travel bucket list", order: 3 },
        { parentId: 5, id: 51, text: "Thailand", order: 1 },
        { parentId: 5, id: 52, text: "Turkey", order: 2 },
        { parentId: 5, id: 53, text: "Sweden", order: 3 },
        { parentId: 5, id: 54, text: "France", order: 3 },
        {"id":414,"parentId":null,"text":"Car example", order: 4, url: 'https://audi.com'},
        {"id":415,"parentId":414,"text":"wheels", order: 1},
        {"id":416,"parentId":414,"text":"steering", order: 2},
        {"id":417,"parentId":414,"text":"engine", order: 3},
        {"id":418,"parentId":414,"text":"headlights", order: 4},
        {"id":419,"parentId":417,"text":"cylinders", order: 0},
        {"id":420,"parentId":417,"text":"ignition", order: 1},
        {"id":421,"parentId":420,"text":"spark plugs", order: 1},
        {"id":422,"parentId":420,"text":"coilpack", order: 2},
        {"id":423,"parentId":417,"text":"fuel pump", order: 2},
    ],
    highlighted: [],
    filter: {
        text: ''
    }
}

const checkAssignOrder = (orders: number[]): number => {
    return orders.length > 0 ? Math.max(...orders) + 1 : 1;
}

const changeOrder = (notes: INote[], direction: number, noteId: number) => {
    const allWithinParentSorted = notes.sort(compareLatest);
    const currentIndex = allWithinParentSorted.findIndex(a => a.id === noteId);
    return (currentIndex + direction) >= 0 && (currentIndex+direction) < allWithinParentSorted.length ? allWithinParentSorted[currentIndex + direction] :  allWithinParentSorted[currentIndex];
}

export const NotepadReducer = (state: INotepadState, action: { type: string, payload: INote; }): INotepadState => {
    switch(action.type) {
        case 'applyFilter':
            return {...state, 
                highlighted: [],
                filter: {
                    text: action.payload.text,
                }};
        case 'highlightNote':
            return {...state, highlighted: [...state.highlighted].concat(state.allNotes.filter((content) => 
                !state.highlighted.includes(content.id) && content.id === action.payload.id).map(x => x.id))};
        case 'cutNote':
            return {...state, allNotes: state.allNotes.map((content) => content.id === action.payload.id ?
                {...action.payload, cut: true} : content )};
        case 'cancelCut':
            return {...state, allNotes: state.allNotes.map((content) => content.cut ?
                {...content, cut: false} : content )};
        case 'pasteNote':
            const newHighestOrder = checkAssignOrder(state.allNotes.filter(x => x.parentId === action.payload.id).map(object => object.order ));
                return {...state, allNotes: state.allNotes.map((content) => content.cut === true ?
                    {...content, cut: false, parentId: action.payload.id, order: newHighestOrder} : content)};
        case 'addNote':
            const ids = state.allNotes.map(object => object.id);
            return { ...state, allNotes: [...state.allNotes, {...action.payload, url: '', id: Math.max(...ids) + 1,
                order: checkAssignOrder(state.allNotes.filter(x => x.parentId === action.payload.parentId).map(object => object.order ))}] };
        case 'removeNote':
            return { ...state, allNotes: state.allNotes.filter(x => x.id !== action.payload.id)
                .map(x => x.parentId === action.payload.parentId && x.order > action.payload.order 
                    ? {...x, order: x.order-1} : x) };
        case 'updateNote':
            const checkChildren = state.allNotes.some((content) => content.parentId === action.payload.parentId && content.done)
            return {...state, allNotes: state.allNotes
                .map((content) => content.id === action.payload.id ? {...action.payload} : content )
                .map((content) => content.id === action.payload.parentId ? {...content, done: !checkChildren} : content)};
        case 'moveUp':
            const next = changeOrder(state.allNotes.filter(a => a.parentId === action.payload.parentId), -1, action.payload.id);
            return {...state, allNotes: state.allNotes.map((content) => 
                content.id === action.payload.id ? {...content, order: next.order === action.payload.order ? next.order+1 : next.order } : 
                content.id === next.id ? {...content, order: action.payload.order} : content )};
        case 'moveDown':
            const last = changeOrder(state.allNotes.filter(a => a.parentId === action.payload.parentId), +1, action.payload.id);
            return {...state, allNotes: state.allNotes.map((content) => 
                content.id === action.payload.id ? {...content, order: last.order} :
                last.id === content.id ? {...content, order: action.payload.order} : content )};
        default:
            return state;
    }
}