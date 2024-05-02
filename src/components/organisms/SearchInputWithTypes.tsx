import { faArrowUp, faCalendarTimes, faFont, faPlus, faSearchMinus, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { timeout } from 'd3';
import _ from 'lodash';
import { useState } from 'react';
import scrollToElement from 'scroll-to-element';
import { figureOutTheColor } from '../../data/functional';
import { INote } from '../../data/NotepadReducer';
import { EnumSort } from '../../helpers/compareLatest';

export interface ISearchInputWithTypesProps {
    handleSearch(text: string): void;
    addNote(text: string): void;
    searchTerm: string;
    exact: boolean;
    highlighted: boolean;
    foundNotes: INote[];
    sortBy: EnumSort;
    setSortBy(type: EnumSort): any;
}

export function SearchInputWithTypes (props: ISearchInputWithTypesProps) {
  const [searchText, setSearchText] = useState<string>(props.searchTerm);
  const [showAllFound, setShowAllFound] = useState<boolean>(false);
  const [lastScrolledNoteId, setLastScrolledNoteId] = useState(0);

  const [activeCasing, setActiveCasing] = useState<boolean>(false);

  const { sortBy, setSortBy } = props;

  const doSearchHandler = (key: any) => {
    if (key === 'Enter') {
      setShowAllFound(true);
      sendSearch(searchText);
    }
  };
 
  const sendSearch = (val: string) => {
    // setShowAllFound(false);
    if (val.length) props.handleSearch(val);
  };

  const addNoteHandler = (note: string) => {
    props.addNote(note);
    scrollToElement(`#root`, { offset: 0 });  
    setSearchText('');
  };

  window.addEventListener(
    "scroll",
    _.debounce(() => {
      setScrollTop(document.documentElement.scrollTop);
      setShowAllFound(false);
    }, 0)
  );

  const navigateTo = (noteId: number) => {
    if (lastScrolledNoteId !== props.foundNotes[0].id) {
      setLastScrolledNoteId(props.foundNotes[0].id);
    }
    scrollToElement(`#lbl${noteId}`, { offset: 20 });  
  }

  const [scrollTop, setScrollTop] = useState<number>();

  return (
    <div id="searchContainer" className={scrollTop ? 'searchInputFixed' : ''}>
      <div id="searchBar" style={{display: 'flex', justifyContent: 'center'}}>
        <FontAwesomeIcon title="add" onClick={() => addNoteHandler(searchText)} icon={faPlus}
          cursor='pointer' style={{display: 'flex', margin: '0 0.5em', paddingLeft: '0.5em', 
          color: props.exact ? 'red' : ''}}
        />
        <input name="searchInput" placeholder={`search existing notes`} value={searchText} type="text" autoFocus
          style={{fontWeight:'bold', textAlign: 'center'}} 
          onChange={(e: any) => setSearchText(e.target.value)}
          onKeyPress={(e: any) => doSearchHandler(e.key)}
        />
        <div style={{display: 'flex'}}>
          <FontAwesomeIcon title="search" onClick={() => sendSearch(searchText)} icon={faSearchMinus} cursor='pointer' 
            style={{display: 'flex', marginLeft: '0.5em', justifyContent: 'center', 
            color: figureOutTheColor(searchText, props.highlighted, false)}}
          />
          <span id="spanNotesFound" style={{cursor: 'pointer', fontSize: '0.5em', marginTop: '-0.8rem', paddingLeft: '0.3rem'}}>
            <u onClick={() => {
              if (!showAllFound && document.documentElement.scrollTop) {
                scrollToElement('#root', {offset: 0, duration: 100});
                timeout(() => setShowAllFound(x => !x), 200);
              } else setShowAllFound(true);
            }}>({props.foundNotes ? props.foundNotes.length : 0})</u>
          </span>
        </div>
      </div>
      <hr />
      {scrollTop !== 0 &&
        <FontAwesomeIcon style={{ position: 'fixed', right: 50, bottom: 50 }} icon={faArrowUp}
          onClick={() => {
            scrollToElement('#root', { offset: 0 });
            setShowAllFound(false);
          }} />
      }
      <FontAwesomeIcon style={{ position: 'fixed', right: 50, top: 50 }}
        icon={sortBy === EnumSort.date ? faSortAlphaDown : faCalendarTimes}
        onClick={() => setSortBy(sortBy === EnumSort.index ? EnumSort.date : EnumSort.index)} />
      {showAllFound && props.foundNotes.length > 1 && <ul className={'notesFoundContainer'}>
        <FontAwesomeIcon title="apply casing" onClick={() => setActiveCasing(a => !a)} icon={faFont}
            cursor='pointer' style={{display: 'flex', margin: '0 0.5em', 
            border: activeCasing ? '1px solid green' : '', color: props.exact ? 'red' : ''}}
          />
        {props.foundNotes.filter(x => x.text.includes(activeCasing ? searchText : '')).map(x => {
          return (
            <li style={{ padding: '5px' }} key={x.id}>
                <button style={{border: '3px solid green'}} onClick={() => navigateTo(x.id)}>{x.text}</button>
            </li>
          );
        })}
      </ul>}
    </div>
  );
}
