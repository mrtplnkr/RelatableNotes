import { useState } from 'react';
import { ReusableObject } from '../components/ReusableObject';
import { ENoteType, INote } from '../data/NotepadReducer';
import { Link } from 'react-router-dom';
import { useNotepadContext } from '../data/NotepadContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InitialInputWithTypes } from '../components/organisms/InitialInputWithTypes';
import { SearchInputWithTypes } from '../components/organisms/SearchInputWithTypes';
import { faSearch, faSearchMinus, faUndo } from '@fortawesome/free-solid-svg-icons';

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
  
  const { filter, notes, highlighted, dispatchNotes } = useNotepadContext();
  const [selectedType, setSelectedType] = useState<ENoteType>();

  const [showOptions, setShowOptions] = useState<number>(0);

  const [searchOrNot, setSearchOrNot] = useState<boolean>(false);

  const handleSearch = (val: boolean) => {
    if (val) dispatchNotes({type: 'applyFilter', payload: {id: 0, parentId: null, order: 0, text: '', type: undefined}});
    setSearchOrNot((s) => !s);
  }

  const figureOutTheColor = (text: string, highlighted: boolean) => {
    if (text) {
      if (highlighted) {
        return 'green';
      } else {
        return 'red';
      }
    } else {
      return 'white';
    }
  }

  return (
    <div>
      <h3>Your Collections</h3>
      <div>
          <div style={{position: 'relative'}}>
            {!searchOrNot ? <InitialInputWithTypes dispatch={dispatchNotes} /> :
            <SearchInputWithTypes dispatch={dispatchNotes} {...{selectedType, setSelectedType}} />}
            <FontAwesomeIcon title="search" onClick={() => handleSearch(searchOrNot)} icon={!searchOrNot ? faSearch : faSearchMinus} cursor='pointer' 
              style={{position: 'absolute', right: 0, top: '35px', color: figureOutTheColor(filter.text, highlighted.length > 0)}} />
          </div>

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
