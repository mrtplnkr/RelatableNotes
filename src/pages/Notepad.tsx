import { useEffect, useState } from 'react';
import { ReusableObject } from '../components/ReusableObject';
import { useNotepadContext } from '../data/NotepadContext';
import { ENoteType, INote } from '../data/NotepadReducer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes, faRandom, faSitemap, faSpellCheck, faUndo } from '@fortawesome/free-solid-svg-icons';

export interface INotepadProps {
}

export const compareLatest = (a: INote, b: INote) => {
  if (a.order < b.order) {
      return 1;
  } else {
      return -1;
  }
};

export function Notepad (props: INotepadProps) {
  
  const { notes, dispatchNotes} = useNotepadContext();
  const [showOptions, setShowOptions] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<ENoteType>(ENoteType.regular);

  useEffect(() => {
    // setData(starterPackData);
  }, [notes]);

  const saveState = () => {
    console.log('can do saving?', dispatchNotes);
  }

  return (
    <div>
      <h3>Your Collections</h3>
        <>
          <div style={{display: 'flex', justifyContent: 'center', placeContent: 'space-evenly'}}>
            <FontAwesomeIcon onClick={() => setSelectedType(ENoteType.regular)} icon={faSpellCheck} cursor='pointer' style={{color: selectedType === ENoteType.regular ? 'blue' : ''}} />
            <FontAwesomeIcon title="hierarchic" onClick={() => setSelectedType(ENoteType.hierarchic)} icon={faSitemap} cursor='pointer' style={{color: selectedType === ENoteType.hierarchic ? 'blue' : ''}} />
            <FontAwesomeIcon title="timeline" onClick={() => setSelectedType(ENoteType.timeline)} icon={faRandom} cursor='pointer' style={{color: selectedType === ENoteType.timeline ? 'blue' : ''}} />
            <FontAwesomeIcon title="event" onClick={() => setSelectedType(ENoteType.event)} icon={faCalendarTimes} cursor='pointer' style={{color: selectedType === ENoteType.event ? 'blue' : ''}} />
          </div>
          <div style={{margin: '0.5em'}}>
            <input placeholder={`add new ${ENoteType[selectedType]} note`} style={{fontWeight:'bold'}} type="text" 
              onKeyDown={(e: any) => {
                if (e.keyCode === 13) {
                    dispatchNotes({type: 'addNote', payload: {order: 0, id: 1, parentId: null, text: e.target.value, type: selectedType }})
                }
            }} />
          </div>
          {notes.some(x => x.cut) && <span style={{position: 'absolute',  right: 0}}>
            {notes.find(x => x.cut)!.text} 
            <FontAwesomeIcon onClick={() => dispatchNotes({type: 'cancelCut', payload: notes[0]})} title='undo' cursor={'pointer'} icon={faUndo} style={{padding: '0 0.5em'}} />
          </span>}
        </>
      <ul>
        {notes.filter(x => x.parentId === null).sort(compareLatest).map((x: INote) => {
          return <div key={x.id}>
            <ReusableObject {...{showOptions, setShowOptions}} reloadChildren={() => saveState()} dispatch={dispatchNotes} mainNote={x} size={18}></ReusableObject>
          </div>
        })}
      </ul>

      <p>
        <Link to="/dataPreview">get visuals</Link>
      </p>
    </div>
  );
}
