import { useState } from 'react';
import { ReusableObject } from '../components/ReusableObject';
import { INote } from '../data/NotepadReducer';
import { Link } from 'react-router-dom';

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
  
  const [showOptions, setShowOptions] = useState<number>(0);

  return (
    <div>
      <h3>Your Collections</h3>
        
      <ReusableObject {...{showOptions, setShowOptions}} size={18}></ReusableObject>

      <p>
        <Link to="/dataPreview">get visuals</Link>
      </p>
    </div>
  );
}
