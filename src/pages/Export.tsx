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
  }, [notes])

  const handleClick = (val: string) => {
    var blob = new Blob([JSON.stringify(notes.filter((x: INote) => x.id === parseInt(val)))], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "NoteBackup.txt");
  }

  return <>
    <NoteSelection opened={true} selectNote={setSelectedNote} notes={notes.filter(x => x.parentId === null)} />

    <button className={'primary'} style={{margin: '20px'}} onClick={() => handleClick(selectedNote!)}>Download</button>
  </>;
};

export default Export;
