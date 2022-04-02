import { useEffect, useState } from 'react';
import { ReusableObject } from '../components/ReusableObject';
import { useNotepadContext } from '../data/NotepadContext';
import { ENoteType, INote } from '../data/NotepadReducer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes, faCampground, faChartPie, faLink, faRandom, faSitemap, faSpellCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

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
  const [showTypes, setShowTypes] = useState(false);
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
          <div>
            <input placeholder={`add new ${ENoteType[selectedType]} note`} style={{fontWeight:'bold'}} type="text" 
              onKeyDown={(e: any) => {
                if (e.keyCode === 13) {
                    dispatchNotes({type: 'addNote', payload: {order: 0, id: 1, parentId: null, text: e.target.value, type: selectedType }})
                }
            }} />
          </div>
        </>
      <ul>
        {notes.filter(x => x.parentId === null).sort(compareLatest).map((x: INote) => {
          return <div key={x.id}>
            <ReusableObject {...{showOptions, setShowOptions}} reloadChildren={() => saveState()} dispatch={dispatchNotes} mainNote={x} size={18}></ReusableObject>
          </div>
        })}
      </ul>

      <p>
        <Link to="/preview">get visuals</Link>
      </p>
    </div>
  );
}
