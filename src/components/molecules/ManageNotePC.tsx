import { faCheck, faCut, faEdit, faLink, faPaste, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, Dispatch } from 'react';
import { ENoteType, INote } from '../../data/NotepadReducer';
import { ShowHideHeaderPC } from '../organisms/ShowHideHeaderPC';

export interface IManageNotePCProps {
  mainNote: INote;
  hasChildren: boolean;
  dispatch: Dispatch<{ type: string; payload: INote }>;
  showChildren: boolean;
  setShowChildren: React.Dispatch<React.SetStateAction<boolean>>;
  isAnythingCut: boolean;
  hasBrothers: boolean;
  highlighted: boolean;
}

enum Property {
  none = 0, text, url
}

export function ManageNotePC (props: IManageNotePCProps) {
  const [showTextbox, setShowTextbox] = useState<Property>(0);
  const [updatingText, setUpdatingText] = useState<boolean>(false);

  const { highlighted, showChildren, hasChildren, setShowChildren, hasBrothers, mainNote, dispatch } = props;

  return (
    <div className="dropdown">
      {props.mainNote!.cut ? <div style={{opacity: '0.1'}}>{props.mainNote!.text}</div>
        :
        <ShowHideHeaderPC {...{highlighted, showChildren, hasChildren, setShowChildren, hasBrothers, updatingText, setUpdatingText, mainNote, dispatch }} />
      }
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
                  props.mainNote.type === ENoteType.todo ?
                    <>
                      {props.mainNote.type === ENoteType.todo && !hasChildren && <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                        props.dispatch({type: 'updateNote', payload: {...props.mainNote, done: !props.mainNote.done }});
                      }}><FontAwesomeIcon icon={faCheck} /></button>}
                    </>
                  :
                    <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                        setShowTextbox(2);
                    }}><FontAwesomeIcon icon={faLink} /></button>
                }
                {!props.isAnythingCut ? <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                    props.dispatch({type: 'cutNote', payload: props.mainNote});
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
              <button onClick={() => setShowTextbox(0)}>x</button>
            </div>
          }
      </div>}
  </div>
  );
}
