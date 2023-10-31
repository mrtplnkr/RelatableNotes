import { faArrowUp, faPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { timeout } from 'd3';
import _ from 'lodash';
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
  const [lastScrolledNoteId, setLastScrolledNoteId] = useState(0);

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
  };

  useEffect(() => {
    if (searchText.length === 0) sendSearch(searchText);
  }, [searchText]);

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
  };

  const [scrollTop, setScrollTop] = useState<number>();

  return (
    <div className={scrollTop ? 'searchInputFixed' : ''}>
      <div id="searchBar" style={{display: 'flex', justifyContent: 'center'}}>
        <FontAwesomeIcon title="add" onClick={() => addNoteHandler(searchText)} icon={faPlus}
          cursor='pointer' style={{display: 'flex', margin: '0 0.5em', justifyContent: 'center', 
          color: props.exact ? 'red' : ''}}
        />
        <input placeholder={`search existing notes`} style={{fontWeight:'bold', textAlign: 'center'}} value={searchText} type="text" autoFocus
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
              } else setShowAllFound(x => !x);
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
      {showAllFound && <ul style={{listStyleType: 'none'}}>
        {props.foundNotes.map(x => {
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
