import { useState } from 'react';
import { ReusableObject } from '../components/ReusableObject';
import { INote } from '../data/NotepadReducer';
import { Link } from 'react-router-dom';
import { useNotepadContext } from '../data/NotepadContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InitialInputWithTypes } from '../components/organisms/InitialInputWithTypes';
import { SearchInputWithTypes } from '../components/organisms/SearchInputWithTypes';
import { faPoundSign, faUndo } from '@fortawesome/free-solid-svg-icons';

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
  
  const { notes, found, highlighted, filter, dispatchNotes } = useNotepadContext();
  // const [selectedType, setSelectedType] = useState<ENoteType>();

  const [showOptions, setShowOptions] = useState<number>(0);

  const [searchOrNot, setSearchOrNot] = useState<boolean>(filter.text.length > 0);

  const [showAllFound, setShowAllFound] = useState<boolean>(false);

  const handleSearch = (text: string) => {
    if (!text) {
      setSearchOrNot(false);
      dispatchNotes({type: 'applyFilter', payload: {id: 0, parentId: null, order: 0, text: ''}});
    }
    else dispatchNotes({type: 'applyFilter', payload: {id: 0, parentId: null, order: 0, text: text}});
  }

  return (
    <div>
      <h3>Your Collections</h3>
      <div style={{justifyContent: 'space-around'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <div style={{flex: 1}}>
              {!searchOrNot ? 
                <InitialInputWithTypes dispatch={dispatchNotes} setSearchOrNot={setSearchOrNot} /> 
                :
                <>
                  <div style={{display: 'flex'}}>
                    <SearchInputWithTypes {...{handleSearch, searchTerm: filter.text, highlighted: highlighted.length>0}} />
                    <span style={{alignSelf: 'end', paddingLeft: '1rem'}}>
                      (<a onClick={() => setShowAllFound(!showAllFound)}>{found ? found.length : 0}</a>)
                    </span>
                  </div>
                  {showAllFound && <ul>
                    {found && notes.filter(x => found.includes(x.id)).map(x => {
                      return (
                        <li style={{ padding: '5px' }} key={x.id}>
                            <u>{x.text}</u>
                        </li>
                      );
                    })}
                  </ul>}
                </>
              }
            </div>
          </div>
          <hr />
          {notes.some(x => x.cut) && <span style={{ position: 'absolute', right: 0 }}>
              {notes.find(x => x.cut)!.text}
              <FontAwesomeIcon onClick={() => dispatchNotes({ type: 'cancelCut', payload: notes[0] })} title='undo' cursor={'pointer'} icon={faUndo} style={{ padding: '0 0.5em' }} />
          </span>}
          {notes.filter((x: INote) => x.parentId === null).sort(compareLatest).map((x, index) => {
              return (
                  <div style={{ padding: '5px' }} key={x.id}>
                      <ReusableObject {...{ showOptions, setShowOptions, dispatch: dispatchNotes }} mainNote={x} size={18}></ReusableObject>
                  </div>
              );
          })}
      </div>
      <p>
        <Link to="/dataPreview">get visuals</Link>
      </p>
    </div>
  );
}
