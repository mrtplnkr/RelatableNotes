import { useState, Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';

export interface IManageNotePCProps {
  mainNote: INote;
  children: INote[];
  dispatch: Dispatch<{ type: string; payload: INote }>;
}

export function ManageNotePC (props: IManageNotePCProps) {
  const [showTextbox, setShowTextbox] = useState<boolean>(false);

  return (
    <div className="dropdown">
      <div className="dropbtn">{props.mainNote!.text}{props.children?.length > 0 ? ` - ${props.children?.length}` : ''}</div>
      <div className="dropdown-content">
          {!showTextbox ? 
              <>
                  <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                      setShowTextbox(!showTextbox);
                  }}>+</button>
                  <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                      props.dispatch({type: 'removeNote', payload: {id: props.mainNote.id, parentId: null, text: 'asdsdasfads'}});
                  }}>-</button>
              </>
          :
              <>
                  <input style={{fontWeight:'bold'}} type="text" autoFocus onKeyDown={(e: any) => {
                      if (e.keyCode === 13) {
                          props.dispatch({type: 'addNote', payload: {id: props.mainNote.id!, parentId: props.mainNote.id!, text: e.target.value }})
                          setShowTextbox(!showTextbox);
                      }
                  }} />
                  <button onClick={() => setShowTextbox(!showTextbox)}>x</button>
              </>
          }
      </div>
  </div>
  );
}
