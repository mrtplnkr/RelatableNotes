import { faArrowUp, faPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import scrollToElement from 'scroll-to-element';
import { figureOutTheColor } from '../../data/functional';
import { INote } from '../../data/NotepadReducer';

export interface ISearchInputWithTypesProps {
    handleSearch(text: string): void;
    addNote(text: string): void;
    searchTerm: string;
    exact: boolean;
    highlighted: boolean;
    foundNotes: INote[];
}

export function SearchInputWithTypes (props: ISearchInputWithTypesProps) {
  const [searchText, setSearchText] = useState<string>(props.searchTerm);
  const [showAllFound, setShowAllFound] = useState<boolean>(false);

  const doSearchHandler = (key: any) => {
    if (key === 'Enter')
      sendSearch(searchText);
  };
 
  const sendSearch = (val: string) => {
    setShowAllFound(false);
    props.handleSearch(val);
  };

  const addNoteHandler = (note: string) => {
    props.addNote(note);
    setSearchText('');
  }

  useEffect(() => {
    if (searchText.length === 0) sendSearch(searchText);
  }, [searchText]);

  const searchInputCLass = (scrollTop: number) => {
    if (scrollTop > 10) return 'searchFieldFixed';
    if (scrollTop === 0) return '';
  }

  useEffect(() => {
    if (props.foundNotes.length === 1) navigateTo(props.foundNotes[0].id);
  }, [props.foundNotes])

  const navigateTo = (noteId: number) => {
    setShowAllFound(false);
    scrollToElement(`#lbl${noteId}`, { offset: 20 });  
  }

  return (
    <>
      <div className={searchInputCLass(document.documentElement.scrollTop)}>
        <>
            {/* <div style={{display: 'flex', justifyContent: 'center', placeContent: 'space-evenly'}}>
              <FontAwesomeIcon onClick={() => setSelectedType(ENoteType.todo)} icon={faSpellCheck} cursor='pointer' style={{color: selectedType === ENoteType.todo ? 'blue' : ''}} />
              <FontAwesomeIcon title="hierarchic" onClick={() => setSelectedType(ENoteType.hierarchic)} icon={faSitemap} cursor='pointer' style={{color: selectedType === ENoteType.hierarchic ? 'blue' : ''}} />
              <FontAwesomeIcon title="timeline" onClick={() => setSelectedType(ENoteType.timeline)} icon={faRandom} cursor='pointer' style={{color: selectedType === ENoteType.timeline ? 'blue' : ''}} />
              <FontAwesomeIcon title="event" onClick={() => setSelectedType(ENoteType.event)} icon={faCalendarTimes} cursor='pointer' style={{color: selectedType === ENoteType.event ? 'blue' : ''}} />
            </div> */}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '0.5em'}}>
              <FontAwesomeIcon title="add" onClick={() => addNoteHandler(searchText)} icon={faPlus}
                cursor='pointer' style={{display: 'flex', marginRight: '0.5em', justifyContent: 'center', 
                color: props.exact ? 'red' : ''}}
              />
              <input placeholder={`search existing notes`} style={{fontWeight:'bold'}} value={searchText} type="text" autoFocus
                onChange={(e: any) => setSearchText(e.target.value)}
                onKeyPress={(e: any) => doSearchHandler(e.key)}
              />
              <FontAwesomeIcon title="search" onClick={() => setSearchText('')} icon={faSearchMinus} cursor='pointer' 
                style={{display: 'flex', marginLeft: '0.5em', justifyContent: 'center', 
                color: figureOutTheColor(searchText, props.highlighted, false)}}
              />
            </div>
            <hr />
          </>
          {document.documentElement.scrollTop !== 0 &&
            <FontAwesomeIcon style={{ position: 'fixed', right: 50, bottom: 50 }} icon={faArrowUp}
              onClick={() => {
                setShowAllFound(false);
                scrollToElement('#root', { offset: 20 })}
              } />}
      </div>
      <span id="spanNotesFound" style={{alignSelf: 'end', paddingLeft: '1rem', float: 'right'}}>
        (<u onClick={(e) => setShowAllFound(true)}>{props.foundNotes ? props.foundNotes.length : 0}</u>)
      </span>
      {showAllFound && <ul>
        {props.foundNotes.map(x => {
          return (
            <li style={{ padding: '5px' }} key={x.id}>
                <button onClick={() => navigateTo(x.id)}>{x.text}</button>
            </li>
          );
        })}
      </ul>}
    </>
  );
}
