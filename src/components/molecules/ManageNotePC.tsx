import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';

export interface IManageNotePCProps {
  mainNote: INote;
  hasChildren: boolean;
  dispatch: Dispatch<{ type: string; payload: INote }>;
  setChildAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ManageNotePC (props: IManageNotePCProps) {
  const [showTextbox, setShowTextbox] = useState<boolean>(false);
  const [whileUpdating, setWhileUpdating] = useState<boolean>(false);

  return (
    <div className="dropdown">
      
      {!whileUpdating ? <div className="dropbtn">{props.mainNote!.text}</div>
      :
      <input autoFocus defaultValue={props.mainNote.text} style={{fontWeight:'bold'}} type="text" onBlur={() => setWhileUpdating(false)} onKeyDown={(e: any) => {
        if (e.keyCode === 13) {
            props.dispatch({type: 'updateNote', payload: {id: props.mainNote.id!, parentId: props.mainNote.id!, text: e.target.value }})
            setWhileUpdating(false);
        } else if (e.keyCode === 27) {
            setWhileUpdating(false);
        }
      }} />}
      <div className="dropdown-content">
          {!showTextbox ? 
              <>
                  <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                      setShowTextbox(!showTextbox);
                  }}><FontAwesomeIcon icon={faPlus} /></button>
                  <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                      setWhileUpdating(true);
                  }}><FontAwesomeIcon icon={faEdit} /></button>
                  <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                      if (props.hasChildren) {
                        alert('Remove children first');
                      } else {
                        props.dispatch({type: 'removeNote', payload: {id: props.mainNote.id, parentId: null, text: ''}});
                      }
                  }}><FontAwesomeIcon icon={faTrash} /></button>
              </>
          :
              <div style={{display: 'flex'}}>
                <input style={{fontWeight:'bold', flex: '1'}} type="text" autoFocus onKeyDown={(e: any) => {
                    if (e.keyCode === 13) {
                        props.dispatch({type: 'addNote', payload: {id: props.mainNote.id!, parentId: props.mainNote.id!, text: e.target.value }})
                        props.setChildAdded(true);
                        setShowTextbox(false);
                    } else if (e.keyCode === 27) {
                        setShowTextbox(false);
                    }
                }} />
                <button onClick={() => setShowTextbox(!showTextbox)}>x</button>
              </div>
          }
      </div>
  </div>
  );
}
