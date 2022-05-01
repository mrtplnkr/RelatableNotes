import { faCalendarTimes, faRandom, faSitemap, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useCallback } from 'react';
import { Dispatch, useState } from 'react';
import { ENoteType, INote } from '../../data/NotepadReducer';
import debounce from 'lodash.debounce';

export interface ISearchInputWithTypesProps {
    dispatch: Dispatch<{ type: string; payload: INote }>;
}

export function SearchInputWithTypes (props: ISearchInputWithTypesProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedType, setSelectedType] = useState<ENoteType>();

  useEffect(() => {
    props.dispatch({type: 'applyFilter', payload: {id: 0, parentId: null, order: 0, text: searchText, type: selectedType}});
  }, [searchText, selectedType])

  const changeTextHandler = (val: string) => {
    setSearchText(val);
  }

  const debouncedChangeHandler = useCallback(
    debounce(changeTextHandler, 999)
  , []);

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
            <input placeholder={`search existing notes`} style={{fontWeight:'bold'}} type="text" autoFocus
              onChange={(e: any) => debouncedChangeHandler(e.target.value)} />
          </div>
          
        </>
    </div>
  );
}
