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

  const handleSearch = (text: string) => {
    if (!text) {
      setSearchOrNot(false);
      dispatchNotes({type: 'applyFilter', payload: {id: 0, parentId: null, order: 0, text: '', type: undefined}});
    }
    else dispatchNotes({type: 'applyFilter', payload: {id: 0, parentId: null, order: 0, text: text, type: undefined}});
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
                <SearchInputWithTypes {...{selectedType, setSelectedType, handleSearch, highlighted: highlighted.length>0}} />
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
