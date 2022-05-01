import { faCalendarTimes, faRandom, faSitemap, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Dispatch, useState } from 'react';
import { ENoteType, INote } from '../../data/NotepadReducer';

export interface IInitialInputWithTypesProps {
    dispatch: Dispatch<{ type: string; payload: INote }>;
}

export function InitialInputWithTypes (props: IInitialInputWithTypesProps) {
  const [selectedType, setSelectedType] = useState<ENoteType>(ENoteType.todo);

  return (
    <div>
      <>
          <div style={{display: 'flex', justifyContent: 'center', placeContent: 'space-evenly'}}>
            <FontAwesomeIcon onClick={() => setSelectedType(ENoteType.todo)} icon={faSpellCheck} cursor='pointer' style={{color: selectedType === ENoteType.todo ? 'blue' : ''}} />
            <FontAwesomeIcon title="hierarchic" onClick={() => setSelectedType(ENoteType.hierarchic)} icon={faSitemap} cursor='pointer' style={{color: selectedType === ENoteType.hierarchic ? 'blue' : ''}} />
            <FontAwesomeIcon title="timeline" onClick={() => setSelectedType(ENoteType.timeline)} icon={faRandom} cursor='pointer' style={{color: selectedType === ENoteType.timeline ? 'blue' : ''}} />
            <FontAwesomeIcon title="event" onClick={() => setSelectedType(ENoteType.event)} icon={faCalendarTimes} cursor='pointer' style={{color: selectedType === ENoteType.event ? 'blue' : ''}} />
          </div>
          <div style={{marginTop: '0.5em'}}>
            <input placeholder={`add new ${ENoteType[selectedType]} note`} style={{fontWeight:'bold'}} type="text" 
              onKeyDown={(e: any) => {
                if (e.keyCode === 13) {
                    props.dispatch({type: 'addNote', payload: {order: 0, id: 1, parentId: null, text: e.target.value, type: selectedType }});
                }
            }} />
          </div>
          
        </>
    </div>
  );
}
