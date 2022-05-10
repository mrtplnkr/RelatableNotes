import { faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import { useState } from 'react';
import debounce from 'lodash.debounce';
import { figureOutTheColor } from '../../data/functional';

export interface ISearchInputWithTypesProps {
    handleSearch(text: string): void;
    highlighted: boolean;
}

export function SearchInputWithTypes (props: ISearchInputWithTypesProps) {
  const [searchText, setSearchText] = useState<string>('');
  // const [selectedType, setSelectedType] = useState<ENoteType | undefined>();

  const changeTextHandler = (val: string) => {
    setSearchText(val);
    props.handleSearch(val);
  }

  const debouncedChangeHandler = useCallback(
    debounce(changeTextHandler, 999)
  , []);

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
            <input placeholder={`search existing notes`} style={{fontWeight:'bold'}} type="text" autoFocus
              onChange={(e: any) => debouncedChangeHandler(e.target.value)} />
            <FontAwesomeIcon title="search" onClick={() => props.handleSearch('')} icon={faSearchMinus}
              cursor='pointer' style={{display: 'flex', marginLeft: '0.5em', justifyContent: 'center', color: figureOutTheColor(searchText, props.highlighted)}} />
          </div>
          
        </>
    </div>
  );
}
