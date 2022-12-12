import { faCalendarTimes, faRandom, faSearch, faSitemap, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, useState } from 'react';
import { figureOutTheColor } from '../../data/functional';
import { INote } from '../../data/NotepadReducer';

export interface IInitialInputWithTypesProps {
    addNote: (newNote: string) => void;
    setSearchOrNot(val: boolean): void;
}

export function InitialInputWithTypes (props: IInitialInputWithTypesProps) {
  // const [selectedType, setSelectedType] = useState<ENoteType>(ENoteType.todo);
  const [newNote, setNewNote] = useState<string>('');

  return (
    <div>
      <>
          {/* <div style={{display: 'flex', justifyContent: 'center', placeContent: 'space-evenly'}}>
            <FontAwesomeIcon onClick={() => setSelectedType(ENoteType.todo)} icon={faSpellCheck} cursor='pointer' style={{color: selectedType === ENoteType.todo ? 'blue' : ''}} />
            <FontAwesomeIcon title="hierarchic" onClick={() => setSelectedType(ENoteType.hierarchic)} icon={faSitemap} cursor='pointer' style={{color: selectedType === ENoteType.hierarchic ? 'blue' : ''}} />
            <FontAwesomeIcon title="timeline" onClick={() => setSelectedType(ENoteType.timeline)} icon={faRandom} cursor='pointer' style={{color: selectedType === ENoteType.timeline ? 'blue' : ''}} />
            <FontAwesomeIcon title="event" onClick={() => setSelectedType(ENoteType.event)} icon={faCalendarTimes} cursor='pointer' style={{color: selectedType === ENoteType.event ? 'blue' : ''}} />
          </div> */}
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '0.5em'}}>
            <input value={newNote} placeholder={`add new note`} style={{fontWeight:'bold'}} type="text" 
              onChange={(e) => {
                setNewNote(e.target.value)
              }}
              onKeyDown={(e: any) => {
                if (e.keyCode === 13) {
                    props.addNote(e.target.value);
                    setNewNote('');
                }
              }} />
            <FontAwesomeIcon title="search" onClick={() => props.setSearchOrNot(true)} icon={faSearch}
              cursor='pointer' style={{display: 'flex', marginLeft: '0.5em', justifyContent: 'center', color: figureOutTheColor('', false)}} />
          </div>
        </>
    </div>
  );
}
