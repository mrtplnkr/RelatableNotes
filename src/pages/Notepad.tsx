import { useEffect, useState } from 'react';
import { ReusableObject } from '../components/ReusableObject';
import { useNotepadContext } from '../data/NotepadContext';
import { ENoteType, INote } from '../data/NotepadReducer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes, faRandom, faSitemap, faSpellCheck, faUndo } from '@fortawesome/free-solid-svg-icons';

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
  
  const { notes } = useNotepadContext();

  const [showOptions, setShowOptions] = useState<number>(0);

  return (
    <div>
      <h3>Your Collections</h3>
        
      <ul>
        {notes.filter(x => x.parentId === null).sort(compareLatest).map((x: INote) => {
          return <div key={x.id}>
            <ReusableObject {...{showOptions, setShowOptions, mainNote: x}} size={18}></ReusableObject>
           </div>
        })}
      </ul>

      <p>
        <Link to="/dataPreview">get visuals</Link>
      </p>
    </div>
  );
}
