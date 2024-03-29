import { faCut, faEdit, faLink, faPaste, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';
import { NoteHeader } from '../organisms/NoteHeader';

export interface IManageNotePCProps {
  mainNote: INote;
  hasChildren: boolean;
  dispatch: Dispatch<{ type: string; payload: INote }>;
  showChildren: boolean;
  setShowOptions: Dispatch<React.SetStateAction<number>>;
  setShowChildren: React.Dispatch<React.SetStateAction<boolean>>;
  isAnythingCut: boolean;
  hasBrothers: boolean;
  isHighlighted: boolean;
}

enum Property {
  none = 0, text, url
}

export function ManageNotePC (props: IManageNotePCProps) {
  const [showTextbox, setShowTextbox] = useState<Property>(0);
  const [updatingText, setUpdatingText] = useState<boolean>(false);

  const { isHighlighted, showChildren, hasChildren, setShowChildren, hasBrothers, mainNote, dispatch, setShowOptions } = props;

  const setShowAddTextbox = (bool: boolean) => {
    if (bool) setShowTextbox(Property.text);
  }

  return (
    <div className="dropdown">
      <NoteHeader {...{isHighlighted, setShowTextbox: setShowAddTextbox, showChildren, hasChildren, setShowChildren, setShowOptions, hasBrothers, updatingText, setUpdatingText, mainNote, dispatch }} />
      {!props.mainNote.cut && <div className="dropdown-content">
          {!showTextbox ? 
            <>
                <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                    setShowTextbox(1);
                }}><FontAwesomeIcon icon={faPlus} /></button>
                <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                    setUpdatingText(true);
                }}><FontAwesomeIcon icon={faEdit} /></button>
                {
                    <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                        setShowTextbox(2);
                    }}><FontAwesomeIcon icon={faLink} /></button>
                }
                {!props.isAnythingCut ? <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                    props.dispatch({type: 'cutNote', payload: props.mainNote});
                    props.setShowChildren(false);
                }}><FontAwesomeIcon icon={faCut} /></button> :
                <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                    props.dispatch({type: 'pasteNote', payload: props.mainNote});
                }}><FontAwesomeIcon icon={faPaste} /></button>}
                <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                    if (props.hasChildren) {
                      alert('Remove children first');
                    } else {
                      props.dispatch({type: 'removeNote', payload: props.mainNote});
                    }
                }}><FontAwesomeIcon icon={faTrash} /></button>
            </>
          :
            <div style={{display: 'flex'}}>
              <>{showTextbox === 2 ? <>
                  <input defaultValue={!props.mainNote.url ? 'https://' : props.mainNote.url} autoFocus style={{fontWeight:'bold'}} 
                      type="text" onBlur={() => setShowTextbox(0)} onKeyDown={(e: any) => {
                    if (e.keyCode === 13) {
                      props.dispatch({type: 'updateNote', payload: {...props.mainNote, url: e.target.value }})
                      setShowTextbox(0);
                    } else if (e.keyCode === 27) {
                      setShowTextbox(0);
                    }
                  }} />
                </>
                :
                <input style={{fontWeight:'bold', flex: '1'}} type="text" autoFocus onKeyDown={(e: any) => {
                  if (e.keyCode === 13) {
                    props.dispatch({type: 'addNote', payload: {...props.mainNote, parentId: props.mainNote.id!, text: e.target.value, done: undefined }});
                    setShowTextbox(0);
                    props.setShowChildren(true);
                  } else if (e.keyCode === 27) {
                    setShowTextbox(0);
                  }
                }} />
              }</>
              <button className={'noBorder'} onClick={() => setShowTextbox(0)}>x</button>
            </div>
          }
      </div>}
  </div>
  );
}
