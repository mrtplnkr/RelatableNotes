import { FunctionComponent, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { NoteSelection } from '../components/organisms/NoteSelection';
import { useNotepadContext } from '../data/NotepadContext';
import { INote } from '../data/NotepadReducer';

interface IExportProps {
}

const Export: FunctionComponent<IExportProps> = (props) => {
  
  const { notes } = useNotepadContext();

  const [selectedNote, setSelectedNote] = useState<string>();

  useEffect(() => {
    setSelectedNote(notes[0].id.toString());
  }, [])

  const handleClick = (val: string) => {
    const json = JSON.stringify(notes.filter((x: INote) => x.id === parseInt(val)));
    var blob = new Blob([], {type: "application/json;charset=utf-8"});
    saveAs(blob, `${notes.find(a => a.id === parseInt(selectedNote!))?.text}.txt`);
  }

  const recursiveJson = (notes: INote[]): INote[] => {
    const selectedNotes: INote[] = [];
    notes.forEach(note => {
      selectedNotes.concat(notes.filter(x => x.id === note.id));
    });
    const children = selectedNotesHaveChildren(selectedNotes);
    if (children.length > 0) recursiveJson(children);
    return selectedNotes;
  }

  const selectedNotesHaveChildren = (parentNotes: INote[]): INote[] => {
    const childrenFound: INote[] = [];
    parentNotes.forEach(note => {
      childrenFound.concat(notes.filter(x => x.id === note.id));
    });
    return childrenFound;
  }

  return <>
    <NoteSelection opened={true} selectNote={setSelectedNote} notes={notes.filter(x => x.parentId === null)} />

    <button className={'primary'} style={{margin: '20px'}} onClick={() => handleClick(selectedNote!)}>Download</button>
  </>;
};

export default Export;
