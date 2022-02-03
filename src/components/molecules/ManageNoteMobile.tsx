import { useState, Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';
import { faPlus, faTrash, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IManageNoteMobileProps {
    mainNote: INote;
    children: INote[];
    dispatch: Dispatch<{ type: string; payload: INote }>;
}

export function ManageNoteMobile (props: IManageNoteMobileProps) {
    const [showTextbox, setShowTextbox] = useState<boolean>(false);
    const [whileUpdating, setWhileUpdating] = useState<boolean>(false);

    return (
    <div className="">
      {<div style={{display:'flex'}}>
          {!showTextbox ? 
              <>
                <button style={{fontWeight: 'bold', marginRight: '10px'}} onClick={() => {
                    setShowTextbox(!showTextbox);
                }}><FontAwesomeIcon icon={faPlus} /></button>
                {!whileUpdating ? <span style={{flex:'1'}} onTouchStart={() => {setWhileUpdating(true)}}>{props.mainNote!.text}{props.children?.length > 0 ? ` - ${props.children?.length}` : ''}</span>
                :
                <input defaultValue={props.mainNote.text} style={{fontWeight:'bold'}} type="text" onBlur={() => setWhileUpdating(false)} onKeyDown={(e: any) => {
                    if (e.keyCode === 13) {
                        props.dispatch({type: 'updateNote', payload: {id: props.mainNote.id!, parentId: props.mainNote.id!, text: e.target.value }})
                        setWhileUpdating(false);
                    }
                }} />}
                <button style={{fontWeight: 'bold', marginLeft: '10px'}} onClick={() => {
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
                  <button onClick={() => setShowTextbox(!showTextbox)}>
                    <FontAwesomeIcon icon={faDoorClosed} />
                  </button>
              </>
          }
      </div>}
  </div>
  );
}

