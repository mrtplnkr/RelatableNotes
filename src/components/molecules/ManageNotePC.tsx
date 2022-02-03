import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';

export interface IManageNotePCProps {
  mainNote: INote;
  children: INote[];
  dispatch: Dispatch<{ type: string; payload: INote }>;
}

export function ManageNotePC (props: IManageNotePCProps) {
  const [showTextbox, setShowTextbox] = useState<boolean>(false);
  const [whileUpdating, setWhileUpdating] = useState<boolean>(false);

  return (
    <div className="dropdown">
      
      {!whileUpdating ? <div className="dropbtn">{props.mainNote!.text}</div>
      :
      <input defaultValue={props.mainNote.text} style={{fontWeight:'bold'}} type="text" onBlur={() => setWhileUpdating(false)} onKeyDown={(e: any) => {
          if (e.keyCode === 13) {
              props.dispatch({type: 'updateNote', payload: {id: props.mainNote.id!, parentId: props.mainNote.id!, text: e.target.value }})
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
                      props.dispatch({type: 'removeNote', payload: {id: props.mainNote.id, parentId: null, text: 'asdsdasfads'}});
                  }}><FontAwesomeIcon icon={faTrash} /></button>
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
