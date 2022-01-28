import React, { useContext, useState } from 'react';

// const NotepadContext = React.createContext({});
// const NotepadUpdateContext = React.createContext({});

// export function useNotepad() {
//     return useContext(NotepadContext);
// }

// export function useNotepadUpdate() {
//     return useContext(NotepadUpdateContext);
// }

// export function NotepadProvider({ children }) {
//     const [notes, setNotes] = useState([]);

//     // function addNote(newNote) {
//     //     setNotes([...notes, newNote])
//     // }

//     return (
//         <NotepadContext.Provider value={notes}>
//             <NotepadUpdateContext.Provider value={}>
//                 {children}
//             </NotepadUpdateContext.Provider>
//         </NotepadContext.Provider>
//     )
// }