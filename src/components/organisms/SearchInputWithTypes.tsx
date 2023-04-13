import { faPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { figureOutTheColor } from '../../data/functional';

export interface ISearchInputWithTypesProps {
    handleSearch(text: string): void;
    addNote(text: string): void;
    searchTerm: string;
    highlighted: boolean;
}

export function SearchInputWithTypes (props: ISearchInputWithTypesProps) {
  const [searchText, setSearchText] = useState<string>(props.searchTerm);

  const doSearchHandler = (key: any) => {
    if (key === 'Enter')
      sendSearch(searchText);
  };
 
  const sendSearch = (val: string) => {
    props.handleSearch(val);
  };

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
            {!props.highlighted && <FontAwesomeIcon title="add" onClick={() => props.addNote(searchText)} icon={faPlus}
              cursor='pointer' style={{display: 'flex', marginRight: '0.5em', justifyContent: 'center'}} />}
            <input placeholder={`search existing notes`} style={{fontWeight:'bold'}} value={searchText} type="text" autoFocus
              onChange={(e: any) => setSearchText(e.target.value)}
              onKeyPress={(e: any) => doSearchHandler(e.key)}
            />
            <FontAwesomeIcon title="search" onClick={() => setSearchText('')} icon={faSearchMinus} cursor='pointer' 
              style={{display: 'flex', marginLeft: '0.5em', justifyContent: 'center', color: figureOutTheColor(searchText, props.highlighted)}} />
          </div>
        </>
    </div>
  );
}
