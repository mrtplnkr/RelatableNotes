import { INote } from "../data/NotepadReducer";

export const compareLatest = (a: INote, b: INote) => {
    if (a.order < b.order) {
        return 1;
    } else {
        return -1;
    }
};
