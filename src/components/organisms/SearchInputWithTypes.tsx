/* eslint-disable react-hooks/exhaustive-deps */
import { faArrowUp, faPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { timeout } from 'd3';
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
    console.log('set false');
    
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
    if (scrollTop >= 20) return 'searchFieldFixed';
    if (scrollTop === 0) return '';
  }

  const navigateTo = (noteId: number) => {
    if (lastScrolledNoteId !== props.foundNotes[0].id) {
      setLastScrolledNoteId(props.foundNotes[0].id);
      scrollToElement(`#lbl${noteId}`, { offset: 20 });  
    }
  };

  useEffect(() => {
    if (props.foundNotes.length === 1) {
      navigateTo(props.foundNotes[0].id);
      // setShowAllFound(false); make it a setting feature scroll when exact match found
    }
  }, [props.foundNotes.map(x => x.id)]);

  return (
    <>
    {console.log('log out here, it will show every time it changes, then go to chrome tools', showAllFound)}
      <div className={searchInputCLass(document.documentElement.scrollTop)}>
        <>
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
                scrollToElement('#root', { offset: 20 });
                timeout(() => searchInputCLass(document.documentElement.scrollTop));
              }} />}
      </div>
      <span id="spanNotesFound" style={{alignSelf: 'end', paddingLeft: '1rem', float: 'right'}}>
        (<u onClick={(e) => setShowAllFound(true)}>
          {props.foundNotes ? props.foundNotes.length : 0}
        </u>)
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
